// app/api/event-registration/route.ts
// Create this folder: app/api/event-registration/
// Save this file inside it as route.ts
//
// This follows the exact same pattern as your existing /api/contact route.
// It uses your existing sanity client and email service from lib/.

import { NextResponse }  from "next/server";
import { createClient }  from "@sanity/client";
import { EmailService }  from "@/lib/email";

// Uses the same project credentials as your sanity.config.ts
const sanityClient = createClient({
  projectId:  "h28ja2xu",
  dataset:    "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      designation,
      howDidYouHear,
      message,
      agreeToPrivacy,
      eventSlug,        // passed from the form alongside the form data
    } = body;

    // ── Validate required fields ──
    if (
      !firstName || !lastName || !email ||
      !organization || !designation ||
      !howDidYouHear || !message ||
      !agreeToPrivacy || !eventSlug
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Look up the event document by slug ──
    const event = await sanityClient.fetch(
      `*[_type == "event" && slug.current == $slug][0]{ _id, name }`,
      { slug: eventSlug }
    );

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    // ── Write submission to Sanity ──
    const submission = await sanityClient.create({
      _type:           "eventRegistrationSubmission",
      event: {
        _type: "reference",
        _ref:  event._id,
      },
      firstName,
      lastName,
      email,
      phone:           phone || "",
      organization,
      designation,
      howDidYouHear,
      message,
      agreeToPrivacy,
      submissionDate:  new Date().toISOString(),
      status:          "new",
      source:          "event_registration",
    });

    // ── Send team notification email ──
    // Uses EmailService from your existing lib/email — same pattern as contact form.
    // If EmailService doesn't have a method for event registrations yet,
    // fall back to the contact form notification so it still sends.
    try {
      await EmailService.sendContactFormNotification({
        firstName,
        lastName,
        email,
        phone:              phone || "",
        howDidYouHear,
        serviceInterested:  `Event Registration: ${event.name}`,
        message,
        agreeToPrivacy,
        submissionDate:     submission._createdAt || new Date().toISOString(),
        submissionId:       submission._id,
        organization,
        designation,
      });
    } catch (emailError) {
      // Log but don't fail — registration is already saved to Sanity
      console.error("Failed to send event registration email notification:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: `Thank you for registering for ${event.name}! We'll be in touch with event details shortly.`,
    });

  } catch (error: unknown) {
    console.error("Event registration API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
