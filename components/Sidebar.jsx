"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaPaperPlane,
  FaMobileAlt,
  FaReceipt,
  FaUniversity,
  FaLandmark,
  FaShieldAlt,
  FaShoppingCart,
  FaGift,
  FaPlayCircle,
  FaChartBar,
  FaExchangeAlt,
  FaHeadset,
  FaPlus,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  const servicesMenu = [
    { title: "Money Transfer", href: "/withdrawal", icon: FaPaperPlane },
    { title: "Recharge", href: "/recharge/mobile", icon: FaMobileAlt },
    { title: "Bill Payment", href: "/utility", icon: FaReceipt },
    { title: "Banking", href: "/withdrawal", icon: FaUniversity },
    { title: "Government", href: "/aadhaar", icon: FaLandmark },
    { title: "Insurance", href: "/utility/lic-premium", icon: FaShieldAlt },
    { title: "Shopping", href: "/sell-earn", icon: FaShoppingCart },
    { title: "E-Gift Card", href: "/ott", icon: FaGift },
    { title: "OTT Subscription", href: "/ott", icon: FaPlayCircle },
  ];

  const toolsMenu = [
    { title: "Reports", href: "/transactions", icon: FaChartBar },
    { title: "Transactions", href: "/transactions", icon: FaExchangeAlt },
    { title: "Support", action: () => setShowSupportModal(true), icon: FaHeadset },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-[68px] h-[calc(100vh-68px)] w-64 bg-[#081a42] text-white z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out select-none shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {/* Main Dashboard Active Button */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              pathname === "/"
                ? "bg-[#1d68f6] text-white shadow-md shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaHome size={18} />
            <span>Dashboard</span>
          </Link>

          {/* SERVICES Section */}
          <div>
            <div className="text-[11px] font-bold text-slate-400/90 tracking-wider uppercase px-3 mb-1.5">
              SERVICES
            </div>
            <div className="space-y-0.5">
              {servicesMenu.map((item, idx) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href === "/recharge/mobile" && pathname.startsWith("/recharge"));
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#1d68f6] text-white shadow-md shadow-blue-600/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={isActive ? "text-white shrink-0" : "text-slate-400 group-hover:text-white shrink-0"}
                    />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* TOOLS Section */}
          <div>
            <div className="text-[11px] font-bold text-slate-400/90 tracking-wider uppercase px-3 mb-1.5">
              TOOLS
            </div>
            <div className="space-y-0.5">
              {toolsMenu.map((item, idx) => {
                const Icon = item.icon;
                if (item.action) {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (onClose) onClose();
                        item.action();
                      }}
                      className="w-full flex items-center gap-3.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all text-left"
                    >
                      <Icon size={15} className="text-slate-400 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  );
                }
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white/15 text-white font-semibold"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={15} className="text-slate-400 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* + Add Service Button */}
          <button
            onClick={() => setShowAddServiceModal(true)}
            className="w-full py-2.5 px-4 bg-[#1d68f6] hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <FaPlus size={12} />
            <span>Add Service</span>
          </button>

          {/* Need Help? Support Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center mt-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2 border border-blue-500/30">
              <FaHeadset size={16} />
            </div>
            <div className="font-bold text-white text-xs">Need Help?</div>
            <div className="text-[11px] text-slate-300 mt-0.5 leading-tight">
              Our Support Team is here
            </div>
            <button
              onClick={() => setShowSupportModal(true)}
              className="mt-2.5 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#1d68f6] hover:bg-blue-600 text-white text-[11px] font-semibold rounded-lg transition-all"
            >
              <span>Contact Us</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Support Details Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-slate-800 border border-slate-100 relative">
            <button
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <FaTimes size={16} />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FaHeadset size={22} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 text-center mb-1">
              Customer Support
            </h3>
            <p className="text-xs text-slate-500 text-center mb-4">
              Get immediate assistance for service activations or technical issues.
            </p>

            <div className="space-y-2.5 text-xs mb-5">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <FaPhoneAlt className="text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-700">Helpline</div>
                  <div className="text-slate-900 font-mono">+91-9285356192</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <FaEnvelope className="text-blue-600 shrink-0" />
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-700">Email</div>
                  <div className="text-slate-900 truncate">teamdigitalservicecenter@gmail.com</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-slate-800 border border-slate-100 relative">
            <button
              onClick={() => setShowAddServiceModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <FaTimes size={16} />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FaPlus size={20} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 text-center mb-1">
              Add New Service
            </h3>
            <p className="text-xs text-slate-500 text-center mb-4">
              Request activation of new banking, utility, or government service packs for your retailer account.
            </p>
            <button
              onClick={() => {
                setShowAddServiceModal(false);
                router.push("/kyc-form");
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs mb-2"
            >
              Upgrade & Activate Packs
            </button>
            <button
              onClick={() => setShowAddServiceModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
