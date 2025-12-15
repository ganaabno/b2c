// src/routes/auth.ts
import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { sql } from "../utils/db";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("⚠️ JWT_SECRET is missing!");
  process.exit(1);
}

const signToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "7d" });
};
const returnUser = (dbUser: any) => ({
  id: dbUser.id,
  firstname: dbUser.firstname,
  lastname: dbUser.lastname,
  email: dbUser.email,
  role: (dbUser.role?.[0] || "CLIENT") as "CLIENT" | "MANAGER" | "ADMIN",
});
// const formatUser = (dbUser: any) => ({
//   id: dbUser.id,
//   name:
//     `${dbUser.firstname || ""} ${dbUser.lastname || ""}`.trim() ||
//     dbUser.firstname ||
//     "User",
//   email: dbUser.email,
//   role: (dbUser.role?.[0] || "CLIENT") as "CLIENT" | "MANAGER" | "ADMIN",
// });

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname?.trim() || !lastname?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const existing =
      await sql`SELECT 1 FROM users WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already taken" });
    }

    //const firstname = firstname;
    //const lastname = parts.slice(1).join(" ") || null;
const FIRSTNAME = firstname;
const LASTNAME = lastname;
    const hash = await argon2.hash(password);

    // THIS IS THE WINNER FOR NEON – pass JS array directly
    const [user] = await sql`
    INSERT INTO users (id, firstname, lastname, email, password, role)
    VALUES (
      ${uuidv4()},
      ${FIRSTNAME},
      ${LASTNAME},
      ${email.toLowerCase()},
      ${hash},
      ${[
        "CLIENT",
      ]}   -- ← pure JS array, driver converts to your enum array automatically
    )
    RETURNING id, firstname, lastname, email, role
  `;

    const token = signToken(user.id, user.role[0]);

    console.log("✅ New user created:", returnUser(user)); // success log

    res.status(201).json({
      token,
      returnUser
    });
  } catch (err: any) {
    console.error("🔥🔥🔥 SIGNUP CRASHED HARD:", err);
    console.error("Error message:", err.message);
    console.error("Full error:", err);
    res.status(500).json({
      message: "Signup failed",
      details: err.message || "Unknown error",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [user] =
      await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;
    if (!user || !(await argon2.verify(user.password, password))) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = signToken(user.id, user.role[0]);

    res.json({
      token,
      user: returnUser(user)
      //  user: formatUser(user),
    });
  } catch (err: any) {
    console.error("🔥 Login failed:", err);
    res.status(500).json({ message: "Login error" });
  }
});

// ME – Critical for page refresh / auto-login
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    const [user] = await sql`
      SELECT id, firstname, lastname, email, role
      FROM users WHERE id = ${payload.id}
    `;

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(returnUser(user));
    //   res.json(formatUser(user));
  } catch (err: any) {
    console.error("🔥 /me error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
