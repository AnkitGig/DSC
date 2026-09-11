"use client";

import React, { useState } from "react";
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
} from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";

const cardOffers = [
  {
    id: "yes-bank",
    bank: "YES Bank",
    name: "YES Bank Prosperity Credit Card",
    image: "https://login.avfinpay.com/assets/images/lead-generation/YES%20bank.png",
    payout: "₹2,200",
    rating: "4.8",
    annualFee: "Zero Joining Fee",
    rewardRate: "5X Rewards on Dining & Travel",
    eligibility: {
      salaried: "Min ₹30,000 / month salary (last 3 months slip)",
      selfEmployed: "Existing card of any bank with min ₹50,000 limit",
      requirement: "Savings Bank Account is mandatory",
    },
    benefits: [
      "Complimentary Domestic Airport Lounge Access",
      "Fuel Surcharge waiver across India",
      "Accelerated Reward Points on e-commerce spends",
    ],
  },
  {
    id: "indusind",
    bank: "IndusInd Bank",
    name: "IndusInd Legend Credit Card",
    image: "/assets/credit-card.png",
    payout: "₹1,850",
    rating: "4.7",
    annualFee: "Lifetime Free",
    rewardRate: "1.5 Reward Points per ₹100 spent",
    eligibility: {
      salaried: "Min ₹25,000 / month",
      selfEmployed: "ITR of ₹4.5 Lakhs / year",
      requirement: "PAN & Aadhaar required",
    },
    benefits: [
      "Buy 1 Get 1 Free Movie Tickets on BookMyShow",
      "Zero Annual and Renewal Fee for lifetime",
      "Comprehensive Travel & Personal Accident Cover",
    ],
  },
  {
    id: "hdfc",
    bank: "HDFC Bank",
    name: "HDFC Millennia Credit Card",
    image: "/assets/credit-card.png",
    payout: "₹2,500",
    rating: "4.9",
    annualFee: "₹1,000 (Waived on ₹1L spend)",
    rewardRate: "5% Cashback on Amazon, Flipkart & Swiggy",
    eligibility: {
      salaried: "Min ₹35,000 / month",
      selfEmployed: "ITR of ₹6 Lakhs / year",
      requirement: "CIBIL Score 750+",
    },
    benefits: [
      "5% CashPoints on top 10 merchant partners",
      "1% CashPoints on all other offline/online spends",
      "8 Complimentary Domestic Lounge Access per year",
    ],
  },
];

const mockLeads = [
  {
    id: "LEAD-9082",
    date: "11 Sep 2026",
    customer: "Rahul Sharma",
    phone: "9876543210",
    product: "YES Bank Prosperity Card",
    payout: "₹2,200",
    status: "Approved",
  },
  {
    id: "LEAD-9081",
    date: "10 Sep 2026",
    customer: "Amit Verma",
    phone: "9123456780",
    product: "IndusInd Legend Card",
    payout: "₹1,850",
    status: "In Review",
  },
  {
    id: "LEAD-9079",
    date: "08 Sep 2026",
    customer: "Priya Patel",
    phone: "9811223344",
    product: "HDFC Millennia Card",
    payout: "₹2,500",
    status: "Pending KYC",
  },
];

