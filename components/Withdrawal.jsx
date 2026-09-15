"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaUniversity,
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaHeadset,
  FaSearch,
  FaCheck,
  FaCheckCircle,
  FaFingerprint,
  FaEye,
  FaEyeSlash,
  FaSyncAlt,
  FaTimes,
  FaPrint,
  FaInfoCircle,
  FaMoneyBillWave,
  FaArrowRight,
  FaLock,
  FaPhoneAlt,
} from "react-icons/fa";
import { RiQrCodeLine, RiBankFill } from "react-icons/ri";
import { MdOutlineFingerprint, MdSensors } from "react-icons/md";
import CustomerNotFoundModal from "@/components/CustomerNotFoundModal";

const bankList = [
  { id: "sbi", name: "State Bank of India (SBI)", code: "SBIN", logoColor: "#0077c8" },
  { id: "hdfc", name: "HDFC Bank", code: "HDFC", logoColor: "#004c8f" },
  { id: "icici", name: "ICICI Bank", code: "ICIC", logoColor: "#a81c1d" },
  { id: "axis", name: "Axis Bank", code: "UTIB", logoColor: "#97144d" },
  { id: "pnb", name: "Punjab National Bank (PNB)", code: "PUNB", logoColor: "#a20a3a" },
  { id: "bob", name: "Bank of Baroda", code: "BARB", logoColor: "#f26522" },
  { id: "canara", name: "Canara Bank", code: "CNRB", logoColor: "#0088cc" },
  { id: "kotak", name: "Kotak Mahindra Bank", code: "KKBK", logoColor: "#ed1c24" },
  { id: "union", name: "Union Bank of India", code: "UBIN", logoColor: "#004c8f" },
];

const mockMiniStatement = [
  { id: "s1", date: "12 Sep 2026, 11:20 AM", type: "Cash Withdrawal (AePS)", amount: "₹2,000.00", status: "Success", rrn: "529910281920" },
  { id: "s2", date: "10 Sep 2026, 04:45 PM", type: "Cash Withdrawal (AePS)", amount: "₹5,000.00", status: "Success", rrn: "529901928101" },
  { id: "s3", date: "08 Sep 2026, 01:15 PM", type: "Balance Enquiry", amount: "--", status: "Success", rrn: "529881920194" },
  { id: "s4", date: "05 Sep 2026, 09:30 AM", type: "Cash Withdrawal (AePS)", amount: "₹3,500.00", status: "Success", rrn: "529849201928" },
];

