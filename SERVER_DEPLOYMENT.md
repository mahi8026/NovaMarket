# Nova Marketplace Server Deployment Guide

## Overview

This guide covers deploying the Nova Marketplace backend API to Vercel as a separate project from the frontend.

## Prerequisites

- Vercel account
- GitHub repository with server code
- MongoDB Atlas database
- Stripe account (optional)

## Deployment Steps

### 1. Prepare Server Directory

The server directory contains:

- `server.js` - Main Express application
- `db.js` - MongoDB connection and operations
- `cache.js` - Redis caching (optional)
- `package.json` - Dependencies and scripts
- `vercel.json` - Vercel configuration
- `.env` - Environment variables

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to server directory
cd server

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name: nova-market-api
# - Deploy
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set Root Directory to `server`
5. Configure environment variables (see below)
6. Deploy

### 3. Environment Variables

Set these in Vercel dashboard under Project Settings > Environment Variables:

```
MONGODB_URI=mongodb+srv://nova_db:BsHzwMfAaXdHeRIh@cluster0.ocjxb4e.mongodb.net/nova-marketplace?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
ALLOWED_ORIGINS=https://nova-market-fawn.vercel.app
STRIPE_SECRET_KEY=sk_test_51SXD8l8tn2lLlJnkPr7eXSxqx8LTUeinlq2h3yYm8Fb9wK7NnjM06eyNGPv8s5OvUS0I2KxUddiOKY7hWR4UEDbh00bYnOB8gV
FRONTEND_URL=https://nova-market-fawn.vercel.app
```

### 4. Update Frontend API URLs

After server deployment, update the frontend to use the new API URL:

In `nova-market/src/lib/api.js`:

```javascript
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-api-domain.vercel.app/api"
    : "http://localhost:3001/api";
```

### 5. Test Deployment

1. Visit your deployed API health endpoint: `https://your-api-domain.vercel.app/api/health`
2. Test product endpoints
3. Verify CORS settings work with frontend

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/create-checkout-session` - Create Stripe checkout

## Features

- MongoDB Atlas integration
- Redis caching (optional)
- Rate limiting
- CORS configuration
- Stripe payment processing
- Error handling
- Request logging

## Troubleshooting

### Common Issues

1. **MongoDB Connection**: Ensure IP whitelist includes 0.0.0.0/0 for Vercel
2. **CORS Errors**: Check ALLOWED_ORIGINS includes frontend domain
3. **Environment Variables**: Verify all required vars are set in Vercel
4. **Build Errors**: Check Node.js version compatibility

### Logs

View deployment logs in Vercel dashboard under Functions tab.

## Security Notes

- Environment variables are properly configured
- Rate limiting is enabled
- CORS is restricted to specific origins
- Input validation on all endpoints
- MongoDB connection uses SSL

## Next Steps

1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up CI/CD pipeline
4. Add Redis for production caching
5. Implement API authentication if needed
