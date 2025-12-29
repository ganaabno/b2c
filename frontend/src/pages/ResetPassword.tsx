import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
     if(err instanceof Error) console.error(err);
      setError(
        err?.response?.data?.message || "Сервертэй холбогдоход алдаа гарлаа"
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
      <h2 className="text-3xl font-bold mb-4">Нууц үг сэргээх (OTP)</h2>

      {message && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Имэйл</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5"
            disabled={loading}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5"
            disabled={loading}
            placeholder="123456"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Шинэ нууц үг</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5"
            disabled={loading}
            placeholder="••••••••"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-sky-500 to-sky-600 py-3 text-white font-semibold disabled:opacity-50">
            {loading ? "Шинэчлэх..." : "Нууц үг шинэчлэх"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
