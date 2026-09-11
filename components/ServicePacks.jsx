"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RandomNoticeBoard from "./RandomNoticeBoard";

const ServicePacks = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showKycPopup, setShowKycPopup] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
        if (!token || !userId) return;

        const res = await fetch(`/api/users/profile/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserProfile();
  }, []);

  const services = [
    { img: "/assets/bank-transfer.png", title: "Money Transfer" },
    { img: "/assets/wallet.png", title: "Wallet" },
    { img: "/assets/Edistric.png", title: "E-Distric" },
    { img: "/assets/digitalgold.png", title: "Digital Gold" },
    { img: "/assets/credit-card.png", title: "Credit Card Payment" },
    { img: "/assets/ayushman.png", title: "Aayushman " },
    { img: "/assets/fingerprint.png", title: "AEPS" },
    { img: "/assets/bankcsp.png", title: "Bank CSP" },
    { img: "/assets/bus.png", title: "Bus" },
    { img: "/assets/train.png", title: "Train" },
    { img: "/assets/id-card.png", title: "ID Card" },
    { img: "/assets/bill.png", title: "Bill" },
    { img: "/assets/mobile.png", title: "Mobile Charge" },
    { img: "/assets/driving (1).png", title: "Aadhaar Pay" },
    { img: "/assets/bank.png", title: "Bank" },
    { img: "/assets/deposit.png", title: "Deposit Money" },
    { img: "/assets/pancard.png", title: "Pan Card" },
    { img: "/assets/cash.png", title: "Cash Collection" },
    { img: "/assets/life-insurance.png", title: "LIC Premium" },
    { img: "/assets/health-insurance.png", title: "Insurance" },
    { img: "/assets/ott.png", title: "OTT Subscription" },
    { img: "/assets/commerce.png", title: "E-Gift Card" },
    { img: "/assets/salary.png", title: "Sell & Earn" },
  ];

  return (
    <div className="p-4 md:ml-64 md:p-6">
      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-100 to-purple-200 rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-blue-400"
            onClick={() => {
              if (user && user.kyc_status === false) {
                router.push("/kyc-form");
              } else {
                setShowKycPopup(true);
              }
            }}
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-20 h-20 object-contain mb-0 drop-shadow-lg"
            />
            <span className="mt-2 text-xs text-gray-700 font-medium text-center">{s.title}</span>
          </div>
        ))}

        {/* KYC Pending Popup */}
        {showKycPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <span className="text-2xl mb-2 text-blue-700 font-bold">Service inactive</span>
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setShowKycPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard UI */}
      <div className="mb-8 mt-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button className="px-6 py-2 rounded bg-[#2d317a] text-white font-semibold focus:outline-none">Today</button>
          <button className="px-6 py-2 rounded bg-[#338af3] text-white font-semibold focus:outline-none">Yesterday</button>
          <button className="px-6 py-2 rounded bg-[#338af3] text-white font-semibold focus:outline-none">Week</button>
          <button className="px-6 py-2 rounded bg-[#338af3] text-white font-semibold focus:outline-none">Month</button>
          <button className="px-6 py-2 rounded bg-[#338af3] text-white font-semibold focus:outline-none">Last Month</button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center bg-white rounded-lg shadow p-4 min-h-[110px]">
            <img src="/assets/cash.png" alt="Total Income" className="w-12 h-12 mr-4" />
            <div>
              <div className="font-semibold text-gray-800">Total Income</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </div>
          </div>

          <div className="flex items-center bg-white rounded-lg shadow p-4 min-h-[110px]">
            <img src="/assets/commerce.png" alt="Transaction Volume" className="w-12 h-12 mr-4" />
            <div>
              <div className="font-semibold text-gray-800">Transaction Volume</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </div>
          </div>

          <div className="flex items-center bg-white rounded-lg shadow p-4 min-h-[110px]">
            <img src="/assets/bankcsp.png" alt="Count" className="w-12 h-12 mr-4" />
            <div>
              <div className="font-semibold text-gray-800">Count</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </div>
          </div>

          <div className="flex items-center bg-white rounded-lg shadow p-4 min-h-[110px]">
            <img src="/assets/boy.png" alt="Complaints" className="w-12 h-12 mr-4" />
            <div>
              <div className="font-semibold text-gray-800">Complaints</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Board & Offers Section */}
      <div className="mt-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-blue-600 rounded-full"></div>
            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
              Notice Board & Important Updates
            </h2>
          </div>
        </div>
        <RandomNoticeBoard />
      </div>
    </div>
  );
};

export default ServicePacks;
