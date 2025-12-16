
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignupSubcontractor() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // 👇 Points to the new subagent route
      await axios.post("/api/requests/subcontractor", formData);
      
      setStatus("success");
      setFormData({ firstname: "", lastname: "", email: "", password: "" });
    } catch (err: unknown) {
     if (err instanceof Error) {
    console.error(err.message); // ✅ Safe
  } else {
    console.error("An unknown error occurred");
  }
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message || "Failed to submit application"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-2xl text-center">
        <div className="mb-4 text-5xl">🤝</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Sent!</h2>
        <p className="text-gray-600 mb-6">
          Your application to become a Sub-contractor has been submitted. 
          Our team will review your details shortly.
        </p>
        <Link to="/" className="text-amber-600 font-bold hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-3xl font-bold text-amber-600">
        Join as Sub-contractor 🤝
      </h1>

      {status === "error" && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
            required
          />
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
            required
          />
        </div>
        
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3 focus:border-amber-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition hover:cursor-pointer">
          {status === "loading" ? "Sending..." : "Submit Application"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-amber-600 hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
}