
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
