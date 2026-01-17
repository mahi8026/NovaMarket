# Deployment Fix Guide

## Issue Identified

The "Route GET / not found" error in Vercel is caused by incorrect routing configuration for a Next.js app in a subdirectory.

## Root Cause

- The project structure has the Next.js app in `nova-market/` subdirectory
- Vercel was not properly configured to handle this structure
- The routing was not pointing to the correct entry point

## Fixes Applied

### 1. Updated Root vercel.json

```json
{
  "version": 2,
  "name": "nova-market",
  "builds": [
    {
      "src": "nova-market/next.config.mjs",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/nova-market/$1"
    }
  ]
}
```

### 2. Created nova-market/vercel.json

```json
{
  "version": 2,
  "name": "nova-market",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### 3. Updated Deployment Script

The `fix-deployment.bat` script now:

- Cleans build cache
- Reinstalls dependencies
- Tests the build locally
- Provides clear next steps

## Deployment Steps

### Option 1: Use the Fix Script (Recommended)

```bash
fix-deployment.bat
```

### Option 2: Manual Steps

1. **Clean and rebuild:**

   ```bash
   cd nova-market
   rmdir /s /q node_modules .next
   npm install
   npm run build
   ```

2. **Commit changes:**

   ```bash
   git add .
   git commit -m "Fix deployment routing issues"
   git push
   ```

3. **Update Vercel settings:**
   - Go to Vercel Dashboard
   - Project Settings > General
   - Set **Root Directory** to: `nova-market`
   - Framework should auto-detect as **Next.js**
   - Redeploy

## Vercel Dashboard Configuration

### Required Settings:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `nova-market`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Environment Variables:

Ensure these are set in Vercel Dashboard:

```
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-api-domain.vercel.app/api
NEXT_PUBLIC_IMAGE_HOST_KEY=5fbe3b269af220ef9639c781bec38e5b
```

## Testing the Fix

### 1. Local Testing

```bash
cd nova-market
npm run build
npm run start
```

Visit: http://localhost:3000

### 2. Deployment Testing

After redeployment, test these URLs:

- `https://your-domain.vercel.app/` - Homepage
- `https://your-domain.vercel.app/items` - Products page
- `https://your-domain.vercel.app/api/auth/status` - API endpoint

## Common Issues and Solutions

### Issue: Build fails with dependency errors

**Solution**: Clear node_modules and reinstall

```bash
cd nova-market
rmdir /s /q node_modules
npm install
```

### Issue: API routes not working

**Solution**: Check environment variables are set correctly

### Issue: Images not loading

**Solution**: Verify image domains in next.config.mjs

### Issue: Authentication not working

**Solution**: Check NEXTAUTH_URL matches your domain

## Verification Checklist

After applying fixes:

- [ ] Local build succeeds (`npm run build`)
- [ ] Vercel Root Directory set to `nova-market`
- [ ] Environment variables configured
- [ ] Homepage loads without errors
- [ ] API routes respond correctly
- [ ] Authentication works
- [ ] Images display properly

## Next Steps

1. **Run the fix script**: `fix-deployment.bat`
2. **Commit changes**: Push to GitHub
3. **Update Vercel settings**: Set Root Directory
4. **Redeploy**: Trigger new deployment
5. **Test thoroughly**: Verify all functionality

## Support

If issues persist:

1. Check Vercel function logs
2. Verify all environment variables
3. Test API endpoints individually
4. Review Next.js build output

The routing issue should be completely resolved after applying these fixes.
