"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaMobileAlt,
  FaTv,
  FaSearch,
  FaCheckCircle,
  FaRedoAlt,
  FaBolt,
  FaShieldAlt,
  FaWallet,
  FaTimes,
  FaChevronRight,
  FaHistory,
  FaPhoneAlt,
  FaCopy,
} from "react-icons/fa";
import { MdOutlineFlashOn, MdVerifiedUser } from "react-icons/md";

// Indian Operators Info with Real Brand Colors
const mobileOperators = [
  { id: "Jio", name: "Jio Prepaid", brandColor: "bg-[#0a2885] text-white", short: "Jio" },
  { id: "Airtel", name: "Airtel Prepaid", brandColor: "bg-[#ed1c24] text-white", short: "Airtel" },
  { id: "Vi", name: "Vodafone Idea", brandColor: "bg-[#d32f2f] text-white", short: "Vi" },
  { id: "BSNL", name: "BSNL Prepaid", brandColor: "bg-[#0288d1] text-white", short: "BSNL" },
  { id: "MTNL", name: "MTNL Dolphin", brandColor: "bg-[#00897b] text-white", short: "MTNL" },
];

const dthOperators = [
  { id: "Tata Play", name: "Tata Play", brandColor: "bg-[#9c27b0] text-white", short: "Tata Play" },
  { id: "Airtel Digital TV", name: "Airtel DTH", brandColor: "bg-[#ed1c24] text-white", short: "Airtel DTH" },
  { id: "Dish TV", name: "Dish TV", brandColor: "bg-[#ff6f00] text-white", short: "Dish TV" },
  { id: "D2H", name: "Videocon D2H", brandColor: "bg-[#1565c0] text-white", short: "D2H" },
  { id: "Sun Direct", name: "Sun Direct", brandColor: "bg-[#ef6c00] text-white", short: "Sun Direct" },
];

const circlesList = [
  "Delhi NCR",
  "Mumbai",
  "Maharashtra & Goa",
  "Gujarat",
  "UP East",
  "UP West",
  "Bihar & Jharkhand",
  "West Bengal",
  "Kolkata",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Madhya Pradesh & CG",
  "Karnataka",
  "Tamil Nadu",
  "Andhra Pradesh & Telangana",
  "Kerala",
  "Odisha",
  "Assam & North East",
];

// Curated Real Plans for Operators
const planCategories = [
  { id: "popular", name: "Recommended" },
  { id: "unlimited", name: "Truly Unlimited" },
  { id: "data", name: "Data Add-ons" },
  { id: "annual", name: "Annual Plans" },
  { id: "talktime", name: "Top-up Talktime" },
];

