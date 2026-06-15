// app/api/register/route.ts
// Save this file at: app/api/register/route.ts
//
// ─────────────────────────────────────────────
// SETUP GUIDE — do this once before deploying
// ─────────────────────────────────────────────
//
// STEP 1 — Create a Google Cloud Project & Service Account
//   1. Go to https://console.cloud.google.com
//   2. Create a new project (e.g. "KRSR Registrations")
//   3. Go to APIs & Services → Enable APIs
//   4. Search for and enable "Google Sheets API"
//   5. Go to APIs & Services → Credentials → Create Credentials → Service Account
//   6. Name it (e.g. "krsr-sheets-writer"), click Done
//   7. Click the service account → Keys tab → Add Key → JSON
//   8. A .json file downloads — keep it safe, never commit it to git
//
// STEP 2 — Share your Google Sheet with the service account
//   1. Create a new Google Sheet at https://sheets.google.com
//   2. Add these headers in Row 1 (exactly as shown):
//      First Name | Last Name | Email | Phone | Organization | Job Title | Official Email | City | Country | Submitted At
//   3. Copy the Sheet ID from the URL:
//      https://docs.google.com/spreadsheets/d/SHEET_ID_IS_HERE/edit
//   4. Open the downloaded JSON file and copy the "client_email" value
//   5. In your Google Sheet, click Share → paste that email → set role to Editor
//
// STEP 3 — Add to your .env.local file:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
//   GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
//   GOOGLE_SHEET_ID=your_sheet_id_from_url
//   REGISTRATION_EMAIL=you@kimberly-ryan.com   (for backup email via Resend)
//   RESEND_API_KEY=your_resend_key             (already in your project)
//
// NOTE: When copying GOOGLE_PRIVATE_KEY into .env.local,
//       replace all actual newlines in the key with \n
//       and wrap the whole value in double quotes.
//
// STEP 4 — Install the Google API client:
//   npm install googleapis
// ─────────────────────────────────────────────

import { NextResponse } from "next/server";
import { google }       from "googleapis";
import { Resend }       from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Authorise using the service account credentials from .env.local
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      jobTitle,
      officialEmail,
      city,
      country,
    } = body;

    // ── Server-side validation ──
    const required = [
      firstName, lastName, email, phone,
      organization, jobTitle, officialEmail, city, country,
    ];
    if (required.some((v) => !v || String(v).trim() === "")) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone:   "Africa/Lagos",
      dateStyle:  "medium",
      timeStyle:  "short",
    });

    // ── Write to Google Sheets ──
    const auth   = getGoogleAuth();
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range:         "Sheet1!A:J",   // columns A–J match the 10 headers
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          firstName,
          lastName,
          email,
          phone,
          organization,
          jobTitle,
          officialEmail,
          city,
          country,
          submittedAt,
        ]],
      },
    });

    // ── Send backup email via Resend ──
    await resend.emails.send({
      from:    "KRSR Registrations <onboarding@resend.dev>", // ← replace with your verified Resend sender
      to:      process.env.REGISTRATION_EMAIL ?? "",
      subject: `New KRSR Registration — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2C2A27">

          <div style="background:#3A3530;padding:28px 32px;border-radius:12px 12px 0 0">
            <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:2px;
                      text-transform:uppercase;color:#E87722">
              KRSR — Career Pathway 360
            </p>
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff">
              New Registration Received
            </h1>
          </div>

          <div style="background:#ffffff;padding:28px 32px;border:1px solid #E2DDD7;border-top:none">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tbody>
                ${[
                  ["First Name",             firstName],
                  ["Last Name",              lastName],
                  ["Email Address",          email],
                  ["Phone Number",           phone],
                  ["Organization",           organization],
                  ["Job Title",              jobTitle],
                  ["Official Email Address", officialEmail],
                  ["City",                   city],
                  ["Country / Region",       country],
                  ["Submitted At",           submittedAt],
                ]
                  .map(([label, value], i) => `
                    <tr style="background:${i % 2 === 0 ? "#F4F2EE" : "#ffffff"}">
                      <td style="padding:10px 14px;font-weight:600;color:#5A5550;
                                 width:40%;border-bottom:1px solid #E2DDD7">${label}</td>
                      <td style="padding:10px 14px;color:#2C2A27;
                                 border-bottom:1px solid #E2DDD7">${value}</td>
                    </tr>`)
                  .join("")}
              </tbody>
            </table>
          </div>

          <div style="background:#F4F2EE;padding:16px 32px;border-radius:0 0 12px 12px;
                      border:1px solid #E2DDD7;border-top:none">
            <p style="margin:0;font-size:11px;color:#b0a89e;text-align:center">
              This entry has been saved to your Google Sheet automatically.
            </p>
          </div>

        </div>
      `,
    });

    return NextResponse.json({ message: "Registration successful." }, { status: 200 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { message: "Failed to submit registration. Please try again." },
      { status: 500 }
    );
  }
}
