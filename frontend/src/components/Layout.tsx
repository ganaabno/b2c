import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Shield, Menu, X } from "lucide-react";
import Logo from "../assets/last logo.png";
import { useEffect, useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const [isBlured, setIsBlured] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsBlured(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav
        className={`fixed top-0 left-0 z-50 w-full ${
          isBlured ? "backdrop-blur-sm shadow-md" : ""
        } transition-all duration-300`}
      >
        <div className="mx-auto max-w-[2000px] px-4 py-4 md:py-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold z-50"
              onClick={closeMobileMenu}
            >
              <img
                src={Logo}
                alt="LogoImage"
                className="scale-50 md:scale-50 invert sepia hue-rotate-15 saturate-50"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/tours"
                className="font-semibold text-white shadow-2xl hover:text-slate-900 duration-700"
              >
                Tours
              </Link>

              {user ? (
                <>
                  <Link to="/dashboard" className="hover:text-amber-200">
                    Dashboard
                  </Link>
                  {user.role === "MANAGER" && (
                    <Link to="/manager">Manager</Link>
                  )}
                  {user.role === "ADMIN" && (
                    <Link to="/admin" className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}
                  <span className="text-amber-100">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 rounded bg-amber-700 px-4 py-2 hover:bg-amber-800"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-semibold text-white shadow-2xl hover:text-slate-900 duration-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-2xl shadow-2xl font-semibold bg-sky-300 px-4 py-2 hover:bg-sky-400 duration-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 p-2 text-white hover:text-amber-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "0" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
            <Link
              to="/tours"
              className="text-2xl font-semibold text-white hover:text-amber-200 transition-colors"
              onClick={closeMobileMenu}
            >
              Tours
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-2xl font-semibold text-white hover:text-amber-200 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                {user.role === "MANAGER" && (
                  <Link
                    to="/manager"
                    className="text-2xl font-semibold text-white hover:text-amber-200 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Manager
                  </Link>
                )}
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="text-2xl font-semibold text-white hover:text-amber-200 transition-colors flex items-center gap-2"
                    onClick={closeMobileMenu}
                  >
                    <Shield className="h-6 w-6" />
                    Admin
                  </Link>
                )}
                <span className="text-xl text-amber-100">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 rounded bg-amber-700 px-6 py-3 text-lg hover:bg-amber-800 transition-colors"
                >
                  <LogOut className="h-5 w-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-2xl font-semibold text-white hover:text-amber-200 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-2xl font-semibold bg-sky-300 px-6 py-3 text-lg hover:bg-sky-400 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-20 md:pt-32">
        <Outlet />
      </main>
    </div>
  );
}
