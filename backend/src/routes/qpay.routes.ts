import express from "express";
import { qpayService } from "../qpay.service";

const router = express.Router();

router.post("/invoice", async (req, res) => {
  try {
    const { amount, description, senderInvoiceNo } = req.body;
    const callbackUrl = `${process.env.FRONTEND_URL}/payment-callback`;

    const invoice = await qpayService.createInvoice({
      amount,
      invoice_description: description,
      sender_invoice_no: senderInvoiceNo || `INV-${Date.now()}`,
      callback_url: callbackUrl,
    });

    res.json(invoice);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/check/:invoiceId", async (req, res) => {
  try {
    const data = await qpayService.checkPayment(req.params.invoiceId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
