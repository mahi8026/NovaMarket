# 🔥 Quick Fix Guide - Google OAuth Error

## The Problem

**Error 400: redirect_uri_mismatch** when trying to sign in with Google

## The 5-Minute Fix

### Step 1: Update Google Cloud Console (3 minutes)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on OAuth 2.0 Client ID: `848545045654-mttjv8jpccjovcunen62eg67bfroeb93`
3. Under "Authorized redirect URIs", click **+ ADD URI**
4. Paste this exact URL:
   ```
   https://nova-frontend-topaz.vercel.app/api/auth/callback/google
   ```
5. Click **SAVE**
6. Wait 5 minutes for changes to propagate

### Step 2: Verify Vercel Environment Variables (2 minutes)

1. Go to Vercel Dashboard → **nova-frontend** project
2. Click **Settings** → **Environment Variables**
3. Verify these are set for **Production**:

```
NEXTAUTH_URL=https://nova-frontend-topaz.vercel.app
GOOGLE_CLIENT_ID=848545045654-mttjv8jpccjovcunen62eg67bfroeb93.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
MONGODB_URI=mongodb+srv://nova_db:BsHzwMfAaXdHeRIh@cluster0.ocjxb4e.mongodb.net/nova-marketplace?retryWrites=true&w=majority&appName=Cluster0
```

4. If any are missing, add them and click **Save**

### Step 3: Redeploy (if you added variables)

1. Go to **Deployments** tab
2. Click on latest deployment
3. Click **•••** menu → **Redeploy**

### Step 4: Test

1. Visit: https://nova-frontend-topaz.vercel.app/login
2. Click **"Sign in with Google"**
3. Should work! ✅

---

## Alternative: Use Credential Login (Works Now)

While waiting for Google OAuth fix:

**Email**: `test@example.com`  
**Password**: `password123`

---

## Need Help?

Check the detailed guide: `VERCEL_DEPLOYMENT_STEPS.md`
