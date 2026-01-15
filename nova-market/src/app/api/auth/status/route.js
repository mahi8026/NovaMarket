import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const user = getCurrentUser(cookieStore);

  return NextResponse.json({
    isAuthenticated: user !== null,
    user: user,
  });
}
