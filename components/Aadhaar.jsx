"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaIdCard,
  FaMobileAlt,
  FaEnvelope,
  FaHome,
  FaCamera,
  FaFingerprint,
  FaBaby,
  FaPrint,
  FaSearch,
  FaCheckCircle,
  FaTimes,
  FaBolt,
  FaShieldAlt,
  FaLock,
  FaSyncAlt,
  FaInfoCircle,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaFileAlt,
  FaArrowRight,
  FaQrcode,
  FaUserCheck,
  FaHistory,
  FaHeadset,
  FaCheck,
  FaDownload,
  FaRedoAlt,
  FaCalendarAlt,
  FaChevronDown,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { MdSensors, MdOutlineFingerprint, MdVerifiedUser } from "react-icons/md";
import { RiQrCodeLine, RiShieldCheckFill } from "react-icons/ri";

const biometricDevicesList = [
  { id: "morpho_1300", name: "Morpho MSO 1300 E3", category: "fingerprint", badge: "UIDAI L0", desc: "USB RD v3.0.1 (Optical)" },
  { id: "mantra_mfs100", name: "Mantra MFS100", category: "fingerprint", badge: "Popular", desc: "UIDAI Certified Optical Sensor" },
  { id: "mantra_mfs110", name: "Mantra MFS110 L1", category: "fingerprint", badge: "L1 Advanced", desc: "UIDAI L1 Advanced Cryptographic" },
  { id: "startek_fm220", name: "Startek FM220U", category: "fingerprint", badge: "Certified", desc: "ACPL RD Service Certified" },
  { id: "secugen_pro20", name: "SecuGen Hamster Pro 20", category: "fingerprint", badge: "Optical", desc: "Optical Sensor RD v1.0.4" },
  { id: "aratek_a600", name: "Aratek A600", category: "fingerprint", badge: "FBI PIV", desc: "FBI PIV & UIDAI Certified" },
  { id: "cogent_csd200", name: "3M Cogent CSD200", category: "fingerprint", badge: "Precision", desc: "Precision Optical Scanner" },
  { id: "mantra_mis100v2", name: "Mantra MIS100V2", category: "iris", badge: "Iris Scanner", desc: "Single/Dual Iris Camera" },
  { id: "iritech_dual", name: "IriTech IriShield", category: "iris", badge: "Dual Iris", desc: "UIDAI Certified Iris Camera" },
];

const aadhaarServicesList = [
  {
    id: "name",
    category: "demographic",
    title: "Name Updation",
    hindiTitle: "नाम संशोधन",
    description: "Update or correct spelling in legal name with valid Proof of Identity (POI).",
    icon: FaIdCard,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "POI Required",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹75.00",
    sla: "3-7 Days",
    requiredDocs: ["PAN Card", "Passport", "Voter ID", "Driving License"],
  },
  {
    id: "mobile",
    category: "demographic",
    title: "Mobile Number Updation",
    hindiTitle: "मोबाइल नंबर लिंक / अपडेट",
    description: "Link or update active mobile number for receiving UIDAI OTPs and mAadhaar access.",
    icon: FaMobileAlt,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "Biometric Auth",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹75.00",
    sla: "24-48 Hours",
    requiredDocs: ["No Document Required (Only Biometric Verification)"],
  },
  {
    id: "address",
    category: "demographic",
    title: "Address Updation",
    hindiTitle: "पता संशोधन",
    description: "Change permanent or current residential address with valid Proof of Address (POA).",
    icon: FaHome,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "POA Required",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹75.00",
    sla: "5-10 Days",
    requiredDocs: ["Electricity Bill", "Bank Passbook", "Rent Agreement", "Voter ID"],
  },
  {
    id: "dob",
    category: "demographic",
    title: "Date of Birth Updation",
    hindiTitle: "जन्म तिथि संशोधन",
    description: "Update or correct Date of Birth with valid Birth Certificate, SSLC Marksheet or Passport.",
    icon: FaCalendarAlt,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "DOB Proof Required",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹75.00",
    sla: "3-7 Days",
    requiredDocs: ["Birth Certificate", "10th / SSLC Marksheet", "Passport", "PAN Card"],
  },
  {
    id: "photo_biometric",
    category: "biometric",
    title: "Photo & Biometrics Update",
    hindiTitle: "फोटो एवं बायोमेट्रिक अपडेट",
    description: "Update facial photo, 10 fingerprints and dual iris scan for adults or mandatory 5/15 age updates.",
    icon: FaFingerprint,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "Mandatory Update",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹100.00",
    sla: "5-10 Days",
    requiredDocs: ["Valid ID Proof + Live 5-Finger Biometric Scanner"],
  },
  {
    id: "blue_card",
    category: "special",
    title: "Bal Aadhaar (Blue Card)",
    hindiTitle: "बाल आधार (नीला कार्ड)",
    description: "Apply for Blue Aadhaar Card for newborns and children below 5 years (No biometric required).",
    icon: FaBaby,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "Age 0-5 Yrs • Free",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹0.00 (Free)",
    sla: "7-15 Days",
    requiredDocs: ["Child Birth Certificate", "Parent Aadhaar Card (Father/Mother)"],
  },
  {
    id: "pvc_card",
    category: "cards",
    title: "Order Aadhaar PVC Card",
    hindiTitle: "पीवीसी आधार कार्ड ऑर्डर",
    description: "Order high-security, weather-resistant plastic PVC Smart Aadhaar card with hologram & QR code.",
    icon: FaPrint,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "Speed Post Delivery",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹50.00",
    sla: "5-7 Days Delivery",
    requiredDocs: ["12-Digit Aadhaar Number + Registered Mobile / Biometric"],
  },
  {
    id: "pan_link",
    category: "verification",
    title: "Aadhaar - PAN Link Status",
    hindiTitle: "आधार-पैन लिंक स्थिति",
    description: "Check instant linking status between Aadhaar and PAN card for income tax compliance.",
    icon: FaUserCheck,
    iconColor: "text-[#1d68f6] bg-blue-50/80 border-blue-100/90",
    badge: "Instant Verification",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    fee: "₹0.00 (Free)",
    sla: "Instant",
    requiredDocs: ["12-Digit Aadhaar + 10-Digit PAN Number"],
  },
];

