"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaBell, FaWallet, FaUserCircle, FaEnvelope, FaPhoneAlt, FaSuitcase } from "react-icons/fa";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [showKycPopup, setShowKycPopup] = useState(false);
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [showCallDetails, setShowCallDetails] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();

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
          if (data.user && data.user.kyc_status === false) {
            setShowKycPopup(false);
            router.push("/kyc-form");
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserProfile();
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <header className="flex flex-col gap-3 md:flex-row justify-between items-center p-4 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-2xl pl-0 md:pl-64 sticky top-0 z-40 transition-all duration-300 w-full font-sans">
      <div className="flex flex-col w-full md:flex-row md:w-auto gap-2 md:gap-4 items-center ml-[20px] md:ml-9">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="border-none focus:ring-2 focus:ring-blue-200 px-4 py-2 rounded-full transition-all duration-200 w-full text-sm shadow-md bg-white/80 pl-10 text-gray-700 placeholder:text-gray-400"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)" }}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
        </div>
        <span className="hidden md:inline text-base font-bold text-white drop-shadow">
          {user
            ? `Hello ${user.first_name || user.name || "User"}!`
            : "Hello User!"}
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4 relative" ref={profileRef}>
        {/* Email and Call Option */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-white/20 transition relative text-white shadow"
            onClick={() => setShowEmailDetails((prev) => !prev)}
            title="Email"
          >
            <FaEnvelope className="text-lg" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/20 transition relative text-white shadow"
            onClick={() => setShowCallDetails((prev) => !prev)}
            title="Call"
          >
            <FaPhoneAlt className="text-lg" />
          </button>
        </div>

        {/* Email Details Popup */}
        {showEmailDetails && (
          <div className="absolute top-14 right-0 bg-white/90 border border-blue-200 rounded-xl shadow-2xl p-4 z-50 min-w-[220px] flex flex-col items-start backdrop-blur-md animate-fade-in">
            <span className="font-semibold text-blue-700 mb-2">Contact Email</span>
            <span className="text-blue-700 select-all text-sm">teamdigitalservicecenter@gmail.com</span>
            <button className="mt-2 text-xs text-blue-600 hover:underline" onClick={() => setShowEmailDetails(false)}>Close</button>
          </div>
        )}

        {/* Call Details Popup */}
        {showCallDetails && (
          <div className="absolute top-14 right-0 bg-white/90 border border-blue-200 rounded-xl shadow-2xl p-4 z-50 min-w-[220px] flex flex-col items-start backdrop-blur-md animate-fade-in">
            <span className="font-semibold text-blue-700 mb-2">Contact Number</span>
            <span className="text-blue-700 select-all text-sm">+91-9285356192</span>
            <button className="mt-2 text-xs text-blue-600 hover:underline" onClick={() => setShowCallDetails(false)}>Close</button>
          </div>
        )}

        {/* KYC Incomplete Option */}
        {user && user.kyc_status === false && (
          <button
            className="flex items-center gap-1 bg-orange-100 border border-orange-400 text-orange-700 px-3 py-1 rounded-full font-semibold text-sm hover:bg-orange-200 transition mr-2 shadow"
            onClick={() => router.push("/kyc-form")}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
            <span>KYC Incomplete</span>
          </button>
        )}

        <button className="relative p-2 rounded-full hover:bg-white/20 transition group text-white shadow">
          <span
            className="text-xl"
            onClick={() => {
              if (user && user.kyc_status === false) {
                router.push("/kyc-form");
              } else {
                setShowKycPopup(true);
              }
            }}
          >
            <FaBell className="inline-block" />
          </span>
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 group-hover:scale-110 transition-transform animate-pulse shadow">
            1
          </span>
        </button>

        <span
          className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-white font-semibold text-sm cursor-pointer shadow hover:bg-white/30 transition"
          onClick={() => {
            if (user && user.kyc_status === false) {
              router.push("/kyc-form");
            } else {
              setShowKycPopup(true);
            }
          }}
        >
          <FaWallet className="mr-1" />
          <span>{user ? user.wallet_balance : 0}</span>
        </span>

        <span
          className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-white font-semibold text-sm cursor-pointer shadow hover:bg-white/30 transition"
          onClick={() => {
            if (user && user.kyc_status === false) {
              router.push("/kyc-form");
            } else {
              setShowKycPopup(true);
            }
          }}
        >
          <FaSuitcase className="mr-1" /> <span>0</span>
        </span>

        {/* KYC Pending Popup */}
        {showKycPopup && (
          <div className="fixed top-0 left-0 w-screen h-screen z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
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

        <div className="relative">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-full font-bold shadow-lg text-lg cursor-pointer hover:scale-105 transition-transform border-2 border-white/30 backdrop-blur-md"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {user ? (
              user.first_name ? (
                user.first_name[0] + (user.last_name ? user.last_name[0] : "")
              ) : user.name ? (
                user.name[0]
              ) : (
                <FaUserCircle className="inline-block" />
              )
            ) : (
              <FaUserCircle className="inline-block" />
            )}
          </div>

          {showProfile && (
            <div className="fixed md:absolute inset-0 md:inset-auto md:right-0 md:mt-2 flex md:block z-50 animate-fade-in">
              <div className="flex-1 md:hidden" onClick={() => setShowProfile(false)}></div>
              <div className="w-full max-w-xs md:w-96 bg-white/90 rounded-t-2xl md:rounded-2xl shadow-2xl p-6 animate-fade-in flex flex-col gap-2 mx-auto md:mx-0 md:ml-auto relative backdrop-blur-md border border-blue-100">
                <button
                  className="absolute top-2 right-2 md:hidden text-gray-500 hover:text-blue-700 text-2xl font-bold z-10"
                  onClick={() => setShowProfile(false)}
                  aria-label="Close profile"
                >
                  &times;
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="/assets/boy.png"
                    alt="Profile"
                    className="h-14 w-14 rounded-full border-2 border-blue-400 shadow"
                  />
                  <div>
                    <div className="font-bold text-blue-900 text-xl">
                      {user ? user.first_name || user.name : "Welcome"}
                    </div>
                    <div className="text-sm text-gray-700">
                      {user ? user.email : ""}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <button
                    className="text-left px-4 py-2 rounded hover:bg-blue-100 font-medium text-blue-700 transition"
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="text-left px-4 py-2 rounded hover:bg-blue-100 font-medium text-blue-700 transition"
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/");
                    }}
                  >
                    Wallet
                  </button>
                  <button
                    className="text-left px-4 py-2 rounded hover:bg-blue-100 font-medium text-blue-700 transition"
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/withdrawal");
                    }}
                  >
                    Withdrawal
                  </button>
                  <button
                    className="text-left px-4 py-2 rounded hover:bg-blue-100 font-medium text-blue-700 transition"
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/transactions");
                    }}
                  >
                    Transactions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <span className="md:hidden block text-base font-bold text-white drop-shadow">
        {user
          ? `Hello ${user.first_name || user.name || "User"}!`
          : "Hello User!"}
      </span>
    </header>
  );
};

export default Header;
