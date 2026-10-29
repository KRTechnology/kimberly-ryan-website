import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";
import { z } from "zod";

export const runtime = "nodejs"; // googleapis needs the Node runtime

const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().default(""),
  jobTitle: z.string().trim().max(150).optional().default(""),
  organization: z.string().trim().max(150).optional().default(""),
  questions: z.string().trim().max(2000).optional().default(""),
  updates: z.string().optional().default("false"),
  website: z.string().optional().default(""), // honeypot
});

/** Appends one row to the Google Sheet. Throws if anything is missing or the API call fails. */
async function appendToSheet(row: string[]) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || "Registrations";
  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY or GOOGLE_SHEET_ID");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${tab}'!A:I`,
    valueInputOption: "RAW", // stores text exactly as typed, so nothing is treated as a formula
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }
  const d = parsed.data;

  // Bots fill the hidden field: pretend success and do nothing.
  if (d.website) return NextResponse.json({ ok: true });

  const fullName = `${d.firstName} ${d.lastName}`;
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos", hour12: false });

  // 1. Save to the live sheet (the main record of registrations).
  let sheetOk = true;
  try {
    await appendToSheet([
      timestamp,
      d.firstName,
      d.lastName,
      d.email,
      d.phone,
      d.jobTitle,
      d.organization,
      d.questions,
      d.updates === "true" ? "Yes" : "No",
    ]);
  } catch (err) {
    sheetOk = false;
    console.error("hr-roundtable: Google Sheets append failed", err);
  }

  // 2. Emails (optional notification to the team + confirmation to the registrant).
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REGISTRATION_FROM_EMAIL; // e.g. "Kimberly Ryan <events@kimberly-ryan.com>"
  const to = process.env.REGISTRATION_TO_EMAIL; // optional: team notification address(es)
  let teamEmailOk = false;

  if (apiKey && from) {
    const resend = new Resend(apiKey);

    if (to) {
      const team = await resend.emails.send({
        from,
        to: to.split(",").map((s) => s.trim()),
        replyTo: d.email,
        subject: `KR Roundtable 3.0 registration: ${fullName}`,
        text: [
          `Name: ${fullName}`,
          `Email: ${d.email}`,
          `Phone: ${d.phone || "-"}`,
          `Job title: ${d.jobTitle || "-"}`,
          `Organization: ${d.organization || "-"}`,
          `Wants future event news: ${d.updates === "true" ? "Yes" : "No"}`,
          `Questions for the panel: ${d.questions || "-"}`,
          sheetOk ? "" : "\nNOTE: this registration could NOT be saved to the Google Sheet. Please add it manually.",
        ].join("\n"),
      });
      teamEmailOk = !team.error;
      if (team.error) console.error("hr-roundtable: team email failed", team.error);
    }

    const confirm = await resend.emails.send({
      from,
      to: d.email,
      subject: "You're registered: KR Virtual Roundtable 3.0",
      text: [
        `Hello ${d.firstName},`,
        "",
        "Thank you for registering for KR Virtual Roundtable 3.0.",
        "Agile EX: Designing Meaningful Employee Experience",
        "Date: Thursday, 26 November 2026",
        "Time: 10:00 am (WAT)",
        "",
        "We will send you the joining link before the event.",
        "",
        "Kimberly Ryan",
      ].join("\n"),
    });
    if (confirm.error) console.error("hr-roundtable: confirmation email failed", confirm.error);
  }

  // Only fail if the registration was saved nowhere.
  if (!sheetOk && !teamEmailOk) {
    return NextResponse.json({ error: "Registration did not go through. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
