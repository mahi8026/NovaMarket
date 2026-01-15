/**
 * Unit tests for ProductForm component
 * Tests form validation and submission
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../ProductForm";

describe("ProductForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields", () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add product/i })
    ).toBeInTheDocument();
  });

  test("validates required fields on submission", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/product name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/price is required/i)).toBeInTheDocument();
      expect(screen.getByText(/image url is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("validates price is a positive number", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const priceInput = screen.getByLabelText(/price/i);
    // Set an invalid price (empty string will trigger validation)
    fireEvent.change(priceInput, { target: { value: "" } });

    // Fill other required fields
    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/price is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("validates name length", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText(/product name/i);
    fireEvent.change(nameInput, { target: { value: "A".repeat(101) } });

    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/product name must be 100 characters or less/i)
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("validates description length", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, { target: { value: "D".repeat(1001) } });

    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/description must be 1000 characters or less/i)
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("submits valid form data with correct formatting", async () => {
    mockOnSubmit.mockResolvedValue();

    render(<ProductForm onSubmit={mockOnSubmit} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/product name/i), {
      target: { value: "  Test Product  " },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "  Test Description  " },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "19.99" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "  https://example.com/image.jpg  " },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "Test Product",
        description: "Test Description",
        price: 19.99,
        image: "https://example.com/image.jpg",
      });
    });
  });

  test("clears field error when user starts typing", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    // Submit empty form to trigger errors
    const submitButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/product name is required/i)).toBeInTheDocument();
    });

    // Start typing in name field
    const nameInput = screen.getByLabelText(/product name/i);
    fireEvent.change(nameInput, { target: { value: "Test" } });

    // Error should be cleared
    await waitFor(() => {
      expect(
        screen.queryByText(/product name is required/i)
      ).not.toBeInTheDocument();
    });
  });

  test("disables form during submission", async () => {
    render(<ProductForm onSubmit={mockOnSubmit} isSubmitting={true} />);

    const nameInput = screen.getByLabelText(/product name/i);
    const submitButton = screen.getByRole("button", {
      name: /adding product/i,
    });

    expect(nameInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
