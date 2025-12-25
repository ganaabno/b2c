import { Request, Response } from "express";
import axios from "axios";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";
const ENTITY_ID = process.env.HIPAY_ENTITY_ID || "songo.mn";
const CLIENT_SECRET = process.env.HIPAY_CLIENT_SECRET!;

export const cancelNehemjleh = async (req: Request, res: Response) => {
  const { checkoutId } = req.body;

  if (!checkoutId) {
    return res
      .status(400)
      .json({ success: false, message: "checkoutId шаардлагатай" });
  }

  try {
    const response = await axios.post(
      `${HIPAY_BASE_URL}/checkout/cancel`,
      { checkoutId },
      {
        headers: {
          Authorization: `Bearer ${CLIENT_SECRET}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = response.data;

    if (data.code === "0") {
      return res.json({
        success: true,
        message: "Нэхэмжлэх амжилттай цуцлагдлаа",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.description,
        details: data.message,
      });
    }
  } catch (error: any) {
    console.error("Hipay cancel алдаа:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Серверт алдаа гарлаа",
      details: error.response?.data || error.message,
    });
  }
};
