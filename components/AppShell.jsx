"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaArrowRight,
  FaIdCard,
  FaUniversity,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [kycPending, setKycPending] = useState(false);

  // Public & standalone routes
  const isPublicRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/admin";

  const isAdminDashboard = pathname === "/admin-dashboard";
  const isAuthRoute = isPublicRoute || isAdminDashboard;

  // Check auth and KYC status
  const evaluateAuth = useCallback(async () => {
    if (typeof window === "undefined") return;

    // Public routes don't require user login
    if (isPublicRoute) {
      setIsAuthenticated(false);
      setCheckingAuth(false);
      return;
    }

    // Admin dashboard handles its own admin token verification
    if (isAdminDashboard) {
      const adminToken = localStorage.getItem("token");
      if (!adminToken) {
        router.replace("/admin");
        return;
      }
      setIsAuthenticated(true);
      setCheckingAuth(false);
      return;
    }

    // For all user/retailer protected routes
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // 1. Without login, cannot access! ("bina login ke yaha nhi aana chaiye")
    if (!token || !userId) {
      setIsAuthenticated(false);
      setCheckingAuth(false);
      router.replace("/login");
      return;
    }

    setIsAuthenticated(true);

    // 2. Fetch live profile to check kyc_status
    try {
      const res = await fetch(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          setUserProfile(data.user);
          const isKycDone = Boolean(data.user.kyc_status);
          setKycPending(!isKycDone);
          localStorage.setItem("kyc_status", String(isKycDone));
        }
      } else if (res.status === 401 || res.status === 403 || res.status === 404) {
        // Invalid or expired token
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("kyc_status");
        setIsAuthenticated(false);
        router.replace("/login");
        return;
      } else {
        // Fallback to localStorage if offline/network error
        const localKyc = localStorage.getItem("kyc_status");
        setKycPending(localKyc !== "true");
      }
    } catch (err) {
      console.error("Profile check error:", err);
      const localKyc = localStorage.getItem("kyc_status");
      setKycPending(localKyc !== "true");
    } finally {
      setCheckingAuth(false);
    }
  }, [pathname, isPublicRoute, isAdminDashboard, router]);

  useEffect(() => {
    evaluateAuth();

    // Listen for custom auth or KYC updates
    const handleAuthChange = () => {
      evaluateAuth();
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [evaluateAuth]);

  // Prevent keyboard Esc from closing KYC modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && kycPending && pathname !== "/kyc-form") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [kycPending, pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
      router.push("/login");
    }
  };

  // While checking auth on protected routes, show clean loader so content is not exposed
  if (checkingAuth && !isPublicRoute) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#081a42] to-[#0f2963] text-white">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-3 mb-4 flex items-center justify-center border border-white/20 shadow-2xl animate-pulse">
          <img
            src="/assets/logo1.png"
            alt="DSC Pay"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <div className="text-sm font-bold tracking-wide text-slate-200">
          Securing Session...
        </div>
      </div>
    );
  }

  // If unauthenticated and on protected route, block rendering (redirection in progress)
  if (!isAuthenticated && !isPublicRoute && !isAdminDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fc]">
        <div className="text-center p-6">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-bold text-slate-600">Redirecting to Login...</p>
        </div>
      </div>
    );
  }

  const hideLayout = isAuthRoute;
  const isKycFormPage = pathname === "/kyc-form";
  const showBlockingKycModal = isAuthenticated && kycPending && !isKycFormPage && !isAuthRoute;

  return (
    <div className="min-h-screen bg-[#f4f8fc] text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white relative">
      {!hideLayout && (
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      )}
      <div className="flex-1 flex relative">
        {!hideLayout && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>

      {/* Mandatory Non-Dismissable KYC Popup Modal */}
      {showBlockingKycModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-slate-800 border border-slate-100 relative overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Glowing Header Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-blue-600" />

            {/* Shield / Alert Icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-18 h-18 rounded-3xl bg-amber-50 border-2 border-amber-200/80 flex items-center justify-center text-amber-600 shadow-lg shadow-amber-500/10">
                  <FaShieldAlt size={36} className="animate-bounce duration-1000" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 text-white text-[10px] font-black items-center justify-center">
                    !
                  </span>
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                KYC Verification Mandatory
              </h2>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mt-0.5">
                केवाईसी सत्यापन आवश्यक है
              </span>
            </div>

            {/* Warning Description */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 mb-5 text-center">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                As per regulatory and RBI compliance guidelines, you must complete your KYC verification to access and activate all DSC Pay portal services.
              </p>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 font-medium leading-normal">
                पोर्टल की सभी सेवाओं (AEPS, DMT, बिल भुगतान, रिचार्ज, आधार एवं इंश्योरेंस) का उपयोग करने के लिए तुरंत अपनी KYC पूर्ण करें।
              </p>
            </div>

            {/* Verification Items Checklist */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                    <FaIdCard />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    Aadhaar & Identity Verification
                  </span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 flex items-center gap-1">
                  <FaExclamationTriangle size={9} /> Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                    <FaShieldAlt />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    PAN Card Verification
                  </span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 flex items-center gap-1">
                  <FaExclamationTriangle size={9} /> Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                    <FaUniversity />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    Bank Account & Settlement Details
                  </span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 flex items-center gap-1">
                  <FaExclamationTriangle size={9} /> Pending
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  router.push("/kyc-form");
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Complete KYC Verification Now</span>
                <FaArrowRight size={13} />
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaSignOutAlt size={11} />
                <span>Logout / लॉगआउट करें</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
