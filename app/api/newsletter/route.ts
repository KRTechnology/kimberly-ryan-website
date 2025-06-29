import { NextResponse } from "next/server";
import { submitNewsletterSubscription } from "@/lib/sanity";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { email, source } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 }
      );
    }

    const result = await submitNewsletterSubscription({
      email,
      source: source || "website_footer",
    });

    if (result.success) {
      if (result.reactivated) {
        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "Thank you for subscribing to our newsletter!",
        });
      }
    } else {
      if (result.error === "Email already subscribed") {
        return NextResponse.json(
          {
            success: false,
            error: "duplicate",
            message: "You're already subscribed to our newsletter!",
          },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to subscribe. Please try again.",
          },
          { status: 500 }
        );
      }
    }
  } catch (error: any) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
