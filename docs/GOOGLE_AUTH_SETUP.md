# Google OAuth Setup Guide

## ✅ Current Status

Google OAuth credentials need to be configured in `.env.local`:

- Client ID: Your Google OAuth Client ID
- Client Secret: Your Google OAuth Client Secret
- NextAuth Secret: Your NextAuth Secret Key

## 🔧 Required Configuration in Google Cloud Console

### 1. Authorized JavaScript Origins

Add the following to your OAuth 2.0 Client:

```
http://localhost:3000
```

### 2. Authorized Redirect URIs

Add the following callback URL:

```
http://localhost:3000/api/auth/callback/google
```

### Steps to Update in Google Cloud Console:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Under "Authorized JavaScript origins", click "ADD URI" and add:
   - `http://localhost:3000`
4. Under "Authorized redirect URIs", click "ADD URI" and add:
   - `http://localhost:3000/api/auth/callback/google`
5. Click "SAVE"
6. Wait 5-10 minutes for changes to propagate

## 📝 Environment Variables

Your `.env.local` file should contain:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Provider
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Public environment variables (accessible in browser)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## 🚀 How to Use

1. **Start the application:**

   ```bash
   npm run dev
   ```

2. **Navigate to login page:**

   - Go to http://localhost:3000/login

3. **Sign in with Google:**
   - Click the "Sign in with Google" button
   - Select your Google account
   - Grant permissions
   - You'll be redirected to `/items` page

## 🔍 Testing

### Test Credentials Login (Mock Auth):

- Email: `admin@novamarket.com`
- Password: `admin123`

### Test Google OAuth:

- Click "Sign in with Google" button
- Use any Google account

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"

**Solution:** Make sure you've added `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs in Google Cloud Console.

### Error: "origin_mismatch"

**Solution:** Make sure you've added `http://localhost:3000` to Authorized JavaScript origins in Google Cloud Console.

### Google button not showing

**Solution:**

1. Check that `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in `.env.local`
2. Restart the Next.js dev server after changing environment variables
3. Clear browser cache and reload

### Changes not taking effect

**Solution:**

1. Restart the Next.js development server
2. Clear browser cache
3. Wait 5-10 minutes after making changes in Google Cloud Console

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup Guide](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## 🎨 UI Features

The login form now includes:

- Modern gradient design matching the application theme
- Smooth animations and transitions
- Clear visual separation between credential and OAuth login
- Responsive design for all screen sizes
- Loading states for better UX
- Error handling with user-friendly messages
