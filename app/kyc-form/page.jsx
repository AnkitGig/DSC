"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import {
  FaIdCard,
  FaShieldAlt,
  FaUniversity,
  FaUser,
  FaCheckCircle,
  FaUpload,
  FaArrowRight,
  FaArrowLeft,
  FaLock,
  FaPhoneAlt,
  FaTrash,
} from "react-icons/fa";

const KycForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    aadhaar_no: "",
    pan_number: "",
    date_of_birth: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "India",
    businessName: "",
    bankAccount: "",
    bankIfsc: "",
    profile_image: "",
  });

  // Upload previews
  const [panPreview, setPanPreview] = useState("");
  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState("");
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState("");

  // Pre-fill existing user info
  useEffect(() => {
    async function loadUserData() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

        if (token && userId) {
          const res = await API.get(`/users/profile/${userId}`);
          if (res.data?.user) {
            const u = res.data.user;
            setFormData((prev) => ({
              ...prev,
              first_name: u.first_name || (u.name ? u.name.split(" ")[0] : ""),
              last_name: u.last_name || (u.name && u.name.split(" ").length > 1 ? u.name.split(" ").slice(1).join(" ") : ""),
              aadhaar_no: u.aadhaar_no || "",
              pan_number: u.pan_number || "",
              date_of_birth: u.date_of_birth ? u.date_of_birth.substring(0, 10) : "",
              phone: u.phone || "",
              email: u.email || "",
              address: u.address || "",
              pincode: u.pincode || "",
              city: u.city || "",
              state: u.state || "",
              country: u.country || "India",
              businessName: u.businessName || "",
              bankAccount: u.bankAccount || "",
              bankIfsc: u.bankIfsc || "",
              profile_image: u.profile_image || "",
            }));
          }
        }
      } catch (err) {
        console.log("Could not load user data:", err);
      } finally {
        setFetchingData(false);
      }
    }

    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pan_number" || name === "bankIfsc" ? value.toUpperCase() : value,
    }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "pan") setPanPreview(url);
      if (type === "aadhaar_front") setAadhaarFrontPreview(url);
      if (type === "aadhaar_back") setAadhaarBackPreview(url);
    }
  };

  const handleKycSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      let userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
      if (!userId) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            userId = JSON.parse(atob(token.split(".")[1])).id;
          } catch (err) {}
        }
      }

      if (!userId) {
        alert("Session not found. Please log in again.");
        router.push("/login");
        return;
      }

      const res = await API.put(`/users/kyc/${userId}`, {
        ...formData,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("kyc_status", "true");
        window.dispatchEvent(new Event("auth-change"));
      }

      alert(res.data?.message || "KYC Submitted & Verified Successfully! All services are unlocked.");
      router.push("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to submit KYC. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 lg:p-8 text-slate-800 font-sans pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#081a42] via-[#0f2963] to-[#1d68f6] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-cyan-300 mb-2 border border-white/15">
                <FaShieldAlt /> Regulatory RBI & UIDAI Compliance
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Retailer KYC Verification
              </h1>
              <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                Complete your one-time digital KYC verification to instantly unlock AEPS, Money Transfer, Utility & Banking services on DSC Pay.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 self-start md:self-auto shrink-0">
              <FaLock className="text-cyan-300 text-base" />
              <div className="text-left">
                <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Security</div>
                <div className="text-xs font-black text-white">256-Bit SSL Encrypted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
            {/* Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex flex-col sm:flex-row items-center gap-2.5 p-2.5 rounded-xl transition text-left cursor-pointer ${
                currentStep === 1
                  ? "bg-blue-50/80 border border-blue-200 text-[#1d68f6]"
                  : currentStep > 1
                  ? "text-emerald-700 bg-emerald-50/50"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  currentStep === 1
                    ? "bg-[#1d68f6] text-white shadow-xs"
                    : currentStep > 1
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {currentStep > 1 ? <FaCheckCircle size={14} /> : "1"}
              </div>
              <div className="overflow-hidden text-center sm:text-left">
                <div className="text-xs font-black leading-tight">Document Upload</div>
                <div className="text-[10px] opacity-75 hidden sm:block">Aadhaar & PAN Cards</div>
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex flex-col sm:flex-row items-center gap-2.5 p-2.5 rounded-xl transition text-left cursor-pointer ${
                currentStep === 2
                  ? "bg-blue-50/80 border border-blue-200 text-[#1d68f6]"
                  : currentStep > 2
                  ? "text-emerald-700 bg-emerald-50/50"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  currentStep === 2
                    ? "bg-[#1d68f6] text-white shadow-xs"
                    : currentStep > 2
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {currentStep > 2 ? <FaCheckCircle size={14} /> : "2"}
              </div>
              <div className="overflow-hidden text-center sm:text-left">
                <div className="text-xs font-black leading-tight">Personal & Address</div>
                <div className="text-[10px] opacity-75 hidden sm:block">Identity Details</div>
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => setCurrentStep(3)}
              className={`flex flex-col sm:flex-row items-center gap-2.5 p-2.5 rounded-xl transition text-left cursor-pointer ${
                currentStep === 3
                  ? "bg-blue-50/80 border border-blue-200 text-[#1d68f6]"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  currentStep === 3
                    ? "bg-[#1d68f6] text-white shadow-xs"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                3
              </div>
              <div className="overflow-hidden text-center sm:text-left">
                <div className="text-xs font-black leading-tight">Bank & Settlement</div>
                <div className="text-[10px] opacity-75 hidden sm:block">Payout Details</div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 relative">
          {fetchingData ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs font-bold text-slate-600">Loading your profile details...</p>
            </div>
          ) : (
            <div>
              {/* STEP 1: DOCUMENT UPLOADS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-[#0a1e4d] flex items-center gap-2">
                      <FaIdCard className="text-[#1d68f6]" /> Step 1: Upload Identification Documents
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload clear, legible photos or scanned copies of your PAN and Aadhaar cards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* PAN Card Upload */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-[#f9fbfd] rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all group">
                      <div className="w-full">
                        <div className="text-xs font-black text-slate-800 mb-1">PAN Card Front</div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
                          {panPreview ? "Uploaded" : "Required"}
                        </span>
                      </div>

                      <div className="my-2 w-full flex flex-col items-center">
                        {panPreview ? (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-2xs group-hover:scale-[1.02] transition">
                            <img src={panPreview} alt="PAN Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setPanPreview("")}
                              className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg shadow-sm hover:bg-rose-700 transition cursor-pointer"
                              title="Remove"
                            >
                              <FaTrash size={10} />
                            </button>
                          </div>
                        ) : (
                          <label className="w-full py-7 border-2 border-dashed border-blue-200 rounded-xl bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition shadow-2xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "pan")}
                            />
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 shadow-2xs">
                              <FaUpload size={14} />
                            </div>
                            <span className="text-xs font-bold text-blue-600">Choose File</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG (Max 5MB)</span>
                          </label>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-2">Make sure PAN name is legible</div>
                    </div>

                    {/* Aadhaar Card Front */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-[#f9fbfd] rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all group">
                      <div className="w-full">
                        <div className="text-xs font-black text-slate-800 mb-1">Aadhaar Card Front</div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
                          {aadhaarFrontPreview ? "Uploaded" : "Required"}
                        </span>
                      </div>

                      <div className="my-2 w-full flex flex-col items-center">
                        {aadhaarFrontPreview ? (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-2xs group-hover:scale-[1.02] transition">
                            <img src={aadhaarFrontPreview} alt="Aadhaar Front Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setAadhaarFrontPreview("")}
                              className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg shadow-sm hover:bg-rose-700 transition cursor-pointer"
                              title="Remove"
                            >
                              <FaTrash size={10} />
                            </button>
                          </div>
                        ) : (
                          <label className="w-full py-7 border-2 border-dashed border-blue-200 rounded-xl bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition shadow-2xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "aadhaar_front")}
                            />
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 shadow-2xs">
                              <FaUpload size={14} />
                            </div>
                            <span className="text-xs font-bold text-blue-600">Choose File</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG (Max 5MB)</span>
                          </label>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-2">Front page with 12-digit number</div>
                    </div>

                    {/* Aadhaar Card Back */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-[#f9fbfd] rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all group">
                      <div className="w-full">
                        <div className="text-xs font-black text-slate-800 mb-1">Aadhaar Card Back</div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
                          {aadhaarBackPreview ? "Uploaded" : "Required"}
                        </span>
                      </div>

                      <div className="my-2 w-full flex flex-col items-center">
                        {aadhaarBackPreview ? (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-2xs group-hover:scale-[1.02] transition">
                            <img src={aadhaarBackPreview} alt="Aadhaar Back Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setAadhaarBackPreview("")}
                              className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg shadow-sm hover:bg-rose-700 transition cursor-pointer"
                              title="Remove"
                            >
                              <FaTrash size={10} />
                            </button>
                          </div>
                        ) : (
                          <label className="w-full py-7 border-2 border-dashed border-blue-200 rounded-xl bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition shadow-2xs">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "aadhaar_back")}
                            />
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 shadow-2xs">
                              <FaUpload size={14} />
                            </div>
                            <span className="text-xs font-bold text-blue-600">Choose File</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG (Max 5MB)</span>
                          </label>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-2">Back page with full address</div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-[#1d68f6] hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20 transition cursor-pointer"
                    >
                      <span>Proceed to Personal Details</span>
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PERSONAL & ADDRESS DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-[#0a1e4d] flex items-center gap-2">
                      <FaUser className="text-[#1d68f6]" /> Step 2: Personal & Identity Information
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ensure all name and ID details match your government documents exactly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name*</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="e.g. Rohit"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name*</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="e.g. Kumar"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of Birth*</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">PAN Card Number*</label>
                      <input
                        type="text"
                        name="pan_number"
                        value={formData.pan_number}
                        onChange={handleChange}
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition font-mono uppercase"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Aadhaar Number (12 Digits)*</label>
                      <input
                        type="text"
                        name="aadhaar_no"
                        value={formData.aadhaar_no}
                        onChange={handleChange}
                        maxLength={12}
                        placeholder="1234 5678 9012"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Shop / Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Digital Seva Kendra"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition"
                      />
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Residential / Shop Address*</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Street, Ward / House No., Landmark"
                      className="w-full px-3.5 py-2 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">City / District*</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Patna"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">State*</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Bihar"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">PIN Code (6 Digits)*</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="e.g. 800001"
                        className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer"
                    >
                      <FaArrowLeft size={11} />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-[#1d68f6] hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20 transition cursor-pointer"
                    >
                      <span>Proceed to Bank Details</span>
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: BANK & SETTLEMENT DETAILS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-[#0a1e4d] flex items-center gap-2">
                      <FaUniversity className="text-[#1d68f6]" /> Step 3: Bank Account for Wallet Settlements
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Your earnings, AEPS withdrawals, and recharge commissions will be settled to this verified bank account.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Bank Account Number*</label>
                      <input
                        type="text"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleChange}
                        placeholder="e.g. 50100239485123"
                        className="w-full px-3.5 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Bank IFSC Code*</label>
                      <input
                        type="text"
                        name="bankIfsc"
                        value={formData.bankIfsc}
                        onChange={handleChange}
                        maxLength={11}
                        placeholder="e.g. HDFC0001234"
                        className="w-full px-3.5 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#1d68f6] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition font-mono uppercase"
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Confirmation Alert */}
                  <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-start gap-3">
                    <FaShieldAlt className="text-[#1d68f6] mt-0.5 shrink-0" size={16} />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-[#0a1e4d] block mb-0.5">Retailer Declaration & Consent</span>
                      By clicking Submit, I hereby declare that all information and documents uploaded are authentic and belong to me. I consent to DSC Pay verifying my Aadhaar & PAN details with respective regulatory authorities.
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer"
                    >
                      <FaArrowLeft size={11} />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleKycSubmit}
                      className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-black rounded-xl flex items-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying & Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle size={15} />
                          <span>Submit & Complete KYC</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Support Callout */}
        <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600">
            <FaPhoneAlt className="text-blue-600" />
            <span>Need help with KYC document verification? Call <strong>+91-9285356192</strong></span>
          </div>
          <div className="text-slate-400 text-[11px]">
            DSC Pay Portal &copy; {new Date().getFullYear()} Digital Service Centre
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycForm;
