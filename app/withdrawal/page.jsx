"use client";

import React, { useState } from "react";

const Withdraw = () => {
  const [form, setForm] = useState({
    name: "",
    ifsc: "",
    account: "",
    mobile: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 overflow-hidden md:ml-64 p-4">
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-pink-400 via-cyan-400 to-blue-500 rounded-full opacity-30 blur-3xl top-[-8rem] left-[-8rem] z-0 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-400 rounded-full opacity-20 blur-2xl bottom-[-6rem] right-[-6rem] z-0 animate-pulse"></div>
      <div
        className="w-full max-w-lg p-10 rounded-3xl shadow-2xl relative z-10 border-2 border-blue-200"
        style={{
          background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #c7d2fe 100%)",
          backdropFilter: "blur(12px) saturate(180%)",
          boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-500 to-indigo-600 drop-shadow">
          Withdraw Request
        </h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-blue-800">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 shadow-sm transition"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-blue-800">IFSC Code</label>
              <input
                name="ifsc"
                value={form.ifsc}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 shadow-sm transition"
                placeholder="Enter IFSC code"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-blue-800">Account Number</label>
              <input
                name="account"
                value={form.account}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 shadow-sm transition"
                placeholder="Enter account number"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-blue-800">Amount</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 shadow-sm transition"
                placeholder="Enter Amount"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-cyan-400 text-white font-extrabold py-3 rounded-xl shadow-xl transition duration-200 text-lg tracking-wide border-2 border-white/30 hover:scale-105 focus:ring-4 focus:ring-cyan-300"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="text-2xl font-bold text-blue-700 mb-2">Your request is pending</div>
            <div className="text-gray-700">We have received your withdrawal request. Please wait for approval.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
