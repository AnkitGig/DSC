"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBolt,
  FaMobileAlt,
  FaPhoneAlt,
  FaWifi,
  FaWater,
  FaFire,
  FaShieldAlt,
  FaCreditCard,
  FaCar,
  FaLandmark,
  FaThLarge,
  FaCheck,
  FaCheckCircle,
  FaHeadset,
  FaUsers,
  FaTimes,
  FaInfoCircle,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { MdOutlineReceiptLong, MdSatelliteAlt } from "react-icons/md";

// 12 Category Tiles configuration
const billCategories = [
  { id: "electricity", name: "Electricity", icon: FaBolt, iconColor: "text-blue-500", bgActive: "bg-blue-50/70 border-blue-500 text-blue-600 ring-2 ring-blue-500/15" },
  { id: "mobile", name: "Mobile Postpaid", icon: FaMobileAlt, iconColor: "text-blue-600", bgActive: "bg-blue-50/70 border-blue-500 text-blue-600 ring-2 ring-blue-500/15" },
  { id: "dth", name: "DTH", icon: MdSatelliteAlt, iconColor: "text-purple-600", bgActive: "bg-purple-50/70 border-purple-500 text-purple-600 ring-2 ring-purple-500/15" },
  { id: "landline", name: "Landline", icon: FaPhoneAlt, iconColor: "text-rose-500", bgActive: "bg-rose-50/70 border-rose-500 text-rose-600 ring-2 ring-rose-500/15" },
  { id: "broadband", name: "Broadband", icon: FaWifi, iconColor: "text-indigo-600", bgActive: "bg-indigo-50/70 border-indigo-500 text-indigo-600 ring-2 ring-indigo-500/15" },
  { id: "water", name: "Water", icon: FaWater, iconColor: "text-cyan-500", bgActive: "bg-cyan-50/70 border-cyan-500 text-cyan-600 ring-2 ring-cyan-500/15" },
  { id: "gas", name: "Gas", icon: FaFire, iconColor: "text-orange-500", bgActive: "bg-orange-50/70 border-orange-500 text-orange-600 ring-2 ring-orange-500/15" },
  { id: "insurance", name: "Insurance", icon: FaShieldAlt, iconColor: "text-emerald-500", bgActive: "bg-emerald-50/70 border-emerald-500 text-emerald-600 ring-2 ring-emerald-500/15" },
  { id: "creditcard", name: "Credit Card", icon: FaCreditCard, iconColor: "text-blue-600", bgActive: "bg-blue-50/70 border-blue-500 text-blue-600 ring-2 ring-blue-500/15" },
  { id: "fastag", name: "FASTag", icon: FaCar, iconColor: "text-teal-500", bgActive: "bg-teal-50/70 border-teal-500 text-teal-600 ring-2 ring-teal-500/15" },
  { id: "municipal", name: "Municipal Tax", icon: FaLandmark, iconColor: "text-amber-600", bgActive: "bg-amber-50/70 border-amber-500 text-amber-600 ring-2 ring-amber-500/15" },
  { id: "other", name: "Other", icon: FaThLarge, iconColor: "text-slate-500", bgActive: "bg-slate-50/70 border-slate-500 text-slate-600 ring-2 ring-slate-500/15" },
];

