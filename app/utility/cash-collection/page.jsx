"use client";

import React, { useState } from "react";
import CustomerNotFoundModal from "@/components/CustomerNotFoundModal";

const CashCollection = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <div className="p-4 md:ml-64 md:p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Cash Collection</h2>
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
                <th className="px-4 py-2 font-semibold">Amount</th>
                <th className="px-4 py-2 font-semibold">Transaction ID</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">BillerType</th>
                <th className="px-4 py-2 font-semibold">BillerName</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Check Status</th>
                <th className="px-4 py-2 font-semibold">Complain</th>
                <th className="px-4 py-2 font-semibold">Receipt</th>
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
        description={`The details you entered do not match with our records.\nPlease check the Transaction ID / Account Number and try again.`}
      />
    </div>
  );
};

export default CashCollection;