export default function Withdrawal() {
  const [selectedBank, setSelectedBank] = useState(bankList[0]);
  const [aadhaarNumber, setAadhaarNumber] = useState("5482 9102 4321");
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [authMethod, setAuthMethod] = useState("biometric"); // 'biometric' | 'iris'
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(12450.0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Today, 10:32 AM");

  // Modals
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [scanningState, setScanningState] = useState("idle"); // 'idle', 'scanning', 'captured', 'success'
  const [withdrawalReceipt, setWithdrawalReceipt] = useState(null);

  // Format Aadhaar Number with spaces
  const handleAadhaarChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setAadhaarNumber(formatted);
  };

  const handleAmountSelect = (val) => {
    setAmount(String(val));
  };

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(
        "Today, " +
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 600);
  };

  const handleProceedWithdraw = (e) => {
    if (e) e.preventDefault();
    const rawAadhaar = aadhaarNumber.replace(/\s/g, "");
    if (rawAadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    const amt = Number(amount);
    if (!amt || isNaN(amt) || amt < 100 || amt > 10000) {
      alert("Please enter an amount between ₹100 and ₹10,000");
      return;
    }

    setShowBiometricModal(true);
    setScanningState("idle");
  };

  const handleStartFingerprintScan = () => {
    setScanningState("scanning");
    setTimeout(() => {
      setScanningState("captured");
      setTimeout(() => {
        setScanningState("not_found");
      }, 1000);
    }, 1500);
  };

  const filteredBanks = bankList.filter((b) =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans">
      {/* 1. BREADCRUMBS & TOP HEADER */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              Cash Withdrawal
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              Withdraw money from any bank account using AEPS (Aadhaar Enabled Payment System).
            </p>
          </div>

          {/* Top Right: Promo Banner (Withdraw Money Anytime, Anywhere) */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#dbeafe] via-[#e0f2fe] to-[#bfdbfe] border border-blue-200/80 px-5 py-3.5 shadow-2xs flex items-center gap-4 overflow-hidden max-w-md">
            {/* 3D Phone & Rupee Coin Graphic */}
            <div className="relative w-12 h-14 shrink-0 flex items-center justify-center select-none">
              <div className="w-9 h-13 bg-[#1d68f6] rounded-xl shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                <span className="font-black text-sm">₹</span>
                <div className="w-4 h-0.5 bg-blue-300 rounded-full mt-1"></div>
              </div>
              <div className="absolute -left-1.5 -bottom-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs border border-white">
                ✓
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-base font-black text-[#0a1e4d] leading-tight">
                Withdraw Money Anytime, Anywhere
              </div>
              <div className="text-xs font-bold text-blue-700 mt-0.5">
                Secure • Fast • Reliable
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID (7 Cols Left, 5 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6 min-w-0">
          {/* CARD 1: WITHDRAW MONEY FORM */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
            {/* Card Title */}
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0 shadow-2xs">
                <FaUniversity />
              </div>
              <h2 className="text-base font-extrabold text-[#0a1e4d] tracking-tight">
                Withdraw Money
              </h2>
            </div>

            <form onSubmit={handleProceedWithdraw} className="space-y-4">
              {/* Field 1: Select Bank */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Bank
                </label>
                <div
                  onClick={() => setShowBankModal(true)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50/70 border border-slate-200 focus:border-blue-500 rounded-xl cursor-pointer transition shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#0077c8] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      <FaUniversity size={11} />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      {selectedBank.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-600 shrink-0 ml-2">
                    ▼
                  </span>
                </div>
              </div>

              {/* Field 2: Enter Aadhaar Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter Aadhaar Number
                </label>
                <div className="relative">
                  {/* Aadhaar Emblem Icon */}
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center text-xs pointer-events-none font-black border border-red-100">
                    <MdOutlineFingerprint size={16} />
                  </div>
                  <input
                    type={showAadhaar ? "text" : "password"}
                    value={aadhaarNumber}
                    onChange={handleAadhaarChange}
                    placeholder="Enter 12 digit Aadhaar number"
                    className="w-full pl-12 pr-11 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono text-slate-800 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  >
                    {showAadhaar ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>
              </div>

              {/* Field 3: Select Authentication Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Authentication Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Biometric (Fingerprint) Button */}
                  <button
                    type="button"
                    onClick={() => setAuthMethod("biometric")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${authMethod === "biometric"
                        ? "border-blue-500 bg-blue-50/70 text-blue-700 ring-2 ring-blue-500/20 shadow-xs font-black"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${authMethod === "biometric" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      <FaFingerprint size={14} />
                    </div>
                    <span>Biometric (Fingerprint)</span>
                  </button>

                  {/* Iris Scan Button */}
                  <button
                    type="button"
                    onClick={() => setAuthMethod("iris")}
                    className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${authMethod === "iris"
                        ? "border-blue-500 bg-blue-50/70 text-blue-700 ring-2 ring-blue-500/20 shadow-xs font-black"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${authMethod === "iris" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      <MdSensors size={15} />
                    </div>
                    <span>Iris Scan</span>
                  </button>
                </div>
              </div>

              {/* Field 4: Enter Withdrawal Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter Withdrawal Amount
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-sm pointer-events-none">
                      ₹
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="100"
                      max="10000"
                      className="w-full pl-8 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                    />
                  </div>

                  {/* Quick Select Amount Chips */}
                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-0.5">
                    {[500, 1000, 2000, 5000, 10000].map((val) => {
                      const isSelected = amount === String(val);
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleAmountSelect(val)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${isSelected
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-[#eff6ff] hover:bg-blue-100/70 text-blue-600 border border-blue-100"
                            }`}
                        >
                          ₹{val.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Field 5: Daily Withdrawal Limit Box */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  <FaInfoCircle />
                </div>
                <div>
                  <div className="text-xs font-black text-blue-900 leading-tight">
                    Daily withdrawal limit: ₹10,000
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
                    Minimum: ₹100 | Maximum: ₹10,000 per transaction
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl text-sm font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Withdraw</span>
                </button>
              </div>
            </form>
          </div>

          {/* CARD 2: BOTTOM 4 FEATURE / TRUST BADGES */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Badge 1: Instant Withdrawal */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-base shadow-xs shrink-0">
                  <FaBolt />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    Instant Withdrawal
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    Get money in seconds
                  </div>
                </div>
              </div>

              {/* Badge 2: Bank Level Security */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-base shadow-xs shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    Bank Level Security
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    Your data is protected
                  </div>
                </div>
              </div>

              {/* Badge 3: Low Charges */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-base shadow-xs shrink-0">
                  <span className="font-black text-sm">₹</span>
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    Low Charges
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    Minimal service fees
                  </div>
                </div>
              </div>

              {/* Badge 4: 24/7 Support */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-base shadow-xs shrink-0">
                  <FaHeadset />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0a1e4d] leading-none">
                    24/7 Support
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 mt-1">
                    We are always here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6 min-w-0">
          {/* CARD 1: ACCOUNT INFORMATION */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <FaUniversity />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">
                  Account Information
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowBankModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition cursor-pointer"
              >
                Change Bank
              </button>
            </div>

            {/* Account Profile Preview */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#0a2885] text-white flex items-center justify-center text-lg shadow-xs shrink-0">
                <FaUniversity />
              </div>
              <div>
                <div className="text-base font-black text-[#0a1e4d] font-mono tracking-wider">
                  XXXX XXXX 4321
                </div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">
                  {selectedBank.name}
                </div>
              </div>
            </div>

            {/* Available Balance Box */}
            <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Available Balance
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xl font-black text-[#0a1e4d] font-mono">
                    ₹ {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                  <button
                    type="button"
                    onClick={handleRefreshBalance}
                    className={`text-slate-400 hover:text-blue-600 transition cursor-pointer p-1 ${isRefreshing ? "animate-spin text-blue-600" : ""
                      }`}
                    title="Refresh Balance"
                  >
                    <FaSyncAlt size={12} />
                  </button>
                </div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5">
                  Last updated: {lastUpdated}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowStatementModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl transition shadow-2xs shrink-0 flex items-center gap-1.5 cursor-pointer justify-center"
              >
                <span>View Statement</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          {/* CARD 2: IMPORTANT INFORMATION */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                <FaInfoCircle />
              </div>
              <h3 className="text-sm font-black text-[#0a1e4d]">
                Important Information
              </h3>
            </div>

            {/* Checklist */}
            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">
                  <FaCheck />
                </div>
                <span>Enter correct Aadhaar number linked with bank account.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">
                  <FaCheck />
                </div>
                <span>Ensure your finger is properly placed on the biometric device.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">
                  <FaCheck />
                </div>
                <span>Minimum withdrawal amount is ₹100.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">
                  <FaCheck />
                </div>
                <span>Maximum ₹10,000 per transaction.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">
                  <FaCheck />
                </div>
                <span>In case of any issue, please contact support.</span>
              </div>
            </div>
          </div>

          {/* CARD 3: 100% SECURE TRANSACTIONS BANNER */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#dbeafe] via-[#eff6ff] to-[#dbeafe] border border-blue-200/90 p-5 shadow-2xs flex items-center gap-4 overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute -right-6 -bottom-8 w-36 h-36 rounded-full bg-blue-300/30 blur-xl pointer-events-none"></div>

            {/* 3D Shield Graphic */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-xl shadow-md border-2 border-white shrink-0">
              <FaShieldAlt />
            </div>

            <div className="flex-1 min-w-0 z-10">
              <div className="text-sm font-black text-[#0a1e4d]">
                100% Secure Transactions
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                Your money is safe with bank level security.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: SELECT BANK MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1e4d]">Select Bank</h3>
              <button
                onClick={() => setShowBankModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                placeholder="Search by bank name..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
              {filteredBanks.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBank(b);
                    setShowBankModal(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${selectedBank.id === b.id
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-slate-100 hover:bg-slate-50 text-slate-700"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] shrink-0 font-bold"
                      style={{ backgroundColor: b.logoColor }}
                    >
                      <FaUniversity size={12} />
                    </div>
                    <span>{b.name}</span>
                  </div>
                  {selectedBank.id === b.id && (
                    <FaCheckCircle className="text-blue-600" size={14} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: MINI STATEMENT MODAL */}
      {showStatementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0a1e4d]">
                  Mini Statement
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedBank.name} • A/C: XXXX XXXX 4321
                </p>
              </div>
              <button
                onClick={() => setShowStatementModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1 mb-4">
              {mockMiniStatement.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#0a1e4d]">{st.type}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {st.date} • RRN: {st.rrn}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-slate-900">
                      {st.amount}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80">
                      {st.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowStatementModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Close Statement
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: BIOMETRIC SCAN POPUP */}
      {showBiometricModal && scanningState !== "not_found" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full border border-slate-100 text-center">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1e4d]">
                AePS Authentication
              </h3>
              <button
                onClick={() => {
                  setShowBiometricModal(false);
                  setScanningState("idle");
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Fingerprint Scanner Graphic */}
            <div className="my-6 relative flex items-center justify-center">
              <div
                className={`w-28 h-28 rounded-3xl flex items-center justify-center transition-all ${
                  scanningState === "scanning"
                    ? "bg-blue-50 ring-4 ring-blue-500/30 text-blue-600 animate-pulse scale-105"
                    : scanningState === "captured"
                    ? "bg-emerald-50 ring-4 ring-emerald-500/30 text-emerald-600 scale-105"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <FaFingerprint size={56} />
              </div>
            </div>

            <div className="text-sm font-bold text-slate-800 mb-1">
              {scanningState === "idle" && "Place Finger on Biometric Scanner"}
              {scanningState === "scanning" && "Scanning Biometric Data..."}
              {scanningState === "captured" && "Fingerprint Captured! Verifying with UIDAI..."}
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Device: Mantra MFS100 / Morpho Ready
            </p>

            {scanningState === "idle" ? (
              <button
                type="button"
                onClick={handleStartFingerprintScan}
                className="w-full py-3 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <FaFingerprint size={14} />
                <span>Capture Fingerprint</span>
              </button>
            ) : (
              <div className="w-full py-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REUSABLE CUSTOMER NOT FOUND MODAL */}
      <CustomerNotFoundModal
        isOpen={showBiometricModal && scanningState === "not_found"}
        onClose={() => {
          setShowBiometricModal(false);
          setScanningState("idle");
        }}
        title="Customer Not Found"
        description={`The details you entered do not match with our records.\nPlease check the Consumer Number / Account Number and try again.`}
      />
    </div>
  );
}
