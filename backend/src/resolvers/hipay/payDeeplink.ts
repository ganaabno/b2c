import { Request, Response } from "express";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";

export const getPaymentDeeplink = (req: Request, res: Response) => {
  const checkoutId = (req.body.checkoutId ||
    req.params.checkoutId ||
    req.query.checkoutId) as string;

  if (
    !checkoutId ||
    typeof checkoutId !== "string" ||
    checkoutId.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "checkoutId шаардлагатай бөгөөд зөв string байх ёстой",
    });
  }

  const deeplink = `hipay:///pay/${checkoutId.trim()}`;
  const webPaymentUrl = `${HIPAY_BASE_URL}/pay/${checkoutId.trim()}`;

  return res.json({
    success: true,
    checkoutId: checkoutId.trim(),
    deeplink, // Mobile HiPay app руу шууд нээх
    webPaymentUrl, // Browser дээр fallback болгох
    message:
      "Deeplink-ийг ашиглан HiPay аппыг нээж төлбөр төлнө үү. Хэрэв апп байхгүй бол webPaymentUrl руу орно уу.",
  });
};