const categoryBoards = {
  electricity: [
    "UPPCL (Uttar Pradesh Power Corporation Ltd.)",
    "Tata Power - DDL (Delhi)",
    "BSES Rajdhani Power Limited",
    "BSES Yamuna Power Limited",
    "Adani Electricity Mumbai Limited",
    "Maharashtra State Electricity (MSEDCL)",
    "BESCOM (Bengaluru Electricity Supply)",
    "Torrent Power",
    "DHBVN (Haryana)",
    "PSPCL (Punjab)",
  ],
  mobile: [
    "Airtel Postpaid",
    "Jio Postpaid Plus",
    "Vodafone Idea (Vi) Postpaid",
    "BSNL Postpaid",
  ],
  dth: [
    "Tata Play (formerly Tata Sky)",
    "Airtel Digital TV",
    "Dish TV",
    "Sun Direct",
    "D2H (Videocon)",
  ],
  landline: [
    "BSNL Landline - Individual",
    "Airtel Landline",
    "MTNL Delhi",
    "MTNL Mumbai",
  ],
  broadband: [
    "JioFiber Broadband",
    "Airtel Xstream Fiber",
    "ACT Fibernet",
    "Hathway Broadband",
    "Excitel Broadband",
  ],
  water: [
    "Delhi Jal Board (DJB)",
    "Bangalore Water Supply (BWSSB)",
    "Municipal Corporation of Greater Mumbai",
    "Hyderabad Metro Water (HMWSSB)",
  ],
  gas: [
    "Indraprastha Gas Limited (IGL)",
    "Mahanagar Gas Limited (MGL)",
    "Adani Gas",
    "HP Gas (LPG Cylinder)",
    "Bharat Gas (LPG Cylinder)",
    "Indane Gas (LPG Cylinder)",
  ],
  insurance: [
    "Life Insurance Corporation of India (LIC)",
    "HDFC Life Insurance",
    "ICICI Prudential Life Insurance",
    "SBI Life Insurance",
  ],
  creditcard: [
    "HDFC Bank Credit Card",
    "SBI Card",
    "ICICI Bank Credit Card",
    "Axis Bank Credit Card",
  ],
  fastag: [
    "NHAI FASTag",
    "ICICI Bank FASTag",
    "SBI FASTag",
    "Paytm Payments Bank FASTag",
    "HDFC Bank FASTag",
  ],
  municipal: [
    "Municipal Corporation of Delhi (MCD)",
    "Greater Chennai Corporation",
    "Bruhat Bengaluru Mahanagara Palike (BBMP)",
  ],
  other: [
    "Education Fees",
    "Housing Society Maintenance",
    "Cable TV Subscription",
  ],
};

const initialDueBills = [
  {
    id: "db1",
    type: "electricity",
    title: "Electricity Bill",
    account: "Consumer No: 1234567890",
    consumerNumber: "1234567890",
    provider: "UPPCL",
    dueText: "Due in 3 days",
    dueDate: "15 Sep 2026",
    amount: 1250,
    logoType: "electricity",
  },
  {
    id: "db2",
    type: "mobile",
    title: "Airtel Postpaid",
    account: "Mobile No: 9876543210",
    consumerNumber: "9876543210",
    provider: "Airtel Postpaid",
    dueText: "Due in 5 days",
    dueDate: "17 Sep 2026",
    amount: 799,
    logoType: "airtel",
  },
  {
    id: "db3",
    type: "dth",
    title: "Tata Play DTH",
    account: "Subscriber ID: 1234567890",
    consumerNumber: "1234567890",
    provider: "Tata Play",
    dueText: "Due in 2 days",
    dueDate: "14 Sep 2026",
    amount: 450,
    logoType: "tataplay",
  },
  {
    id: "db4",
    type: "broadband",
    title: "Jio Fiber",
    account: "Account No: JIO123456",
    consumerNumber: "JIO123456",
    provider: "JioFiber",
    dueText: "Due in 4 days",
    dueDate: "16 Sep 2026",
    amount: 999,
    logoType: "jio",
  },
];

const mockBillHistory = [
  {
    id: "h1",
    title: "Electricity Bill (UPPCL)",
    account: "Consumer No: 1234567890",
    date: "12 Aug 2026, 04:20 PM",
    amount: 1180,
    status: "Paid",
    logoType: "electricity",
  },
  {
    id: "h2",
    title: "Airtel Postpaid",
    account: "Mobile No: 9876543210",
    date: "10 Aug 2026, 11:15 AM",
    amount: 799,
    status: "Paid",
    logoType: "airtel",
  },
  {
    id: "h3",
    title: "Tata Play DTH",
    account: "Subscriber ID: 1234567890",
    date: "05 Aug 2026, 02:40 PM",
    amount: 450,
    status: "Paid",
    logoType: "tataplay",
  },
];

