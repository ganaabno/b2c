// src/routes/trips.ts
import express from "express";
import { sql } from "../utils/db";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";

const router = express.Router();

// GET all trips – public (anyone can see)
router.get("/", async (req, res) => {
  try {
    const trips = await sql`
      SELECT 
        id,
        title,
        description,
        cover_photo AS image,                    
        country,
        departure_date,
        hotel,
        photos,
        flight_seats,
        breakfast,
        lunch,
        dinner,
        single_supply_price AS price,            
        additional_bed,
        country_temperature,
        created_at
      FROM trips
      ORDER BY created_at DESC
    `;
    res.json(trips);
  } catch (err: any) {
    console.error("🔥 Failed to fetch trips:", err.message);
    res.status(500).json({ message: "Failed to load trips" });
  }
});

// POST – Create new trip (MANAGER or ADMIN only)
router.post(
  "/",
  protect, // ← Verify token + attach req.user
  restrictTo("MANAGER", "ADMIN"), // ← Only these roles allowed
  async (req: AuthRequest, res) => {
    const {
      title,
      description,
      cover_photo,
      country,
      departure_date,
      hotel,
      breakfast,
      lunch,
      dinner,
      single_supply_price,
      additional_bed,
      country_temperature,
    } = req.body;

    if (!title?.trim() || !single_supply_price?.trim()) {
      return res.status(400).json({ message: "Title and price are required!" });
    }

    try {
      const [newTrip] = await sql`
        INSERT INTO trips (
          title, 
          description, 
          cover_photo, 
          country, 
          departure_date,
          hotel, 
          breakfast, 
          lunch, 
          dinner,
          single_supply_price, 
          additional_bed, 
          country_temperature
        ) VALUES (
          ${title.trim()}, 
          ${description?.trim() || null}, 
          ${cover_photo?.trim() || null}, 
          ${country?.trim() || null}, 
          ${departure_date || null},
          ${hotel?.trim() || null}, 
          ${breakfast?.trim() || null}, 
          ${lunch?.trim() || null}, 
          ${dinner?.trim() || null},
          ${single_supply_price.trim()}, 
          ${additional_bed?.trim() || null}, 
          ${country_temperature?.trim() || null}
        )
        RETURNING 
          id, 
          title, 
          description, 
          cover_photo AS image, 
          country,
          departure_date, 
          hotel, 
          breakfast, 
          lunch, 
          dinner,
          single_supply_price AS price, 
          additional_bed, 
          country_temperature, 
          created_at
      `;

      res.status(201).json({
        message: "Шинэ аялал амжилттай нэмэгдлээ! 🚀",
        trip: newTrip,
      });
    } catch (err: any) {
      console.error("🔥 Create trip failed:", err.message);
      res
        .status(500)
        .json({ message: "Failed to create trip", error: err.message });
    }
  }
);

// PUT – Update trip (MANAGER or ADMIN only)
router.put(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Don't allow empty updates
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    try {
      const [updatedTrip] = await sql`
        UPDATE trips
        SET
          title = COALESCE(${updates.title}, title),
          description = COALESCE(${updates.description}, description),
          cover_photo = COALESCE(${updates.cover_photo}, cover_photo),
          country = COALESCE(${updates.country}, country),
          departure_date = COALESCE(${updates.departure_date}, departure_date),
          hotel = COALESCE(${updates.hotel}, hotel),
          breakfast = COALESCE(${updates.breakfast}, breakfast),
          lunch = COALESCE(${updates.lunch}, lunch),
          dinner = COALESCE(${updates.dinner}, dinner),
          single_supply_price = COALESCE(${updates.single_supply_price}, single_supply_price),
          additional_bed = COALESCE(${updates.additional_bed}, additional_bed),
          country_temperature = COALESCE(${updates.country_temperature}, country_temperature)
        WHERE id = ${id}
        RETURNING 
          id, 
          title, 
          description, 
          cover_photo AS image, 
          country,
          departure_date, 
          hotel, 
          breakfast, 
          lunch, 
          dinner,
          single_supply_price AS price, 
          additional_bed, 
          country_temperature, 
          created_at
      `;

      if (!updatedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      res.json({
        message: "Аялал амжилттай шинэчлэгдлээ! ✏️",
        trip: updatedTrip,
      });
    } catch (err: any) {
      console.error("🔥 Update trip failed:", err.message);
      res.status(500).json({ message: "Failed to update trip" });
    }
  }
);

// DELETE – Remove trip (MANAGER or ADMIN only)
router.delete(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  async (req: AuthRequest, res) => {
    const { id } = req.params;

    try {
      const [deleted] = await sql`
        DELETE FROM trips 
        WHERE id = ${id}
        RETURNING id, title
      `;

      if (!deleted) {
        return res.status(404).json({ message: "Trip not found" });
      }

      res.json({
        message: "Аялал устгагдлаа! 🗑️",
        trip: deleted,
      });
    } catch (err: any) {
      console.error("🔥 Delete failed:", err.message);
      res.status(500).json({ message: "Failed to delete trip" });
    }
  }
);

export default router;
