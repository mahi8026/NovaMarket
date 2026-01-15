/**
 * Unit tests for ProductDetails component
 * Tests: Product information display, navigation back to list
 * Validates: Requirements 4.2, 4.3, 4.5
 */

import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProductDetails from "../ProductDetails";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProductDetails Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockProduct = {
    id: "123",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    image: "https://example.com/headphones.jpg",
    createdAt: "2024-01-15T10:00:00Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  describe("Product Information Display (Requirements 4.2, 4.3)", () => {
    test("should display all product properties", () => {
      render(<ProductDetails product={mockProduct} />);

      // Check all required fields are displayed
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(
        screen.getByText(`$${mockProduct.price.toFixed(2)}`)
      ).toBeInTheDocument();
      expect(screen.getByText(mockProduct.id)).toBeInTheDocument();
    });

    test("should display product image with correct attributes", () => {
      render(<ProductDetails product={mockProduct} />);

      const image = screen.getByAltText(mockProduct.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockProduct.image);
    });

    test("should display formatted creation date when available", () => {
      render(<ProductDetails product={mockProduct} />);

      const formattedDate = new Date(
        mockProduct.createdAt
      ).toLocaleDateString();
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    test("should handle missing image gracefully", () => {
      const productWithoutImage = { ...mockProduct, image: null };
      render(<ProductDetails product={productWithoutImage} />);

      expect(screen.getByText(/no image available/i)).toBeInTheDocument();
    });

    test("should handle missing description", () => {
      const productWithoutDescription = { ...mockProduct, description: null };
      render(<ProductDetails product={productWithoutDescription} />);

      expect(screen.getByText(/no description available/i)).toBeInTheDocument();
    });

    test("should display price as 0.00 for invalid price", () => {
      const productWithInvalidPrice = { ...mockProduct, price: null };
      render(<ProductDetails product={productWithInvalidPrice} />);

      expect(screen.getByText("$0.00")).toBeInTheDocument();
    });

    test("should not render when product is null", () => {
      const { container } = render(<ProductDetails product={null} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Navigation Elements (Requirement 4.5)", () => {
    test("should provide back to products button", () => {
      render(<ProductDetails product={mockProduct} />);

      const backButton = screen.getByRole("button", {
        name: /back to products/i,
      });
      expect(backButton).toBeInTheDocument();
    });

    test("should navigate to products list when back button is clicked", () => {
      render(<ProductDetails product={mockProduct} />);

      const backButton = screen.getByRole("button", {
        name: /back to products/i,
      });
      backButton.click();

      expect(mockRouter.push).toHaveBeenCalledWith("/items");
    });

    test("should display action buttons for user interaction", () => {
      render(<ProductDetails product={mockProduct} />);

      expect(
        screen.getByRole("button", { name: /add to cart/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /add to wishlist/i })
      ).toBeInTheDocument();
    });
  });

  describe("Product Information Section", () => {
    test("should display product ID in information section", () => {
      render(<ProductDetails product={mockProduct} />);

      expect(screen.getByText("Product ID:")).toBeInTheDocument();
      expect(screen.getByText(mockProduct.id)).toBeInTheDocument();
    });

    test("should not display creation date section when createdAt is missing", () => {
      const productWithoutDate = { ...mockProduct, createdAt: null };
      render(<ProductDetails product={productWithoutDate} />);

      expect(screen.queryByText("Added:")).not.toBeInTheDocument();
    });
  });
});
