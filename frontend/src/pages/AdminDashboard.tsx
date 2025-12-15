import { useAuth } from "../context/AuthContext";
import {
  AlertCircle,
  Crown,
  ShieldAlert,
  Users,
  Settings,
  Zap,
} from "lucide-react";
import AdminTrips from "./AdminTrips";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {" "}
      <div className="mb-12 rounded-2xl bg-linear-to-r from-red-800 via-red-900 to-black p-10 md:p-16 shadow-2xl">
        <h1 className="flex flex-col md:flex-row items-center gap-6 text-5xl md:text-6xl font-black text-white drop-shadow-2xl">
          <Crown className="h-20 w-20 text-yellow-400 drop-shadow-lg" />
          <span>ADMIN PANEL</span>
          <ShieldAlert className="h-16 w-16 text-red-400 hidden md:block" />
        </h1>
        <p className="mt-6 text-2xl md:text-3xl text-amber-200 font-semibold">
          Welcome back, Supreme Leader{" "}
          <span className="text-yellow-300">{user?.firstname}</span>
        </p>
        <p className="mt-4 text-lg text-red-200 opacity-90">
          You have unrestricted access to all systems.
        </p>
      </div>
      {/* Power Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
        <div className="group rounded-2xl bg-linear-to-br from-red-600 to-red-800 p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
          <AlertCircle className="mx-auto mb-6 h-20 w-20 text-white" />
          <h3 className="text-2xl font-bold text-white">Full System Access</h3>
          <p className="mt-3 text-red-100">Control everything</p>
        </div>

        <div className="group rounded-2xl bg-linear-to-br from-amber-600 to-orange-700 p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Users className="mx-auto mb-6 h-20 w-20 text-white" />
          <h3 className="text-2xl font-bold text-white">Manage Users</h3>
          <p className="mt-3 text-amber-100">Delete • Ban • Promote</p>
        </div>

        <div className="group rounded-2xl bg-linear-to-br from-purple-700 to-indigo-800 p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Settings className="mx-auto mb-6 h-20 w-20 text-white" />
          <h3 className="text-2xl font-bold text-white">System Controls</h3>
          <p className="mt-3 text-purple-100">Roles • Permissions</p>
        </div>

        <div className="group rounded-2xl bg-linear-to-br from-black to-gray-900 p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-red-600">
          <Zap className="mx-auto mb-6 h-20 w-20 text-red-500 animate-pulse" />
          <h3 className="text-2xl font-bold text-red-400">Nuclear Option</h3>
          <p className="mt-3 text-red-200">Use with extreme caution</p>
        </div>
      </div>
      {/* Dramatic Quote */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-gray-800 uppercase tracking-wider">
          With Great Power...
        </h2>
        <p className="mt-4 text-2xl md:text-3xl text-red-700 font-bold">
          Comes Great Responsibility
        </p>
      </div>
      {/* Trips Section */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Manage Tours & Trips
        </h2>
        <AdminTrips />
      </div>
    </div>
  );
}
