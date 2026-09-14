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
    <main className="h-screen w-full overflow-hidden bg-[#eef7ff]">
      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-100/70 blur-3xl" />

        <div className="absolute top-[10%] right-[30%] w-24 h-24 bg-blue-200/20 rotate-45 rounded-3xl" />
      </div>

      {/* ================= MAIN ================= */}
      <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto grid lg:grid-cols-[1.35fr_0.85fr]">
        {/* ======================================================
            LEFT SIDE
        ====================================================== */}
        <section className="relative h-full overflow-hidden px-6 sm:px-10 lg:px-12 xl:px-16 py-5 flex flex-col">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <div className="w-[48px] h-[48px] rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src="/assets/logo1.png"
                alt="DSC Pay"
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="ml-3">
              <h1 className="text-[24px] sm:text-[27px] font-extrabold leading-none tracking-tight text-[#073b91]">
                DSC PAY
              </h1>

              <p className="text-[11px] sm:text-xs text-[#687891] font-medium mt-1">
                Digital Service Centre
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-5 sm:mt-6 max-w-[560px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-sm px-3 py-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-[#164ba3]">
                🇮🇳 Digital India
              </span>

              <span className="text-gray-300">•</span>

              <span className="text-[11px] sm:text-xs font-medium text-gray-500">
                Digital Seva
              </span>
            </div>

            {/* Heading */}
            <div className="mt-4">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[45px] xl:text-[50px] leading-[0.98] font-extrabold text-[#09265e]">
                All Digital Services
                <span className="block text-[#087cf0] mt-1">
                  Under One Roof
                </span>
              </h2>

              <div className="flex items-center gap-2.5 mt-3 text-[#687891] text-xs sm:text-sm font-medium">
                <span>Fast</span>
                <span>|</span>
                <span>Secure</span>
                <span>|</span>
                <span>Reliable</span>
              </div>

              <p className="mt-3 text-[#64728b] text-xs sm:text-sm lg:text-[15px] leading-5 max-w-[500px]">
                DSC Pay is your trusted digital service centre for a smarter,
                simpler and more connected India.
              </p>
            </div>

            {/* ================= SERVICES ================= */}
            <div className="mt-5 space-y-2.5 max-w-[500px]">
              {/* Money Transfer */}
              <ServiceItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
                  </svg>
                }
                bg="bg-gradient-to-br from-blue-500 to-cyan-400"
                title="Money Transfer"
                description="Send money instantly"
              />

              {/* Mobile Recharge */}
              <ServiceItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M10 18h4" />
                  </svg>
                }
                bg="bg-gradient-to-br from-green-500 to-emerald-400"
                title="Mobile Recharge"
                description="Stay connected"
              />

              {/* Bill Payments */}
              <ServiceItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="5" y="3" width="14" height="18" rx="2" />
                    <path d="M8 8h8M8 12h8M8 16h4" />
                  </svg>
                }
                bg="bg-gradient-to-br from-violet-500 to-indigo-500"
                title="Bill Payments"
                description="Pay your bills easily"
              />

              {/* Insurance */}
              <ServiceItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                }
                bg="bg-gradient-to-br from-orange-400 to-yellow-400"
                title="Insurance & More"
                description="Your needs, our priority"
              />
            </div>
          </div>

          {/* ================= CENTER DESK VISUAL ================= */}
          <div className="hidden lg:block absolute right-[-15px] bottom-[4px] w-[500px] h-[295px] pointer-events-none">
            {/* Desk */}
            <div className="absolute bottom-0 left-0 w-full h-[75px] bg-gradient-to-t from-[#d5af88] to-[#eed4b5] rounded-t-[70px] rotate-[-2deg]" />

            {/* Laptop */}
            <div className="absolute left-[50px] bottom-[48px] w-[340px]">
              <div className="h-[195px] bg-gradient-to-br from-[#3b485c] to-[#151d2a] rounded-[15px] border-[6px] border-[#283545] shadow-2xl rotate-[-4deg]">
                <div className="m-2 h-[169px] rounded-lg bg-[#eaf5ff] overflow-hidden">
                  <div className="h-7 bg-[#123e88] flex items-center px-2.5 gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>

                  <div className="p-3 grid grid-cols-3 gap-2">
                    <div className="h-11 rounded-md bg-white shadow-sm" />
                    <div className="h-11 rounded-md bg-white shadow-sm" />
                    <div className="h-11 rounded-md bg-white shadow-sm" />

                    <div className="h-16 rounded-md bg-blue-50 col-span-2" />
                    <div className="h-16 rounded-md bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="mx-auto w-[365px] h-[14px] bg-gradient-to-b from-[#abb4c1] to-[#667181] rounded-b-[30px] shadow-xl" />
            </div>

            {/* Plant */}
            <div className="absolute right-[10px] bottom-[58px]">
              <div className="w-[62px] h-[70px] bg-white rounded-b-[24px] rounded-t-lg shadow-lg" />

              <div className="absolute bottom-[60px] left-[29px] w-[4px] h-[90px] bg-green-700 rounded-full" />

              <div className="absolute bottom-[100px] left-[4px] w-11 h-6 bg-green-500 rounded-[100%_0_100%_0] rotate-[-35deg]" />

              <div className="absolute bottom-[125px] left-[30px] w-11 h-6 bg-green-600 rounded-[0_100%_0_100%] rotate-[30deg]" />
            </div>
          </div>

          {/* ================= SECURITY ================= */}
          <div className="mt-auto mb-1 flex items-center gap-2.5 text-[#355078]">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-blue-100 flex items-center justify-center">
              <svg
                width="17"
                height="17"
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
              <p className="font-bold text-[11px]">100% Safe & Secure</p>
              <p className="text-[9px] text-gray-500">
                Powered by Digital India 🇮🇳
              </p>
            </div>
          </div>

          {/* Bottom curve */}
          <div className="absolute -bottom-[145px] -left-[70px] w-[600px] h-[190px] bg-[#0069d9] rounded-[50%] opacity-95 pointer-events-none" />
        </section>

        {/* ======================================================
            RIGHT SIDE
        ====================================================== */}
        <section className="relative h-full flex items-center justify-center px-4 sm:px-6 py-4 lg:py-0">
          <div className="absolute inset-0 bg-white/20 pointer-events-none" />

          {/* LOGIN CARD */}
          <div className="relative w-full max-w-[410px] rounded-[21px] bg-white shadow-[0_16px_45px_rgba(20,69,130,0.14)] border border-white px-5 py-5 sm:px-6 sm:py-6">
            {/* Logo */}
            <div className="flex justify-center mb-3">
              <div className="w-[50px] h-[50px] rounded-xl border border-blue-200 bg-white shadow-sm overflow-hidden">
                <img
                  src="/assets/logo1.png"
                  alt="DSC Pay"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h2 className="text-[25px] sm:text-[28px] font-extrabold text-[#09265e] leading-tight">
                Welcome Back! 👋
              </h2>

              <p className="mt-1.5 text-gray-500 text-xs sm:text-sm">
                Login to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="mt-5">
              {/* EMAIL */}
              <div className="mb-3.5">
                <label className="block text-xs font-semibold text-[#31466b] mb-1.5">
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d8eaa]">
                    <svg
                      width="18"
                      height="18"
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
                    className="w-full h-[47px] pl-11 pr-3.5 rounded-xl border border-[#d8e2f0] bg-[#fbfdff] text-sm text-[#243b61] placeholder:text-[#9aa8bc] outline-none transition-all focus:border-[#1682f4] focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3.5">
                <label className="block text-xs font-semibold text-[#31466b] mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d8eaa]">
                    <svg
                      width="18"
                      height="18"
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
                    className="w-full h-[47px] pl-11 pr-11 rounded-xl border border-[#d8e2f0] bg-[#fbfdff] text-sm text-[#243b61] placeholder:text-[#9aa8bc] outline-none transition-all focus:border-[#1682f4] focus:ring-4 focus:ring-blue-100"
                  />

                  {/* Show password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7d8eaa] hover:text-[#147bf2] transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="18"
                        height="18"
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
                        width="18"
                        height="18"
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

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] rounded-xl bg-gradient-to-r from-[#087cf0] to-[#0c65dc] hover:from-[#086ee0] hover:to-[#0958c5] text-white font-bold text-base shadow-[0_8px_20px_rgba(10,115,240,0.22)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
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
                    <span className="text-lg">→</span>
                  </span>
                )}
              </button>

              {/* MESSAGE */}
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

              {/* SIGN UP */}
              <div className="text-center mt-4">
                <span className="text-xs text-[#7c8ba2]">
                  Don&apos;t have an account?{" "}
                </span>

                <Link
                  href="/signup"
                  className="text-[#087cf0] font-bold text-xs hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
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