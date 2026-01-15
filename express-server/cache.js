/**
 * Redis Cache Module for Nova Marketplace API
 * Provides caching functionality to improve API performance
 * Optional - Falls back gracefully if Redis is not available
 */

const redis = require("redis");

let redisClient = null;
let isRedisConnected = false;

/**
 * Initialize Redis client
 * @returns {Promise<boolean>} True if connected, false otherwise
 */
async function initializeRedis() {
  // Skip if Redis URL is not configured
  if (!process.env.REDIS_URL) {
    console.log("ℹ️  Redis not configured - caching disabled");
    return false;
  }

  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries) => {
          if (retries > 3) {
            console.log("❌ Redis connection failed after 3 retries");
            return new Error("Redis connection failed");
          }
          return Math.min(retries * 100, 3000);
        },
      },
    });

    redisClient.on("error", (err) => {
      console.error("❌ Redis Client Error:", err.message);
      isRedisConnected = false;
    });

    redisClient.on("connect", () => {
      console.log("✅ Redis connected successfully");
      isRedisConnected = true;
    });

    redisClient.on("disconnect", () => {
      console.log("⚠️  Redis disconnected");
      isRedisConnected = false;
    });

    await redisClient.connect();
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Redis:", error.message);
    console.log("ℹ️  Continuing without cache");
    redisClient = null;
    isRedisConnected = false;
    return false;
  }
}

/**
 * Get cached data
 * @param {string} key - Cache key
 * @returns {Promise<any|null>} Cached data or null
 */
async function getCache(key) {
  if (!isRedisConnected || !redisClient) {
    return null;
  }

  try {
    const data = await redisClient.get(key);
    if (data) {
      console.log(`✅ Cache hit: ${key}`);
      return JSON.parse(data);
    }
    console.log(`❌ Cache miss: ${key}`);
    return null;
  } catch (error) {
    console.error(`❌ Cache get error for ${key}:`, error.message);
    return null;
  }
}

/**
 * Set cached data
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in seconds (default: 300 = 5 minutes)
 * @returns {Promise<boolean>} True if successful
 */
async function setCache(key, data, ttl = 300) {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
    console.log(`✅ Cache set: ${key} (TTL: ${ttl}s)`);
    return true;
  } catch (error) {
    console.error(`❌ Cache set error for ${key}:`, error.message);
    return false;
  }
}

/**
 * Delete cached data
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} True if successful
 */
async function deleteCache(key) {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    await redisClient.del(key);
    console.log(`✅ Cache deleted: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Cache delete error for ${key}:`, error.message);
    return false;
  }
}

/**
 * Delete all cached data matching a pattern
 * @param {string} pattern - Pattern to match (e.g., "products:*")
 * @returns {Promise<boolean>} True if successful
 */
async function deleteCachePattern(pattern) {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`✅ Cache deleted: ${keys.length} keys matching ${pattern}`);
    }
    return true;
  } catch (error) {
    console.error(
      `❌ Cache delete pattern error for ${pattern}:`,
      error.message
    );
    return false;
  }
}

/**
 * Clear all cached data
 * @returns {Promise<boolean>} True if successful
 */
async function clearCache() {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    await redisClient.flushAll();
    console.log("✅ All cache cleared");
    return true;
  } catch (error) {
    console.error("❌ Cache clear error:", error.message);
    return false;
  }
}

/**
 * Close Redis connection
 */
async function closeRedis() {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log("✅ Redis connection closed");
    } catch (error) {
      console.error("❌ Error closing Redis:", error.message);
    }
  }
}

/**
 * Check if Redis is connected
 * @returns {boolean} True if connected
 */
function isConnected() {
  return isRedisConnected;
}

module.exports = {
  initializeRedis,
  getCache,
  setCache,
  deleteCache,
  deleteCachePattern,
  clearCache,
  closeRedis,
  isConnected,
};
