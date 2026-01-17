# Nova Marketplace - Complete Deployment Guide

## Architecture Overview

Nova Marketplace uses a modern full-stack architecture with separate frontend and backend deployments:

- **Frontend**: Next.js 16 with App Router (deployed to Vercel)
- **Backend API**: Express.js server (deployed separately to Vercel)
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Image Upload**: imgbb.com
- **Deployment**: Vercel (both frontend and backend as separate projects)

## Deployment Strategy

This project requires **two separate deployments**:

1. **Frontend Deployment**: Next.js application (`nova-market` directory)
2. **Backend Deployment**: Express.js API server (`server` directory)

Both are deployed to Vercel but as separate projects for better scalability and maintenance.

---

## Part 1: Backend API Deployment

### Prerequisites

- Vercel account
- MongoDB Atlas database
- Stripe account (optional)

### Step 1: Deploy Backend Server

#### Option A: Using Deployment Script (Recommended)

```bash
# Run the deployment script
deploy-server.bat
```

#### Option B: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to server directory
cd server

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name: nova-market-api
# - Deploy
```

### Step 2: Configure Backend Environment Variables

In Vercel Dashboard for your API project, add these environment variables:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://nova_db:BsHzwMfAaXdHeRIh@cluster0.ocjxb4e.mongodb.net/nova-marketplace?retryWrites=true&w=majority&appName=Cluster0

# Server Configuration
NODE_ENV=production
PORT=3001

# CORS Configuration (update with your frontend URL)
ALLOWED_ORIGINS=https://nova-market-fawn.vercel.app

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51SXD8l8tn2lLlJnkPr7eXSxqx8LTUeinlq2h3yYm8Fb9wK7NnjM06eyNGPv8s5OvUS0I2KxUddiOKY7hWR4UEDbh00bYnOB8gV

# Frontend URL (update with your frontend URL)
FRONTEND_URL=https://nova-market-fawn.vercel.app
```

### Step 3: Test Backend Deployment

Visit your deployed API health endpoint:

```
https://your-api-domain.vercel.app/api/health
```

---

## Part 2: Frontend Deployment

### Prerequisites

- Backend API already deployed
- Google OAuth credentials (optional)
- imgbb API key

### Step 1: Update Frontend Configuration

Update the API URL in `nova-market/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app/api
```

### Step 2: Deploy Frontend

#### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `nova-market`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (default)

#### Option B: Vercel CLI

```bash
# Navigate to frontend directory
cd nova-market

# Deploy
vercel --prod
```

### Step 3: Configure Frontend Environment Variables

In Vercel Dashboard for your frontend project, add these environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app/api

# NextAuth Configuration
NEXTAUTH_SECRET=your-production-secret-key-here-make-it-long-and-random
NEXTAUTH_URL=https://your-frontend-domain.vercel.app

# Image Hosting
NEXT_PUBLIC_IMAGE_HOST_KEY=5fbe3b269af220ef9639c781bec38e5b

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## Part 3: Post-Deployment Configuration

### Update CORS Settings

After frontend deployment, update the backend CORS settings:

1. Go to your API project in Vercel Dashboard
2. Update `ALLOWED_ORIGINS` environment variable:
   ```
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:3000
   ```

### Update Google OAuth (if using)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client ID
3. Add your frontend URL to "Authorized redirect URIs":
   ```
   https://your-frontend-domain.vercel.app/api/auth/callback/google
   ```

### Update Stripe Configuration

1. Update webhook endpoints in Stripe Dashboard
2. Ensure success/cancel URLs point to your frontend domain

---

## Testing the Complete Deployment

### Backend API Tests

```bash
# Health check
curl https://your-api-domain.vercel.app/api/health

# Get products
curl https://your-api-domain.vercel.app/api/products

# Create product (requires authentication)
curl -X POST https://your-api-domain.vercel.app/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"Test","price":99.99,"image":"https://example.com/image.jpg"}'
```

### Frontend Tests

1. Visit your frontend URL
2. Test product listing: `/items`
3. Test authentication: `/login`
4. Test product creation: `/items/add`
5. Test checkout flow

---

## API Endpoints

Your deployed backend provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/create-checkout-session` - Create Stripe checkout

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `ALLOWED_ORIGINS` includes your frontend domain
   - Ensure no trailing slashes in URLs

2. **API Connection Errors**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check backend deployment is successful

3. **Database Connection**
   - Ensure MongoDB Atlas allows connections from 0.0.0.0/0
   - Verify `MONGODB_URI` is correct

4. **Authentication Issues**
   - Check `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches your domain

### Debugging Steps

1. Check Vercel function logs in dashboard
2. Test API endpoints individually
3. Verify environment variables are set
4. Check MongoDB Atlas connection logs

---

## Production Considerations

### Security

- Use strong `NEXTAUTH_SECRET`
- Enable MongoDB Atlas IP restrictions for production
- Use production Stripe keys
- Secure environment variables

### Performance

- Enable Vercel Analytics
- Monitor API response times
- Consider implementing Redis caching
- Optimize database queries

### Monitoring

- Set up error tracking (Sentry)
- Monitor database performance
- Set up uptime monitoring
- Configure alerts

---

## Custom Domains (Optional)

### For Frontend

1. Go to Vercel Dashboard > Frontend Project > Settings > Domains
2. Add your custom domain
3. Configure DNS records
4. Update `NEXTAUTH_URL` to use custom domain

### For Backend

1. Go to Vercel Dashboard > API Project > Settings > Domains
2. Add your API subdomain (e.g., api.yourdomain.com)
3. Update `NEXT_PUBLIC_API_URL` in frontend
4. Update `ALLOWED_ORIGINS` in backend

---

## Deployment Checklist

### Backend Deployment ✅

- [ ] Server files copied to `server` directory
- [ ] `vercel.json` configured
- [ ] Environment variables set
- [ ] Deployed to Vercel
- [ ] Health endpoint working
- [ ] Database connection verified

### Frontend Deployment ✅

- [ ] API URL updated
- [ ] Environment variables configured
- [ ] Deployed to Vercel
- [ ] Authentication working
- [ ] API integration working
- [ ] Payment flow tested

### Post-Deployment ✅

- [ ] CORS settings updated
- [ ] Google OAuth configured
- [ ] Stripe webhooks updated
- [ ] All features tested
- [ ] Performance optimized
- [ ] Monitoring set up

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables
3. Test API endpoints individually
4. Review MongoDB Atlas connection
5. Check CORS configuration

For additional help, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
