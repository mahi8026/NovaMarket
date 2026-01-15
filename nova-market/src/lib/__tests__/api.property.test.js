/**
 * Property-based tests for API client
 * Feature: nova-marketplace, Property 3: API Request Format Consistency
 * Validates: Requirements 7.3
 */

import * as fc from "fast-check";
import { productApi } from "../api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API Request Format Consistency (Property-Based Tests)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default successful response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "1",
        name: "Test",
        description: "Test",
        price: 10,
        image: "test.jpg",
      }),
    });
  });

  /**
   * Property 3: API Request Format Consistency
   * For any product creation or update operation, the data sent to the Express API
   * should contain all required fields in the correct format and data types
   */
  test("Property 3: createProduct sends properly formatted data with all required fields", async () => {
    // Generator for valid product data
    const productArbitrary = fc.record({
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
      fc.asyncProperty(productArbitrary, async (productData) => {
        // Call the API
        await productApi.createProduct(productData);

        // Verify fetch was called
        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Get the call arguments
        const [url, options] = global.fetch.mock.calls[0];

        // Verify URL format
        expect(url).toContain("/products");

        // Verify HTTP method
        expect(options.method).toBe("POST");

        // Verify headers
        expect(options.headers).toHaveProperty(
          "Content-Type",
          "application/json"
        );

        // Parse the sent body
        const sentData = JSON.parse(options.body);

        // Verify all required fields are present
        expect(sentData).toHaveProperty("name");
        expect(sentData).toHaveProperty("description");
        expect(sentData).toHaveProperty("price");
        expect(sentData).toHaveProperty("image");

        // Verify data types
        expect(typeof sentData.name).toBe("string");
        expect(typeof sentData.description).toBe("string");
        expect(typeof sentData.price).toBe("number");
        expect(typeof sentData.image).toBe("string");

        // Verify values match input
        expect(sentData.name).toBe(productData.name);
        expect(sentData.description).toBe(productData.description);
        expect(sentData.price).toBe(productData.price);
        expect(sentData.image).toBe(productData.image);

        // Verify no extra fields (only the 4 required fields)
        const expectedFields = ["name", "description", "price", "image"];
        const actualFields = Object.keys(sentData);
        expect(actualFields.sort()).toEqual(expectedFields.sort());

        // Clear mock for next iteration
        global.fetch.mockClear();
      }),
      { numRuns: 100 }
    );
  });

  test("Property 3: createProduct handles edge case values correctly", async () => {
    // Generator for edge case product data
    const edgeCaseProductArbitrary = fc.record({
      name: fc.oneof(
        fc.constant("A"), // Single character
        fc.constant("A".repeat(100)), // Max length
        fc.constant("Product with special chars: !@#$%^&*()")
      ),
      description: fc.oneof(
        fc.constant("D"), // Single character
        fc.constant("D".repeat(1000)), // Max length
        fc.constant("Description\nwith\nnewlines")
      ),
      price: fc.oneof(
        fc.constant(0.01), // Minimum price
        fc.constant(999999.99), // Large price
        fc.constant(10.99) // Normal price with decimals
      ),
      image: fc.webUrl(),
    });

    await fc.assert(
      fc.asyncProperty(edgeCaseProductArbitrary, async (productData) => {
        await productApi.createProduct(productData);

        const [, options] = global.fetch.mock.calls[0];
        const sentData = JSON.parse(options.body);

        // Verify all fields are correctly formatted
        expect(sentData.name).toBe(productData.name);
        expect(sentData.description).toBe(productData.description);
        expect(sentData.price).toBe(productData.price);
        expect(sentData.image).toBe(productData.image);

        // Verify types remain correct even with edge cases
        expect(typeof sentData.name).toBe("string");
        expect(typeof sentData.description).toBe("string");
        expect(typeof sentData.price).toBe("number");
        expect(typeof sentData.image).toBe("string");

        global.fetch.mockClear();
      }),
      { numRuns: 100 }
    );
  });
});
