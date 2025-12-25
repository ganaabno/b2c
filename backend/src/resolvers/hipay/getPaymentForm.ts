// src/resolvers/hipay/getPaymentForm.ts
import { Request, Response } from "express";
import axios from "axios";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";
const ENTITY_ID = process.env.HIPAY_ENTITY_ID || "gtctrave"; // Чиний entity_id
const CLIENT_SECRET = process.env.HIPAY_CLIENT_SECRET!;

if (!CLIENT_SECRET) {
  throw new Error("HIPAY_CLIENT_SECRET .env-д байхгүй байна шүү!");
}

export const getPaymentForm = async (req: Request, res: Response) => {
  const { checkoutId, lang = "mn", email, phone } = req.query;

  if (!checkoutId || typeof checkoutId !== "string") {
    return res.status(400).json({
      success: false,
      message: "checkoutId шаардлагатай бөгөөд string байх ёстой",
    });
  }

  // HiPay payment form руу шууд GET request илгээж статус шалгах
  try {
    const response = await axios.get(`${HIPAY_BASE_URL}/payment/`, {
      params: {
        checkoutId,
        lang,
        ...(email && { email }),
        ...(phone && { phone }),
      },
      headers: {
        Accept: "application/json",
      },
    });

    const data = response.data;

    if (data.code === "0") {
      return res.json({
        success: true,
        message: "Төлбөрийн форм бэлэн",
        checkoutId,
        formUrl: `${HIPAY_BASE_URL}/payment/?checkoutId=${checkoutId}&lang=${lang}${
          email ? `&email=${email}` : ""
        }${phone ? `&phone=${phone}` : ""}`,
        details: data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.description || "Форм дуудахад алдаа гарлаа",
        details: data.message || data,
      });
    }
  } catch (error: any) {
    console.error(
      "HiPay payment form алдаа:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "HiPay серверт алдаа гарлаа (сервер down байж магадгүй)",
      details: error.response?.data || error.message,
    });
  }
};
