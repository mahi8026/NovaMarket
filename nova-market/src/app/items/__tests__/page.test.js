/**
 * Unit tests for Items page
 * Tests API integration, error handling, empty states, and loading states
 * Requirements: 3.2, 3.4, 3.5
 */

import { render, screen, waitFor } from "@testing-library/react";
import { productApi } from "@/lib/api";
import ItemsPage from "../page";

// Mock the API
jest.mock("@/lib/api", () => ({
  productApi: {
    getProducts: jest.fn(),
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }) {
    return <a href={href}>{children}</a>;
  };
});

describe("ItemsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    // Mock API to never resolve to test loading state
    productApi.getProducts.mockImplementation(() => new Promise(() => {}));

    render(<ItemsPage />);

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Products" })
    ).toBeInTheDocument();
  });

  test("displays products when API call succeeds", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Test Product 1",
        description: "Test description 1",
        price: 29.99,
        image: "test-image-1.jpg",
      },
      {
        id: "2",
        name: "Test Product 2",
        description: "Test description 2",
        price: 49.99,
        image: "test-image-2.jpg",
      },
    ];

    productApi.getProducts.mockResolvedValue(mockProducts);

    render(<ItemsPage />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });

    // Check that products are displayed
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();

    // Check product count display
    expect(screen.getByText("2 products available")).toBeInTheDocument();
  });

  test("displays empty state when no products are returned", async () => {
    productApi.getProducts.mockResolvedValue([]);

    render(<ItemsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("No products available")).toBeInTheDocument();
    expect(
      screen.getByText("There are currently no products in the marketplace.")
    ).toBeInTheDocument();
    expect(screen.getByText("0 products available")).toBeInTheDocument();
  });

  test("displays empty state when API returns null", async () => {
    productApi.getProducts.mockResolvedValue(null);

    render(<ItemsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("No products available")).toBeInTheDocument();
    expect(screen.getByText("0 products available")).toBeInTheDocument();
  });

  test("displays error state when API call fails", async () => {
    const errorMessage = "Network error";
    productApi.getProducts.mockRejectedValue(new Error(errorMessage));

    render(<ItemsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Error Loading Products")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to load products. Please try again later.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  test("displays singular product count correctly", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Single Product",
        description: "Test description",
        price: 19.99,
        image: "test-image.jpg",
      },
    ];

    productApi.getProducts.mockResolvedValue(mockProducts);

    render(<ItemsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("1 product available")).toBeInTheDocument();
  });

  test("handles API errors gracefully and logs them", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("API Error");
    productApi.getProducts.mockRejectedValue(error);

    render(<ItemsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch products:", error);

    consoleSpy.mockRestore();
  });
});
