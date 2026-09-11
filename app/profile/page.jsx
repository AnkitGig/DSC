"use client";

import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 py-10 md:ml-64 px-4">
      <div className="max-w-2xl mx-auto bg-white/80 rounded-xl shadow-lg p-6 mt-8 backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/assets/boy.png"
            alt="Profile"
            className="h-20 w-20 rounded-full border border-blue-300 shadow"
          />
          <div>
            <div className="font-bold text-blue-900 text-2xl">
              {user ? user.first_name || user.name : "Welcome"}
            </div>
            <div className="text-md text-gray-700">
              {user ? user.email : ""}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-base">
          <div className="font-semibold text-gray-600">Name:</div>
          <div>{user ? (user.first_name ? `${user.first_name} ${user.last_name || ""}` : user.name) : ""}</div>
          <div className="font-semibold text-gray-600">Email:</div>
          <div>{user ? user.email : ""}</div>
          <div className="font-semibold text-gray-600">Phone:</div>
          <div>{user ? user.phone : ""}</div>
          <div className="font-semibold text-gray-600">DOB:</div>
          <div>{user && user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : ""}</div>
          <div className="font-semibold text-gray-600">Aadhaar No:</div>
          <div>{user ? user.aadhaar_no : ""}</div>
          <div className="font-semibold text-gray-600">PAN No:</div>
          <div>{user ? user.pan_number : ""}</div>
          <div className="font-semibold text-gray-600">Address:</div>
          <div>{user ? user.address : ""}</div>
          <div className="font-semibold text-gray-600">Pincode:</div>
          <div>{user ? user.pincode : ""}</div>
          <div className="font-semibold text-gray-600">City:</div>
          <div>{user ? user.city : ""}</div>
          <div className="font-semibold text-gray-600">State:</div>
          <div>{user ? user.state : ""}</div>
          <div className="font-semibold text-gray-600">Country:</div>
          <div>{user ? user.country : ""}</div>
          <div className="font-semibold text-gray-600">Business Name:</div>
          <div>{user ? user.businessName : ""}</div>
          <div className="font-semibold text-gray-600">Bank Account:</div>
          <div>{user ? user.bankAccount : ""}</div>
          <div className="font-semibold text-gray-600">Bank IFSC:</div>
          <div>{user ? user.bankIfsc : ""}</div>
          <div className="font-semibold text-gray-600">Wallet Balance:</div>
          <div>₹ {user ? user.wallet_balance : 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
