import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api",
});

export const createQPayInvoice = (data: {
  amount: number;
  description: string;
  senderInvoiceNo?: string;
}) => api.post("/qpay/invoice", data);

export const checkQPayPayment = (invoiceId: string) =>
  api.post(`/qpay/check/${invoiceId}`);
