import fc from "fast-check";

// Mock Next.js server components
jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    next: jest.fn(() => ({ status: 200, headers: new Map() })),
    redirect: jest.fn((url) => ({
      status: 307,
      headers: new Map([["location", url.toString()]]),
    })),
  },
}));

// Mock the auth module
jest.mock("../lib/auth", () => ({
  getCurrentUser: jest.fn(),
}));

import { NextResponse } from "next/server";
import { getCurrentUser } from "../lib/auth";
import { middleware } from "../middleware";

describe("Route Protection Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to create mock request
  const createMockRequest = (url) => ({
    nextUrl: new URL(url),
    url,
    cookies: { get: jest.fn() },
  });

  describe("Unit Tests", () => {
    test("should allow access to public routes without authentication", () => {
      getCurrentUser.mockReturnValue(null);

      const mockRequest = createMockRequest("http://localhost:3000/items");
      const response = middleware(mockRequest);

      expect(response.status).not.toBe(307); // Not a redirect
    });

    test("should redirect unauthenticated users from protected routes", () => {
      getCurrentUser.mockReturnValue(null);

      const mockRequest = createMockRequest("http://localhost:3000/items/add");
      const response = middleware(mockRequest);

      expect(response.status).toBe(307); // Redirect status
      expect(response.headers.get("location")).toContain("/login");
    });

    test("should allow authenticated users to access protected routes", () => {
      getCurrentUser.mockReturnValue({
        id: "1",
        email: "admin@novamarket.com",
        name: "Admin User",
      });

      const mockRequest = createMockRequest("http://localhost:3000/items/add");
      const response = middleware(mockRequest);

      expect(response.status).not.toBe(307); // Not a redirect
    });

    test("should redirect authenticated users away from login page", () => {
      getCurrentUser.mockReturnValue({
        id: "1",
        email: "admin@novamarket.com",
        name: "Admin User",
      });

      const mockRequest = createMockRequest("http://localhost:3000/login");
      const response = middleware(mockRequest);

      expect(response.status).toBe(307); // Redirect status
      expect(response.headers.get("location")).toContain("/items");
    });

    test("should preserve redirect parameter when redirecting to login", () => {
      getCurrentUser.mockReturnValue(null);

      const mockRequest = createMockRequest("http://localhost:3000/items/add");
      const response = middleware(mockRequest);

      expect(response.status).toBe(307);
      const location = response.headers.get("location");
      expect(location).toContain("/login");
      expect(location).toContain("redirect=%2Fitems%2Fadd");
    });
  });

  describe("Property-Based Tests", () => {
    /**
     * Feature: nova-marketplace, Property 2: Route Protection Enforcement
     * **Validates: Requirements 6.1, 6.2**
     */
    test("Property 2: Route Protection Enforcement - For any protected route, when accessed by an unauthenticated user, the system should redirect to the login page", () => {
      // Define protected route patterns for testing
      const protectedRoutes = [
        "/items/add",
        "/items/edit",
        "/admin",
        "/dashboard",
        "/profile",
      ];

      // Generator for protected routes with optional sub-paths
      // Note: We generate only valid URL path characters to match real-world usage
      const protectedRouteArb = fc.oneof(
        ...protectedRoutes.map((route) =>
          fc
            .tuple(
              fc.constant(route),
              fc.option(
                fc
                  .string({
                    minLength: 1,
                    maxLength: 20,
                  })
                  .filter((s) => /^[a-zA-Z0-9_-]+$/.test(s)) // Only alphanumeric, underscore, and dash
              )
            )
            .map(([baseRoute, subPath]) => {
              if (subPath) {
                const cleanSubPath = subPath.trim();
                return cleanSubPath
                  ? `${baseRoute}/${cleanSubPath}`
                  : baseRoute;
              }
              return baseRoute;
            })
        )
      );

      fc.assert(
        fc.property(protectedRouteArb, (protectedPath) => {
          // Setup: User is not authenticated
          getCurrentUser.mockReturnValue(null);

          // Action: Try to access protected route
          const mockRequest = createMockRequest(
            `http://localhost:3000${protectedPath}`
          );
          const response = middleware(mockRequest);

          // Assertion: Should redirect to login page
          expect(response.status).toBe(307);
          const location = response.headers.get("location");
          expect(location).toContain("/login");

          // Extract and decode the redirect parameter to compare with the original path
          const url = new URL(location);
          const redirectParam = url.searchParams.get("redirect");
          expect(redirectParam).toBe(protectedPath);
        }),
        { numRuns: 20 }
      );
    });

    /**
     * Property test for public route accessibility
     * Validates that public routes remain accessible without authentication
     */
    test("Property: Public Route Accessibility - For any public route, unauthenticated users should have access", () => {
      // Define public routes for testing
      const publicRoutes = ["/", "/items"];

      // Generator for public routes
      const publicRouteArb = fc.oneof(
        ...publicRoutes.map((route) => fc.constant(route))
      );

      // Generator for product detail routes (dynamic public routes)
      const productDetailArb = fc
        .integer({ min: 1, max: 1000 })
        .map((id) => `/items/${id}`);

      // Combined generator for all public routes (excluding login for this test)
      const allPublicRoutesArb = fc.oneof(publicRouteArb, productDetailArb);

      fc.assert(
        fc.property(allPublicRoutesArb, (publicPath) => {
          // Setup: User is not authenticated
          getCurrentUser.mockReturnValue(null);

          // Action: Try to access public route
          const mockRequest = createMockRequest(
            `http://localhost:3000${publicPath}`
          );
          const response = middleware(mockRequest);

          // Assertion: Should not redirect
          expect(response.status).not.toBe(307);
        }),
        { numRuns: 20 }
      );
    });

    /**
     * Property test for authenticated user access to protected routes
     * Validates that authenticated users can access protected routes
     */
    test("Property: Authenticated Access - For any protected route, authenticated users should have access", () => {
      const protectedRoutes = [
        "/items/add",
        "/items/edit",
        "/admin",
        "/dashboard",
        "/profile",
      ];

      const protectedRouteArb = fc.oneof(
        ...protectedRoutes.map((route) => fc.constant(route))
      );

      fc.assert(
        fc.property(protectedRouteArb, (protectedPath) => {
          // Setup: User is authenticated
          getCurrentUser.mockReturnValue({
            id: "1",
            email: "admin@novamarket.com",
            name: "Admin User",
          });

          // Action: Try to access protected route
          const mockRequest = createMockRequest(
            `http://localhost:3000${protectedPath}`
          );
          const response = middleware(mockRequest);

          // Assertion: Should not redirect
          expect(response.status).not.toBe(307);
        }),
        { numRuns: 20 }
      );
    });
  });
});
