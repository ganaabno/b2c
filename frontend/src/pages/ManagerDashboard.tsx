// src/pages/ManagerDashboard.tsx
import { useAuth } from "../context/AuthContext";
import { Users, ClipboardList, CalendarCheck, Truck } from "lucide-react";

export default function ManagerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-10 rounded-xl p-10 text-white shadow-2xl bg-blue-600">
        <h1 className="flex items-center gap-4 text-5xl font-black">
          <ClipboardList className="h-16 w-16" />
          MANAGER PANEL
        </h1>
        <p className="mt-4 text-2xl">Welcome back, Manager {user?.name}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <Users className="mx-auto mb-4 h-20 w-20 text-blue-600" />
          <h3 className="text-3xl font-bold">Manage Users</h3>
        </div>
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <CalendarCheck className="mx-auto mb-4 h-20 w-20 text-green-600" />
          <h3 className="text-3xl font-bold">Approve Bookings</h3>
        </div>
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <Truck className="mx-auto mb-4 h-20 w-20 text-yellow-600" />
          <h3 className="text-3xl font-bold">Manage Deliveries</h3>
        </div>
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <h3 className="text-3xl font-bold">Reports & Stats</h3>
        </div>
      </div>

      <div className="mt-10 text-center text-6xl">LEAD WITH WISDOM...</div>
    </div>
  );
}
