import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import type { Tour } from "@/types";

interface BookTourButtonProps {
  tour: Tour;
  className?: string;
}

const PaymentModal = ({
  isOpen,
  onClose,
  paymentUrl,
  deeplink,
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl: string;
  deeplink?: string;
}) => {
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="h-96 md:h-128">
          {paymentUrl ? (
            <iframe
              src={paymentUrl}
              title="HiPay Төлбөр"
              className="w-full h-full border-0"
              allow="payment"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Бэлтгэж байна...
                </p>
              </div>
            </div>
          )}
        </div>

        {deeplink && (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              HiPay аппаар нээх:
            </p>
            <a
              href={deeplink}
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
            >
              HiPay аппаар төлөх
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function BookTourButton({
  tour,
  className = "",
}: BookTourButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [deeplink, setDeeplink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    setModalOpen(true);
    setPaymentUrl("");

    try {
      const response = await axios.post("/api/hipay/checkout", {
        amount: tour.single_supply_price?.replace(/[^\d]/g, "") || "1500000",
        redirectUri:
          window.location.origin + `/tours/${tour.slug}?payment=success`, // буцах хуудас
        webhookUrl: `${import.meta.env.VITE_API_URL || ""}/api/hipay/webhook`, // Webhook URL
        items: [
          {
            name: tour.title,
            quantity: 1,
            price: tour.single_supply_price?.replace(/[^\d]/g, ""),
          },
        ],
        qrData: false,
      });

      if (response.data.success) {
        let finalPaymentUrl = paymentUrl;

        if (
          response.data.checkoutId?.startsWith("MOCK_") ||
          import.meta.env.DEV
        ) {
          finalPaymentUrl = "https://httpbin.org/html";
        }

        setPaymentUrl(finalPaymentUrl);
        setDeeplink(response.data.deeplink);
      } else {
        throw new Error(
          response.data.message || "Нэхэмжлэх үүсгэхэд алдаа гарлаа"
        );
      }
    } catch (err: any) {
      console.error("HiPay checkout алдаа:", err);
      alert(
        `Алдаа гарлаа: ${
          err.response?.data?.message || err.message || "Серверт асуудал гарлаа"
        }`
      );
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleBook}
        disabled={loading}
        className={`py-2.5 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Бэлтгэж байна...
          </>
        ) : (
          "Захиалах"
        )}
      </button>

      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        paymentUrl={paymentUrl}
        deeplink={deeplink}
      />
    </>
  );
}
