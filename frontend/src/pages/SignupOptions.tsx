// src/components/SignupOptions.tsx

import { Link } from "react-router-dom";

export default function SignupOptions() {
  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-2xl">
      <h1 className="mb-8 text-center text-4xl font-bold text-amber-600">
        Join Gloval Travel 🌍
      </h1>
      <div className="flex flex-col gap-6">
        <Link to="/signup/manager">
          {" "}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition hover:cursor-pointer">
            Sign up as a Manager
          </button>
        </Link>
        <Link to="/signup/sub-contractor">
          {" "}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition hover:cursor-pointer">
            Sign up as a Sub-contractor
          </button>
        </Link>
         <Link to="/signup/provider">
          {" "}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition hover:cursor-pointer">
            Sign up as a Provider
          </button>
        </Link>
      </div>
    </div>
  );
}
