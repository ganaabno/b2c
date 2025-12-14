import { useAuth } from "../context/AuthContext";
import { AlertCircle, Crown } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-10 rounded-xl p-10 text-white shadow-2xl">
        <h1 className="flex items-center gap-4 text-5xl font-black">
          <Crown className="h-16 w-16" />
          ADMIN PANEL
        </h1>
        <p className="mt-4 text-2xl">
          Welcome back, Supreme Leader {user?.name}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <AlertCircle className="mx-auto mb-4 h-20 w-20 text-red-600" />
          <h3 className="text-3xl font-bold">Full System Access</h3>
        </div>
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <h3 className="text-3xl font-bold">Delete Users</h3>
        </div>
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <h3 className="text-3xl font-bold">Change Roles</h3>
        </div>
        <div className="rounded-xl bg-white p-8 text-center shadow-xl">
          <h3 className="text-3xl font-bold">Nuclear Button</h3>
        </div>
      </div>

      <div className="mt-10 text-center text-6xl">WITH GREAT POWER...</div>
    </div>
  );
}
