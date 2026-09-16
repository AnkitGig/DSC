"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaCreditCard,
  FaShareAlt,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaCopy,
  FaCheckCircle,
  FaSearch,
  FaMoneyBillWave,
  FaShieldAlt,
  FaBolt,
  FaBuilding,
  FaUserCheck,
  FaFilter,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaStar,
  FaUsers,
  FaHeadset,
  FaDownload,
  FaPrint,
  FaQrcode,
  FaHistory,
  FaHandHoldingUsd,
  FaRegFileAlt,
  FaChevronDown,
} from "react-icons/fa";
import {
  RiExchangeDollarLine,
  RiShieldCheckFill,
  RiBankCardLine,
  RiHandCoinLine,
  RiCopperCoinLine,
  RiSafe2Line,
} from "react-icons/ri";

// 8 Financial Products with Single Brand Blue styling & Pure React Icons (No Emojis)
const financialProducts = [
  {
    id: "yes-prosperity",
    category: "credit-cards",
    bank: "YES Bank",
    title: "YES Prosperity Edge",
    subtitle: "High Rewards & Zero Joining Fee",
    payout: "₹2,200",
    annualFee: "Zero Joining Fee",
    rating: "4.8",
    icon: FaCreditCard,
    approvalRate: "94%",
    eligibility: {
      salaried: "Min ₹30,000 / month salary (last 3 months slip)",
      selfEmployed: "Existing card of any bank with min ₹50,000 limit",
      requirement: "Savings Bank Account & Aadhaar Mandatory",
    },
    benefits: [
      "Complimentary Domestic Airport Lounge Access",
      "Fuel Surcharge waiver across India",
      "5X Accelerated Reward Points on dining & travel",
    ],
    features: [
      "100% Paperless Digital KYC",
      "Instant Virtual Card Generation",
      "Zero Annual Fee on ₹50k Spend",
    ],
  },
  {
    id: "indusind-legend",
    category: "credit-cards",
    bank: "IndusInd Bank",
    title: "IndusInd Legend Card",
    subtitle: "Lifetime Free Premium Lifestyle Card",
    payout: "₹1,850",
    annualFee: "Lifetime Free",
    rating: "4.7",
    icon: FaCreditCard,
    approvalRate: "92%",
    eligibility: {
      salaried: "Min ₹25,000 / month salary",
      selfEmployed: "ITR of ₹4.5 Lakhs / year",
      requirement: "PAN & Aadhaar linked with mobile",
    },
    benefits: [
      "Buy 1 Get 1 Free Movie Tickets on BookMyShow",
      "Zero Annual & Renewal Fee for lifetime",
      "Comprehensive Travel & Personal Accident Cover",
    ],
    features: [
      "Instant Approval in 5 Minutes",
      "1.5 Reward Points per ₹100 spend",
      "Priority Customer Concierge Desk",
    ],
  },
  {
    id: "hdfc-millennia",
    category: "credit-cards",
    bank: "HDFC Bank",
    title: "HDFC Millennia Card",
    subtitle: "5% Cashback on Amazon, Flipkart & Swiggy",
    payout: "₹2,500",
    annualFee: "₹1,000 (Waived on ₹1L spend)",
    rating: "4.9",
    icon: FaCreditCard,
    approvalRate: "89%",
    eligibility: {
      salaried: "Min ₹35,000 / month salary",
      selfEmployed: "ITR of ₹6 Lakhs / year",
      requirement: "CIBIL Score 750+ with active credit track",
    },
    benefits: [
      "5% CashPoints on top 10 merchant partners",
      "1% CashPoints on all other offline & online spends",
      "8 Complimentary Domestic Lounge Access per year",
    ],
    features: [
      "₹1,000 Gift Voucher on First Swipe",
      "Contactless Tap & Pay Enabled",
      "Global Acceptance across 200+ countries",
    ],
  },
  {
    id: "au-savings",
    category: "bank-accounts",
    bank: "AU Small Finance",
    title: "AU Digital Savings Account",
    subtitle: "Up to 7.25% Interest Rate Monthly Payout",
    payout: "₹650",
    annualFee: "Zero Maintenance Fee",
    rating: "4.8",
    icon: FaBuilding,
    approvalRate: "98%",
    eligibility: {
      salaried: "Indian Citizen above 18 years",
      selfEmployed: "Valid PAN and Aadhaar linked with Mobile",
      requirement: "Video KYC within 48 hours",
    },
    benefits: [
      "High interest up to 7.25% p.a. with monthly payout",
      "Unlimited free ATM transactions at AU Bank ATMs",
      "Complimentary Platinum Debit Card with insurance",
    ],
    features: [
      "Zero Balance Account opening option",
      "Instant Virtual Visa Debit Card",
      "Free IMPS / NEFT / RTGS transfers",
    ],
  },
  {
    id: "kotak-811",
    category: "bank-accounts",
    bank: "Kotak Mahindra",
    title: "Kotak 811 Zero Balance",
    subtitle: "Open Instant Account in 3 Minutes via VKYC",
    payout: "₹450",
    annualFee: "Lifetime Zero Balance",
    rating: "4.9",
    icon: FaBuilding,
    approvalRate: "99%",
    eligibility: {
      salaried: "Resident Indian, 18+ years of age",
      selfEmployed: "Original PAN & Aadhaar number",
      requirement: "Device with working camera for Video KYC",
    },
    benefits: [
      "Zero Balance Savings Account for life",
      "Virtual Debit Card for safe online shopping",
      "Scan & Pay UPI instantly after account creation",
    ],
    features: [
      "Instant Account Number & IFSC allocation",
      "Earn up to 4% p.a. interest",
      "24x7 Kotak Mobile Banking app access",
    ],
  },
  {
    id: "indusind-savings",
    category: "bank-accounts",
    bank: "IndusInd Bank",
    title: "Indus Delight Account",
    subtitle: "5% Cashback on Fuel, Dining & Entertainment",
    payout: "₹750",
    annualFee: "Zero Non-Maintenance Penalty",
    rating: "4.7",
    icon: FaBuilding,
    approvalRate: "95%",
    eligibility: {
      salaried: "Resident Indian with valid KYC documents",
      selfEmployed: "PAN, Aadhaar and initial funding of ₹1,000",
      requirement: "Aadhaar linked phone for OTP",
    },
    benefits: [
      "5% Cashback on Amazon, Swiggy, Zomato & BigBasket",
      "Free personalized Titanium Debit Card",
      "Higher daily ATM withdrawal & POS limit",
    ],
    features: [
      "Choice of custom account number",
      "Discount on Locker rentals",
      "Zero fee on fund transfers",
    ],
  },
  {
    id: "personal-loan-instant",
    category: "loans",
    bank: "Tata Capital",
    title: "Instant Personal Loan",
    subtitle: "Loans up to ₹15 Lakhs at 10.49% p.a.",
    payout: "₹3,500",
    annualFee: "1.5% Processing Fee",
    rating: "4.8",
    icon: FaMoneyBillWave,
    approvalRate: "88%",
    eligibility: {
      salaried: "Min ₹20,000 / month salary with net banking access",
      selfEmployed: "Business vintage of 2+ years with GST returns",
      requirement: "CIBIL Score 700+ required",
    },
    benefits: [
      "Disbursal directly to bank account within 2 hours",
      "Flexible repayment tenures from 12 to 60 months",
      "No physical collateral or guarantor required",
    ],
    features: [
      "100% Digital documentation",
      "Pre-approved limits for existing customers",
      "Part-prepayment option with low charges",
    ],
  },
  {
    id: "business-loan-pro",
    category: "loans",
    bank: "Bajaj Finserv",
    title: "Unsecured Business Loan",
    subtitle: "High-Ticket Funding up to ₹50 Lakhs for Retailers",
    payout: "₹5,000",
    annualFee: "Zero Hidden Charges",
    rating: "4.9",
    icon: FaHandHoldingUsd,
    approvalRate: "86%",
    eligibility: {
      salaried: "Not applicable (Only registered businesses)",
      selfEmployed: "GST Registration & last 12 months bank statement",
      requirement: "Minimum ₹15 Lakhs annual turnover",
    },
    benefits: [
      "No collateral or asset mortgaging required",
      "Flexi Loan facility: Pay interest only on utilized amount",
      "Quick sanctions with customized repayment schedules",
    ],
    features: [
      "Same-day document verification",
      "Doorstep service or 100% online portal",
      "Tax benefits on loan interest payments",
    ],
  },
];

