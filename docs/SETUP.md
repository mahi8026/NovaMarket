# 📋 Nova Marketplace - Complete Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- MongoDB Atlas account (free tier available)
- imgbb.com API key (optional, for image uploads)
- Google Cloud Console account (optional, for Google OAuth)

## Step 1: MongoDB Atlas Setup

### Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new project (e.g., "Nova Marketplace")

### Create Database Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"

### Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

### Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `nova-marketplace`

Example:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nova-marketplace?retryWrites=true&w=majority
```

## Step 2: Backend Setup

### Install Dependencies

```bash
cd express-server
npm install
```

### Configure Environment Variables

Create `express-server/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nova-marketplace?retryWrites=true&w=majority

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Test Backend

```bash
npm start
```

You should see:

```
✅ MongoDB connected successfully
✅ Database initialized with 6 sample products
🚀 Server running on port 3001
```

Visit http://localhost:3001/api/health to verify.

## Step 3: Frontend Setup

### Install Dependencies

```bash
cd nova-market
npm install
```

### Configure Environment Variables

Create `nova-market/.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Image Upload (Optional)
NEXT_PUBLIC_IMAGE_HOST_KEY=your_imgbb_api_key

# Google OAuth (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Generate NextAuth Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use any random string generator
```

### Test Frontend

```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## Step 4: Image Upload Setup (Optional)

### Get imgbb API Key

1. Go to [imgbb.com](https://imgbb.com/)
2. Sign up for a free account
3. Go to [API page](https://api.imgbb.com/)
4. Copy your API key
5. Add to `nova-market/.env.local`:
   ```env
   NEXT_PUBLIC_IMAGE_HOST_KEY=your_api_key_here
   ```

## Step 5: Google OAuth Setup (Optional)

### Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"

### Create OAuth Credentials

1. Go to "Credentials" in left sidebar
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Copy Client ID and Client Secret
6. Add to `nova-market/.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

## Step 6: Verify Installation

### Test Backend

```bash
# In express-server directory
npm start
```

Check:

- ✅ Server starts without errors
- ✅ MongoDB connection successful
- ✅ Sample data initialized
- ✅ http://localhost:3001/api/health returns OK

### Test Frontend

```bash
# In nova-market directory
npm run dev
```

Check:

- ✅ Server starts without errors
- ✅ http://localhost:3000 loads
- ✅ Products page shows items
- ✅ Can view product details

### Test Authentication

1. Go to http://localhost:3000/login
2. Use demo credentials:
   - Email: `admin@novamarket.com`
   - Password: `admin123`
3. Verify successful login
4. Verify "Add Item" link appears in navbar

### Test Product Creation

1. Login (if not already)
2. Click "Add Item" in navbar
3. Fill in product details
4. Submit form
5. Verify product appears in product list
6. Check MongoDB Atlas to see new product in database

## Step 7: Run Tests

```bash
cd nova-market
npm test
```

All tests should pass.

## Quick Start Scripts (Windows)

Use the provided batch files:

```bash
# Start backend
START_BACKEND.bat

# Start frontend (in new terminal)
START_FRONTEND.bat

# Clear cache and restart frontend
CLEAR_CACHE_AND_RESTART.bat
```

## Environment Variables Reference

### Backend (.env)

| Variable        | Required | Description                          |
| --------------- | -------- | ------------------------------------ |
| MONGODB_URI     | Yes      | MongoDB Atlas connection string      |
| PORT            | No       | Server port (default: 3001)          |
| NODE_ENV        | No       | Environment (development/production) |
| ALLOWED_ORIGINS | No       | CORS allowed origins                 |

### Frontend (.env.local)

| Variable                     | Required | Description            |
| ---------------------------- | -------- | ---------------------- |
| NEXTAUTH_SECRET              | Yes      | Secret for NextAuth.js |
| NEXTAUTH_URL                 | Yes      | Application URL        |
| NEXT_PUBLIC_API_URL          | Yes      | Backend API URL        |
| NEXT_PUBLIC_IMAGE_HOST_KEY   | No       | imgbb API key          |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | No       | Google OAuth client ID |
| GOOGLE_CLIENT_SECRET         | No       | Google OAuth secret    |

## Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

## Next Steps

- Customize the design and branding
- Add more features (cart, checkout, etc.)
- Deploy to production
- Set up CI/CD pipeline

---

**Setup complete! 🎉**
