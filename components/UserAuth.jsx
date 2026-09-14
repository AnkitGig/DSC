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
    <div className="min-h-screen bg-[#eef7ff] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyan-100/70 blur-3xl" />
      </div>

      <div className="relative min-h-screen max-w-[1600px] mx-auto grid lg:grid-cols-[1.35fr_0.85fr]">
        {/* ================= LEFT SECTION ================= */}
        <section className="relative px-7 sm:px-12 lg:px-16 xl:px-20 py-10 flex flex-col justify-between overflow-hidden">
          {/* Top Logo */}
          <div>
            <div className="flex items-center gap-4">
              <div className="w-[66px] h-[66px] rounded-xl bg-white border border-blue-200 shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/logo1.png"
                  alt="DSC Pay"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#073b91]">
                  DSC PAY
                </h1>

                <p className="text-sm sm:text-base text-[#687891] font-medium">
                  Digital Service Centre
                </p>
              </div>
            </div>

            {/* Digital India badge */}
            <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-sm px-4 py-2">
              <span className="text-sm font-semibold text-[#164ba3]">
                🇮🇳 Digital India
              </span>

              <span className="text-gray-300">•</span>

              <span className="text-sm font-medium text-gray-500">
                Digital Seva
              </span>
            </div>

            {/* Heading */}
            <div className="mt-7 max-w-[620px]">
              <h2 className="text-4xl sm:text-5xl xl:text-[58px] leading-[1.05] font-extrabold text-[#09265e]">
                All Digital Services
                <span className="block text-[#087cf0] mt-1">
                  Under One Roof
                </span>
              </h2>

              <div className="flex items-center gap-3 mt-5 text-[#687891] text-sm sm:text-base font-medium">
                <span>Fast</span>
                <span>|</span>
                <span>Secure</span>
                <span>|</span>
                <span>Reliable</span>
              </div>

              <p className="mt-5 text-[#64728b] text-base sm:text-lg leading-7 max-w-[570px]">
                DSC Pay is your trusted digital service centre for a smarter,
                simpler and more connected India.
              </p>
            </div>

            {/* Services */}
            <div className="mt-8 space-y-5 max-w-[560px]">
              {/* Money Transfer */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[#183057]">
                    Money Transfer
                  </h3>

                  <p className="text-sm text-gray-500">
                    Send money instantly
                  </p>
                </div>

                <span className="text-[#284b7c] text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* Mobile Recharge */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M10 18h4" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[#183057]">
                    Mobile Recharge
                  </h3>

                  <p className="text-sm text-gray-500">
                    Stay connected
                  </p>
                </div>

                <span className="text-[#284b7c] text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* Bill Payments */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="5" y="3" width="14" height="18" rx="2" />
                    <path d="M8 8h8M8 12h8M8 16h4" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[#183057]">
                    Bill Payments
                  </h3>

                  <p className="text-sm text-gray-500">
                    Pay your bills easily
                  </p>
                </div>

                <span className="text-[#284b7c] text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* Insurance */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white shadow-md">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[#183057]">
                    Insurance & More
                  </h3>

                  <p className="text-sm text-gray-500">
                    Your needs, our priority
                  </p>
                </div>

                <span className="text-[#284b7c] text-2xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Center workspace visual */}
          <div className="hidden lg:block absolute right-[-30px] bottom-[35px] w-[560px] h-[360px] pointer-events-none">
            {/* Desk */}
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#d7b189] to-[#ecd0ae] rounded-t-[80px] rotate-[-2deg] opacity-90" />

            {/* Laptop */}
            <div className="absolute left-[60px] bottom-[62px] w-[380px]">
              <div className="h-[225px] bg-gradient-to-br from-[#3d4c62] to-[#141c29] rounded-[18px] border-[8px] border-[#273445] shadow-2xl rotate-[-4deg]">
                <div className="m-3 h-[191px] rounded-lg bg-[#eaf5ff] overflow-hidden">
                  <div className="h-8 bg-[#123e88] flex items-center px-3 gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/80" />
                    <span className="w-2 h-2 rounded-full bg-white/60" />
                    <span className="w-2 h-2 rounded-full bg-white/40" />
                  </div>

                  <div className="p-4 grid grid-cols-3 gap-3">
                    <div className="h-14 rounded-lg bg-white shadow-sm" />
                    <div className="h-14 rounded-lg bg-white shadow-sm" />
                    <div className="h-14 rounded-lg bg-white shadow-sm" />

                    <div className="h-20 rounded-lg bg-blue-50 col-span-2" />
                    <div className="h-20 rounded-lg bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-[-2px] w-[410px] h-[18px] bg-gradient-to-b from-[#abb4c1] to-[#667181] rounded-b-[30px] shadow-xl" />
            </div>

            {/* Plant */}
            <div className="absolute right-[25px] bottom-[76px]">
              <div className="w-[78px] h-[88px] bg-white rounded-b-[30px] rounded-t-lg shadow-lg" />

              <div className="absolute bottom-[77px] left-[37px] w-[5px] h-[110px] bg-green-700 rounded-full" />

              <div className="absolute bottom-[126px] left-[8px] w-14 h-7 bg-green-500 rounded-[100%_0_100%_0] rotate-[-35deg]" />

              <div className="absolute bottom-[152px] left-[38px] w-14 h-7 bg-green-600 rounded-[0_100%_0_100%] rotate-[30deg]" />
            </div>
          </div>

          {/* Bottom security */}
          <div className="mt-10 flex items-center gap-3 text-[#355078]">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <div>
              <p className="font-bold text-sm">100% Safe & Secure</p>
              <p className="text-xs text-gray-500">
                Powered by Digital India 🇮🇳
              </p>
            </div>
          </div>

          {/* Decorative bottom curve */}
          <div className="absolute -bottom-40 -left-20 w-[760px] h-[260px] bg-[#0069d9] rounded-[50%] opacity-95" />
        </section>

        {/* ================= RIGHT LOGIN SECTION ================= */}
        <section className="relative flex items-center justify-center px-5 sm:px-10 py-12 lg:py-0">
          {/* Soft background */}
          <div className="absolute inset-0 bg-white/20" />

          <div className="relative w-full max-w-[500px] rounded-[26px] bg-white shadow-[0_20px_60px_rgba(20,69,130,0.15)] border border-white p-7 sm:p-9 lg:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-5">
              <div className="w-[62px] h-[62px] rounded-xl border border-blue-200 bg-white shadow-sm overflow-hidden">
                <img
                  src="/assets/logo1.png"
                  alt="DSC Pay"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09265e]">
                Welcome Back! 👋
              </h2>

              <p className="mt-2 text-gray-500 text-sm sm:text-base">
                Login to your account to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8">
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#31466b] mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7d8eaa]">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="username"
                    required
                    className="w-full h-[56px] pl-12 pr-4 rounded-xl border border-[#d8e2f0] bg-[#fbfdff] text-[#243b61] placeholder:text-[#9aa8bc] outline-none transition-all focus:border-[#1682f4] focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#31466b] mb-2">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7d8eaa]">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="10" width="18" height="11" rx="2" />
                      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                    </svg>
                  </div>

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full h-[56px] pl-12 pr-12 rounded-xl border border-[#d8e2f0] bg-[#fbfdff] text-[#243b61] placeholder:text-[#9aa8bc] outline-none transition-all focus:border-[#1682f4] focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7d8eaa] hover:text-[#147bf2]"
                  >
                    {showPassword ? (
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 4.4A9.6 9.6 0 0 1 12 4c5 0 9 4 10 8a10.6 10.6 0 0 1-3.1 5" />
                        <path d="M6.6 6.6A10.3 10.3 0 0 0 2 12c1 4 5 8 10 8 1.7 0 3.2-.4 4.6-1.1" />
                      </svg>
                    ) : (
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              {/* <div className="flex items-center justify-between mb-7">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#1682f4]"
                  />

                  <span className="text-sm font-medium text-[#4f6383]">
                    Remember Me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#147bf2] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div> */}

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[56px] rounded-xl bg-gradient-to-r from-[#087cf0] to-[#0c65dc] hover:from-[#086ee0] hover:to-[#0958c5] text-white font-bold text-lg shadow-[0_10px_25px_rgba(10,115,240,0.25)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity=".3"
                      />
                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>

                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Login
                    <span className="text-xl">→</span>
                  </span>
                )}
              </button>

              {/* Message */}
              {message && (
                <div
                  className={`mt-4 text-center text-sm font-semibold ${message.toLowerCase().includes("successful")
                    ? "text-green-600"
                    : "text-red-500"
                    }`}
                >
                  {message}
                </div>
              )}


              {/* Signup */}
              <div className="text-center mt-7">
                <span className="text-sm text-[#7c8ba2]">
                  Don&apos;t have an account?{" "}
                </span>

                <Link
                  href="/signup"
                  className="text-[#087cf0] font-bold text-sm hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserAuth;