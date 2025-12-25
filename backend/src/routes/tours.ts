import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { sql } from "../utils/db";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";
import slugify from "slugify";
const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Multer (Use Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Multer to accept multiple fields
const uploadFields = upload.fields([
  { name: "cover_photo", maxCount: 1 }, // The main cover image
  { name: "photos", maxCount: 10 }, // Up to 10 gallery images
]);

// --- HELPER: Upload to Cloudinary ---
const uploadImage = async (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "travel-app-tours",
  });
  return { url: result.secure_url, public_id: result.public_id };
};

const deleteImage = async (
  publicId: string | null,
  imageUrl: string | null
) => {
  let idToDelete = publicId;

  // FALLBACK: Extract ID from URL using Regex
  if (!idToDelete && imageUrl) {
    try {
      // Matches everything after "/upload/" (and optional version v123/) up to the file extension
      const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/;
      const match = imageUrl.match(regex);
      if (match && match[1]) {
        idToDelete = match[1];
      }
    } catch (e) {
      console.error("Error parsing URL:", imageUrl);
    }
  }

  if (!idToDelete) {
    console.log("❌ Could not find Public ID for:", imageUrl);
    return;
  }

  try {
    console.log(`🗑️ Deleting from Cloudinary: ${idToDelete}`);
    const result = await cloudinary.uploader.destroy(idToDelete);
    console.log("Cloudinary Result:", result);
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
  }
};

// GET all tours
router.get("/", async (req, res) => {
  try {
    const tours = await sql`
      SELECT *, cover_photo as image FROM tours ORDER BY created_at DESC
    `;
    res.json(tours);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to load tours" });
  }
});



