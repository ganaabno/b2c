// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import TourDetail from "./pages/TourDetail"; // ← ADD THIS
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import SignupManager from "./pages/SignupManager";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignupOptions from "./pages/SignupOptions";
import SignupSubcontractor from "./pages/SignupSubcontractor";
import SignupProvider from "./pages/SignupProvider";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup">
                <Route index element={<Signup />} />
                <Route path="options" element={<SignupOptions />} />
                <Route path="manager" element={<SignupManager />} />
                <Route path="provider" element={<SignupProvider />} />
                <Route
                  path="sub-contractor"
                  element={<SignupSubcontractor />}
                />
              </Route>
              <Route path="trips" element={<Trips />} />
              <Route path="trips/:id" element={<TourDetail />} />{" "}
              {/* ← NEW DETAIL PAGE */}
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manager" element={<ManagerDashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster position="top-center" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
