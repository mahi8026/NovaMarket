# 🔌 API Documentation

Base URL: `http://localhost:3001/api`

## Authentication

Most endpoints require authentication. Include the session cookie in requests.

## Endpoints

### Health Check

#### GET /health

Check server and database status.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected"
}
```

---

### Products

#### GET /products

Get all products.

**Query Parameters:**

- None

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling headphones",
    "price": 299.99,
    "image": "https://example.com/image.jpg",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

**Status Codes:**

- `200` - Success
- `500` - Server error

---

#### GET /products/:id

Get a single product by ID.

**Parameters:**

- `id` (string) - Product ID

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "price": 299.99,
  "image": "https://example.com/image.jpg",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

**Status Codes:**

- `200` - Success
- `404` - Product not found
- `500` - Server error

---

#### POST /products

Create a new product.

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "price": 299.99,
  "image": "https://example.com/image.jpg"
}
```

**Validation:**

- `name` - Required, string, 1-200 characters
- `description` - Required, string, 1-2000 characters
- `price` - Required, number, > 0
- `image` - Required, string, valid URL

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones",
  "price": 299.99,
  "image": "https://example.com/image.jpg",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

**Status Codes:**

- `201` - Created successfully
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

#### PUT /products/:id

Update an existing product.

**Authentication:** Required

**Parameters:**

- `id` (string) - Product ID

**Request Body:**

```json
{
  "name": "Updated Wireless Headphones",
  "description": "Updated description",
  "price": 349.99,
  "image": "https://example.com/new-image.jpg"
}
```

**Validation:**

- Same as POST /products
- All fields optional (only update provided fields)

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Updated Wireless Headphones",
  "description": "Updated description",
  "price": 349.99,
  "image": "https://example.com/new-image.jpg",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

**Status Codes:**

- `200` - Updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `404` - Product not found
- `500` - Server error

---

#### DELETE /products/:id

Delete a product.

**Authentication:** Required

**Parameters:**

- `id` (string) - Product ID

**Response:**

```json
{
  "message": "Product deleted successfully"
}
```

**Status Codes:**

- `200` - Deleted successfully
- `401` - Unauthorized
- `404` - Product not found
- `500` - Server error

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

### Common Error Codes

- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Rate Limiting

Currently no rate limiting is implemented. This will be added in a future update.

**Planned limits:**

- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## CORS

The API allows requests from:

- `http://localhost:3000` (frontend)
- `http://localhost:3001` (API itself)

Configure additional origins in `express-server/.env`:

```env
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

## Sample Data

The backend automatically initializes with 6 sample products:

1. Wireless Headphones - $299.99
2. Smart Watch - $399.99
3. Laptop Stand - $79.99
4. Mechanical Keyboard - $149.99
5. USB-C Hub - $49.99
6. Desk Lamp - $89.99

---

## Testing the API

### Using cURL

```bash
# Get all products
curl http://localhost:3001/api/products

# Get single product
curl http://localhost:3001/api/products/PRODUCT_ID

# Create product (requires auth)
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "image": "https://via.placeholder.com/300"
  }'

# Update product (requires auth)
curl -X PUT http://localhost:3001/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "price": 149.99
  }'

# Delete product (requires auth)
curl -X DELETE http://localhost:3001/api/products/PRODUCT_ID
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:3001/api`
3. For authenticated requests, include session cookie
4. Test each endpoint with sample data

---

## Database Schema

### Products Collection

```javascript
{
  _id: ObjectId,           // MongoDB generated ID
  name: String,            // Product name (required)
  description: String,     // Product description (required)
  price: Number,           // Product price (required, > 0)
  image: String,           // Image URL (required)
  createdAt: Date         // Creation timestamp (auto-generated)
}
```

### Indexes

- `_id` - Primary key (automatic)
- `createdAt` - For sorting by date
- `name` - For text search (coming soon)

---

## Future Endpoints

### Users

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user
- `PUT /users/:id` - Update user profile

### Orders

- `GET /orders` - Get user orders
- `GET /orders/:id` - Get single order
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order status

### Cart

- `GET /cart` - Get user cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove from cart

### Categories

- `GET /categories` - Get all categories
- `GET /categories/:id/products` - Get products by category

### Reviews

- `GET /products/:id/reviews` - Get product reviews
- `POST /products/:id/reviews` - Add review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

---

**API Version:** 1.0.0  
**Last Updated:** January 15, 2026
