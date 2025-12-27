import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/assets/logo.png";

export default function SignupForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(firstname, lastname, email, password);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Signup failed");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="mb-12 text-left">
        <img src={Logo} alt="Logo" className="w-64 invert dark:invert-0 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          Бүртгүүлэх
        </h1>
        <p className="text-gray-600 dark:text-gray-200">
          Gloval Travel-д тавтай морил
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-700 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-gray-400 text-gray-700 block">
              Нэр
            </label>
            <input
              type="text"
              placeholder="Нэрээ оруулна уу"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full dark:text-gray-300 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-gray-400 text-gray-700 block">
              Овог
            </label>
            <input
              type="text"
              placeholder="Овгоо оруулна уу"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full dark:text-gray-300 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-gray-400 text-gray-700 block">
            Имэйл хаяг
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full dark:text-gray-300 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm  dark:text-gray-400 font-medium text-gray-700 block">
            Нууц үг
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full dark:text-gray-300 rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-sky-600 py-4 font-semibold text-white shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 mt-6"
        >
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
              Бүртгэж байна...
            </span>
          ) : (
            "Бүртгүүлэх"
          )}
        </button>
      </form>
    </motion.div>
  );
}
