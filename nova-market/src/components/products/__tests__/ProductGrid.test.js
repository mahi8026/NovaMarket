/**
 * Unit tests for ProductGrid component
 * Tests grid layout, empty states, loading states, and error handling
 * Requirements: 3.2, 3.4, 3.5
 */

import { render, screen } from "@testing-library/react";
import ProductGrid from "../ProductGrid";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }) {
    return <a href={href}>{children}</a>;
  };
});

describe("ProductGrid", () => {
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

  test("displays loading state when loading prop is true", () => {
    render(<ProductGrid loading={true} />);

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
    // Check for the spinner element by class
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  test("displays error state when error prop is provided", () => {
    const errorMessage = "Failed to load products";
    render(<ProductGrid error={errorMessage} />);

    expect(screen.getByText("Error Loading Products")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  test("displays empty state when products array is empty", () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText("No products available")).toBeInTheDocument();
    expect(
      screen.getByText("There are currently no products in the marketplace.")
    ).toBeInTheDocument();
  });

  test("displays empty state when products is null", () => {
    render(<ProductGrid products={null} />);

    expect(screen.getByText("No products available")).toBeInTheDocument();
  });

  test("displays empty state when products is undefined", () => {
    render(<ProductGrid products={undefined} />);

    expect(screen.getByText("No products available")).toBeInTheDocument();
  });

  test("renders products in grid layout", () => {
    render(<ProductGrid products={mockProducts} />);

    // Check that both products are rendered
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();

    // Check that grid container exists
    const gridContainer = screen.getByText("Test Product 1").closest(".grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4"
    );
  });

  test("handles products without IDs gracefully", () => {
    const productsWithoutIds = [
      {
        name: "Product Without ID",
        description: "Test description",
        price: 19.99,
        image: "test-image.jpg",
      },
    ];

    render(<ProductGrid products={productsWithoutIds} />);

    expect(screen.getByText("Product Without ID")).toBeInTheDocument();
  });

  test("loading state takes precedence over error state", () => {
    render(<ProductGrid loading={true} error="Some error" />);

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
    expect(
      screen.queryByText("Error Loading Products")
    ).not.toBeInTheDocument();
  });

  test("error state takes precedence over empty state", () => {
    render(<ProductGrid products={[]} error="Some error" />);

    expect(screen.getByText("Error Loading Products")).toBeInTheDocument();
    expect(screen.queryByText("No products available")).not.toBeInTheDocument();
  });

  test("renders single product correctly", () => {
    const singleProduct = [mockProducts[0]];
    render(<ProductGrid products={singleProduct} />);

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });
});