// GET /api/tours/:slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const [tour] = await sql`
    SELECT *, cover_photo as image FROM tours WHERE slug = ${slug}
  `;

  if (!tour) return res.status(404).json({ message: "Tour not found" });

  res.json(tour);
});

// POST – Create Tour (With Multiple Photos)
router.post(
  "/",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  uploadFields, // 👈 Changed to accept multiple fields
  async (req: AuthRequest, res) => {
    const {
      title,
      description,
      country,
      departure_date,
      arrival_date,
      hotel,
      breakfast,
      lunch,
      dinner,
      single_supply_price,
      child_price,
      additional_bed,
      country_temperature,
      status,
      seats,
      duration_day,
      duration_night,
      genre
    } = req.body;

    try {
      const slug = slugify(title, { lower: true, strict: true });
      // Access files safely
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const coverFile = files?.["cover_photo"]?.[0];
      const galleryFiles = files?.["photos"] || [];

      // 1. Upload Cover Photo
      let imageUrl = null;
      let imagePublicId = null;
      if (coverFile) {
        const uploadResult = await uploadImage(coverFile);
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.public_id;
      }

      // 2. Upload Gallery Photos
      const galleryUrls: string[] = [];
      for (const file of galleryFiles) {
        const result = await uploadImage(file);
        galleryUrls.push(result.url);
      }

      // 3. Insert into DB
      // Note: We pass galleryUrls array directly because we changed the column to text[]
      const [newTour] = await sql`
        INSERT INTO tours (
          title, slug, description, cover_photo, country, departure_date, arrival_date, child_price,
          duration_day, duration_night, hotel, breakfast, lunch, dinner, genre,
          single_supply_price, additional_bed, country_temperature, status, 
          seats, image_public_id, photos
        ) VALUES (
          ${title}, ${slug}, ${description}, ${imageUrl}, ${country}, ${departure_date}, ${arrival_date}, ${child_price},
          ${duration_day}, ${duration_night}, ${hotel}, ${breakfast}, ${lunch}, ${dinner}, ${genre},
          ${single_supply_price}, ${additional_bed}, ${country_temperature}, 
          ${status || "ACTIVE"}, ${
        seats || 20
      }, ${imagePublicId}, ${galleryUrls}
        )
        RETURNING *
      `;
      res.status(201).json({ message: "Success!", tour: newTour });
    } catch (err: any) {
      console.error("Create Tour Error:", err);
      res.status(500).json({ message: "Failed to create tour" });
    }
  }
);
// PUT – Update Tour
router.put(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  uploadFields,
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      const [existingTour] = await sql`SELECT * FROM tours WHERE id = ${id}`;
      if (!existingTour)
        return res.status(404).json({ message: "Tour not found" });

      // Access files safely
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const coverFile = files?.["cover_photo"]?.[0];
      const galleryFiles = files?.["photos"] || [];

      // 1. Handle Cover Photo Replacement
      let imageUrl = undefined;
      let imagePublicId = undefined;

      if (coverFile) {
        // Delete old cover
        await deleteImage(
          existingTour.image_public_id,
          existingTour.cover_photo
        );
        // Upload new cover
        const uploadResult = await uploadImage(coverFile);
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.public_id;
      }

      // 2. Handle Gallery Photos Logic
      
      // A. Parse the list of "Existing Photos" the user wants to KEEP
      // The frontend sends this as a JSON string: '["url1", "url2"]'
      let keptPhotos: string[] = [];
      if (updates.existing_photos) {
        try {
          keptPhotos = JSON.parse(updates.existing_photos);
        } catch (e) {
          console.error("Failed to parse existing_photos", e);
          keptPhotos = [];
        }
      }

      // B. Find which photos were DELETED (Present in DB but NOT in keptPhotos)
      const oldPhotos = existingTour.photos || [];
      const photosToDelete = oldPhotos.filter((url: string) => !keptPhotos.includes(url));

      // C. Delete removed photos from Cloudinary
      if (photosToDelete.length > 0) {
        console.log(`Deleting ${photosToDelete.length} removed gallery images...`);
        await Promise.all(photosToDelete.map((url: string) => deleteImage(null, url)));
      }

      // D. Upload NEW photos
      const newGalleryUrls: string[] = [];
      for (const file of galleryFiles) {
        const result = await uploadImage(file);
        newGalleryUrls.push(result.url);
      }

      // E. Combine Kept + New
      const finalPhotoList = [...keptPhotos, ...newGalleryUrls];

      // 3. Update DB
      const [updatedTour] = await sql`
        UPDATE tours SET
          title = COALESCE(${updates.title}, title),
          description = COALESCE(${updates.description}, description),
          cover_photo = COALESCE(${imageUrl}, cover_photo),
          image_public_id = COALESCE(${imagePublicId}, image_public_id),
          
          -- Update photos with the calculated final list
          photos = ${finalPhotoList}::text[],

          country = COALESCE(${updates.country}, country),
          departure_date = COALESCE(${updates.departure_date}, departure_date),
          arrival_date = COALESCE(${updates.arrival_date}, arrival_date),
          duration_day = COALESCE(${updates.duration_day}, duration_day),
          duration_night = COALESCE(${updates.duration_night}, duration_night),
          hotel = COALESCE(${updates.hotel}, hotel),
          breakfast = COALESCE(${updates.breakfast}, breakfast),
          lunch = COALESCE(${updates.lunch}, lunch),
          dinner = COALESCE(${updates.dinner}, dinner),
          single_supply_price = COALESCE(${updates.single_supply_price}, single_supply_price),
          child_price = COALESCE(${updates.child_price}, child_price),
          additional_bed = COALESCE(${updates.additional_bed}, additional_bed),
          country_temperature = COALESCE(${updates.country_temperature}, country_temperature),
          status = COALESCE(${updates.status}, status),
          genre = COALESCE($(updates.genre), genre),
          seats = COALESCE(${updates.seats}, seats)
        WHERE id = ${id}
        RETURNING *
      `;
      res.json({ message: "Updated!", tour: updatedTour });
    } catch (err: any) {
      console.error("Update Tour Error:", err);
      res.status(500).json({ message: "Failed to update" });
    }
  }
);

router.delete(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  async (req, res) => {
    try {
      console.log(`Attempting to delete tour ${req.params.id}...`);

      // 1. Get tour details
      const [tour] = await sql`
        SELECT image_public_id, cover_photo, photos 
        FROM tours 
        WHERE id = ${req.params.id}
      `;

      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      console.log("Tour found. Data:", {
        cover: tour.cover_photo,
        photosType: typeof tour.photos,
        photosValue: tour.photos,
      });

      // 2. Delete Cover Photo
      if (tour.cover_photo) {
        await deleteImage(tour.image_public_id, tour.cover_photo);
      }

      // 3. Delete Gallery Photos
      // Handle case where photos might be null or undefined
      const gallery = tour.photos || [];

      if (Array.isArray(gallery) && gallery.length > 0) {
        console.log(`Found ${gallery.length} gallery photos.`);
        await Promise.all(gallery.map((url: string) => deleteImage(null, url)));
      } else {
        console.log("No gallery photos to delete (or format is wrong).");
      }

      // 4. Delete from DB
      await sql`DELETE FROM tours WHERE id = ${req.params.id}`;

      console.log("✅ Tour deleted successfully.");
      res.json({ message: "Deleted" });
    } catch (err: any) {
      console.error("Delete Error:", err);
      res.status(500).json({ message: "Failed to delete" });
    }
  }
);

export default router;
