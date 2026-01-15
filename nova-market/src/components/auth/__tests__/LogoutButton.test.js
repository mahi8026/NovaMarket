import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LogoutButton from "../LogoutButton";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe("LogoutButton", () => {
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

  test("should render logout button", () => {
    render(<LogoutButton />);

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  test("should handle successful logout", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<LogoutButton />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/auth/logout", {
        method: "POST",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test("should handle logout error gracefully", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<LogoutButton />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Logout failed:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  test("should show loading state during logout", async () => {
    fetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<LogoutButton />);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    expect(screen.getByText("Logging out...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("should apply custom className", () => {
    render(<LogoutButton className="custom-class" />);

    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toHaveClass("custom-class");
  });
});
