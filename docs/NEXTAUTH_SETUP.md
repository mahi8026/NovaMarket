# NextAuth.js Integration Guide

This document explains how to set up and use NextAuth.js v5 with Google OAuth in the Nova Marketplace application.

## Overview

The application now supports two authentication methods:

1. **Mock Authentication**: Hardcoded credentials for development (email: admin@novamarket.com, password: admin123)
2. **NextAuth.js with Google OAuth**: Production-ready authentication with Google sign-in

Both methods work seamlessly together, with automatic fallback to mock authentication if NextAuth is not configured.

## Setup Instructions

### 1. Install Dependencies

NextAuth.js v5 (beta) is already installed. If you need to reinstall:

```bash
npm install next-auth@beta
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `nova-market` directory with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

#### Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen
6. Set authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env.local` file

### 3. Update Production Environment

For production deployment, set these environment variables in your hosting platform:

- `NEXTAUTH_SECRET`: Your generated secret
- `NEXTAUTH_URL`: Your production URL (e.g., `https://yourdomain.com`)
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret

## How It Works

### Authentication Flow

1. **Login Page** (`/login`):

   - Users can log in with credentials (mock or NextAuth)
   - Users can click "Sign in with Google" for OAuth
   - Automatic fallback to mock authentication if NextAuth fails

2. **Middleware** (`src/middleware.js`):

   - Checks NextAuth session first
   - Falls back to cookie-based authentication
   - Protects routes like `/items/add`

3. **Navbar** (`src/components/ui/Navbar.js`):

   - Uses `useSession()` hook to check NextAuth session
   - Falls back to cookie-based auth check
   - Displays user name from NextAuth session

4. **Logout**:
   - Uses NextAuth `signOut()` if session exists
   - Falls back to cookie-based logout

### Dual Authentication Support

The application maintains backward compatibility with mock authentication:

- **NextAuth Available**: Uses NextAuth for all authentication
- **NextAuth Not Configured**: Falls back to mock authentication
- **Both Work Together**: Middleware checks both methods

## File Structure

```
nova-market/
├── src/
│   ├── auth.js                          # NextAuth configuration
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── [...nextauth]/
│   │   │       │   └── route.js         # NextAuth API handler
│   │   │       ├── login/route.js       # Mock auth endpoint
│   │   │       └── logout/route.js      # Mock logout endpoint
│   │   └── layout.js                    # SessionProvider wrapper
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.js             # Updated for NextAuth
│   │   │   └── LogoutButton.js          # Updated for NextAuth
│   │   └── ui/
│   │       └── Navbar.js                # Updated for NextAuth
│   └── middleware.js                    # Updated for NextAuth
└── .env.local.example                   # Environment variable template
```

## Testing

### Test Mock Authentication

1. Go to `/login`
2. Use credentials:
   - Email: `admin@novamarket.com`
   - Password: `admin123`
3. Should redirect to `/items`

### Test Google OAuth

1. Configure Google OAuth credentials in `.env.local`
2. Go to `/login`
3. Click "Sign in with Google"
4. Complete Google sign-in flow
5. Should redirect to `/items`

## Troubleshooting

### Google OAuth Not Working

- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Check authorized redirect URIs in Google Cloud Console
- Ensure `NEXTAUTH_URL` matches your current domain
- Check browser console for errors

### Session Not Persisting

- Verify `NEXTAUTH_SECRET` is set
- Check that cookies are enabled in browser
- Ensure `NEXTAUTH_URL` is correct for your environment

### Middleware Redirect Loop

- Check that `/login` is not in `PROTECTED_ROUTES`
- Verify middleware configuration in `src/middleware.js`
- Clear browser cookies and try again

## Security Considerations

1. **Never commit `.env.local`** to version control
2. **Use strong secrets** for `NEXTAUTH_SECRET`
3. **Configure OAuth consent screen** properly in Google Cloud Console
4. **Use HTTPS in production** for secure cookie transmission
5. **Regularly rotate secrets** in production environments

## Additional Resources

- [NextAuth.js v5 Documentation](https://authjs.dev/)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
