import axios from "axios";

interface QPayToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface CreateInvoiceBody {
  sender_invoice_no: string;
  invoice_description: string;
  amount: number;
  callback_url?: string;
}

interface QPayInvoiceResponse {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  urls: string[];
}

export class QPayService {
  private baseUrl = process.env.QPAY_BASE_URL || "https://merchant.qpay.mn";
  private clientId = process.env.QPAY_CLIENT_ID!;
  private clientSecret = process.env.QPAY_CLIENT_SECRET!;
  private invoiceCode = process.env.QPAY_INVOICE_CODE!;

  private accessToken: string | null = null;
  private tokenExpiry = 0;

  private async getToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      "base64"
    );

    const res = await axios.post<QPayToken>(
      `${this.baseUrl}/v2/auth/token`,
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    this.accessToken = res.data.access_token;
    this.tokenExpiry = Date.now() + res.data.expires_in * 1000 - 60000;

    return this.accessToken;
  }

  async createInvoice(body: CreateInvoiceBody): Promise<QPayInvoiceResponse> {
    const token = await this.getToken();

    const payload = {
      invoice_code: this.invoiceCode,
      ...body,
    };

    const res = await axios.post<QPayInvoiceResponse>(
      `${this.baseUrl}/v2/invoice`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  }

  async checkPayment(invoiceId: string) {
    const token = await this.getToken();

    const payload = {
      object_type: "INVOICE",
      object_id: invoiceId,
      offset: { page_number: 1, page_limit: 10 },
    };

    const res = await axios.post(`${this.baseUrl}/v2/payment/check`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  }
}

export const qpayService = new QPayService();
