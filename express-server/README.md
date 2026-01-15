# Nova Marketplace API Server

Express.js backend server for the Nova Marketplace application with MongoDB Atlas integration.

## Features

- RESTful API for product management
- MongoDB Atlas for persistent data storage
- CORS enabled for frontend integration
- Automatic sample data initialization
- Database indexing for performance
- Graceful shutdown handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)

## MongoDB Atlas Setup

### 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free M0 tier is sufficient)

### 2. Configure Database Access

1. In MongoDB Atlas, go to **Database Access**
2. Click **Add New Database User**
3. Create a user with username and password
4. Set permissions to **Read and write to any database**

### 3. Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Either:
   - Click **Allow Access from Anywhere** (0.0.0.0/0) for development
   - Or add your specific IP address

### 4. Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy the connection string
4. It will look like: `mongodb+srv://username:password@cluster.mongodb.net/`

## Installation

```bash
cd express-server
npm install
```

## Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and update the MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/nova-marketplace?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**Important**: Replace:

- `your-username` with your MongoDB Atlas username
- `your-password` with your MongoDB Atlas password
- `your-cluster` with your cluster name

## Running the Server

```bash
npm start
```

The server will:

1. Connect to MongoDB Atlas
2. Create necessary indexes
3. Initialize with 6 sample products (if database is empty)
4. Start listening on port 3001

## API Endpoints

### Products

#### Get All Products

```
GET /api/products
```

Returns array of all products, sorted by creation date (newest first).

#### Get Single Product

```
GET /api/products/:id
```

Returns a single product by ID.

#### Create Product

```
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg"
}
```

#### Update Product

```
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "price": 149.99,
  "image": "https://example.com/new-image.jpg"
}
```

#### Delete Product

```
DELETE /api/products/:id
```

### Health Check

```
GET /api/health
```

Returns server status and database connection info.

## Sample Products

The server automatically initializes with 6 sample products if the database is empty:

1. Wireless Headphones - $149.99
2. Smart Watch - $299.99
3. Laptop Stand - $49.99
4. Mechanical Keyboard - $129.99
5. Wireless Mouse - $39.99
6. USB-C Hub - $59.99

## Database Schema

### Products Collection

```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  name: String,            // Product name (required)
  description: String,     // Product description (required)
  price: Number,           // Product price (required, positive)
  image: String,           // Image URL (required)
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp (optional)
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (database issue)

## Troubleshooting

### Connection Issues

If you see "MongoDB connection error":

1. **Check connection string**: Ensure username, password, and cluster name are correct
2. **IP Whitelist**: Verify your IP is whitelisted in MongoDB Atlas Network Access
3. **User permissions**: Ensure database user has read/write permissions
4. **Network**: Check your internet connection

### Common Errors

**"MONGODB_URI not configured"**

- Update the `.env` file with your actual MongoDB Atlas connection string

**"Authentication failed"**

- Double-check username and password in connection string
- Ensure special characters in password are URL-encoded

**"Network timeout"**

- Check if your IP address is whitelisted in MongoDB Atlas
- Verify firewall settings

## Development

### Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string (required)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)

### Database Indexes

The server automatically creates indexes for:

- `createdAt` (descending) - For sorting products
- `name` and `description` (text) - For future search functionality

## Production Deployment

For production:

1. Set `NODE_ENV=production` in environment variables
2. Use a strong MongoDB password
3. Restrict IP whitelist to your server's IP
4. Set specific `ALLOWED_ORIGINS` instead of wildcard
5. Enable MongoDB Atlas backup
6. Monitor database usage in Atlas dashboard

## Notes

- Data persists across server restarts
- All product IDs are MongoDB ObjectIds
- Images use Unsplash URLs for demo purposes
- The API converts MongoDB `_id` to `id` for frontend compatibility
