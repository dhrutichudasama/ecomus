import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock, UserPlus } from "lucide-react";
import { useModal } from "../context/ModalContext";

const AuthModal = () => {
  const { isAuthOpen, closeAuth } = useModal();
  const [view, setView] = useState("login"); // "login" or "register"

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeAuth]);

  const toggleView = () => {
    setView(view === "login" ? "register" : "login");
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 bg-black/60 z-[9998]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white w-full max-w-md shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={closeAuth}
                className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 sm:p-12">
                <AnimatePresence mode="wait">
                  {view === "login" ? (
                    <motion.div
                      key="login"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                      <p className="text-gray-500 mb-8">Login to your account to continue shopping</p>

                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="email"
                              placeholder="example@mail.com"
                              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 focus:ring-1 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <button className="text-xs text-gray-400 hover:text-black">Forgot password?</button>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="password"
                              placeholder="••••••••"
                              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 focus:ring-1 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <button className="w-full bg-black text-white font-bold py-4  hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg shadow-black/20 mt-4">
                          Sign In
                        </button>
                      </form>

                      <p className="text-center mt-8 text-gray-600">
                        Don't have an account?{" "}
                        <button
                          onClick={toggleView}
                          className="font-bold text-black hover:underline"
                        >
                          Create Account
                        </button>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                      <p className="text-gray-500 mb-8">Join us and start your shopping journey</p>

                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 focus:ring-1 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="email"
                              placeholder="example@mail.com"
                              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 focus:ring-1 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="password"
                              placeholder="••••••••"
                              className="w-full bg-gray-50 border border-gray-200 py-3 pl-12 pr-4 focus:ring-1 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <button className="w-full bg-black text-white font-bold py-4 hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg shadow-black/20 mt-4">
                          Register Now
                        </button>
                      </form>

                      <p className="text-center mt-8 text-gray-600">
                        Already have an account?{" "}
                        <button
                          onClick={toggleView}
                          className="font-bold text-black hover:underline"
                        >
                          Login
                        </button>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
