"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGift,
  FaMobileAlt,
  FaUsers,
  FaTh,
  FaPlus,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaIdCard,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [rechargeOpen, setRechargeOpen] = useState(pathname.startsWith("/recharge"));
  const [open, setOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState(pathname.startsWith("/utility"));

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

  const isRechargeActive = pathname.startsWith("/recharge");
  const isUtilityActive = pathname.startsWith("/utility");

  return (
    <>
      {/* Mobile Hamburger toggle button */}
      <button
        className="fixed top-3.5 left-3.5 z-50 md:hidden bg-blue-600 text-white p-2.5 rounded-xl shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={18} />
      </button>

      {/* Mobile Backdrop Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-xs md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0f2444] via-[#0d1d36] to-[#081426] text-white z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
                <img
                  src="/assets/logo1.png"
                  alt="DSC PAY"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-wide text-white">
                  DSC PAY
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                  Digital Services
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              className="text-white/70 hover:text-white md:hidden p-1.5 rounded-lg"
              onClick={() => setOpen(false)}
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3.5 space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">
              Menu & Services
            </div>

            {/* Main Dashboard */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname === "/"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <RiDashboardLine size={19} />
              <span>Dashboard</span>
            </Link>

            {/* E-Gift Card */}
            <Link
              href="/ott"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname.startsWith("/ott")
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <FaGift size={18} />
              <span>E-Gift Card</span>
            </Link>

            {/* Recharge Accordion */}
            <div>
              <div
                onClick={() => setRechargeOpen((prev) => !prev)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 select-none ${isRechargeActive
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaMobileAlt size={18} />
                  <span>Recharge</span>
                </div>
                <div className="text-slate-400 transition-transform duration-200">
                  {rechargeOpen ? (
                    <MdKeyboardArrowDown size={20} />
                  ) : (
                    <MdKeyboardArrowRight size={20} />
                  )}
                </div>
              </div>

              {rechargeOpen && (
                <div className="ml-5 mt-1 space-y-1 border-l-2 border-blue-500/30 pl-2.5 animate-fade-in">
                  <Link
                    href="/recharge/mobile"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${pathname === "/recharge/mobile"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${pathname === "/recharge/mobile"
                          ? "bg-cyan-300 animate-pulse"
                          : "bg-slate-500"
                        }`}
                    />
                    <span>Mobile Recharge</span>
                  </Link>

                  <Link
                    href="/recharge/dth"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${pathname === "/recharge/dth"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${pathname === "/recharge/dth"
                          ? "bg-cyan-300 animate-pulse"
                          : "bg-slate-500"
                        }`}
                    />
                    <span>DTH Recharge</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Sell & Earn */}
            <Link
              href="/sell-earn"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname.startsWith("/sell-earn")
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <FaUsers size={18} />
              <span>Sell & Earn</span>
            </Link>

            {/* Aadhaar Services */}
            <Link
              href="/aadhaar"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${pathname.startsWith("/aadhaar") || pathname.startsWith("/Aadhaar")
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <FaIdCard size={18} />
              <span>Aadhaar Services</span>
            </Link>

            {/* Utility Services Accordion */}
            <div>
              <div
                onClick={() => setUtilityOpen((prev) => !prev)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 select-none ${isUtilityActive
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaTh size={18} />
                  <span>Utility Services</span>
                </div>
                <div className="text-slate-400 transition-transform duration-200">
                  {utilityOpen ? (
                    <MdKeyboardArrowDown size={20} />
                  ) : (
                    <MdKeyboardArrowRight size={20} />
                  )}
                </div>
              </div>

              {utilityOpen && (
                <div className="ml-5 mt-1 space-y-1 border-l-2 border-blue-500/30 pl-2.5 animate-fade-in">
                  <Link
                    href="/utility/cash-collection"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${pathname === "/utility/cash-collection"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${pathname === "/utility/cash-collection"
                          ? "bg-cyan-300 animate-pulse"
                          : "bg-slate-500"
                        }`}
                    />
                    <span>Cash Collection</span>
                  </Link>

                  <Link
                    href="/utility/lic-premium"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${pathname === "/utility/lic-premium"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${pathname === "/utility/lic-premium"
                          ? "bg-cyan-300 animate-pulse"
                          : "bg-slate-500"
                        }`}
                    />
                    <span>LIC Premium</span>
                  </Link>

                  <Link
                    href="/utility/credit-card"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${pathname === "/utility/credit-card"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${pathname === "/utility/credit-card"
                          ? "bg-cyan-300 animate-pulse"
                          : "bg-slate-500"
                        }`}
                    />
                    <span>Credit Card</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-2">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-95"
          >
            <FaPlus size={14} />
            <span>Add Service</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white font-bold text-xs border border-red-500/30 transition-all active:scale-95"
          >
            <FaSignOutAlt size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
