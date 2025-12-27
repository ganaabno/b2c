import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Debug log - remove after testing
  console.log("🔐 ProtectedRoute Debug:");
  console.log("User:", user?.email);
  console.log("User role:", user?.role);
  console.log("Allowed roles:", allowedRoles);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    console.log("❌ No user, redirecting to login");
    return <Navigate to="/" replace />;
  }

  // If allowedRoles is provided, check if user has required role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role || "CLIENT"; // Default to CLIENT if undefined

    console.log(
      `🔍 Checking role: ${userRole} against allowed: [${allowedRoles.join(
        ", "
      )}]`
    );

    // Check if user's role is in the allowedRoles array
    const hasRequiredRole = allowedRoles.includes(userRole);

    if (!hasRequiredRole) {
      return <Navigate to="/access-denied" replace />;
    }

    console.log(`✅ Access granted for role: ${userRole}`);
  }

  return <Outlet />;
}

export default ProtectedRoute;
