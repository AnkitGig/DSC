"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

const KycForm = () => {
  const [aadhaar_no, setAadhaar] = useState("");
  const [profile_image, setImage] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [pan_number, setPanNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [panDemoImg, setPanDemoImg] = useState("");
  const [aadhaarFrontDemoImg, setAadhaarFrontDemoImg] = useState("");
  const [aadhaarBackDemoImg, setAadhaarBackDemoImg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleKyc = async () => {
    try {
      let userId = localStorage.getItem("userId");
      if (!userId) {
        const token = localStorage.getItem("token");
        if (token) {
          userId = JSON.parse(atob(token.split(".")[1])).id;
        }
      }

      if (!userId) {
        alert("User session not found. Please log in again.");
        router.push("/login");
        return;
      }

      const res = await API.put(`/users/kyc/${userId}`, {
        aadhaar_no,
        profile_image,
        first_name,
        last_name,
        pan_number,
        address,
        pincode,
        city,
        state,
        country,
        date_of_birth,
        businessName,
        bankAccount,
        bankIfsc,
      });

      alert(res.data.message || "KYC updated successfully!");
      router.push("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update KYC. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:ml-64">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 my-8">
        {!showForm ? (
          <>
            <div className="flex w-full mb-8">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-blue-600 text-white">1</div>
                <span className="mt-2 font-semibold text-blue-700">KYC Documents</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">2</div>
                <span className="mt-2 text-gray-500 font-semibold">My Profile</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">3</div>
                <span className="mt-2 text-gray-500 font-semibold">KYC Video</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* PAN Card */}
              <div className="border-2 border-blue-300 rounded-lg flex flex-col items-center p-6 relative">
                <div className="text-lg font-semibold mb-2">PAN Card</div>
                <div className="text-gray-500 mb-2">KYC Pending</div>
                <div className="flex flex-col items-center justify-center flex-1 w-full">
                  <label className="w-20 h-20 border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center text-4xl text-blue-400 bg-blue-50 mb-2 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setPanDemoImg(url);
                        }
                      }}
                    />
                    +
                    {panDemoImg && (
                      <img
                        src={panDemoImg}
                        alt="PAN Preview"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full z-10"
                      />
                    )}
                  </label>
                  <div className="text-xs text-gray-400">Drag files to upload / <span className="text-blue-500 cursor-pointer">Browse</span></div>
                </div>
              </div>

              {/* Aadhaar Card Front */}
              <div className="border-2 border-blue-300 rounded-lg flex flex-col items-center p-6 relative">
                <div className="text-lg font-semibold mb-2">Aadhaar Card Front</div>
                <div className="text-gray-500 mb-2">KYC Uploaded</div>
                <div className="flex flex-col items-center justify-center flex-1 w-full">
                  <label className="w-20 h-20 border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center text-4xl text-blue-400 bg-blue-50 mb-2 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setAadhaarFrontDemoImg(url);
                        }
                      }}
                    />
                    +
                    {aadhaarFrontDemoImg && (
                      <img
                        src={aadhaarFrontDemoImg}
                        alt="Aadhaar Front Preview"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full z-10"
                      />
                    )}
                  </label>
                  <div className="text-xs text-gray-400">Drag files to upload / <span className="text-blue-500 cursor-pointer">Browse</span></div>
                </div>
              </div>

              {/* Aadhaar Card Back */}
              <div className="border-2 border-blue-300 rounded-lg flex flex-col items-center p-6 relative">
                <div className="text-lg font-semibold mb-2">Aadhaar Card Back</div>
                <div className="text-gray-500 mb-2">KYC Uploaded</div>
                <div className="flex flex-col items-center justify-center flex-1 w-full">
                  <label className="w-20 h-20 border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center text-4xl text-blue-400 bg-blue-50 mb-2 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setAadhaarBackDemoImg(url);
                        }
                      }}
                    />
                    +
                    {aadhaarBackDemoImg && (
                      <img
                        src={aadhaarBackDemoImg}
                        alt="Aadhaar Back Preview"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-full z-10"
                      />
                    )}
                  </label>
                  <div className="text-xs text-gray-400">Drag files to upload / <span className="text-blue-500 cursor-pointer">Browse</span></div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-2 rounded-full transition duration-200 text-lg shadow"
                onClick={() => setShowForm(true)}
              >
                SUBMIT
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleKyc();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="PAN Number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={pan_number}
                  onChange={(e) => setPanNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative col-span-2">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="State"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={date_of_birth}
                  onChange={(e) => setDOB(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  placeholder="Aadhaar Number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={aadhaar_no}
                  onChange={(e) => setAadhaar(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Profile Image URL (Optional)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={profile_image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              {profile_image && (
                <div className="flex justify-center items-center">
                  <img
                    src={profile_image}
                    alt="Profile Preview"
                    className="h-20 w-20 rounded-full object-cover border-2 border-blue-400"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative md:col-span-1">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bank Account Number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bank IFSC"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={bankIfsc}
                  onChange={(e) => setBankIfsc(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition duration-200"
                onClick={() => setShowForm(false)}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded transition duration-200"
              >
                Submit KYC
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default KycForm;