const plansDatabase = {
  popular: [
    {
      amount: 299,
      validity: "28 Days",
      data: "1.5 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "Unlimited 5G Data included + Free Subscriptions",
      badge: "MOST POPULAR",
    },
    {
      amount: 349,
      validity: "28 Days",
      data: "2.0 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "Hero Unlimited Plan + High Speed 5G Access",
      badge: "HERO PLAN",
    },
    {
      amount: 666,
      validity: "70 Days",
      data: "1.5 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "Best value medium duration unlimited pack",
      badge: "BEST VALUE",
    },
  ],
  unlimited: [
    {
      amount: 719,
      validity: "72 Days",
      data: "2.0 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "High-speed 2GB daily pack with OTT apps",
      badge: "SUPER VALUE",
    },
    {
      amount: 899,
      validity: "90 Days",
      data: "2.0 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "Quarterly Pack + 20GB extra bonus data",
      badge: "BONUS DATA",
    },
    {
      amount: 479,
      validity: "56 Days",
      data: "1.5 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "2-Month unlimited calls and daily data pack",
      badge: "",
    },
  ],
  data: [
    {
      amount: 19,
      validity: "Base Plan",
      data: "1.0 GB",
      calls: "N/A",
      sms: "N/A",
      perks: "Instant high-speed emergency data pack",
      badge: "POPULAR",
    },
    {
      amount: 29,
      validity: "Base Plan",
      data: "2.0 GB",
      calls: "N/A",
      sms: "N/A",
      perks: "2GB 4G/5G high-speed data booster",
      badge: "",
    },
    {
      amount: 65,
      validity: "Base Plan",
      data: "4.0 GB",
      calls: "N/A",
      sms: "N/A",
      perks: "4GB Extra Data Pack with unlimited 5G boost",
      badge: "VALUE",
    },
    {
      amount: 181,
      validity: "30 Days",
      data: "30.0 GB",
      calls: "N/A",
      sms: "N/A",
      perks: "Bulk 30GB Work-from-Home data voucher",
      badge: "WORK FROM HOME",
    },
  ],
  annual: [
    {
      amount: 2999,
      validity: "365 Days",
      data: "2.5 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "365 Days 912GB Total Data + OTT Bundle",
      badge: "MEGA SAVER",
    },
    {
      amount: 3599,
      validity: "365 Days",
      data: "2.0 GB/Day",
      calls: "Unlimited Calls",
      sms: "100 SMS/Day",
      perks: "1 Year Disney+ Hotstar Subscription Included",
      badge: "HOTSTAR VIP",
    },
  ],
  talktime: [
    {
      amount: 10,
      validity: "Unlimited",
      data: "N/A",
      calls: "₹7.47 Talktime",
      sms: "Standard",
      perks: "Main balance talktime with unlimited validity",
      badge: "",
    },
    {
      amount: 50,
      validity: "Unlimited",
      data: "N/A",
      calls: "₹39.37 Talktime",
      sms: "Standard",
      perks: "Standard Talktime Topup Balance",
      badge: "",
    },
    {
      amount: 100,
      validity: "Unlimited",
      data: "N/A",
      calls: "₹81.75 Talktime",
      sms: "Standard",
      perks: "Full Value Top-up Recharge Balance",
      badge: "BEST SELLER",
    },
  ],
};

const mockRecentRecharges = [
  {
    id: "TXN-882910",
    number: "9876543210",
    operator: "Jio",
    circle: "Delhi NCR",
    amount: 299,
    date: "11 Sep 2026, 04:15 PM",
    status: "Success",
    type: "mobile",
  },
  {
    id: "TXN-882909",
    number: "9123456780",
    operator: "Airtel",
    circle: "Mumbai",
    amount: 349,
    date: "11 Sep 2026, 02:30 PM",
    status: "Success",
    type: "mobile",
  },
  {
    id: "TXN-882905",
    number: "3004829102",
    operator: "Tata Play",
    circle: "All India",
    amount: 450,
    date: "10 Sep 2026, 06:10 PM",
    status: "Success",
    type: "dth",
  },
  {
    id: "TXN-882894",
    number: "9450123456",
    operator: "BSNL",
    circle: "UP East",
    amount: 199,
    date: "09 Sep 2026, 11:20 AM",
    status: "Success",
    type: "mobile",
  },
];

