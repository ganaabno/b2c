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

// Admin only: get all users
router.get("/", protect, restrictTo("ADMIN"), async (req, res) => {
  const users =
    await sql`SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`;
  res.json(users);
});

export default router;
