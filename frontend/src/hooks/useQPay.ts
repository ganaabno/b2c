import { useState } from "react";
import { createQPayInvoice, checkQPayPayment } from "../services/api";

export interface QPayInvoice {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  urls: string[];
}

export interface QPayPayment {
  payment_id: string;
  payment_status: string;
  paid_amount: number;
  created_date: string;
}

export const useQPay = () => {
  const [invoice, setInvoice] = useState<QPayInvoice | null>(null);
  const [payments, setPayments] = useState<QPayPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (
    amount: number,
    description: string,
    senderInvoiceNo?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createQPayInvoice({
        amount,
        description,
        senderInvoiceNo: senderInvoiceNo || `INV-${Date.now()}`,
      });
      setInvoice(res.data);
      return res.data as QPayInvoice;
    } catch (err: any) {
      const msg =
        err.response?.data?.error || err.message || "Failed to create invoice";
      setError(msg);
      console.error("QPay Invoice Error:", err);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (invoiceId: string) => {
    setChecking(true);
    setError(null);
    try {
      const res = await checkQPayPayment(invoiceId);
      const rows = res.data.rows || [];
      setPayments(rows);
      return rows as QPayPayment[];
    } catch (err: any) {
      const msg =
        err.response?.data?.error || err.message || "Failed to check payment";
      setError(msg);
      console.error("QPay Check Error:", err);
      return [];
    } finally {
      setChecking(false);
    }
  };

  const isPaid = payments.some(
    (p) => p.payment_status === "PAID" || p.payment_status === "paid"
  );

  const reset = () => {
    setInvoice(null);
    setPayments([]);
    setError(null);
  };

  return {
    invoice,
    payments,
    loading,
    checking,
    error,
    isPaid,
    createInvoice,
    checkPaymentStatus,
    reset,
  };
};
