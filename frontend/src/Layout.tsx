import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Shield, Menu, X, LogIn, UserPlus } from "lucide-react"; // Added LogIn and UserPlus
import Logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

export default function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Scroll detection ONLY on homepage
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when modals/menu open
  useEffect(() => {
    if (isMobileMenuOpen || isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isAuthModalOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    closeMobileMenu();
  };

  // Transparent only on homepage when not scrolled
  const isTransparent = isHomePage && !isScrolled;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800"
        }`}
      >
        <div className="mx-auto max-w-[2000px] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center"
            >
              <img
                src={Logo}
                alt="Logo"
                className={`h-9 w-auto transition-all duration-500 ${
                  isTransparent
                    ? "brightness-0 invert drop-shadow-2xl"
                    : "invert dark:brightness-0"
                }`}
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-10 flex-1 justify-center">
              <Link
                to="/"
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                  isTransparent
                    ? "text-white drop-shadow-lg hover:text-sky-500 hover:underline hover:underline-offset-4 hover:scale-120 duration-700"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={closeMobileMenu}
              >
                Нүүр Хуудас
              </Link>

              <Link
                to="/tours"
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                  isTransparent
                    ? "text-white drop-shadow-lg hover:text-sky-500 hover:underline hover:underline-offset-4 duration-700 hover:scale-120"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={closeMobileMenu}
              >
                Бүх Аялалууд
              </Link>

              <div
                className={`text-sm font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                  isTransparent
                    ? "text-white drop-shadow-lg hover:text-sky-500 hover:underline hover:underline-offset-4 duration-700 hover:scale-120"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Мэдээлэл
              </div>

              <Link
                to="/membership"
                className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                  isTransparent
                    ? "text-white drop-shadow-lg hover:text-sky-500 hover:underline hover:underline-offset-4 duration-700 hover:scale-120"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={closeMobileMenu}
              >
                Гишүүнчэл
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                        isTransparent
                          ? "text-white drop-shadow-lg hover:text-amber-300"
                          : "text-gray-700 dark:text-gray-300 hover:text-amber-500"
                      }`}
                    >
                      <Shield className="h-4 w-4" /> Admin
                    </Link>
                  )}
                  {user.role === "MANAGER" && (
                    <Link
                      to="/manager"
                      className={`text-sm font-medium transition-colors ${
                        isTransparent
                          ? "text-white drop-shadow-lg hover:text-amber-300"
                          : "text-gray-700 dark:text-gray-300 hover:text-amber-500"
                      }`}
                    >
                      Manager
                    </Link>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isTransparent
                        ? "text-white drop-shadow-lg"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Сайн уу, {user.firstname}
                  </span>
                  <Link to="/profile">
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
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
                  <button
                    onClick={() => openAuthModal("login")}
                    className={`text-sm cursor-pointer font-medium transition-colors flex items-center gap-2 ${
                      isTransparent
                        ? "text-white drop-shadow-lg hover:text-amber-400 hover:scale-130 duration-700 hover:font-semibold hover:duration-700"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    Нэвтрэх
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className={`rounded-full cursor-pointer px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all flex items-center gap-2 ${
                      isTransparent
                        ? "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500"
                        : "bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500"
                    }`}
                  >
                    <UserPlus className="h-4 w-4" />
                    Бүртгүүлэх
                  </button>
                  <ModeToggle />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isTransparent
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-8 z-40">
          <Link
            to="/"
            className="text-xl font-medium"
            onClick={closeMobileMenu}
          >
            Нүүр Хуудас
          </Link>
          <Link
            to="/tours"
            className="text-xl font-medium"
            onClick={closeMobileMenu}
          >
            Бүх Аялалууд
          </Link>
          <Link
            to="/membership"
            className="text-xl font-medium"
            onClick={closeMobileMenu}
          >
            Гишүүнчэл
          </Link>
          {user ? (
            <>
              <span className="text-lg">Сайн уу, {user.firstname}</span>
              <ModeToggle />
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal("login")}
                className="text-xl font-medium flex items-center gap-2"
              >
                <LogIn className="h-5 w-5" />
                Нэвтрэх
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="rounded-full bg-amber-500 px-8 py-3 text-lg font-medium text-white flex items-center gap-2"
              >
                <UserPlus className="h-5 w-5" />
                Бүртгүүлэх
              </button>
              <ModeToggle />
            </>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-24">
        <Outlet />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
