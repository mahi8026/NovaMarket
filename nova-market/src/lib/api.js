/**
 * API client for Nova Marketplace
 * Handles communication with the Express.js backend
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Sleep utility for retry delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry logic with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Result of the function
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx) except 408 (timeout) and 429 (rate limit)
      if (
        error.status >= 400 &&
        error.status < 500 &&
        error.status !== 408 &&
        error.status !== 429
      ) {
        throw error;
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Calculate exponential backoff delay: baseDelay * 2^attempt
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(
        `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms delay`
      );
      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Base API client with error handling and retry logic
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} API response
 */
async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const fetchWithRetry = () =>
    retryWithBackoff(async () => {
      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          const error = new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
          error.status = response.status;
          error.statusText = response.statusText;

          // Try to parse error response body
          try {
            const errorData = await response.json();
            error.message = errorData.message || error.message;
            error.details = errorData;
          } catch {
            // If response body is not JSON, use status text
          }

          throw error;
        }

        return await response.json();
      } catch (error) {
        // Network errors or fetch failures
        if (!error.status) {
          const networkError = new Error(
            "Network error: Unable to connect to the server. Please check your connection."
          );
          networkError.isNetworkError = true;
          throw networkError;
        }
        throw error;
      }
    });

  try {
    return await fetchWithRetry();
  } catch (error) {
    console.error("API Client Error:", error);

    // Enhance error message based on error type
    if (error.isNetworkError) {
      error.userMessage =
        "Unable to connect to the server. Please check your internet connection and try again.";
    } else if (error.status === 404) {
      error.userMessage = "The requested resource was not found.";
    } else if (error.status === 500) {
      error.userMessage =
        "Server error occurred. Please try again later or contact support.";
    } else if (error.status === 429) {
      error.userMessage =
        "Too many requests. Please wait a moment and try again.";
    } else {
      error.userMessage =
        error.message || "An unexpected error occurred. Please try again.";
    }

    throw error;
  }
}

/**
 * Product API functions
 */
export const productApi = {
  /**
   * Get all products
   * @returns {Promise<Product[]>} Array of products
   */
  async getProducts() {
    return apiClient("/products");
  },

  /**
   * Get a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Product>} Product object
   */
  async getProduct(id) {
    return apiClient(`/products/${id}`);
  },

  /**
   * Create a new product
   * @param {object} productData - Product data
   * @returns {Promise<Product>} Created product
   */
  async createProduct(productData) {
    return apiClient("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },
};

export { apiClient };
