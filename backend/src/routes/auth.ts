// // src/routes/auth.ts
// import express from "express";
// import argon2 from "argon2";
// import jwt from "jsonwebtoken";
// import { sql } from "../utils/db";
// import { v4 as uuidv4 } from "uuid";
// import { generateOTP } from "../utils/otpGenerator";
// import sendEmail from "../utils/mailer";

// const router = express.Router();


// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   console.error("⚠️ JWT_SECRET is missing!");
//   process.exit(1);
// }

// const FRONTEND_URL= process.env.FRONTEND_URL || "http://localhost:3000";

// const signToken = (id: string, role: string) => {
//   return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "7d" });
// };
// const returnUser = (dbUser: any) => ({
//   id: dbUser.id,
//   firstname: dbUser.firstname,
//   lastname: dbUser.lastname,
//   email: dbUser.email,
//   role: (dbUser.role || "CLIENT") as "CLIENT" | "MANAGER" | "ADMIN",
//   avatar: dbUser.avatar || "",
//   phone_number: dbUser.phone_number || "",
//   email_verified: dbUser.email_verified || false,
// });
// // const formatUser = (dbUser: any) => ({
// //   id: dbUser.id,
// //   name:
// //     `${dbUser.firstname || ""} ${dbUser.lastname || ""}`.trim() ||
// //     dbUser.firstname ||
// //     "User",
// //   email: dbUser.email,
// //   role: (dbUser.role?.[0] || "CLIENT") as "CLIENT" | "MANAGER" | "ADMIN",
// // });

// router.post("/signup", async (req, res) => {
//   const { firstname, lastname, email, password } = req.body;

//   if (!firstname?.trim() || !lastname?.trim() || !email?.trim() || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   try {
//     const existing =
//       await sql`SELECT 1 FROM users WHERE email = ${email.toLowerCase()}`;
//     if (existing.length > 0) {
//       return res.status(400).json({ message: "Email already taken" });
//     }

//     //const firstname = firstname;
//     //const lastname = parts.slice(1).join(" ") || null;
//     const FIRSTNAME = firstname;
//     const LASTNAME = lastname;
//     const hash = await argon2.hash(password);

//     // THIS IS THE WINNER FOR NEON – pass JS array directly
//     const [user] = await sql`
//     INSERT INTO users (id, firstname, lastname, email, password, role, avatar)
//     VALUES (
//       ${uuidv4()},
//       ${FIRSTNAME},
//       ${LASTNAME},
//       ${email.toLowerCase()},
//       ${hash},
//       ${"CLIENT"} ,
//       ${null}  
//     )
//     RETURNING id, firstname, lastname, email, role, avatar
//   `;

//     const token = signToken(user.id, user.role[0]);

//     console.log("✅ New user created:", returnUser(user)); // success log

//     res.status(201).json({
//       token,
//       user: returnUser(user),
//     });
//   } catch (err: any) {
//     console.error("🔥🔥🔥 SIGNUP CRASHED HARD:", err);
//     console.error("Error message:", err.message);
//     console.error("Full error:", err);
//     res.status(500).json({
//       message: "Signup failed",
//       details: err.message || "Unknown error",
//     });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Имэйл хаяг болон нууц үг шаардлагатай" });
//   }

//   try {
//     const [user] =
//       await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`;
//     if (!user || !(await argon2.verify(user.password, password))) {
//       return res
//         .status(401)
//         .json({ message: "Имэйл эсвэл нууц үг буруу байна." });
//     }

//     const token = signToken(user.id, user.role);

//     res.json({
//       token,
//       user: returnUser(user),
//       //  user: formatUser(user),
//     });
//   } catch (err: any) {
//     console.error("🔥 Login failed:", err);
//     res
//       .status(500)
//       .json({ message: "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу." });
//   }
// });

// // ME – Critical for page refresh / auto-login
// router.get("/me", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader?.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
//     }

//     const token = authHeader.split(" ")[1];
//     const payload = jwt.verify(token, JWT_SECRET) as { id: string };

//     const [user] = await sql`
//       SELECT id, firstname, lastname, email, role, avatar
//       FROM users WHERE id = ${payload.id}
//     `;
//     console.log(user);
//     if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
//     res.json(returnUser(user));

//     //   res.json(formatUser(user));
//   } catch (err: any) {
//     console.error("🔥 /me error:", err);
//     res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна." });
//   }
// });

// // --------------------------
// // Forgot / Reset Password
// // --------------------------
// // Send an OTP to the user's email. We intentionally return a neutral message
// // to avoid disclosing whether the email exists in the system.
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: "Email required" });

//   try {
//     const [user] =
//       await sql`SELECT id, email FROM users WHERE email = ${email.toLowerCase()}`;

//     const neutralResponse = {
//       message: "If an account with that email exists, an OTP has been sent.",
//     };
//     console.log("neutralSENT")

//     if (!user) return res.json(neutralResponse);

