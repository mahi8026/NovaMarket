import { NextResponse } from "next/server";
import { validateMockCredentials, createMockUser } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (!validateMockCredentials(email, password)) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create user object
    const user = createMockUser(email);

    // Create response with success
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    // Set authentication cookie
    response.cookies.set("auth-token", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request format" },
      { status: 400 }
    );
  }
}
