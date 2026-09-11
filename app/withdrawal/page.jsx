"use client";

import React, { useState } from "react";
import {
  FaUniversity,
  FaWallet,
  FaCheckCircle,
  FaHistory,
  FaSearch,
  FaBolt,
  FaShieldAlt,
  FaPrint,
  FaCopy,
  FaExchangeAlt,
  FaBuilding,
  FaInfoCircle,
} from "react-icons/fa";
import { MdOutlineAccountBalance, MdOutlineQrCode } from "react-icons/md";
import { RiBankFill, RiQrCodeLine } from "react-icons/ri";

const savedBeneficiaries = [
  {
    id: "b1",
    name: "Ram Chandra Sharma",
    bank: "State Bank of India",
    account: "30291088219",
    ifsc: "SBIN0001244",
    branch: "Connaught Place, New Delhi",
    isPrimary: true,
  },
  {
    id: "b2",
    name: "Ram Chandra Sharma",
    bank: "HDFC Bank",
    account: "50100291092811",
    ifsc: "HDFC0000060",
    branch: "Kailash Colony, New Delhi",
    isPrimary: false,
  },
];

const mockWithdrawalHistory = [
  {
    sr: 1,
    txnId: "DSC-PO-992810",
    utr: "425519829102",
    name: "Ram Chandra Sharma",
    bank: "State Bank of India (A/C ...8219)",
    mode: "IMPS (Instant)",
    amount: 15000,
    fee: 5.0,
    netDebited: 15005.0,
    date: "11/09/2026 15:40",
    status: "Success",
  },
  {
    sr: 2,
    txnId: "DSC-PO-992801",
    utr: "425501892019",
    name: "Ram Chandra Sharma",
    bank: "HDFC Bank (A/C ...2811)",
    mode: "IMPS (Instant)",
    amount: 25000,
    fee: 10.0,
    netDebited: 25010.0,
    date: "10/09/2026 18:20",
    status: "Success",
  },
  {
    sr: 3,
    txnId: "DSC-PO-992750",
    utr: "425488102941",
    name: "Ram Chandra Sharma",
    bank: "State Bank of India (A/C ...8219)",
    mode: "NEFT",
    amount: 50000,
    fee: 0.0,
    netDebited: 50000.0,
    date: "08/09/2026 12:10",
    status: "Success",
  },
];

