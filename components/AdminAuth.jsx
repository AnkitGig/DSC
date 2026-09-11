"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { FaShieldAlt, FaUser, FaLock } from "react-icons/fa";

const AdminAuth = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setErrorMessage("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!form.username || !form.password) {
      setErrorMessage("Please enter both username and password");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const res = await API.post("/admin/login", form);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }
      router.push("/admin-dashboard");
    } catch (err) {
      setErrorMessage(err?.response?.data?.error || "Invalid administrator credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 overflow-hidden px-4">
      {/* Decorative gradient circles */}
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-5rem] left-[-5rem] z-0 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl bottom-[-5rem] right-[-5rem] z-0 animate-pulse"></div>

      <div
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10 border border-white/10"
        style={{
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(24px) saturate(180%)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-xl mb-3 flex items-center justify-center">
            <img
              src="/assets/logo1.png"
              alt="DSC Pay Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-black text-center text-white tracking-tight">
            Admin Portal
          </h2>
          <span className="text-cyan-300 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 mt-1">
            <FaShieldAlt size={12} /> Digital Service Centre
          </span>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold text-center animate-fade-in">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <FaUser size={14} />
            </span>
            <input
              name="username"
              placeholder="Administrator Username"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900/90 text-white placeholder:text-slate-500 text-sm shadow-inner transition"
              value={form.username}
              autoComplete="username"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <FaLock size={14} />
            </span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900/90 text-white placeholder:text-slate-500 text-sm shadow-inner transition"
              value={form.password}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition duration-200 text-sm tracking-wide disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Authenticating...
              </span>
            ) : (
              "Sign In to Admin Panel"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
