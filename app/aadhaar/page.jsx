"use client";

import React, { useState } from "react";
import { FaTimes, FaFingerprint, FaExclamationCircle } from "react-icons/fa";

const aadhaarServices = [
  {
    title: "Name Updation",
    description: "Update your name on Aadhaar.",
    image: "/assets/id-card.png",
  },
  {
    title: "Mobile Number Updation",
    description: "Update your mobile number linked to Aadhaar.",
    image: "/assets/mobile.png",
  },
  {
    title: "Email Updation",
    description: "Update your email address on Aadhaar.",
    image: "/assets/id-card.png",
  },
  {
    title: "Address Updation",
    description: "Update your address on Aadhaar.",
    image: "/assets/id-card.png",
  },
  {
    title: "Photo Change",
    description: "Change your photo on Aadhaar.",
    image: "/assets/boy.png",
  },
  {
    title: "Biometric Change (Only Five Finger Device)",
    description: "Update your biometrics using a five finger device.",
    image: "/assets/fingerprint.png",
  },
  {
    title: "Blue Card",
    description: "Apply for Aadhaar Blue Card for children below 5 years.",
    image: "/assets/Aadhaar1.png",
  },
];

const Aadhaar = () => {
  const [popup, setPopup] = useState({ open: false, service: null });

  const handleCardClick = (service) => {
    setPopup({ open: true, service });
  };

  const closePopup = () => {
    setPopup({ open: false, service: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 md:ml-64 p-4 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <div className="w-24 h-16 flex items-center justify-center mb-3">
          <img
            src="/assets/Aadhaar_Preview.png"
            alt="Aadhaar Card Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          AADHAAR CARD
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          Aadhaar Services
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {aadhaarServices.map((service, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(service)}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-1"
          >
            {/* Icon Container */}
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <img
                src={service.image}
                alt={service.title}
                className="w-9 h-9 object-contain"
              />
            </div>

            {/* Service Details */}
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Modern Biometric Alert Popup */}
      {popup.open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center relative border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <FaTimes size={16} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <FaFingerprint size={32} />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              {popup.service?.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {popup.service?.description}
            </p>

            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-bold mb-5 flex items-center justify-center gap-2">
              <FaExclamationCircle size={14} />
              <span>Please add the biometric device</span>
            </div>

            <button
              onClick={closePopup}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aadhaar;
