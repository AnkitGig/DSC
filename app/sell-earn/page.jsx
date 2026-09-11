"use client";

import React from "react";

const SellAndEarn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 md:ml-64 p-2 sm:p-4 md:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 flex items-center justify-center text-blue-800 tracking-tight drop-shadow-lg">
        Credit Card Offers
      </h2>
      <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-12 mb-8 sm:mb-12 border border-blue-100">
        <div className="flex-1 w-full mb-4 sm:mb-6">
          <h3 className="text-blue-900 text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-3 flex items-center">
            YES BANK CREDIT CARD
          </h3>
          <h4 className="text-red-600 font-semibold mb-1 sm:mb-2">Eligibility:</h4>
          <ul className="mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base md:text-lg list-disc pl-4 sm:pl-6 space-y-1">
            <li><b>Self Employed:</b> Existing cardholder of a different bank with a minimum limit of 50K</li>
            <li><b>Salaried:</b> Min 30K required (last 3 month salary slip)</li>
          </ul>
          <div className="font-bold text-blue-700 mt-2 sm:mt-3 bg-blue-50 rounded px-2 sm:px-3 py-1 inline-block shadow-sm text-xs sm:text-base">
            Saving Account is mandatory
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-center">
          <img
            src="https://login.avfinpay.com/assets/images/lead-generation/YES%20bank.png"
            alt="YES BANK Credit Card"
            className="w-full max-w-xs sm:max-w-sm md:max-w-full rounded-2xl shadow-lg object-contain bg-gradient-to-tr from-blue-100 to-white border border-blue-200"
            style={{ maxHeight: 320 }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          <input
            type="text"
            placeholder="Full Name"
            className="flex-1 border-2 border-blue-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition shadow-sm"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="flex-1 border-2 border-blue-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition shadow-sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center mb-2">
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center">
            SHARE LINK
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center mt-2 sm:mt-0">
            OPEN LINK
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-xl p-4 sm:p-6 md:p-10 border border-blue-100">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 sm:mb-6">
          <select className="border-2 border-blue-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition">
            <option>Status</option>
            <option>All</option>
          </select>
          <input
            type="date"
            className="border-2 border-blue-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            placeholder="From Date"
          />
          <input
            type="date"
            className="border-2 border-blue-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            placeholder="To Date"
          />
          <input
            type="text"
            className="border-2 border-blue-200 rounded-lg px-2 sm:px-3 py-1 sm:py-2 flex-1 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            placeholder="Transaction Id or Account Number or Reference No."
          />
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-bold text-sm sm:text-base shadow hover:from-blue-700 hover:to-blue-500 transition flex items-center justify-center gap-1 mt-2 md:mt-0">
            SEARCH
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-blue-100">
          <table className="w-full text-xs sm:text-sm md:text-base bg-white rounded-lg min-w-[600px]">
            <thead>
              <tr className="border-b bg-blue-50 text-blue-900">
                <th className="py-2 sm:py-3 px-3">TXN Date</th>
                <th className="py-2 sm:py-3 px-3">Transaction ID</th>
                <th className="py-2 sm:py-3 px-3">Customer Name</th>
                <th className="py-2 sm:py-3 px-3">Mobile</th>
                <th className="py-2 sm:py-3 px-3">Vendor</th>
                <th className="py-2 sm:py-3 px-3">Status</th>
                <th className="py-2 sm:py-3 px-3">Source</th>
                <th className="py-2 sm:py-3 px-3">Complain</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div className="text-center mt-4 sm:mt-6 text-blue-700 font-extrabold cursor-pointer hover:underline text-base sm:text-lg flex items-center justify-center gap-2">
          View Latest Transactions
        </div>
      </div>
    </div>
  );
};

export default SellAndEarn;
