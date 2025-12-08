import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/authService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await authService.forgotPassword(email);

    if (result.success) {
      return NextResponse.json(
        { message: "Password reset email sent" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: result.error || "Failed to send reset email" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

