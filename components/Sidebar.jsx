"use client";

import {
  FaGift,
  FaMobileAlt,
  FaUsers,
  FaTh,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [rechargeOpen, setRechargeOpen] = useState(pathname.startsWith("/recharge"));
  const [open, setOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState(pathname.startsWith("/utility"));

  const sidebarClasses = `bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 shadow-2xl h-full w-64 fixed left-0 top-0 z-50 flex flex-col justify-between animate-fade-in transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0`;

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

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={22} />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className={sidebarClasses} style={{ minHeight: "100vh" }}>
        <div>
          {/* Close button for mobile */}
          <div className="flex justify-end md:hidden p-4">
            <button
              className="text-white bg-blue-700 p-2 rounded-full shadow"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes size={22} />
            </button>
          </div>

          <div className="p-3 border-b border-blue-300 bg-white flex items-center justify-center">
            <img
              src="/assets/logo1.png"
              alt="DSC PAY Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <ul className="space-y-3 p-6">
            <li
              className={`transition-all duration-200 flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer ${
                pathname === "/"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              <Link href="/" className="flex items-center gap-3 w-full">
                <RiDashboardLine size={22} />
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>

            <li
              className="transition-all duration-200 flex items-center gap-3 rounded-xl px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <FaGift size={20} /> <span className="font-medium">E-Gift Card</span>
            </li>

            <li className="flex flex-col select-none">
              <div
                className={`transition-all duration-200 flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer ${
                  pathname.startsWith("/recharge")
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setRechargeOpen((prev) => !prev)}
              >
                <FaMobileAlt size={20} />
                <span className="font-medium">Recharge</span>
                {rechargeOpen ? (
                  <MdKeyboardArrowDown size={22} />
                ) : (
                  <MdKeyboardArrowRight size={22} />
                )}
              </div>
              {rechargeOpen && (
                <ul className="ml-8 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/recharge/mobile"
                      className={`block px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-semibold ${
                        pathname === "/recharge/mobile"
                          ? "bg-yellow-300/80 text-blue-900 shadow"
                          : "hover:bg-yellow-100/80 hover:text-blue-700 text-white/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      Mobile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recharge/dth"
                      className={`block px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-semibold ${
                        pathname === "/recharge/dth"
                          ? "bg-yellow-300/80 text-blue-900 shadow"
                          : "hover:bg-yellow-100/80 hover:text-blue-700 text-white/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      DTH
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li
              className={`transition-all duration-200 flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer ${
                pathname === "/sell-earn"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              <Link href="/sell-earn" className="flex items-center gap-3 w-full">
                <FaUsers size={20} /> <span className="font-medium">Sell & Earn</span>
              </Link>
            </li>

            <li
              className={`transition-all duration-200 flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer ${
                pathname === "/aadhaar" || pathname === "/Aadhaar"
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              <Link href="/aadhaar" className="flex items-center gap-3 w-full">
                <FaUsers size={20} /> <span className="font-medium">Aadhaar Services</span>
              </Link>
            </li>

            <li className="flex flex-col select-none">
              <div
                className={`transition-all duration-200 flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer ${
                  pathname.startsWith("/utility")
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setUtilityOpen((prev) => !prev)}
              >
                <FaTh size={20} />
                <span className="font-medium">Utility Services</span>
                {utilityOpen ? (
                  <MdKeyboardArrowDown size={22} />
                ) : (
                  <MdKeyboardArrowRight size={22} />
                )}
              </div>
              {utilityOpen && (
                <ul className="ml-8 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/utility/cash-collection"
                      className={`block px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-semibold ${
                        pathname === "/utility/cash-collection"
                          ? "bg-yellow-300/80 text-blue-900 shadow"
                          : "hover:bg-yellow-100/80 hover:text-blue-700 text-white/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      Cash Collection
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/utility/lic-premium"
                      className={`block px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-semibold ${
                        pathname === "/utility/lic-premium"
                          ? "bg-yellow-300/80 text-blue-900 shadow"
                          : "hover:bg-yellow-100/80 hover:text-blue-700 text-white/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      LIC Premium
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/utility/credit-card"
                      className={`block px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-semibold ${
                        pathname === "/utility/credit-card"
                          ? "bg-yellow-300/80 text-blue-900 shadow"
                          : "hover:bg-yellow-100/80 hover:text-blue-700 text-white/80"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      Credit Card
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-white bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform font-semibold">
            <FaPlus size={18} /> <span>Add Service</span>
          </div>
          <button
            className="flex items-center justify-center gap-3 text-white bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform font-semibold mt-2 border-none"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
