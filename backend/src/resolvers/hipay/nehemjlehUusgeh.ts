import { Request, Response } from "express";
import axios from "axios";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";
const ENTITY_ID = process.env.HIPAY_ENTITY_ID || "songo.mn";
const CLIENT_SECRET = process.env.HIPAY_CLIENT_SECRET;

if (!CLIENT_SECRET) {
  throw new Error("HIPAY_CLIENT_SECRET .env-д байхгүй байна шүү!");
}

export const nehemjlehUusgeh = async (req: Request, res: Response) => {
  console.log("🔵 /api/hipay/checkout руу request ирлээ!");
  console.log("Body:", req.body);

  console.log("🔍 .env шалгалт:", {
    HIPAY_BASE_URL: process.env.HIPAY_BASE_URL,
    HIPAY_ENTITY_ID: process.env.HIPAY_ENTITY_ID,
    hasClientSecret: !!process.env.HIPAY_CLIENT_SECRET,
    clientSecretLength: process.env.HIPAY_CLIENT_SECRET?.length || 0,
  });
  const {
    amount,
    redirectUri,
    webhookUrl,
    items = [],
    qrData = false,
  } = req.body;

  // Validation
  if (!amount || !redirectUri) {
    return res.status(400).json({
      success: false,
      message: "amount болон redirectUri шаардлагатай",
    });
  }

  const tokenRes = await axios.post(
    `${HIPAY_BASE_URL}/oauth/token`,
    {
      client_id: ENTITY_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log(
    "✅ Token авлаа:",
    tokenRes.data.access_token ? "Амжилттай" : "Алдаатай"
  );

  const ACCESS_TOKEN = tokenRes.data.access_token;

  const payload = {
    entityId: ENTITY_ID,
    redirect_uri: redirectUri,
    amount: Number(amount),
    qrData: Boolean(qrData),
    items,
    ...(webhookUrl && { webhook_url: webhookUrl }),
  };

  try {
    const response = await axios.post(`${HIPAY_BASE_URL}/checkout`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const data = response.data;

    if (data.code === "0" && data.description === "SUCCESS") {
      // Чини код "0" байгаа шүү
      return res.json({
        success: true,
        checkoutId: data.checkoutId,
        paymentUrl: `https://test.hipay.mn/pay/${data.checkoutId}`, // Web/browser-д зориулсан
        deeplink: `hipay:///pay/${data.checkoutId}`, // Mobile app-д зориулсан (эсвэл hipay://pay/ гэж турш)
        qrData: data.qrData || null,
        expires: data.expires,
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
      "Hipay checkout үүсгэх алдаа:",
      error.response?.data || error.message
    );
    console.error("Error message:", error.message);
    console.error("Response status:", error.response?.status);
    console.error("Response data:", error.response?.data);
    console.error("Full error:", error);
    return res.status(500).json({
      success: false,
      message: "Hipay серверт алдаа гарлаа",
      details: error.response?.data || error.message,
    });
  }
};
