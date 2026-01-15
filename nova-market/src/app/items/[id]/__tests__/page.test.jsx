/**
 * Unit tests for Product Details Page
 * Tests: Product detail rendering, invalid ID error handling, navigation elements
 * Validates: Requirements 4.2, 4.4, 4.5
 */

import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProductDetailsPage from "../page";
import { productApi } from "@/lib/api";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  productApi: {
    getProduct: jest.fn(),
  },
}));

jest.mock("@/components/products/ProductDetails", () => {
  return function MockProductDetails({ product }) {
    return (
      <div data-testid="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span>${product.price.toFixed(2)}</span>
      </div>
    );
  };
});

describe("ProductDetailsPage", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockProduct = {
    id: "1",
    name: "Test Product",
    description: "Test Description",
    price: 29.99,
    image: "https://example.com/image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  describe("Product Detail Rendering (Requirement 4.2)", () => {
    test("should render product details when product is loaded successfully", async () => {
      productApi.getProduct.mockResolvedValue(mockProduct);

      render(<ProductDetailsPage params={{ id: "1" }} />);

      // Should show loading state initially
      expect(screen.getByText(/loading product/i)).toBeInTheDocument();

      // Wait for product to load
      await waitFor(() => {
        expect(screen.getByTestId("product-details")).toBeInTheDocument();
      });

      // Verify product details are displayed
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(
        screen.getByText(`$${mockProduct.price.toFixed(2)}`)
      ).toBeInTheDocument();
    });

    test("should call API with correct product ID", async () => {
      productApi.getProduct.mockResolvedValue(mockProduct);

      render(<ProductDetailsPage params={{ id: "123" }} />);

      await waitFor(() => {
        expect(productApi.getProduct).toHaveBeenCalledWith("123");
      });
    });

    test("should display loading state while fetching product", () => {
      productApi.getProduct.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      const { container } = render(<ProductDetailsPage params={{ id: "1" }} />);

      expect(screen.getByText(/loading product/i)).toBeInTheDocument();

      // Check for loading spinner
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("animate-spin");
    });
  });

  describe("Invalid ID Error Handling (Requirement 4.4)", () => {
    test("should display 404 error when product is not found", async () => {
      productApi.getProduct.mockRejectedValue(new Error("Product not found"));

      render(<ProductDetailsPage params={{ id: "invalid-id" }} />);

      await waitFor(() => {
        expect(screen.getByText("404")).toBeInTheDocument();
      });

      expect(screen.getByText(/product not found/i)).toBeInTheDocument();
    });

    test("should display error message when API call fails", async () => {
      productApi.getProduct.mockRejectedValue(new Error("API Error"));

      render(<ProductDetailsPage params={{ id: "1" }} />);

      await waitFor(() => {
        expect(screen.getByText(/product not found/i)).toBeInTheDocument();
      });
    });

    test("should handle null product response", async () => {
      productApi.getProduct.mockResolvedValue(null);

      render(<ProductDetailsPage params={{ id: "1" }} />);

      await waitFor(() => {
        expect(screen.getByText("404")).toBeInTheDocument();
      });
    });
  });

  describe("Navigation Elements (Requirement 4.5)", () => {
    test("should provide navigation back to product list on error", async () => {
      productApi.getProduct.mockRejectedValue(new Error("Product not found"));

      render(<ProductDetailsPage params={{ id: "invalid-id" }} />);

      await waitFor(() => {
        expect(screen.getByText("404")).toBeInTheDocument();
      });

      const backButton = screen.getByRole("button", {
        name: /back to products/i,
      });
      expect(backButton).toBeInTheDocument();

      backButton.click();
      expect(mockRouter.push).toHaveBeenCalledWith("/items");
    });

    test("should render ProductDetails component which includes navigation", async () => {
      productApi.getProduct.mockResolvedValue(mockProduct);

      render(<ProductDetailsPage params={{ id: "1" }} />);

      await waitFor(() => {
        expect(screen.getByTestId("product-details")).toBeInTheDocument();
      });

      // ProductDetails component is rendered, which includes back navigation
      expect(screen.getByTestId("product-details")).toBeInTheDocument();
    });
  });
});
