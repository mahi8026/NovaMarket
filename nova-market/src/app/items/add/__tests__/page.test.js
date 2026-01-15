/**
 * Unit tests for Add Item Page
 * Tests protected route access, form submission, and notifications
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import AddItemPage from "../page";
import { productApi } from "@/lib/api";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  productApi: {
    createProduct: jest.fn(),
  },
}));

describe("AddItemPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  test("renders add item page with form", () => {
    render(<AddItemPage />);

    expect(screen.getByText(/add new product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
  });

  test("displays success notification on successful product creation", async () => {
    const mockProduct = {
      id: "1",
      name: "Test Product",
      description: "Test Description",
      price: 19.99,
      image: "https://example.com/image.jpg",
    };

    productApi.createProduct.mockResolvedValue(mockProduct);

    render(<AddItemPage />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "19.99" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    // Wait for success notification
    await waitFor(() => {
      expect(
        screen.getByText(/product added successfully/i)
      ).toBeInTheDocument();
    });

    expect(productApi.createProduct).toHaveBeenCalledWith({
      name: "Test Product",
      description: "Test Description",
      price: 19.99,
      image: "https://example.com/image.jpg",
    });
  });

  test("displays error notification on failed product creation", async () => {
    const errorMessage = "Failed to create product";
    productApi.createProduct.mockRejectedValue(new Error(errorMessage));

    render(<AddItemPage />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "19.99" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    // Wait for error notification
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Should not redirect on error
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("redirects to items page after successful creation", async () => {
    jest.useFakeTimers();

    const mockProduct = {
      id: "1",
      name: "Test Product",
      description: "Test Description",
      price: 19.99,
      image: "https://example.com/image.jpg",
    };

    productApi.createProduct.mockResolvedValue(mockProduct);

    render(<AddItemPage />);

    // Fill in and submit the form
    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "19.99" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    // Wait for success notification
    await waitFor(() => {
      expect(
        screen.getByText(/product added successfully/i)
      ).toBeInTheDocument();
    });

    // Fast-forward time to trigger redirect
    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/items");
    });

    jest.useRealTimers();
  });

  test("provides back to products navigation", () => {
    render(<AddItemPage />);

    const backButton = screen.getByText(/back to products/i);
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith("/items");
  });

  test("disables back button during submission", async () => {
    productApi.createProduct.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<AddItemPage />);

    // Fill in and submit the form
    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "19.99" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    // Back button should be disabled during submission
    await waitFor(() => {
      const backButton = screen.getByText(/back to products/i);
      expect(backButton).toBeDisabled();
    });
  });
});
