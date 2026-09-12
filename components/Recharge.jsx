"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaMobileAlt,
  FaReceipt,
  FaUser,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
  FaHistory,
  FaChevronRight,
  FaChevronDown,
  FaBolt,
  FaGift,
  FaTimes,
  FaCheck,
  FaPhoneAlt,
  FaRegCalendarAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { MdSwapVert } from "react-icons/md";

export default function Recharge() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("Jio");
  const [selectedCircle, setSelectedCircle] = useState("Delhi & NCR");
  const [planType, setPlanType] = useState("prepaid");
  const [activeTabOperator, setActiveTabOperator] = useState("Jio");
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlanForRecharge, setSelectedPlanForRecharge] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  const operators = [
    { id: "Jio", name: "Reliance Jio", logo: "Jio", color: "bg-[#0a2885] text-white" },
    { id: "Airtel", name: "Bharti Airtel", logo: "airtel", color: "bg-[#ed1c24] text-white" },
    { id: "Vi", name: "Vodafone Idea", logo: "Vi", color: "bg-[#d32f2f] text-white" },
    { id: "BSNL", name: "BSNL Prepaid", logo: "BSNL", color: "bg-[#0288d1] text-white" },
  ];

  const circles = [
    "Delhi & NCR",
    "Mumbai",
    "Maharashtra & Goa",
    "Gujarat",
    "UP East",
    "UP West",
    "Bihar & Jharkhand",
    "Rajasthan",
    "Punjab",
    "Karnataka",
    "West Bengal",
    "Tamil Nadu",
  ];

  // Operator-specific plans matching the screenshot
  const plansByOperator = {
    Jio: [
      {
        id: "jio-199",
        amount: 199,
        badge: "Popular",
        validity: "28 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "jio-299",
        amount: 299,
        badge: null,
        validity: "28 Days Validity",
        data: "3 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "jio-349",
        amount: 349,
        badge: null,
        validity: "28 Days Validity",
        data: "2.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "jio-399",
        amount: 399,
        badge: "Best Value",
        validity: "56 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
    ],
    Airtel: [
      {
        id: "airtel-199",
        amount: 199,
        badge: "Popular",
        validity: "28 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "airtel-299",
        amount: 299,
        badge: null,
        validity: "28 Days Validity",
        data: "1.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "airtel-359",
        amount: 359,
        badge: null,
        validity: "28 Days Validity",
        data: "2.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "airtel-479",
        amount: 479,
        badge: "Best Value",
        validity: "56 Days Validity",
        data: "1.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
    ],
    Vi: [
      {
        id: "vi-199",
        amount: 199,
        badge: "Popular",
        validity: "28 Days Validity",
        data: "1.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "vi-299",
        amount: 299,
        badge: null,
        validity: "28 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "vi-349",
        amount: 349,
        badge: null,
        validity: "28 Days Validity",
        data: "2.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "vi-479",
        amount: 479,
        badge: "Best Value",
        validity: "56 Days Validity",
        data: "1.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
    ],
    BSNL: [
      {
        id: "bsnl-149",
        amount: 149,
        badge: "Popular",
        validity: "28 Days Validity",
        data: "1 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "bsnl-199",
        amount: 199,
        badge: null,
        validity: "30 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "bsnl-299",
        amount: 299,
        badge: null,
        validity: "30 Days Validity",
        data: "3 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "bsnl-397",
        amount: 397,
        badge: "Best Value",
        validity: "150 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
    ],
  };

  const recentTransactions = [
    {
      operator: "Jio",
      logoBg: "bg-[#0a2885]",
      number: "9876543210",
      date: "12 Jan 2025, 10:32 AM",
      amount: 199,
      status: "Success",
    },
    {
      operator: "Airtel",
      logoBg: "bg-[#ed1c24]",
      number: "9123456789",
      date: "10 Jan 2025, 04:12 PM",
      amount: 299,
      status: "Success",
    },
    {
      operator: "Vi",
      logoBg: "bg-[#d32f2f]",
      number: "9988776655",
      date: "08 Jan 2025, 09:45 AM",
      amount: 179,
      status: "Success",
    },
    {
      operator: "Jio",
      logoBg: "bg-[#0a2885]",
      number: "9871234560",
      date: "05 Jan 2025, 02:18 PM",
      amount: 349,
      status: "Failed",
    },
  ];

  const handleMobileNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(val);
    // Simple operator guessing by first digit
    if (val.startsWith("98") || val.startsWith("99")) {
      setSelectedOperator("Airtel");
    } else if (val.startsWith("97") || val.startsWith("96") || val.startsWith("70")) {
      setSelectedOperator("Jio");
    } else if (val.startsWith("95") || val.startsWith("94")) {
      setSelectedOperator("BSNL");
    } else if (val.startsWith("93") || val.startsWith("92")) {
      setSelectedOperator("Vi");
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlanForRecharge(plan);
    setShowConfirmModal(true);
  };

  const handleExecuteRecharge = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setRechargeSuccess(true);
      setTimeout(() => {
        setRechargeSuccess(false);
        setShowConfirmModal(false);
        setSelectedPlanForRecharge(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-7 md:ml-64 transition-all duration-300 min-h-screen bg-[#f4f8fc]">
      {/* 1. BREADCRUMB & HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          {/* Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight">
            Mobile Recharge
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Recharge your mobile number instantly with DSC PAY.
          </p>
        </div>

        {/* Top Right: Cashback Promo Banner */}
        <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/70 rounded-2xl px-4 py-3 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center text-lg shadow-xs shrink-0 border border-blue-100">
            <FaGift />
          </div>
          <div>
            <div className="text-sm font-black text-[#0a1e4d] leading-tight">
              Get ₹10 Cashback
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">
              On your next 3 Mobile Recharges
            </div>
          </div>
          <button
            onClick={() => setShowPlansModal(true)}
            className="ml-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/80 border border-blue-200 px-3 py-1.5 rounded-full transition shadow-2xs shrink-0 flex items-center gap-1"
          >
            <span>Know More</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: FORM & POPULAR PLANS ================= */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6 min-w-0">
          {/* CARD 1: MOBILE RECHARGE FORM */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs">
            {/* Form Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
                  <FaMobileAlt />
                </div>
                <h2 className="text-base font-extrabold text-[#0a1e4d] tracking-tight">
                  Mobile Recharge
                </h2>
              </div>
              <button
                onClick={() => setShowPlansModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                <span>View Plans</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Field 1: Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    placeholder="Enter 10 digit mobile number"
                    className="w-full pl-4 pr-11 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <FaUser size={14} />
                  </div>
                </div>
              </div>

              {/* Field 2 & 3: Operator & Circle Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select Operator */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Operator
                  </label>
                  <div className="relative">
                    <select
                      value={selectedOperator}
                      onChange={(e) => {
                        setSelectedOperator(e.target.value);
                        setActiveTabOperator(e.target.value);
                      }}
                      className="w-full appearance-none pl-10 pr-9 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition cursor-pointer"
                    >
                      {operators.map((op) => (
                        <option key={op.id} value={op.id}>
                          {op.name}
                        </option>
                      ))}
                    </select>

                    {/* Operator Icon Prefix */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="w-5 h-5 rounded-full bg-[#0a2885] text-white text-[9px] font-black flex items-center justify-center">
                        {selectedOperator.slice(0, 3)}
                      </span>
                    </div>

                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <FaChevronDown size={11} />
                    </div>
                  </div>
                </div>

                {/* Select Circle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Circle
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCircle}
                      onChange={(e) => setSelectedCircle(e.target.value)}
                      className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition cursor-pointer"
                    >
                      {circles.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <FaChevronDown size={11} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Prepaid / Postpaid Toggle */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setPlanType("prepaid")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${planType === "prepaid"
                      ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-2xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <FaMobileAlt size={14} className={planType === "prepaid" ? "text-blue-600" : "text-slate-400"} />
                  <span>Prepaid</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType("postpaid")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${planType === "postpaid"
                      ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-2xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <FaReceipt size={14} className={planType === "postpaid" ? "text-blue-600" : "text-slate-400"} />
                  <span>Postpaid</span>
                </button>
              </div>

              {/* Full Width View Plans CTA Button */}
              <button
                type="button"
                onClick={() => setShowPlansModal(true)}
                className="w-full py-3 bg-[#1d68f6] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-xs transition duration-150 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>View Plans</span>
              </button>
            </div>
          </div>

          {/* CARD 2: POPULAR RECHARGE PLANS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaBolt className="text-blue-600 text-sm" />
                <h2 className="text-base font-extrabold text-[#0a1e4d] tracking-tight">
                  Popular Recharge Plans
                </h2>
              </div>
              <button
                onClick={() => setShowPlansModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                <span>View All Plans</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Operator Filter Tabs */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
              {operators.map((op) => (
                <button
                  key={op.id}
                  onClick={() => setActiveTabOperator(op.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${activeTabOperator === op.id
                      ? "bg-[#1d68f6] text-white shadow-2xs"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                    }`}
                >
                  {op.id}
                </button>
              ))}
            </div>

            {/* 4 Plan Cards in a Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {(plansByOperator[activeTabOperator] || plansByOperator.Jio).map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group min-w-0"
                >
                  <div>
                    {/* Amount & Optional Badge */}
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span className="text-xl sm:text-2xl font-black text-[#0a1e4d] leading-none">
                        ₹{plan.amount}
                      </span>
                      {plan.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ede9fe] text-[#7c3aed] shrink-0">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Features List with SVG Icons */}
                    <div className="space-y-2.5 text-xs text-slate-700 font-semibold mb-4">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FaRegCalendarAlt className="text-blue-500 text-[11px] shrink-0" />
                        <span className="truncate whitespace-nowrap">{plan.validity}</span>
                      </div>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <MdSwapVert className="text-blue-500 text-sm shrink-0" />
                        <span className="truncate whitespace-nowrap">{plan.data}</span>
                      </div>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FaPhoneAlt className="text-blue-500 text-[10px] shrink-0" />
                        <span className="truncate whitespace-nowrap">{plan.calls}</span>
                      </div>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FaRegCommentDots className="text-blue-500 text-[11px] shrink-0" />
                        <span className="truncate whitespace-nowrap">{plan.sms}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recharge Action Button */}
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full py-2 bg-[#1d68f6] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition shadow-xs"
                  >
                    Recharge
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: STAY CONNECTED & RECENT ================= */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 min-w-0">
          {/* CARD 1: STAY CONNECTED ALWAYS PROMO CARD */}
          <div className="bg-gradient-to-br from-[#eef6fe] via-[#e5f1fc] to-[#dbeef9] border border-blue-100/90 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xs">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0 z-10">
                <h3 className="text-lg font-black text-[#0a1e4d] leading-tight mb-1">
                  Stay Connected Always
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mb-3 leading-tight">
                  Recharge in seconds & never miss a moment.
                </p>

                {/* Checklist */}
                <div className="space-y-1.5 text-xs font-bold text-[#0a1e4d]">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600 text-xs shrink-0" />
                    <span className="truncate">Instant Recharge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600 text-xs shrink-0" />
                    <span className="truncate">Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600 text-xs shrink-0" />
                    <span className="truncate">Best Commission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600 text-xs shrink-0" />
                    <span className="truncate">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Graphic: Smartphone displaying operator logos */}
              <div className="relative flex items-center justify-center shrink-0">
                {/* Smartphone Mockup */}
                <div className="w-28 h-44 bg-slate-900 rounded-[24px] p-1.5 shadow-xl border-4 border-slate-800 flex flex-col justify-between relative z-10">
                  {/* Speaker Notch */}
                  <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto my-0.5"></div>
                  {/* Screen */}
                  <div className="w-full flex-1 bg-white rounded-[18px] p-1.5 flex flex-col items-center justify-center gap-1.5">
                    {/* Jio */}
                    <div className="w-7 h-7 rounded-full bg-[#0a2885] text-white flex items-center justify-center font-black text-[10px] shadow-xs">
                      Jio
                    </div>
                    {/* Airtel */}
                    <div className="text-[#ed1c24] font-black text-[11px] tracking-tighter">
                      airtel
                    </div>
                    {/* Vi */}
                    <div className="text-[#d32f2f] font-black text-xs leading-none">
                      Vi
                    </div>
                    {/* BSNL */}
                    <div className="text-[#0288d1] font-black text-[9px] leading-tight text-center">
                      BSNL
                    </div>
                  </div>
                  {/* Home Bar */}
                  <div className="w-10 h-0.5 bg-slate-700 rounded-full mx-auto my-0.5"></div>
                </div>

                {/* Potted Plant beside Phone */}
                <div className="absolute -bottom-1 -right-3 w-10 h-12 flex flex-col items-center justify-end z-20">
                  <div className="text-xl leading-none">🪴</div>
                </div>

                {/* Floating Blue Call Badge */}
                <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white z-20">
                  <FaPhoneAlt size={10} />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: 100% SECURE TRANSACTIONS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
              <FaCheckCircle />
            </div>
            <div>
              <div className="text-xs font-black text-[#0a1e4d]">
                100% Secure Transactions
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                Your payments are safe with bank-level security.
              </div>
            </div>
          </div>

          {/* CARD 3: NEED HELP WITH RECHARGE? */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                <FaHeadset />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d]">
                  Need Help with Recharge?
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                  Our support team is available 24/7
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/profile")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 border border-blue-200/80 px-3 py-1.5 rounded-full transition shadow-2xs shrink-0"
            >
              Contact Support &rarr;
            </button>
          </div>

          {/* CARD 4: RECENT RECHARGES */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FaHistory className="text-slate-400 text-xs" />
                <h3 className="text-xs font-extrabold text-[#0a1e4d]">
                  Recent Recharges
                </h3>
              </div>
              <Link
                href="/transactions"
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
              >
                View All &rarr;
              </Link>
            </div>

            {/* List */}
            <div className="space-y-3">
              {recentTransactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full ${tx.logoBg} text-white font-black text-[10px] flex items-center justify-center shadow-2xs shrink-0`}
                    >
                      {tx.operator}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#0a1e4d] leading-tight">
                        {tx.number}
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 leading-none mt-0.5">
                        {tx.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-slate-900">₹{tx.amount}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tx.status === "Success"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-rose-50 text-rose-600 border-rose-200"
                        }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= RECHARGE CONFIRMATION MODAL ================= */}
      {showConfirmModal && selectedPlanForRecharge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-slate-800 border border-slate-100 relative">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <FaTimes size={16} />
            </button>

            {rechargeSuccess ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <FaCheck size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">
                  Recharge Successful!
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  ₹{selectedPlanForRecharge.amount} plan activated for{" "}
                  {mobileNumber || "9876543210"}.
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  Txn ID: DSC{Date.now().toString().slice(-8)}
                </div>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <FaMobileAlt size={22} />
                </div>
                <h3 className="text-base font-black text-slate-900 text-center mb-1">
                  Confirm Mobile Recharge
                </h3>
                <p className="text-xs text-slate-500 text-center mb-4">
                  Please review the recharge details before proceeding.
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-xs border border-slate-100 mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mobile Number:</span>
                    <span className="font-bold text-slate-900">
                      {mobileNumber || "9876543210"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operator:</span>
                    <span className="font-bold text-slate-900">
                      {selectedOperator} ({selectedCircle})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Validity & Data:</span>
                    <span className="font-bold text-slate-900">
                      {selectedPlanForRecharge.validity}, {selectedPlanForRecharge.data}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-700">Total Payable:</span>
                    <span className="font-black text-base text-blue-600">
                      ₹{selectedPlanForRecharge.amount}
                    </span>
                  </div>
                </div>

                <button
                  disabled={isProcessing}
                  onClick={handleExecuteRecharge}
                  className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 mb-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Recharge...</span>
                    </>
                  ) : (
                    <span>Pay ₹{selectedPlanForRecharge.amount} from Wallet</span>
                  )}
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= ALL PLANS MODAL ================= */}
      {showPlansModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full text-slate-800 border border-slate-100 relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Select a Recharge Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Showing plans for {selectedOperator} ({selectedCircle})
                </p>
              </div>
              <button
                onClick={() => setShowPlansModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Operator Pills in Modal */}
            <div className="flex items-center gap-2 py-3 overflow-x-auto">
              {operators.map((op) => (
                <button
                  key={op.id}
                  onClick={() => setActiveTabOperator(op.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${activeTabOperator === op.id
                      ? "bg-[#1d68f6] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {op.name}
                </button>
              ))}
            </div>

            {/* Plans List Scrollable */}
            <div className="overflow-y-auto space-y-3 py-2 flex-1 scrollbar-thin">
              {(plansByOperator[activeTabOperator] || plansByOperator.Jio).map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-sm transition flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-black text-slate-900">
                        ₹{plan.amount}
                      </span>
                      {plan.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {plan.validity} &bull; {plan.data} &bull; {plan.calls} &bull; {plan.sms}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowPlansModal(false);
                      handlePlanSelect(plan);
                    }}
                    className="px-4 py-2 bg-[#1d68f6] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-2xs shrink-0"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