export default function BillPayment() {
  const [selectedCategory, setSelectedCategory] = useState("electricity");
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [selectedBoard, setSelectedBoard] = useState(categoryBoards.electricity[0]);
  const [consumerNumber, setConsumerNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [myBillsTab, setMyBillsTab] = useState("due"); // 'due' | 'history'

  // Interactive states
  const [isFetchingBill, setIsFetchingBill] = useState(false);
  const [fetchedBill, setFetchedBill] = useState(null);
  const [showSampleBillModal, setShowSampleBillModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activePayingBill, setActivePayingBill] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [dueBills, setDueBills] = useState(initialDueBills);
  const [billHistory, setBillHistory] = useState(mockBillHistory);
  const [showAllBillsModal, setShowAllBillsModal] = useState(false);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const boards = categoryBoards[catId] || [];
    setSelectedBoard(boards[0] || "");
    setConsumerNumber("");
    setNickname("");
    setFetchedBill(null);
  };

  const handleFetchBill = (e) => {
    e.preventDefault();
    if (!consumerNumber.trim()) {
      alert("Please enter a valid Consumer Number / Account ID");
      return;
    }

    setIsFetchingBill(true);
    setTimeout(() => {
      setIsFetchingBill(false);
      const generatedAmount = Math.floor(650 + Math.random() * 2400);
      const billData = {
        consumerName: "Rajesh Kumar Sharma",
        consumerNumber: consumerNumber,
        provider: selectedBoard,
        category: selectedCategory,
        billNumber: `BILL-${Math.floor(100000 + Math.random() * 900000)}`,
        billDate: "05 Sep 2026",
        dueDate: "20 Sep 2026",
        amount: generatedAmount,
      };
      setFetchedBill(billData);
    }, 900);
  };

  const handleInitiatePayment = (bill) => {
    setActivePayingBill(bill);
    setShowPaymentModal(true);
  };

  const handleExecutePayment = () => {
    if (!activePayingBill) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const receipt = {
        txnId: `DSC-BP-${Math.floor(100000 + Math.random() * 900000)}`,
        bbpsRef: `BBPS${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        billerName: activePayingBill.provider || activePayingBill.title,
        consumerNumber: activePayingBill.consumerNumber || consumerNumber || "1234567890",
        consumerName: activePayingBill.consumerName || "Rajesh Kumar",
        amount: activePayingBill.amount,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + ", " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Success",
      };

      setPaymentReceipt(receipt);

      if (activePayingBill.id) {
        setDueBills((prev) => prev.filter((b) => b.id !== activePayingBill.id));
      }

      const newHistoryItem = {
        id: "h_" + Date.now(),
        title: activePayingBill.title || `${activePayingBill.provider} Bill`,
        account: `Consumer No: ${receipt.consumerNumber}`,
        date: receipt.date,
        amount: activePayingBill.amount,
        status: "Paid",
        logoType: activePayingBill.logoType || "electricity",
      };
      setBillHistory([newHistoryItem, ...billHistory]);

      setShowPaymentModal(false);
      setFetchedBill(null);
    }, 1100);
  };

  const activeCategoryObj = billCategories.find((c) => c.id === selectedCategory) || billCategories[0];
  const CategoryIcon = activeCategoryObj.icon;

  // Render provider logo helper
  const renderLogo = (type) => {
    if (type === "electricity") {
      return (
        <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-sm shadow-2xs shrink-0 border border-amber-100">
          <FaBolt />
        </div>
      );
    }
    if (type === "airtel") {
      return (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm shadow-2xs shrink-0 border border-red-100 p-1">
          <div className="w-full h-full rounded-full bg-[#ed1c24] flex items-center justify-center text-white text-[9px] font-black tracking-tighter">
            airtel
          </div>
        </div>
      );
    }
    if (type === "tataplay") {
      return (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm shadow-2xs shrink-0 border border-purple-100 p-1">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#e91e63] to-[#9c27b0] flex flex-col items-center justify-center text-white text-[7px] font-black tracking-tighter leading-none">
            <span>TATA</span>
            <span>PLAY</span>
          </div>
        </div>
      );
    }
    if (type === "jio") {
      return (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm shadow-2xs shrink-0 border border-blue-100 p-1">
          <div className="w-full h-full rounded-full bg-[#0a2885] flex items-center justify-center text-white text-[10px] font-black">
            Jio
          </div>
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm shadow-2xs shrink-0">
        <FaBolt />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans">
      {/* 1. TOP HEADER & PROMO HERO BANNER */}
      <div className="mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        {/* Left: Breadcrumbs & Title */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5 select-none">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span className="text-slate-300">›</span>
            <span className="text-slate-600 font-medium">Bill Payment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
            Bill Payment
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
            Pay all your utility bills instantly with DSC PAY.
          </p>
        </div>

        {/* Right: Modern Top Promo Banner (Pay Bills on Time) */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#dbeafe]/90 via-[#e0f2fe] to-[#bfdbfe] border border-blue-200/80 px-6 py-4 shadow-2xs flex items-center justify-between gap-5 overflow-hidden max-w-xl">
          {/* Subtle Background Glow */}
          <div className="absolute -right-4 -bottom-6 w-36 h-36 rounded-full bg-blue-400/25 blur-xl pointer-events-none"></div>

          {/* Left 3D Document & Coin Graphic */}
          <div className="hidden sm:flex items-center justify-center relative w-14 h-14 shrink-0 select-none">
            <div className="w-11 h-13 bg-white rounded-xl shadow-md border border-blue-100 flex flex-col items-center justify-center p-1.5 transform rotate-[-4deg]">
              <div className="w-5 h-1 bg-blue-500 rounded-full mb-1"></div>
              <div className="w-4 h-1 bg-slate-200 rounded-full mb-0.5"></div>
              <div className="w-4 h-1 bg-slate-200 rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black text-[10px] flex items-center justify-center shadow-md border-2 border-white">
              ₹
            </div>
          </div>

          {/* Content & Bullets */}
          <div className="flex-1 min-w-0">
            <div className="text-base font-black text-[#0a1e4d] leading-none">
              Pay Bills on Time
            </div>
            <div className="text-xs font-bold text-blue-700 mt-1 mb-2.5">
              Safe. Secure. Hassle Free.
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-blue-950 border border-blue-200/80 shadow-2xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[7px] font-black">
                  <FaCheck />
                </div>
                <span>Multiple Billers</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-blue-950 border border-blue-200/80 shadow-2xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[7px] font-black">
                  <FaCheck />
                </div>
                <span>Instant Confirmation</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-blue-950 border border-blue-200/80 shadow-2xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[7px] font-black">
                  <FaCheck />
                </div>
                <span>24/7 Service</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID (7 Cols Left, 5 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6 min-w-0">
          {/* CARD 1: SELECT A BILL CATEGORY */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            <h2 className="text-sm font-black text-[#0a1e4d] mb-4">
              Select a Bill Category
            </h2>

            {/* 12 Category Tiles Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
              {billCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group text-center ${
                      isSelected
                        ? "border-blue-500 bg-white ring-2 ring-blue-500/20 shadow-xs scale-[1.03]"
                        : "border-slate-200/70 bg-[#fafcff] hover:bg-white hover:border-blue-300 hover:shadow-xs hover:-translate-y-0.5"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 ${
                        isSelected
                          ? "bg-blue-50 text-blue-600 shadow-2xs"
                          : `bg-white ${cat.iconColor} shadow-2xs border border-slate-100`
                      }`}
                    >
                      <Icon />
                    </div>
                    <span
                      className={`text-[11px] font-bold leading-tight ${
                        isSelected ? "text-blue-600 font-black" : "text-slate-700"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CARD 2: DYNAMIC BILL PAYMENT FORM */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
            {/* Form Header with Category Name & Bharat BillPay Logo */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
                  <CategoryIcon />
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-[#0a1e4d] tracking-tight">
                  {activeCategoryObj.name} Bill Payment
                </h2>
              </div>

              {/* Bharat BillPay (BBPS) Emblem */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center text-white text-[9px] font-black">
                  B
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-slate-800 tracking-tighter leading-none">
                    BHARAT
                  </span>
                  <span className="text-[8px] font-black text-blue-600 tracking-tighter leading-none">
                    BILLPAY
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleFetchBill} className="space-y-4">
              {/* Select State & Select Board Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Select State */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer shadow-2xs"
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Bihar">Bihar</option>
                  </select>
                </div>

                {/* Field: Select Board */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Board
                  </label>
                  <select
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer shadow-2xs truncate"
                  >
                    {(categoryBoards[selectedCategory] || []).map((board) => (
                      <option key={board} value={board}>
                        {board}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field: Consumer Number / Account Number */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Consumer Number
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSampleBillModal(true)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
                  >
                    View Sample Bill
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={consumerNumber}
                    onChange={(e) => setConsumerNumber(e.target.value)}
                    placeholder="Enter consumer number"
                    className="w-full px-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold font-mono text-slate-800 placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mt-1.5">
                  <FaInfoCircle size={11} className="text-slate-400 shrink-0" />
                  <span>
                    Find your consumer number on your {activeCategoryObj.name.toLowerCase()} bill
                  </span>
                </div>
              </div>

              {/* Field: Nickname (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nickname <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Home, Office, etc."
                  className="w-full px-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                />
              </div>

              {/* Submit Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isFetchingBill}
                  className="w-full py-3.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl text-sm font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isFetchingBill ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>Fetch Bill Details</span>
                  )}
                </button>
              </div>
            </form>

            {/* Bill Details Fetched Result Card */}
            {fetchedBill && (
              <div className="mt-5 p-4 sm:p-5 bg-blue-50/70 border border-blue-200 rounded-2xl animate-in fade-in space-y-3 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/60">
                  <div className="text-xs font-bold text-blue-900">
                    Bill Found for <span className="font-extrabold">{fetchedBill.consumerName}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Unpaid
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Consumer ID:</span>
                    <span className="font-mono font-bold text-slate-800">{fetchedBill.consumerNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Due Date:</span>
                    <span className="font-bold text-slate-800">{fetchedBill.dueDate}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 block">Bill Amount:</span>
                    <span className="text-base font-black text-blue-700 font-mono">
                      ₹{fetchedBill.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleInitiatePayment(fetchedBill)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FaCheckCircle size={13} />
                  <span>Pay ₹{fetchedBill.amount.toLocaleString("en-IN")} Now</span>
                </button>
              </div>
            )}
          </div>

          {/* CARD 3: BOTTOM TRUST STRIP */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Item 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    100% Secure
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    Your data is safe with us
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                  <FaBolt />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    Instant Payment
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    Get instant confirmation
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                  <FaUsers />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    Wide Network
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    200+ billers supported
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                  <FaHeadset />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    24/7 Support
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    Always here for you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6 min-w-0">
          {/* 1. CARD: MY BILLS (DUE BILLS & HISTORY) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <MdOutlineReceiptLong size={16} />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">My Bills</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowAllBillsModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer"
              >
                <span>View All</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Underline Tabs: Due Bills | Bill History */}
            <div className="flex border-b border-slate-100 mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMyBillsTab("due")}
                className={`flex-1 py-3 text-center transition-all cursor-pointer border-b-2 ${
                  myBillsTab === "due"
                    ? "border-blue-600 text-blue-600 font-extrabold"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Due Bills
              </button>
              <button
                type="button"
                onClick={() => setMyBillsTab("history")}
                className={`flex-1 py-3 text-center transition-all cursor-pointer border-b-2 ${
                  myBillsTab === "history"
                    ? "border-blue-600 text-blue-600 font-extrabold"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Bill History
              </button>
            </div>

            {/* Due Bills List */}
            {myBillsTab === "due" ? (
              <div className="space-y-3.5">
                {dueBills.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    🎉 No pending bills due!
                  </div>
                ) : (
                  dueBills.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between gap-3 p-2 hover:bg-slate-50/80 rounded-2xl transition"
                    >
                      {/* Left: Icon & Details */}
                      <div className="flex items-center gap-3 min-w-0">
                        {renderLogo(b.logoType)}
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0a1e4d] truncate">
                            {b.title}
                          </div>
                          <div className="text-[10px] font-medium text-slate-400 truncate">
                            {b.account}
                          </div>
                          <div className="text-[10px] font-bold text-amber-500 mt-0.5">
                            {b.dueText}
                          </div>
                        </div>
                      </div>

                      {/* Right: Amount & Pay Now Button */}
                      <div className="flex items-center gap-3 shrink-0 text-right">
                        <div className="text-xs font-black text-[#0a1e4d] font-mono">
                          ₹{b.amount.toLocaleString("en-IN")}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleInitiatePayment(b)}
                          className="px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-bold transition shadow-2xs cursor-pointer whitespace-nowrap"
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* Bill History List */
              <div className="space-y-3.5">
                {billHistory.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between gap-3 p-2 hover:bg-slate-50/80 rounded-2xl transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {renderLogo(h.logoType)}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0a1e4d] truncate">
                          {h.title}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 truncate">
                          {h.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-right">
                      <div>
                        <div className="text-xs font-black text-[#0a1e4d] font-mono">
                          ₹{h.amount.toLocaleString("en-IN")}
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {h.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. CARD: PAY UTILITY BILLS & EARN REWARDS PROMO BANNER */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] to-[#bfdbfe] border border-blue-200/90 shadow-2xs overflow-hidden min-h-[190px] p-6 flex items-center justify-between">
            {/* Background Glow */}
            <div className="absolute -right-6 -bottom-10 w-44 h-44 rounded-full bg-blue-300/30 blur-2xl pointer-events-none"></div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[62%]">
              <h3 className="text-base sm:text-lg font-black text-[#0a1e4d] leading-tight">
                Pay Utility Bills & Earn Rewards
              </h3>
              <p className="text-xs font-medium text-slate-600 mt-1">
                Get exciting cashback on your bill payments.
              </p>
            </div>

            {/* Right 3D Mockup (Smartphone with receipt + Coin) */}
            <div className="relative w-32 h-40 shrink-0 flex items-center justify-center select-none pointer-events-none">
              {/* Glowing Golden Coin */}
              <div className="absolute -bottom-1 right-1 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 font-black text-sm flex items-center justify-center shadow-lg border-2 border-white z-20">
                ₹
              </div>

              {/* Smartphone */}
              <div className="w-24 h-38 bg-[#071536] rounded-2xl p-1 shadow-xl transform rotate-[-4deg] border border-slate-700/50 flex flex-col justify-between">
                <div className="w-7 h-1 bg-slate-700 rounded-full mx-auto mb-0.5"></div>
                <div className="flex-1 bg-white rounded-xl p-1.5 flex flex-col items-center justify-center text-center shadow-inner">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] mb-1 font-bold shadow-2xs">
                    ⚡
                  </div>
                  <div className="w-12 h-1 bg-blue-500 rounded-full mb-1"></div>
                  <div className="w-10 h-1 bg-slate-200 rounded-full mb-1"></div>
                  <div className="w-8 h-1 bg-emerald-400 rounded-full"></div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full border border-slate-700 mx-auto mt-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: VIEW SAMPLE BILL */}
      {showSampleBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1e4d]">
                Where to Find Consumer Number?
              </h3>
              <button
                onClick={() => setShowSampleBillModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                Your <strong>Consumer Number</strong> (also called Account ID / CA Number / K Number) is printed at the top-left or top-right of your physical or digital electricity bill.
              </p>

              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Sample Bill Layout
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="p-1.5 bg-amber-100/80 border border-amber-300 rounded text-amber-900 font-bold">
                    👉 Consumer No: 1234567890 (10 Digits)
                  </div>
                  <div className="text-slate-400 pl-2">Name: Rajesh Kumar</div>
                  <div className="text-slate-400 pl-2">Bill No: 882910291</div>
                  <div className="text-slate-400 pl-2">Due Date: 20 Sep 2026</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConsumerNumber("1234567890");
                  setShowSampleBillModal(false);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Fill Sample Number (1234567890)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PAYMENT CONFIRMATION */}
      {showPaymentModal && activePayingBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <FaFileInvoiceDollar size={22} />
            </div>

            <h3 className="text-base font-black text-[#0a1e4d]">
              Confirm Bill Payment
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {activePayingBill.provider || activePayingBill.title}
            </p>

            <div className="text-2xl font-black text-slate-900 my-4 font-mono">
              ₹{activePayingBill.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2 text-left mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account/ID:</span>
                <span className="font-mono font-bold text-slate-800">
                  {activePayingBill.consumerNumber || "1234567890"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Biller:</span>
                <span className="font-semibold text-slate-800">
                  {activePayingBill.provider || activePayingBill.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Payment Mode:</span>
                <span className="font-bold text-blue-600">DSC Wallet (Instant BBPS)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isProcessingPayment}
                className="flex-1 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Pay Now</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PAYMENT SUCCESS RECEIPT */}
      {paymentReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <FaCheckCircle size={28} />
            </div>

            <h3 className="text-lg font-black text-[#0a1e4d]">
              Bill Paid Successfully!
            </h3>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              Instant BBPS Confirmation Received
            </p>

            <div className="text-2xl font-black text-slate-900 my-4 font-mono">
              ₹{paymentReceipt.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2 text-left mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Biller:</span>
                <span className="font-bold text-slate-800">{paymentReceipt.billerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Consumer ID:</span>
                <span className="font-mono font-bold text-slate-800">{paymentReceipt.consumerNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">BBPS Ref No:</span>
                <span className="font-mono font-bold text-blue-600">{paymentReceipt.bbpsRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Date & Time:</span>
                <span className="text-slate-600 font-medium">{paymentReceipt.date}</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentReceipt(null)}
              className="w-full py-3 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL: VIEW ALL MY BILLS */}
      {showAllBillsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1e4d]">
                All Registered Utility Bills
              </h3>
              <button
                onClick={() => setShowAllBillsModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {dueBills.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    {renderLogo(b.logoType)}
                    <div>
                      <div className="text-xs font-bold text-[#0a1e4d]">{b.title}</div>
                      <div className="text-[10px] text-slate-400">{b.account}</div>
                      <div className="text-[10px] font-bold text-amber-600">{b.dueText}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-[#0a1e4d] font-mono mb-1">
                      ₹{b.amount.toLocaleString("en-IN")}
                    </div>
                    <button
                      onClick={() => {
                        setShowAllBillsModal(false);
                        handleInitiatePayment(b);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
