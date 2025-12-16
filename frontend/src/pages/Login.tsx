import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Wait for login to finish
      await login(email, password);
      
      // 2. Only navigate AFTER success
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      // Optional: set an error state here to show a message to the user
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-4xl font-bold text-amber-600">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-sky-500 py-4 font-bold text-white hover:bg-sky-600 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-bold text-amber-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
