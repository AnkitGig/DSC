"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaIdCard,
  FaMapMarkerAlt,
  FaBuilding,
  FaUniversity,
  FaCamera,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaSpinner,
  FaWallet,
  FaShieldAlt,
} from "react-icons/fa";
import { RiShieldCheckFill, RiBankFill } from "react-icons/ri";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    aadhaar_no: "",
    pan_number: "",
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

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || sessionStorage.getItem("token")
          : null;
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId") || sessionStorage.getItem("userId")
          : null;

      if (!token || !userId) {
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          populateForm(data.user);
        }
      } else {
        showNotification("Failed to load profile details", "error");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (userData) => {
    let formattedDob = "";
    if (userData.date_of_birth) {
      try {
        const d = new Date(userData.date_of_birth);
        formattedDob = d.toISOString().split("T")[0];
      } catch (e) {
        formattedDob = userData.date_of_birth;
      }
    }

    setFormData({
      first_name: userData.first_name || userData.name?.split(" ")[0] || "",
      last_name: userData.last_name || userData.name?.split(" ").slice(1).join(" ") || "",
      phone: userData.phone || "",
      date_of_birth: formattedDob || "",
      aadhaar_no: userData.aadhaar_no || "",
      pan_number: userData.pan_number || "",
      address: userData.address || "",
      pincode: userData.pincode || "",
      city: userData.city || "",
      state: userData.state || "",
      country: userData.country || "India",
      businessName: userData.businessName || "",
      bankAccount: userData.bankAccount || "",
      bankIfsc: userData.bankIfsc || "",
      profile_image: userData.profile_image || "",
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "pan_number" || name === "bankIfsc") {
      formattedValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("Please select a valid image file", "error");
      return;
    }

    try {
      setUploadingImage(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || sessionStorage.getItem("token")
          : null;
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId") || sessionStorage.getItem("userId")
          : null;

      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/users/profile/upload", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: uploadData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, profile_image: data.url }));

        if (userId) {
          const updateRes = await fetch(`/api/users/profile/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ profile_image: data.url }),
          });

          if (updateRes.ok) {
            const updatedData = await updateRes.json();
            setUser(updatedData.user);
            showNotification("Profile picture updated successfully!", "success");
            window.dispatchEvent(new Event("auth-change"));
          }
        }
      } else {
        showNotification(data.error || "Failed to upload image", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("Error uploading image", "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || sessionStorage.getItem("token")
          : null;
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId") || sessionStorage.getItem("userId")
          : null;

      if (!token || !userId) return;

      const res = await fetch(`/api/users/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
        populateForm(data.user);
        setIsEditing(false);
        showNotification("Profile updated successfully!", "success");
        window.dispatchEvent(new Event("auth-change"));
      } else {
        showNotification(data.error || "Failed to update profile", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      populateForm(user);
    }
    setIsEditing(false);
  };

  const displayName = user
    ? user.first_name
      ? `${user.first_name} ${user.last_name || ""}`.trim()
      : user.name || "Retailer"
    : "Retailer";

  const avatarUrl = formData.profile_image || user?.profile_image || "/assets/boy.png";

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-20 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-bold transition-all animate-in fade-in duration-200 border ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <FaCheckCircle className={toast.type === "success" ? "text-emerald-600" : "text-rose-600"} size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. Page Header & Stats */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              My Profile
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
              View and manage your account details, KYC verification and bank information.
            </p>
          </div>

          {/* Quick Header Stat Cards */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Wallet Balance */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-2xs min-w-[150px]">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1d68f6] flex items-center justify-center text-sm shrink-0 font-bold">
                <FaWallet />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Wallet Balance
                </div>
                <div className="text-sm font-black text-[#0a1e4d] mt-0.5">
                  ₹{user ? Number(user.wallet_balance || 0).toLocaleString("en-IN") : "0"}
                </div>
              </div>
            </div>

            {/* KYC Status */}
            <div className="flex-1 sm:flex-initial bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-2xs min-w-[150px]">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm shrink-0 font-bold">
                <FaShieldAlt />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  KYC Status
                </div>
                <div className="text-sm font-black text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span>Verified</span>
                  <RiShieldCheckFill className="text-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* 2. Top Profile Hero Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              {/* Profile Avatar */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-[#1d68f6] to-blue-400 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-[14px] bg-white overflow-hidden flex items-center justify-center relative">
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/boy.png";
                      }}
                    />

                    {uploadingImage && (
                      <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white">
                        <FaSpinner className="animate-spin text-lg" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Photo Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  title="Update Profile Photo"
                  className="absolute -bottom-1 -right-1 p-2 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl shadow-md border-2 border-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <FaCamera size={11} />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Names, Roles */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0a1e4d] tracking-tight">
                    {loading ? "Loading..." : displayName}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
                    <RiShieldCheckFill className="text-xs" />
                    <span>Verified Retailer</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope className="text-slate-400" size={11} />
                    <span>{user?.email || "retailer@dscpay.com"}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaPhoneAlt className="text-slate-400" size={10} />
                    <span>{user?.phone || "-"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="shrink-0 flex items-center gap-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer transform active:scale-95"
                >
                  <FaEdit size={12} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <FaTimes size={11} />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <FaSpinner className="animate-spin text-xs" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaSave size={12} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Form / Details Sections */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section A: Personal Information */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1d68f6] flex items-center justify-center text-xs font-bold">
                  <FaUser />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">Personal Information</h3>
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.first_name || "-"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.last_name || "-"}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="text-xs font-semibold text-slate-600 bg-slate-100/80 border border-slate-200/70 px-3.5 py-2.5 rounded-xl flex items-center justify-between">
                    <span>{user?.email || "retailer@dscpay.com"}</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.phone || "-"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {user?.date_of_birth
                          ? new Date(user.date_of_birth).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: Identity & KYC Details */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold">
                  <FaIdCard />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">Identity & Verification</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Aadhaar Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="aadhaar_no"
                      maxLength={12}
                      value={formData.aadhaar_no}
                      onChange={handleInputChange}
                      placeholder="12 digit Aadhaar number"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50 tracking-wider"
                    />
                  ) : (
                    <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl tracking-wider">
                      {formData.aadhaar_no || "-"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    PAN Card Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pan_number"
                      maxLength={10}
                      value={formData.pan_number}
                      onChange={handleInputChange}
                      placeholder="10 digit PAN (e.g. ABCDE1234F)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50 uppercase tracking-wider"
                    />
                  ) : (
                    <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl uppercase tracking-wider">
                      {formData.pan_number || "-"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    KYC Verification Status
                  </label>
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-600" />
                    <span>KYC Verified & Portal Access Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C: Address Information */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">Address Information</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Street / Detailed Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                    />
                  ) : (
                    <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                      {formData.address || "-"}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.city || "-"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.state || "-"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Pincode
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.pincode || "-"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                        {formData.country || "India"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section D: Business & Banking Details */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
                  <RiBankFill />
                </div>
                <h3 className="text-sm font-black text-[#0a1e4d]">Business & Bank Information</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Shop / Enterprise Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter shop or business name"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50"
                    />
                  ) : (
                    <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                      {formData.businessName || "-"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Bank Account Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50 font-mono"
                    />
                  ) : (
                    <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl font-mono">
                      {formData.bankAccount || "-"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Bank IFSC Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bankIfsc"
                      value={formData.bankIfsc}
                      onChange={handleInputChange}
                      placeholder="Enter IFSC code"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs font-bold text-slate-800 bg-slate-50/50 uppercase font-mono"
                    />
                  ) : (
                    <div className="text-xs font-bold text-[#0a1e4d] bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 rounded-xl uppercase font-mono">
                      {formData.bankIfsc || "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Floating / Sticky Save Bar when in Edit Mode */}
          {isEditing && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xl flex items-center justify-end gap-3 sticky bottom-4 z-20 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer transform active:scale-95 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin text-xs" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <FaSave size={13} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;

