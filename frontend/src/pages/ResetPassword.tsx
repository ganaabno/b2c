import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill email if navigated from Forgot Password
  useEffect(() => {
    const state: any = location.state;
    if (state?.email) {
      setEmail(state.email);
      if (state?.fromForgot) {
        setMessage(
          "OTP амжилттай илгээгдсэн бол имэйл рүү очно. Код оруулна уу."
        );
      }
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !otp || !newPassword)
      return setError("Бүх талбаруудыг гүйцэт бөглөнө үү");
    if (newPassword.length < 8)
      return setError("Нууц үг дор хаяж 8 тэмдэгт байх ёстой");

    setLoading(true);
    try {
      const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      await api.post("/api/auth/reset-password", { email, otp, newPassword });
      setMessage("Нууц үг амжилттай шинэчлэгдлээ. Дахин нэвтэрнэ үү.");
      setTimeout(() => navigate("/"), 1400);
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err);
      setError("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 dark:text-gray-200">
        Нууц үг сэргээх (OTP)
      </h2>

      {message && (
        <div className="mb-4 p-4 bg-green-50 border dark:text-gray-200 border-green-200 text-green-800 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border dark:text-gray-200 border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Имэйл
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-700  dark:text-gray-200  px-4 py-3.5"
            disabled={loading}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-700  px-4 py-3.5 dark:text-gray-200"
            disabled={loading}
            placeholder="123456"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Шинэ нууц үг
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 px-4 py-3.5 dark:text-gray-200 dark:bg-gray-800 pr-12 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:focus:border-sky-400 dark:focus:ring-sky-900 transition-all"
              disabled={loading}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              disabled={loading}
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Дор хаяж 8 тэмдэгт
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-sky-600 py-3 text-white font-semibold disabled:opacity-50 dark:text-gray-200">
            {loading ? "Шинэчлэх..." : "Нууц үг шинэчлэх"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
