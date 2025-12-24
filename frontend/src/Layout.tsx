import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Shield, Menu, X } from "lucide-react";
import Logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

export default function Layout() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false); // renamed for clarity
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[2000px] px-8 py-4 md:py-8">
          <div className="flex h-4 items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold z-50"
              onClick={closeMobileMenu}
            >
              <img
                height={200}
                width={320}
                src={Logo}
                alt="LogoImage"
                className={`scale-50 transition-all duration-500 ${
                  isScrolled
                    ? "brightness-0 dark:brightness-100 "
                    : "sepia hue-rotate-15 saturate-50 dark:brightness-0 dark:invert dark:sepia-0 dark:hue-rotate-0 dark:saturate-100"
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`font-semibold text-2xl duration-500 ${
                  isScrolled
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-white dark:text-gray-200"
                } hover:text-amber-500 dark:hover:text-amber-400`}
                onClick={closeMobileMenu}
              >
                Нүүр Хуудас
              </Link>
              <Link
                to="/tours"
                className={`font-semibold text-2xl duration-500 ${
                  isScrolled
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-white dark:text-gray-200"
                } hover:text-amber-500 dark:hover:text-amber-400`}
              >
                Бүх аялалууд
              </Link>

              {user ? (
                <>
                  {user.role === "MANAGER" && (
                    <Link
                      to="/manager"
                      className={`font-semibold text-2xl duration-500 ${
                        isScrolled
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-white dark:text-gray-200"
                      } hover:text-amber-500 dark:hover:text-amber-400`}
                    >
                      Manager
                    </Link>
                  )}
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className={`flex items-center gap-2 font-semibold duration-500 ${
                        isScrolled
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-white dark:text-gray-200"
                      } hover:text-amber-500 dark:hover:text-amber-400`}
                    >
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}

                  <span
                    className={`font-semibold text-2xl duration-500 ${
                      isScrolled
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-white dark:text-gray-200"
                    }`}
                  >
                    Сайн уу, {user.firstname}
                  </span>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 group ml-2"
                    title="Go to Profile"
                  >
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
                  <button
                    onClick={() => openAuthModal("login")}
                    className={`font-semibold text-2xl duration-500 ${
                      isScrolled
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-white dark:text-gray-200"
                    } hover:text-amber-500 dark:hover:text-amber-400`}
                  >
                    Нэвтрэх
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="rounded-2xl font-semibold bg-amber-500 dark:bg-amber-600 text-white px-4 py-2 hover:bg-amber-600 dark:hover:bg-amber-500 duration-500 shadow-md"
                  >
                    Бүртгүүлэх
                  </button>
                  <ModeToggle />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 p-2 text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
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
          className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "0" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
            <Link
              to="/tours"
              className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              onClick={closeMobileMenu}
            >
              Бүх аялалууд
            </Link>

            {user ? (
              <>
                {user.role === "MANAGER" && (
                  <Link
                    to="/manager"
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Manager
                  </Link>
                )}
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-2"
                    onClick={closeMobileMenu}
                  >
                    <Shield className="h-6 w-6" />
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center gap-3 group mt-4"
                >
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
                    Сайн уу, {user.firstname}
                  </span>
                </Link>
                <ModeToggle />
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Нэвтрэх
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="rounded-2xl font-semibold bg-amber-500 dark:bg-amber-600 text-white px-6 py-3 text-lg hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shadow-md"
                >
                  Бүртгүүлэх
                </button>
                <ModeToggle />
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <Outlet />
      </main>

      <Footer />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
