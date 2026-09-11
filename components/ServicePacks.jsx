"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaLock,
  FaChartLine,
  FaHandHoldingUsd,
  FaShieldAlt,
} from "react-icons/fa";
import { MdElectricBolt, MdPayment } from "react-icons/md";
import RandomNoticeBoard from "./RandomNoticeBoard";

const servicesList = [
  { img: "/assets/bank-transfer.png", title: "Money Transfer", route: "/withdrawal", category: "banking" },
  { img: "/assets/wallet.png", title: "Wallet", route: "/transactions", category: "banking" },
  { img: "/assets/Edistric.png", title: "E-Distric", route: "/aadhaar", category: "govt" },
  { img: "/assets/digitalgold.png", title: "Digital Gold", route: "/sell-earn", category: "financial" },
  { img: "/assets/credit-card.png", title: "Credit Card Payment", route: "/withdrawal", category: "banking" },
  { img: "/assets/ayushman.png", title: "Aayushman", route: "/aadhaar", category: "govt" },
  { img: "/assets/fingerprint.png", title: "AEPS", route: "/aadhaar", category: "banking" },
  { img: "/assets/bankcsp.png", title: "Bank CSP", route: "/withdrawal", category: "banking" },
  { img: "/assets/bus.png", title: "Bus", route: "/recharge/mobile", category: "travel" },
  { img: "/assets/train.png", title: "Train", route: "/recharge/mobile", category: "travel" },
  { img: "/assets/id-card.png", title: "ID Card", route: "/aadhaar", category: "govt" },
  { img: "/assets/bill.png", title: "Bill", route: "/recharge/mobile", category: "utility" },
  { img: "/assets/mobile.png", title: "Mobile Charge", route: "/recharge/mobile", category: "utility" },
  { img: "/assets/driving (1).png", title: "Aadhaar Pay", route: "/aadhaar", category: "banking" },
  { img: "/assets/bank.png", title: "Bank", route: "/withdrawal", category: "banking" },
  { img: "/assets/deposit.png", title: "Deposit Money", route: "/withdrawal", category: "banking" },
  { img: "/assets/pancard.png", title: "Pan Card", route: "/aadhaar", category: "govt" },
  { img: "/assets/cash.png", title: "Cash Collection", route: "/withdrawal", category: "banking" },
  { img: "/assets/life-insurance.png", title: "LIC Premium", route: "/recharge/mobile", category: "financial" },
  { img: "/assets/health-insurance.png", title: "Insurance", route: "/recharge/mobile", category: "financial" },
  { img: "/assets/ott.png", title: "OTT Subscription", route: "/ott", category: "entertainment" },
  { img: "/assets/commerce.png", title: "E-Gift Card", route: "/ott", category: "entertainment" },
  { img: "/assets/salary.png", title: "Sell & Earn", route: "/sell-earn", category: "financial" },
];

const ServicePacks = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showKycPopup, setShowKycPopup] = useState(false);
  const [activeTabTime, setActiveTabTime] = useState("today");

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
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserProfile();
  }, []);

  const filteredServices = servicesList.filter(
    (s) => selectedCategory === "all" || s.category === selectedCategory
  );

  const handleServiceClick = (service) => {
    if (user && user.kyc_status === false) {
      router.push("/kyc-form");
    } else {
      router.push(service.route);
    }
  };

  return (
    <div className="p-4 md:ml-64 md:p-7 text-slate-800 font-sans min-h-screen bg-slate-50">
      {/* Notice Board Banner Section */}
      <div className="mb-6">
        <RandomNoticeBoard />
      </div>

      {/* Services Section Header (Clean & Minimalist) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-5 bg-blue-600 rounded-full"></div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            All Services & Utilities
          </h2>
        </div>

        {/* Category Filter Pills (Flat & Sleek) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All Services" },
            { id: "banking", label: "Banking & AEPS" },
            { id: "utility", label: "Recharge & Bill" },
            { id: "entertainment", label: "OTT & Gift Cards" },
            { id: "financial", label: "Loans & Insurance" },
            { id: "govt", label: "Govt & KYC" },
            { id: "travel", label: "Train & Bus" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean 23 Services Grid with User's Exact Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5 mb-8">
        {filteredServices.map((s, idx) => (
          <div
            key={idx}
            onClick={() => handleServiceClick(s)}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer group min-h-[125px] shadow-2xs"
          >
            {/* User's Original Image with Clean Container */}
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 mb-2.5 group-hover:scale-105 group-hover:bg-blue-50/50 transition-all duration-200">
              <img
                src={s.img}
                alt={s.title}
                className="w-10 h-10 object-contain drop-shadow-2xs"
              />
            </div>

            {/* Service Title */}
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Dashboard Analytics & Summary Section */}
      <div className="mb-8">
        {/* Timeframe Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {[
            { id: "today", label: "Today" },
            { id: "yesterday", label: "Yesterday" },
            { id: "week", label: "Week" },
            { id: "month", label: "Month" },
            { id: "lastMonth", label: "Last Month" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTabTime(t.id)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabTime === t.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-slate-300 transition">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center p-2.5 shrink-0">
              <img src="/assets/cash.png" alt="Total Income" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Total Income</span>
              <span className="text-2xl font-black text-slate-900">₹0</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-slate-300 transition">
            <div className="w-14 h-14 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-center p-2.5 shrink-0">
              <img src="/assets/commerce.png" alt="Transaction Volume" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Transaction Volume</span>
              <span className="text-2xl font-black text-slate-900">₹0</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-slate-300 transition">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center p-2.5 shrink-0">
              <img src="/assets/bankcsp.png" alt="Count" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Count</span>
              <span className="text-2xl font-black text-slate-900">0</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4 hover:border-slate-300 transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-center p-2.5 shrink-0">
              <img src="/assets/boy.png" alt="Complaints" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Complaints</span>
              <span className="text-2xl font-black text-slate-900">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Alert Popup if needed */}
      {showKycPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <FaLock size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">KYC Verification Required</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Please complete your retailer biometric & Aadhaar verification to activate all banking and cashout services.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/kyc-form")}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Complete KYC
              </button>
              <button
                onClick={() => setShowKycPopup(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePacks;
