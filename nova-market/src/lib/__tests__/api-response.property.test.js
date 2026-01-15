/**
 * Property-based tests for API Response Handling
 * Feature: nova-marketplace, Property 4: API Response Handling
 * Validates: Requirements 7.2, 7.4
 */

import * as fc from "fast-check";
import { productApi, apiClient } from "../api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API Response Handling (Property-Based Tests)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Property 4: API Response Handling
   * For any API response (success or error), the system should handle the response
   * appropriately by either displaying the data or showing appropriate error messages
   */
  test("Property 4: All successful API responses return parsed JSON data", async () => {
    // Generator for various successful response data
    const successResponseArbitrary = fc.record({
      id: fc.string({ minLength: 1 }),
      name: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 1000 }),
      price: fc.float({
        min: Math.fround(0.01),
        max: Math.fround(999999.99),
        noNaN: true,
      }),
      image: fc.webUrl(),
    });

    await fc.assert(
      fc.asyncProperty(successResponseArbitrary, async (responseData) => {
        // Mock successful response
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => responseData,
        });

        // Call API
        const result = await productApi.getProducts();

        // Verify the response data is returned correctly
        expect(result).toEqual(responseData);
      }),
      { numRuns: 100 }
    );
  });

  test("Property 4: All HTTP error responses throw errors with user-friendly messages", async () => {
    // Generator for various HTTP error status codes (excluding those that trigger retries)
    const errorStatusArbitrary = fc.oneof(
      fc.constant(400), // Bad Request - not retried
      fc.constant(401), // Unauthorized - not retried
      fc.constant(403), // Forbidden - not retried
      fc.constant(404) // Not Found - not retried
    );

    await fc.assert(
      fc.asyncProperty(errorStatusArbitrary, async (statusCode) => {
        // Mock error response
        global.fetch.mockResolvedValueOnce({
          ok: false,
          status: statusCode,
          statusText: "Error",
          json: async () => ({ message: "Test error" }),
        });

        // Call API and expect error
        try {
          await productApi.getProducts();
          fail("Should have thrown an error");
        } catch (error) {
          // Verify error has user-friendly message
          expect(error.userMessage).toBeDefined();
          expect(typeof error.userMessage).toBe("string");
          expect(error.userMessage.length).toBeGreaterThan(0);

          // Verify error has status code
          expect(error.status).toBe(statusCode);
        }
      }),
      { numRuns: 100 }
    );
  });

  test("Property 4: Network errors are handled with appropriate error messages", async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        // Mock network error
        global.fetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

        // Call API and expect error
        try {
          await productApi.getProducts();
          fail("Should have thrown an error");
        } catch (error) {
          // Verify error has user-friendly message for network issues
          expect(error.userMessage).toBeDefined();
          expect(typeof error.userMessage).toBe("string");
          expect(error.userMessage.toLowerCase()).toContain("connect");
        }
      }),
      { numRuns: 100 }
    );
  }, 30000);

  test("Property 4: Server errors (500+) are retried and eventually throw with user message", async () => {
    // Generator for server error status codes
    const serverErrorArbitrary = fc.oneof(
      fc.constant(500), // Internal Server Error
      fc.constant(502), // Bad Gateway
      fc.constant(503) // Service Unavailable
    );

    await fc.assert(
      fc.asyncProperty(serverErrorArbitrary, async (statusCode) => {
        // Mock error response for all retry attempts
        global.fetch.mockResolvedValue({
          ok: false,
          status: statusCode,
          statusText: "Server Error",
          json: async () => ({ message: "Server error" }),
        });

        // Call API and expect error after retries
        try {
          await productApi.getProducts();
          fail("Should have thrown an error");
        } catch (error) {
          // Verify error has user-friendly message
          expect(error.userMessage).toBeDefined();
          expect(typeof error.userMessage).toBe("string");
          expect(error.userMessage.length).toBeGreaterThan(0);

          // Verify error has status code
          expect(error.status).toBe(statusCode);

          // Verify retry attempts were made
          // The API client retries up to 3 times (maxRetries=3), so total calls = initial + retries
          expect(global.fetch.mock.calls.length).toBeGreaterThanOrEqual(4);
        }
      }),
      { numRuns: 20 } // Reduced runs due to retry delays
    );
  }, 60000); // Increased timeout for retry logic

  test("Property 4: Error responses with JSON bodies are parsed correctly", async () => {
    // Generator for error response bodies
    const errorBodyArbitrary = fc.record({
      message: fc.string({ minLength: 1, maxLength: 200 }),
      code: fc.option(fc.string(), { nil: undefined }),
    });

    await fc.assert(
      fc.asyncProperty(errorBodyArbitrary, async (errorBody) => {
        // Mock error response with JSON body
        global.fetch.mockResolvedValueOnce({
          ok: false,
          status: 400,
          statusText: "Bad Request",
          json: async () => errorBody,
        });

        try {
          await productApi.getProducts();
          fail("Should have thrown an error");
        } catch (error) {
          // Verify error details are preserved
          expect(error.details).toEqual(errorBody);
          expect(error.message).toContain(errorBody.message);
        }
      }),
      { numRuns: 100 }
    );
  });
});
