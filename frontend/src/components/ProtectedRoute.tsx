import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
function ProtectedRoute(props) {
  console.log(props);
  console.log(props.allowedRoles);
  const [youHaveAccessOfManager, setYouHaveAccessOfManager] = useState(false);
  const [youHaveAccessOfAdmin, setYouHaveAccessOfAdmin] = useState(false);
  const { user, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );

  // if (user?.role === "MANAGER") {
  //   setYouHaveAccessOfManager(true);
  // }
  // if (user?.role === "ADMIN") {
  //   setYouHaveAccessOfAdmin(true);
  // }

  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
