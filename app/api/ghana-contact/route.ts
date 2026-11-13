import { NextResponse } from "next/server";

/**
 * Contact endpoint for the Ghana site (ghana.kimberly-ryan.com).
 *
 * The public form collects name, work email, company, area of interest and a
 * message. Those values are mapped onto the existing contactSubmission schema
 * so enquiries land in the same Sanity inbox and email notification flow as
 * the main website.
 */

const INTEREST_MAP: Record<string, string> = {
  Outsourcing: "Outsourcing",
  "Recruitment solutions": "Recruitment Solution",
  "Learning and development": "Learning & Development",
  "HR advisory": "HR Advisory services",
  "Not sure yet": "Other",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  try {
    // Silently accept honeypot submissions so bots do not retry.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const interest = String(body.interest ?? "").trim();
    const message = String(body.message ?? "").trim();
    const agreeToPrivacy = body.agreeToPrivacy === true;

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (!INTEREST_MAP[interest]) {
      return NextResponse.json(
        { success: false, error: "Please choose an area of interest." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 4000) {
      return NextResponse.json(
        {
          success: false,
          error: "Please tell us a little more (at least 10 characters).",
        },
        { status: 400 }
      );
    }

    if (!agreeToPrivacy) {
      return NextResponse.json(
        { success: false, error: "Please accept the privacy policy." },
        { status: 400 }
      );
    }

    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || nameParts[0];
    const messageWithCompany = company
      ? `Company: ${company}\n\n${message}`
      : message;

    // Imported lazily so validation and honeypot requests do not depend on
    // Sanity/Resend credentials being present (and so a missing key returns a
    // JSON error instead of crashing the route at import time).
    const [{ submitContactForm }, { EmailService }] = await Promise.all([
      import("@/lib/sanity"),
      import("@/lib/email"),
    ]);

    const result = await submitContactForm({
      firstName,
      lastName,
      email,
      howDidYouHear: "Website",
      serviceInterested: INTEREST_MAP[interest],
      message: messageWithCompany,
      agreeToPrivacy,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "We could not save your enquiry. Please try again or email us directly.",
        },
        { status: 500 }
      );
    }

    try {
      const submission = "data" in result ? result.data : undefined;

      await EmailService.sendContactFormNotification({
        firstName,
        lastName,
        email,
        howDidYouHear: "Website",
        serviceInterested: INTEREST_MAP[interest],
        message: messageWithCompany,
        agreeToPrivacy,
        submissionDate: submission?._createdAt || new Date().toISOString(),
        submissionId: submission?._id,
      });
    } catch (emailError) {
      // The enquiry is safely stored in Sanity even if the email fails.
      console.error("Ghana contact email notification failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your message is with our Accra team and we will be in touch shortly.",
    });
  } catch (error) {
    console.error("Ghana contact form API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong. Please try again or email info@kimberly-ryan.com.",
      },
      { status: 500 }
    );
  }
}
