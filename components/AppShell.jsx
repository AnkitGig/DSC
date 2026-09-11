"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/admin" ||
    pathname === "/admin-dashboard";

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (isAuthRoute) {
      // Auth routes (login/signup/admin) do not require user token
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      // Protected routes require token
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
        setLoading(false);
      }
    }
  }, [pathname, isAuthRoute, router]);

  // While checking auth on protected routes, show clean loader without flashing content
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If on a protected route and not authenticated, do not render children
  if (!isAuthRoute && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hideLayout = isAuthRoute;

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideLayout && <Sidebar />}
      {!hideLayout && <Header />}
      <main>{children}</main>
    </div>
  );
}
