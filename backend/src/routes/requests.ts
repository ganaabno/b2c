import express from "express";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { sql } from "../utils/db";

const router = express.Router();

// ---PROVIDER REQUEST ---
router.post("/provider", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser =
      await sql`SELECT 1 FROM users WHERE email = ${email.toLowerCase()}`;
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already registered as a user" });
    }

    const existingRequest =
      await sql`SELECT 1 FROM provider_requests WHERE email = ${email.toLowerCase()}`;
    if (existingRequest.length > 0) {
      return res
        .status(400)
        .json({ message: "A request for this email is already pending" });
    }

    const hash = await argon2.hash(password);

    await sql`
      INSERT INTO provider_requests (id, firstname, lastname, email, password, request_status)
      VALUES (${uuidv4()}, ${firstname}, ${lastname}, ${email.toLowerCase()}, ${hash}, 'PENDING')
    `;

    res
      .status(201)
      .json({ message: "Manager application submitted successfully" });
  } catch (error) {
    console.error("Manager Request Error:", error);
    res.status(500).json({ message: "Failed to submit request" });
  }
});

// --- MANAGER REQUEST ---
router.post("/manager", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser =
      await sql`SELECT 1 FROM users WHERE email = ${email.toLowerCase()}`;
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already registered as a user" });
    }

    const existingRequest =
      await sql`SELECT 1 FROM manager_requests WHERE email = ${email.toLowerCase()}`;
    if (existingRequest.length > 0) {
      return res
        .status(400)
        .json({ message: "A request for this email is already pending" });
    }

    const hash = await argon2.hash(password);

    await sql`
      INSERT INTO manager_requests (id, firstname, lastname, email, password, requeststatus)
      VALUES (${uuidv4()}, ${firstname}, ${lastname}, ${email.toLowerCase()}, ${hash}, 'PENDING')
    `;

    res
      .status(201)
      .json({ message: "Manager application submitted successfully" });
  } catch (error) {
    console.error("Manager Request Error:", error);
    res.status(500).json({ message: "Failed to submit request" });
  }
});

// --- NEW: SUB-CONTRACTOR REQUEST ---
router.post("/subcontractor", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // 1. Validation
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 2. Check Users Table
    const existingUser =
      await sql`SELECT 1 FROM users WHERE email = ${email.toLowerCase()}`;
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already registered as a user" });
    }

    // 3. Check Subcontractor Requests Table
    const existingRequest =
      await sql`SELECT 1 FROM subcontractor_requests WHERE email = ${email.toLowerCase()}`;
    if (existingRequest.length > 0) {
      return res
        .status(400)
        .json({ message: "A request for this email is already pending" });
    }

    // 4. Hash Password
    const hash = await argon2.hash(password);

    // 5. Insert
    await sql`
      INSERT INTO subcontractor_requests (id, firstname, lastname, email, password, request_status)
      VALUES (
        ${uuidv4()},
        ${firstname},
        ${lastname},
        ${email.toLowerCase()},
        ${hash},
        'PENDING'
      )
    `;

    res
      .status(201)
      .json({ message: "Sub-contractor application submitted successfully" });
  } catch (error) {
    console.error("Subcontractor Request Error:", error);
    res.status(500).json({ message: "Failed to submit request" });
  }
});

export default router;
