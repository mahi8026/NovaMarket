# Quick Deployment Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Deploy Backend API

```bash
# Run the deployment script
deploy-server.bat

# Or manually:
cd server
vercel
```

**Set these environment variables in Vercel Dashboard:**

```
MONGODB_URI=mongodb+srv://nova_db:BsHzwMfAaXdHeRIh@cluster0.ocjxb4e.mongodb.net/nova-marketplace?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
ALLOWED_ORIGINS=https://nova-market-fawn.vercel.app
STRIPE_SECRET_KEY=sk_test_51SXD8l8tn2lLlJnkPr7eXSxqx8LTUeinlq2h3yYm8Fb9wK7NnjM06eyNGPv8s5OvUS0I2KxUddiOKY7hWR4UEDbh00bYnOB8gV
FRONTEND_URL=https://nova-market-fawn.vercel.app
```

### Step 2: Deploy Frontend

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set Root Directory: `nova-market`
4. Add environment variables:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app/api
NEXTAUTH_SECRET=your-long-random-secret-key
NEXTAUTH_URL=https://your-frontend-domain.vercel.app
NEXT_PUBLIC_IMAGE_HOST_KEY=5fbe3b269af220ef9639c781bec38e5b
```

### Step 3: Update CORS

Update backend `ALLOWED_ORIGINS` with your actual frontend URL.

### Step 4: Test

- Backend: `https://your-api-domain.vercel.app/api/health`
- Frontend: `https://your-frontend-domain.vercel.app`

## 📋 Deployment URLs

- **Frontend**: https://nova-market-fawn.vercel.app
- **Backend**: https://your-api-domain.vercel.app

## 🔧 Current Status

✅ Frontend deployed successfully  
⏳ Backend deployment in progress  
⏳ Environment variables configuration needed  
⏳ CORS configuration update needed

## 📚 Full Documentation

See `DEPLOYMENT_GUIDE.md` for complete instructions.
