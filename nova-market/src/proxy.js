import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { auth } from "@/auth";

/**
 * Proxy for route protection in Nova Marketplace
 * Handles authentication checks and redirects for protected routes
 * Supports both NextAuth.js sessions and cookie-based authentication
 */

// Define protected route patterns
const PROTECTED_ROUTES = [
  "/items/add",
  "/items/edit",
  "/admin",
  "/dashboard",
  "/profile",
];

// Define public routes that should always be accessible
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/items",
  "/items/[id]", // Dynamic product detail pages
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
];

/**
 * Checks if a path matches any protected route pattern
 * @param {string} pathname - The request pathname
 * @returns {boolean} True if the path is protected
 */
function isProtectedRoute(pathname) {
  return PROTECTED_ROUTES.some((route) => {
    // Handle exact matches
    if (route === pathname) return true;

    // Handle nested routes (e.g., /items/add/something)
    if (pathname.startsWith(route + "/")) return true;

    return false;
  });
}

/**
 * Checks if a path is explicitly public
 * @param {string} pathname - The request pathname
 * @returns {boolean} True if the path is public
 */
function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.some((route) => {
    // Handle exact matches
    if (route === pathname) return true;

    // Handle dynamic routes like /items/[id]
    if (route.includes("[id]")) {
      const pattern = route.replace("[id]", "[^/]+");
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }

    // Handle API routes
    if (pathname.startsWith("/api/") && route.startsWith("/api/")) {
      return pathname.startsWith(route);
    }

    return false;
  });
}

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Check if the route is protected
  if (isProtectedRoute(pathname)) {
    // Try NextAuth session first
    const session = await auth();

    // Fall back to cookie-based authentication if no NextAuth session
    const cookieUser = !session ? getCurrentUser(request.cookies) : null;

    const isUserAuthenticated = session || cookieUser;

    if (!isUserAuthenticated) {
      // User is not authenticated, redirect to login
      const loginUrl = new URL("/login", request.url);

      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  // For authenticated users trying to access login page, redirect to items
  if (pathname === "/login") {
    // Try NextAuth session first
    const session = await auth();

    // Fall back to cookie-based authentication if no NextAuth session
    const cookieUser = !session ? getCurrentUser(request.cookies) : null;

    const isUserAuthenticated = session || cookieUser;

    if (isUserAuthenticated) {
      // Check if there's a redirect parameter
      const redirectUrl = request.nextUrl.searchParams.get("redirect");

      if (redirectUrl && isProtectedRoute(redirectUrl)) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }

      // Default redirect to items page
      return NextResponse.redirect(new URL("/items", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