//     // Ensure table exists (safe to call repeatedly)
//     await sql`CREATE TABLE IF NOT EXISTS password_reset_tokens (
//       id UUID PRIMARY KEY,
//       user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
//       otp TEXT NOT NULL,
//       expires_at TIMESTAMP,
//       used BOOLEAN DEFAULT false,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`;

//     const otp = generateOTP(6);
//     const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     await sql`
//       INSERT INTO password_reset_tokens (id, user_id, otp, expires_at)
//       VALUES (${uuidv4()}, ${user.id}, ${otp}, ${expires})
//     `;

//     // Send email (best-effort)
//     try {
//       await sendEmail(
//         user.email,
//         "Your password reset code",
//         `Your OTP is ${otp}. It expires in 10 minutes.`,
//         `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #333;">Password Reset</h2>
      
//         <p>Use this code to reset your password:</p>
//         <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center; font-size: 24px; font-weight: bold;">
//           ${otp}
//         </div>
//         <p>This code expires in 10 minutes.</p>
//         <p style="margin-top: 30px; color: #666;">GTC Mongolia</p>
//       </div>
//     `
//       );
//     } catch (mailErr) {
//       console.error("Failed to send reset email:", mailErr);
//       // do not throw — we still respond neutral to the client
//     }

//     res.json(neutralResponse);
//   } catch (err: any) {
//     console.error("🔥 Forgot password error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to process forgot password request" });
//   }
// });

// // Reset password using OTP
// router.post("/reset-password", async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   if (!email || !otp || !newPassword)
//     return res
//       .status(400)
//       .json({ message: "email, otp and newPassword are required" });

//   if (typeof newPassword !== "string" || newPassword.length < 8)
//     return res
//       .status(400)
//       .json({ message: "Password must be at least 8 characters" });

//   try {
//     const [user] =
//       await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
//     if (!user) return res.status(400).json({ message: "Invalid OTP or email" });

//     const [tokenRow] = await sql`
//       SELECT id, expires_at, used FROM password_reset_tokens
//       WHERE user_id = ${user.id} AND otp = ${otp} AND used = false
//       ORDER BY created_at DESC LIMIT 1
//     `;

//     if (!tokenRow)
//       return res.status(400).json({ message: "Invalid OTP or email" });

//     if (new Date(tokenRow.expires_at) < new Date())
//       return res.status(400).json({ message: "OTP expired" });

//     const hash = await argon2.hash(newPassword);
//     await sql`UPDATE users SET password = ${hash} WHERE id = ${user.id}`;
//     await sql`UPDATE password_reset_tokens SET used = true WHERE id = ${tokenRow.id}`;

//     res.json({ message: "Password updated successfully" });
//   } catch (err: any) {
//     console.error("🔥 Reset password failed:", err);
//     res.status(500).json({ message: "Failed to reset password" });
//   }
// });

// export default router;





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

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

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
  phone_number: dbUser.phone_number || "",
  email_verified: dbUser.email_verified || false,
});



// SIGNUP - Modified to include email verification
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

    const FIRSTNAME = firstname;
    const LASTNAME = lastname;
    const hash = await argon2.hash(password);

    // Create user with email_verified = false
    const [user] = await sql`
      INSERT INTO users (
        id, firstname, lastname, email, password, role, avatar, 
        email_verified, phone_number
      )
      VALUES (
        ${uuidv4()},
        ${FIRSTNAME},
        ${LASTNAME},
        ${email.toLowerCase()},
        ${hash},
        ${"CLIENT"},
        ${null},
        ${false},
        ${null}
      )
      RETURNING id, firstname, lastname, email, role, avatar, 
                email_verified, phone_number
    `;

    const token = signToken(user.id, user.role);

    // Generate email verification token
    const verificationToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save verification token
    await sql`
      INSERT INTO email_verification_tokens (user_id, token, expires_at)
      VALUES (${user.id}, ${verificationToken}, ${expiresAt})
    `;

    // Update user with verification token
    await sql`
      UPDATE users 
      SET verification_token = ${verificationToken},
          verification_token_expiry = ${expiresAt}
      WHERE id = ${user.id}
    `;

    // Send verification email
    try {
      const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;
      
      await sendEmail(
        user.email,
        "Verify Your Email Address",
        `Welcome to our platform! Please verify your email by clicking the following link: ${verificationLink}`,
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Welcome to Our Platform!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Hello ${user.firstname},<br><br>
            Thank you for signing up! Please verify your email address to complete your registration.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 500;">
              Verify Email
            </a>
          </div>
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            This link will expire in 24 hours.<br>
            If you didn't create an account, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <code style="background-color: #f5f5f5; padding: 5px 10px; border-radius: 3px; font-size: 12px;">
              ${verificationLink}
            </code>
          </p>
        </div>
        `
      );
      
      console.log("✅ Verification email sent to:", user.email);
    } catch (emailError) {
      console.error("❌ Failed to send verification email:", emailError);
      // Don't fail the signup if email fails
    }

    console.log("✅ New user created:", returnUser(user));

    res.status(201).json({
      token,
      user: returnUser(user),
      message: "Account created successfully! Please check your email to verify your account."
    });
  } catch (err: any) {
    console.error("🔥🔥🔥 SIGNUP CRASHED HARD:", err);
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

    // Check if email is verified
    if (!user.email_verified) {
      return res.json({
        token,
        user: returnUser(user),
        requiresVerification: true,
        message: "Please verify your email to access all features"
      });
    }

    res.json({
      token,
      user: returnUser(user),
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
      SELECT id, firstname, lastname, email, role, avatar, 
             email_verified, phone_number
      FROM users WHERE id = ${payload.id}
    `;
    
    if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    
    res.json(returnUser(user));
  } catch (err: any) {
    console.error("🔥 /me error:", err);
    res.status(401).json({ message: "Имэйл эсвэл нууц үг буруу байна." });
  }
});