const WithdrawalPage = () => {
  const [payoutMode, setPayoutMode] = useState("bank"); // 'bank' or 'upi'
  const [transferType, setTransferType] = useState("IMPS"); // 'IMPS' or 'NEFT'

  const [form, setForm] = useState({
    name: "Ram Chandra Sharma",
    account: "30291088219",
    confirmAccount: "30291088219",
    ifsc: "SBIN0001244",
    bankName: "State Bank of India",
    upiId: "",
    amount: "5000",
  });

  const [walletBalance] = useState(45280.0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptModal, setReceiptModal] = useState(null);
  const [copiedUtr, setCopiedUtr] = useState(false);

  // History & Filters
  const [history, setHistory] = useState(mockWithdrawalHistory);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectBeneficiary = (b) => {
    setForm({
      ...form,
      name: b.name,
      account: b.account,
      confirmAccount: b.account,
      ifsc: b.ifsc,
      bankName: b.bank,
    });
  };

  const calculateFee = () => {
    const amt = Number(form.amount) || 0;
    if (amt <= 0) return 0;
    if (transferType === "NEFT") return 0;
    if (amt <= 1000) return 3.0;
    if (amt <= 25000) return 5.0;
    return 10.0;
  };

  const handlePayoutSubmit = (e) => {
    e.preventDefault();
    const amt = Number(form.amount);

    if (amt < 100) {
      alert("Minimum withdrawal amount is ₹100");
      return;
    }

    if (amt > walletBalance) {
      alert("Insufficient wallet balance for this withdrawal");
      return;
    }

    if (payoutMode === "bank") {
      if (form.account !== form.confirmAccount) {
        alert("Account Number and Confirm Account Number do not match");
        return;
      }
      if (!form.ifsc || form.ifsc.length < 11) {
        alert("Please enter a valid 11-character IFSC Code");
        return;
      }
    } else {
      if (!form.upiId || !form.upiId.includes("@")) {
        alert("Please enter a valid UPI ID (e.g. mobile@upi)");
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fee = calculateFee();
      const newTxn = {
        sr: history.length + 1,
        txnId: `DSC-PO-${Math.floor(100000 + Math.random() * 900000)}`,
        utr: `4255${Math.floor(10000000 + Math.random() * 90000000)}`,
        name: form.name,
        bank:
          payoutMode === "bank"
            ? `${form.bankName || "Bank"} (A/C ...${form.account.slice(-4)})`
            : `UPI (${form.upiId})`,
        mode: payoutMode === "bank" ? `${transferType} (Instant)` : "UPI Instant",
        amount: amt,
        fee: fee,
        netDebited: amt + fee,
        date:
          new Date().toLocaleDateString("en-GB") +
          " " +
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Success",
      };

      setHistory([newTxn, ...history]);
      setReceiptModal(newTxn);
    }, 1200);
  };

  const filteredHistory = history.filter((item) => {
    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    const matchSearch =
      !searchQuery ||
      item.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.utr.includes(searchQuery) ||
      item.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 md:ml-64 p-4 md:p-6 text-slate-800 font-sans">
      {/* Top Header */}
      <div className="mb-5 pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FaUniversity className="text-blue-600" />
            <span>Bank Settlement & Wallet Withdrawal</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant 24x7 IMPS / NEFT payout to registered bank account or UPI ID.
          </p>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FaWallet size={18} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Available Balance
            </span>
            <span className="text-lg font-black text-slate-900">
              ₹{walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Form + Right Saved Beneficiaries & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6 items-start">
        {/* Left Column: Payout Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setPayoutMode("bank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                payoutMode === "bank"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <RiBankFill size={14} />
              <span>Bank Account Transfer</span>
            </button>

            <button
              type="button"
              onClick={() => setPayoutMode("upi")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                payoutMode === "upi"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <RiQrCodeLine size={14} />
              <span>Instant UPI (VPA)</span>
            </button>
          </div>

          <form onSubmit={handlePayoutSubmit} className="space-y-4">
            {payoutMode === "bank" ? (
              <>
                {/* Beneficiary Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name as per bank records"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Account Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bank Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter bank account number"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={form.account}
                      onChange={(e) => setForm({ ...form, account: e.target.value })}
                    />
                  </div>

                  {/* Confirm Account Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Re-enter bank account number"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={form.confirmAccount}
                      onChange={(e) => setForm({ ...form, confirmAccount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* IFSC Code */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bank IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={11}
                      required
                      placeholder="e.g. SBIN0001244"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold font-mono uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={form.ifsc}
                      onChange={(e) =>
                        setForm({ ...form, ifsc: e.target.value.toUpperCase() })
                      }
                    />
                  </div>

                  {/* Transfer Mode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Transfer Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTransferType("IMPS")}
                        className={`py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          transferType === "IMPS"
                            ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        IMPS (Instant)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTransferType("NEFT")}
                        className={`py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          transferType === "NEFT"
                            ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        NEFT (Zero Fee)
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* UPI Transfer Form */
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Virtual Payment Address (UPI ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mobile@upi or username@okhdfcbank"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                  value={form.upiId}
                  onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                />
              </div>
            )}

            {/* Withdrawal Amount */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Withdrawal Amount (₹) <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Min: ₹100 | Max: ₹2,00,000</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="100"
                  max="200000"
                  step="1"
                  required
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {[1000, 2500, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setForm({ ...form, amount: String(amt) })}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      form.amount === String(amt)
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, amount: String(Math.floor(walletBalance)) })}
                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                >
                  Full Balance
                </button>
              </div>
            </div>

            {/* Price & Settlement Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Requested Amount:</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{Number(form.amount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payout Fee ({transferType}):</span>
                <span className="font-mono font-semibold text-slate-900">
                  ₹{calculateFee().toFixed(2)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-slate-900">
                <span>Net Debited from Wallet:</span>
                <span className="text-blue-700 font-mono text-sm">
                  ₹{(Number(form.amount || 0) + calculateFee()).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaBolt size={12} />
              <span>
                {isProcessing
                  ? "Processing Payout..."
                  : `Withdraw ₹${Number(form.amount || 0).toLocaleString()} to Bank`}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Saved Accounts & Guidelines (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Saved Bank Accounts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-xs font-bold text-slate-900 mb-2.5 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Saved Settlement Accounts</span>
              <span className="text-[11px] text-blue-600 font-semibold">Verified</span>
            </h2>

            <div className="space-y-2">
              {savedBeneficiaries.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleSelectBeneficiary(b)}
                  className={`p-3 rounded-lg border text-xs transition cursor-pointer flex items-start justify-between ${
                    form.account === b.account
                      ? "bg-blue-50/70 border-blue-600 ring-1 ring-blue-600 shadow-2xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{b.bank}</span>
                      {b.isPrimary && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-slate-600">A/C: {b.account}</p>
                    <p className="text-[11px] text-slate-400">
                      IFSC: {b.ifsc} • {b.branch}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Use
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs pb-1 border-b border-slate-100">
              <FaShieldAlt className="text-emerald-600" />
              <span>Settlement Rules & Security</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-[11px] text-slate-500 leading-relaxed">
              <li>
                <strong className="text-slate-700">IMPS Transfers:</strong> Credited instantly 24x7 including bank holidays.
              </li>
              <li>
                <strong className="text-slate-700">NEFT Transfers:</strong> Processed within 30-45 minutes with zero transfer fee.
              </li>
              <li>
                Ensure beneficiary account details match your registered KYC name.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Withdrawal Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FaHistory className="text-blue-600 text-xs" />
            <span className="text-xs font-bold text-slate-800">Recent Payout Settlements</span>
            <span className="text-[11px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              {filteredHistory.length} records
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>

            <div className="relative">
              <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search Txn ID / UTR / Account..."
                className="pl-7 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Txn ID</th>
                <th className="py-3 px-3">UTR Number</th>
                <th className="py-3 px-3">Beneficiary & Bank</th>
                <th className="py-3 px-3">Mode</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-right">Fee</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No payout records found.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((t) => (
                  <tr key={t.txnId} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 text-slate-500">{t.sr}</td>
                    <td className="py-3 px-3 text-slate-600">{t.date}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{t.txnId}</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">{t.utr}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">{t.name}</span>
                      <span className="text-[11px] text-slate-400">{t.bank}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{t.mode}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      ₹{t.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500">₹{t.fee.toFixed(2)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <FaCheckCircle size={9} />
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setReceiptModal(t)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded transition cursor-pointer"
                        title="View Receipt"
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

      {/* Payout Success Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 border border-slate-200">
            <div className="text-center pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <FaCheckCircle size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Payout Transfer Initiated</h3>
              <p className="text-xs text-slate-500 font-mono">Txn ID: {receiptModal.txnId}</p>
            </div>

            {/* UTR Box */}
            <div className="my-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Bank UTR Reference Number
              </span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-black font-mono text-blue-700">
                  {receiptModal.utr}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(receiptModal.utr);
                    setCopiedUtr(true);
                    setTimeout(() => setCopiedUtr(false), 2000);
                  }}
                  className="p-1 text-slate-500 hover:text-blue-600 cursor-pointer"
                  title="Copy UTR"
                >
                  <FaCopy size={12} />
                </button>
              </div>
              {copiedUtr && (
                <span className="text-[10px] font-bold text-emerald-600 block mt-1">
                  ✓ Copied to clipboard
                </span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-2 border-b border-slate-100">
              <div className="flex justify-between">
                <span>Beneficiary:</span>
                <span className="font-bold text-slate-900">{receiptModal.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Bank / Destination:</span>
                <span className="font-semibold text-slate-800">{receiptModal.bank}</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer Mode:</span>
                <span>{receiptModal.mode}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{receiptModal.date}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1">
                <span>Amount Transferred:</span>
                <span className="text-emerald-700 font-mono">
                  ₹{receiptModal.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setReceiptModal(null)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalPage;
