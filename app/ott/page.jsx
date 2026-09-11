"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OTTSubscriptions = () => {
  const router = useRouter();

  return (
    <div className="ml-0 md:ml-64 p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-900">
        <span className="mr-2">
          <svg width="24" height="24" fill="currentColor" className="inline-block">
            <path d="M20 5h-3.17l-1.84-2.58A2 2 0 0 0 13.42 2h-2.84a2 2 0 0 0-1.57.42L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 14H4V7h4.05l1.83-2.58c.09-.13.23-.21.37-.21h2.5c.14 0 .28.08.37.21L15.95 7H20v12z" />
          </svg>
        </span>
        OTT Subscriptions
      </h2>

      <div className="bg-white rounded-lg shadow p-4 mb-6 flex space-x-4 overflow-x-auto">
        {["ALT BALAJI", "eros now", "humbara", "Play", "shemaroo", "sony liv", "SUN NXT", "ZEE5"].map(
          (name, i) => (
            <div key={i} className="flex flex-col items-center flex-shrink-0">
              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                <span className="text-lg font-bold">{name[0]}</span>
              </div>
              <span className="text-xs text-center">{name}</span>
            </div>
          )
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <select className="border rounded px-2 py-1">
            <option>Status</option>
            <option>All</option>
          </select>
          <input type="date" className="border rounded px-2 py-1" placeholder="From Date" />
          <input type="date" className="border rounded px-2 py-1" placeholder="To Date" />
          <input
            type="text"
            className="border rounded px-2 py-1 flex-1"
            placeholder="Transaction Id or Account Number or Reference No."
          />
          <button className="bg-blue-700 text-white px-6 py-2 rounded">SEARCH</button>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="py-2">Duration</th>
              <th>Operator</th>
              <th>Mobile Number</th>
              <th>Email Id</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check Status</th>
              <th>Complain</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>{/* Table rows */}</tbody>
        </table>

        <div className="text-center mt-4 text-blue-700 font-bold cursor-pointer">
          View Latest Transactions
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 text-white px-10 py-3 rounded-full text-lg font-bold shadow hover:bg-blue-800 transition"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default OTTSubscriptions;
