import { Request, Response } from "express";
import axios from "axios";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";
const ENTITY_ID = process.env.HIPAY_ENTITY_ID || "songo.mn";
const CLIENT_SECRET = process.env.HIPAY_CLIENT_SECRET!;

if (!CLIENT_SECRET) {
  throw new Error("HIPAY_CLIENT_SECRET .env-д байхгүй байна шүү!");
}

export const refundPayment = async (req: Request, res: Response) => {
  const { paymentId } = req.body;

  if (!paymentId || typeof paymentId !== "string") {
    return res.status(400).json({
      success: false,
      message: "paymentId шаардлагатай бөгөөд string байх ёстой",
    });
  }

  try {
    const response = await axios.post(
      `${HIPAY_BASE_URL}/payment/cancel`,
      {
        entityId: ENTITY_ID,
        paymentId,
      },
      {
        headers: {
          Authorization: `Bearer ${CLIENT_SECRET}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = response.data;

    if (data.code === "0" || data.code === 0) {
      return res.json({
        success: true,
        message: "Төлбөрийн гүйлгээ амжилттай буцаагдлаа",
        paymentId,
        correctionPaymentId:
          data.correction_paymentId || data.correctionPaymentId || null,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.description || "Буцаалт амжилтгүй боллоо",
        details: data.message || data,
      });
    }
  } catch (error: any) {
    console.error(
      "Hipay төлбөр буцаах алдаа:",
      error.response?.data || error.message
    );

    const errorData = error.response?.data || {};
    return res.status(500).json({
      success: false,
      message:
        "Hipay серверт алдаа гарлаа эсвэл буцаах боломжгүй (магадгүй тухайн өдөр биш эсвэл аль хэдийн буцаагдсан)",
      details: errorData.message || errorData.description || error.message,
      raw: errorData,
    });
  }
};
