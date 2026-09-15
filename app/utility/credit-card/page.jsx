"use client";

import React, { useState } from "react";
import CustomerNotFoundModal from "@/components/CustomerNotFoundModal";

const CreditCard = () => {
  const [cardType, setCardType] = useState("VISA");
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <div className="p-4 md:ml-64 md:p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 rounded bg-gray-100 border-2 ${
              cardType === "VISA" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setCardType("VISA")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="VISA"
              className="h-8 mx-auto"
            />
          </button>
          <button
            className={`flex-1 py-2 rounded bg-gray-100 border-2 ${
              cardType === "Mastercard" ? "border-orange-500" : "border-transparent"
            }`}
            onClick={() => setCardType("Mastercard")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="h-8 mx-auto"
            />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Card Number *"
          />
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Mobile *"
          />
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name *"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Amount *"
          />
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Payee Name *"
          />
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Remarks *"
          />
        </div>
        <div className="text-gray-700 text-sm mb-4">
          Note: Kindly cross-check the card number before proceeding with the transaction. If deposited in the wrong card, we will not be responsible for the retrieval of the amount.
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setShowErrorModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-2 rounded-full shadow transition-all cursor-pointer"
          >
            GET OTP
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Status</option>
            <option>All</option>
            <option>Success</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <input
            type="date"
            className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="From Date"
          />
          <input
            type="date"
            className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="To Date"
          />
          <input
            type="text"
            className="border rounded px-3 py-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Transaction Id or Account Number or Reference No."
          />
          <button
            onClick={() => setShowErrorModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-all cursor-pointer"
          >
            SEARCH
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 font-semibold">Customer Mobile</th>
                <th className="px-4 py-2 font-semibold">Amount</th>
                <th className="px-4 py-2 font-semibold">Transaction ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Customer Name</th>
                <th className="px-4 py-2 font-semibold">Network</th>
                <th className="px-4 py-2 font-semibold">Card Number</th>
                <th className="px-4 py-2 font-semibold">Bank RRN</th>
                <th className="px-4 py-2 font-semibold">Source</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Complain</th>
                <th className="px-4 py-2 font-semibold">Receipt</th>
                <th className="px-4 py-2 font-semibold">Check Status</th>
                <th className="px-4 py-2 font-semibold">Claim</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-700 font-semibold hover:underline">
            View Latest Transactions
          </a>
        </div>
      </div>

      <CustomerNotFoundModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Customer Not Found"
        description={`The details you entered do not match with our records.\nPlease check the Card Number / Account Number and try again.`}
      />
    </div>
  );
};

export default CreditCard;
