import { Request, Response } from "express";

export const hipayWebhook = async (req: Request, res: Response) => {
  // HiPay webhook нь GET request-ээр ирдэг, бүх дата query parameters дээр байгаа
  const { checkoutId, paymentId, status, paymentStatus } = req.query;

  console.log("🔔 HiPay webhook хүлээн авлаа (GET):", req.query);

  // Ямар ч тохиолдолд эхлээд 200 буцаах → HiPay дахин илгээхгүй болно
  res.status(200).send("OK");

  // 200 буцаасны ДАРАА background-д боловсруулалт хийнэ (res аль хэдийн дууссан ч болно)
  try {
    if (!checkoutId || !paymentId) {
      console.warn("⚠️  checkoutId эсвэл paymentId байхгүй webhook ирлээ");
      return;
    }

    // checkoutId-г string болгох (query-с ирэхдээ string | string[] байж болно)
    const cid = Array.isArray(checkoutId) ? checkoutId[0] : checkoutId;

    // Төлбөр амжилттай эсэхийг шалгах
    const isPaid =
      status === "paid" ||
      paymentStatus === "paid" ||
      status === "success" ||
      paymentStatus === "success";

    if (isPaid) {
      console.log("✅ Төлбөр АМЖИЛТТАЙ ирлээ!", {
        checkoutId: cid,
        paymentId,
        rawQuery: req.query,
      });

      // ЭНД ӨӨРИЙН БИЗНЕС ЛОГИКЭЭ БИЧНЭ ЭЭ:
      // - DB-д захиалгын статусыг PAID болгох
      // - Хэрэглэгчид email/SMS илгээх
      // - Order fulfill, stock бууруулах гэх мэт
      // Жишээ:
      // await updateOrderStatus(cid, "PAID", paymentId as string);
      // await sendPaymentSuccessEmail(cid);
    } else {
      console.log("ℹ️  Төлбөр амжилтгүй/хүлээгдэж байгаа статус:", {
        checkoutId: cid,
        paymentId,
        status,
        paymentStatus,
      });

      // Шаардлагатай бол FAILED эсвэл PENDING статус тавих
      // await updateOrderStatus(cid, "FAILED");
    }
  } catch (error: any) {
    // Алдаа гарсан ч HiPay-д 200 аль хэдийн буцаасан тул дахин илгээхгүй
    console.error("Webhook боловсруулахад алдаа гарлаа:", error);
  }
};
