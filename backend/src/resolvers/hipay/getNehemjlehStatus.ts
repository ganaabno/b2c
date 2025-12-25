// src/resolvers/hipay/getNehemjlehStatus.ts
import { Request, Response } from "express";
import axios from "axios";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";
const ENTITY_ID = process.env.HIPAY_ENTITY_ID || "songo.mn";
const CLIENT_SECRET = process.env.HIPAY_CLIENT_SECRET!;

export const getNehemjlehStatus = async (req: Request, res: Response) => {
  const { checkoutId } = req.params;

  if (!checkoutId) {
    return res
      .status(400)
      .json({ success: false, message: "checkoutId шаардлагатай" });
  }

  try {
    const response = await axios.get(
      `${HIPAY_BASE_URL}/checkout/get/${checkoutId}`,
      {
        params: { entityId: ENTITY_ID },
        headers: {
          Authorization: `Bearer ${CLIENT_SECRET}`,
          Accept: "application/json",
        },
      }
    );

    const data = response.data;

    if (data.code === "0") {
      return res.json({
        success: true,
        status: data.status,
        amount: data.amount,
        paymentId: data.paymentId || null,
        paymentType: data.paymentType || null,
        statusDate: data.status_date,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.description,
        details: data.message,
      });
    }
  } catch (error: any) {
    console.error(
      "Hipay status check алдаа:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Серверт алдаа гарлаа",
      details: error.response?.data || error.message,
    });
  }
};
