// src/components/Signup.tsx  (or wherever it is)
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
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
      console.log("🚀 Trying signup with:", { name, email });
      await signup(firstname, lastname, email, password);
      console.log("✅ Signup success! Navigating to dashboard");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("🔥 Signup failed:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Signup failed – check console"
      );
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-4xl font-bold text-amber-600">
        Join Gloval Travel 🌍
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-amber-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
