"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaTv,
  FaSearch,
  FaCheckCircle,
  FaTimes,
  FaPrint,
  FaCopy,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaHeadset,
  FaArrowRight,
  FaCheck,
  FaHistory,
  FaQrcode,
  FaFilm,
  FaMobileAlt,
} from "react-icons/fa";
import {
  RiTvLine,
  RiMovie2Line,
  RiClapperboardLine,
  RiVideoLine,
  RiPlayCircleLine,
  RiShieldCheckFill,
} from "react-icons/ri";

// 8 Symmetrical OTT Providers with pure React SVG Icons & DSC Brand Blue Single Color
const ottProviders = [
  {
    id: "hotstar",
    name: "Disney+ Hotstar",
    subtitle: "Movies, Live Sports & Originals",
    code: "HOTSTAR",
    icon: RiMovie2Line,
    plans: [
      { id: "h1", name: "Mobile (3 Months)", validity: "3 Months", price: 149, comm: "₹7.50" },
      { id: "h2", name: "Super (Annual - TV+Phone)", validity: "12 Months", price: 899, comm: "₹45.00" },
      { id: "h3", name: "Premium (Annual - 4K 4 Screens)", validity: "12 Months", price: 1499, comm: "₹75.00" },
    ],
    features: ["Instant E-Voucher Activation", "Up to 4K Ultra HD & Dolby 5.1", "High Retailer Margin up to ₹75"],
  },
  {
    id: "sonyliv",
    name: "Sony LIV Premium",
    subtitle: "UFC, Champions League & Shows",
    code: "SONYLIV",
    icon: RiTvLine,
    plans: [
      { id: "s1", name: "LIV Premium (1 Month)", validity: "1 Month", price: 299, comm: "₹15.00" },
      { id: "s2", name: "LIV Premium (6 Months)", validity: "6 Months", price: 699, comm: "₹35.00" },
      { id: "s3", name: "LIV Premium (12 Months)", validity: "12 Months", price: 999, comm: "₹50.00" },
    ],
    features: ["Live UEFA Champions League", "Ad-Free Streaming on TV", "Instant Code Delivery via SMS"],
  },
  {
    id: "zee5",
    name: "ZEE5 Premium",
    subtitle: "Blockbusters, Originals & 100+ Live TV",
    code: "ZEE5",
    icon: RiClapperboardLine,
    plans: [
      { id: "z1", name: "ZEE5 Premium (1 Month)", validity: "1 Month", price: 199, comm: "₹10.00" },
      { id: "z2", name: "ZEE5 Premium (6 Months)", validity: "6 Months", price: 599, comm: "₹30.00" },
      { id: "z3", name: "ZEE5 Premium 4K (12 Months)", validity: "12 Months", price: 899, comm: "₹45.00" },
    ],
    features: ["12 Indian Regional Languages", "Download & Watch Offline", "Zero Extra Charges on Retailer"],
  },
  {
    id: "jiocinema",
    name: "JioCinema Premium",
    subtitle: "HBO, Peacock & Indian Movies",
    code: "JIOCINEMA",
    icon: RiPlayCircleLine,
    plans: [
      { id: "j1", name: "Premium Individual (1 Month)", validity: "1 Month", price: 29, comm: "₹1.50" },
      { id: "j2", name: "Family Pack 4-Screens (1 Month)", validity: "1 Month", price: 89, comm: "₹4.50" },
      { id: "j3", name: "Premium (12 Months)", validity: "12 Months", price: 299, comm: "₹15.00" },
    ],
    features: ["Hollywood Blockbusters & HBO", "Multi-Screen Family Sharing", "Instant Wallet Rebate"],
  },
  {
    id: "sunnxt",
    name: "Sun NXT",
    subtitle: "4,000+ South Indian Movies & Music",
    code: "SUNNXT",
    icon: RiVideoLine,
    plans: [
      { id: "sn1", name: "Basic Mobile (1 Month)", validity: "1 Month", price: 120, comm: "₹6.00" },
      { id: "sn2", name: "All Screens Annual (12 Months)", validity: "12 Months", price: 799, comm: "₹40.00" },
    ],
    features: ["Tamil, Telugu, Malayalam, Kannada", "Live Sun TV Network Channels", "Full HD Quality Streaming"],
  },
  {
    id: "altbalaji",
    name: "ALT Balaji",
    subtitle: "Exclusive Youth Shows & Drama",
    code: "ALTBALAJI",
    icon: FaFilm,
    plans: [
      { id: "a1", name: "Club Pack (2 Months)", validity: "2 Months", price: 100, comm: "₹5.00" },
      { id: "a2", name: "Club Pack (6 Months)", validity: "6 Months", price: 199, comm: "₹10.00" },
      { id: "a3", name: "Club Pack (12 Months)", validity: "12 Months", price: 300, comm: "₹15.00" },
    ],
    features: ["Original Indian Web Series", "Stream on 5 Devices Simultaneously", "100% Verified Digital Codes"],
  },
  {
    id: "shemaroome",
    name: "ShemarooMe",
    subtitle: "Classic Bollywood, Gujarati & Plays",
    code: "SHEMAROO",
    icon: RiMovie2Line,
    plans: [
      { id: "sh1", name: "All Access (1 Month)", validity: "1 Month", price: 149, comm: "₹7.50" },
      { id: "sh2", name: "All Access Annual (12 Months)", validity: "12 Months", price: 499, comm: "₹25.00" },
    ],
    features: ["3,700+ Golden Era Cinema Titles", "Natak & Devotional Channels", "Instant Activation on TV App"],
  },
  {
    id: "hungama",
    name: "Hungama Play",
    subtitle: "Movies, TV Shows & Short Films",
    code: "HUNGAMA",
    icon: RiPlayCircleLine,
    plans: [
      { id: "hu1", name: "Play Pro (1 Month)", validity: "1 Month", price: 99, comm: "₹5.00" },
      { id: "hu2", name: "Play Pro (12 Months)", validity: "12 Months", price: 499, comm: "₹25.00" },
    ],
    features: ["Huge Bollywood & Hollywood Catalog", "Smart TV & Chromecast Supported", "Instant Activation Receipt"],
  },
];

