/**
 * Property-based tests for ProductCard component
 * Feature: nova-marketplace, Property 1: Product Display Completeness
 * Validates: Requirements 3.3, 4.2, 4.3
 */

import { render } from "@testing-library/react";
import fc from "fast-check";
import ProductCard from "../ProductCard";

// Generator for valid product objects
const productArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.string({ minLength: 1, maxLength: 1000 }),
  price: fc.integer({ min: 1, max: 999999 }).map((n) => n / 100), // Generate prices as integers then divide for decimal
  image: fc.string({ minLength: 1 }),
});

describe("ProductCard Property Tests", () => {
  test("Property 1: Product Display Completeness - For any valid product object, all required fields should be present in rendered output", () => {
    fc.assert(
      fc.property(productArbitrary, (product) => {
        const { container } = render(<ProductCard product={product} />);

        // Check that all required product properties are displayed
        const renderedText = container.textContent;

        // Product name should be displayed
        expect(renderedText).toContain(product.name);

        // Product description should be displayed
        expect(renderedText).toContain(product.description);

        // Product price should be displayed (formatted as currency)
        const formattedPrice = `$${product.price.toFixed(2)}`;
        expect(renderedText).toContain(formattedPrice);

        // Image should have proper alt text with product name
        const images = container.querySelectorAll("img");
        if (images.length > 0) {
          const img = images[0];
          expect(img.getAttribute("src")).toBe(product.image);
          expect(img.getAttribute("alt")).toContain(product.name);
        }

        // View Details link should be present and point to correct product
        const links = container.querySelectorAll("a");
        const detailsLink = Array.from(links).find((link) =>
          link.textContent.includes("View Details")
        );
        expect(detailsLink).toBeTruthy();

        // Check that the href starts with /items and contains the product ID
        const href = detailsLink.getAttribute("href");
        expect(href).toMatch(/^\/items/);
        // The product ID should be present in the URL after /items
        expect(href.includes(product.id)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  test("Property 1 Edge Case: Product with missing image should handle gracefully", () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 1000 }),
          price: fc.integer({ min: 1, max: 999999 }).map((n) => n / 100),
          image: fc.constantFrom("", null, undefined),
        }),
        (product) => {
          const { container } = render(<ProductCard product={product} />);

          // Should still display name, description, and price
          const renderedText = container.textContent;
          expect(renderedText).toContain(product.name);
          expect(renderedText).toContain(product.description);
          expect(renderedText).toContain(`$${product.price.toFixed(2)}`);

          // Should show placeholder for missing image
          expect(renderedText).toContain("No image available");
        }
      ),
      { numRuns: 100 }
    );
  });

  test("Property 1 Edge Case: Product with zero price should display correctly", () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 1000 }),
          price: fc.constant(0),
          image: fc.string({ minLength: 1 }),
        }),
        (product) => {
          const { container } = render(<ProductCard product={product} />);

          // Should display $0.00 for zero price
          const renderedText = container.textContent;
          expect(renderedText).toContain("$0.00");
        }
      ),
      { numRuns: 100 }
    );
  });
});
