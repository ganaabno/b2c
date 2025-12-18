// src/routes/tours.ts
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { sql } from "../utils/db";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";

const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Multer (Use Memory Storage, not Disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- HELPER: Upload to Cloudinary ---
const uploadImage = async (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "travel-app-tours", // Folder in Cloudinary
  });
  return { url: result.secure_url, public_id: result.public_id };
};
const deleteImage = async (
  publicId: string | null,
  imageUrl: string | null
) => {
  let idToDelete = publicId;
  // FALLBACK: If no public_id (old data), try to extract from URL
  if (!idToDelete && imageUrl) {
    try {
      // Example URL: https://res.cloudinary.com/.../upload/v1234/travel-app-tours/image.jpg
      const parts = imageUrl.split("/");
      const filename = parts.pop(); // image.jpg
      const folder = parts.pop(); // travel-app-tours
      if (filename && folder) {
        // Remove file extension (.jpg)
        const nameWithoutExt = filename.split(".")[0];
        idToDelete = `${folder}/${nameWithoutExt}`;
      }
    } catch (e) {
      console.log("Could not extract ID from URL");
    }
  }

  if (!idToDelete) return;

  try {
    console.log(`Attempting to delete Cloudinary Image: ${idToDelete}`);
    const result = await cloudinary.uploader.destroy(idToDelete);
    console.log("Cloudinary Delete Result:", result); // { result: 'ok' } or { result: 'not found' }
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
  }
};

// GET all tours
router.get("/", async (req, res) => {
  try {
    // We map 'cover_photo' to 'image' for frontend compatibility
    const tours = await sql`
      SELECT *, cover_photo as image FROM tours ORDER BY created_at DESC
    `;
    res.json(tours);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to load tours" });
  }
});
//GET one tour by id 
router.get("/:id", async(req,res)=>{
  const { id } = req.params;
  try{
    const one_tour = await sql`SELECT *, cover_photo as image FROM tours WHERE id = ${id}`
    res.json(one_tour)
  }catch(err:any){
    res.status(500).json({message: "Failed to get a tour"})
  }
})

// POST – Create Tour (With Cloudinary Upload)
router.post(
  "/",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  upload.single("cover_photo"), // Expects 'cover_photo' field
  async (req: AuthRequest, res) => {
    const {
      title,
      description,
      country,
      departure_date,
      hotel,
      breakfast,
      lunch,
      dinner,
      single_supply_price,
      additional_bed,
      country_temperature,
      status,
      seats,
    } = req.body;

    try {
      // Upload to Cloudinary if file exists
      let imageUrl = null;
      let imagePublicId = null;
      if (req.file) {
        const uploadResult = await uploadImage(req.file);
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.public_id;
      }

      const [newTour] = await sql`
        INSERT INTO tours (
          title, description, cover_photo, country, departure_date,
          hotel, breakfast, lunch, dinner, single_supply_price,
          additional_bed, country_temperature, status, seats, image_public_id
        ) VALUES (
          ${title}, ${description}, ${imageUrl}, ${country}, ${departure_date},
          ${hotel}, ${breakfast}, ${lunch}, ${dinner}, ${single_supply_price},
          ${additional_bed}, ${country_temperature}, ${status || "ACTIVE"}, ${
        seats || 20
      }, ${imagePublicId}
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
router.put(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  upload.single("cover_photo"),
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      const [existingTour] = await sql`SELECT * FROM tours WHERE id = ${id}`;
      if (!existingTour) return res.status(404).json({ message: "Tour not found" });

      let imageUrl = undefined;
      let imagePublicId = undefined;

      if (req.file) {
        // 👇 Use the new robust delete function
        await deleteImage(existingTour.image_public_id, existingTour.cover_photo);
        
        const uploadResult = await uploadImage(req.file);
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.public_id;
      }

      const [updatedTour] = await sql`
        UPDATE tours SET
          title = COALESCE(${updates.title}, title),
          description = COALESCE(${updates.description}, description),
          cover_photo = COALESCE(${imageUrl}, cover_photo),
          image_public_id = COALESCE(${imagePublicId}, image_public_id),
          country = COALESCE(${updates.country}, country),
          departure_date = COALESCE(${updates.departure_date}, departure_date),
          hotel = COALESCE(${updates.hotel}, hotel),
          breakfast = COALESCE(${updates.breakfast}, breakfast),
          lunch = COALESCE(${updates.lunch}, lunch),
          dinner = COALESCE(${updates.dinner}, dinner),
          single_supply_price = COALESCE(${updates.single_supply_price}, single_supply_price),
          additional_bed = COALESCE(${updates.additional_bed}, additional_bed),
          country_temperature = COALESCE(${updates.country_temperature}, country_temperature),
          status = COALESCE(${updates.status}, status),
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
      // 1. Get tour to find image ID or URL
      const [tour] = await sql`SELECT image_public_id, cover_photo FROM tours WHERE id = ${req.params.id}`;
      
      if (tour) {
        // 👇 Use the new robust delete function
        await deleteImage(tour.image_public_id, tour.cover_photo);
      }

      // 2. Delete from DB
      await sql`DELETE FROM tours WHERE id = ${req.params.id}`;
      res.json({ message: "Deleted" });
    } catch (err: any) {
      console.error("Delete Error:", err);
      res.status(500).json({ message: "Failed to delete" });
    }
  }
);

export default router;