const initialTransactions = [
  {
    sr: 1,
    txnId: "DSC-OTT-782910",
    operator: "Disney+ Hotstar",
    planName: "Super (Annual - TV+Phone)",
    validity: "12 Months",
    mobile: "9876543210",
    email: "rahul.kumar@gmail.com",
    amount: 899,
    comm: "₹45.00",
    voucher: "HOTSTAR-899-7721-AX",
    date: "13/09/2026 14:22",
    status: "Success",
  },
  {
    sr: 2,
    txnId: "DSC-OTT-782909",
    operator: "Sony LIV Premium",
    planName: "LIV Premium (12 Months)",
    validity: "12 Months",
    mobile: "9123456780",
    email: "anil.verma@yahoo.com",
    amount: 999,
    comm: "₹50.00",
    voucher: "SONY-999-4412-MK",
    date: "12/09/2026 11:40",
    status: "Success",
  },
  {
    sr: 3,
    txnId: "DSC-OTT-782894",
    operator: "ZEE5 Premium",
    planName: "ZEE5 Premium (6 Months)",
    validity: "6 Months",
    mobile: "9450123456",
    email: "sunil.singh@gmail.com",
    amount: 599,
    comm: "₹30.00",
    voucher: "ZEE5-599-9021-LP",
    date: "11/09/2026 16:15",
    status: "Success",
  },
  {
    sr: 4,
    txnId: "DSC-OTT-782881",
    operator: "JioCinema Premium",
    planName: "Family Pack 4-Screens",
    validity: "1 Month",
    mobile: "9988776655",
    email: "manoj.p@gmail.com",
    amount: 89,
    comm: "₹4.50",
    voucher: "JIO-89-6612-QQ",
    date: "10/09/2026 09:30",
    status: "Success",
  },
];

