"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaWallet,
  FaSearch,
  FaPlus,
  FaTrash,
  FaEye,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSyncAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaIdCard,
  FaUniversity,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { RiDashboardLine, RiExchangeDollarLine } from "react-icons/ri";
import { MdVerified, MdPendingActions } from "react-icons/md";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  // Pagination & Filter States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Metrics State
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    kycVerified: 0,
    kycPending: 0,
    totalWallet: 0,
  });

  // Modals state
  const [selectedUserForDetails, setSelectedUserForDetails] = useState(null);
  const [fundModalUser, setFundModalUser] = useState(null);
  const [fundAmount, setFundAmount] = useState("");
  const [fundLoading, setFundLoading] = useState(false);
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const router = useRouter();
  const searchTimeoutRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Debounce search input
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1); // Reset to page 1 on new search
    }, 350);
  };

  const fetchUsers = useCallback(
    async (isManual = false) => {
      if (isManual) setRefreshing(true);
      else setLoading(true);

      try {
        const res = await API.get("/admin/users", {
          params: {
            page,
            limit,
            search: debouncedSearch,
            status: statusFilter,
            kyc: kycFilter,
            tab: activeTab,
          },
        });

        if (res.data?.success || res.data?.users) {
          setUsers(res.data.users || []);
          if (res.data.pagination) setPagination(res.data.pagination);
          if (res.data.metrics) setMetrics(res.data.metrics);
        } else if (Array.isArray(res.data)) {
          // Fallback if returned plain array
          setUsers(res.data);
        }

        if (isManual) showToast("Data refreshed successfully", "success");
      } catch (error) {
        showToast("Unauthorized session or invalid token. Redirecting...", "error");
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, limit, debouncedSearch, statusFilter, kycFilter, activeTab, router]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Toggle user active / inactive status
  const handleToggleActive = async (id, currentStatus, userName) => {
    setTogglingId(id);
    const nextStatus = !currentStatus;

    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, is_active: nextStatus } : u))
    );

    try {
      if (currentStatus) {
        await API.put(`/admin/deactivate/${id}`);
        showToast(`Account for ${userName || "user"} deactivated`, "success");
      } else {
        await API.put(`/admin/activate/${id}`);
        showToast(`Account for ${userName || "user"} activated`, "success");
      }
      fetchUsers();
    } catch (err) {
      // Revert optimistic update on error
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, is_active: currentStatus } : u))
      );
      showToast(`Failed to ${currentStatus ? "deactivate" : "activate"} user`, "error");
    } finally {
      setTogglingId(null);
    }
  };

  const handleAddFunds = async (e) => {
    e?.preventDefault();
    if (!fundModalUser) return;
    const amount = Number(fundAmount);
    if (!amount || amount <= 0) {
      showToast("Please enter a valid positive amount", "error");
      return;
    }

    setFundLoading(true);
    try {
      await API.put(`/admin/funds/${fundModalUser._id}`, { amount });
      showToast(`₹${amount.toLocaleString("en-IN")} added to ${fundModalUser.name}'s wallet`, "success");
      setFundModalUser(null);
      setFundAmount("");
      fetchUsers();
    } catch (err) {
      showToast(err?.response?.data?.error || "Failed to add funds", "error");
    } finally {
      setFundLoading(false);
    }
  };

  const confirmDeleteUser = async () => {
    if (!deleteModalUser) return;
    setDeleteLoading(true);
    try {
      await API.delete(`/admin/user/${deleteModalUser._id}`);
      showToast(`User ${deleteModalUser.name} deleted successfully`, "success");
      setDeleteModalUser(null);
      fetchUsers();
    } catch (error) {
      showToast("Failed to delete user", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
      router.push("/admin");
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatusFilter("all");
    setKycFilter("all");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl transition-all transform text-white font-medium text-sm ${toast.type === "success"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-400"
              : "bg-gradient-to-r from-rose-600 to-red-600 border border-rose-400"
            }`}
        >
          {toast.type === "success" ? <FaCheckCircle size={18} /> : <FaTimesCircle size={18} />}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-white/80 hover:text-white"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Layout Shell */}
      <div className="flex flex-1 min-h-screen relative">
        {/* Admin Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 h-screen w-72 bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
        >
          <div>
            {/* Sidebar Brand Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                  <img src="/assets/logo1.png" alt="DSC PAY" className="h-8 w-auto object-contain" />
                </div>
                <div>
                  <h1 className="font-extrabold text-lg leading-tight tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    DSC ADMIN
                  </h1>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                    <FaShieldAlt size={10} /> Control Center
                  </span>
                </div>
              </div>
              <button
                className="lg:hidden text-white/70 hover:text-white p-1 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Management
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab("overview");
                    setPage(1);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "overview"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <RiDashboardLine size={19} />
                    <span>Overview Stats</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("users");
                    setPage(1);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "users"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <FaUsers size={18} />
                    <span>User Management</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                    {metrics.totalUsers}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("kyc");
                    setPage(1);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "kyc"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <MdPendingActions size={19} />
                    <span>Pending KYC</span>
                  </div>
                  {metrics.kycPending > 0 && (
                    <span className="text-xs bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                      {metrics.kycPending}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveTab("funds");
                    setPage(1);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "funds"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <RiExchangeDollarLine size={19} />
                    <span>Wallet & Capital</span>
                  </div>
                  <span className="text-xs text-emerald-300 font-semibold">
                    ₹{metrics.totalWallet.toLocaleString("en-IN")}
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar Admin Footer */}
          <div className="p-4 border-t border-white/10 bg-slate-950/40">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                AD
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold truncate text-white">DSC SuperAdmin</div>
                <div className="text-[11px] text-slate-400 truncate">admin@dscpay.com</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white transition-all text-xs font-semibold border border-red-500/30"
            >
              <FaSignOutAlt size={14} />
              <span>Logout Admin</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                aria-label="Open sidebar"
              >
                <FaBars size={20} />
              </button>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 leading-tight">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "users" && "User Accounts & Management"}
                  {activeTab === "kyc" && "KYC Verification Queue"}
                  {activeTab === "funds" && "Wallet Balances & Funding"}
                </h2>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Digital Service Centre Administration & Operations
                </p>
              </div>
            </div>
          </header>

          {/* Page Content Body */}
          <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Users */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Users</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
                    <FaUsers size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {metrics.totalUsers}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">{metrics.activeUsers} Active</span>
                  <span>•</span>
                  <span className="text-slate-500">{metrics.inactiveUsers} Inactive</span>
                </div>
              </div>

              {/* Active Users */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Status</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                    <FaUserCheck size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {metrics.activeUsers}
                </div>
                <div className="mt-2 text-xs text-emerald-700 font-medium">
                  {metrics.totalUsers > 0
                    ? `${Math.round((metrics.activeUsers / metrics.totalUsers) * 100)}% of total accounts enabled`
                    : "No users registered yet"}
                </div>
              </div>

              {/* KYC Status */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">KYC Status</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                    <MdVerified size={20} />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {metrics.kycVerified}
                  <span className="text-sm font-semibold text-slate-400 ml-1">Verified</span>
                </div>
                <div className="mt-2 text-xs text-amber-700 font-medium flex items-center gap-1">
                  {metrics.kycPending > 0 ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>{metrics.kycPending} KYC Incomplete/Pending</span>
                    </>
                  ) : (
                    <span className="text-emerald-600 font-bold">All KYCs Completed</span>
                  )}
                </div>
              </div>

              {/* Total Balance */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Wallets</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
                    <FaWallet size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight text-purple-900">
                  ₹{metrics.totalWallet.toLocaleString("en-IN")}
                </div>
                <div className="mt-2 text-xs text-slate-500 font-medium">
                  Aggregate balance across all accounts
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 lg:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search name, phone, email, city..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                  value={search}
                  onChange={handleSearchChange}
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setDebouncedSearch("");
                      setPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <FaTimes size={13} />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <span>Status:</span>
                  <select
                    className="bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <span>KYC:</span>
                  <select
                    className="bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={kycFilter}
                    onChange={(e) => {
                      setKycFilter(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="all">All KYC</option>
                    <option value="verified">Verified Only</option>
                    <option value="pending">Pending Only</option>
                  </select>
                </div>

                {/* Rows per page selector */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <span>Show:</span>
                  <select
                    className="bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-2.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                  </select>
                </div>

                {(search || statusFilter !== "all" || kycFilter !== "all") && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded-lg hover:bg-blue-50 transition"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Users Table / Grid Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 lg:px-6 lg:py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-base">
                    User Accounts List
                  </h3>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                    {pagination.total}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {pagination.total > 0
                    ? `Showing ${(page - 1) * limit + 1} - ${Math.min(page * limit, pagination.total)} of ${pagination.total} records`
                    : "0 records"}
                </div>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4 lg:px-6">User Profile</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4 text-center">KYC Status</th>
                      <th className="py-3.5 px-4 text-center">Account Status</th>
                      <th className="py-3.5 px-4 text-right">Wallet Balance</th>
                      <th className="py-3.5 px-4 lg:px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-semibold text-slate-500">Loading user database...</span>
                          </div>
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center">
                          <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                            <FaUsers size={36} className="opacity-40" />
                            <span className="text-base font-semibold text-slate-600">No users found</span>
                            <span className="text-xs text-slate-400">
                              {debouncedSearch
                                ? "No accounts match your current search query or filter."
                                : "No user accounts found in this category."}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => {
                        const displayName = u.name || `${u.first_name || ""} ${u.last_name || ""}`.trim() || "DSC User";
                        const initials = displayName
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase() || "U";

                        const isToggling = togglingId === u._id;

                        return (
                          <tr
                            key={u._id}
                            className="hover:bg-blue-50/40 transition-colors duration-150 group"
                          >
                            {/* Profile */}
                            <td className="py-3.5 px-4 lg:px-6">
                              <div className="flex items-center gap-3">
                                {u.profile_image ? (
                                  <img
                                    src={u.profile_image}
                                    alt={displayName}
                                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                                    {initials}
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-slate-900 group-hover:text-blue-700 transition">
                                    {displayName}
                                  </div>
                                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    {u.businessName ? (
                                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                                        <FaBuilding size={10} className="text-slate-400" />
                                        {u.businessName}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400">Individual</span>
                                    )}
                                    {u.city && (
                                      <>
                                        <span>•</span>
                                        <span>{u.city}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Contact Info */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-col gap-1 text-xs">
                                <div className="text-slate-800 font-medium flex items-center gap-1.5">
                                  <FaEnvelope size={11} className="text-slate-400" />
                                  <span className="truncate max-w-[180px]">{u.email || "No email"}</span>
                                </div>
                                <div className="text-slate-600 flex items-center gap-1.5">
                                  <FaPhoneAlt size={10} className="text-slate-400" />
                                  <span>{u.phone || "No phone"}</span>
                                </div>
                              </div>
                            </td>

                            {/* KYC Status */}
                            <td className="py-3.5 px-4 text-center">
                              {u.kyc_status ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-300/80 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
                                  <FaCheckCircle size={11} className="text-emerald-600" />
                                  Verified
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-300/80 px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs">
                                  <MdPendingActions size={13} className="text-amber-600" />
                                  Pending
                                </span>
                              )}
                            </td>

                            {/* Account Status with Gradient Toggle Switch (matching reference) */}
                            <td className="py-3.5 px-4 text-center">
                              <div className="inline-flex items-center gap-2.5">
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={u.is_active}
                                  disabled={isToggling}
                                  onClick={() => handleToggleActive(u._id, u.is_active, displayName)}
                                  title={`Click to ${u.is_active ? "Deactivate" : "Activate"} ${displayName}`}
                                  className={`relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none ${u.is_active
                                      ? "bg-gradient-to-r from-[#4ade80] via-[#2dd4bf] to-[#3b82f6] shadow-[0_3px_12px_rgba(45,212,191,0.4)]"
                                      : "bg-slate-200 border border-slate-300 shadow-inner"
                                    } ${isToggling ? "opacity-60 cursor-wait" : "cursor-pointer hover:scale-105 active:scale-95"}`}
                                  style={{ width: "54px", height: "28px", padding: "3px" }}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={`pointer-events-none block rounded-full bg-white transition-transform duration-300 ease-in-out shadow-[0_3px_8px_rgba(0,0,0,0.25)] ${u.is_active ? "translate-x-6.5" : "translate-x-0"
                                      }`}
                                    style={{ width: "22px", height: "22px" }}
                                  />
                                </button>
                                <span
                                  className={`text-xs font-bold select-none min-w-[50px] text-left transition-colors ${u.is_active ? "text-emerald-700" : "text-slate-400"
                                    }`}
                                >
                                  {isToggling ? "Saving..." : u.is_active ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </td>

                            {/* Wallet Balance */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="font-extrabold text-slate-900 text-sm">
                                ₹{(Number(u.wallet_balance) || 0).toLocaleString("en-IN")}
                              </div>
                              <span className="text-[11px] text-slate-400">Available</span>
                            </td>

                            {/* Actions Column */}
                            <td className="py-3.5 px-4 lg:px-6">
                              <div className="flex items-center justify-center gap-2">
                                {/* Add Funds Button */}
                                <button
                                  onClick={() => {
                                    setFundModalUser(u);
                                    setFundAmount("");
                                  }}
                                  title="Add Wallet Balance"
                                  className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs hover:shadow"
                                >
                                  <FaPlus size={10} />
                                  <span>Funds</span>
                                </button>

                                {/* View Details Button */}
                                <button
                                  onClick={() => setSelectedUserForDetails(u)}
                                  title="View User Details"
                                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition border border-slate-200 bg-white"
                                >
                                  <FaEye size={14} />
                                </button>

                                {/* Delete User Button */}
                                <button
                                  onClick={() => setDeleteModalUser(u)}
                                  title="Delete Account"
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition border border-slate-200 bg-white"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="p-4 lg:px-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Page <span className="font-bold text-slate-800">{pagination.page}</span> of{" "}
                    <span className="font-bold text-slate-800">{pagination.totalPages}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* First Page */}
                    <button
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                      title="First Page"
                      className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
                    >
                      <FaAngleDoubleLeft size={12} />
                    </button>

                    {/* Prev Page */}
                    <button
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      disabled={!pagination.hasPrevPage}
                      title="Previous Page"
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-semibold flex items-center gap-1"
                    >
                      <FaChevronLeft size={10} />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition ${page === pageNum
                              ? "bg-blue-600 text-white shadow-sm"
                              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Page */}
                    <button
                      onClick={() => setPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                      disabled={!pagination.hasNextPage}
                      title="Next Page"
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-semibold flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <FaChevronRight size={10} />
                    </button>

                    {/* Last Page */}
                    <button
                      onClick={() => setPage(pagination.totalPages)}
                      disabled={page === pagination.totalPages}
                      title="Last Page"
                      className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
                    >
                      <FaAngleDoubleRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add Funds Modal */}
      {fundModalUser && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 relative">
            <button
              onClick={() => setFundModalUser(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <FaTimes size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-inner">
                <FaWallet size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Add Wallet Balance</h3>
                <p className="text-xs text-slate-500">Inject funds into retailer/user wallet</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-medium">Beneficiary</div>
                <div className="text-sm font-bold text-slate-900">{fundModalUser.name}</div>
                <div className="text-xs text-slate-500">{fundModalUser.email}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 font-medium">Current Balance</div>
                <div className="text-base font-extrabold text-blue-700">
                  ₹{(Number(fundModalUser.wallet_balance) || 0).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <form onSubmit={handleAddFunds}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Amount to Add (₹)
              </label>
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 1000"
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              {/* Quick Amount Presets */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFundAmount(String(amt))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-blue-50 hover:border-blue-300 text-xs font-bold text-slate-700 hover:text-blue-700 transition"
                  >
                    +₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFundModalUser(null)}
                  className="flex-1 py-3 border border-slate-300 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={fundLoading || !fundAmount}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {fundLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>Confirm & Add</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUserForDetails && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUserForDetails(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <FaTimes size={18} />
            </button>

            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                {(selectedUserForDetails.name || "U")[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedUserForDetails.name || `${selectedUserForDetails.first_name || ""} ${selectedUserForDetails.last_name || ""}`}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${selectedUserForDetails.is_active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    {selectedUserForDetails.is_active ? "Active Account" : "Inactive"}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${selectedUserForDetails.kyc_status
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {selectedUserForDetails.kyc_status ? "KYC Verified" : "KYC Pending"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Personal Details */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <FaUsers className="text-blue-600" />
                  <span>Personal Details</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Full Name</span>
                  <span className="font-semibold text-slate-900">{selectedUserForDetails.name || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email Address</span>
                  <span className="font-semibold text-slate-900">{selectedUserForDetails.email || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone Number</span>
                  <span className="font-semibold text-slate-900">{selectedUserForDetails.phone || "N/A"}</span>
                </div>
                {selectedUserForDetails.businessName && (
                  <div>
                    <span className="text-slate-500 block">Business / Shop Name</span>
                    <span className="font-semibold text-slate-900">{selectedUserForDetails.businessName}</span>
                  </div>
                )}
              </div>

              {/* KYC & Identity */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <FaIdCard className="text-indigo-600" />
                  <span>Identity & KYC</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Aadhaar Number</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {selectedUserForDetails.aadhaar_no || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">PAN Number</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {selectedUserForDetails.pan_number || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Wallet Balance</span>
                  <span className="font-extrabold text-blue-700 text-sm">
                    ₹{(Number(selectedUserForDetails.wallet_balance) || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <FaUniversity className="text-emerald-600" />
                  <span>Banking Information</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Bank Account No.</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {selectedUserForDetails.bankAccount || "Not configured"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Bank IFSC Code</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {selectedUserForDetails.bankIfsc || "Not configured"}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <FaMapMarkerAlt className="text-rose-600" />
                  <span>Address & Location</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Address</span>
                  <span className="font-semibold text-slate-900">{selectedUserForDetails.address || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">City</span>
                    <span className="font-semibold text-slate-900">{selectedUserForDetails.city || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">State</span>
                    <span className="font-semibold text-slate-900">{selectedUserForDetails.state || "N/A"}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block">PIN Code</span>
                  <span className="font-semibold text-slate-900">{selectedUserForDetails.pincode || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUserForDetails(null)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalUser && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 relative text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <FaTrash size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Delete User Account?</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to permanently delete the account for{" "}
              <span className="font-bold text-slate-800">{deleteModalUser.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                disabled={deleteLoading}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteUser}
                disabled={deleteLoading}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition shadow-lg shadow-red-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Yes, Delete User</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
