import { POST } from "../logout/route";

// Mock Next.js modules
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: () => Promise.resolve(data),
      cookies: {
        set: jest.fn(),
      },
      ...data,
    })),
  },
}));

describe("/api/auth/logout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should clear authentication cookie on logout", async () => {
    const response = await POST();
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(response.cookies.set).toHaveBeenCalledWith(
      "auth-token",
      "",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      })
    );
  });
});
