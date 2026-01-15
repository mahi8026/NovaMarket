import { handlers } from "@/auth";

/**
 * NextAuth.js v5 API route handler
 * Handles all authentication requests including:
 * - Sign in (credentials and OAuth)
 * - Sign out
 * - Session management
 * - OAuth callbacks
 */

export const { GET, POST } = handlers;
