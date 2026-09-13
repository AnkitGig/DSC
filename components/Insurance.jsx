"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FaHeartbeat,
  FaCar,
  FaMotorcycle,
  FaUsers,
  FaPlane,
  FaHome,
  FaShieldAlt,
  FaThLarge,
  FaFileAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaEllipsisV,
  FaBolt,
  FaHeadset,
  FaLock,
  FaTimes,
  FaSearch,
  FaDownload,
  FaPrint,
  FaCheck,
  FaRegQuestionCircle,
  FaStar,
  FaHospital,
  FaCalendarAlt,
  FaUserCheck,
  FaAward,
  FaChevronDown,
} from "react-icons/fa";
import {
  RiShieldCheckFill,
  RiHospitalLine,
  RiHandHeartLine,
  RiCarWashingFill,
  RiMotorbikeFill,
  RiPlaneFill,
  RiHomeHeartFill,
} from "react-icons/ri";

const insuranceCategories = [
  {
    id: "health",
    title: "Health Insurance",
    description: "Cashless treatment for a healthier tomorrow",
    icon: FaHeartbeat,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Health Insurance",
    bannerTitle: "Health Insurance for a Healthier You",
    bannerDesc: "Cashless treatment at 10,000+ hospitals across India.",
    bannerFeatures: [
      { label: "Cashless Hospitals", icon: RiHospitalLine },
      { label: "Wide Coverage", icon: RiShieldCheckFill },
      { label: "Quick Claim Support", icon: FaBolt },
    ],
    samplePlans: [
      { id: "h1", insurer: "Star Health", name: "Star Health Optima Secure", cover: "₹10,00,000", premium: "₹640/mo", annual: "₹7,680/yr", rating: 4.8, claims: "99.2%", features: ["Zero Room Rent Capping", "Pre & Post Hospitalization 60/90 Days", "Annual Free Health Checkup"] },
      { id: "h2", insurer: "HDFC ERGO", name: "HDFC ERGO Optima Restore", cover: "₹15,00,000", premium: "₹799/mo", annual: "₹9,588/yr", rating: 4.9, claims: "99.6%", features: ["100% Restore Benefit Instantly", "2X Coverage in 2 Claim-Free Years", "Zero Co-pay at Any Hospital"] },
      { id: "h3", insurer: "Care Health", name: "Care Supreme Health Shield", cover: "₹25,00,000", premium: "₹899/mo", annual: "₹10,788/yr", rating: 4.7, claims: "98.9%", features: ["Unlimited Recharge of Sum Insured", "Cumulative Bonus up to 500%", "Air Ambulance Cover Included"] },
      { id: "h4", insurer: "Niva Bupa", name: "Niva Bupa ReAssure 2.0", cover: "₹10,00,000", premium: "₹599/mo", annual: "₹7,188/yr", rating: 4.8, claims: "99.1%", features: ["Age Lock - Fixed Premium", "Live Healthy 30% Renewal Off", "Direct Claim Settlement Desk"] },
    ],
  },
  {
    id: "car",
    title: "Car Insurance",
    description: "Drive safe, stay protected",
    icon: FaCar,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Car Insurance",
    bannerTitle: "Drive Safe with Zero Depreciation Car Insurance",
    bannerDesc: "Instant 2-minute policy issuance, 4,500+ cashless network garages, and 24x7 roadside assistance.",
    bannerFeatures: [
      { label: "4,500+ Cashless Garages", icon: RiCarWashingFill },
      { label: "Zero Dep Protection", icon: RiShieldCheckFill },
      { label: "24x7 Spot Assistance", icon: FaBolt },
    ],
    samplePlans: [
      { id: "c1", insurer: "ICICI Lombard", name: "ICICI Lombard Comprehensive + Zero Dep", cover: "IDV ₹6,50,000", premium: "₹2,499/yr", annual: "₹2,499/yr", rating: 4.8, claims: "98.5%", features: ["Zero Depreciation Cover", "Engine & Gearbox Protection", "NCB Retention Cover Included"] },
      { id: "c2", insurer: "Tata AIG", name: "Tata AIG Auto Secure Comprehensive", cover: "IDV ₹6,50,000", premium: "₹2,299/yr", annual: "₹2,299/yr", rating: 4.7, claims: "99.1%", features: ["Key Replacement & Lockout", "Consumables & Tyre Protection", "Free Pick-up & Drop for Repairs"] },
      { id: "c3", insurer: "Bajaj Allianz", name: "Bajaj Allianz Drive Assure Package", cover: "IDV ₹6,50,000", premium: "₹2,599/yr", annual: "₹2,599/yr", rating: 4.8, claims: "98.8%", features: ["24x7 Spot Repair Facility", "Personal Accident Cover ₹15 Lakh", "Emergency Medical Expenses Cover"] },
      { id: "c4", insurer: "HDFC ERGO", name: "HDFC ERGO Motor Comprehensive", cover: "IDV ₹6,50,000", premium: "₹2,350/yr", annual: "₹2,350/yr", rating: 4.9, claims: "99.5%", features: ["Cashless Claims in 3,500+ Cities", "Towing Assistance up to 50 km", "Zero Paperwork Digital Renewal"] },
    ],
  },
  {
    id: "bike",
    title: "Bike Insurance",
    description: "Complete protection for your ride",
    icon: FaMotorcycle,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Bike Insurance",
    bannerTitle: "Comprehensive 2-Wheeler Cover from ₹499/yr",
    bannerDesc: "Instant inspection-free renewal, third-party liability & own damage cover with instant digital certificate.",
    bannerFeatures: [
      { label: "Instant 2-Min Policy", icon: RiMotorbikeFill },
      { label: "Zero Inspection Renewal", icon: RiShieldCheckFill },
      { label: "₹15 Lakh PA Cover", icon: FaBolt },
    ],
    samplePlans: [
      { id: "b1", insurer: "HDFC ERGO", name: "HDFC ERGO 2-Wheeler Comprehensive", cover: "IDV ₹85,000", premium: "₹538/yr", annual: "₹538/yr", rating: 4.9, claims: "99.4%", features: ["Instant Policy Delivery on WhatsApp", "Cashless Repair at 2,000+ Workshops", "Third-Party & OD Protection"] },
      { id: "b2", insurer: "Digit Insurance", name: "Digit Two Wheeler Cover", cover: "IDV ₹85,000", premium: "₹499/yr", annual: "₹499/yr", rating: 4.8, claims: "98.7%", features: ["Zero Paperwork Claims via Smartphone", "24/7 Breakdown & Fuel Assistance", "No Hidden Charges"] },
      { id: "b3", insurer: "ICICI Lombard", name: "ICICI Lombard Two-Wheeler Package", cover: "IDV ₹85,000", premium: "₹580/yr", annual: "₹580/yr", rating: 4.8, claims: "98.9%", features: ["NCB Discount up to 50%", "Multi-Year Policy Available", "Instant Digital Renewal"] },
    ],
  },
  {
    id: "term",
    title: "Term Life Insurance",
    description: "Secure your family's future",
    icon: FaUsers,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Term Life Insurance",
    bannerTitle: "Term Life Insurance with ₹1.00 Crore Cover",
    bannerDesc: "100% Tax Savings u/s 80C & 10(10D). Guarantee financial freedom for your family even in your absence.",
    bannerFeatures: [
      { label: "₹1 Crore Life Cover", icon: RiShieldCheckFill },
      { label: "Zero Tax on Payouts", icon: RiHandHeartLine },
      { label: "99.5% Claim Settlement", icon: FaBolt },
    ],
    samplePlans: [
      { id: "t1", insurer: "LIC of India", name: "LIC Tech Term Plan (Govt of India)", cover: "₹1.00 Crore", premium: "₹590/mo", annual: "₹7,080/yr", rating: 4.9, claims: "98.5%", features: ["Sovereign Guarantee by Govt of India", "Level & Increasing Cover Options", "Critical Illness Rider Available"] },
      { id: "t2", insurer: "HDFC Life", name: "HDFC Life Click 2 Protect Super", cover: "₹1.00 Crore", premium: "₹540/mo", annual: "₹6,480/yr", rating: 4.9, claims: "99.3%", features: ["Waiver of Premium on Disability", "Terminal Illness Accelerated Benefit", "Return of Premium at Age 60 Option"] },
      { id: "t3", insurer: "Max Life", name: "Max Life Smart Secure Plus", cover: "₹1.50 Crore", premium: "₹680/mo", annual: "₹8,160/yr", rating: 4.8, claims: "99.5%", features: ["Special 10% Discount for Women", "Accidental Death Benefit Booster", "Express 1-Day Claim Settlement"] },
    ],
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Safe journeys, hassle-free travel",
    icon: FaPlane,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Travel Insurance",
    bannerTitle: "International & Domestic Travel Protection",
    bannerDesc: "Coverage for emergency medical evacuation, baggage loss, flight delays, and passport loss worldwide.",
    bannerFeatures: [
      { label: "Global Medical Cover", icon: RiPlaneFill },
      { label: "Lost Baggage & Passport", icon: RiShieldCheckFill },
      { label: "Zero Deductible Options", icon: FaBolt },
    ],
    samplePlans: [
      { id: "tr1", insurer: "Tata AIG", name: "Tata AIG Travel Guard International", cover: "$100,000 USD", premium: "₹450/trip", annual: "₹450/trip", rating: 4.8, claims: "99.0%", features: ["Emergency Medical & Dental Expense", "Baggage Delay & Total Loss Coverage", "Trip Cancellation Reimbursement"] },
      { id: "tr2", insurer: "Reliance General", name: "Reliance Travel Care Individual", cover: "$50,000 USD", premium: "₹320/trip", annual: "₹320/trip", rating: 4.7, claims: "98.3%", features: ["Pre-existing Sickness in Emergency", "Personal Liability Protection", "24/7 International Helpline Desk"] },
    ],
  },
  {
    id: "home",
    title: "Home Insurance",
    description: "Protect what matters most",
    icon: FaHome,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Home Insurance",
    bannerTitle: "Comprehensive Home & Property Insurance",
    bannerDesc: "Safeguard your building structure, home appliances, jewelry, and furniture against fire, theft, and natural calamities.",
    bannerFeatures: [
      { label: "Structure & Content", icon: RiHomeHeartFill },
      { label: "Earthquake & Flood", icon: RiShieldCheckFill },
      { label: "Burglary & Theft", icon: FaBolt },
    ],
    samplePlans: [
      { id: "hm1", insurer: "ICICI Lombard", name: "ICICI Bharat Griha Raksha Structure + Content", cover: "₹50 Lakh Structure", premium: "₹1,150/yr", annual: "₹1,150/yr", rating: 4.8, claims: "98.9%", features: ["Complete Re-construction Cost Cover", "Valuable Jewelry & Electronics Cover", "Alternative Accommodation Allowance"] },
      { id: "hm2", insurer: "Bajaj Allianz", name: "Bajaj Allianz My Home All-Risk Policy", cover: "₹75 Lakh All Risk", premium: "₹1,499/yr", annual: "₹1,499/yr", rating: 4.7, claims: "98.6%", features: ["Accidental Damage Cover", "Public Liability Cover Included", "Fast Settlement within 7 Days"] },
    ],
  },
  {
    id: "accident",
    title: "Personal Accident",
    description: "Coverage for life's uncertainties",
    icon: FaShieldAlt,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Personal Accident",
    bannerTitle: "24x7 Worldwide Personal Accident Protection",
    bannerDesc: "Guaranteed financial compensation for accidental death, permanent total disability, and temporary loss of income.",
    bannerFeatures: [
      { label: "₹25L - ₹50L Sum Insured", icon: RiShieldCheckFill },
      { label: "100% Payout Disability", icon: FaBolt },
      { label: "Child Education Benefit", icon: RiHandHeartLine },
    ],
    samplePlans: [
      { id: "pa1", insurer: "Star Health", name: "Star Accident Care Individual Plan", cover: "₹25,00,000", premium: "₹1,250/yr", annual: "₹1,250/yr", rating: 4.8, claims: "99.1%", features: ["100% Payout on Permanent Disability", "Weekly Income Replacement Benefit", "Child Education Grant up to ₹2 Lakh"] },
      { id: "pa2", insurer: "HDFC ERGO", name: "HDFC ERGO Personal Suraksha Premium", cover: "₹50,00,000", premium: "₹2,100/yr", annual: "₹2,100/yr", rating: 4.9, claims: "99.4%", features: ["Worldwide 24-Hour Protection", "Hospital Confinement Daily Allowance", "Transportation of Mortal Remains Cover"] },
    ],
  },
  {
    id: "other",
    title: "Other Insurance",
    description: "More solutions for a secure you",
    icon: FaThLarge,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50/80 border-blue-100/90",
    badgeText: "Other Insurance",
    bannerTitle: "Custom Business, Shop & Cyber Insurance Solutions",
    bannerDesc: "Tailored business protection for shopkeepers, commercial enterprise liability, cyber fraud, and gadget cover.",
    bannerFeatures: [
      { label: "Shop & Stock Protection", icon: RiShieldCheckFill },
      { label: "Cyber Fraud & Theft", icon: FaLock },
      { label: "Instant Digital Policy", icon: FaBolt },
    ],
    samplePlans: [
      { id: "ot1", insurer: "ICICI Lombard", name: "Shopkeeper / Retail Merchant Suraksha", cover: "₹20,00,000", premium: "₹1,800/yr", annual: "₹1,800/yr", rating: 4.7, claims: "98.4%", features: ["Shop Stock & Cash in Safe Cover", "Plate Glass & Signboard Damage", "Employee Fidelity Guarantee"] },
      { id: "ot2", insurer: "HDFC ERGO", name: "Digital Cyber Crime Shield", cover: "₹5,00,000", premium: "₹699/yr", annual: "₹699/yr", rating: 4.9, claims: "99.2%", features: ["Phishing & Online Fraud Loss Recovery", "Identity Theft Legal Expense Cover", "Data Restoration Technical Support"] },
    ],
  },
];

