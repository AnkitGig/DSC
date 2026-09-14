"use client";

import React, { useState } from "react";
import {
  FaUniversity as IconUniversity,
  FaWallet as IconWallet,
  FaShieldAlt as IconShield,
  FaInfoCircle as IconInfo,
  FaCheckCircle as IconCheckCircle,
  FaExchangeAlt as IconExchange,
  FaSyncAlt as IconSync,
  FaUser as IconUser,
  FaHashtag as IconHashtag,
  FaCreditCard as IconCreditCard,
  FaCheck as IconCheck,
} from "react-icons/fa";

const initialRequests = [
  { id: "WR-9021", date: "14 Sep 2026", name: "Ankit", bank: "State Bank of India", account: "XXXX XXXX 4321", ifsc: "SBIN0001234", amount: "₹2,500.00", status: "Pending" },
  { id: "WR-8842", date: "10 Sep 2026", name: "Ankit", bank: "HDFC Bank", account: "XXXX XXXX 9812", ifsc: "HDFC0005678", amount: "₹5,000.00", status: "Approved" },
  { id: "WR-8109", date: "02 Sep 2026", name: "Ankit", bank: "ICICI Bank", account: "XXXX XXXX 3310", ifsc: "ICIC0009102", amount: "₹1,200.00", status: "Approved" },
];

