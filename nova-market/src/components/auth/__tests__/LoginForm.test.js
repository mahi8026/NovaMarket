import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoginForm from "../LoginForm";
import { MOCK_CREDENTIALS } from "@/lib/auth";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe("LoginForm", () => {
  let mockPush, mockRefresh;

  beforeEach(() => {
    mockPush = jest.fn();
    mockRefresh = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    fetch.mockClear();
  });

  test("should render login form with email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("should display demo credentials", () => {
    render(<LoginForm />);

    expect(screen.getByText("Demo credentials:")).toBeInTheDocument();
    expect(screen.getByText("Email: admin@novamarket.com")).toBeInTheDocument();
    expect(screen.getByText("Password: admin123")).toBeInTheDocument();
  });

  test("should handle successful login", async () => {
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          user: { id: "1", email: MOCK_CREDENTIALS.email },
        }),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: MOCK_CREDENTIALS.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: MOCK_CREDENTIALS.password },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: MOCK_CREDENTIALS.email,
          password: MOCK_CREDENTIALS.password,
        }),
      });
      expect(mockPush).toHaveBeenCalledWith("/items");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test("should display error on failed login", async () => {
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ success: false, error: "Invalid credentials" }),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  test("should handle network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: MOCK_CREDENTIALS.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: MOCK_CREDENTIALS.password },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Network error. Please try again.")
      ).toBeInTheDocument();
    });
  });

  test("should show loading state during login", async () => {
    fetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: MOCK_CREDENTIALS.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: MOCK_CREDENTIALS.password },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText("Logging in...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