const initialPolicies = [
  {
    id: "pol-1",
    type: "Health Insurance",
    provider: "Star Health & Allied Insurance",
    policyNo: "XXXXXX210",
    validTill: "12 Jan 2026",
    status: "Active",
    cover: "₹10,00,000",
    premium: "₹7,680 / yr",
    icon: FaHeartbeat,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50 border-blue-100",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "pol-2",
    type: "Car Insurance",
    provider: "HDFC ERGO General Insurance",
    policyNo: "XXXXX610",
    validTill: "18 Aug 2026",
    status: "Expiring Soon",
    cover: "IDV ₹5,80,000 (Comprehensive)",
    premium: "₹3,450 / yr",
    icon: FaCar,
    iconColor: "text-[#1d68f6]",
    iconBg: "bg-blue-50 border-blue-100",
    badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

export default function Insurance() {
  const [selectedType, setSelectedType] = useState("health");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [showPincodeInfo, setShowPincodeInfo] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Quote & Buy Journey
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteFilter, setQuoteFilter] = useState("all");
  const [purchaseStep, setPurchaseStep] = useState("plans");
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [generatedPolicy, setGeneratedPolicy] = useState(null);

  // Proposal form data
  const [proposalData, setProposalData] = useState({
    fullName: "Rohit Kumar",
    email: "rohit.retailer@gmail.com",
    nomineeName: "Sunita Kumar",
    nomineeRelation: "Spouse",
    vehicleRegNo: "DL 01 AB 1234",
    pincode: "110001",
  });

  // Policies state
  const [myPolicies, setMyPolicies] = useState(initialPolicies);
  const [viewingPolicy, setViewingPolicy] = useState(null);
  const [renewalLoading, setRenewalLoading] = useState(false);

  // Active Category Object
  const currentCategory = insuranceCategories.find((c) => c.id === selectedType) || insuranceCategories[0];
  const CurrentIcon = currentCategory.icon;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCardClick = (catId) => {
    setSelectedType(catId);
  };

  const handleGetQuoteSubmit = (e) => {
    if (e) e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setMobileNumber("9876543210");
    }
    setPurchaseStep("plans");
    setShowQuoteModal(true);
  };

  const handleSelectPlanToBuy = (plan) => {
    setSelectedPlanDetails(plan);
    setPurchaseStep("proposal");
  };

  const handleConfirmPurchase = () => {
    const newPolicyNo = `DSC-INS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPol = {
      id: `pol-${Date.now()}`,
      type: currentCategory.title,
      provider: selectedPlanDetails.insurer,
      policyNo: newPolicyNo,
      validTill: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
      cover: selectedPlanDetails.cover,
      premium: selectedPlanDetails.premium,
      icon: currentCategory.icon,
      iconColor: currentCategory.iconColor,
      iconBg: currentCategory.iconBg,
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    setGeneratedPolicy(newPol);
    setMyPolicies([newPol, ...myPolicies]);
    setPurchaseStep("success");
  };

  const handleRenewPolicy = (policy) => {
    setRenewalLoading(true);
    setTimeout(() => {
      setMyPolicies(
        myPolicies.map((p) =>
          p.id === policy.id
            ? {
                ...p,
                status: "Active",
                badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
                validTill: "18 Aug 2027",
              }
            : p
        )
      );
      setViewingPolicy(null);
      setRenewalLoading(false);
      alert(`Policy ${policy.policyNo} successfully renewed for 1 full year!`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-4 sm:p-6 text-slate-800 font-sans pb-16">
      {/* 1. TOP HEADER & PROMO BANNER */}
      <div className="max-w-7xl mx-auto mb-5">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <span className="text-slate-300">&gt;</span>
          <span className="text-blue-600">Insurance</span>
        </div>

        {/* Header Content Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0a1e4d] tracking-tight leading-tight">
              Insurance Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Secure your future with trusted insurance plans. Compare, Buy and Renew – All in one place.
            </p>
          </div>

          {/* Right Header Promo Card */}
          <div className="bg-gradient-to-r from-[#d8ebfc] via-[#e8f3fe] to-[#cfdff9] rounded-3xl p-3 sm:px-6 sm:py-3.5 border border-blue-200/80 shadow-xs flex items-center justify-between gap-4 min-w-[340px] sm:min-w-[420px] relative overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-14 rounded-2xl flex items-center justify-center relative">
                <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm">
                  <path
                    d="M 50 5 C 75 5, 90 20, 90 45 C 90 65, 50 78, 50 78 C 50 78, 10 65, 10 45 C 10 20, 25 5, 50 5 Z"
                    fill="#3b82f6"
                    opacity="0.15"
                  />
                  <path
                    d="M 50 10 C 70 10, 82 22, 82 43 C 82 59, 50 71, 50 71 C 50 71, 18 59, 18 43 C 18 22, 30 10, 50 10 Z"
                    fill="#1d68f6"
                    opacity="0.25"
                  />
                  <circle cx="38" cy="30" r="8" fill="#1e40af" />
                  <path d="M 26 58 C 26 44, 50 44, 50 58 Z" fill="#2563eb" />
                  <circle cx="62" cy="32" r="7.5" fill="#0f766e" />
                  <path d="M 50 58 C 50 46, 74 46, 74 58 Z" fill="#0d9488" />
                  <circle cx="50" cy="40" r="6" fill="#f59e0b" />
                  <path d="M 40 60 C 40 50, 60 50, 60 60 Z" fill="#fbbf24" />
                  <circle cx="50" cy="50" r="11" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" />
                  <path d="M 50 43 L 57 47 L 57 53 C 57 57, 50 60, 50 60 C 50 60, 43 57, 43 53 L 43 47 Z" fill="#1d68f6" />
                  <path d="M 47 51 L 49 53 L 53 48" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-[#0a1e4d] leading-tight">
                  Because Your Tomorrow Matters
                </h3>
                <p className="text-[11px] font-semibold text-blue-600 mt-0.5 tracking-wide">
                  Affordable &nbsp;|&nbsp; Reliable &nbsp;|&nbsp; Secure
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
        {/* LEFT COLUMN: 8 Category Cards, Dynamic Featured Banner, 4 Trust Badges (8 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* Section: Select Insurance Type */}
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0a1e4d] mb-3">
              Select Insurance Type
            </h2>

            {/* 8 Cards Grid (2 rows x 4 cols on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {insuranceCategories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedType === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCardClick(cat.id)}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col items-center text-center cursor-pointer relative min-h-[165px] justify-between ${
                      isSelected
                        ? "border-[#1d68f6] shadow-md ring-2 ring-blue-500/20 bg-blue-50/15"
                        : "border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Circular Icon Container - Single Blue Color Scheme */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2.5 transition-all duration-200 border ${
                        isSelected
                          ? "bg-[#1d68f6] text-white border-[#1d68f6] scale-110 shadow-md shadow-blue-500/25"
                          : "bg-blue-50/80 text-[#1d68f6] border-blue-100/90"
                      }`}
                    >
                      <IconComponent />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex-1 flex flex-col justify-start">
                      <h3
                        className={`text-xs sm:text-[13px] font-black transition mb-1 leading-tight ${
                          isSelected ? "text-blue-600" : "text-[#0a1e4d]"
                        }`}
                      >
                        {cat.title}
                      </h3>

                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">
                        {cat.description}
                      </p>
                    </div>

                    {/* Small Blue Arrow Indicator Button at Bottom Right */}
                    <div
                      className={`self-end mt-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] transition shadow-xs ${
                        isSelected
                          ? "bg-[#1d68f6] text-white"
                          : "bg-blue-50 text-[#1d68f6]"
                      }`}
                    >
                      <FaArrowRight />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Featured Middle Banner */}
          <div className="bg-gradient-to-r from-[#e3f0fc] via-[#edf6fe] to-[#e0effd] border border-blue-200/80 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Content */}
              <div className="max-w-xs space-y-1.5 text-left">
                <h3 className="text-lg sm:text-xl font-black text-[#0a1e4d] leading-tight">
                  {currentCategory.bannerTitle}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {currentCategory.bannerDesc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setPurchaseStep("plans");
                      setShowQuoteModal(true);
                    }}
                    className="px-5 py-2.5 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore Plans</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Center Vector Graphic - Clean Blue & Cyan Theme */}
              <div className="w-28 h-28 sm:w-32 sm:h-28 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md">
                  <circle cx="60" cy="45" r="35" fill="#dbeafe" opacity="0.7" />
                  <g filter="drop-shadow(0px 6px 12px rgba(29,104,246,0.3))">
                    <path
                      d="M 60 72 C 35 52, 22 37, 30 20 C 37 6, 54 12, 60 25 C 66 12, 83 6, 90 20 C 98 37, 85 52, 60 72 Z"
                      fill="url(#blueHeroGradient)"
                    />
                  </g>
                  <g fill="#ffffff">
                    <rect x="56" y="27" width="8" height="22" rx="2.5" />
                    <rect x="49" y="34" width="22" height="8" rx="2.5" />
                  </g>
                  <path
                    d="M 25 80 C 35 72, 45 76, 60 78 C 75 76, 90 70, 100 78 C 102 85, 85 92, 60 92 C 35 92, 22 86, 25 80 Z"
                    fill="#1d68f6"
                    opacity="0.85"
                  />
                  <defs>
                    <linearGradient id="blueHeroGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d68f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Right Stacked Benefits List */}
              <div className="space-y-2 w-full md:w-auto min-w-[190px]">
                {currentCategory.bannerFeatures.map((feat, idx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-white/95 border border-blue-200/80 px-4 py-2.5 rounded-2xl shadow-2xs"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1d68f6] flex items-center justify-center text-xs shrink-0">
                        <FeatIcon />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{feat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom 4 Trust Badges - Unified Single Brand Blue Color */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaShieldAlt />
              </div>
              <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">100% Secure</h4>
              <p className="text-[10px] text-slate-400 font-medium">Your data is safe with us</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaBolt />
              </div>
              <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Instant Processing</h4>
              <p className="text-[10px] text-slate-400 font-medium">Get policy in minutes</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaUsers />
              </div>
              <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">Trusted Partners</h4>
              <p className="text-[10px] text-slate-400 font-medium">Leading insurance companies</p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d68f6] border border-blue-100/60 flex items-center justify-center mx-auto mb-2 text-base">
                <FaHeadset />
              </div>
              <h4 className="font-extrabold text-[#0a1e4d] text-xs mb-0.5">24/7 Support</h4>
              <p className="text-[10px] text-slate-400 font-medium">We're always here for you</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Get Insurance Quote Form, Why Choose, My Policies (4 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* CARD 1: Get Insurance Quote Interactive Form */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                <FaFileAlt />
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#0a1e4d]">
                Get Insurance Quote
              </h3>
            </div>

            <form onSubmit={handleGetQuoteSubmit} className="space-y-3.5">
              {/* Custom Styled Select with Pure React Icons */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Insurance Type
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-xs bg-blue-50 text-[#1d68f6]">
                      <CurrentIcon />
                    </div>
                    <span>{currentCategory.title}</span>
                  </div>
                  <FaChevronDown className={`text-slate-400 text-[10px] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Options Popover */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1.5 space-y-0.5 animate-fade-in max-h-60 overflow-y-auto">
                    {insuranceCategories.map((cat) => {
                      const CatIcon = cat.icon;
                      const isCatSelected = selectedType === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => {
                            setSelectedType(cat.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            isCatSelected
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs bg-blue-50 text-[#1d68f6] border border-blue-100">
                              <CatIcon />
                            </div>
                            <span>{cat.title}</span>
                          </div>
                          {isCatSelected && <FaCheck className="text-blue-600 text-[10px]" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Enter Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    <FaPhoneAlt />
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Enter Pincode (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Enter Pincode (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPincodeInfo(!showPincodeInfo)}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Why Pincode?</span>
                    <FaRegQuestionCircle className="text-[10px]" />
                  </button>
                </div>

                {showPincodeInfo && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 text-[11px] p-2.5 rounded-xl mb-2 leading-relaxed">
                    Pincode helps us find nearby cashless network garages, hospitals, and location-based discount rates.
                  </div>
                )}

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Submit CTA Button: Get Quote */}
              <button
                type="submit"
                className="w-full py-3 bg-[#1d68f6] hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Get Quote</span>
                <FaArrowRight className="text-xs" />
              </button>
            </form>
          </div>

          {/* CARD 2: Why Choose DSC PAY Insurance? */}
          <div className="bg-[#f0f6ff] rounded-3xl p-5 sm:p-6 border border-blue-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-[#1d68f6] text-white flex items-center justify-center text-[11px] shadow-2xs">
                <FaShieldAlt />
              </div>
              <h3 className="text-xs sm:text-sm font-black text-[#0a1e4d]">
                Why Choose DSC PAY Insurance?
              </h3>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 font-semibold">
              {[
                "Trusted Insurance Partners",
                "Instant Policy Issuance",
                "Competitive Premium Rates",
                "Cashless Claim Support",
                "Dedicated Customer Support",
                "Easy Renewal & Policy Management",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#1d68f6] text-xs shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CARD 3: My Insurance Policies */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                  <FaFileAlt />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#0a1e4d]">
                  My Insurance Policies
                </h3>
              </div>
              <button
                onClick={() => {
                  setViewingPolicy(myPolicies[0]);
                }}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>

            {/* Policies List */}
            <div className="space-y-2.5">
              {myPolicies.map((pol) => {
                const IconComp = pol.icon;
                return (
                  <div
                    key={pol.id}
                    onClick={() => setViewingPolicy(pol)}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${pol.iconBg} ${pol.iconColor}`}>
                        <IconComp />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                          {pol.type}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Policy No: {pol.policyNo}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          Valid till: {pol.validTill}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${pol.badgeStyle}`}>
                        {pol.status}
                      </span>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <FaEllipsisV className="text-xs" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: Quote Comparison & Instant Digital Policy Purchase Journey */}
      {/* ========================================================================= */}
      {showQuoteModal && currentCategory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-7 border border-slate-100 relative my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${currentCategory.iconBg} ${currentCategory.iconColor}`}>
                  {React.createElement(currentCategory.icon)}
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0a1e4d]">
                    {currentCategory.title} Plans & Quotes
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Direct IRDAI Authorized Insurer comparison & Instant Digital Issuance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* STEP 1: Plans Comparison List */}
            {purchaseStep === "plans" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    Showing <strong>{currentCategory.samplePlans?.length}</strong> verified plans
                  </span>
                  <div className="flex gap-1">
                    {["All", "Popular", "Highest Claims"].map((f, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setQuoteFilter(f.toLowerCase())}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                          quoteFilter === f.toLowerCase()
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {currentCategory.samplePlans?.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900">{plan.name}</h4>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            <FaStar className="text-[9px] text-amber-500" />
                            {plan.rating}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                          <span>Cover: <strong className="text-slate-800">{plan.cover}</strong></span>
                          <span>&bull;</span>
                          <span>Claim Settlement: <strong className="text-emerald-600">{plan.claims}</strong></span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {plan.features?.map((ft, fi) => (
                            <span
                              key={fi}
                              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 font-semibold"
                            >
                              ✓ {ft}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 font-semibold block leading-none">
                            Premium
                          </span>
                          <span className="text-base font-black text-[#0a1e4d]">
                            {plan.premium}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectPlanToBuy(plan)}
                          className="px-4 py-2 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Buy Now</span>
                          <FaArrowRight className="text-[10px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-blue-900">
                  <RiShieldCheckFill className="text-lg text-blue-600 shrink-0" />
                  <span>
                    Zero inspection & 100% digital issuance. Policy will be active immediately upon confirmation.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 2: Instant Proposal Details Form */}
            {purchaseStep === "proposal" && selectedPlanDetails && (
              <div className="space-y-4">
                <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{selectedPlanDetails.name}</h4>
                    <p className="text-[11px] text-blue-700 font-bold mt-0.5">
                      Cover: {selectedPlanDetails.cover} &bull; Premium: {selectedPlanDetails.premium}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPurchaseStep("plans")}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Change Plan
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Policyholder Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={proposalData.fullName}
                      onChange={(e) => setProposalData({ ...proposalData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email for Digital Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={proposalData.email}
                      onChange={(e) => setProposalData({ ...proposalData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nominee Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={proposalData.nomineeName}
                      onChange={(e) => setProposalData({ ...proposalData, nomineeName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nominee Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={proposalData.nomineeRelation}
                      onChange={(e) => setProposalData({ ...proposalData, nomineeRelation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Total Payable (incl. 18% GST):</span>
                    <span className="text-emerald-600 text-sm font-black">{selectedPlanDetails.premium}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Payment will be processed through DSC Wallet / Retailer Terminal.</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setPurchaseStep("plans")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmPurchase}
                    className="px-6 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <FaCheckCircle />
                    <span>Confirm & Generate Policy</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Stamped Success Certificate */}
            {purchaseStep === "success" && generatedPolicy && (
              <div className="text-center py-3 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl border border-emerald-200">
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    Policy Issued & Active!
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official digital certificate generated and saved to your dashboard.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-medium">Policy Number:</span>
                    <span className="font-mono font-black text-blue-700">{generatedPolicy.policyNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Insurer:</span>
                    <span className="font-bold text-slate-900">{generatedPolicy.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Policyholder:</span>
                    <span className="font-bold text-slate-900">{proposalData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sum Insured:</span>
                    <span className="font-extrabold text-blue-600">{generatedPolicy.cover}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Valid Till:</span>
                    <span className="font-bold text-slate-800">{generatedPolicy.validTill}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <FaPrint />
                    <span>Print Certificate</span>
                  </button>
                  <button
                    onClick={() => setShowQuoteModal(false)}
                    className="px-6 py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: View Policy Details & One-Click Renewal */}
      {/* ========================================================================= */}
      {viewingPolicy && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setViewingPolicy(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingPolicy(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${viewingPolicy.iconBg} ${viewingPolicy.iconColor}`}>
                {React.createElement(viewingPolicy.icon)}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {viewingPolicy.type}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {viewingPolicy.provider}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs mb-4">
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Policy Number:</span>
                <span className="font-mono font-bold text-slate-800">{viewingPolicy.policyNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Sum Insured:</span>
                <span className="font-bold text-blue-600">{viewingPolicy.cover}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Annual Premium:</span>
                <span className="font-bold text-slate-800">{viewingPolicy.premium}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-500">Valid Till:</span>
                <span className="font-bold text-slate-800">{viewingPolicy.validTill}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${viewingPolicy.badgeStyle}`}>
                  {viewingPolicy.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  alert(`Downloading Official Policy Certificate for ${viewingPolicy.policyNo}...`);
                }}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaDownload />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => handleRenewPolicy(viewingPolicy)}
                disabled={renewalLoading}
                className="py-2.5 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{renewalLoading ? "Renewing..." : "Renew Policy"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