// SEND VERIFICATION EMAIL
router.post("/send-verification-email", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    const [user] = await sql`
      SELECT id, firstname, lastname, email, email_verified
      FROM users WHERE id = ${payload.id}
    `;
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    if (user.email_verified) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already verified" 
      });
    }

    // Generate new verification token
    const verificationToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Invalidate previous tokens
    await sql`
      UPDATE email_verification_tokens 
      SET used = TRUE 
      WHERE user_id = ${user.id} AND used = FALSE
    `;

    // Save new token
    await sql`
      INSERT INTO email_verification_tokens (user_id, token, expires_at)
      VALUES (${user.id}, ${verificationToken}, ${expiresAt})
    `;

    // Update user with new verification token
    await sql`
      UPDATE users 
      SET verification_token = ${verificationToken},
          verification_token_expiry = ${expiresAt}
      WHERE id = ${user.id}
    `;

    // Send verification email
    const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    await sendEmail(
      user.email,
      "Verify Your Email Address",
      `Please verify your email by clicking the following link: ${verificationLink}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Hello ${user.firstname},<br><br>
          Please click the button below to verify your email address:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 500;">
            Verify Email
          </a>
        </div>
        <p style="color: #999; font-size: 14px; line-height: 1.6;">
          This link will expire in 24 hours.<br>
          If you didn't request this verification, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <code style="background-color: #f5f5f5; padding: 5px 10px; border-radius: 3px; font-size: 12px;">
            ${verificationLink}
          </code>
        </p>
      </div>
      `
    );

    res.json({ 
      success: true,
      message: "Verification email sent successfully" 
    });
  } catch (error: any) {
    console.error('🔥 Send verification email error:', error);
    
    // Handle JWT errors specifically
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid authentication token" 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to send verification email"
    });
  }
});

// VERIFY EMAIL
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: "Verification token is required" 
      });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
    } catch (jwtError) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired verification token" 
      });
    }

    // Check token in database
    const [tokenRecord] = await sql`
      SELECT ev.*, u.email_verified
      FROM email_verification_tokens ev
      JOIN users u ON ev.user_id = u.id
      WHERE ev.token = ${token} 
        AND ev.used = FALSE 
        AND ev.expires_at > NOW()
      LIMIT 1
    `;

    if (!tokenRecord) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired verification token" 
      });
    }

    if (tokenRecord.email_verified) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already verified" 
      });
    }

    // Mark email as verified
    await sql`
      UPDATE users 
      SET email_verified = TRUE,
          verification_token = NULL,
          verification_token_expiry = NULL
      WHERE id = ${tokenRecord.user_id}
    `;

    // Mark token as used
    await sql`
      UPDATE email_verification_tokens 
      SET used = TRUE 
      WHERE id = ${tokenRecord.id}
    `;

    res.json({ 
      success: true,
      message: "Email verified successfully! You can now log in with full access."
    });
  } catch (error: any) {
    console.error('🔥 Verify email error:', error);
    res.status(500).json({ 
      success: false,
      message: "Failed to verify email" 
    });
  }
});

// CHECK VERIFICATION STATUS
router.get("/check-verification", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    const [user] = await sql`
      SELECT email_verified 
      FROM users WHERE id = ${payload.id}
    `;
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true,
      email_verified: user.email_verified 
    });
  } catch (error: any) {
    console.error('🔥 Check verification error:', error);
    res.status(500).json({ 
      success: false,
      message: "Failed to check verification status" 
    });
  }
});

// --------------------------
// Forgot / Reset Password
// --------------------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const [user] =
      await sql`SELECT id, email FROM users WHERE email = ${email.toLowerCase()}`;

    const neutralResponse = {
      message: "If an account with that email exists, an OTP has been sent.",
    };

    if (!user) return res.json(neutralResponse);

    // Ensure table exists
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

    // Send email
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

// Add this route to your existing auth.ts
router.post("/change-password", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    // Get user with password
    const [user] = await sql`
      SELECT * FROM users WHERE id = ${payload.id}
    `;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isPasswordValid = await argon2.verify(user.password, currentPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const newHash = await argon2.hash(newPassword);

    // Update password
    await sql`
      UPDATE users 
      SET password = ${newHash}, updated_at = NOW()
      WHERE id = ${payload.id}
    `;

    res.json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Change password error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    res.status(500).json({ message: "Failed to change password" });
  }
});

export default router;