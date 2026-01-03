/// App.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import ManagerPriceTable from "./components/manager/ManagerPriceTable/ManagerPriceTable";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Layout";
import ManagerDashboard from "./pages/(manager)/ManagerDashboard";
import AccessDenied from "./pages/AccessDenied";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MembershipPage from "./pages/MembershipPage";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import TourDetail from "./pages/TourDetail";
import Tours from "./pages/Tours";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {" "}
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/membership" element={<MembershipPage />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]} />
                }>
                <Route path="/manager" element={<ManagerDashboard />} />
                <Route
                  path="/manager/price-table"
                  element={<ManagerPriceTable />}
                />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-center" />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
