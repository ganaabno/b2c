// // src/App.tsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "react-hot-toast";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import Tours from "./pages/Tours";
// import TourDetail from "./pages/TourDetail";
// import AdminDashboard from "./pages/AdminDashboard";
// import ManagerDashboard from "./pages/(manager)/ManagerDashboard";
// import UserProfile from "./pages/UserProfile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Layout from "./Layout";
// import { AuthProvider } from "./context/AuthContext";
// import MembershipPage from "./pages/MembershipPage";
// import ScrollToTop from "./components/ScrollToTop";
// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
//       <QueryClientProvider client={queryClient}>
//         <AuthProvider>
//           <BrowserRouter>
//             <ScrollToTop />
//             <Routes>
//               <Route element={<Layout />}>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/tours" element={<Tours />} />
//                 <Route path="/tours/:slug" element={<TourDetail />} />{" "}
//                 {/* ← NEW DETAIL PAGE */}
//                 <Route element={<ProtectedRoute />}>
//                   <Route path="/profile" element={<UserProfile />} />
//                   <Route path="/membership" element={<MembershipPage />} />

//                   <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
//                     <Route path="/admin" element={<AdminDashboard />} />
//                   </Route>
//                   <Route
//                     element={
//                       <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]} />
//                     }>
//                     <Route path="/manager" element={<ManagerDashboard />} />
//                   </Route>
//                 </Route>
//               </Route>

//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>

//             <Toaster position="top-center" />
//           </BrowserRouter>
//         </AuthProvider>
//       </QueryClientProvider>
//     </ThemeProvider>
//   );
// }

/// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/(manager)/ManagerDashboard";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext";
import MembershipPage from "./pages/MembershipPage";
import ScrollToTop from "./components/ScrollToTop";
import AccessDenied from "./pages/AccessDenied";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
                element={<ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]} />}
              >
                <Route path="/manager" element={<ManagerDashboard />} />
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
