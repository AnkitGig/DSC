"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";

const UserAuth = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/users/login", {
        email: form.email,
        password: form.password,
      });

      if (typeof window !== "undefined") {
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);

          localStorage.setItem(
            "kyc_status",
            String(res.data.kyc_status ?? false)
          );

          if (res.data.name) {
            localStorage.setItem("userName", res.data.name);
          }
        } else {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userId", res.data.userId);

          sessionStorage.setItem(
            "kyc_status",
            String(res.data.kyc_status ?? false)
          );

          if (res.data.name) {
            sessionStorage.setItem("userName", res.data.name);
          }
        }

        window.dispatchEvent(new Event("auth-change"));
      }

      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 700);
    } catch (err) {
      const errMsg =
        err?.response?.data?.error ||
        "Login failed. Please check your email and password.";

      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#eef7ff] relative overflow-x-hidden flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Background Soft Glows & Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="absolute top-[8%] right-[28%] w-28 h-28 bg-blue-200/20 rotate-45 rounded-3xl" />

        {/* Top Right Decorative Grid Shapes */}
        <div className="hidden lg:flex absolute top-6 right-8 gap-2.5 opacity-25">
          <div className="w-5 h-5 bg-blue-400 rotate-45 rounded-md" />
          <div className="w-5 h-5 bg-blue-400 rotate-45 rounded-md" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto min-h-screen flex flex-col justify-between lg:grid lg:grid-cols-[1.32fr_0.88fr] lg:items-center">
        {/* ======================================================
            HERO / LEFT SIDE SECTION
        ====================================================== */}
        <section className="relative overflow-hidden px-5 sm:px-10 lg:px-12 xl:px-16 pt-5 pb-6 lg:py-8 flex flex-col justify-between">
          <div>
            {/* Logo Header */}
            <div className="flex items-center shrink-0">
              <div className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/logo1.png"
                  alt="DSC Pay"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div className="ml-3">
                <h1 className="text-[24px] sm:text-[28px] font-extrabold leading-none tracking-tight text-[#073b91]">
                  DSC PAY
                </h1>
                <p className="text-[11px] sm:text-xs text-[#687891] font-medium mt-0.5">
                  Digital Service Centre
                </p>
              </div>
            </div>

            {/* Mobile / Hero Headline Content */}
            <div className="mt-4 sm:mt-6 max-w-[580px]">
              {/* Digital India Badge (Desktop View) */}
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-sm px-3.5 py-1.5 mb-3">
                <span className="text-xs font-bold text-[#164ba3] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Digital India
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-medium text-gray-500">
                  Digital Seva
                </span>
              </div>

              {/* Slanted Handwritten Headline ("Digital India Ka Saathi" / "Be a part of Digital India") */}
              <div className="relative inline-block my-1 lg:my-2">
                <div className="lg:hidden">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#086ee0] tracking-wide font-serif italic rotate-[-2deg]">
                    Digital India <span className="text-[#073b91]">Ka Saathi</span>
                  </h3>
                  <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-blue-500 to-green-500 rounded-full mt-1" />
                </div>

                <div className="hidden lg:block absolute left-[310px] -top-[15px] z-20 pointer-events-none">
                  <h3 className="text-2xl font-extrabold text-[#073b91] tracking-tight font-serif italic rotate-[-6deg] bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Be a part of <span className="text-[#086ee0]">Digital India</span>
                  </h3>
                  <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-blue-500 to-green-500 rounded-full mt-0.5" />
                </div>
              </div>

              {/* Heading */}
              <div className="mt-2 lg:mt-3">
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] xl:text-[52px] leading-[0.98] font-extrabold text-[#09265e]">
                  All Digital Services
                  <span className="block text-[#087cf0] mt-1">
                    Under One Roof
                  </span>
                </h2>

                <div className="flex items-center gap-2.5 mt-3 text-[#687891] text-xs sm:text-sm font-semibold">
                  <span>Fast</span>
                  <span className="text-gray-300">|</span>
                  <span>Secure</span>
                  <span className="text-gray-300">|</span>
                  <span>Reliable</span>
                </div>

                <p className="mt-3 text-[#64728b] text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-[500px]">
                  DSC Pay is your trusted digital service centre for a smarter,
                  simpler and more connected India.
                </p>
              </div>

              {/* Services List (Visible on sm & lg) */}
              <div className="mt-5 space-y-2.5 max-w-[500px]">
                <ServiceItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
                    </svg>
                  }
                  bg="bg-[#087cf0]"
                  title="Money Transfer"
                  description="Send money instantly"
                />
                <ServiceItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="2" width="12" height="20" rx="2" />
                      <path d="M10 18h4" />
                    </svg>
                  }
                  bg="bg-[#10b981]"
                  title="Mobile Recharge"
                  description="Stay connected"
                />
                <ServiceItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <path d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                  }
                  bg="bg-[#8b5cf6]"
                  title="Bill Payments"
                  description="Pay your bills easily"
                />
                <ServiceItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  }
                  bg="bg-[#f97316]"
                  title="Insurance & More"
                  description="Your needs, our priority"
                />
              </div>
            </div>
          </div>

          {/* Center Desk Visual Illustration (Desktop View) */}
          <div className="hidden lg:block absolute right-[-15px] bottom-[10px] w-[510px] h-[300px] pointer-events-none z-10">
            {/* Desk Surface */}
            <div className="absolute bottom-0 left-0 w-full h-[78px] bg-gradient-to-t from-[#d5af88] to-[#eed4b5] rounded-t-[70px] rotate-[-2deg]" />

            {/* Notebook */}
            <div className="absolute left-[40px] bottom-[28px] w-[130px] h-[75px] bg-[#1a2232] rounded-lg shadow-xl rotate-[-12deg] p-2 flex flex-col justify-between text-[9px] text-white/90 font-serif">
              <span className="italic font-bold">Digital India</span>
              <span className="italic font-bold text-right text-blue-300">Digital Seva</span>
            </div>

            {/* Laptop */}
            <div className="absolute left-[80px] bottom-[48px] w-[340px]">
              <div className="h-[195px] bg-gradient-to-br from-[#3b485c] to-[#151d2a] rounded-[15px] border-[6px] border-[#283545] shadow-2xl rotate-[-4deg]">
                <div className="m-2 h-[169px] rounded-lg bg-[#eaf5ff] overflow-hidden flex flex-col">
                  {/* Laptop Navbar */}
                  <div className="h-7 bg-[#123e88] flex items-center justify-between px-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                    <span className="text-[9px] font-bold text-white tracking-wider">DSC PAY</span>
                  </div>

                  {/* Dashboard Preview */}
                  <div className="p-2.5 flex-1 bg-gradient-to-b from-[#f0f7ff] to-white">
                    <div className="bg-white p-1.5 rounded-md shadow-xs mb-2 border border-blue-100 flex items-center justify-between">
                      <span className="text-[8px] font-bold text-[#073b91]">Digital Services Made Simple</span>
                      <span className="text-[7px] bg-blue-100 text-blue-600 px-1 rounded">Active</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="h-10 rounded bg-blue-50/80 border border-blue-100/50 p-1 flex flex-col justify-between">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-[6px] font-bold text-gray-700">Money Transfer</span>
                      </div>
                      <div className="h-10 rounded bg-green-50/80 border border-green-100/50 p-1 flex flex-col justify-between">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-[6px] font-bold text-gray-700">Recharge</span>
                      </div>
                      <div className="h-10 rounded bg-purple-50/80 border border-purple-100/50 p-1 flex flex-col justify-between">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-[6px] font-bold text-gray-700">Bill Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Base */}
              <div className="mx-auto w-[365px] h-[14px] bg-gradient-to-b from-[#abb4c1] to-[#667181] rounded-b-[30px] shadow-xl" />
            </div>

            {/* Mug with Logo */}
            <div className="absolute left-[38px] bottom-[72px]">
              <div className="w-[38px] h-[45px] bg-white rounded-b-lg rounded-t-sm shadow-md border-r-4 border-gray-200 p-1 flex items-center justify-center">
                <span className="text-[7px] font-extrabold text-[#073b91]">DSC PAY</span>
              </div>
            </div>

            {/* Phone */}
            <div className="absolute left-[150px] bottom-[20px] w-[90px] h-[45px] bg-[#0c1424] rounded-lg border-2 border-slate-700 shadow-xl rotate-[14deg] p-1 flex items-center justify-center">
              <span className="text-[7px] font-bold text-white bg-blue-600 px-1 py-0.5 rounded">DSC PAY</span>
            </div>

            {/* Plant Pot */}
            <div className="absolute right-[12px] bottom-[58px]">
              <div className="w-[58px] h-[65px] bg-white rounded-b-[22px] rounded-t-lg shadow-lg border border-gray-100" />
              <div className="absolute bottom-[58px] left-[27px] w-[4px] h-[85px] bg-green-700 rounded-full" />
              <div className="absolute bottom-[95px] left-[3px] w-10 h-5 bg-green-500 rounded-[100%_0_100%_0] rotate-[-35deg]" />
              <div className="absolute bottom-[118px] left-[28px] w-10 h-5 bg-green-600 rounded-[0_100%_0_100%] rotate-[30deg]" />
            </div>
          </div>

          {/* Security Banner (Desktop View - Bottom Left Wave) */}
          <div className="hidden lg:flex mt-auto mb-1 items-center z-20">
            <div className="bg-[#0069d9] text-white px-5 py-2.5 rounded-r-full shadow-lg flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <div>
                <p className="font-extrabold text-xs leading-tight">100% Safe & Secure</p>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  Powered by Digital India <span className="text-orange-300">🇮🇳</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            RIGHT SIDE / LOGIN CARD SECTION
        ====================================================== */}
        <section className="relative flex-1 flex flex-col justify-center items-center px-4 sm:px-6 py-4 lg:py-6 z-20">
          <div className="relative w-full max-w-[440px] rounded-[26px] bg-white shadow-[0_20px_50px_rgba(20,69,130,0.15)] border border-white p-6 sm:p-8">
            {/* Header Logo inside Card (As shown in Reference Image 1) */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-[46px] h-[46px] rounded-xl border border-blue-200 bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/assets/logo1.png"
                  alt="DSC Pay"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-extrabold leading-none text-[#073b91]">
                  DSC PAY
                </h3>
                <p className="text-[10px] text-[#687891] font-medium mt-0.5">
                  Digital Service Centre
                </p>
              </div>
            </div>

            {/* Header / Greeting */}
            <div className="text-center">
              <h2 className="text-[25px] sm:text-[28px] font-extrabold text-[#09265e] leading-tight flex items-center justify-center gap-2">
                Welcome Back! <span className="text-2xl sm:text-3xl">👋</span>
              </h2>

              <p className="mt-1 text-gray-500 text-xs sm:text-sm">
                Login to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="mt-6">
              {/* Username / Mobile Number Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7d8eaa]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
                    </svg>
                  </div>

                  <input
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Username / Mobile Number"
                    autoComplete="username"
                    required
                    className="w-full h-[50px] pl-11 pr-4 rounded-xl border border-[#d8e2f0] bg-[#fbfdff] text-sm text-[#243b61] placeholder:text-[#9aa8bc] outline-none transition-all focus:border-[#1682f4] focus:ring-4 focus:ring-blue-100 font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7d8eaa]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="10" width="18" height="11" rx="2" />
                      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                    </svg>
                  </div>

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="w-full h-[50px] pl-11 pr-11 rounded-xl border border-[#d8e2f0] bg-[#fbfdff] text-sm text-[#243b61] placeholder:text-[#9aa8bc] outline-none transition-all focus:border-[#1682f4] focus:ring-4 focus:ring-blue-100 font-medium"
                  />

                  {/* Show Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7d8eaa] hover:text-[#147bf2] transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 4.4A9.6 9.6 0 0 1 12 4c5 0 9 4 10 8a10.6 10.6 0 0 1-3.1 5" />
                        <path d="M6.6 6.6A10.3 10.3 0 0 0 2 12c1 4 5 8 10 8 1.7 0 3.2-.4 4.6-1.1" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#087cf0] to-[#0c65dc] hover:from-[#086ee0] hover:to-[#0958c5] text-white font-bold text-base shadow-[0_8px_22px_rgba(10,115,240,0.25)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".3" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <>
                    Login
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>

              {/* Message */}
              {message && (
                <div
                  className={`mt-3 text-center text-xs font-semibold ${message.toLowerCase().includes("successful")
                    ? "text-green-600"
                    : "text-red-500"
                    }`}
                >
                  {message}
                </div>
              )}


              {/* Sign Up Link */}
              <div className="text-center mt-5">
                <span className="text-xs text-[#7c8ba2]">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="/signup"
                  className="text-[#087cf0] font-extrabold text-xs hover:underline ml-1"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* ======================================================
          MOBILE BOTTOM FEATURE BAR (Matching Screenshot 2)
      ====================================================== */}
      <footer className="w-full bg-gradient-to-r from-[#062c72] via-[#093d96] to-[#062c72] text-white pt-3.5 pb-4 px-3 mt-4 lg:hidden rounded-t-2xl shadow-lg border-t border-blue-400/20 z-20">
        <div className="max-w-[480px] mx-auto grid grid-cols-4 gap-1 text-center">
          {/* Item 1: 100% Secure */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1 text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold leading-tight">100% Secure</span>
          </div>

          {/* Item 2: Fast Access */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1 text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold leading-tight">Fast Access</span>
          </div>

          {/* Item 3: 24/7 Support */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1 text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2H3z" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold leading-tight">24/7 Support</span>
          </div>

          {/* Item 4: Digital India */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1 text-white">
              <span className="text-xs">🇮🇳</span>
            </div>
            <span className="text-[10px] font-semibold leading-tight">Digital India</span>
          </div>
        </div>

        {/* Footer Subline */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-white/10 text-[10px] text-blue-200">
          <span className="h-px w-8 bg-blue-300/30" />
          <span>Powered by Digital India</span>
          <span className="h-px w-8 bg-blue-300/30" />
        </div>
      </footer>
    </main>
  );
};

/* ============================================================
   SERVICE ITEM
============================================================ */

const ServiceItem = ({
  icon,
  bg,
  title,
  description,
}) => {
  return (
    <div className="flex items-center gap-3 group">
      <div
        className={`w-9 h-9 shrink-0 rounded-lg ${bg} flex items-center justify-center text-white shadow-sm`}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xs sm:text-sm text-[#183057] leading-tight">
          {title}
        </h3>

        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
          {description}
        </p>
      </div>

      <span className="text-[#284b7c] text-lg transition-transform group-hover:translate-x-1">
        →
      </span>
    </div>
  );
};

export default UserAuth;