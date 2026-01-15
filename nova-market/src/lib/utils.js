/**
 * Utility functions for the Nova Marketplace application
 */

/**
 * Combines class names conditionally
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats price for display
 * @param {number} price - Price in cents or dollars
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
