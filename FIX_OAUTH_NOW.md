# 🔥 FIX GOOGLE OAUTH NOW - 2 MINUTES

## Your Current URL

**https://nova-market-xpwb.vercel.app**

## What You Need to Add in Google Console

You're already in the right place! I can see the Google Cloud Console is open.

### Step 1: Add the New Redirect URI

In the "Authorised redirect URIs" section where you see:

- URI 1: `http://localhost:3000/api/auth/callback/google`
- URI 2: `https://nova-frontend-topaz.vercel.app/api/auth/callback/google`

Click **"+ Add URI"** and add:

```
https://nova-market-xpwb.vercel.app/api/auth/callback/google
```

### Step 2: Save

Click the blue **"Save"** button at the bottom.

You'll see "OAuth client saved" notification.

### Step 3: Update Vercel Environment Variables

1. Go to Vercel Dashboard → **nova-market** project
2. Go to **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL` and update it to:
   ```
   https://nova-market-xpwb.vercel.app
   ```
4. Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click on the latest deployment
3. Click **•••** menu → **Redeploy**
4. Wait 2-3 minutes

### Step 5: Test

1. Visit: https://nova-market-xpwb.vercel.app/login
2. Click "Sign in with Google"
3. Should work! ✅

---

## All Environment Variables for Vercel

Make sure these are set in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://nova_db:BsHzwMfAaXdHeRIh@cluster0.ocjxb4e.mongodb.net/nova-marketplace?retryWrites=true&w=majority&appName=Cluster0

NEXTAUTH_URL=https://nova-market-xpwb.vercel.app
NEXTAUTH_SECRET=FdjTB376V6QNVGNIiNH8scK5yxg3ydZNvFMbzCQSA2I=

GOOGLE_CLIENT_ID=848545045654-mttjv8jpccjovcunen62eg67bfroeb93.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXT_PUBLIC_GOOGLE_CLIENT_ID=848545045654-mttjv8jpccjovcunen62eg67bfroeb93.apps.googleusercontent.com

STRIPE_SECRET_KEY=sk_test_51SXD8l8tn2lLlJnkPr7eXSxqx8LTUeinlq2h3yYm8Fb9wK7NnjM06eyNGPv8s5OvUS0I2KxUddiOKY7hWR4UEDbh00bYnOB8gV

NEXT_PUBLIC_IMAGE_HOST_KEY=5fbe3b269af220ef9639c781bec38e5b
```

---

## That's It!

After adding the redirect URI and updating NEXTAUTH_URL in Vercel, your Google OAuth will work perfectly.

**Your Production URL**: https://nova-market-xpwb.vercel.app
