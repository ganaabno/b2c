// src/components/BookTourButton.tsx

import { useState } from "react";
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
              title="HiPay Төлбөр (Mock)"
              className="w-full h-full border-0"
              allow="payment"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Төлбөр бэлтгэж байна...
                </p>
              </div>
            </div>
          )}
        </div>

        {deeplink && (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Төлбөр нээгдэхгүй байна уу? HiPay аппаар нээх (Mock):
            </p>
            <a
              href={deeplink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
            >
              HiPay аппаар төлөх (Mock)
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
    setPaymentUrl(""); // reset

    // MOCK MODE – HiPay сервер down учраас жинхэнэ request илгээхгүй
    try {
      const mockCheckoutId = "MOCK-" + Date.now();
      const amount =
        tour.single_supply_price?.replace(/[^\d]/g, "") || "1500000";

      // Mock payment page – бодит HiPay-ийн төлбөрийн хуудас шиг харагдах энгийн HTML
      const mockPaymentHtml = `
        <!DOCTYPE html>
        <html lang="mn">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HiPay Төлбөр (Mock)</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #f3f4f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .container { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; }
            h1 { color: #10b981; margin-bottom: 1rem; }
            .amount { font-size: 2rem; font-weight: bold; color: #111; margin: 1.5rem 0; }
            .tour { color: #666; margin-bottom: 2rem; }
            button { background: #10b981; color: white; border: none; padding: 1rem 2rem; font-size: 1.1rem; border-radius: 0.75rem; cursor: pointer; width: 100%; }
            button:hover { background: #059669; }
            .mock-note { margin-top: 2rem; font-size: 0.875rem; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 HiPay Төлбөр (Mock Mode)</h1>
            <p class="tour"><strong>Аялал:</strong> ${tour.title}</p>
            <div class="amount">₮${Number(amount).toLocaleString()}</div>
            <p>Та төлбөр төлөх гэж байна.</p>
            <button onclick="simulateSuccess()">Төлбөр амжилттай хийх (Mock)</button>
            <div class="mock-note">Энэ бол зөвхөн туршилтын mock хуудас. Жинхэнэ HiPay сервер сэргэхээр бодит төлбөр болно 💸</div>
          </div>
          <script>
            function simulateSuccess() {
              alert("🎉 Төлбөр амжилттай хийгдлээ! (Mock mode)");
              setTimeout(() => window.close(), 1000);
            }
          </script>
        </body>
        </html>
      `;

      // data URL болгоод iframe-д хийнэ
      const mockPaymentUrl =
        "data:text/html;charset=utf-8," + encodeURIComponent(mockPaymentHtml);

      // Mock deeplink (mobile дээр туршихад нээгдэхгүй ч гоё харагдана xD)
      const mockDeeplink = `hipay:///pay/${mockCheckoutId}`;

      setPaymentUrl(mockPaymentUrl);
      setDeeplink(mockDeeplink);

      // 8 секундын дараа автоматаар "амжилттай" болгоод modal хаах (туршилтад гоё)
      setTimeout(() => {
        alert("🎉 Төлбөр амжилттай хийгдлээ! (Mock mode 🚀)");
        setModalOpen(false);
      }, 8000);
    } catch (err) {
      // Mock mode-д алдаа гарахгүй шүү xD
      console.log("Mock mode-д алдаа гарахгүй ээ 😎");
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
