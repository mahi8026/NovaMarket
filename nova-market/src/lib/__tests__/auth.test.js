import {
  validateMockCredentials,
  createMockUser,
  getCurrentUser,
  isAuthenticated,
  MOCK_CREDENTIALS,
} from "../auth";

describe("Authentication Utilities", () => {
  describe("validateMockCredentials", () => {
    test("should validate correct credentials", () => {
      const result = validateMockCredentials(
        MOCK_CREDENTIALS.email,
        MOCK_CREDENTIALS.password
      );
      expect(result).toBe(true);
    });

    test("should reject incorrect email", () => {
      const result = validateMockCredentials(
        "wrong@email.com",
        MOCK_CREDENTIALS.password
      );
      expect(result).toBe(false);
    });

    test("should reject incorrect password", () => {
      const result = validateMockCredentials(
        MOCK_CREDENTIALS.email,
        "wrongpassword"
      );
      expect(result).toBe(false);
    });

    test("should reject both incorrect credentials", () => {
      const result = validateMockCredentials(
        "wrong@email.com",
        "wrongpassword"
      );
      expect(result).toBe(false);
    });
  });

  describe("createMockUser", () => {
    test("should create user object with correct structure", () => {
      const email = "test@example.com";
      const user = createMockUser(email);

      expect(user).toEqual({
        id: "1",
        email: email,
        name: "Admin User",
      });
    });
  });

  describe("getCurrentUser", () => {
    test("should return user when valid auth token exists", () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };
      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: JSON.stringify(mockUser) }),
      };

      const result = getCurrentUser(mockCookies);
      expect(result).toEqual(mockUser);
      expect(mockCookies.get).toHaveBeenCalledWith("auth-token");
    });

    test("should return null when no auth token exists", () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue(null),
      };

      const result = getCurrentUser(mockCookies);
      expect(result).toBeNull();
    });

    test("should return null when auth token is invalid JSON", () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: "invalid-json" }),
      };

      const result = getCurrentUser(mockCookies);
      expect(result).toBeNull();
    });
  });

  describe("isAuthenticated", () => {
    test("should return true when user is authenticated", () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };
      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: JSON.stringify(mockUser) }),
      };

      const result = isAuthenticated(mockCookies);
      expect(result).toBe(true);
    });

    test("should return false when user is not authenticated", () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue(null),
      };

      const result = isAuthenticated(mockCookies);
      expect(result).toBe(false);
    });
  });
});
