import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import LoginForm from "../pages/Login";
import SignupForm from "../pages/Signup";
import logImg from "@/assets/illustriation.jpg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (initialMode && isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const isLogin = mode === "login";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-3xl"
              style={{ perspective: 1400 }} // stronger 3D feel
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute cursor-pointer right-6 top-6 z-20 rounded-full bg-white/90 p-3 text-gray-700 hover:bg-white hover:scale-110 transition dark:bg-gray-800/90"
                aria-label="Close"
              >
                <X className="h-7 w-7" />
              </button>

              <motion.div
                className="relative w-full h-[760px] lg:h-[780px] xl:h-[820px]" 
                animate={{ rotateY: isLogin ? 0 : 180 }}
                transition={{
                  duration: 0.9,
                  type: "spring",
                  stiffness: 70,
                  damping: 20,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 h-full"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20">
                    <div className="w-full max-w-md mx-auto">
                      <LoginForm />
                      <div className="mt-10 text-center text-gray-600 dark:text-gray-400">
                        <p className="text-lg">
                          Бүртгэлгүй бол{" "}
                          <button
                            onClick={toggleMode}
                            className="font-bold text-sky-600 hover:underline hover:cursor-pointer hover:text-sky-800"
                          >
                            энд дарна уу
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex relative overflow-hidden">
                    <img
                      src={logImg}
                      alt="Travel illustration"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>
                </div>

                <div
                  className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="hidden lg:flex relative overflow-hidden">
                    <img
                      src={logImg}
                      alt="Join the journey"
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20">
                    <div className="w-full max-w-md mx-auto">
                      <SignupForm />
                      <div className="mt-10 text-center text-gray-600 dark:text-gray-400">
                        <p className="text-lg">
                          Бүртгэлтэй бол{" "}
                          <button
                            onClick={toggleMode}
                            className="font-bold text-sky-600 hover:underline hover:cursor-pointer hover:text-sky-800"
                          >
                            энд дарж нэвтэрнэ үү.
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
