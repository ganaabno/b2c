// src/routes/trips.ts
import express from "express";
import { sql } from "../utils/db";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";

const router = express.Router();

// GET all trips – public (anyone can browse)
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
// CREATE new trip – only MANAGER or ADMIN
router.post(
  "/",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  async (req: AuthRequest, res) => {
    const { title, description, price, duration_days, image_url } = req.body;

    if (!title || !price) {
      return res
        .status(400)
        .json({ message: "Title and price are required!" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    try {
      const [newTrip] = await sql`
        INSERT INTO trips (title, description, price, duration_days, image_url, created_by)
        VALUES (
          ${title},
          ${description},
          ${price},
          ${duration_days},
          ${image_url},
          ${req.user.id}
        )
        RETURNING 
          id, title, description, price, duration_days AS duration, image_url AS image, created_at
      `;

      res.status(201).json(newTrip);
    } catch (err: any) {
      console.error("🔥 Create trip failed:", err.message);
      res.status(500).json({ message: "Failed to create trip" });
    }
  }
);

// UPDATE trip – only MANAGER or ADMIN
router.put(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const { title, description, price, duration_days, image_url } = req.body;

    try {
      const [updatedTrip] = await sql`
        UPDATE trips
        SET
          title = COALESCE(${title}, title),
          description = COALESCE(${description}, description),
          price = COALESCE(${price}, price),
          duration_days = COALESCE(${duration_days}, duration_days),
          image_url = COALESCE(${image_url}, image_url)
        WHERE id = ${id}
        RETURNING 
          id, title, description, price, duration_days AS duration, image_url AS image, created_at
      `;

      if (!updatedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      res.json(updatedTrip);
    } catch (err: any) {
      console.error("🔥 Update trip failed:", err.message);
      res.status(500).json({ message: "Failed to update trip" });
    }
  }
);

// DELETE trip – only MANAGER or ADMIN
router.delete(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  async (req: AuthRequest, res) => {
    const { id } = req.params;

    try {
      const [deletedTrip] = await sql`
        DELETE FROM trips
        WHERE id = ${id}
        RETURNING id, title
      `;

      if (!deletedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      res.json({ message: "Trip deleted successfully 🚀", trip: deletedTrip });
    } catch (err: any) {
      console.error("🔥 Delete trip failed:", err.message);
      res.status(500).json({ message: "Failed to delete trip" });
    }
  }
);

export default router;