export default function WithdrawRequest() {
  const [form, setForm] = useState({
    name: "",
    ifscCode: "",
    accountNumber: "",
    amount: "",
  });

  const [balance, setBalance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Today, 10:32 AM");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [recentTxn, setRecentTxn] = useState(null);
  const [requestsList, setRequestsList] = useState(initialRequests);

  const fetchBalance = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || sessionStorage.getItem("token")
          : null;
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId") || sessionStorage.getItem("userId")
          : null;
      if (!token || !userId) return;

      const res = await fetch(`/api/users/profile/${userId}`, {
        headers: { Authorization: token },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user && data.user.wallet_balance !== undefined) {
          setBalance(data.user.wallet_balance);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchBalance();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "ifscCode" ? value.toUpperCase() : value,
    }));
  };

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    await fetchBalance();
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(
        "Today, " +
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }
    if (!form.ifscCode.trim() || form.ifscCode.trim().length < 4) {
      setMessage("Please enter a valid IFSC code.");
      return;
    }
    if (!form.accountNumber.trim() || form.accountNumber.trim().length < 8) {
      setMessage("Please enter a valid account number.");
      return;
    }
    const amt = Number(form.amount);
    if (!amt || isNaN(amt) || amt <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    if (amt > balance) {
      setMessage("Insufficient wallet balance.");
      return;
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || sessionStorage.getItem("token")
        : null;
    const userId =
      typeof window !== "undefined"
        ? localStorage.getItem("userId") || sessionStorage.getItem("userId")
        : null;

    setLoading(true);
    setMessage("");

    try {
      if (token && userId) {
        const res = await fetch("/api/wallet/deduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            userId,
            amount: amt,
            serviceName: "Withdraw Request",
            description: `Withdraw Request payout to A/C XXXX${form.accountNumber.slice(-4)} (${form.ifscCode})`,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.error || "Failed to process withdrawal request deduction.");
          setLoading(false);
          return;
        }
        if (data.balance !== undefined) {
          setBalance(data.balance);
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth-change"));
        }
      } else {
        setBalance((prev) => Math.max(0, prev - amt));
      }

      setLoading(false);
      const newReq = {
        id: `WR-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        name: form.name,
        bank: "Bank Transfer",
        account: `XXXX XXXX ${form.accountNumber.slice(-4)}`,
        ifsc: form.ifscCode,
        amount: `₹${amt.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        status: "Pending",
      };

      setRecentTxn(newReq);
      setRequestsList((prev) => [newReq, ...prev]);
      setShowSuccessModal(true);

      // Reset Form
      setForm({
        name: "",
        ifscCode: "",
        accountNumber: "",
        amount: "",
      });
    } catch (err) {
      setMessage(err.message || "Withdrawal request failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans">
      {/* 1. TOP HEADER & BREADCRUMBS */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              Withdraw Request
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Submit a request to transfer your wallet funds directly to your bank account.
            </p>
          </div>

          {/* Top Right: Promo Banner */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#dbeafe] via-[#e0f2fe] to-[#bfdbfe] border border-blue-200/80 px-5 py-3.5 shadow-2xs flex items-center gap-4 overflow-hidden max-w-md">
            <div className="w-10 h-10 rounded-2xl bg-[#1d68f6] text-white flex items-center justify-center text-lg shadow-md shrink-0">
              <IconUniversity />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-black text-[#0a1e4d] leading-tight">
                Direct Bank Payout
              </div>
              <div className="text-xs font-bold text-blue-700 mt-0.5">
                Fast Processing • 100% Safe & Secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID (7 Cols Left, 5 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* WITHDRAW REQUEST FORM CARD */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
            {/* Card Title */}
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base shrink-0 shadow-2xs">
                <IconUniversity />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#0a1e4d] tracking-tight">
                  Withdraw Request
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Enter bank details to proceed with payout
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FIELD 1: NAME */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                    <IconUser />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                  />
                </div>
              </div>

              {/* FIELD 2: IFSC CODE */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  IFSC Code
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                    <IconHashtag />
                  </div>
                  <input
                    type="text"
                    name="ifscCode"
                    value={form.ifscCode}
                    onChange={handleChange}
                    placeholder="Enter IFSC code"
                    required
                    maxLength={11}
                    className="w-full pl-10 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono uppercase text-slate-800 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                  />
                </div>
              </div>

              {/* FIELD 3: ACCOUNT NUMBER */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Account Number
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                    <IconCreditCard />
                  </div>
                  <input
                    type="text"
                    name="accountNumber"
                    value={form.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono text-slate-800 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                  />
                </div>
              </div>

              {/* FIELD 4: AMOUNT */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 font-bold text-sm pointer-events-none">
                    ₹
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                    required
                    min="1"
                    className="w-full pl-9 pr-4 py-3 bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm font-bold font-mono text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition shadow-2xs"
                  />
                </div>
              </div>

              {/* Error / Alert Message */}
              {message && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                  {message}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-[0.99] text-white rounded-2xl text-sm font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Request...</span>
                    </span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* CARD 1: WALLET OVERVIEW */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <IconWallet />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">
                  Wallet Overview
                </h3>
              </div>
              <button
                type="button"
                onClick={handleRefreshBalance}
                className={`text-slate-400 hover:text-blue-600 transition cursor-pointer p-1 ${
                  isRefreshing ? "animate-spin text-blue-600" : ""
                }`}
                title="Refresh Balance"
              >
                <IconSync size={12} />
              </button>
            </div>

            {/* Available Balance Display */}
            <div className="bg-gradient-to-br from-[#0a1e4d] to-[#123985] text-white rounded-2xl p-4 shadow-sm">
              <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                Available Wallet Balance
              </div>
              <div className="text-2xl font-black font-mono mt-1">
                ₹ {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-blue-300 mt-1 font-medium">
                Last updated: {lastUpdated}
              </div>
            </div>
          </div>

          {/* CARD 2: RECENT WITHDRAW REQUESTS */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                  <IconExchange />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">
                  Recent Requests
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {requestsList.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#0a1e4d]">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      A/C: {item.account} • {item.ifsc}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.date} • {item.id}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black font-mono text-slate-900">
                      {item.amount}
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                        item.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 3: GUIDELINES */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0">
                <IconInfo />
              </div>
              <h3 className="text-sm font-black text-[#0a1e4d]">
                Guidelines
              </h3>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                  <IconCheck />
                </div>
                <span>Double-check IFSC code & bank account number before submitting.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                  <IconCheck />
                </div>
                <span>Withdrawal requests are processed within 24 business hours.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && recentTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full border border-slate-100 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <IconCheckCircle size={28} />
            </div>

            <h3 className="text-lg font-black text-[#0a1e4d]">
              Request Submitted!
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Your withdraw request has been sent for processing.
            </p>

            <div className="my-4 text-2xl font-black text-slate-900 font-mono">
              {recentTxn.amount}
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-xs space-y-2 text-left mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Request ID:</span>
                <span className="font-mono font-bold text-blue-600">{recentTxn.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account Name:</span>
                <span className="font-bold text-slate-800">{recentTxn.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account No:</span>
                <span className="font-mono font-bold text-slate-800">{recentTxn.account}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">IFSC Code:</span>
                <span className="font-mono font-bold text-slate-800">{recentTxn.ifsc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Status:</span>
                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {recentTxn.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
