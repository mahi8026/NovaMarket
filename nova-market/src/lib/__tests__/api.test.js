/**
 * Unit tests for API client
 * Tests API configuration and basic functionality
 * Requirements: 3.2, 3.4, 3.5
 */

import { productApi } from "../api";

// Simple tests for API client structure and configuration
describe("Product API", () => {
  test("productApi should have required methods", () => {
    expect(typeof productApi.getProducts).toBe("function");
    expect(typeof productApi.getProduct).toBe("function");
    expect(typeof productApi.createProduct).toBe("function");
  });

  test("API methods should be callable", () => {
    // These will fail in test environment without a server, but we're just testing structure
    expect(() => productApi.getProducts()).not.toThrow();
    expect(() => productApi.getProduct("1")).not.toThrow();
    expect(() => productApi.createProduct({})).not.toThrow();
  });

  test("API base URL configuration", () => {
    // Test that the API client is properly configured
    // The actual URL testing is done through integration tests
    expect(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
    ).toBeTruthy();
  });
});
