import { useAuth } from "../context/AuthContext";
import { Crown } from "lucide-react";
import AdminTours from "./AdminTours";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Crown className="h-10 w-10 text-amber-600" />
          <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <p className="text-xl text-gray-700">
          Welcome back,{" "}
          <span className="font-semibold text-gray-900">{user?.firstname}</span>
        </p>
        <p className="mt-2 text-gray-600">
          You have full administrative access.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Аялал Зохицуулалт:
        </h2>
        <AdminTours />
      </div>
    </div>
  );
}
