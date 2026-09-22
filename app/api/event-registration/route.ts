// app/api/event-registration/route.ts
// Create this folder: app/api/event-registration/
// Save this file inside it as route.ts
//
// This follows the exact same pattern as your existing /api/contact route.
// It uses your existing sanity client and email service from lib/.

import { NextResponse }  from "next/server";
import { EmailService }  from "@/lib/email";
import { google } from "googleapis";


function getGoogleAuth() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

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
      peopleManagementAreas,
      otherPeopleManagement,
      consultationInterest,
      agreeToPrivacy,
      eventSlug,
    } = body;

    // ── Validate required fields ──
if (
      !firstName || !lastName || !email ||
      !organization || !designation ||
      !peopleManagementAreas?.length ||
      !consultationInterest || !agreeToPrivacy || !eventSlug
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

    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone:  "Africa/Lagos",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ── Write to Google Sheets ──
    const auth   = getGoogleAuth();
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId:    process.env.EVENT_REGISTRATIONS_SHEET_ID,
      range:            "Sheet1!A:N",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          event.name,
          firstName,
          lastName,
          email,
          phone || "",
          organization,
          designation,
          howDidYouHear || "",
          (peopleManagementAreas || []).join(", "),
          otherPeopleManagement || "",
          consultationInterest  || "",
          String(agreeToPrivacy),
          submittedAt,
        ]],
      },
    });

    // Fake submission object so the email section below still works
    const submission = { _createdAt: new Date().toISOString(), _id: `${Date.now()}` };

    // ── Send team notification email ──
    // Uses EmailService from your existing lib/email — same pattern as contact form.
    // If EmailService doesn't have a method for event registrations yet,
    // fall back to the contact form notification so it still sends.
      try {
        await EmailService.sendContactFormNotification({
          firstName,
          lastName,
          email,
          phone:             phone || "",
          howDidYouHear,
          serviceInterested: `Consultation at: ${event.name} | ${organization} — ${designation} | Areas: ${(peopleManagementAreas || []).join(", ")} | Interest: ${consultationInterest}`,
          message: `Areas: ${(peopleManagementAreas || []).join(", ")} | Interest: ${consultationInterest}`,
          agreeToPrivacy,
          submissionDate:    submission._createdAt || new Date().toISOString(),
          submissionId:      submission._id,
        });
      } catch (emailError) {
        console.error("Failed to send consultation email notification:", emailError);
      }

    return NextResponse.json({
      success: true,
      message: `Thank you for reaching out to us! We'll be in touch with you shortly.`,
    });

  } catch (error: unknown) {
    console.error("Event registration API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
