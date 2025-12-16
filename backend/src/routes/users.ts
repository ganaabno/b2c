import express from "express";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";
import { sql } from "../utils/db";

const router = express.Router();

// Get my profile
router.get("/me", protect, async (req: AuthRequest, res) => {
  const [user] = await sql`SELECT id, name, email, role FROM users WHERE id = ${
    req.user!.id
  }`;
  res.json(user);
});
//Update my profile
router.put("/me", protect, async (req: AuthRequest, res) => {
  try {
    // 3. Safety Check: TypeScript knows req.user exists, but good to be sure
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { firstname, lastname, phone_number,  avatar } = req.body;

    const [updatedUser] = await sql`
      UPDATE users 
      SET 
        firstname = ${firstname ?? null},
        lastname = ${lastname ?? null},
        phone_number = ${phone_number ?? null},
       
        avatar = ${avatar ?? null}
      WHERE id = ${req.user.id}  -- 👈 This is how it knows WHICH user to update
      RETURNING id, firstname, lastname, email, phone_number,  avatar, role
    `;

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Admin only: get all users
router.get("/", protect, restrictTo("ADMIN"), async (req, res) => {
  const users =
    await sql`SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`;
  res.json(users);
});

export default router;
