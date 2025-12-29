import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import axios from "axios"; // Make sure axios is imported if needed

export default function LoginForm({ onClose }: { onClose?: () => void } = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Login failed:", err);

      let errorMessage = "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.";
      if (err instanceof Error) {
        console.log(err);
      }

      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message || err.response?.data?.error;

        if (serverMessage) {
          errorMessage = serverMessage;
        } else if (err.response?.status === 401) {
          errorMessage = "Имэйл эсвэл нууц үг буруу байна.";
        } else if (err.response?.status === 404) {
          errorMessage = "Хэрэглэгч олдсонгүй.";
        } else if (err.response?.status === 500) {
          errorMessage =
            "Серверт алдаа гарлаа. Хэсэг хугацааны дараа оролдоно уу.";
        }
      }

      setError(errorMessage);

      // Auto clear after 8 seconds
      setTimeout(() => setError(""), 8000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md">
      <div className="mb-12 text-left">
        <img src={logo} alt="Logo" className="w-64 invert dark:invert-0 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-gray-50">
          Тавтай морил
        </h1>
        <p className="text-gray-600 dark:text-gray-200">
          Та өөрийн хаяг руу нэвтэрнэ үү
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium shadow-sm">
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-right">
          <button
            type="button"
            onClick={() => {
              onClose?.();
              navigate("/forgot-password");
            }}
            className="text-sm text-sky-600 underline">
            Нууц үг мартсан
          </button>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-400 block">
            Имэйл хаяг
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full dark:text-gray-300 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-gray-400 text-gray-700 block">
            Нууц үг
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full dark:text-gray-300 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-sky-600 py-4 font-semibold text-white shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 mt-6">
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Нэвтэрч байна...
            </span>
          ) : (
            "Нэвтрэх"
          )}
        </button>
      </form>
    </motion.div>
  );
}
