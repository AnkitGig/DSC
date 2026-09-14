"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaUser,
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaSignOutAlt,
  FaBars,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaHeadset,
} from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";

export default function Header({ onToggleSidebar }) {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
      if (!token || !userId) return;

      const res = await fetch(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();

    const handleAuthChange = () => {
      fetchUserProfile();
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const displayName = user
    ? user.first_name || user.name || "Retailer"
    : "Retailer";

  const userRole = user?.kyc_status ? "Verified Retailer" : "KYC Pending";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs h-[70px] px-4 sm:px-6 flex items-center justify-between transition-all select-none font-sans">
      {/* 1. LEFT: Brand Logo & Mobile Toggle */}
      <div className="flex items-center gap-3 w-auto md:w-60 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 -ml-1.5 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-[#1d68f6] focus:outline-none cursor-pointer transition"
          aria-label="Toggle sidebar"
        >
          <FaBars size={18} />
        </button>

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-10 flex items-center">
            <img 
              src="/assets/logo1.png" 
              alt="DSC PAY Logo" 
              className="h-9 w-auto object-contain shrink-0 group-hover:scale-102 transition-transform duration-200" 
            />
          </div>
        </Link>
      </div>

      {/* 2. CENTER: Premium Clean Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-[480px] mx-4 lg:mx-8">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs transition" />
          <input
            type="text"
            placeholder="Search services (Money Transfer, Recharge, Aadhaar, Insurance...)"
            className="w-full pl-10 pr-4 py-2.5 bg-[#f5f8fc] hover:bg-[#edf3fa] focus:bg-white border border-slate-200/90 focus:border-[#1d68f6] rounded-2xl text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-500/15 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 3. RIGHT: Live Wallet Badge, Quick Actions & User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Wallet Balance Widget Pill */}
        <div className="hidden sm:flex items-center gap-2.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/70 border border-blue-200/80 px-3.5 py-1.5 rounded-2xl shadow-2xs">
          <div className="w-6 h-6 rounded-xl bg-[#1d68f6] text-white flex items-center justify-center text-[10px] shadow-xs">
            <FaWallet />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
              Wallet
            </span>
            <span className="text-xs font-black text-[#0a1e4d] font-mono leading-tight">
              ₹12,450.00
            </span>
          </div>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setShowNotificationModal(true)}
          className="relative w-9 h-9 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-600 hover:text-[#1d68f6] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="Notifications"
        >
          <FaBell size={14} />
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-2xs">
            3
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-9 h-9 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-600 hover:text-[#1d68f6] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="Toggle theme"
        >
          {darkMode ? (
            <FaSun size={14} className="text-amber-500" />
          ) : (
            <FaMoon size={13} />
          )}
        </button>

        {/* Vertical Separator */}
        <div className="h-7 w-[1px] bg-slate-200/90 mx-1 hidden sm:block" />

        {/* User Profile Widget */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 pl-1.5 sm:pr-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 transition-all cursor-pointer shadow-2xs"
          >
            {/* Circular Blue Avatar */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1d68f6] to-blue-500 text-white flex items-center justify-center text-xs shadow-xs font-bold shrink-0">
              <FaUser size={11} />
            </div>

            {/* User Name + Verified Role Text */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-black text-[#0a1e4d] leading-none">
                {displayName}
              </span>
              <span className="text-[10px] font-bold text-blue-600 leading-tight mt-0.5 flex items-center gap-1">
                <RiShieldCheckFill className="text-[11px]" />
                <span>{userRole}</span>
              </span>
            </div>

            {/* Dropdown Chevron */}
            <FaChevronDown size={9} className="text-slate-400 hidden sm:block ml-0.5" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-3xl shadow-xl border border-slate-200/90 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 pb-3 mb-2.5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1d68f6] to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  <FaUser size={14} />
                </div>
                <div className="overflow-hidden">
                  <div className="font-black text-[#0a1e4d] text-xs truncate">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {user?.email || "retailer@dscpay.com"}
                  </div>
                  <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-extrabold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/70 rounded-md">
                    <RiShieldCheckFill className="text-[10px]" />
                    <span>{userRole}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition cursor-pointer"
                >
                  <FaUser size={11} className="text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/transactions");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition cursor-pointer"
                >
                  <FaWallet size={11} className="text-slate-400" />
                  <span>Wallet & Passbook</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/withdraw-request");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition cursor-pointer"
                >
                  <FaMoneyBillWave size={11} className="text-slate-400" />
                  <span>Withdrawal Services</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/transactions");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition cursor-pointer"
                >
                  <FaExchangeAlt size={11} className="text-slate-400" />
                  <span>Transaction History</span>
                </button>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition cursor-pointer"
                >
                  <FaSignOutAlt size={11} />
                  <span>Logout Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white text-slate-800 rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1d68f6] border border-blue-100 flex items-center justify-center mx-auto mb-3">
              <FaBell size={18} />
            </div>
            <h3 className="text-base font-black text-[#0a1e4d] mb-1">Latest Notifications</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">
              Aadhaar Update & Insurance Verification Services are active. Earn direct wallet margins on successful submissions.
            </p>
            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Mark as Read
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
