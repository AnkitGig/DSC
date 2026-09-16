"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaMobileAlt,
  FaUser,
  FaSearch,
  FaPaperPlane,
  FaCheckCircle,
  FaRegCreditCard,
  FaCheck,
  FaTimes,
  FaHistory,
  FaBullhorn,
} from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import CustomerNotFoundModal from "@/components/CustomerNotFoundModal";

const initialSavedBeneficiaries = [
];

const initialRecentTransfers = [

];

export default function MoneyTransfer() {
  const [activeTab, setActiveTab] = useState("bank"); // 'bank', 'mobile', 'self'
  const [form, setForm] = useState({
    beneficiaryName: "",
    accountNumber: "",
    ifscCode: "",
    mobileNumber: "",
    selfAccount: "HDFC Bank - XX1092",
    amount: "",
    remarks: "",
  });

  const [savedBeneficiaries, setSavedBeneficiaries] = useState(initialSavedBeneficiaries);
  const [recentTransfers, setRecentTransfers] = useState(initialRecentTransfers);

  // Modals
  const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({ name: "", bank: "", accountNumber: "", ifsc: "" });
  const [showFindIfscModal, setShowFindIfscModal] = useState(false);
  const [selectedIfscBank, setSelectedIfscBank] = useState("SBI");
  const [showCustomerNotFoundModal, setShowCustomerNotFoundModal] = useState(false);
  const [transferReceipt, setTransferReceipt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Quick Amount Select
  const handleAmountSelect = (val) => {
    setForm((prev) => ({ ...prev, amount: val }));
  };

  // Select a saved beneficiary to autofill
  const handleSelectBeneficiary = (b) => {
    setActiveTab("bank");
    setForm((prev) => ({
      ...prev,
      beneficiaryName: b.name,
      accountNumber: b.accountNumber,
      ifscCode: b.ifsc,
    }));
  };

  // Handle Transfer Submission
  const handleProceedTransfer = (e) => {
    if (e) e.preventDefault();

    if (activeTab === "bank") {
      if (!form.beneficiaryName.trim()) {
        alert("Please enter the Beneficiary Name");
        return;
      }
      if (!form.accountNumber.trim()) {
        alert("Please enter the Bank Account Number");
        return;
      }
      if (!form.ifscCode.trim()) {
        alert("Please enter the IFSC Code");
        return;
      }
    } else if (activeTab === "mobile") {
      if (!form.mobileNumber.trim()) {
        alert("Please enter a valid Mobile Number or UPI ID");
        return;
      }
    }

    const amt = parseFloat(form.amount);
    if (!amt || isNaN(amt) || amt <= 0) {
      alert("Please enter a valid transfer amount");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCustomerNotFoundModal(true);
    }, 1000);
  };

  // Add new beneficiary
  const handleAddNewBeneficiary = (e) => {
    e.preventDefault();
    if (!newBeneficiary.name || !newBeneficiary.accountNumber) return;

    const initials = newBeneficiary.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const created = {
      id: "b_" + Date.now(),
      initials: initials || "NB",
      name: newBeneficiary.name,
      bank: newBeneficiary.bank || "Bank Account",
      accountNumber: newBeneficiary.accountNumber,
      ifsc: newBeneficiary.ifsc || "SBIN0001000",
      avatarBg: "bg-[#e9d8fd] text-[#7c3aed]",
    };

    setSavedBeneficiaries([created, ...savedBeneficiaries]);
    setShowAddBeneficiaryModal(false);
    setNewBeneficiary({ name: "", bank: "", accountNumber: "", ifsc: "" });
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans">

      {/* 2. BREADCRUMBS & PAGE HEADER SECTION */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              Money Transfer
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              Send money instantly, securely and 24x7 with DSC PAY.
            </p>
          </div>

          {/* 3 Header Feature Stat Cards */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Card 1: Instant Transfer */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs min-w-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                <FaBolt />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d] leading-none">
                  Instant Transfer
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

            {/* Card 3: All Banks */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs min-w-[165px]">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0">
                <FaUsers />
              </div>
              <div>
                <div className="text-xs font-black text-[#0a1e4d] leading-none">
                  All Banks
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1">
                  UPI, IMPS, NEFT, RTGS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN 2-COLUMN GRID (7 cols Left, 5 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: TRANSFER FORM & SUPPORTED BANKS ================= */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-5 min-w-0">
          {/* CARD: MONEY TRANSFER FORM */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
            {/* Top 3 Tabs: To Bank Account / To Mobile (UPI) / To Self Account */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#f1f5f9] rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("bank")}
                className={`py-3 px-2 sm:px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer ${activeTab === "bank"
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <RiBankFill size={16} />
                <span className="whitespace-nowrap">To Bank Account</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={`py-3 px-2 sm:px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer ${activeTab === "mobile"
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <FaMobileAlt size={15} />
                <span className="whitespace-nowrap">To Mobile (UPI)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("self")}
                className={`py-3 px-2 sm:px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer ${activeTab === "self"
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <FaUser size={14} />
                <span className="whitespace-nowrap">To Self Account</span>
              </button>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleProceedTransfer} className="space-y-4">
              {activeTab === "bank" && (
                <>
                  {/* Field 1: Beneficiary Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Beneficiary Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.beneficiaryName}
                        onChange={(e) =>
                          setForm({ ...form, beneficiaryName: e.target.value })
                        }
                        placeholder="Enter beneficiary name (as per bank records)"
                        className="w-full pl-4 pr-11 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                        <FaUser size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Field 2: Bank Account Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Bank Account Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <FaRegCreditCard size={15} />
                      </div>
                      <input
                        type="text"
                        value={form.accountNumber}
                        onChange={(e) =>
                          setForm({ ...form, accountNumber: e.target.value })
                        }
                        placeholder="Enter bank account number"
                        className="w-full pl-10 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold font-mono text-slate-800 placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                      />
                    </div>
                  </div>

                  {/* Field 3: IFSC Code */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        IFSC Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowFindIfscModal(true)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
                      >
                        Find IFSC
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <FaSearch size={14} />
                      </div>
                      <input
                        type="text"
                        value={form.ifscCode}
                        onChange={(e) =>
                          setForm({ ...form, ifscCode: e.target.value.toUpperCase() })
                        }
                        placeholder="Enter IFSC code"
                        maxLength={11}
                        className="w-full pl-10 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono uppercase text-slate-800 placeholder:font-sans placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "mobile" && (
                <>
                  {/* Field 1: Mobile Number / UPI ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number or Virtual Payment Address (UPI)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.mobileNumber}
                        onChange={(e) =>
                          setForm({ ...form, mobileNumber: e.target.value })
                        }
                        placeholder="Enter 10-digit mobile number or upi@id"
                        className="w-full pl-4 pr-11 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                        <FaMobileAlt size={16} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "self" && (
                <>
                  {/* Field 1: Select Self Bank Account */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Choose Your Registered Bank Account
                    </label>
                    <select
                      value={form.selfAccount}
                      onChange={(e) =>
                        setForm({ ...form, selfAccount: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="HDFC Bank - XX1092">HDFC Bank (A/C: •••• 1092) - Primary</option>
                      <option value="SBI Bank - XX8821">State Bank of India (A/C: •••• 8821)</option>
                      <option value="ICICI Bank - XX4419">ICICI Bank (A/C: •••• 4419)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Field: Transfer Amount with Quick Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Transfer Amount
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-sm pointer-events-none">
                      ₹
                    </div>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                    />
                  </div>

                  {/* Quick Select Amount Chips */}
                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-0.5">
                    {["500", "1,000", "2,000", "5,000"].map((amt) => {
                      const cleanVal = amt.replace(",", "");
                      const isSelected = form.amount === cleanVal;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleAmountSelect(cleanVal)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${isSelected
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-[#eff6ff] hover:bg-blue-100/70 text-blue-600 border border-blue-100"
                            }`}
                        >
                          ₹{amt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Field: Remarks (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Remarks <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    This will be shown to the receiver
                  </span>
                </div>
                <input
                  type="text"
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                  placeholder="e.g. Rent, Payment, etc."
                  className="w-full px-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>

              {/* Action Button: Proceed to Transfer */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl text-sm font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>Proceed to Transfer</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* CARD: SUPPORTED BANKS (Adaptive Responsive Grid - Fits perfectly without clipping) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="text-sm font-black text-[#0a1e4d]">
                Supported Banks
              </div>
              <button
                type="button"
                onClick={() => setShowFindIfscModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition flex items-center gap-1 cursor-pointer"
              >
                <span>View All Banks</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Bank Cards Adaptive Grid (3 cols on standard laptops, 6 cols on ultra-wide) */}
            <div className="grid grid-cols-3 2xl:grid-cols-6 gap-2.5">
              {/* SBI */}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, ifscCode: "SBIN0001244" }))}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-2xs rounded-2xl transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <circle cx="12" cy="12" r="11" fill="#0077c8" />
                  <circle cx="12" cy="10" r="3.6" fill="#ffffff" />
                  <rect x="10.8" y="10" width="2.4" height="8.5" fill="#ffffff" />
                </svg>
                <span className="text-xs font-bold text-[#0a1e4d] whitespace-nowrap">SBI</span>
              </button>

              {/* HDFC Bank */}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, ifscCode: "HDFC0000128" }))}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-2xs rounded-2xl transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <rect width="24" height="24" rx="3" fill="#004c8f" />
                  <rect x="5" y="2" width="14" height="3" fill="#ed232a" />
                  <rect x="5" y="19" width="14" height="3" fill="#ed232a" />
                  <rect x="2" y="5" width="3" height="14" fill="#ed232a" />
                  <rect x="19" y="5" width="3" height="14" fill="#ed232a" />
                  <rect x="6" y="6" width="12" height="12" fill="#ffffff" />
                  <rect x="9" y="9" width="6" height="6" fill="#004c8f" />
                </svg>
                <span className="text-xs font-bold text-[#0a1e4d] whitespace-nowrap">HDFC Bank</span>
              </button>

              {/* ICICI Bank */}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, ifscCode: "ICIC0000004" }))}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-2xs rounded-2xl transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <circle cx="12" cy="12" r="11" fill="#a81c1d" />
                  <circle cx="12" cy="7" r="1.8" fill="#f37023" />
                  <path d="M10 10.5h4v6.5h-4z" fill="#ffffff" />
                  <path d="M13.5 10.5C14.5 11.5 15 12.8 15 14.5c0 2.5-1.5 4.5-4 4.5-1.5 0-3-.8-3.8-2l1.6-1.1c.5.8 1.3 1.2 2.2 1.2 1.4 0 2.2-1.1 2.2-2.6 0-1.1-.4-2-1.2-2.7l1.5-1.3z" fill="#f37023" />
                </svg>
                <span className="text-xs font-bold text-[#0a1e4d] whitespace-nowrap">ICICI Bank</span>
              </button>

              {/* Axis Bank */}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, ifscCode: "UTIB0000054" }))}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-2xs rounded-2xl transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path d="M12 3 L3 20 L8.5 20 L12 13 L15.5 20 L21 20 Z" fill="#97144d" />
                </svg>
                <span className="text-xs font-bold text-[#0a1e4d] whitespace-nowrap">Axis Bank</span>
              </button>

              {/* PNB */}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, ifscCode: "PUNB0019200" }))}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-2xs rounded-2xl transition shrink-0 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <rect width="24" height="24" rx="4" fill="#a20a3a" />
                  <path d="M7 6h6a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3v3H7V6zm3 3v4h3a2 2 0 0 0 0-4h-3z" fill="#fbbf24" />
                  <circle cx="13" cy="11" r="1.5" fill="#a20a3a" />
                </svg>
                <span className="text-xs font-bold text-[#0a1e4d] whitespace-nowrap">PNB</span>
              </button>

              {/* Bank of Baroda */}
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, ifscCode: "BARB0CONNAU" }))}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-2xs rounded-2xl transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path d="M4 6.5C4 6.5 8 4.2 13.5 7.5C18.5 10.5 20 16 20 18C18 18 13.5 16 9.5 13C5.5 10 4 6.5 4 6.5Z" fill="#f26522" />
                  <path d="M7.5 11.5C7.5 11.5 10.5 9.5 14.5 12.5C18.5 15.5 18 19 18 19C16 19 12 17 9 15C6.5 13.2 7.5 11.5 7.5 11.5Z" fill="#f97316" />
                </svg>
                <span className="text-xs font-bold text-[#0a1e4d] whitespace-nowrap">Bank of Baroda</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PROMO BANNER, SAVED BENEFICIARIES, RECENT TRANSFERS ================= */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6 min-w-0">
          {/* 1. PROMO HERO CARD: SEND MONEY ANYWHERE */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] to-[#dbeafe] border border-blue-200/90 shadow-2xs overflow-hidden min-h-[210px] p-6 flex items-center justify-between">
            {/* Background Decorative Rings */}
            <div className="absolute -right-6 -bottom-10 w-44 h-44 rounded-full bg-blue-300/30 blur-2xl pointer-events-none"></div>
            <div className="absolute right-14 top-2 w-28 h-28 rounded-full bg-blue-400/20 blur-xl pointer-events-none"></div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[62%]">
              <h3 className="text-lg sm:text-xl font-black text-[#0a1e4d] leading-tight">
                Send Money Anywhere
              </h3>
              <p className="text-xs font-bold text-blue-600 mt-1 mb-3">
                Fast. Secure. Reliable.
              </p>

              <ul className="space-y-1.5 text-[11px] font-bold text-slate-700">
                <li className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] shrink-0">
                    <FaCheck />
                  </div>
                  <span>Transfer to all major banks</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] shrink-0">
                    <FaCheck />
                  </div>
                  <span>Low transaction charges</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] shrink-0">
                    <FaCheck />
                  </div>
                  <span>Instant confirmation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1d68f6] text-white flex items-center justify-center text-[8px] shrink-0">
                    <FaCheck />
                  </div>
                  <span>24/7 service</span>
                </li>
              </ul>
            </div>

            {/* Right Graphic Mockup (3D Phone + Floating Plane & Coin) */}
            <div className="relative w-32 h-44 shrink-0 flex items-center justify-center select-none pointer-events-none">
              {/* Paper Plane Floating Top Right */}
              <div className="absolute top-1 right-2 text-blue-500 transform rotate-12 drop-shadow-md z-20 animate-pulse">
                <FaPaperPlane size={24} />
              </div>

              {/* Blue Rupee Coin Floating Left */}
              <div className="absolute bottom-4 left-0 w-8 h-8 rounded-full bg-[#1d68f6] text-white flex items-center justify-center font-black text-xs shadow-md border-2 border-white z-20">
                ₹
              </div>

              {/* Smartphone Bezel */}
              <div className="w-24 h-40 bg-[#071536] rounded-2xl p-1.5 shadow-xl transform rotate-[-4deg] border border-slate-700/50 flex flex-col justify-between">
                <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto mb-1"></div>
                {/* Screen Content */}
                <div className="flex-1 bg-white rounded-xl p-1.5 flex flex-col items-center justify-center text-center shadow-inner">
                  <img
                    src="/assets/logo1.png"
                    alt="DSC PAY Logo"
                    className="h-6 w-auto object-contain mb-1"
                  />
                  <span className="text-[7px] font-extrabold text-[#0a1e4d] leading-none">
                    DSC PAY
                  </span>
                  <div className="mt-2 w-full bg-blue-50 rounded p-0.5 text-[6px] text-blue-600 font-bold">
                    Fast IMPS
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full border border-slate-700 mx-auto mt-1"></div>
              </div>
            </div>
          </div>

          {/* 2. CARD: SAVED BENEFICIARIES (Exact 5 Grid Columns) */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <FaUser />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">
                  Saved Beneficiaries
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowAddBeneficiaryModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition cursor-pointer"
              >
                <span>View All</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* 5 Equal Columns Grid with clean spacing and responsive text */}
            <div className="grid grid-cols-5 gap-1 text-center">
              {savedBeneficiaries.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleSelectBeneficiary(b)}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer px-0.5"
                  title={`Transfer to ${b.name} (${b.bank})`}
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${b.avatarBg} flex items-center justify-center font-black text-xs sm:text-sm group-hover:scale-105 group-hover:shadow-md transition-all shadow-2xs`}
                  >
                    {b.initials}
                  </div>
                  <div className="text-center w-full">
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#0a1e4d] leading-tight truncate">
                      {b.name}
                    </div>
                    <div className="text-[9.5px] sm:text-[10px] font-medium text-slate-400 leading-tight truncate mt-0.5">
                      {b.bank}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Beneficiary Button */}
              <div
                onClick={() => setShowAddBeneficiaryModal(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer px-0.5"
                title="Add New Beneficiary"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-blue-400 text-blue-600 flex items-center justify-center text-xl sm:text-2xl font-light hover:border-blue-600 hover:bg-blue-50/50 transition-all">
                  +
                </div>
                <div className="text-center w-full">
                  <div className="text-[10px] sm:text-[11px] font-bold text-blue-600 leading-tight truncate">
                    Add New
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] font-medium text-transparent leading-tight select-none mt-0.5">
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CARD: RECENT TRANSFERS */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <FaHistory />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">
                  Recent Transfers
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

            {/* Transactions List */}
            <div className="space-y-3.5">
              {recentTransfers.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 p-2 hover:bg-slate-50 rounded-2xl transition"
                >
                  {/* Left: Avatar + Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full ${tx.color} font-black text-xs flex items-center justify-center shadow-2xs shrink-0`}
                    >
                      {tx.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#0a1e4d] truncate">
                        {tx.name}
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 truncate">
                        {tx.details}
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount, Date & Status Badge */}
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div>
                      <div className="text-xs font-black text-[#0a1e4d]">
                        ₹{tx.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] font-medium text-slate-400">
                        {tx.date}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tx.status === "Success"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200/80"
                        : "bg-rose-50 text-rose-600 border border-rose-200/80"
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

      {/* MODAL: ADD NEW BENEFICIARY */}
      {showAddBeneficiaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1e4d]">
                Add New Beneficiary
              </h3>
              <button
                onClick={() => setShowAddBeneficiaryModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleAddNewBeneficiary} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Beneficiary Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newBeneficiary.name}
                  onChange={(e) =>
                    setNewBeneficiary({ ...newBeneficiary, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Bank of India"
                  value={newBeneficiary.bank}
                  onChange={(e) =>
                    setNewBeneficiary({ ...newBeneficiary, bank: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 30291088219"
                  value={newBeneficiary.accountNumber}
                  onChange={(e) =>
                    setNewBeneficiary({
                      ...newBeneficiary,
                      accountNumber: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SBIN0001244"
                  value={newBeneficiary.ifsc}
                  onChange={(e) =>
                    setNewBeneficiary({
                      ...newBeneficiary,
                      ifsc: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono uppercase text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBeneficiaryModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Save Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FIND IFSC CODE */}
      {showFindIfscModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full border border-slate-100">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1e4d]">
                Find Bank IFSC Code
              </h3>
              <button
                onClick={() => setShowFindIfscModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Bank
                </label>
                <select
                  value={selectedIfscBank}
                  onChange={(e) => setSelectedIfscBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="SBI">State Bank of India (SBI)</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="AXIS">Axis Bank</option>
                  <option value="PNB">Punjab National Bank (PNB)</option>
                  <option value="BOB">Bank of Baroda</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Branch City
                </label>
                <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none">
                  <option>New Delhi - Main Branch</option>
                  <option>Mumbai - Fort</option>
                  <option>Bangalore - MG Road</option>
                  <option>Kolkata - Park Street</option>
                  <option>Chennai - Mount Road</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase">
                  Suggested IFSC
                </div>
                <div className="text-base font-black text-blue-700 font-mono mt-0.5">
                  {selectedIfscBank === "SBI"
                    ? "SBIN0001244"
                    : selectedIfscBank === "HDFC"
                      ? "HDFC0000128"
                      : selectedIfscBank === "ICICI"
                        ? "ICIC0000004"
                        : selectedIfscBank === "AXIS"
                          ? "UTIB0000054"
                          : selectedIfscBank === "PNB"
                            ? "PUNB0019200"
                            : "BARB0CONNAU"}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const ifsc =
                    selectedIfscBank === "SBI"
                      ? "SBIN0001244"
                      : selectedIfscBank === "HDFC"
                        ? "HDFC0000128"
                        : selectedIfscBank === "ICICI"
                          ? "ICIC0000004"
                          : selectedIfscBank === "AXIS"
                            ? "UTIB0000054"
                            : selectedIfscBank === "PNB"
                              ? "PUNB0019200"
                              : "BARB0CONNAU";
                  setForm({ ...form, ifscCode: ifsc });
                  setShowFindIfscModal(false);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Use this IFSC Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CUSTOMER NOT FOUND */}
      <CustomerNotFoundModal
        isOpen={showCustomerNotFoundModal}
        onClose={() => setShowCustomerNotFoundModal(false)}
        title="Customer Not Found"
        description="The details you entered do not match with our records.&#10;Please check the Account Number / IFSC Code and try again."
      />
    </div>
  );
}