const mockRecentRequests = [
  {
    id: "URN-9182749102",
    service: "Mobile Number Update",
    resident: "Rajesh Kumar Sharma",
    aadhaar: "XXXX XXXX 8291",
    date: "Today, 10:45 AM",
    status: "Success",
    urn: "0000/18294/91827",
    fee: "₹50.00",
  },
  {
    id: "URN-5829104819",
    service: "Address Updation",
    resident: "Sunita Devi",
    aadhaar: "XXXX XXXX 1048",
    date: "Today, 09:30 AM",
    status: "Processing",
    urn: "0000/29401/58291",
    fee: "₹50.00",
  },
  {
    id: "URN-7192840192",
    service: "Bal Aadhaar (Blue Card)",
    resident: "Aarav Singh (Child)",
    aadhaar: "New Enrolment",
    date: "Yesterday, 04:15 PM",
    status: "Generated",
    urn: "1092/49102/71928",
    fee: "₹0.00",
  },
  {
    id: "URN-3829104918",
    service: "Photo & Biometrics",
    resident: "Vikram Malhotra",
    aadhaar: "XXXX XXXX 4918",
    date: "11 Sep 2026",
    status: "Success",
    urn: "0000/84920/38291",
    fee: "₹100.00",
  },
];

export default function Aadhaar() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Status check bar state
  const [lookupType, setLookupType] = useState("aadhaar"); // 'aadhaar' | 'urn'
  const [lookupValue, setLookupValue] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Biometric device test modal
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("Morpho MSO 1300 E3");
  const [deviceTestState, setDeviceTestState] = useState("idle"); // 'idle' | 'scanning' | 'success'
  const [deviceQuality, setDeviceQuality] = useState(0);
  const [deviceCategoryFilter, setDeviceCategoryFilter] = useState("all");
  const [isDeviceDropdownOpen, setIsDeviceDropdownOpen] = useState(false);
  const deviceDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (deviceDropdownRef.current && !deviceDropdownRef.current.contains(event.target)) {
        setIsDeviceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Application Modal state
  const [selectedService, setSelectedService] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyStep, setApplyStep] = useState(1); // 1: Resident Info, 2: Update Data, 3: Biometric Auth, 4: Stamped Receipt
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    residentName: "",
    mobileNumber: "",
    email: "",
    newMobile: "",
    newAddress: "",
    newDob: "",
    pinCode: "",
    district: "",
    state: "",
    panNumber: "",
    childName: "",
    childDob: "",
    parentAadhaar: "",
    selectedProof: "",
    documentFile: null,
    documentName: "",
  });
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [applicationReceipt, setApplicationReceipt] = useState(null);

  // Filter services
  const filteredServices = aadhaarServicesList.filter((service) => {
    const matchesTab = activeTab === "all" || service.category === activeTab;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.hindiTitle.includes(searchQuery) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenService = (service) => {
    setSelectedService(service);
    setApplyStep(1);
    setFormData({
      aadhaarNumber: "",
      residentName: "",
      mobileNumber: "",
      email: "",
      newMobile: "",
      newAddress: "",
      newDob: "",
      pinCode: "",
      district: "",
      state: "",
      panNumber: "",
      childName: "",
      childDob: "",
      parentAadhaar: "",
      selectedProof: service?.requiredDocs?.[0] || "",
      documentFile: null,
      documentName: "",
    });
    setShowApplyModal(true);
  };

  const handleAadhaarFormat = (val) => {
    const raw = val.replace(/\D/g, "").slice(0, 12);
    return raw.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleStartBiometricScan = () => {
    setIsScanning(true);
    setScanProgress(10);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Generate URN & Receipt
          const generatedURN = `0000/${Math.floor(10000 + Math.random() * 90000)}/${Math.floor(10000 + Math.random() * 90000)}`;
          setApplicationReceipt({
            urn: generatedURN,
            service: selectedService?.title,
            residentName: formData.residentName || "N/A",
            aadhaar: formData.aadhaarNumber || "N/A",
            date: new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            fee: selectedService?.fee || "₹50.00",
            operatorId: "ASK-DSC-772910",
            kioskName: "DSC Digital Seva Kendra #104",
            deviceUsed: selectedDevice,
            qualityScore: "94% (High Quality Match)",
            status: "Submitted to UIDAI Portal",
          });
          setApplyStep(4);
          return 100;
        }
        return prev + 20;
      });
    }, 350);
  };

  const handleStatusCheck = (e) => {
    e.preventDefault();
    if (!lookupValue.trim()) {
      alert("Please enter a valid Aadhaar number or Update Request Number (URN)");
      return;
    }
    setIsCheckingStatus(true);
    setTimeout(() => {
      setIsCheckingStatus(false);
      setStatusResult({
        query: lookupValue,
        type: lookupType,
        validity: "Active & Valid Aadhaar",
        residentName: "Rajesh K*** S*****",
        gender: "Male",
        ageBand: "30 - 40 Years",
        state: "Delhi",
        mobileLinked: "Yes (Ending in *******3210)",
        emailLinked: "Yes (r******@gmail.com)",
        lastUpdateDate: "12 Aug 2026",
        statusMessage: "Your Aadhaar generation/update request is processed successfully.",
      });
      setShowStatusModal(true);
    }, 600);
  };

  const handleTestDevice = () => {
    setDeviceTestState("scanning");
    setDeviceQuality(15);
    const intv = setInterval(() => {
      setDeviceQuality((prev) => {
        if (prev >= 94) {
          clearInterval(intv);
          setDeviceTestState("success");
          return 94;
        }
        return prev + 18;
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans pb-16">
      {/* 1. TOP HEADER & PROMO BANNER */}
      <div className="max-w-7xl mx-auto mb-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <span className="text-slate-300">&gt;</span>
          <span className="text-slate-400">Government</span>
          <span className="text-slate-300">&gt;</span>
          <span className="text-blue-600">Aadhaar Services</span>
        </div>

        {/* Header Content Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Title & Subtitle */}
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
                Aadhaar Services
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                UIDAI Live
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Official UIDAI Aadhaar Update, Demographic Correction & Biometric Portal
            </p>
          </div>

          {/* Right Header Promo Card */}
          <div className="bg-gradient-to-r from-[#d8ebfc] via-[#e8f3fe] to-[#cfdff9] rounded-3xl p-3 sm:px-6 sm:py-3.5 border border-blue-200/80 shadow-xs flex items-center justify-between gap-4 min-w-[340px] sm:min-w-[420px] relative overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-md shadow-blue-500/30">
                <FaIdCard />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#0a1e4d] leading-tight">
                  Official UIDAI Seva Kendra
                </h3>
                <p className="text-[11px] font-semibold text-blue-600 mt-0.5 tracking-wide">
                  Instant Sync &nbsp;|&nbsp; 100% Certified &nbsp;|&nbsp; 256-Bit Secure
                </p>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-300/20 blur-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: 8 Service Cards Grid, Hardware Banner, 4 Badges (8 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* Section Header & Search Row */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-bold text-[#0a1e4d]">
                Select Aadhaar Service
              </h2>
              <div className="relative w-48 sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200/90 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1d68f6] shadow-2xs transition"
                />
              </div>
            </div>

            {/* 8 Cards Grid (2 rows x 4 cols on desktop matching Insurance page) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleOpenService(service)}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#1d68f6] hover:ring-2 hover:ring-blue-500/15 transition-all duration-200 flex flex-col items-center text-center cursor-pointer relative min-h-[175px] justify-between group hover:-translate-y-0.5"
                  >
                    {/* Circular Icon Container */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2.5 transition-all duration-200 border bg-blue-50/80 text-[#1d68f6] border-blue-100/90 group-hover:bg-[#1d68f6] group-hover:text-white group-hover:border-[#1d68f6] group-hover:scale-110 shadow-2xs">
                      <IconComponent />
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 flex flex-col justify-start w-full">
                      <h3 className="text-xs sm:text-[13px] font-black text-[#0a1e4d] group-hover:text-blue-600 transition mb-0.5 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-[10px] font-bold text-blue-600 mb-1">
                        {service.hindiTitle}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium leading-tight line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Metadata & Arrow */}
                    <div className="w-full mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                        {service.fee}
                      </span>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] bg-blue-50 text-[#1d68f6] group-hover:bg-[#1d68f6] group-hover:text-white transition shadow-2xs">
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supported Biometric Devices Banner - Light Theme Matching DSC Design */}
          <div className="bg-gradient-to-r from-[#e3f0fc] via-[#edf6fe] to-[#e0effd] border border-blue-200/80 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden transition-all duration-200">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[#1d68f6] text-[10px] font-bold border border-blue-200/80">
                  <MdVerifiedUser className="text-xs" />
                  <span>UIDAI Certified RD Service Compatible</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#0a1e4d] leading-tight">
                  Certified 5-Finger & Dual-Iris Biometric Hardware
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Works seamlessly with Morpho, Mantra MFS100, Startek FM220, SecuGen & Iris scanners. Auto-detects driver status instantly.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowDeviceModal(true)}
                  className="px-5 py-2.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <MdSensors className="text-sm" />
                  <span>Configure Scanner</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom 4 Trust & Feature Badges inside Left Column (Single Brand Blue Palette) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaBolt />
              </div>
              <h5 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Instant URN</h5>
              <p className="text-[10px] text-slate-400 font-medium">Real-time sync slip</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaShieldAlt />
              </div>
              <h5 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">256-Bit Secure</h5>
              <p className="text-[10px] text-slate-400 font-medium">UIDAI certified vault</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaIdCard />
              </div>
              <h5 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Govt Rates</h5>
              <p className="text-[10px] text-slate-400 font-medium">Zero extra surcharges</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaHeadset />
              </div>
              <h5 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">24/7 Support</h5>
              <p className="text-[10px] text-slate-400 font-medium">Operator desk helpline</p>
            </div>
          </div>
        </div>

        {/* Right Column: Operator Terminal, Recent Updates & UIDAI Guidelines (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Operator Terminal Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base font-bold">
                  <FaIdCard />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    Aadhaar Seva Kendra
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400">
                    Operator ID: ASK-DSC-772910
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Certified
              </span>
            </div>

            {/* Operator Details & Quota */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium">Supervisor:</span>
                <span className="font-bold text-slate-800">Rohit Kumar (UIDAI Level 2)</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium">Station Balance:</span>
                <span className="font-extrabold text-emerald-600">₹34,500.00</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium">Today's Tokens:</span>
                <span className="font-bold text-blue-600">24 / 50 Processed</span>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-center gap-2.5">
              <RiShieldCheckFill className="text-xl text-blue-600 shrink-0" />
              <p className="text-[11px] text-blue-900 font-medium leading-relaxed">
                Terminal connected to UIDAI Production Server through secure VPN gateway.
              </p>
            </div>
          </div>

          {/* Recent Update Requests / Live Queue */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <FaHistory className="text-blue-600 text-xs" />
                Recent Applications
              </h3>
              <span className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="space-y-3">
              {mockRecentRequests.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.resident}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.service}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${item.status === "Success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.status === "Processing"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/60 font-mono">
                    <span>URN: {item.urn}</span>
                    <span className="font-bold text-slate-700">{item.fee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: Service Application Multi-Step Form */}
      {/* ========================================================================= */}
      {showApplyModal && selectedService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
          onClick={() => setShowApplyModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-5 sm:p-7 border border-slate-100 relative my-auto max-h-[92vh] overflow-y-auto scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg border ${selectedService.iconColor}`}>
                  {React.createElement(selectedService.icon)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    UIDAI Form • Govt Fee: {selectedService.fee}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Stepper Indicator */}
            {applyStep < 4 && (
              <div className="flex items-center justify-between mb-6 px-2">
                {[
                  { step: 1, label: "Resident Details" },
                  { step: 2, label: "Update Info" },
                  { step: 3, label: "Biometric Auth" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${applyStep === s.step
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                        : applyStep > s.step
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400"
                        }`}
                    >
                      {applyStep > s.step ? <FaCheck className="text-[10px]" /> : s.step}
                    </div>
                    <span
                      className={`text-xs font-bold hidden sm:inline ${applyStep === s.step ? "text-slate-900" : "text-slate-400"
                        }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Step 1: Resident Details */}
            {applyStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    12-Digit Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="5482 9102 4321"
                      value={formData.aadhaarNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aadhaarNumber: handleAadhaarFormat(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-800 tracking-wider focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                    <FaIdCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Resident Full Name (As in Aadhaar) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.residentName}
                      onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Contact Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Required Documents Notice */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
                  <p className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <FaFileAlt className="text-blue-600" />
                    Acceptable Documents for this service:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.requiredDocs.map((doc, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.aadhaarNumber.replace(/\s/g, "") || formData.aadhaarNumber.replace(/\s/g, "").length !== 12) {
                        alert("Please enter a valid 12-digit Aadhaar Number");
                        return;
                      }
                      if (!formData.residentName.trim()) {
                        alert("Please enter Resident Name");
                        return;
                      }
                      setApplyStep(2);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Update Info</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Specific Update Fields */}
            {applyStep === 2 && (
              <div className="space-y-4">
                {selectedService.id === "mobile" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      New Mobile Number to Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Enter new 10-digit mobile number"
                      value={formData.newMobile}
                      onChange={(e) => setFormData({ ...formData, newMobile: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      An OTP and biometric authorization will be required in the next step.
                    </p>
                  </div>
                )}

                {selectedService.id === "address" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        New Complete Residential Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="House / Flat No, Street, Landmark, Area..."
                        value={formData.newAddress}
                        onChange={(e) => setFormData({ ...formData, newAddress: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="110001"
                          value={formData.pinCode}
                          onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedService.id === "dob" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        New / Correct Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.newDob || ""}
                        onChange={(e) => setFormData({ ...formData, newDob: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Proof of Date of Birth (PDB) Document Attached <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.selectedProof}
                        onChange={(e) => setFormData({ ...formData, selectedProof: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      >
                        {selectedService.requiredDocs.map((doc, idx) => (
                          <option key={idx} value={doc}>{doc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {selectedService.id === "name" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        New / Corrected Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter correct full legal name"
                        value={formData.residentName}
                        onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Proof of Identity (POI) Document Attached
                      </label>
                      <select
                        value={formData.selectedProof}
                        onChange={(e) => setFormData({ ...formData, selectedProof: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      >
                        {selectedService.requiredDocs.map((doc, idx) => (
                          <option key={idx} value={doc}>{doc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {selectedService.id === "blue_card" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Child's Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Aarav Sharma"
                          value={formData.childName}
                          onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.childDob}
                          onChange={(e) => setFormData({ ...formData, childDob: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Parent Aadhaar Number (Father/Mother) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="5482 9102 4321"
                        value={formData.parentAadhaar}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentAadhaar: handleAadhaarFormat(e.target.value),
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

                {selectedService.id === "pan_link" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      10-Digit PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-800 uppercase focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                )}

                {/* Document Upload Section */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Upload Supporting Document (POI / POA / Birth Certificate) <span className="text-red-500">*</span>
                  </label>

                  <div className="relative border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-2xl bg-blue-50/40 hover:bg-blue-50/80 p-4 transition text-center cursor-pointer group">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFormData((prev) => ({
                            ...prev,
                            documentFile: file,
                            documentName: file.name,
                          }));
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {formData.documentName ? (
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                            <FaCheck />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {formData.documentName}
                            </p>
                            <p className="text-[10px] font-semibold text-emerald-600">
                              Document Uploaded Successfully
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData((prev) => ({
                              ...prev,
                              documentFile: null,
                              documentName: "",
                            }));
                          }}
                          className="z-20 text-slate-400 hover:text-red-500 p-1 text-xs font-bold transition"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-1">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base mb-1.5 group-hover:scale-110 transition shadow-2xs">
                          <FaCloudUploadAlt />
                        </div>
                        <p className="text-xs font-bold text-slate-800">
                          Click or Drag file here to upload
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                          Supports PDF, JPG, JPEG, PNG (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* General Note */}
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 flex items-start gap-2 text-xs text-amber-800">
                  <FaInfoCircle className="mt-0.5 shrink-0 text-amber-600" />
                  <span>
                    Please ensure that the details entered match the official supporting documents exactly.
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setApplyStep(1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.documentName) {
                        alert("Please upload the supporting document before proceeding.");
                        return;
                      }
                      setApplyStep(3);
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Biometric Capture</span>
                    <FaFingerprint />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Biometric Authentication Simulation */}
            {applyStep === 3 && (
              <div className="text-center py-1 space-y-3.5">
                {/* Fingerprint / Iris Scanner Graphic */}
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-600 flex items-center justify-center mx-auto relative overflow-hidden shadow-inner">
                  {biometricDevicesList.find((d) => d.name === selectedDevice)?.category === "iris" ? (
                    <FaEye className={`text-3xl ${isScanning ? "animate-pulse scale-110" : ""}`} />
                  ) : (
                    <FaFingerprint className={`text-3xl ${isScanning ? "animate-pulse scale-110" : ""}`} />
                  )}
                  {isScanning && (
                    <div
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 animate-bounce"
                      style={{ animationDuration: "1s" }}
                    />
                  )}
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-base leading-tight">
                    {isScanning ? "Scanning Resident Biometrics..." : "Place Finger on Biometric Scanner"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a machine below to switch connected RD device
                  </p>
                </div>

                {/* Biometric Machines Grid Container */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-slate-800">
                      Select Connected RD Device:
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Driver Ready
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 mb-3">
                    {[
                      { id: "all", label: "All Devices" },
                      { id: "fingerprint", label: "Fingerprint" },
                      { id: "iris", label: "Iris Scanner" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setDeviceCategoryFilter(tab.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer ${deviceCategoryFilter === tab.id
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Clean Scrollable Machine Card Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-44 overflow-y-auto pr-1">
                    {biometricDevicesList
                      .filter((d) => deviceCategoryFilter === "all" || d.category === deviceCategoryFilter)
                      .map((dev) => {
                        const isSelected = selectedDevice === dev.name;
                        return (
                          <div
                            key={dev.id}
                            onClick={() => !isScanning && setSelectedDevice(dev.name)}
                            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${isSelected
                              ? "bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/20 shadow-xs"
                              : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                              }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm ${isSelected
                                  ? "bg-blue-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600"
                                  }`}
                              >
                                {dev.category === "iris" ? <FaEye /> : <FaFingerprint />}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-black text-slate-900 truncate leading-tight">
                                  {dev.name}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                                  {dev.badge} • {dev.desc}
                                </div>
                              </div>
                            </div>

                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0 ml-2 shadow-xs">
                                <FaCheck />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 ml-2" />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Progress bar */}
                {isScanning && (
                  <div className="max-w-xs mx-auto space-y-1">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>Capturing Minutiae...</span>
                      <span>{scanProgress}%</span>
                    </div>
                  </div>
                )}

                {/* Verification Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-left text-xs text-slate-600 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Service:</span>
                    <span className="font-bold text-slate-900 truncate block">{selectedService.title}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Resident:</span>
                    <span className="font-bold text-slate-900 truncate block">{formData.residentName} ({formData.aadhaarNumber})</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={() => setApplyStep(2)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={handleStartBiometricScan}
                    className="px-6 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold transition shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Capturing...</span>
                      </>
                    ) : (
                      <>
                        <FaFingerprint size={14} />
                        <span>Capture & Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Stamped Official Receipt */}
            {applyStep === 4 && applicationReceipt && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl border border-emerald-200">
                    <FaCheckCircle />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">
                    Update Request Submitted!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Acknowledgment generated with official Update Request Number (URN).
                  </p>
                </div>

                {/* Stamped Receipt Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 font-sans">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">URN Number</p>
                      <p className="text-sm font-black font-mono text-blue-700">{applicationReceipt.urn}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Date & Time</p>
                      <p className="text-xs font-bold text-slate-800">{applicationReceipt.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-1">
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px]">Resident Name</span>
                      <span className="font-bold text-slate-800">{applicationReceipt.residentName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px]">Aadhaar Number</span>
                      <span className="font-mono font-bold text-slate-800">{applicationReceipt.aadhaar}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px]">Service Applied</span>
                      <span className="font-bold text-slate-800">{applicationReceipt.service}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px]">Govt Fee Paid</span>
                      <span className="font-extrabold text-emerald-600">{applicationReceipt.fee}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Kiosk: {applicationReceipt.kioskName}</span>
                    <span className="text-emerald-600 font-bold">● {applicationReceipt.qualityScore}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaPrint />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Done</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: Live Status Verification Result Modal */}
      {/* ========================================================================= */}
      {showStatusModal && statusResult && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setShowStatusModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowStatusModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl border border-blue-100">
                <MdVerifiedUser />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                UIDAI Verification Status
              </h3>
              <p className="text-xs text-emerald-600 font-bold mt-0.5">
                ● {statusResult.validity}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs mb-4">
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Query Reference:</span>
                <span className="font-mono font-bold text-slate-800">{statusResult.query}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Masked Name:</span>
                <span className="font-bold text-slate-800">{statusResult.residentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Age Band / Gender:</span>
                <span className="font-semibold text-slate-800">{statusResult.ageBand} ({statusResult.gender})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">State:</span>
                <span className="font-semibold text-slate-800">{statusResult.state}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Mobile Status:</span>
                <span className="font-semibold text-emerald-600">{statusResult.mobileLinked}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Last Updated:</span>
                <span className="font-semibold text-slate-800">{statusResult.lastUpdateDate}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed mb-4">
              {statusResult.statusMessage}
            </p>

            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: Biometric Hardware Device Diagnostic Modal */}
      {/* ========================================================================= */}
      {showDeviceModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setShowDeviceModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                  <MdSensors />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Biometric Hardware Manager
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Registered Device (RD) Service Diagnostic
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeviceModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Select Device Dropdown */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Select Connected Biometric Scanner:
              </label>
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
              >
                <option value="Morpho MSO 1300 E3">Morpho MSO 1300 E3 (USB RD v3.0.1)</option>
                <option value="Mantra MFS100">Mantra MFS100 (Optical Fingerprint Scanner)</option>
                <option value="Startek FM220">Startek FM220 (UIDAI Certified RD Service)</option>
                <option value="SecuGen Hamster Pro 20">SecuGen Hamster Pro 20</option>
                <option value="IriTech Iris Scanner (Dual)">IriTech IriShield Dual Iris Scanner</option>
              </select>
            </div>

            {/* Device Diagnostic Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center mb-4 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center mx-auto text-2xl shadow-xs">
                <FaFingerprint className={deviceTestState === "scanning" ? "animate-pulse scale-110 text-cyan-500" : ""} />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-800">
                  {deviceTestState === "idle" && "Ready to Test Optical Sensor"}
                  {deviceTestState === "scanning" && "Scanning Fingerprint... Place finger on device"}
                  {deviceTestState === "success" && "Capture Successful • Quality 94%"}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  UIDAI Minutiae Standard ISO/IEC 19794-2 Format
                </p>
              </div>

              {deviceTestState !== "idle" && (
                <div className="max-w-xs mx-auto space-y-1">
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-200 ${deviceQuality > 80 ? "bg-emerald-500" : "bg-blue-600"
                        }`}
                      style={{ width: `${deviceQuality}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>Quality Threshold: 80%</span>
                    <span className={deviceQuality >= 80 ? "text-emerald-600" : "text-blue-600"}>
                      {deviceQuality}% Score
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleTestDevice}
                disabled={deviceTestState === "scanning"}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MdSensors />
                <span>{deviceTestState === "scanning" ? "Testing Sensor..." : "Test Capture"}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDeviceModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
