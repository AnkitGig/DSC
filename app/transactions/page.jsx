"use client";

import React, { useEffect, useState } from "react";
import {
  FaHistory,
  FaSearch,
  FaArrowDown,
  FaArrowUp,
  FaFilter,
  FaFileExport,
  FaPrint,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaWallet,
  FaMobileAlt,
  FaTv,
  FaUniversity,
  FaIdCard,
  FaTicketAlt,
} from "react-icons/fa";
import { MdOutlineReceiptLong, MdFileDownload } from "react-icons/md";

// Standard Sample Ledger for new/existing retailers
const defaultTransactions = [
  {
    _id: "TXN-982910",
    txnId: "DSC-TXN-982910",
    date: "2026-09-11T16:20:00.000Z",
    type: "credit",
    category: "Commission",
    service: "Mobile Recharge",
    description: "Retailer Commission for Jio Recharge ₹299 (9876543210)",
    amount: 8.97,
    closingBalance: 45280.0,
    status: "Success",
  },
  {
    _id: "TXN-982909",
    txnId: "DSC-TXN-982909",
    date: "2026-09-11T16:19:30.000Z",
    type: "debit",
    category: "Recharge",
    service: "Jio Prepaid",
    description: "Recharge 9876543210 (28 Days Plan)",
    amount: 299.0,
    closingBalance: 45271.03,
    status: "Pending",
  },
  {
    _id: "TXN-982885",
    txnId: "DSC-TXN-982885",
    date: "2026-09-11T14:40:00.000Z",
    type: "debit",
    category: "OTT",
    service: "Disney+ Hotstar",
    description: "Super Annual Subscription Voucher generated for 9123456780",
    amount: 899.0,
    closingBalance: 45570.03,
    status: "Pending",
  },
  {
    _id: "TXN-982840",
    txnId: "DSC-TXN-982840",
    date: "2026-09-11T11:15:00.000Z",
    type: "credit",
    category: "Wallet Topup",
    service: "PG Inward",
    description: "Online Wallet Load via UPI (Ref: 425519829012)",
    amount: 10000.0,
    closingBalance: 46469.03,
    status: "Success",
  },
  {
    _id: "TXN-982810",
    txnId: "DSC-TXN-982810",
    date: "2026-09-10T18:30:00.000Z",
    type: "debit",
    category: "Payout",
    service: "Bank Withdrawal",
    description: "IMPS Payout to SBI A/C ...8219 (UTR: 425488192019)",
    amount: 15000.0,
    closingBalance: 36469.03,
    status: "Pending",
  },
  {
    _id: "TXN-982750",
    txnId: "DSC-TXN-982750",
    date: "2026-09-10T12:10:00.000Z",
    type: "debit",
    category: "Aadhaar",
    service: "Biometric KYC Verification",
    description: "Aadhaar Address Verification Service charge",
    amount: 50.0,
    closingBalance: 51469.03,
    status: "Pending",
  },
  {
    _id: "TXN-982680",
    txnId: "DSC-TXN-982680",
    date: "2026-09-09T17:45:00.000Z",
    type: "debit",
    category: "Recharge",
    service: "Airtel DTH",
    description: "DTH Smartcard Recharge 3004829102",
    amount: 450.0,
    closingBalance: 51519.03,
    status: "Pending",
  },
  {
    _id: "TXN-982610",
    txnId: "DSC-TXN-982610",
    date: "2026-09-08T09:30:00.000Z",
    type: "credit",
    category: "Wallet Topup",
    service: "Admin Credit",
    description: "Direct Distributor Bank Transfer Approved",
    amount: 25000.0,
    closingBalance: 51969.03,
    status: "Success",
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState("all"); // 'all', 'credit', 'debit'
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // 'all', 'today', '7days'

  // Receipt Modal State
  const [receiptModal, setReceiptModal] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
        if (!token || !userId) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/users/transactions/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.transactions && data.transactions.length > 0) {
            const formatted = data.transactions.map((t) => ({
              ...t,
              status: t.type === "credit" ? "Success" : (t.status || "Pending"),
            }));
            setTransactions(formatted);
          }
        }
      } catch (err) {
        console.error("Error fetching transactions", err);
      }
      setLoading(false);
    }
    fetchTransactions();
  }, []);

  // Filtered List
  const filteredList = transactions.filter((txn) => {
    const matchType = typeFilter === "all" || txn.type === typeFilter;
    const matchCategory =
      categoryFilter === "all" ||
      (txn.category && txn.category.toLowerCase() === categoryFilter.toLowerCase());

    const matchSearch =
      !searchQuery ||
      (txn.txnId && txn.txnId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (txn.description && txn.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (txn.service && txn.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (txn._id && txn._id.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchDate = true;
    if (dateFilter === "today") {
      const txnDate = new Date(txn.date).toDateString();
      const today = new Date().toDateString();
      matchDate = txnDate === today;
    } else if (dateFilter === "7days") {
      const txnTime = new Date(txn.date).getTime();
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      matchDate = txnTime >= sevenDaysAgo;
    }

    return matchType && matchCategory && matchSearch && matchDate;
  });

  // Calculate Metrics
  const totalCredit = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const totalDebit = transactions
    .filter((t) => t.type === "debit")
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const handleExportCSV = () => {
    const headers = ["Txn ID,Date,Type,Category,Service,Description,Amount,Status\n"];
    const rows = filteredList.map(
      (t) =>
        `"${t.txnId || t._id}","${new Date(t.date).toLocaleString()}","${t.type}","${
          t.category || "General"
        }","${t.service || "-"}","${(t.description || "").replace(/"/g, '""')}","${t.amount}","${
          t.status || "Success"
        }"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DSC_Transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const getCategoryIcon = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("recharge")) return <FaMobileAlt className="text-blue-600" />;
    if (c.includes("ott")) return <FaTv className="text-purple-600" />;
    if (c.includes("payout") || c.includes("bank"))
      return <FaUniversity className="text-emerald-600" />;
    if (c.includes("aadhaar")) return <FaIdCard className="text-amber-600" />;
    return <FaWallet className="text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 md:ml-64 p-4 md:p-6 text-slate-800 font-sans">
      {/* Top Header */}
      <div className="mb-5 pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MdOutlineReceiptLong className="text-blue-600" size={24} />
            <span>Transaction Passbook & Statement</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete account ledger, recharge debits, wallet loads & commission records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs"
          >
            <MdFileDownload size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {/* Total Inflow */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Credits (Inflow)
            </span>
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FaArrowDown size={11} />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-black text-emerald-700">
            +₹{totalCredit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Wallet Loads & Commissions</span>
        </div>

        {/* Total Outflow */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Debits (Outflow)
            </span>
            <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center">
              <FaArrowUp size={11} />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-black text-rose-600">
            -₹{totalDebit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Services & Payouts</span>
        </div>

        {/* Net Volume */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Net Volume
            </span>
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaWallet size={11} />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-black text-blue-700">
            ₹{(totalCredit - totalDebit).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Account Balance Flow</span>
        </div>

        {/* Total Records */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Records
            </span>
            <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
              <FaHistory size={11} />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-black text-slate-900">
            {transactions.length}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Logged Transactions</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Quick Tabs: All, Credits, Debits */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                typeFilter === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setTypeFilter("credit")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                typeFilter === "credit"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Credits (+)
            </button>
            <button
              onClick={() => setTypeFilter("debit")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                typeFilter === "debit"
                  ? "bg-rose-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Debits (-)
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Select */}
            <select
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Services</option>
              <option value="Recharge">Recharge</option>
              <option value="OTT">OTT Subscriptions</option>
              <option value="Payout">Bank Payout</option>
              <option value="Aadhaar">Aadhaar Services</option>
              <option value="Wallet Topup">Wallet Topup</option>
              <option value="Commission">Commission</option>
            </select>

            {/* Date Select */}
            <select
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
            </select>

            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search Txn / Description..."
                className="pl-7 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3 text-center">Type</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No transactions found for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredList.map((t) => {
                  const isCredit = t.type === "credit";
                  const formattedDate = new Date(t.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const formattedTime = new Date(t.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={t._id || t.txnId} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                        <span className="font-semibold text-slate-800 block">{formattedDate}</span>
                        <span className="text-[11px] text-slate-400">{formattedTime}</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                        {t.txnId || t._id}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[11px] border border-slate-200">
                          {getCategoryIcon(t.category)}
                          <span>{t.category || "General"}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 max-w-xs">
                        <span className="line-clamp-1">{t.description || t.service || "Funds added"}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isCredit
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {isCredit ? <FaArrowDown size={9} /> : <FaArrowUp size={9} />}
                          <span>{t.type}</span>
                        </span>
                      </td>
                      <td
                        className={`py-3 px-3 text-right font-black text-sm whitespace-nowrap ${
                          isCredit ? "text-emerald-700" : "text-rose-600"
                        }`}
                      >
                        {isCredit ? "+" : "-"}₹{(t.amount || 0).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {t.type === "credit" || t.status?.toLowerCase() === "success" ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <FaCheckCircle size={9} />
                            <span>Success</span>
                          </span>
                        ) : t.status?.toLowerCase() === "failed" ? (
                          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <FaTimesCircle size={9} />
                            <span>Failed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <FaClock size={9} />
                            <span>Pending</span>
                          </span>
                        )}
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Showing {filteredList.length} of {transactions.length} entries
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>For support:</span>
            <span className="font-semibold text-slate-700">teamdigitalservicecenter@gmail.com</span>
            <span>|</span>
            <span className="font-semibold text-slate-700">+91-9285356192</span>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 border border-slate-200">
            <div className="text-center pb-3 border-b border-slate-100">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  receiptModal.type === "credit" || receiptModal.status?.toLowerCase() === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : receiptModal.status?.toLowerCase() === "failed"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {receiptModal.type === "credit" || receiptModal.status?.toLowerCase() === "success" ? (
                  <FaCheckCircle size={20} />
                ) : receiptModal.status?.toLowerCase() === "failed" ? (
                  <FaTimesCircle size={20} />
                ) : (
                  <FaClock size={20} />
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">Transaction Receipt</h3>
              <p className="text-xs text-slate-500 font-mono">
                Txn ID: {receiptModal.txnId || receiptModal._id}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 my-4 pb-2 border-b border-slate-100">
              <div className="flex justify-between">
                <span>Status:</span>
                <span
                  className={`font-bold ${
                    receiptModal.type === "credit" || receiptModal.status?.toLowerCase() === "success"
                      ? "text-emerald-600"
                      : receiptModal.status?.toLowerCase() === "failed"
                      ? "text-rose-600"
                      : "text-amber-600"
                  }`}
                >
                  {receiptModal.type === "credit" ? "Success" : (receiptModal.status || "Pending")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-semibold text-slate-800">
                  {new Date(receiptModal.date).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-bold text-slate-900">
                  {receiptModal.category || "General"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span
                  className={`font-bold uppercase ${
                    receiptModal.type === "credit" ? "text-emerald-700" : "text-rose-600"
                  }`}
                >
                  {receiptModal.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Description:</span>
                <span className="font-medium text-slate-800 text-right max-w-[180px] line-clamp-2">
                  {receiptModal.description || receiptModal.service || "-"}
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 text-sm">
                <span>Amount:</span>
                <span
                  className={
                    receiptModal.type === "credit" ? "text-emerald-700" : "text-rose-600"
                  }
                >
                  ₹{(receiptModal.amount || 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaPrint size={11} />
                <span>Print</span>
              </button>
              <button
                onClick={() => setReceiptModal(null)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
