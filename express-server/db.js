const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

let client;
let db;

/**
 * Connect to MongoDB Atlas
 */
async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (
      !uri ||
      uri.includes("your-username") ||
      uri.includes("your-password")
    ) {
      throw new Error(
        "MongoDB URI not configured. Please update the MONGODB_URI in .env file with your MongoDB Atlas connection string."
      );
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB Atlas!");

    db = client.db("nova-marketplace");

    // Create indexes for better performance
    await createIndexes();

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
}

/**
 * Create database indexes
 */
async function createIndexes() {
  try {
    const productsCollection = db.collection("products");

    // Create index on createdAt for sorting
    await productsCollection.createIndex({ createdAt: -1 });

    // Create text index for search functionality (future enhancement)
    await productsCollection.createIndex({
      name: "text",
      description: "text",
    });

    console.log("✅ Database indexes created");
  } catch (error) {
    console.error("⚠️  Warning: Could not create indexes:", error.message);
  }
}

/**
 * Get database instance
 */
function getDatabase() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}

/**
 * Close database connection
 */
async function closeDatabase() {
  if (client) {
    await client.close();
    console.log("✅ MongoDB connection closed");
    db = null;
    client = null;
  }
}

/**
 * Initialize database with sample data if empty
 */
async function initializeSampleData() {
  try {
    const productsCollection = db.collection("products");
    const count = await productsCollection.countDocuments();

    if (count === 0) {
      console.log("📦 Initializing database with sample products...");

      const sampleProducts = [
        {
          name: "Wireless Headphones",
          description:
            "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
          createdAt: new Date("2024-01-15"),
        },
        {
          name: "Smart Watch",
          description:
            "Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.",
          price: 299.99,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
          createdAt: new Date("2024-01-16"),
        },
        {
          name: "Laptop Stand",
          description:
            "Ergonomic aluminum laptop stand with adjustable height and angle.",
          price: 49.99,
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
          createdAt: new Date("2024-01-17"),
        },
        {
          name: "Mechanical Keyboard",
          description:
            "RGB mechanical keyboard with customizable keys and tactile switches.",
          price: 129.99,
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
          createdAt: new Date("2024-01-18"),
        },
        {
          name: "Wireless Mouse",
          description:
            "Precision wireless mouse with ergonomic design and long battery life.",
          price: 39.99,
          image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
          createdAt: new Date("2024-01-19"),
        },
        {
          name: "USB-C Hub",
          description:
            "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
          price: 59.99,
          image:
            "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
          createdAt: new Date("2024-01-20"),
        },
      ];

      await productsCollection.insertMany(sampleProducts);
      console.log(`✅ Inserted ${sampleProducts.length} sample products`);
    } else {
      console.log(`✅ Database already contains ${count} products`);
    }
  } catch (error) {
    console.error(
      "⚠️  Warning: Could not initialize sample data:",
      error.message
    );
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  closeDatabase,
  initializeSampleData,
};
