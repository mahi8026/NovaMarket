require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const { ObjectId } = require("mongodb");
const {
  connectToDatabase,
  getDatabase,
  closeDatabase,
  initializeSampleData,
} = require("./db");
const {
  initializeRedis,
  getCache,
  setCache,
  deleteCache,
  deleteCachePattern,
  closeRedis,
  isConnected: isRedisConnected,
} = require("./cache");

// Initialize Stripe only if API key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  console.log("✅ Stripe initialized");
} else {
  console.log("⚠️  Stripe not configured - payment features disabled");
}

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests",
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter rate limit for write operations
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 write requests per windowMs
  message: {
    error: "Too many requests",
    message: "Too many write requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    credentials: true,
  })
);
app.use(bodyParser.json());

// Apply rate limiting to all API routes
app.use("/api/", apiLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes

/**
 * Get all products
 */
app.get("/api/products", async (req, res) => {
  try {
    // Try to get from cache first
    const cacheKey = "products:all";
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      console.log("✅ Returning cached products");
      return res.json(cachedData);
    }

    // If not in cache, fetch from database
    const db = getDatabase();
    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert _id to id for frontend compatibility
    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: undefined,
    }));

    // Cache the results for 5 minutes
    await setCache(cacheKey, formattedProducts, 300);

    console.log(
      `✅ Fetched ${formattedProducts.length} products from database`
    );
    res.json(formattedProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch products",
    });
  }
});

/**
 * Get single product by ID
 */
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ID",
        message: "Product ID format is invalid",
      });
    }

    // Try to get from cache first
    const cacheKey = `product:${id}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      console.log(`✅ Returning cached product: ${id}`);
      return res.json(cachedData);
    }

    // If not in cache, fetch from database
    const db = getDatabase();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
        message: `Product with ID ${id} does not exist`,
      });
    }

    // Convert _id to id for frontend compatibility
    const formattedProduct = {
      ...product,
      id: product._id.toString(),
      _id: undefined,
    };

    // Cache the result for 10 minutes
    await setCache(cacheKey, formattedProduct, 600);

    console.log(`✅ Fetched product from database: ${formattedProduct.name}`);
    res.json(formattedProduct);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch product",
    });
  }
});

/**
 * Create new product
 */
app.post("/api/products", writeLimiter, async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Validation
    if (!name || !description || !price || !image) {
      return res.status(400).json({
        error: "Validation error",
        message: "All fields (name, description, price, image) are required",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        error: "Validation error",
        message: "Price must be a positive number",
      });
    }

    // Create new product
    const newProduct = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image.trim(),
      createdAt: new Date(),
    };

    const db = getDatabase();
    const result = await db.collection("products").insertOne(newProduct);

    // Return the created product
    const createdProduct = {
      ...newProduct,
      id: result.insertedId.toString(),
      _id: undefined,
    };

    // Invalidate product list cache
    await deleteCachePattern("products:*");

    console.log(`✅ Created product: ${createdProduct.name}`);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create product",
    });
  }
});

/**
 * Update product
 */
app.put("/api/products/:id", writeLimiter, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ID",
        message: "Product ID format is invalid",
      });
    }

    // Build update object
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();
    if (price !== undefined) {
      if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({
          error: "Validation error",
          message: "Price must be a positive number",
        });
      }
      updateData.price = parseFloat(price);
    }
    if (image) updateData.image = image.trim();
    updateData.updatedAt = new Date();

    const db = getDatabase();
    const result = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    if (!result) {
      return res.status(404).json({
        error: "Product not found",
        message: `Product with ID ${id} does not exist`,
      });
    }

    // Convert _id to id for frontend compatibility
    const updatedProduct = {
      ...result,
      id: result._id.toString(),
      _id: undefined,
    };

    // Invalidate caches
    await deleteCache(`product:${id}`);
    await deleteCachePattern("products:*");

    console.log(`✅ Updated product: ${updatedProduct.name}`);
    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to update product",
    });
  }
});

/**
 * Delete product
 */
app.delete("/api/products/:id", writeLimiter, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ID",
        message: "Product ID format is invalid",
      });
    }

    const db = getDatabase();
    const result = await db
      .collection("products")
      .findOneAndDelete({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({
        error: "Product not found",
        message: `Product with ID ${id} does not exist`,
      });
    }

    // Convert _id to id for frontend compatibility
    const deletedProduct = {
      ...result,
      id: result._id.toString(),
      _id: undefined,
    };

    // Invalidate caches
    await deleteCache(`product:${id}`);
    await deleteCachePattern("products:*");

    console.log(`✅ Deleted product: ${deletedProduct.name}`);
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to delete product",
    });
  }
});

/**
 * Health check
 */
app.get("/api/health", async (req, res) => {
  try {
    const db = getDatabase();
    const productsCount = await db.collection("products").countDocuments();

    res.json({
      status: "ok",
      message: "Nova Marketplace API is running",
      database: "connected",
      cache: isRedisConnected() ? "connected" : "disabled",
      timestamp: new Date().toISOString(),
      productsCount,
    });
  } catch (_error) {
    res.status(503).json({
      status: "error",
      message: "Database connection issue",
      cache: isRedisConnected() ? "connected" : "disabled",
      timestamp: new Date().toISOString(),
    });
  }
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Stripe Checkout Session
app.post("/api/create-checkout-session", writeLimiter, async (req, res) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({
        error: "Payment service unavailable",
        message:
          "Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env file.",
      });
    }

    const { items, shippingInfo, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in cart" });
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    // Add shipping as a line item if applicable
    if (shippingInfo.shippingMethod === "priority") {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Priority Shipping",
            description: "Delivered within 24-48 hours",
          },
          unit_amount: 1500, // $15.00
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/checkout/cancel`,
      customer_email: shippingInfo.email,
      metadata: {
        shippingName: shippingInfo.fullName,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingPostalCode: shippingInfo.postalCode,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({
      error: "Payment processing failed",
      message: err.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

/**
 * Start server
 */
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Initialize sample data if needed
    await initializeSampleData();

    // Initialize Redis (optional - will continue without it)
    await initializeRedis();

    // Start Express server
    app.listen(PORT, () => {
      console.log("=".repeat(60));
      console.log("🚀 Nova Marketplace API Server");
      console.log("=".repeat(60));
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ API endpoints available at http://localhost:${PORT}/api`);
      console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
      console.log("✅ Database: MongoDB Atlas (Connected)");
      console.log(
        `${isRedisConnected() ? "✅" : "ℹ️ "} Cache: Redis ${
          isRedisConnected() ? "(Connected)" : "(Disabled)"
        }`
      );
      console.log("✅ Rate Limiting: Enabled (100 req/15min, 20 writes/15min)");
      console.log("=".repeat(60));
      console.log("Available endpoints:");
      console.log("  GET    /api/products      - Get all products");
      console.log("  GET    /api/products/:id  - Get single product");
      console.log("  POST   /api/products      - Create product");
      console.log("  PUT    /api/products/:id  - Update product");
      console.log("  DELETE /api/products/:id  - Delete product");
      console.log("  GET    /api/health        - Health check");
      console.log("=".repeat(60));
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    console.error("\n📝 Please check:");
    console.error(
      "   1. MongoDB Atlas connection string is correct in .env file"
    );
    console.error("   2. Your IP address is whitelisted in MongoDB Atlas");
    console.error("   3. Database user has proper permissions");
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n⚠️  Shutting down gracefully...");
  await closeRedis();
  await closeDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️  Shutting down gracefully...");
  await closeRedis();
  await closeDatabase();
  process.exit(0);
});

// Start the server
startServer();
