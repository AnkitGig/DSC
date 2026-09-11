"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";

const UserAuth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await API.post("/users/login", {
        email: form.email,
        password: form.password,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
      }
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err) {
      const errMsg = err?.response?.data?.error || "Login failed. Please check your email and password.";
      setMessage(errMsg);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 overflow-hidden">
      {/* Decorative gradient circles */}
      <div className="absolute w-96 h-96 bg-gradient-to-tr from-pink-400 via-cyan-400 to-blue-500 rounded-full opacity-30 blur-3xl top-[-8rem] left-[-8rem] z-0 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-400 rounded-full opacity-20 blur-2xl bottom-[-6rem] right-[-6rem] z-0 animate-pulse"></div>
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl relative z-10"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/assets/logo1.png"
            alt="Logo"
            className="w-20 h-20 object-contain shadow-lg mb-2 border-4 border-white bg-white rounded-xl"
          />
          <h2 className="text-4xl font-extrabold text-center mb-1 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            DSC Pay
          </h2>
          <span className="text-white font-semibold text-lg tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Digital Service Centre
          </span>
        </div>

        <div className="mb-4 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
              <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 7.07-1.42-1.42M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41" />
            </svg>
          </span>
          <input
            name="email"
            placeholder="Email*"
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 shadow-sm transition"
            value={form.email}
            autoComplete="username"
          />
        </div>

        <div className="mb-6 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            name="password"
            placeholder="Password*"
            type="password"
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-gray-800 shadow-sm transition"
            value={form.password}
            autoComplete="current-password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-2 rounded-lg shadow-lg transition duration-200 text-lg tracking-wide"
          disabled={loading}
          style={{ boxShadow: "0 4px 14px 0 rgba(0, 118, 255, 0.39)" }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "LOG IN"
          )}
        </button>

        {message && (
          <div
            className={`mt-4 text-center font-semibold ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="text-center mt-6">
          <span className="text-white">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-yellow-300 font-semibold hover:underline transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
