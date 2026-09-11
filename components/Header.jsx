"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaBell,
  FaWallet,
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaSuitcase,
  FaExclamationTriangle,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [showKycPopup, setShowKycPopup] = useState(false);
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [showCallDetails, setShowCallDetails] = useState(false);
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
          setUser(data.user);
          if (data.user && data.user.kyc_status === false) {
            setShowKycPopup(false);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserProfile();
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
        setShowEmailDetails(false);
        setShowCallDetails(false);
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
    ? user.first_name || user.name || "User"
    : "User";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs pl-0 md:pl-64 transition-all duration-300 font-sans">
      <div className="px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Search Bar & Greeting */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start pl-12 md:pl-0">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search services, recharge..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-full text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-xs"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Welcome,</span>
            <span className="font-extrabold text-slate-800">{displayName} 👋</span>
          </div>
        </div>

        {/* Right: Actions, Badges & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 relative" ref={profileRef}>
          {/* Contact Support Shortcuts */}
          <div className="flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 p-1 rounded-full shadow-xs">
            <button
              className="p-1.5 rounded-full hover:bg-white text-slate-600 hover:text-blue-600 transition shadow-xs"
              onClick={() => {
                setShowEmailDetails((prev) => !prev);
                setShowCallDetails(false);
              }}
              title="Support Email"
            >
              <FaEnvelope size={13} />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-white text-slate-600 hover:text-blue-600 transition shadow-xs"
              onClick={() => {
                setShowCallDetails((prev) => !prev);
                setShowEmailDetails(false);
              }}
              title="Helpline Number"
            >
              <FaPhoneAlt size={12} />
            </button>
          </div>

          {/* Email Popup */}
          {showEmailDetails && (
            <div className="absolute top-12 right-24 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 min-w-[240px] animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-xs text-slate-800">Support Email</span>
                <button
                  onClick={() => setShowEmailDetails(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
              <span className="text-xs text-blue-700 font-semibold select-all block bg-blue-50 p-2 rounded-lg border border-blue-100">
                teamdigitalservicecenter@gmail.com
              </span>
            </div>
          )}

          {/* Call Popup */}
          {showCallDetails && (
            <div className="absolute top-12 right-24 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 min-w-[220px] animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-xs text-slate-800">Helpline Number</span>
                <button
                  onClick={() => setShowCallDetails(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
              <span className="text-xs text-blue-700 font-semibold select-all block bg-blue-50 p-2 rounded-lg border border-blue-100 font-mono">
                +91-9285356192
              </span>
            </div>
          )}

          {/* KYC Status Badge */}
          {user && user.kyc_status === false ? (
            <button
              onClick={() => router.push("/kyc-form")}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-full font-bold text-xs shadow-xs transition"
              title="Click to complete your KYC"
            >
              <FaExclamationTriangle className="text-amber-500 animate-bounce text-xs" />
              <span>KYC Incomplete</span>
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-xs shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Verified
            </span>
          )}

          {/* Notification Bell */}
          <button
            onClick={() => {
              if (user && user.kyc_status === false) {
                router.push("/kyc-form");
              } else {
                setShowKycPopup(true);
              }
            }}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition shadow-xs border border-slate-200"
            title="Notifications"
          >
            <FaBell size={14} />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
              1
            </span>
          </button>

          {/* Wallet Balance Pill */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-3 py-1.5 rounded-full text-blue-900 font-extrabold text-xs shadow-xs cursor-pointer hover:border-blue-300 hover:shadow-sm transition"
            title="Available Wallet Balance"
          >
            <FaWallet className="text-blue-600 text-xs" />
            <span>₹{(Number(user?.wallet_balance) || 0).toLocaleString("en-IN")}</span>
          </div>

          {/* Profile Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm border-2 border-white">
                {initials}
              </div>
              <FaChevronDown size={10} className="text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fade-in">
                <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-base flex items-center justify-center shadow-md">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-extrabold text-slate-900 text-sm truncate">
                      {displayName}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {user?.email || "user@dscpay.com"}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/profile");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition"
                  >
                    <FaUser size={12} className="text-slate-400" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition"
                  >
                    <FaWallet size={12} className="text-slate-400" />
                    <span>Wallet Details</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/withdrawal");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition"
                  >
                    <FaMoneyBillWave size={12} className="text-slate-400" />
                    <span>Withdrawal</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/transactions");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition"
                  >
                    <FaExchangeAlt size={12} className="text-slate-400" />
                    <span>Transaction History</span>
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition"
                  >
                    <FaSignOutAlt size={12} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KYC Alert Modal */}
      {showKycPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FaBell size={24} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">No New Notifications</h3>
            <p className="text-xs text-slate-500 mb-5">
              All your services and accounts are up to date.
            </p>
            <button
              onClick={() => setShowKycPopup(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
