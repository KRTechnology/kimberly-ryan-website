
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

// ── Email 1: Notify your team ──
await resend.emails.send({
  from:    "HR Roundtable Registrations <info@kimberly-ryan.net>", // ← your verified Resend sender
  to:      process.env.REGISTRATION_EMAIL ?? "",
  subject: `New Roundtable Registration — ${firstName} ${lastName}`,
  html: `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2C2A27">
      <div style="background:#3A3530;padding:28px 32px;border-radius:12px 12px 0 0">
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:2px;
                  text-transform:uppercase;color:#E87722">
          Roundtable Registration
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
      <div style="background:#F4F2EEpadding:16px 32px;border-radius:0 0 12px 12px;
                  border:1px solid #E2DDD7;border-top:none">
        <p style="margin:0;font-size:11px;color:#b0a89e;text-align:center">
          This entry has been saved to your Google Sheet automatically.
        </p>
      </div>
    </div>
  `,
});

// ── Email 2: Confirmation to registrant ──
await resend.emails.send({
  from:    "Kimberly Ryan <info@kimberly-ryan.net>", // ← replace with your verified Resend sender
  to:      officialEmail,                            // sends to their official work email
  subject: "Your HR Roundtable Registration is Confirmed!",
  html: `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2C2A27">

      <!-- Header -->
      <div style="background:#3A3530;padding:32px;border-radius:12px 12px 0 0;text-align:center">
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:2px;
                  text-transform:uppercase;color:#E87722">
          JULY ROUNDTABLE DISCUSSION
        </p>
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff">
          Registration Confirmed
        </h1>
      </div>

        <!-- Body -->
        <div style="background:#ffffff;padding:36px 32px;border:1px solid #E2DDD7;border-top:none">
          <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#2C2A27">
            Dear ${firstName},
          </p>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#5A5550">
            Thank you for registering for our roundtable session on <strong style="color:#2C2A27">"Building Career Resilience in the Era of AI and Automation."</strong>
          </p>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#5A5550">
            As AI continues to transform the world of work, resilience, adaptability, and continuous learning are becoming essential career skills.
          </p>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#5A5550">
            The meeting link and participation details will be shared with you shortly.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#5A5550">
            We look forward to having you join the conversation.
          </p>
        </div>
        
        <!-- Summary box -->
        <div style="background:#F4F2EE;border-radius:10px;padding:20px 24px;margin-bottom:24px">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;
                    letter-spacing:1px;color:#E87722">
            Your Registration Details
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <tbody>
              ${[
                ["Name",         `${firstName} ${lastName}`],
                ["Organization", organization],
                ["Job Title",    jobTitle],
                ["City",         city],
                ["Country",      country],
              ]
                .map(([label, value]) => `
                  <tr>
                    <td style="padding:6px 0;font-weight:600;color:#5A5550;width:40%">${label}</td>
                    <td style="padding:6px 0;color:#2C2A27">${value}</td>
                  </tr>`)
                .join("")}
            </tbody>
          </table>
        </div>

        <p style="margin:0;font-size:14px;line-height:1.7;color:#5A5550">
          If you have any questions in the meantime, feel free to reach out to us at
          <a href="mailto:${process.env.REGISTRATION_EMAIL}"
             style="color:#E87722;text-decoration:none;font-weight:600">
            ${process.env.REGISTRATION_EMAIL}
          </a>.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#F4F2EE;padding:20px 32px;border-radius:0 0 12px 12px;
                  border:1px solid #E2DDD7;border-top:none;text-align:center">
        <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#2C2A27">
          Kimberly Ryan Limited
        </p>
        <a href="https://www.kimberly-ryan.com"
           style="font-size:11px;color:#E87722;text-decoration:none">
          www.kimberly-ryan.com
        </a>
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
