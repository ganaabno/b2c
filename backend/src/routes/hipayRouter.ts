import express from "express";
import axios from "axios";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";
import { nehemjlehUusgeh } from "../resolvers/hipay/nehemjlehUusgeh";
import webhook from "../resolvers/hipay/webhook";
export const hipayRouter = express.Router();

hipayRouter.post("/checkout", nehemjlehUusgeh);
hipayRouter.get("/webhook", webhook)
//checkout id HPSM251223104136000000023
