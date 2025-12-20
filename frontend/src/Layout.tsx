import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Shield, Menu, X } from "lucide-react";
import Logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import Footer from "./components/Footer";
export default function Layout() {
  const { user } = useAuth();
  const [isBlured, setIsBlured] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsBlured(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav
        className={`fixed top-0 left-0 z-50 w-full ${
          isBlured
            ? "backdrop-blur-sm shadow-md bg-white/80 dark:bg-gray-900/80"
            : "bg-transparent"
        } transition-all duration-300`}>
        <div className="mx-auto max-w-[2000px] px-8 py-4 md:py-8">
          <div className="flex h-4 items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold z-50"
              onClick={closeMobileMenu}>
              <img
              height={200}
              width={320}
                src={Logo}
                alt="LogoImage"
                className="scale-50 invert sepia hue-rotate-15 saturate-50 dark:brightness-0 dark:invert dark:sepia-0 dark:hue-rotate-0 dark:saturate-100"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/tours"
                className="font-semibold text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 duration-300">
                Бүх аялалууд
              </Link>

              {user ? (
                <>
                  {user.role === "MANAGER" && (
                    <Link
                      to="/manager"
                      className="font-semibold text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 duration-300">
                      Manager
                    </Link>
                  )}
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 duration-300">
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}

                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    Сайн уу, {user.firstname}
                  </span>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 group ml-2"
                    title="Go to Profile">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 group-hover:border-amber-400 dark:group-hover:border-amber-400 transition-all shadow-sm">
                      <img
                        src={
                          user.avatar ||
                          `https://ui-avatars.com/api/?name=${user.firstname}&background=0D8ABC&color=fff`
                        }
                        alt={user.firstname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                  <ModeToggle />
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-semibold text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 duration-300">
                    Нэвтрэх
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-2xl font-semibold bg-amber-500 dark:bg-amber-600 text-white px-4 py-2 hover:bg-amber-600 dark:hover:bg-amber-500 duration-300 shadow-md">
                    Бүртгүүлэх
                  </Link>
                  <ModeToggle />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 p-2 text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              aria-label="Toggle menu">
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
          className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "0" }}>
          <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
            <Link
              to="/tours"
              className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              onClick={closeMobileMenu}>
              Tours
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  onClick={closeMobileMenu}>
                  Dashboard
                </Link>
                {user.role === "MANAGER" && (
                  <Link
                    to="/manager"
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={closeMobileMenu}>
                    Manager
                  </Link>
                )}
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-2"
                    onClick={closeMobileMenu}>
                    <Shield className="h-6 w-6" />
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center gap-3 group mt-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 group-hover:border-amber-400 dark:group-hover:border-amber-400 transition-all">
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${user.firstname}&background=0D8ABC&color=fff`
                      }
                      alt={user.firstname}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-xl text-gray-700 dark:text-gray-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 font-medium">
                    Hi, {user.firstname}
                  </span>
                </Link>
                <ModeToggle />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-2xl font-semibold bg-amber-500 dark:bg-amber-600 text-white px-6 py-3 text-lg hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shadow-md"
                  onClick={closeMobileMenu}>
                  Sign Up
                </Link>
                <ModeToggle />
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
