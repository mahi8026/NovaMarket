import { POST } from "../login/route";
import { MOCK_CREDENTIALS } from "@/lib/auth";

// Mock Next.js modules
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      cookies: {
        set: jest.fn(),
      },
      ...data,
      ...options,
    })),
  },
}));

describe("/api/auth/login", () => {
  let mockRequest;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      json: jest.fn(),
    };
  });

  test("should authenticate with valid credentials", async () => {
    mockRequest.json.mockResolvedValue({
      email: MOCK_CREDENTIALS.email,
      password: MOCK_CREDENTIALS.password,
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.user).toEqual({
      id: "1",
      email: MOCK_CREDENTIALS.email,
      name: "Admin User",
    });
    expect(response.cookies.set).toHaveBeenCalledWith(
      "auth-token",
      expect.any(String),
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      })
    );
  });

  test("should reject invalid credentials", async () => {
    mockRequest.json.mockResolvedValue({
      email: "wrong@email.com",
      password: "wrongpassword",
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid credentials");
    expect(response.status).toBe(401);
  });

  test("should handle malformed request", async () => {
    mockRequest.json.mockRejectedValue(new Error("Invalid JSON"));

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid request format");
    expect(response.status).toBe(400);
  });

  test("should reject missing email", async () => {
    mockRequest.json.mockResolvedValue({
      password: MOCK_CREDENTIALS.password,
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid credentials");
  });

  test("should reject missing password", async () => {
    mockRequest.json.mockResolvedValue({
      email: MOCK_CREDENTIALS.email,
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid credentials");
  });
});