export default function OTTPage() {
  const [selectedOperator, setSelectedOperator] = useState(ottProviders[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(ottProviders[0].plans[0].id);
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [transactions, setTransactions] = useState(initialTransactions);
  const [receiptModal, setReceiptModal] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentOp = ottProviders.find((op) => op.id === selectedOperator) || ottProviders[0];
  const currentPlan = currentOp.plans.find((p) => p.id === selectedPlanId) || currentOp.plans[0];
  const CurrentIcon = currentOp.icon;

  const handleOperatorChange = (opId) => {
    setSelectedOperator(opId);
    const op = ottProviders.find((o) => o.id === opId);
    if (op && op.plans.length > 0) {
      setSelectedPlanId(op.plans[0].id);
    }
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!customerMobile || customerMobile.length !== 10) {
      alert("Please enter a valid 10-digit customer mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const randomVoucher = `${currentOp.code}-${currentPlan.price}-${Math.floor(
        1000 + Math.random() * 9000
      )}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;

      const newTxn = {
        sr: transactions.length + 1,
        txnId: `DSC-OTT-${Math.floor(100000 + Math.random() * 900000)}`,
        operator: currentOp.name,
        planName: currentPlan.name,
        validity: currentPlan.validity,
        mobile: customerMobile,
        email: customerEmail || "-",
        amount: currentPlan.price,
        comm: currentPlan.comm,
        voucher: randomVoucher,
        date:
          new Date().toLocaleDateString("en-GB") +
          " " +
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Success",
      };

      setTransactions([newTxn, ...transactions]);
      setReceiptModal(newTxn);
      setCustomerMobile("");
      setCustomerEmail("");
    }, 800);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTxns = transactions.filter((t) => {
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    const matchSearch =
      !searchQuery ||
      t.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.mobile.includes(searchQuery) ||
      t.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.voucher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans pb-16">
      {/* 1. TOP HEADER & PROMO BANNER */}
      <div className="max-w-7xl mx-auto mb-5">

        {/* Title and Promo Banner Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              OTT Subscriptions & Vouchers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Instant activation vouchers for Hotstar, SonyLIV, ZEE5, JioCinema & more with high retailer margins.
            </p>
          </div>

          {/* Right Header Promo Card - Light Blue Theme */}
          <div className="bg-gradient-to-r from-[#d8ebfc] via-[#e8f3fe] to-[#cfdff9] rounded-3xl p-3 sm:px-6 sm:py-3.5 border border-blue-200/80 shadow-xs flex items-center justify-between gap-4 min-w-[340px] sm:min-w-[420px] relative overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-200/90 flex items-center justify-center text-[#1d68f6] text-2xl shadow-inner">
                <FaTv />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-[#0a1e4d] leading-tight">
                  Instant E-Voucher Codes
                </h3>
                <p className="text-[11px] font-semibold text-blue-600 mt-0.5 tracking-wide">
                  Direct SMS Delivery &nbsp;|&nbsp; 100% Genuine Plans
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Retailer Margin</span>
              <span className="text-base font-black text-[#0a1e4d]">Up to 8%</span>
            </div>

            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-300/20 blur-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: 8 Category Cards, Dynamic Banner, 4 Trust Badges (8 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* Section: Select OTT Provider */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <h2 className="text-sm sm:text-base font-bold text-[#0a1e4d]">
                Select OTT Streaming Provider
              </h2>

              <span className="text-xs font-bold text-slate-400">
                {ottProviders.length} Partners Available
              </span>
            </div>

            {/* 8 Symmetrical Cards Grid (2 rows x 4 cols on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {ottProviders.map((op) => {
                const OpIcon = op.icon;
                const isSelected = selectedOperator === op.id;
                const minPrice = Math.min(...op.plans.map((p) => p.price));
                return (
                  <div
                    key={op.id}
                    onClick={() => handleOperatorChange(op.id)}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col items-center text-center cursor-pointer relative min-h-[165px] justify-between ${isSelected
                      ? "border-[#1d68f6] shadow-md ring-2 ring-blue-500/20 bg-blue-50/15"
                      : "border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5"
                      }`}
                  >
                    {/* Circular Icon Container - Single Blue Scheme */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2.5 transition-all duration-200 border ${isSelected
                        ? "bg-[#1d68f6] text-white border-[#1d68f6] scale-110 shadow-md shadow-blue-500/25"
                        : "bg-blue-50/80 text-[#1d68f6] border-blue-100/90"
                        }`}
                    >
                      <OpIcon />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-1 flex flex-col justify-start">
                      <h3
                        className={`text-xs sm:text-[13px] font-black transition mb-1 leading-tight ${isSelected ? "text-blue-600" : "text-[#0a1e4d]"
                          }`}
                      >
                        {op.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight line-clamp-2">
                        {op.subtitle}
                      </p>
                    </div>

                    {/* Bottom Starting Price Tag & Arrow */}
                    <div className="w-full mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                        From ₹{minPrice}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition shadow-2xs ${isSelected
                          ? "bg-[#1d68f6] text-white"
                          : "bg-blue-50 text-[#1d68f6]"
                          }`}
                      >
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Featured Middle Banner - Light Theme Matching DSC Design */}
          <div className="bg-gradient-to-r from-[#e3f0fc] via-[#edf6fe] to-[#e0effd] border border-blue-200/80 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Content */}
              <div className="max-w-xs space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[#1d68f6] text-[10px] font-bold border border-blue-200/80">
                  <FaBolt className="text-xs" />
                  <span>Instant Activation Gateway</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0a1e4d] leading-tight">
                  {currentOp.name} Subscriptions
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Earn up to <span className="font-extrabold text-emerald-700">₹75.00</span> instant commission on every voucher redemption.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const input = document.getElementById("customerMobileInput");
                      if (input) input.focus();
                    }}
                    className="px-5 py-2.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Activate Subscription</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Center Vector Graphic - Clean Blue Single Theme */}
              <div className="w-28 h-28 sm:w-32 sm:h-28 flex items-center justify-center shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-white/90 border border-blue-200/90 flex items-center justify-center text-[#1d68f6] text-4xl shadow-md">
                  <CurrentIcon />
                </div>
              </div>

              {/* Right Stacked Benefits List */}
              <div className="space-y-2 w-full md:w-auto min-w-[200px]">
                {currentOp.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-white/95 border border-blue-200/80 px-4 py-2.5 rounded-2xl shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1d68f6] flex items-center justify-center text-xs shrink-0">
                      <FaCheck />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Subscription Request Form, Why Choose, Live Queue (4 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Subscription Purchase Form */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-3.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1d68f6] border border-blue-100 flex items-center justify-center font-bold text-sm shadow-inner">
                <FaTv />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0a1e4d] leading-tight">
                  New Subscription
                </h3>
                <p className="text-[10px] font-medium text-slate-400">
                  Wallet Mode &bull; Instant Delivery
                </p>
              </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-3">
              {/* Select Operator */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Selected Operator
                </label>
                <div className="w-full px-3 py-2 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs font-extrabold text-blue-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CurrentIcon className="text-sm text-[#1d68f6]" />
                    <span>{currentOp.name}</span>
                  </div>
                  <span className="text-[10px] text-blue-600 bg-white px-2 py-0.5 rounded font-mono">
                    {currentOp.code}
                  </span>
                </div>
              </div>

              {/* Select Plan / Validity */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Select Plan / Validity *
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                >
                  {currentOp.plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price} ({p.validity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Mobile Number */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Customer Mobile Number *
                </label>
                <input
                  id="customerMobileInput"
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-mono"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Customer Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              {/* Price & Retailer Margin Breakdown */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Payable Amount:</span>
                  <span className="text-sm font-black text-slate-900">₹{currentPlan.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Retailer Margin:</span>
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
                    +{currentPlan.comm}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FaBolt />
                  <span>{loading ? "Processing..." : `Buy Subscription (₹${currentPlan.price})`}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Why Choose DSC PAY OTT? */}
          <div className="bg-[#f0f6ff] rounded-3xl p-4 sm:p-5 border border-blue-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-md bg-[#1d68f6] text-white flex items-center justify-center text-[11px] shadow-2xs">
                <FaShieldAlt />
              </div>
              <h3 className="text-xs sm:text-sm font-black text-[#0a1e4d]">
                Why Buy OTT on DSC PAY?
              </h3>
            </div>

            <ul className="space-y-1.5 text-[11px] text-slate-700 font-semibold">
              {[
                "Instant activation voucher on customer SMS",
                "Highest retailer commission in the market",
                "Direct official operator partner codes",
                "100% replacement guarantee for invalid pins",
                "Detailed receipt printing for customer trust",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#1d68f6] text-xs shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. FULL WIDTH 4 TRUST & FEATURE CARDS */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaBolt />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Instant Codes</h4>
          <p className="text-[10px] text-slate-400 font-medium">Real-time activation</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaShieldAlt />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">100% Genuine</h4>
          <p className="text-[10px] text-slate-400 font-medium">Direct operator vouchers</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaUsers />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Best Margins</h4>
          <p className="text-[10px] text-slate-400 font-medium">Earn up to ₹75/plan</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaHeadset />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">24/7 Support</h4>
          <p className="text-[10px] text-slate-400 font-medium">Desk helpline support</p>
        </div>
      </div>

      {/* 4. TRANSACTION HISTORY & VOUCHERS TABLE */}
      <div className="max-w-7xl mx-auto mt-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-black text-[#0a1e4d] text-sm sm:text-base">
              Voucher History & Transactions
            </h3>
            <p className="text-xs text-slate-500">
              Track customer activations, voucher codes, and credited retailer margins
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            {/* Search Box */}
            <div className="relative min-w-[200px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search mobile, txn, code..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">#</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Operator & Plan</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Voucher Code</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Margin</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTxns.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No transaction records found.
                  </td>
                </tr>
              ) : (
                filteredTxns.map((t) => (
                  <tr key={t.txnId} className="hover:bg-blue-50/30 transition">
                    <td className="py-3.5 px-4 sm:px-6 text-slate-500">{t.sr}</td>
                    <td className="py-3.5 px-4 text-slate-500">{t.date}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{t.txnId}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{t.operator}</div>
                      <div className="text-[11px] text-slate-400">{t.planName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{t.mobile}</td>
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                        <span>{t.voucher}</span>
                        <button
                          onClick={() => handleCopyCode(t.voucher)}
                          className="text-slate-400 hover:text-blue-700 cursor-pointer"
                          title="Copy Voucher"
                        >
                          <FaCopy size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-slate-900">₹{t.amount}</td>
                    <td className="py-3.5 px-4 text-right font-black text-emerald-700">+{t.comm}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setReceiptModal(t)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                        title="View & Print Slip"
                      >
                        <FaPrint size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECEIPT MODAL */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 text-center animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-2.5 text-xl">
              <FaCheckCircle />
            </div>

            <h3 className="text-base font-black text-slate-900">Subscription Activated</h3>
            <p className="text-xs text-slate-500 font-mono">Txn ID: {receiptModal.txnId}</p>

            {/* Voucher Box */}
            <div className="my-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Subscription Voucher Code
              </span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-black font-mono text-[#1d68f6]">
                  {receiptModal.voucher}
                </span>
                <button
                  onClick={() => handleCopyCode(receiptModal.voucher)}
                  className="p-1 text-slate-500 hover:text-blue-600 cursor-pointer"
                  title="Copy"
                >
                  <FaCopy size={12} />
                </button>
              </div>
              {copied && (
                <span className="text-[10px] font-bold text-emerald-600 block mt-1">
                  ✓ Copied to clipboard
                </span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-2 border-b border-slate-100 text-left">
              <div className="flex justify-between">
                <span>Operator:</span>
                <span className="font-bold text-slate-900">{receiptModal.operator}</span>
              </div>
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-semibold text-slate-800">{receiptModal.planName}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Mobile:</span>
                <span className="font-mono font-bold text-slate-900">{receiptModal.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span>Retailer Margin:</span>
                <span className="font-bold text-emerald-700">{receiptModal.comm}</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-slate-100">
                <span>Amount Paid:</span>
                <span className="text-[#1d68f6]">₹{receiptModal.amount}</span>
              </div>
            </div>

            <button
              onClick={() => setReceiptModal(null)}
              className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
