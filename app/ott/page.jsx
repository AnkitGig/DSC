"use client";

import React, { useState } from "react";
import {
  FaTv,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPrint,
  FaCopy,
  FaFileExport,
} from "react-icons/fa";
import { MdOutlineConfirmationNumber } from "react-icons/md";

// Standard Operators & Real Retailer Plans
const ottProviders = [
  {
    id: "hotstar",
    name: "Disney+ Hotstar",
    code: "HOTSTAR",
    image: "/assets/ott/hotstar.svg",
    plans: [
      { id: "h1", name: "Mobile (3 Months)", validity: "3 Months", price: 149, comm: "₹7.50" },
      { id: "h2", name: "Super (Annual - TV+Phone)", validity: "12 Months", price: 899, comm: "₹45.00" },
      { id: "h3", name: "Premium (Annual - 4K 4 Screens)", validity: "12 Months", price: 1499, comm: "₹75.00" },
    ],
  },
  {
    id: "sonyliv",
    name: "Sony LIV",
    code: "SONYLIV",
    image: "/assets/ott/sonyliv.svg",
    plans: [
      { id: "s1", name: "LIV Premium (1 Month)", validity: "1 Month", price: 299, comm: "₹15.00" },
      { id: "s2", name: "LIV Premium (6 Months)", validity: "6 Months", price: 699, comm: "₹35.00" },
      { id: "s3", name: "LIV Premium (12 Months)", validity: "12 Months", price: 999, comm: "₹50.00" },
    ],
  },
  {
    id: "zee5",
    name: "ZEE5 Premium",
    code: "ZEE5",
    image: "/assets/ott/zee5.svg",
    plans: [
      { id: "z1", name: "ZEE5 Premium (1 Month)", validity: "1 Month", price: 199, comm: "₹10.00" },
      { id: "z2", name: "ZEE5 Premium (6 Months)", validity: "6 Months", price: 599, comm: "₹30.00" },
      { id: "z3", name: "ZEE5 Premium 4K (12 Months)", validity: "12 Months", price: 899, comm: "₹45.00" },
    ],
  },
  {
    id: "jiocinema",
    name: "JioCinema Premium",
    code: "JIOCINEMA",
    image: "/assets/ott/jiocinema.svg",
    plans: [
      { id: "j1", name: "Premium Individual (1 Month)", validity: "1 Month", price: 29, comm: "₹1.50" },
      { id: "j2", name: "Family Pack 4-Screens (1 Month)", validity: "1 Month", price: 89, comm: "₹4.50" },
      { id: "j3", name: "Premium (12 Months)", validity: "12 Months", price: 299, comm: "₹15.00" },
    ],
  },
  {
    id: "sunnxt",
    name: "Sun NXT",
    code: "SUNNXT",
    image: "/assets/ott/sunnxt.svg",
    plans: [
      { id: "sn1", name: "Basic Mobile (1 Month)", validity: "1 Month", price: 120, comm: "₹6.00" },
      { id: "sn2", name: "All Screens Annual (12 Months)", validity: "12 Months", price: 799, comm: "₹40.00" },
    ],
  },
  {
    id: "altbalaji",
    name: "ALT Balaji",
    code: "ALTBALAJI",
    image: "/assets/ott/altbalaji.svg",
    plans: [
      { id: "a1", name: "Club Pack (2 Months)", validity: "2 Months", price: 100, comm: "₹5.00" },
      { id: "a2", name: "Club Pack (6 Months)", validity: "6 Months", price: 199, comm: "₹10.00" },
      { id: "a3", name: "Club Pack (12 Months)", validity: "12 Months", price: 300, comm: "₹15.00" },
    ],
  },
  {
    id: "shemaroome",
    name: "ShemarooMe",
    code: "SHEMAROO",
    image: "/assets/ott/shemaroome.svg",
    plans: [
      { id: "sh1", name: "All Access (1 Month)", validity: "1 Month", price: 149, comm: "₹7.50" },
      { id: "sh2", name: "All Access Annual (12 Months)", validity: "12 Months", price: 499, comm: "₹25.00" },
    ],
  },
  {
    id: "erosnow",
    name: "Eros Now",
    code: "EROSNOW",
    image: "/assets/ott/erosnow.svg",
    plans: [
      { id: "e1", name: "Plus Monthly (1 Month)", validity: "1 Month", price: 99, comm: "₹5.00" },
      { id: "e2", name: "Premium Annual (12 Months)", validity: "12 Months", price: 399, comm: "₹20.00" },
    ],
  },
  {
    id: "hungama",
    name: "Hungama Play",
    code: "HUNGAMA",
    image: "/assets/ott/hungama.svg",
    plans: [
      { id: "hu1", name: "Play Pro (1 Month)", validity: "1 Month", price: 99, comm: "₹5.00" },
      { id: "hu2", name: "Play Pro (12 Months)", validity: "12 Months", price: 499, comm: "₹25.00" },
    ],
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
    date: "11/09/2026 14:22",
    status: "Success",
  },
  {
    sr: 2,
    txnId: "DSC-OTT-782909",
    operator: "Sony LIV",
    planName: "LIV Premium (12 Months)",
    validity: "12 Months",
    mobile: "9123456780",
    email: "anil.verma@yahoo.com",
    amount: 999,
    comm: "₹50.00",
    voucher: "SONY-999-4412-MK",
    date: "11/09/2026 11:40",
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
    date: "10/09/2026 16:15",
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

const OTTPage = () => {
  const [selectedOperator, setSelectedOperator] = useState(ottProviders[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(ottProviders[0].plans[0].id);
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter Bar State
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [transactions, setTransactions] = useState(initialTransactions);
  const [receiptModal, setReceiptModal] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentOp = ottProviders.find((op) => op.id === selectedOperator) || ottProviders[0];
  const currentPlan = currentOp.plans.find((p) => p.id === selectedPlanId) || currentOp.plans[0];

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
      alert("Please enter a valid 10-digit mobile number");
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
        date: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Success",
      };

      setTransactions([newTxn, ...transactions]);
      setReceiptModal(newTxn);
      setCustomerMobile("");
      setCustomerEmail("");
    }, 1000);
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
    <div className="min-h-screen bg-slate-50 md:ml-64 p-4 md:p-6 text-slate-800 font-sans">
      {/* Page Title Header */}
      <div className="mb-5 pb-3 border-b border-slate-200">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FaTv className="text-blue-600" />
          <span>OTT Subscriptions & Vouchers</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Select streaming operator, choose plan, and generate instant activation voucher code.
        </p>
      </div>

      {/* Main Grid: Left Form Card + Right Operator Quick Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        {/* Left Column: Voucher Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>New Subscription Request</span>
            <span className="text-xs font-semibold text-blue-600">Wallet Mode</span>
          </h2>

          <form onSubmit={handlePurchase} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Operator Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select OTT Operator <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  value={selectedOperator}
                  onChange={(e) => handleOperatorChange(e.target.value)}
                >
                  {ottProviders.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Plan / Validity <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Mobile */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Customer Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="Enter 10 digit number"
                    className="w-full pl-11 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                    value={customerMobile}
                    onChange={(e) =>
                      setCustomerMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                </div>
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Customer Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Price & Margin Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500 block">Payable Amount:</span>
                <span className="text-base font-black text-slate-900">₹{currentPlan.price}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Retailer Margin:</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +{currentPlan.comm}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing..." : `Buy Subscription ₹${currentPlan.price}`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerMobile("");
                  setCustomerEmail("");
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Operator Quick Cards (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">
              Select Operator ({ottProviders.length})
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">Click to select</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {ottProviders.map((op) => {
              const isSelected = selectedOperator === op.id;
              return (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => handleOperatorChange(op.id)}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between gap-1.5 min-h-[78px] ${isSelected
                      ? "bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/20 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
                    }`}
                >
                  <div className="w-full flex-1 flex items-center justify-center p-1">
                    <img
                      src={op.image}
                      alt={op.name}
                      className="max-h-7 max-w-[85px] w-auto h-auto object-contain rounded drop-shadow-xs"
                    />
                  </div>
                  <span
                    className={`text-[10px] leading-tight line-clamp-1 font-bold ${isSelected ? "text-blue-700" : "text-slate-700"
                      }`}
                  >
                    {op.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transaction History Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">Transaction History</span>
            <span className="text-[11px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
              {filteredTxns.length} records
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            {/* Search Box */}
            <div className="relative">
              <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search Mobile / Txn / Voucher..."
                className="pl-7 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Txn ID</th>
                <th className="py-3 px-3">Operator</th>
                <th className="py-3 px-3">Plan / Validity</th>
                <th className="py-3 px-3">Mobile No</th>
                <th className="py-3 px-3">Voucher Code</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTxns.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No transaction records found.
                  </td>
                </tr>
              ) : (
                filteredTxns.map((t) => (
                  <tr key={t.txnId} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 text-slate-500">{t.sr}</td>
                    <td className="py-3 px-3 text-slate-600">{t.date}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{t.txnId}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{t.operator}</td>
                    <td className="py-3 px-3 text-slate-700">{t.planName}</td>
                    <td className="py-3 px-3 font-mono text-slate-900 font-bold">{t.mobile}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 w-fit">
                        <span>{t.voucher}</span>
                        <button
                          onClick={() => handleCopyCode(t.voucher)}
                          className="text-slate-400 hover:text-blue-700 cursor-pointer ml-1"
                          title="Copy Code"
                        >
                          <FaCopy size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">₹{t.amount}</td>
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

      {/* Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 border border-slate-200">
            <div className="text-center pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <FaCheckCircle size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Transaction Successful</h3>
              <p className="text-xs text-slate-500 font-mono">Txn ID: {receiptModal.txnId}</p>
            </div>

            {/* Voucher Code Box */}
            <div className="my-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Subscription Voucher Code
              </span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-black font-mono text-blue-700">
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

            {/* Details Table */}
            <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-2 border-b border-slate-100">
              <div className="flex justify-between">
                <span>Operator:</span>
                <span className="font-bold text-slate-900">{receiptModal.operator}</span>
              </div>
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-semibold text-slate-800">{receiptModal.planName}</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile:</span>
                <span className="font-mono font-bold text-slate-900">{receiptModal.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{receiptModal.date}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1">
                <span>Amount Paid:</span>
                <span className="text-emerald-700">₹{receiptModal.amount}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setReceiptModal(null)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTTPage;
