import { Request, Response } from "express";

export const hipayWebhook = async (req: Request, res: Response) => {
  // HiPay webhook: GET request, data query parameters дээр
  const { checkoutId, paymentId } = req.query;

  console.log("🔔 HiPay webhook хүлээн авлаа (GET):", req.query);

  res.status(200).send("OK");

  // 200 буцаасны дараа background-д боловсруулна (res дууссан ч ажиллана)
  try {
    if (!checkoutId || !paymentId) {
      console.warn(
        "⚠️ checkoutId эсвэл paymentId байхгүй webhook ирлээ:",
        req.query
      );
      return;
    }

    // checkoutId, paymentId-г string болгох (query-с array байж болно)
    const cid = Array.isArray(checkoutId) ? checkoutId[0] : checkoutId;
    const pid = Array.isArray(paymentId) ? paymentId[0] : paymentId;

    console.log("✅ Төлбөр АМЖИЛТТАЙ ирлээ! (HiPay webhook баталгаа)", {
      checkoutId: cid,
      paymentId: pid,
      rawQuery: req.query,
    });

    // ЭНД ӨӨРИЙН БИЗНЕС ЛОГИКЭЭ БИЧНЭ ЭЭ (idempotent байлгах ёстой!):
    // - DB-д захиалгын статусыг PAID болгох
    // - Payment ID хадгалах
    // - Order fulfill, stock бууруулах, email/SMS илгээх гэх мэт
    // await updateOrderStatus(cid, "PAID", pid);
    // await sendPaymentSuccessNotification(cid);
  } catch (error: any) {
    console.error("Webhook боловсруулахад алдаа гарлаа:", error);
  }
};
