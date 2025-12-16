// src/server.ts or index.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import tourRoutes from "./routes/trips";
import userRoutes from "./routes/users";
import uploadRouter from "./routes/upload";
import requestRoutes from "./routes/requests"
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

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
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRoutes);
app.use("/api/trips", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running strong on http://localhost:${PORT}`);
});
