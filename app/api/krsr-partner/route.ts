// app/api/krsr-partner/route.ts
// Create this folder path: app/api/krsr-partner/
// Then save this file inside it as route.ts
//
// SETUP — add these to your .env.local file:
//   SANITY_API_TOKEN=your_sanity_write_token  (see instructions below)
//   REGISTRATION_EMAIL=you@kimberly-ryan.com  (already in your project)
//   RESEND_API_KEY=your_resend_key            (already in your project)
//
// HOW TO GET YOUR SANITY WRITE TOKEN:
//   1. Go to https://sanity.io/manage
//   2. Click your project (Kimberly Ryan Website)
//   3. Go to API → Tokens → Add API Token
//   4. Name it "KRSR Partner Form", set permissions to "Editor"
//   5. Copy the token and paste it as SANITY_API_TOKEN in .env.local
//   6. Also add it to your hosting platform (Vercel/Netlify) environment variables

import { NextResponse } from "next/server";
import { createClient }  from "@sanity/client";
import { Resend }        from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Matches the projectId and dataset from your sanity.config.ts
const sanityClient = createClient({
  projectId: "h28ja2xu",
  dataset:   "production",
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      designation,
      partnershipType,
      howDidYouHear,
      message,
    } = body;

    // ── Server-side validation ──
    const required = [
      firstName, lastName, email, phone,
      organization, designation, partnershipType,
      howDidYouHear, message,
    ];
    if (required.some((v) => !v || String(v).trim() === "")) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // ── Write to Sanity ──
    await sanityClient.create({
      _type:           "partnerSubmission",
      firstName,
      lastName,
      email,
      phone,
      organization,
      designation,
      partnershipType,
      howDidYouHear,
      message,
      submissionDate:  new Date().toISOString(),
      status:          "new",
      source:          "krsr_website",
    });

    // ── Notify your team via Resend ──
    await resend.emails.send({
      from:    "KRSR Partner Enquiries <onboarding@resend.dev>", // ← replace with verified sender
      to:      process.env.REGISTRATION_EMAIL ?? "",
      subject: `New KRSR Partner Enquiry — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2C2A27">
          <div style="background:#3A3530;padding:28px 32px;border-radius:12px 12px 0 0">
            <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:2px;
                      text-transform:uppercase;color:#E87722">
              KRSR — Partner With Us
            </p>
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff">
              New Partnership Enquiry
            </h1>
          </div>
          <div style="background:#ffffff;padding:28px 32px;border:1px solid #E2DDD7;border-top:none">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tbody>
                ${[
                  ["First Name",          firstName],
                  ["Last Name",           lastName],
                  ["Email",               email],
                  ["Phone",               phone],
                  ["Organization",        organization],
                  ["Designation",         designation],
                  ["Partnership Interest",partnershipType],
                  ["How They Heard",      howDidYouHear],
                  ["Message",             message],
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
                      border:1px solid #E2DDD7;border-top:none;text-align:center">
            <p style="margin:0;font-size:11px;color:#b0a89e">
              This submission has been saved to your Sanity Studio dashboard automatically.
            </p>
          </div>
        </div>
      `,
    });

    // ── Confirmation email to enquirer ──
    await resend.emails.send({
      from:    "Kimberly Ryan <onboarding@resend.dev>", // ← replace with verified sender
      to:      email,
      subject: "We've Received Your Partnership Enquiry — KRSR",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2C2A27">
          <div style="background:#3A3530;padding:32px;border-radius:12px 12px 0 0;text-align:center">
            <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:2px;
                      text-transform:uppercase;color:#E87722">
              KRSR — Kimberly Ryan Social Responsibility
            </p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff">
              Enquiry Received ✓
            </h1>
          </div>
          <div style="background:#ffffff;padding:36px 32px;border:1px solid #E2DDD7;border-top:none">
            <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#2C2A27">
              Dear ${firstName},
            </p>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#5A5550">
              Thank you for your interest in partnering with <strong style="color:#2C2A27">KRSR</strong>.
              We have received your enquiry and a member of our team will be in touch with you shortly.
            </p>
            <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#5A5550">
              We are excited about the possibility of working together to empower the next
              generation of Nigerian professionals.
            </p>
            <div style="background:#F4F2EE;border-radius:10px;padding:20px 24px;margin-bottom:24px">
              <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;
                        letter-spacing:1px;color:#E87722">
                Your Enquiry Details
              </p>
              <table style="width:100%;border-collapse:collapse;font-size:13px">
                <tbody>
                  ${[
                    ["Name",                 `${firstName} ${lastName}`],
                    ["Organization",         organization],
                    ["Partnership Interest", partnershipType],
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
              If you have any questions in the meantime, reach out to us at
              <a href="mailto:${process.env.REGISTRATION_EMAIL}"
                 style="color:#E87722;text-decoration:none;font-weight:600">
                ${process.env.REGISTRATION_EMAIL}
              </a>.
            </p>
          </div>
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

    return NextResponse.json({ message: "Enquiry submitted successfully." }, { status: 200 });
  } catch (err) {
    console.error("Partner submission error:", err);
    return NextResponse.json(
      { message: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
