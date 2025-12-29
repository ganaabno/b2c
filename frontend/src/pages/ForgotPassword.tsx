import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) return setError("Имэйл хаяг шаардлагатай");

    setLoading(true);
    try {
      const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      await api.post("/api/auth/forgot-password", { email });
      // navigate to reset page and pass email so user doesn't need to re-enter it
      navigate("/reset-password", { state: { email, fromForgot: true } });
    } catch (err: unknown) {
      if(err instanceof Error)  console.error(err);
      setError(
         "Сервертэй холбогдоход алдаа гарлаа"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 dark:text-gray-200">Нууц үг сэргээх</h2>

      {message && (
        <div className="mb-4 p-4 dark:text-gray-200 bg-green-50 border border-green-200 text-green-800 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 dark:text-gray-200 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">Имэйл</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 dark:text-gray-200 border-gray-200 px-4 py-3.5"
            disabled={loading}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl dark:text-gray-200 bg-linear-to-r from-sky-500 to-sky-600 py-3 text-white font-semibold disabled:opacity-50">
            {loading ? "Илгээж байна..." : "OTP-ийг илгээх"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Бүртгүүлсэн имэйл хаяг мартсан уу?{" "}
        <Link to="/reset-password" className="text-sky-600 underline">
          OTP-тэй сэргээх хэсэг
        </Link>
      </p>
    </motion.div>
  );
}
