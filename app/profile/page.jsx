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
  FaGlobe,
  FaCity,
} from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const fileInputRef = useRef(null);

  // Form state
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
      const token = typeof window !== "undefined" ? localStorage.getItem("token") || sessionStorage.getItem("token") : null;
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || sessionStorage.getItem("userId") : null;

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
      showNotification("Error loading profile", "error");
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
      showNotification("Please select a valid image file (PNG, JPG, WEBP)", "error");
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size should be less than 5MB", "error");
      return;
    }

    try {
      setUploadingImage(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") || sessionStorage.getItem("token") : null;
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || sessionStorage.getItem("userId") : null;

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

        // Automatically save new avatar to user profile immediately
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
          } else {
            showNotification("Image uploaded, click 'Save Changes' to update profile", "success");
          }
        }
      } else {
        showNotification(data.error || "Failed to upload image to Cloudinary", "error");
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      showNotification("Error uploading image. Please check your network.", "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") || sessionStorage.getItem("token") : null;
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || sessionStorage.getItem("userId") : null;

      if (!token || !userId) {
        showNotification("Authentication session expired. Please log in again.", "error");
        return;
      }

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
        showNotification(data.error || "Failed to save profile changes", "error");
      }
    } catch (err) {
      console.error("Profile save error:", err);
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
      : user.name || "User"
    : "Retailer";

  const avatarUrl = formData.profile_image || user?.profile_image || "/assets/boy.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 py-8 px-4 md:ml-64 transition-all">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border text-sm font-semibold transition-all transform animate-in fade-in slide-in-from-top-4 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-500/95 text-white border-emerald-400 shadow-emerald-900/30"
              : "bg-rose-500/95 text-white border-rose-400 shadow-rose-900/30"
          }`}
        >
          <FaCheckCircle className="text-lg shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8 relative overflow-hidden">
          {/* Top Decorative Banner Accent */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-2">
            {/* Avatar & User Core Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
              {/* Avatar with Cloudinary Upload Overlay */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-blue-500/30 shadow-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center relative">
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
                    <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center text-white gap-1">
                      <FaSpinner className="animate-spin text-2xl text-cyan-400" />
                      <span className="text-[10px] font-bold">Uploading...</span>
                    </div>
                  )}
                </div>

                {/* Change Avatar Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  title="Upload profile picture to Cloudinary"
                  className="absolute -bottom-1.5 -right-1.5 p-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-2xl shadow-lg border-2 border-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <FaCamera size={13} />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
              </div>

              {/* Names, Roles, Badges */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {loading ? "Loading..." : displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <RiShieldCheckFill className="text-sm text-blue-600" />
                    <span>Verified Retailer</span>
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-600 flex items-center justify-center sm:justify-start gap-2">
                  <FaEnvelope className="text-slate-400 text-xs" />
                  <span>{user?.email || "retailer@dscpay.com"}</span>
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>KYC {user?.kyc_status ? "Verified" : "Active"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded-xl">
                    <FaWallet className="text-indigo-600 text-xs" />
                    <span>₹{user ? Number(user.wallet_balance || 0).toLocaleString("en-IN") : "0.00"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Edit Button */}
            <div className="shrink-0 flex items-center gap-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95"
                >
                  <FaEdit size={14} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition-all cursor-pointer"
                  >
                    <FaTimes size={13} />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95 disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <FaSpinner className="animate-spin text-sm" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaSave size={14} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details Sections */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* 1. Personal Information */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                <FaUser />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.first_name || "-"}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.last_name || "-"}
                  </div>
                )}
              </div>

              {/* Email (Read only) */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="px-4 py-2.5 bg-slate-100/80 border border-slate-200/80 rounded-xl text-slate-600 text-sm font-medium flex items-center justify-between">
                  <span>{user?.email || "retailer@dscpay.com"}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.phone || "-"}
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
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

          {/* 2. Identity & KYC Details */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                <FaIdCard />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Identity & Verification</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Aadhaar Number */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition tracking-wider"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold tracking-wider">
                    {formData.aadhaar_no || "-"}
                  </div>
                )}
              </div>

              {/* PAN Number */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition uppercase tracking-wider"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold uppercase tracking-wider">
                    {formData.pan_number || "-"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Address & Location */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
                <FaMapMarkerAlt />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Address Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Street / Detailed Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full street address"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.address || "-"}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.city || "-"}
                  </div>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.state || "-"}
                  </div>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Pincode
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter 6-digit pincode"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.pincode || "-"}
                  </div>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.country || "India"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Business & Banking Details */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                <FaUniversity />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Business & Bank Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Business Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Shop / Business Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter shop or business enterprise name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold">
                    {formData.businessName || "-"}
                  </div>
                )}
              </div>

              {/* Bank Account */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Bank Account Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    placeholder="Enter bank account number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold font-mono">
                    {formData.bankAccount || "-"}
                  </div>
                )}
              </div>

              {/* Bank IFSC */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Bank IFSC Code
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bankIfsc"
                    value={formData.bankIfsc}
                    onChange={handleInputChange}
                    placeholder="Enter IFSC code (e.g. SBIN0001234)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm font-semibold transition uppercase font-mono"
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 text-sm font-semibold uppercase font-mono">
                    {formData.bankIfsc || "-"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar when editing */}
          {isEditing && (
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 flex items-center justify-end gap-3 sticky bottom-4 z-20">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform active:scale-95 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave size={14} />
                    <span>Save All Changes</span>
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

