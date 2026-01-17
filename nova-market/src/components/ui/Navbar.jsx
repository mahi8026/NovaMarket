"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCookieAuth, setIsCookieAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for cookie-based authentication as fallback
  useEffect(() => {
    const checkCookieAuth = async () => {
      if (status === "unauthenticated") {
        try {
          const response = await fetch("/api/auth/status");
          if (response.ok) {
            const data = await response.json();
            setIsCookieAuth(data.isAuthenticated);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
        }
      }
    };

    checkCookieAuth();
  }, [status]);

  const isAuthenticated = status === "authenticated" || isCookieAuth;
  const isLoading = status === "loading";
  const userName = session?.user?.name || "User";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-gray-200/50 shadow-sm"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Nova Market
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/items"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                href="/items/add"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Add Item
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <div className="hidden md:flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                        <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {userName}
                        </span>
                      </div>
                      <LogoutButton className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors" />
                    </div>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Login
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden size-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/items"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/items/add"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Item
                      </Link>
                      <div className="px-4 py-2 text-sm text-gray-600">
                        Logged in as{" "}
                        <span className="font-semibold">{userName}</span>
                      </div>
                      <LogoutButton className="text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-colors text-left" />
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
