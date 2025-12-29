// src/routes/auth.ts
import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { sql } from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { generateOTP } from "../utils/otpGenerator";
import sendEmail from "../utils/mailer";
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
  role: (dbUser.role || "CLIENT") as "CLIENT" | "MANAGER" | "ADMIN",
  avatar: dbUser.avatar || "",
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
    INSERT INTO users (id, firstname, lastname, email, password, role, avatar)
    VALUES (
      ${uuidv4()},
      ${FIRSTNAME},
      ${LASTNAME},
      ${email.toLowerCase()},
      ${hash},
      ${"CLIENT"} ,
      ${null}  
    )
    RETURNING id, firstname, lastname, email, role, avatar
  `;

    const token = signToken(user.id, user.role[0]);

    console.log("✅ New user created:", returnUser(user)); // success log

    res.status(201).json({
      token,
      user: returnUser(user),
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
    return res
      .status(400)
      .json({ message: "Имэйл хаяг болон нууц үг шаардлагатай" });
  }

  try {
    const [user] =
      await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;
    if (!user || !(await argon2.verify(user.password, password))) {
      return res
        .status(401)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна." });
    }

    const token = signToken(user.id, user.role);

    res.json({
      token,
      user: returnUser(user),
      //  user: formatUser(user),
    });
  } catch (err: any) {
    console.error("🔥 Login failed:", err);
    res
      .status(500)
      .json({ message: "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу." });
  }
});

// ME – Critical for page refresh / auto-login
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    const [user] = await sql`
      SELECT id, firstname, lastname, email, role, avatar
      FROM users WHERE id = ${payload.id}
    `;
    console.log(user);
    if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    res.json(returnUser(user));

    //   res.json(formatUser(user));
  } catch (err: any) {
    console.error("🔥 /me error:", err);
    res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна." });
  }
});

// --------------------------
// Forgot / Reset Password
// --------------------------
// Send an OTP to the user's email. We intentionally return a neutral message
// to avoid disclosing whether the email exists in the system.
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const [user] =
      await sql`SELECT id, email FROM users WHERE email = ${email.toLowerCase()}`;

    const neutralResponse = {
      message: "If an account with that email exists, an OTP has been sent.",
    };
    console.log("neutralSENT")

    if (!user) return res.json(neutralResponse);

    // Ensure table exists (safe to call repeatedly)
    await sql`CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id UUID PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      otp TEXT NOT NULL,
      expires_at TIMESTAMP,
      used BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    const otp = generateOTP(6);
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await sql`
      INSERT INTO password_reset_tokens (id, user_id, otp, expires_at)
      VALUES (${uuidv4()}, ${user.id}, ${otp}, ${expires})
    `;

    // Send email (best-effort)
    try {
      await sendEmail(
        user.email,
        "Your password reset code",
        `Your OTP is ${otp}. It expires in 10 minutes.`,
        `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset</h2>
      
        <p>Use this code to reset your password:</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center; font-size: 24px; font-weight: bold;">
          ${otp}
        </div>
        <p>This code expires in 10 minutes.</p>
        <p style="margin-top: 30px; color: #666;">GTC Mongolia</p>
      </div>
    `
      );
    } catch (mailErr) {
      console.error("Failed to send reset email:", mailErr);
      // do not throw — we still respond neutral to the client
    }

    res.json(neutralResponse);
  } catch (err: any) {
    console.error("🔥 Forgot password error:", err);
    res
      .status(500)
      .json({ message: "Failed to process forgot password request" });
  }
});

// Reset password using OTP
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword)
    return res
      .status(400)
      .json({ message: "email, otp and newPassword are required" });

  if (typeof newPassword !== "string" || newPassword.length < 8)
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });

  try {
    const [user] =
      await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
    if (!user) return res.status(400).json({ message: "Invalid OTP or email" });

    const [tokenRow] = await sql`
      SELECT id, expires_at, used FROM password_reset_tokens
      WHERE user_id = ${user.id} AND otp = ${otp} AND used = false
      ORDER BY created_at DESC LIMIT 1
    `;

    if (!tokenRow)
      return res.status(400).json({ message: "Invalid OTP or email" });

    if (new Date(tokenRow.expires_at) < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const hash = await argon2.hash(newPassword);
    await sql`UPDATE users SET password = ${hash} WHERE id = ${user.id}`;
    await sql`UPDATE password_reset_tokens SET used = true WHERE id = ${tokenRow.id}`;

    res.json({ message: "Password updated successfully" });
  } catch (err: any) {
    console.error("🔥 Reset password failed:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

export default router;
