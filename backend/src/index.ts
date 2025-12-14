// src/server.ts or index.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import tourRoutes from "./routes/trips";
import userRoutes from "./routes/users";

const app = express();

// 🔑 CRITICAL: These MUST come BEFORE your routes!
app.use(
  cors({
    origin: ["http://localhost:5173"], // Vite default port
    credentials: true,
  })
);

app.use(express.json()); // ← Parse JSON bodies
app.use(morgan("dev")); // ← Logging

// Optional nice root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🌍 Gloval Travel API is LIVE AND READY",
    status: "success",
    timestamp: new Date().toISOString(),
    endpoints: {
      login: "POST /api/auth/login",
      signup: "POST /api/auth/signup",
      me: "GET /api/auth/me (protected)",
      trips: "GET /api/trips",
    },
  });
});

// Now mount your routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tourRoutes);
app.use("/api/users", userRoutes);

// 404 handler (optional but nice)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running strong on http://localhost:${PORT}`);
});
