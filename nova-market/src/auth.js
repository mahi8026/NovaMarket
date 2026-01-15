import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { validateMockCredentials, createMockUser } from "@/lib/auth";

/**
 * NextAuth.js v5 configuration for Nova Marketplace
 * Supports both Google OAuth and credential-based authentication
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth provider (only enabled if credentials are provided)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
        ]
      : []),

    // Credentials provider for mock authentication
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Validate against mock credentials
        if (validateMockCredentials(credentials.email, credentials.password)) {
          return createMockUser(credentials.email);
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.provider = account?.provider || "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      // Add user info to session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.provider = token.provider;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to items page after successful login
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default redirect to items page
      return `${baseUrl}/items`;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
});