const mockRecentLeads = [
];

export default function SellAndEarnPage() {
  const [selectedProduct, setSelectedProduct] = useState(financialProducts[0]);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "", city: "" });
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leadsList, setLeadsList] = useState(mockRecentLeads);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Filter products
  const filteredProducts = financialProducts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = () => {
    if (!leadForm.name || !leadForm.phone) {
      alert("Please enter customer name and 10-digit mobile number first.");
      return;
    }
    const trackingLink = `https://dscpay.com/apply/${selectedProduct.id}?ref=RETAILER_DSC&cname=${encodeURIComponent(
      leadForm.name
    )}&cphone=${leadForm.phone}`;

    navigator.clipboard.writeText(trackingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    if (!leadForm.phone) {
      alert("Please enter customer mobile number to share via WhatsApp.");
      return;
    }
    const trackingLink = `https://dscpay.com/apply/${selectedProduct.id}?ref=RETAILER_DSC`;
    const message = `Hello ${leadForm.name || "Customer"}, apply for ${selectedProduct.title} (${selectedProduct.bank}) with zero joining fee and high reward benefits. Apply securely here: ${trackingLink}`;
    window.open(`https://wa.me/91${leadForm.phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleDirectSubmitLead = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || leadForm.phone.length < 10) {
      alert("Please provide valid Customer Name and 10-Digit Mobile Number.");
      return;
    }

    const newLead = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      customer: leadForm.name,
      phone: leadForm.phone,
      product: selectedProduct.title,
      payout: selectedProduct.payout,
      status: "In Review",
    };

    setLeadsList([newLead, ...leadsList]);
    setIsSuccessModal(true);
  };

  const IconComponent = selectedProduct.icon;

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans pb-16">
      {/* 1. TOP HEADER & PROMO BANNER */}
      <div className="max-w-7xl mx-auto mb-5">

        {/* Title and Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              Sell & Earn Financial Products
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Recommend Credit Cards, Savings Accounts & Personal Loans to customers. Earn instant wallet commission per approved lead.
            </p>
          </div>

          {/* Right Header Promo Card - Light Blue Theme */}
          <div className="bg-gradient-to-r from-[#d8ebfc] via-[#e8f3fe] to-[#cfdff9] rounded-3xl p-3 sm:px-6 sm:py-3.5 border border-blue-200/80 shadow-xs flex items-center justify-between gap-4 min-w-[340px] sm:min-w-[420px] relative overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-200/90 flex items-center justify-center text-[#1d68f6] text-2xl shadow-inner">
                <RiExchangeDollarLine />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-[#0a1e4d] leading-tight">
                  High Payout Guarantee
                </h3>
                <p className="text-[11px] font-semibold text-blue-600 mt-0.5 tracking-wide">
                  Direct Wallet Credit &nbsp;|&nbsp; 100% Verified Banks
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Payouts</span>
              <span className="text-base font-black text-[#0a1e4d]">₹2.4+ Crores</span>
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
          {/* Section: Select Financial Product */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <h2 className="text-sm sm:text-base font-bold text-[#0a1e4d]">
                Select Financial Product
              </h2>

              {/* Search Bar */}
              <div className="relative min-w-[200px]">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search card or bank..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* 8 Symmetrical Cards Grid (2 rows x 4 cols on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {filteredProducts.map((prod) => {
                const ProdIcon = prod.icon;
                const isSelected = selectedProduct.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
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
                      <ProdIcon />
                    </div>

                    {/* Title & Bank */}
                    <div className="flex-1 flex flex-col justify-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md mb-1 inline-block">
                        {prod.bank}
                      </span>
                      <h3
                        className={`text-xs sm:text-[13px] font-black transition mb-1 leading-tight ${isSelected ? "text-blue-600" : "text-[#0a1e4d]"
                          }`}
                      >
                        {prod.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight line-clamp-2">
                        {prod.subtitle}
                      </p>
                    </div>

                    {/* Bottom Commission Tag & Arrow */}
                    <div className="w-full mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        {prod.payout}
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
                  <span>Instant Lead Generation</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0a1e4d] leading-tight">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Earn <span className="font-extrabold text-emerald-700">{selectedProduct.payout}</span> per approved customer application. 100% digital verification.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowApplyModal(true);
                    }}
                    className="px-5 py-2.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Generate Tracked Lead</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Center Vector Graphic - Clean Blue Single Theme */}
              <div className="w-28 h-28 sm:w-32 sm:h-28 flex items-center justify-center shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-white/90 border border-blue-200/90 flex items-center justify-center text-[#1d68f6] text-4xl shadow-md">
                  <IconComponent />
                </div>
              </div>

              {/* Right Stacked Benefits List */}
              <div className="space-y-2 w-full md:w-auto min-w-[200px]">
                {selectedProduct.features.map((feat, idx) => (
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
        {/* RIGHT COLUMN: Customer Lead Generator Form, Eligibility & History (4 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* Lead Generator Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1d68f6] border border-blue-100/80 flex items-center justify-center font-bold text-base shadow-inner">
                <FaShareAlt />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                  Customer Lead Link
                </h3>
                <p className="text-[10px] font-medium text-slate-400">
                  Tracked lead attribution to your wallet
                </p>
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-100/90 rounded-2xl p-3 mb-4 text-xs text-blue-900">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Selected:</span>
                <span className="font-extrabold text-blue-700">{selectedProduct.title}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-slate-500">Commission:</span>
                <span className="font-extrabold text-emerald-700">{selectedProduct.payout}</span>
              </div>
            </div>

            {/* Input form */}
            <form onSubmit={handleDirectSubmitLead} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Customer Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-mono"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FaCheckCircle className="text-emerald-300" />
                      <span>Tracking Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span>Copy Customer Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaExternalLinkAlt className="text-[11px]" />
                  <span>Submit Lead Directly</span>
                </button>
              </div>
            </form>
          </div>

          {/* Eligibility Overview Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <h4 className="text-xs font-extrabold text-[#0a1e4d] uppercase tracking-wide mb-3 flex items-center gap-2">
              <FaShieldAlt className="text-blue-600" />
              <span>Eligibility & Requirements</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block text-[11px]">Salaried Individuals:</span>
                <span className="text-slate-600 text-[11px]">{selectedProduct.eligibility.salaried}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block text-[11px]">Self-Employed / Business:</span>
                <span className="text-slate-600 text-[11px]">{selectedProduct.eligibility.selfEmployed}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 font-semibold text-[11px]">
                {selectedProduct.eligibility.requirement}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FULL WIDTH 4 TRUST & FEATURE CARDS */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaBolt />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Highest Payout</h4>
          <p className="text-[10px] text-slate-400 font-medium">Up to ₹5,000 per lead</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaShieldAlt />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Direct Tie-Ups</h4>
          <p className="text-[10px] text-slate-400 font-medium">Top Banks & NBFCs</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaUsers />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Fast Approvals</h4>
          <p className="text-[10px] text-slate-400 font-medium">100% Digital V-KYC</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
            <FaHeadset />
          </div>
          <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">24/7 Support</h4>
          <p className="text-[10px] text-slate-400 font-medium">Dedicated desk manager</p>
        </div>
      </div>

      {/* 4. GENERATED LEADS & APPLICATION STATUS TABLE */}
      <div className="max-w-7xl mx-auto mt-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-black text-[#0a1e4d] text-sm sm:text-base">
              Generated Leads & Wallet Earnings
            </h3>
            <p className="text-xs text-slate-500">
              Track customer application status and credited commission payouts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Total Leads:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs border border-blue-200">
              {leadsList.length} Active
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Lead ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4 text-right">Commission</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leadsList.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50/30 transition">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-700">
                    {lead.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{lead.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{lead.customer}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{lead.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{lead.product}</td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-700">
                    {lead.payout}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${lead.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                        : lead.status === "In Review"
                          ? "bg-blue-50 text-blue-700 border border-blue-300"
                          : "bg-amber-50 text-amber-700 border border-amber-300"
                        }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUCCESS POPUP MODAL */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3 text-2xl">
              <FaCheckCircle />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">Lead Created Successfully!</h3>
            <p className="text-xs text-slate-500 mb-4">
              Your tracking lead has been registered. You will receive{" "}
              <span className="font-black text-emerald-700">{selectedProduct.payout}</span> in your wallet once the customer completes verification.
            </p>

            <button
              onClick={() => {
                setIsSuccessModal(false);
                setLeadForm({ name: "", phone: "", email: "", city: "" });
              }}
              className="w-full py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
