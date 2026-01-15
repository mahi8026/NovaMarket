/**
 * Authentication utilities for Nova Marketplace
 * Handles both mock authentication and NextAuth.js integration
 */

/**
 * Mock credentials for development
 */
export const MOCK_CREDENTIALS = {
  email: "admin@novamarket.com",
  password: "admin123",
};

/**
 * Validates mock credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {boolean} True if credentials are valid
 */
export function validateMockCredentials(email, password) {
  return (
    email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password
  );
}

/**
 * Creates a mock user object
 * @param {string} email - User email
 * @returns {object} Mock user object
 */
export function createMockUser(email) {
  return {
    id: "1",
    email,
    name: "Admin User",
  };
}

/**
 * Gets the current user from cookies (server-side)
 * @param {object} cookies - Next.js cookies object
 * @returns {object|null} User object or null if not authenticated
 */
export function getCurrentUser(cookies) {
  try {
    const authToken = cookies.get("auth-token");
    if (!authToken) return null;

    return JSON.parse(authToken.value);
  } catch (error) {
    return null;
  }
}

/**
 * Checks if user is authenticated (server-side)
 * @param {object} cookies - Next.js cookies object
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated(cookies) {
  return getCurrentUser(cookies) !== null;
}
