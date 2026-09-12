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
} from "react-icons/fa";

export default function Header({ onToggleSidebar }) {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
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
    }
    fetchUserProfile();
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
    ? user.first_name || user.name || "Rohit Kumar"
    : "Rohit Kumar";

  const userRole = user?.role || "Retailer";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-2xs h-[68px] px-4 sm:px-6 flex items-center justify-between transition-all select-none font-sans">
      {/* 1. LEFT: Brand Logo & Title */}
      <div className="flex items-center gap-3 w-auto md:w-60 shrink-0">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 -ml-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <FaBars size={18} />
        </button>

        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/assets/logo1.png" 
            alt="DSC PAY Logo" 
            className="h-10 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" 
          />
        </Link>
      </div>

      {/* 2. CENTER: Pill Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-[460px] mx-4 lg:mx-8">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search services, like Money Transfer, Recharge, etc..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f5f8fc] hover:bg-[#edf3fa] focus:bg-white border border-slate-200/90 focus:border-blue-500 rounded-full text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* 3. RIGHT: Notifications Bell, Dark Mode Toggle & Rohit Kumar Profile */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Notification Bell */}
        <button
          onClick={() => setShowNotificationModal(true)}
          className="relative text-[#0a1e4d] hover:text-blue-600 transition-colors p-1 focus:outline-none cursor-pointer"
          title="Notifications"
        >
          <FaBell size={18} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-2xs">
            3
          </span>
        </button>

        {/* Dark Mode Moon Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-[#0a1e4d] hover:text-blue-600 transition-colors p-1 focus:outline-none cursor-pointer"
          title="Toggle theme"
        >
          {darkMode ? (
            <FaSun size={18} className="text-amber-500" />
          ) : (
            <FaMoon size={17} />
          )}
        </button>

        {/* User Profile Widget */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
          >
            {/* Circular Blue Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-xs shadow-xs font-bold shrink-0">
              <FaUser size={12} />
            </div>

            {/* Rohit Kumar + Retailer Text */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0a1e4d] leading-none">
                {displayName}
              </span>
              <span className="text-[11px] font-medium text-slate-400 leading-tight mt-0.5">
                {userRole}
              </span>
            </div>

            {/* Dropdown Chevron */}
            <FaChevronDown size={10} className="text-slate-400 hidden sm:block ml-0.5" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 pb-3 mb-2 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#1d68f6] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  <FaUser size={15} />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 text-xs truncate">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {user?.email || "retailer@dscpay.com"}
                  </div>
                  <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                    {userRole}
                  </span>
                </div>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <FaUser size={12} className="text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/transactions");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <FaWallet size={12} className="text-slate-400" />
                  <span>Wallet & Passbook</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/withdrawal");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <FaMoneyBillWave size={12} className="text-slate-400" />
                  <span>Withdrawal Services</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/transactions");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <FaExchangeAlt size={12} className="text-slate-400" />
                  <span>Transactions</span>
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition"
                >
                  <FaSignOutAlt size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FaBell size={20} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1">Latest Notifications</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Aadhaar Verification Service is now live! Earn higher commissions on micro ATM & AEPS transactions.
            </p>
            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Mark as Read
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
