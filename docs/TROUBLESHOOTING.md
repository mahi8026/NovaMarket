# 🔧 Troubleshooting Guide

## Backend Issues

### MongoDB Connection Failed

**Error:** `MongoDB connection error` or `MongoServerError`

**Solutions:**

1. **Check connection string format:**

   ```env
   # Correct format
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nova-marketplace?retryWrites=true&w=majority

   # Common mistakes:
   # ❌ Missing database name
   # ❌ Wrong password (special characters not URL-encoded)
   # ❌ Missing ?retryWrites=true&w=majority
   ```

2. **URL-encode special characters in password:**

   ```
   @ → %40
   : → %3A
   / → %2F
   ? → %3F
   # → %23
   ```

3. **Check IP whitelist in MongoDB Atlas:**

   - Go to Network Access
   - Ensure your IP is whitelisted
   - Or allow all IPs: 0.0.0.0/0 (development only)

4. **Verify database user permissions:**
   - Go to Database Access
   - Ensure user has "Read and write to any database" role

### Port Already in Use

**Error:** `Port 3001 is already in use`

**Solutions:**

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

Or change port in `express-server/.env`:

```env
PORT=3002
```

### CORS Errors

**Error:** `Access to fetch blocked by CORS policy`

**Solutions:**

1. **Check ALLOWED_ORIGINS in backend .env:**

   ```env
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

2. **Verify frontend API URL:**

   ```env
   # In nova-market/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Restart both servers after changing CORS settings**

## Frontend Issues

### CSS Changes Not Showing

**Error:** Text colors or styles not updating

**Solutions:**

1. **Clear Next.js cache:**

   ```bash
   cd nova-market
   Remove-Item -Recurse -Force .next
   Remove-Item -Recurse -Force node_modules\.cache
   npm run dev
   ```

2. **Hard refresh browser:**

   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Use incognito/private mode**

4. **Use the cache-clearing script:**
   ```bash
   .\CLEAR_CACHE_AND_RESTART.bat
   ```

### NextAuth Errors

**Error:** `[next-auth][error][NO_SECRET]`

**Solution:**

Add NEXTAUTH_SECRET to `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key-here
```

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Error:** `[next-auth][error][SIGNIN_OAUTH_ERROR]`

**Solution:**

1. Check Google OAuth credentials
2. Verify redirect URI in Google Cloud Console:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
3. Ensure both client ID and secret are in `.env.local`

### Module Not Found Errors

**Error:** `Module not found: Can't resolve '@/components/...'`

**Solutions:**

1. **Check jsconfig.json exists:**

   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Restart dev server:**

   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Reinstall dependencies:**
   ```bash
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

### Image Upload Not Working

**Error:** Image upload fails or shows error

**Solutions:**

1. **Check imgbb API key:**

   ```env
   # In nova-market/.env.local
   NEXT_PUBLIC_IMAGE_HOST_KEY=your_api_key_here
   ```

2. **Verify file size (max 32MB)**

3. **Check file format (JPEG, PNG, GIF, WebP only)**

4. **Check network connection**

### Products Not Loading

**Error:** "Network error: Unable to connect to server"

**Solutions:**

1. **Verify backend is running:**

   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Check API URL in frontend:**

   ```env
   # In nova-market/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Check browser console for errors**

4. **Verify MongoDB connection in backend**

## Authentication Issues

### Login Not Working

**Error:** Login fails with valid credentials

**Solutions:**

1. **Check demo credentials:**

   ```
   Email: admin@novamarket.com
   Password: admin123
   ```

2. **Verify NEXTAUTH_SECRET is set**

3. **Check browser cookies are enabled**

4. **Clear browser cookies and try again**

### Session Not Persisting

**Error:** User logged out after page refresh

**Solutions:**

1. **Check NEXTAUTH_URL:**

   ```env
   NEXTAUTH_URL=http://localhost:3000
   ```

2. **Verify cookies are not blocked**

3. **Check browser console for errors**

4. **Try in incognito mode to rule out extensions**

### Protected Routes Not Working

**Error:** Can access /items/add without login

**Solutions:**

1. **Check middleware.js exists and is configured**

2. **Verify auth.js exports are correct**

3. **Restart dev server**

## Build/Deployment Issues

### Build Fails

**Error:** `npm run build` fails

**Solutions:**

1. **Check for TypeScript/ESLint errors:**

   ```bash
   npm run lint
   ```

2. **Fix any console.log statements in production code**

3. **Ensure all environment variables are set**

4. **Check for unused imports**

### Tests Failing

**Error:** Jest tests fail

**Solutions:**

1. **Update test snapshots:**

   ```bash
   npm test -- -u
   ```

2. **Check test environment setup:**

   - Verify jest.config.js
   - Verify jest.setup.js

3. **Run tests in watch mode for debugging:**
   ```bash
   npm test -- --watch
   ```

## Performance Issues

### Slow Page Load

**Solutions:**

1. **Check network tab in DevTools**

2. **Optimize images (use next/image)**

3. **Enable caching in production**

4. **Check MongoDB query performance**

### High Memory Usage

**Solutions:**

1. **Clear Next.js cache:**

   ```bash
   Remove-Item -Recurse -Force .next
   ```

2. **Restart dev server**

3. **Check for memory leaks in components**

## Database Issues

### Sample Data Not Loading

**Error:** Products collection is empty

**Solutions:**

1. **Check backend logs for initialization errors**

2. **Manually trigger initialization:**

   - Restart backend server
   - Check MongoDB Atlas dashboard

3. **Verify database name in connection string:**
   ```
   mongodb+srv://...mongodb.net/nova-marketplace?...
   ```

### Cannot Delete/Update Products

**Error:** Database operations fail

**Solutions:**

1. **Check user permissions in MongoDB Atlas**

2. **Verify connection string has write access**

3. **Check backend logs for detailed errors**

## Common Error Messages

### "Cannot read property 'map' of undefined"

**Cause:** Data not loaded yet

**Solution:** Add loading state or optional chaining:

```javascript
{products?.map(...)}
```

### "Hydration failed"

**Cause:** Server/client HTML mismatch

**Solutions:**

1. **Use 'use client' directive for client-only code**

2. **Avoid using browser APIs during SSR**

3. **Use useEffect for client-side only code**

### "Failed to fetch"

**Cause:** Network error or backend not running

**Solutions:**

1. **Verify backend is running**

2. **Check API URL configuration**

3. **Check CORS settings**

4. **Check network connectivity**

## Getting Help

If you're still experiencing issues:

1. **Check browser console for errors**
2. **Check backend terminal for errors**
3. **Review MongoDB Atlas logs**
4. **Check GitHub issues**
5. **Verify all environment variables are set correctly**

## Useful Commands

```bash
# Clear all caches
Remove-Item -Recurse -Force .next, node_modules\.cache

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install

# Check ports in use
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Test backend health
curl http://localhost:3001/api/health

# Run tests with verbose output
npm test -- --verbose

# Build for production
npm run build
```

---

**Still having issues? Check the logs carefully - they usually contain the answer!** 🔍
