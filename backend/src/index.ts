// src/server.ts or index.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth";
import tourRouter from "./routes/tours";
import userRouter from "./routes/users";
import uploadRouter from "./routes/upload";
import { hipayRouter } from "./routes/hipayRouter";
import { priceTableRouter } from "./routes/price_tables";
import qpayRouter from "./routes/qpay.routes";
import { slowDown } from "express-slow-down";
import rateLimit from "express-rate-limit";
const app = express();


// const slower = slowDown({
//   windowMs: 15 * 60 * 1000, // 5 minutes
//   delayAfter: 10, // allow 10 requests per `windowMs` (5 minutes) without slowing them down
//   delayMs: (hits) => hits * 200, // add 200 ms of delay to every request after the 10th
//   maxDelayMs: 5000, // max global delay of 5 seconds
// });

// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   limit: 200, // each IP can make up to 20 requests per `windowsMs` (5 minutes)
//   standardHeaders: true, // add the `RateLimit-*` headers to the response
//   legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
// });
//app.use("/example", limiter); // END PATH UGUUD TER PATH IIG L HAMGAALJ BOLNO
// app.use(slower)
// app.use(limiter);
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
      tours: "GET /api/tours",
    },
  });
});
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRouter);
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/hipay", hipayRouter);
app.use("/api/price_table", priceTableRouter);
app.use("/api/qpay", qpayRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found!!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running strong on http://localhost:${PORT}`);
});
