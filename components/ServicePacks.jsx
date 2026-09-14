"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaPaperPlane,
  FaWallet,
  FaMobileAlt,
  FaReceipt,
  FaUniversity,
  FaHandHoldingUsd,
  FaIdCard,
  FaFingerprint,
  FaGift,
  FaShieldAlt,
  FaSatelliteDish,
  FaPlayCircle,
  FaSyncAlt,
  FaThLarge,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
  FaLock,
  FaRocket,
  FaHeadset,
  FaAward,
  FaSun,
} from "react-icons/fa";
import RandomNoticeBoard from "./RandomNoticeBoard";

export default function ServicePacks() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [greeting, setGreeting] = useState("Good Evening");
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);

  // Fetch user profile if logged in
  useEffect(() => {
    async function fetchUserProfile() {
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
          headers: {
            Authorization: token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserProfile();

    const handleAuthChange = () => {
      fetchUserProfile();
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("focus", handleAuthChange);

    const interval = setInterval(fetchUserProfile, 5000);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("focus", handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  // Update greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };
    updateGreeting();
  }, []);

  // News ticker items
  const tickerItems = [
    { text: "Aadhaar Verification Service is now Live!", color: "bg-emerald-500" },
    { text: "Get ₹10 Cashback on Mobile Recharge", color: "bg-amber-500" },
    { text: "New Insurance Plans Available", color: "bg-purple-500" },
    { text: "PAN Card Service - Faster & Easier", color: "bg-blue-500" },
  ];

  // News ticker auto rotation
  useEffect(() => {
    if (isTickerPaused) return;
    const interval = setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isTickerPaused, tickerItems.length]);

  const handlePrevTicker = () => {
    setActiveTickerIndex((prev) => (prev - 1 + tickerItems.length) % tickerItems.length);
  };

  const handleNextTicker = () => {
    setActiveTickerIndex((prev) => (prev + 1) % tickerItems.length);
  };

  const categories = [
    "Popular",
    "Financial",
    "Government",
    "Utility",
    "Shopping",
    "Other",
  ];

  // 12 All Services cards matching reference screenshot
  const allServices = [
    {
      id: "money-transfer",
      title: "Money Transfer",
      desc: "Send money instantly",
      icon: FaPaperPlane,
      iconBg: "bg-blue-500",
      route: "/withdrawal",
      category: "Financial",
    },
    {
      id: "wallet",
      title: "Wallet",
      desc: "Load & manage wallet",
      icon: FaWallet,
      iconBg: "bg-emerald-500",
      route: "/transactions",
      category: "Financial",
    },
    {
      id: "mobile-recharge",
      title: "Mobile Recharge",
      desc: "Recharge your mobile",
      icon: FaMobileAlt,
      iconBg: "bg-purple-500",
      route: "/recharge/mobile",
      category: "Utility",
    },
    {
      id: "bill-payment",
      title: "Bill Payment",
      desc: "Pay your bills",
      icon: FaReceipt,
      iconBg: "bg-amber-500",
      route: "/utility",
      category: "Utility",
    },
    {
      id: "bank-csp",
      title: "Bank CSP",
      desc: "Banking services",
      icon: FaUniversity,
      iconBg: "bg-blue-600",
      route: "/withdrawal",
      category: "Financial",
    },
    {
      id: "deposit-money",
      title: "Deposit Money",
      desc: "Add money to wallet",
      icon: FaHandHoldingUsd,
      iconBg: "bg-amber-500",
      route: "/withdrawal",
      category: "Financial",
    },
    {
      id: "pan-card",
      title: "Pan Card",
      desc: "Apply for PAN",
      icon: FaIdCard,
      iconBg: "bg-blue-500",
      route: "/aadhaar",
      category: "Government",
    },
    {
      id: "aadhaar-services",
      title: "Aadhaar Services",
      desc: "Aadhaar update & more",
      icon: FaFingerprint,
      iconBg: "bg-pink-500",
      route: "/aadhaar",
      category: "Government",
    },
    {
      id: "egift-card",
      title: "E-Gift Card",
      desc: "Gift happiness",
      icon: FaGift,
      iconBg: "bg-rose-500",
      route: "/ott",
      category: "Shopping",
    },
    {
      id: "insurance",
      title: "Insurance",
      desc: "Secure your future",
      icon: FaShieldAlt,
      iconBg: "bg-indigo-600",
      route: "/recharge/mobile",
      category: "Financial",
    },
    {
      id: "dth-recharge",
      title: "DTH Recharge",
      desc: "Recharge DTH",
      icon: FaSatelliteDish,
      iconBg: "bg-blue-600",
      route: "/recharge/mobile",
      category: "Utility",
    },
    {
      id: "ott-subscription",
      title: "OTT Subscription",
      desc: "Entertainment for you",
      icon: FaPlayCircle,
      iconBg: "bg-purple-600",
      route: "/ott",
      category: "Other",
    },
  ];

  const filteredServices =
    activeCategory === "Popular"
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  const displayName = user
    ? user.first_name || user.name || "Rohit Kumar"
    : "Rohit Kumar";

  const handleCardClick = (route) => {
    router.push(route);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-7 md:ml-64 transition-all duration-300">

      {/* 2. NOTICE BOARD BANNER CAROUSEL (AS IN STARTING) */}
      <div className="mb-6">
        <RandomNoticeBoard />
      </div>

      {/* 3. KEY METRICS STATS CARDS ROW (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Wallet Balance */}
        <div
          onClick={() => router.push("/transactions")}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg shadow-2xs shrink-0">
              <FaWallet />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Wallet Balance
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0a1e4d] block font-mono">
                ₹{" "}
                {user?.wallet_balance !== undefined && user?.wallet_balance !== null
                  ? Number(user.wallet_balance).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span>↑</span>
              <span>5% from last week</span>
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs shadow-2xs">
              →
            </div>
          </div>
        </div>

        {/* Card 2: Today's Transactions */}
        <div
          onClick={() => router.push("/transactions")}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shadow-2xs shrink-0">
              <FaSyncAlt />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Today's Transactions
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0a1e4d] block">
                24
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span>↑</span>
              <span>12% from yesterday</span>
            </span>
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shadow-2xs">
              →
            </div>
          </div>
        </div>

        {/* Card 3: Total Services */}
        <div
          onClick={() => router.push("/sell-earn")}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg shadow-2xs shrink-0">
              <FaThLarge />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Total Services
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0a1e4d] block">
                18
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span>↑</span>
              <span>3% from last week</span>
            </span>
            <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xs shadow-2xs">
              →
            </div>
          </div>
        </div>

        {/* Card 4: E-Gift Balance */}
        <div
          onClick={() => router.push("/ott")}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-amber-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-lg shadow-2xs shrink-0">
              <FaGift />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                E-Gift Balance
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0a1e4d] block">
                ₹ 2,500
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span>↑</span>
              <span>10% from last week</span>
            </span>
            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs shadow-2xs">
              →
            </div>
          </div>
        </div>
      </div>

      {/* 4. ALL SERVICES SECTION */}
      <div className="mb-8">
        {/* Header: Title + View All Link */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <FaThLarge />
            </div>
            <h2 className="text-lg font-black text-[#0a1e4d] tracking-tight">
              All Services
            </h2>
          </div>

          <button
            onClick={() => setActiveCategory("Popular")}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${activeCategory === cat
                ? "bg-[#1d68f6] text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 12 Services Grid (3 Rows x 4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.route)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Round Icon */}
                  <div
                    className={`w-11 h-11 rounded-full ${service.iconBg} text-white flex items-center justify-center text-base shadow-2xs shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon />
                  </div>

                  {/* Title, Subtitle, Open Link */}
                  <div className="truncate">
                    <h3 className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                      {service.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                      {service.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
                      <span>Open</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </div>

                {/* Right Arrow Button */}
                <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center text-xs transition-colors shrink-0 ml-2">
                  &rarr;
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. TRUST & COMPLIANCE FOOTER */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs px-6 py-4 flex flex-wrap items-center justify-between gap-6">
        {/* Item 1: 100% Secure */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
            <FaShieldAlt />
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#0a1e4d]">100% Secure</div>
            <div className="text-[11px] text-slate-400 font-medium">
              Your data is safe with us
            </div>
          </div>
        </div>

        {/* Item 2: 24/7 Support */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
            <FaHeadset />
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#0a1e4d]">24/7 Support</div>
            <div className="text-[11px] text-slate-400 font-medium">
              Always here for you
            </div>
          </div>
        </div>

        {/* Item 3: Trusted Platform */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
            <FaAward />
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#0a1e4d]">Trusted Platform</div>
            <div className="text-[11px] text-slate-400 font-medium">
              Powering Digital India
            </div>
          </div>
        </div>

        {/* Item 4: Digital India Branding */}
        <div className="flex items-center gap-3">
          {/* Digital India Stylized Emblem */}
          <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center p-1 border border-slate-100 shrink-0">
            <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none">
              <circle cx="50" cy="50" r="45" stroke="#ff9933" strokeWidth="6" strokeDasharray="30 20" />
              <circle cx="50" cy="50" r="30" stroke="#000080" strokeWidth="4" />
              <circle cx="50" cy="50" r="15" stroke="#138808" strokeWidth="4" strokeDasharray="20 15" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-black text-slate-800 tracking-tight flex items-center gap-1">
              <span>Digital</span>
              <span className="text-amber-600">India</span>
            </div>
            <div className="text-[10px] italic text-slate-400 font-medium">
              Power To Empower
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