const Recharge = ({ tabType }) => {
  const router = useRouter();
  const [tab, setTab] = useState(tabType || "mobile");

  const [form, setForm] = useState({
    mobile: "",
    operator: "Jio",
    circle: "Delhi NCR",
    subscriberId: "",
    amount: "299",
  });

  const [activePlanTab, setActivePlanTab] = useState("popular");
  const [processingModal, setProcessingModal] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [rechargesList, setRechargesList] = useState(mockRecentRecharges);

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (tabType && tab !== tabType) {
      setTab(tabType);
    }
  }, [tabType, tab]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    router.push(`/recharge/${newTab}`);
  };

  // Auto-detect operator on mobile number input
  const handleNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    let detectedOperator = form.operator;

    if (val.startsWith("98") || val.startsWith("99") || val.startsWith("96") || val.startsWith("97")) {
      detectedOperator = "Airtel";
    } else if (val.startsWith("70") || val.startsWith("79") || val.startsWith("63") || val.startsWith("89") || val.startsWith("88")) {
      detectedOperator = "Jio";
    } else if (val.startsWith("94") || val.startsWith("91")) {
      detectedOperator = "BSNL";
    } else if (val.startsWith("93") || val.startsWith("80") || val.startsWith("90")) {
      detectedOperator = "Vi";
    }

    setForm({
      ...form,
      mobile: val,
      operator: detectedOperator || form.operator,
    });
  };

  const handleInitiateRecharge = (e) => {
    e.preventDefault();
    const targetNum = tab === "mobile" ? form.mobile : form.subscriberId;
    if (!targetNum || targetNum.length < 8) {
      alert(`Please enter a valid ${tab === "mobile" ? "10-digit mobile number" : "Subscriber ID"}`);
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter or select a recharge amount");
      return;
    }

    setProcessingModal(true);
    setTimeout(() => {
      setProcessingModal(false);
      const newTxn = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        number: targetNum,
        operator: form.operator,
        circle: form.circle,
        amount: Number(form.amount),
        date: "Just now",
        status: "Success",
        type: tab,
      };
      setSuccessReceipt(newTxn);
      setRechargesList([newTxn, ...rechargesList]);
    }, 1500);
  };

  const currentOperatorObj = (tab === "mobile" ? mobileOperators : dthOperators).find(
    (op) => op.id === form.operator
  ) || mobileOperators[0];

  const currentPlans = plansDatabase[activePlanTab] || plansDatabase.popular;

  const filteredRecharges = rechargesList.filter((item) => {
    const matchesTab = item.type === tab;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      item.number.includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operator.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 md:ml-64 p-4 md:p-8 font-sans text-slate-800">
      {/* Top Header & Tab Navigation */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {tab === "mobile" ? "Mobile Prepaid Recharge" : "DTH Television Recharge"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time operator bill settlement & live plan browsing with instant wallet cashback.
          </p>
        </div>

        {/* Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start sm:self-auto">
          <button
            onClick={() => handleTabChange("mobile")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${tab === "mobile"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
          >
            <FaMobileAlt size={13} />
            <span>Mobile</span>
          </button>

          <button
            onClick={() => handleTabChange("dth")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${tab === "dth"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
          >
            <FaTv size={13} />
            <span>DTH TV</span>
          </button>
        </div>
      </div>

      {/* Modern 2-Column Split: Left Form Card + Right Plans Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
        {/* Left Column: Clean Recharge Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <h2 className="text-base font-extrabold text-slate-900">
              {tab === "mobile" ? "Recharge Details" : "DTH Account"}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
            </div>
          </div>

          <form onSubmit={handleInitiateRecharge} className="space-y-4">
            {/* Operator Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {tab === "mobile" ? "Select Telecom Operator" : "Select DTH Provider"}
              </label>
              <select
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                value={form.operator}
                onChange={(e) => setForm({ ...form, operator: e.target.value })}
              >
                {(tab === "mobile" ? mobileOperators : dthOperators).map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile / Subscriber Number Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {tab === "mobile" ? "Mobile Number" : "Subscriber ID / VC Number"}
              </label>
              <div className="relative">
                {tab === "mobile" ? (
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                    +91
                  </span>
                ) : (
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <FaTv size={14} />
                  </span>
                )}
                <input
                  type={tab === "mobile" ? "tel" : "text"}
                  maxLength={tab === "mobile" ? 10 : 16}
                  placeholder={tab === "mobile" ? "Enter 10 digit mobile" : "Enter smartcard number"}
                  className={`w-full ${tab === "mobile" ? "pl-12" : "pl-10"
                    } pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-mono`}
                  value={tab === "mobile" ? form.mobile : form.subscriberId}
                  onChange={
                    tab === "mobile"
                      ? handleNumberChange
                      : (e) => setForm({ ...form, subscriberId: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Circle Selector */}
            {tab === "mobile" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Circle / Region
                </label>
                <select
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  value={form.circle}
                  onChange={(e) => setForm({ ...form, circle: e.target.value })}
                >
                  {circlesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Amount Input with Currency */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Recharge Amount (₹)
                </label>
                <span className="text-[11px] text-blue-600 font-bold">
                  Wallet Payment
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-slate-400 text-base">
                  ₹
                </span>
                <input
                  type="number"
                  min="10"
                  step="1"
                  placeholder="299"
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono transition"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[239, 299, 349, 666, 899].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setForm({ ...form, amount: String(amt) })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${form.amount === String(amt)
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                    }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Big Action Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm tracking-wide shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {/* <FaBolt size={14} /> */}
              <span>Proceed to Recharge ₹{form.amount || "0"}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold pt-1">
              <FaShieldAlt className="text-emerald-500" />
              <span>100% Secure Transaction & Instant Operator Confirmation</span>
            </div>
          </form>
        </div>

        {/* Right Column: Live Plan Recommendations & Browser (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Browse {form.operator} Plans</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  Live Plans
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Circle: {form.circle}</p>
            </div>
          </div>

          {/* Plan Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
            {planCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActivePlanTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${activePlanTab === cat.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Plan Cards List */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {currentPlans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setForm({ ...form, amount: String(plan.amount) })}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${form.amount === String(plan.amount)
                  ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                  : "bg-slate-50/60 border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-sm"
                  }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl font-black text-slate-900">₹{plan.amount}</span>
                    {plan.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-bold">
                    <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-800">
                      Validity: {plan.validity}
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-800">
                      Data: {plan.data}
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-800">
                      {plan.calls}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    {plan.perks}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm({ ...form, amount: String(plan.amount) });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 self-start sm:self-auto ${form.amount === String(plan.amount)
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white hover:bg-blue-50 text-blue-600 border border-slate-300 hover:border-blue-400"
                    }`}
                >
                  {form.amount === String(plan.amount) ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Recharge Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaHistory size={14} />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Recent Recharge History</h3>
              <p className="text-xs text-slate-500">Live operator response & transaction receipts</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search number, txn id..."
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 md:px-6">Transaction ID</th>
                <th className="py-3.5 px-4">{tab === "mobile" ? "Mobile Number" : "Subscriber ID"}</th>
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 md:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecharges.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                    No recharge records found.
                  </td>
                </tr>
              ) : (
                filteredRecharges.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition">
                    <td className="py-3.5 px-4 md:px-6 font-mono font-bold text-slate-700">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {item.number}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{item.operator}</span>
                      <span className="text-[11px] text-slate-400 block">{item.circle}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{item.date}</td>
                    <td className="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                      ₹{item.amount}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-bold">
                        <FaCheckCircle size={10} />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 md:px-6 text-center">
                      <button
                        onClick={() => {
                          setForm({
                            ...form,
                            mobile: tab === "mobile" ? item.number : form.mobile,
                            subscriberId: tab === "dth" ? item.number : form.subscriberId,
                            operator: item.operator,
                            amount: String(item.amount),
                          });
                        }}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition"
                      >
                        <FaRedoAlt size={10} />
                        <span>Repeat</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Processing Animation Modal */}
      {processingModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-black text-slate-900 mb-1">Connecting to Operator...</h3>
            <p className="text-xs text-slate-500">
              Processing recharge of ₹{form.amount} on {form.operator} network.
            </p>
          </div>
        </div>
      )}

      {/* Success Receipt Modal */}
      {successReceipt && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center border border-slate-100 relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Recharge Successful!</h3>
            <span className="text-xs text-slate-500 font-mono block mb-5">
              Txn ID: {successReceipt.id}
            </span>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Mobile Number:</span>
                <span className="font-bold text-slate-900 font-mono">{successReceipt.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operator & Circle:</span>
                <span className="font-bold text-slate-900">{successReceipt.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-black text-emerald-700 text-sm">₹{successReceipt.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold text-blue-600">DSC Wallet</span>
              </div>
            </div>

            <button
              onClick={() => setSuccessReceipt(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition"
            >
              Done & Download Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recharge;
