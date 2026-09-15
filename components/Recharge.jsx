"use client";

import React, { useState, useEffect } from "react";
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
  FaChevronLeft,
  FaChevronDown,
  FaBolt,
  FaGift,
  FaTimes,
  FaCheck,
  FaPhoneAlt,
  FaRegCalendarAlt,
  FaRegCommentDots,
  FaUsers,
  FaTv,
} from "react-icons/fa";
import { MdSwapVert, MdSatelliteAlt } from "react-icons/md";
import CustomerNotFoundModal from "@/components/CustomerNotFoundModal";

export default function Recharge({ tabType = "mobile" }) {
  const router = useRouter();

  // Active Service Type: 'mobile' | 'dth'
  const [serviceType, setServiceType] = useState(tabType === "dth" ? "dth" : "mobile");

  // Sync with tabType prop changes
  useEffect(() => {
    if (tabType === "dth" || tabType === "mobile") {
      setServiceType(tabType);
    }
  }, [tabType]);

  // Mobile Recharge States
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("Jio");
  const [selectedCircle, setSelectedCircle] = useState("Delhi & NCR");
  const [planType, setPlanType] = useState("prepaid");
  const [activeTabOperator, setActiveTabOperator] = useState("Jio");

  // DTH Recharge States
  const [dthSubscriberId, setDthSubscriberId] = useState("");
  const [selectedDthOperator, setSelectedDthOperator] = useState("Tata Play");
  const [dthAmount, setDthAmount] = useState("");
  const [activeDthTabOperator, setActiveDthTabOperator] = useState("Tata Play");

  // Common Modal States
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlanForRecharge, setSelectedPlanForRecharge] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCustomerNotFoundModal, setShowCustomerNotFoundModal] = useState(false);

  // Mobile Operators
  const mobileOperators = [
    { id: "Jio", name: "Reliance Jio", logo: "Jio", color: "bg-[#0a2885] text-white", border: "border-[#0a2885]" },
    { id: "Airtel", name: "Bharti Airtel", logo: "airtel", color: "bg-[#ed1c24] text-white", border: "border-[#ed1c24]" },
    { id: "Vi", name: "Vodafone Idea", logo: "Vi", color: "bg-[#d32f2f] text-white", border: "border-[#d32f2f]" },
    { id: "BSNL", name: "BSNL Prepaid", logo: "BSNL", color: "bg-[#0288d1] text-white", border: "border-[#0288d1]" },
  ];

  // DTH Operators
  const dthOperators = [
    { id: "Tata Play", name: "Tata Play (Tata Sky)", logo: "TATA", color: "bg-purple-600 text-white" },
    { id: "Airtel DTH", name: "Airtel Digital TV", logo: "AIRTEL", color: "bg-red-600 text-white" },
    { id: "Dish TV", name: "Dish TV", logo: "DISH", color: "bg-orange-600 text-white" },
    { id: "Sun Direct", name: "Sun Direct", logo: "SUN", color: "bg-amber-600 text-white" },
    { id: "D2H", name: "D2H (Videocon)", logo: "D2H", color: "bg-blue-600 text-white" },
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

  // Mobile Plans
  const plansByOperator = {
    Jio: [
      {
        id: "jio-199",
        amount: 199,
        badge: "Popular",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
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
        badge: "Hero Pack",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "28 Days Validity",
        data: "2.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "jio-399",
        amount: 399,
        badge: "Best Value",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
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
        badgeColor: "bg-red-100 text-red-800 border-red-200",
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
        badge: "Hero Pack",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "28 Days Validity",
        data: "2.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "airtel-479",
        amount: 479,
        badge: "Best Value",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
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
        badgeColor: "bg-red-100 text-red-800 border-red-200",
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
        badge: "Hero Pack",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "28 Days Validity",
        data: "2.5 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "vi-479",
        amount: 479,
        badge: "Best Value",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
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
        badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
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
        id: "bsnl-249",
        amount: 249,
        badge: "Hero Pack",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "45 Days Validity",
        data: "2 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
      {
        id: "bsnl-399",
        amount: 399,
        badge: "Best Value",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        validity: "80 Days Validity",
        data: "1 GB / Day",
        calls: "Unlimited Calls",
        sms: "100 SMS / Day",
      },
    ],
  };

  // DTH Plans
  const dthPlansByOperator = {
    "Tata Play": [
      {
        id: "tp-299",
        amount: 299,
        badge: "Popular",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        validity: "1 Month (30 Days)",
        data: "220+ Channels",
        calls: "Hindi Super Value",
        sms: "HD Audio Quality",
      },
      {
        id: "tp-389",
        amount: 389,
        badge: "Bestseller",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "1 Month (30 Days)",
        data: "310+ Channels",
        calls: "Hindi Dhamaka HD",
        sms: "All Sports Included",
      },
      {
        id: "tp-849",
        amount: 849,
        badge: "",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        validity: "3 Months (90 Days)",
        data: "280+ Channels",
        calls: "Family Super Saver",
        sms: "Extra 15 Days Free",
      },
      {
        id: "tp-3299",
        amount: 3299,
        badge: "",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        validity: "12 Months (365 Days)",
        data: "All HD Channels",
        calls: "Annual Delight Pack",
        sms: "Free Box Maintenance",
      },
    ],
    "Airtel DTH": [
      {
        id: "ad-280",
        amount: 280,
        badge: "Popular",
        badgeColor: "bg-red-100 text-red-800 border-red-200",
        validity: "1 Month (30 Days)",
        data: "210+ Channels",
        calls: "Value Prime Pack",
        sms: "Clear Sound Quality",
      },
      {
        id: "ad-410",
        amount: 410,
        badge: "HD Special",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "1 Month (30 Days)",
        data: "290+ Channels",
        calls: "Mega HD Unlimited",
        sms: "Live Sports & Movies",
      },
      {
        id: "ad-799",
        amount: 799,
        badge: "3 Months Pack",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        validity: "3 Months (90 Days)",
        data: "250+ Channels",
        calls: "Super Saver Hindi",
        sms: "High Definition",
      },
      {
        id: "ad-2999",
        amount: 2999,
        badge: "Annual Saver",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        validity: "12 Months (365 Days)",
        data: "Full HD Package",
        calls: "Annual Mega Bonanza",
        sms: "100% Cash Saving",
      },
    ],
    "Dish TV": [
      {
        id: "dt-240",
        amount: 240,
        badge: "Popular",
        badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
        validity: "1 Month (30 Days)",
        data: "190+ Channels",
        calls: "Classic Hindi Pack",
        sms: "Standard Audio",
      },
      {
        id: "dt-360",
        amount: 360,
        badge: "Family Pack",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "1 Month (30 Days)",
        data: "260+ Channels",
        calls: "Family HD Combo",
        sms: "Kids & Infotainment",
      },
      {
        id: "dt-699",
        amount: 699,
        badge: "Quarterly",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        validity: "3 Months (90 Days)",
        data: "220+ Channels",
        calls: "Smart Super Saver",
        sms: "Regional Addon Free",
      },
      {
        id: "dt-2699",
        amount: 2699,
        badge: "Annual Saver",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        validity: "12 Months (365 Days)",
        data: "Complete HD Suite",
        calls: "Annual Dish Premier",
        sms: "24/7 Dish Care",
      },
    ],
    "Sun Direct": [
      {
        id: "sd-220",
        amount: 220,
        badge: "Popular",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        validity: "1 Month (30 Days)",
        data: "180+ Channels",
        calls: "South Value Pack",
        sms: "Tamil/Telugu/Malayalam",
      },
      {
        id: "sd-330",
        amount: 330,
        badge: "HD Cinema",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "1 Month (30 Days)",
        data: "240+ Channels",
        calls: "South Cinema HD",
        sms: "Non-stop Movies",
      },
      {
        id: "sd-630",
        amount: 630,
        badge: "3 Months",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        validity: "3 Months (90 Days)",
        data: "200+ Channels",
        calls: "Regional HD Trio",
        sms: "Dolby 5.1 Surround",
      },
      {
        id: "sd-2400",
        amount: 2400,
        badge: "Annual Gold",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        validity: "12 Months (365 Days)",
        data: "All South Channels",
        calls: "Annual Sun Supreme",
        sms: "Best Regional Value",
      },
    ],
    "D2H": [
      {
        id: "d2h-250",
        amount: 250,
        badge: "Popular",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        validity: "1 Month (30 Days)",
        data: "200+ Channels",
        calls: "Hindi Combo Pack",
        sms: "Digital Surround",
      },
      {
        id: "d2h-375",
        amount: 375,
        badge: "Gold HD",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        validity: "1 Month (30 Days)",
        data: "270+ Channels",
        calls: "Gold HD Unlimited",
        sms: "All HD Channels",
      },
      {
        id: "d2h-720",
        amount: 720,
        badge: "3 Months",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        validity: "3 Months (90 Days)",
        data: "230+ Channels",
        calls: "Value Triple Pack",
        sms: "HD Visual Quality",
      },
      {
        id: "d2h-2750",
        amount: 2750,
        badge: "Annual Saver",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        validity: "12 Months (365 Days)",
        data: "Full Entertainment",
        calls: "Annual D2H Diamond",
        sms: "Priority Support",
      },
    ],
  };

  const recentTransactions = [
    {
      operator: "Airtel",
      logoBg: "bg-[#ed1c24]",
      number: "+91 98765 43210",
      date: "12 Jan 2025, 02:30 PM",
      amount: 199,
      status: "Success",
    },
    {
      operator: "Tata Play",
      logoBg: "bg-purple-600",
      number: "ID: 1029384756",
      date: "11 Jan 2025, 04:15 PM",
      amount: 450,
      status: "Success",
    },
    {
      operator: "Jio",
      logoBg: "bg-[#0a2885]",
      number: "+91 88765 43211",
      date: "10 Jan 2025, 11:20 AM",
      amount: 349,
      status: "Success",
    },
    {
      operator: "Dish TV",
      logoBg: "bg-orange-600",
      number: "ID: 9988776655",
      date: "09 Jan 2025, 09:45 AM",
      amount: 360,
      status: "Success",
    },
  ];

  const handleMobileNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(val);
    if (val.startsWith("98") || val.startsWith("99") || val.startsWith("80")) {
      setSelectedOperator("Airtel");
      setActiveTabOperator("Airtel");
    } else if (val.startsWith("97") || val.startsWith("96") || val.startsWith("70") || val.startsWith("63")) {
      setSelectedOperator("Jio");
      setActiveTabOperator("Jio");
    } else if (val.startsWith("95") || val.startsWith("94")) {
      setSelectedOperator("BSNL");
      setActiveTabOperator("BSNL");
    } else if (val.startsWith("93") || val.startsWith("92") || val.startsWith("88")) {
      setSelectedOperator("Vi");
      setActiveTabOperator("Vi");
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlanForRecharge(plan);
    setShowConfirmModal(true);
  };

  const handleDthQuickRecharge = (e) => {
    e.preventDefault();
    if (!dthSubscriberId.trim()) {
      alert("Please enter a valid Subscriber ID / VC Number");
      return;
    }
    const amt = parseFloat(dthAmount);
    if (!amt || isNaN(amt) || amt <= 0) {
      alert("Please enter or select a valid recharge amount");
      return;
    }

    const plan = {
      id: `dth-custom-${amt}`,
      amount: amt,
      validity: "Standard Monthly / Custom",
      data: `${selectedDthOperator} Pack`,
      calls: "Digital TV Recharge",
      sms: "Direct Account Credit",
    };

    setSelectedPlanForRecharge(plan);
    setShowConfirmModal(true);
  };

  const handleExecuteRecharge = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmModal(false);
      setShowCustomerNotFoundModal(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 lg:p-7 text-slate-800 font-sans">
      {/* 1. BREADCRUMB & PAGE HEADER SECTION WITH 3 STAT CARDS */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              {serviceType === "dth" ? "DTH Recharge" : "Mobile Recharge"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              {serviceType === "dth"
                ? "Recharge Tata Play, Airtel DTH, Dish TV, Sun Direct & D2H instantly."
                : "Recharge your prepaid & postpaid numbers instantly with DSC PAY."}
            </p>
          </div>

          {/* 3 Header Feature Stat Cards */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Card 1: Instant Recharge */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs min-w-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                <FaBolt />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d] leading-none">
                  Instant Recharge
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1">
                  In Seconds
                </div>
              </div>
            </div>

            {/* Card 2: 100% Secure */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs min-w-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d] leading-none">
                  100% Secure
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1">
                  Bank Level Security
                </div>
              </div>
            </div>

            {/* Card 3: All Operators */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs min-w-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                <FaUsers />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d] leading-none">
                  All Operators
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1">
                  {serviceType === "dth" ? "Tata, Airtel, Dish, Sun, D2H" : "Jio, Airtel, Vi, BSNL"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: FORM & POPULAR PLANS ================= */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6 min-w-0">

          {/* CARD 1: RECHARGE FORM CARD WITH DUAL TAB SELECTOR (MOBILE & DTH) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">

            {/* SERVICE SWITCHER TABS (Mobile vs DTH) */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setServiceType("mobile")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${serviceType === "mobile"
                  ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <FaMobileAlt size={16} className={serviceType === "mobile" ? "text-blue-600" : "text-slate-400"} />
                <span>Mobile Recharge</span>
              </button>

              <button
                type="button"
                onClick={() => setServiceType("dth")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${serviceType === "dth"
                  ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <MdSatelliteAlt size={18} className={serviceType === "dth" ? "text-blue-600" : "text-slate-400"} />
                <span>DTH Recharge</span>
              </button>
            </div>

            {/* Header Description & Browse link */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0 shadow-2xs">
                  {serviceType === "mobile" ? <FaMobileAlt /> : <MdSatelliteAlt size={18} />}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#0a1e4d] tracking-tight leading-tight">
                    {serviceType === "mobile" ? "Instant Mobile Recharge" : "Instant DTH Recharge"}
                  </h2>
                  <span className="text-[11px] font-medium text-slate-400">
                    {serviceType === "mobile"
                      ? "Enter details to view personalized plans"
                      : "Enter Subscriber ID to view active packs"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPlansModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer"
              >
                <span>Browse All Plans</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* ================= FORM CONTENT: MOBILE RECHARGE ================= */}
            {serviceType === "mobile" && (
              <div className="space-y-4 animate-in fade-in duration-150">
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
                      className="w-full pl-4 pr-11 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs font-mono"
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
                        className="w-full appearance-none pl-11 pr-9 py-2.5 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition cursor-pointer shadow-2xs"
                      >
                        {mobileOperators.map((op) => (
                          <option key={op.id} value={op.id}>
                            {op.name}
                          </option>
                        ))}
                      </select>

                      {/* Operator Icon Prefix */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span
                          className={`w-6 h-6 rounded-full ${mobileOperators.find((o) => o.id === selectedOperator)?.color || "bg-blue-600"
                            } text-white text-[9px] font-black flex items-center justify-center shadow-2xs`}
                        >
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
                      Select Circle / State
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCircle}
                        onChange={(e) => setSelectedCircle(e.target.value)}
                        className="w-full appearance-none pl-4 pr-9 py-2.5 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition cursor-pointer shadow-2xs"
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
                    className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${planType === "prepaid"
                      ? "border-blue-600 bg-blue-50/70 text-blue-700 shadow-2xs font-extrabold ring-1 ring-blue-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <FaMobileAlt size={14} className={planType === "prepaid" ? "text-blue-600" : "text-slate-400"} />
                    <span>Prepaid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlanType("postpaid")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${planType === "postpaid"
                      ? "border-blue-600 bg-blue-50/70 text-blue-700 shadow-2xs font-extrabold ring-1 ring-blue-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <FaReceipt size={14} className={planType === "postpaid" ? "text-blue-600" : "text-slate-400"} />
                    <span>Postpaid</span>
                  </button>
                </div>

                {/* View Plans CTA Button */}
                <button
                  type="button"
                  onClick={() => setShowPlansModal(true)}
                  className="w-full py-3.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <span>View Plans & Offers</span>
                  <span>&rarr;</span>
                </button>
              </div>
            )}

            {/* ================= FORM CONTENT: DTH RECHARGE ================= */}
            {serviceType === "dth" && (
              <form onSubmit={handleDthQuickRecharge} className="space-y-4 animate-in fade-in duration-150">
                {/* Field 1: Subscriber ID / VC Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Subscriber ID / VC Number / Smart Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={dthSubscriberId}
                      onChange={(e) => setDthSubscriberId(e.target.value)}
                      placeholder="e.g. 1029384756 or 0192837465"
                      className="w-full pl-4 pr-11 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs font-mono"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <FaTv size={14} />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                    Find your 10-12 digit ID on your DTH setup box or press 'Home' on remote
                  </span>
                </div>

                {/* Field 2: Select DTH Operator */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select DTH Operator
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDthOperator}
                      onChange={(e) => {
                        setSelectedDthOperator(e.target.value);
                        setActiveDthTabOperator(e.target.value);
                      }}
                      className="w-full appearance-none pl-11 pr-9 py-2.5 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition cursor-pointer shadow-2xs"
                    >
                      {dthOperators.map((op) => (
                        <option key={op.id} value={op.id}>
                          {op.name}
                        </option>
                      ))}
                    </select>

                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span
                        className={`w-6 h-6 rounded-full ${dthOperators.find((o) => o.id === selectedDthOperator)?.color || "bg-blue-600"
                          } text-white text-[8px] font-black flex items-center justify-center shadow-2xs`}
                      >
                        {selectedDthOperator.slice(0, 3).toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <FaChevronDown size={11} />
                    </div>
                  </div>
                </div>

                {/* Field 3: Recharge Amount & Quick Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Recharge Amount (₹)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPlansModal(true)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Browse DTH Packs
                    </button>
                  </div>
                  <input
                    type="number"
                    value={dthAmount}
                    onChange={(e) => setDthAmount(e.target.value)}
                    placeholder="Enter amount (e.g. ₹450)"
                    className="w-full px-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs font-mono"
                  />

                  {/* Quick Amount Chips */}
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {[250, 450, 800, 1200, 2500, 3299].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDthAmount(amt.toString())}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${dthAmount === amt.toString()
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DTH Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <MdSatelliteAlt size={16} />
                  <span>Recharge DTH Now</span>
                </button>
              </form>
            )}
          </div>

          {/* CARD 2: POPULAR PLANS (DYNAMIC FOR MOBILE / DTH) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-sm shrink-0">
                  <FaBolt />
                </div>
                <h2 className="text-base font-extrabold text-[#0a1e4d] tracking-tight">
                  {serviceType === "dth" ? "Popular DTH Packs & Plans" : "Popular Mobile Recharge Plans"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPlansModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer"
              >
                <span>View All Packs</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Operator Filter Tabs */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
              {serviceType === "mobile" ? (
                mobileOperators.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setActiveTabOperator(op.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTabOperator === op.id
                      ? "bg-[#1d68f6] text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${op.color} shrink-0`}></span>
                    <span>{op.name}</span>
                  </button>
                ))
              ) : (
                dthOperators.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setActiveDthTabOperator(op.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeDthTabOperator === op.id
                      ? "bg-[#1d68f6] text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${op.color} shrink-0`}></span>
                    <span>{op.name}</span>
                  </button>
                ))
              )}
            </div>

            {/* 4 Plan Cards in a Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {(serviceType === "mobile"
                ? plansByOperator[activeTabOperator] || plansByOperator.Jio
                : dthPlansByOperator[activeDthTabOperator] || dthPlansByOperator["Tata Play"]
              ).map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all group min-w-0"
                >
                  <div>
                    {/* Amount & Optional Badge */}
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span className="text-2xl font-black text-[#0a1e4d] font-mono leading-none">
                        ₹{plan.amount}
                      </span>
                      {plan.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shadow-2xs shrink-0 ${plan.badgeColor || "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 text-xs text-slate-700 font-semibold mb-4 border-t border-slate-100 pt-3">
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
                    type="button"
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer"
                  >
                    Recharge
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 min-w-0">
          {/* CARD 1: HERO PROMO BANNER */}
          <div className="bg-gradient-to-br from-[#e0f2fe] via-[#e5f1fc] to-[#bfdbfe] border border-blue-200/90 rounded-3xl p-6 relative overflow-hidden shadow-2xs min-h-[210px]">
            <div className="absolute -right-6 -bottom-10 w-44 h-44 rounded-full bg-blue-300/30 blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0 z-10">
                <h3 className="text-lg font-black text-[#0a1e4d] leading-tight mb-1">
                  {serviceType === "dth" ? "Non-Stop Entertainment" : "Stay Connected Always"}
                </h3>
                <p className="text-[11px] text-blue-800 font-bold mb-3 leading-tight">
                  {serviceType === "dth"
                    ? "Instant DTH recharge for all major operators."
                    : "Recharge in seconds & never miss a moment."}
                </p>

                {/* Checklist */}
                <div className="space-y-1.5 text-xs font-bold text-slate-800">
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
                    <span className="truncate">Best Retailer Margin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600 text-xs shrink-0" />
                    <span className="truncate">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Graphic */}
              <div className="relative flex items-center justify-center shrink-0">
                {serviceType === "mobile" ? (
                  <div className="w-24 h-38 bg-[#071536] rounded-[20px] p-1.5 shadow-xl border border-slate-700/50 flex flex-col justify-between relative z-10 transform rotate-[-3deg]">
                    <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto my-0.5"></div>
                    <div className="w-full flex-1 bg-white rounded-[14px] p-1.5 flex flex-col items-center justify-center gap-1 shadow-inner">
                      <div className="w-5 h-5 rounded-full bg-[#0a2885] text-white flex items-center justify-center font-black text-[8px]">
                        Jio
                      </div>
                      <div className="text-[#ed1c24] font-black text-[9px] tracking-tighter">
                        airtel
                      </div>
                      <div className="text-[#d32f2f] font-black text-[10px] leading-none">
                        Vi
                      </div>
                      <div className="text-[#0288d1] font-black text-[7px] leading-tight text-center">
                        BSNL
                      </div>
                    </div>
                    <div className="w-6 h-0.5 bg-slate-700 rounded-full mx-auto my-0.5"></div>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-3xl bg-white border border-blue-200 flex flex-col items-center justify-center shadow-lg text-blue-600">
                    <MdSatelliteAlt size={38} />
                    <span className="text-[10px] font-black text-slate-800 mt-1">DTH 4K HD</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: 100% SECURE TRANSACTIONS */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0 border border-emerald-100">
              <FaShieldAlt />
            </div>
            <div>
              <div className="text-xs font-black text-[#0a1e4d]">
                100% Secure Transactions
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                Your payments are encrypted with 256-bit bank level security.
              </div>
            </div>
          </div>

          {/* CARD 3: NEED HELP WITH RECHARGE? */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0 border border-blue-100">
                <FaHeadset />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d]">
                  Need Help with Recharge?
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                  Our customer support team is available 24/7
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/profile")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full transition shadow-2xs shrink-0 cursor-pointer"
            >
              Support &rarr;
            </button>
          </div>

          {/* CARD 4: RECENT RECHARGES */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <FaHistory />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">
                  Recent Recharges
                </h3>
              </div>
              <Link
                href="/transactions"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                <span>View All</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* List */}
            <div className="space-y-3.5">
              {recentTransactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 text-xs p-1.5 hover:bg-slate-50 rounded-2xl transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full ${tx.logoBg} text-white font-black text-[9px] flex items-center justify-center shadow-2xs shrink-0`}
                    >
                      {tx.operator.slice(0, 4)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-[#0a1e4d] leading-tight truncate">
                        {tx.number}
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 leading-none mt-0.5">
                        {tx.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <span className="font-black text-slate-900 font-mono">₹{tx.amount}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${tx.status === "Success"
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
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FaTimes size={16} />
            </button>

            <div>
              <div className="text-center pb-4 border-b border-slate-100 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 shadow-2xs">
                  {serviceType === "mobile" ? <FaMobileAlt size={20} /> : <MdSatelliteAlt size={22} />}
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {serviceType === "dth" ? "Confirm DTH Recharge" : "Confirm Mobile Recharge"}
                </h3>
                <p className="text-xs text-slate-400">
                  {serviceType === "mobile"
                    ? `${selectedOperator} • ${selectedCircle}`
                    : `${selectedDthOperator}`}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2 mb-5">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {serviceType === "mobile" ? "Mobile Number:" : "Subscriber ID:"}
                  </span>
                  <span className="font-bold text-slate-800 font-mono">
                    {serviceType === "mobile"
                      ? mobileNumber || "9876543210"
                      : dthSubscriberId || "1029384756"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Operator:</span>
                  <span className="font-bold text-slate-800">
                    {serviceType === "mobile" ? selectedOperator : selectedDthOperator}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validity:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedPlanForRecharge.validity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Benefits:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedPlanForRecharge.data}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 text-sm">
                  <span>Total Amount:</span>
                  <span className="text-blue-600 font-mono font-black">
                    ₹{selectedPlanForRecharge.amount}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteRecharge}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>Pay ₹{selectedPlanForRecharge.amount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOMER NOT FOUND MODAL ================= */}
      <CustomerNotFoundModal
        isOpen={showCustomerNotFoundModal}
        onClose={() => {
          setShowCustomerNotFoundModal(false);
          setSelectedPlanForRecharge(null);
        }}
        title="Customer Not Found"
        description={
          serviceType === "dth"
            ? `The details you entered do not match with our records.\nPlease check the Subscriber ID / DTH Operator and try again.`
            : `The details you entered do not match with our records.\nPlease check the Mobile Number / Operator and try again.`
        }
      />

      {/* ================= ALL PLANS BROWSE MODAL ================= */}
      {showPlansModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full text-slate-800 border border-slate-100 relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                  <FaBolt />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {serviceType === "mobile"
                      ? `${selectedOperator} Recharge Plans (${selectedCircle})`
                      : `${selectedDthOperator} DTH Packs & Channels`}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Select a pack to recharge instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPlansModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {(serviceType === "mobile"
                ? plansByOperator[selectedOperator] || plansByOperator.Jio
                : dthPlansByOperator[selectedDthOperator] || dthPlansByOperator["Tata Play"]
              ).map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl hover:border-blue-500 hover:bg-white transition"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-black text-[#0a1e4d] font-mono">
                        ₹{plan.amount}
                      </span>
                      {plan.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                      <span>⏱ {plan.validity}</span>
                      <span>📶 {plan.data}</span>
                      <span>📞 {plan.calls}</span>
                      <span>💬 {plan.sms}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowPlansModal(false);
                      handlePlanSelect(plan);
                    }}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    Select Plan
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