const SellAndEarn = () => {
  const [selectedOffer, setSelectedOffer] = useState(cardOffers[0]);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("credit-cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleShareLink = () => {
    if (!leadForm.name || !leadForm.phone) {
      alert("Please enter customer name and phone number to generate tracked link");
      return;
    }
    const trackingLink = `https://dscpay.com/apply/${selectedOffer.id}?ref=USER&cname=${encodeURIComponent(
      leadForm.name
    )}&cphone=${leadForm.phone}`;

    navigator.clipboard.writeText(trackingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    if (!leadForm.phone) {
      alert("Please enter customer mobile number to share via WhatsApp");
      return;
    }
    const trackingLink = `https://dscpay.com/apply/${selectedOffer.id}?ref=USER`;
    const message = `Hello ${leadForm.name || "Customer"}, apply for ${selectedOffer.name} and enjoy zero joining fees and exclusive reward benefits. Apply here: ${trackingLink}`;
    window.open(`https://wa.me/91${leadForm.phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 md:ml-64 p-4 md:p-8 font-sans text-slate-800">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <RiExchangeDollarLine className="text-blue-600" />
            <span>Sell & Earn Financial Products</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Recommend Credit Cards, Loans & Bank Accounts to your customers and earn high commission per approved lead.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <FaBolt className="text-emerald-600" />
            <span>Highest Commission Guarantee</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("credit-cards")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "credit-cards"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FaCreditCard size={13} />
          <span>Credit Cards</span>
          <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full font-bold">
            Hot
          </span>
        </button>

        <button
          onClick={() => setActiveTab("bank-accounts")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "bank-accounts"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FaBuilding size={13} />
          <span>Savings Accounts</span>
        </button>

        <button
          onClick={() => setActiveTab("loans")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "loans"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FaMoneyBillWave size={13} />
          <span>Personal Loans</span>
        </button>
      </div>

      {/* Main Showcase & Lead Generation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left Column: Product Selection & Offer Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card Offer Showcase */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {selectedOffer.bank}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {selectedOffer.name}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-2xl shadow-sm self-start sm:self-auto text-right">
                <span className="text-[10px] uppercase font-bold block text-emerald-100">You Earn</span>
                <span className="text-xl font-black">{selectedOffer.payout}</span>
                <span className="text-[10px] text-emerald-100"> / Lead</span>
              </div>
            </div>

            {/* Visual Banner Preview */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50 mb-5 shadow-inner">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.name}
                className="w-full h-48 sm:h-56 object-contain bg-gradient-to-tr from-slate-100 to-white"
              />
            </div>

            {/* Eligibility & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Eligibility */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wide text-rose-600">
                  <FaShieldAlt size={12} />
                  <span>Eligibility Criteria</span>
                </h4>
                <div className="space-y-1.5 text-slate-600">
                  <div>
                    <span className="font-bold text-slate-800">Salaried: </span>
                    {selectedOffer.eligibility.salaried}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Self-Employed: </span>
                    {selectedOffer.eligibility.selfEmployed}
                  </div>
                  <div className="text-blue-700 font-bold bg-blue-100/60 px-2 py-1 rounded-lg">
                    {selectedOffer.eligibility.requirement}
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wide text-emerald-600">
                  <FaCheckCircle size={12} />
                  <span>Card Highlights</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {selectedOffer.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Switcher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cardOffers.map((offer) => (
              <div
                key={offer.id}
                onClick={() => setSelectedOffer(offer)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedOffer.id === offer.id
                    ? "bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="text-xs font-extrabold text-slate-900 truncate">
                  {offer.bank}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {offer.name}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-black">{offer.payout}</span>
                  <span className="text-[10px] text-slate-400">Commission</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Instant Customer Lead Generation Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-inner">
                <FaShareAlt size={18} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Generate Customer Link</h3>
                <p className="text-xs text-slate-500">Tracked lead attribution to your wallet</p>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 mb-5 text-xs text-blue-900 font-medium">
              Selected Product: <span className="font-extrabold">{selectedOffer.name}</span>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Customer Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Customer Mobile Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10 digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition font-mono"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={handleShareLink}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {copied ? (
                    <>
                      <FaCheckCircle size={14} className="text-cyan-300" />
                      <span>Tracking Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy size={13} />
                      <span>Copy Customer Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <FaWhatsapp size={16} />
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  onClick={() => window.open(`https://dscpay.com/apply/${selectedOffer.id}`, "_blank")}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <FaExternalLinkAlt size={11} />
                  <span>Open Application Form Directly</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead History & Tracking Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-black text-slate-900 text-base">Your Generated Leads & Earnings</h3>
            <p className="text-xs text-slate-500">Track application status and commission payouts</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search leads..."
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
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="in-review">In Review</option>
              <option value="pending">Pending KYC</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 md:px-6">Lead ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4 text-right">Commission</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50/30 transition">
                  <td className="py-3.5 px-4 md:px-6 font-mono font-bold text-slate-700">
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
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        lead.status === "Approved"
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
    </div>
  );
};

export default SellAndEarn;
