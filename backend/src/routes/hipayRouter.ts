// src/routes/hipayRouter.ts
import express from "express";
import { protect } from "../middleware/auth";
import { nehemjlehUusgeh } from "../resolvers/hipay/nehemjlehUusgeh";
import { getNehemjlehStatus } from "../resolvers/hipay/getNehemjlehStatus";
import { hipayWebhook } from "../resolvers/hipay/webhook";
import { cancelNehemjleh } from "../resolvers/hipay/cancelNehemjleh";
import { refundPayment } from "../resolvers/hipay/refundPayment";
import { getPaymentDeeplink } from "../resolvers/hipay/payDeeplink";

export const hipayRouter = express.Router();

// Нэхэмжлэх үүсгэх (protected)
hipayRouter.post("/checkout", nehemjlehUusgeh);

// Статус шалгах (protected)
hipayRouter.get("/status/:checkoutId", getNehemjlehStatus);

// Public статус шалгах (frontend polling-д зориулсан)
hipayRouter.get("/public/status/:checkoutId", getNehemjlehStatus);

// Нэхэмжлэх цуцлах
hipayRouter.post("/cancel", cancelNehemjleh);

// Guilgee butsaah
hipayRouter.post("/refund", refundPayment);

hipayRouter.post("/pay-deeplink", getPaymentDeeplink);

// Webhook (public, POST, raw body хэрэгтэй бол express.raw нэмж болно)
hipayRouter.get("/webhook", hipayWebhook);
