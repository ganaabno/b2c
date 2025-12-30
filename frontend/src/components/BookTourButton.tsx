import { QRCodeSVG } from "qrcode.react";
import { useQPay } from "@/hooks/useQPay";
import type { Tour } from "@/types";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const UnifiedPaymentModal = ({
  isOpen,
  onClose,
  paymentMethod,
  tour,
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: "hipay" | "qpay";
  tour: Tour;
}) => {
  const [hipayUrl, setHipayUrl] = useState("");
  const [hipayDeeplink, setHipayDeeplink] = useState("");
  const [hipayLoading, setHipayLoading] = useState(true);

  const {
    invoice,
    createInvoice,
    checkPaymentStatus,
    isPaid,
    loading: qpayLoading,
    checking,
    error,
  } = useQPay();

  const [pollInterval, setPollInterval] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (paymentMethod === "hipay") {
      // Trigger HiPay checkout
      handleHipay();
    } else if (paymentMethod === "qpay") {
      // Trigger QPay invoice
      handleQPay();
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isOpen, paymentMethod]);

  const handleHipay = async () => {
    setHipayLoading(true);
    try {
      const res = await axios.post("/api/hipay/checkout", {
        amount: tour.single_supply_price?.replace(/[^\d]/g, ""),
        redirectUri:
          window.location.origin + `/tours/${tour.slug}?payment=success`,
        webhookUrl: `${import.meta.env.VITE_API_URL}/api/hipay/webhook`,
        items: [
          {
            name: tour.title,
            quantity: 1,
            price: tour.single_supply_price?.replace(/[^\d]/g, ""),
          },
        ],
        qrData: false,
      });

      if (res.data.success) {
        setHipayUrl(
          res.data.checkoutId?.startsWith("MOCK_") || import.meta.env.DEV
            ? "https://httpbin.org/html"
            : res.data.paymentUrl || ""
        );
        setHipayDeeplink(res.data.deeplink);
      }
    } catch (err) {
      console.error(err);
      alert("HiPay төлбөр үүсгэхэд алдаа гарлаа");
      onClose();
    } finally {
      setHipayLoading(false);
    }
  };

  const handleQPay = async () => {
    const amount =
      Number(tour.single_supply_price?.replace(/[^\d]/g, "")) || 1500000;
    await createInvoice(amount, tour.title);

    if (invoice?.invoice_id) {
      const interval = setInterval(() => {
        checkPaymentStatus(invoice.invoice_id);
      }, 5000);
      setPollInterval(interval);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 text-center border-b">
          <h3 className="text-2xl font-bold">
            {paymentMethod === "qpay" ? "QPay Төлбөр" : "HiPay Төлбөр"}
          </h3>
          <p className="text-gray-600">
            ₮{Number(tour.single_supply_price).toLocaleString()}
          </p>
        </div>

        <div className="min-h-96">
          {paymentMethod === "hipay" ? (
            hipayLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p>Бэлтгэж байна...</p>
                </div>
              </div>
            ) : (
              <>
                {hipayUrl && (
                  <iframe
                    src={hipayUrl}
                    className="w-full h-96 border-0"
                    allow="payment"
                  />
                )}
                {hipayDeeplink && (
                  <div className="p-6 bg-gray-50 text-center">
                    <a
                      href={hipayDeeplink}
                      className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl"
                    >
                      HiPay аппаар төлөх
                    </a>
                  </div>
                )}
              </>
            )
          ) : qpayLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Нэхэмжлэх үүсгэж байна...</p>
            </div>
          ) : invoice ? (
            <div className="p-8 text-center">
              {isPaid ? (
                <div className="py-16">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">
                    Амжилттай төлөгдлөө! 🎉
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Таны захиалга баталгаажлаа
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-gray-600">
                    QR кодыг уншуулж төлнө үү
                  </p>
                  <div className="inline-block p-6 bg-white rounded-2xl shadow-xl">
                    <QRCodeSVG value={invoice.qr_text} size={240} level="H" />
                  </div>
                  <p className="mt-6 text-sm text-gray-500">
                    {checking ? "Шалгаж байна..." : "Төлбөр хүлээж байна..."}
                  </p>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 text-red-500">
              QPay нэхэмжлэх үүсгэхэд алдаа гарлаа
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
