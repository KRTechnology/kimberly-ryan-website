import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REGISTRATION_FROM_EMAIL; // e.g. "Kimberly Ryan <events@kimberly-ryan.com>"
  const to = process.env.REGISTRATION_TO_EMAIL; // where registrations are sent
  if (!apiKey || !from || !to) {
    console.error("hr-roundtable: missing RESEND_API_KEY, REGISTRATION_FROM_EMAIL or REGISTRATION_TO_EMAIL");
    return NextResponse.json({ error: "Registration is temporarily unavailable." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const fullName = `${d.firstName} ${d.lastName}`;

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
    ].join("\n"),
  });

  if (team.error) {
    console.error("hr-roundtable: team email failed", team.error);
    return NextResponse.json({ error: "Registration did not go through. Please try again." }, { status: 500 });
  }

  // Confirmation to the registrant. A failure here should not fail the registration.
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

  return NextResponse.json({ ok: true });
}
