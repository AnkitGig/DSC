"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/admin" ||
    pathname === "/admin-dashboard";

  useEffect(() => {
    // Ensure demo retailer token is present for smooth dashboard experience
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token && !isAuthRoute) {
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("userRole", "Retailer");
      }
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [pathname, isAuthRoute]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8fc]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hideLayout = isAuthRoute;

  return (
    <div className="min-h-screen bg-[#f4f8fc] text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {!hideLayout && (
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      )}
      <div className="flex-1 flex relative">
        {!hideLayout && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}
