// src/resolvers/hipay/nehemjlehUusgeh.ts → ШИНЭЧЛЭЭД REPLACE ХИЙ
import { Request, Response } from "express";
import axios from "axios";

const HIPAY_BASE_URL = process.env.HIPAY_BASE_URL || "https://test.hipay.mn";
const ENTITY_ID = process.env.HIPAY_ENTITY_ID || "songo.mn";
const CLIENT_SECRET = process.env.HIPAY_CLIENT_SECRET;

// Dev эсвэл mock mode-д шууд fake response буцаагаад backend-г хамгаална
const IS_MOCK_MODE =
  process.env.HIPAY_MOCK === "true" || process.env.NODE_ENV === "development";

if (!CLIENT_SECRET && !IS_MOCK_MODE) {
  throw new Error("HIPAY_CLIENT_SECRET .env-д байхгүй байна шүү!");
}

export const nehemjlehUusgeh = async (req: Request, res: Response) => {
  console.log("🔵 /api/hipay/checkout руу request ирлээ!");
  console.log("Body:", req.body);

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

  // 🟡 MOCK MODE: HiPay down байхад ч backend crash биш, зүгээр graceful message буцаана
  if (IS_MOCK_MODE) {
    console.info("🟡 HiPay MOCK mode идэвхтэй – fake checkout буцааж байна");
    return res.json({
      success: true,
      checkoutId: `MOCK_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      paymentUrl: "https://test.hipay.mn/pay/MOCK",
      deeplink: "hipay:///pay/MOCK",
      qrData: null,
      expires: new Date(Date.now() + 3600000).toISOString(), // 1 цаг
      message: "Mock mode – бодит төлбөр авалгүй туршилт хийж байна",
    });
  }

  // Бодит HiPay call
  try {
    const tokenRes = await axios.post(
      `${HIPAY_BASE_URL}/oauth/token`,
      {
        client_id: ENTITY_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000, // 10 секундын timeout нэмсэн
      }
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

    const response = await axios.post(`${HIPAY_BASE_URL}/checkout`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      timeout: 10000,
    });

    const data = response.data;

    if (data.code === "0" && data.description === "SUCCESS") {
      return res.json({
        success: true,
        checkoutId: data.checkoutId,
        paymentUrl: `${HIPAY_BASE_URL.replace("test.", "")}/pay/${
          data.checkoutId
        }`,
        deeplink: `hipay:///pay/${data.checkoutId}`,
        qrData: data.qrData || null,
        expires: data.expires,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.description || "Checkout үүсгэх амжилтгүй",
        details: data.message,
      });
    }
  } catch (error: any) {
    const isServerDown =
      !error.response ||
      error.response?.status >= 500 ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED";

    console.warn("⚠️ HiPay холболт амжилтгүй (түр саатал):", {
      message: error.message,
      status: error.response?.status,
      code: error.code,
    });

    return res.status(503).json({
      success: false,
      message:
        "Төлбөрийн систем түр сааталтай байна. Бага зэрэг хүлээгээд дахин оролдоно уу 🙏",
      tempUnavailable: true,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
