import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/sanity";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const {
      firstName,
      lastName,
      email,
      howDidYouHear,
      serviceInterested,
      message,
      agreeToPrivacy,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !howDidYouHear ||
      !serviceInterested ||
      !message ||
      !agreeToPrivacy
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const result = await submitContactForm(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit form. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
