// components/specific/PartnerPage.tsx
// Drop this into your components/specific/ folder.
// Then create app/(site)/krsr-partner/page.tsx and import this component.

"use client";

import { useState } from "react";

interface FormData {
  firstName:       string;
  lastName:        string;
  email:           string;
  phone:           string;
  organization:    string;
  designation:     string;
  partnershipType: string;
  howDidYouHear:   string;
  message:         string;
  agreeToPrivacy:  boolean;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm: FormData = {
  firstName:       "",
  lastName:        "",
  email:           "",
  phone:           "",
  organization:    "",
  designation:     "",
  partnershipType: "",
  howDidYouHear:   "",
  message:         "",
  agreeToPrivacy:  false,
};

const partnershipOptions = [
  { label: "Financial Sponsorship",        value: "financial_sponsorship" },
  { label: "In-Kind Support",              value: "in_kind_support" },
  { label: "Learning Resources",           value: "learning_resources" },
  { label: "Technology Solutions",         value: "technology_solutions" },
  { label: "Internship / Placement",       value: "internship_placement" },
  { label: "Pro Bono Speaking",            value: "pro_bono_speaking" },
  { label: "School / Institution Access",  value: "school_access" },
  { label: "Other",                        value: "other" },
];

const howDidYouHearOptions = [
  { label: "Referral",           value: "referral" },
  { label: "Google Search",      value: "google_search" },
  { label: "Social Media",       value: "social_media" },
  { label: "Website",            value: "website" },
  { label: "Advertisement",      value: "advertisement" },
  { label: "Event / Conference", value: "event_conference" },
  { label: "Other",              value: "other" },
];

const inputClass =
  "w-full rounded-lg border border-[#E2DDD7] bg-[#F4F2EE] px-4 py-3 text-sm text-[#2C2A27] placeholder-[#b0a89e] outline-none transition-all focus:border-[#E87722] focus:bg-white focus:ring-2 focus:ring-[#E87722]/20";

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#2C2A27]";

export default function PartnerPage() {
  const [form, setForm]     = useState<FormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError]   = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/krsr-partner", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F2EE]">

      {/* ── Header band ── */}
      <div className="bg-[#3A3530] px-6 pb-16 pt-24 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#E87722]/20 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[2px] text-[#E87722]">
          KRSR — Kimberly Ryan Social Responsibility
        </span>
        <h1 className="font-sans text-3xl font-bold text-white md:text-4xl">
          Partner With Us
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/60">
          Join us in shaping the future of Nigeria&apos;s workforce. Fill in your details
          below and a member of our team will be in touch to explore how we can work together.
        </p>
      </div>

      {/* ── Form card ── */}
      <div className="mx-auto max-w-2xl px-4 py-14">
        {status === "success" ? (

          /* ── Success state ── */
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E87722]/10 text-3xl">
              ✅
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#2C2A27]">Enquiry Received</h2>
            <p className="text-sm leading-relaxed text-[#5A5550]">
              Thank you for your interest in partnering with KRSR. We&apos;ve received your
              enquiry and will be in touch shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-lg bg-[#E87722] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#F5A44A]"
            >
              Submit Another Enquiry
            </button>
          </div>

        ) : (

          /* ── Form ── */
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First Name <span className="text-[#E87722]">*</span>
                  </label>
                  <input id="firstName" name="firstName" type="text"
                    placeholder="Enter First Name" value={form.firstName}
                    onChange={handleChange} required className={inputClass} />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last Name <span className="text-[#E87722]">*</span>
                  </label>
                  <input id="lastName" name="lastName" type="text"
                    placeholder="Enter Last Name" value={form.lastName}
                    onChange={handleChange} required className={inputClass} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address <span className="text-[#E87722]">*</span>
                  </label>
                  <input id="email" name="email" type="email"
                    placeholder="Enter Email Address" value={form.email}
                    onChange={handleChange} required className={inputClass} />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number <span className="text-[#E87722]">*</span>
                  </label>
                  <input id="phone" name="phone" type="tel"
                    placeholder="Enter Phone Number" value={form.phone}
                    onChange={handleChange} required className={inputClass} />
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="organization" className={labelClass}>
                    Organization <span className="text-[#E87722]">*</span>
                  </label>
                  <input id="organization" name="organization" type="text"
                    placeholder="Enter Organization" value={form.organization}
                    onChange={handleChange} required className={inputClass} />
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className={labelClass}>
                    Designation / Job Title <span className="text-[#E87722]">*</span>
                  </label>
                  <input id="designation" name="designation" type="text"
                    placeholder="Enter Job Title" value={form.designation}
                    onChange={handleChange} required className={inputClass} />
                </div>

                {/* Partnership Type */}
                <div className="sm:col-span-2">
                  <label htmlFor="partnershipType" className={labelClass}>
                    Partnership Interest <span className="text-[#E87722]">*</span>
                  </label>
                  <select id="partnershipType" name="partnershipType"
                    value={form.partnershipType} onChange={handleChange}
                    required className={inputClass}>
                    <option value="" disabled>Select partnership type</option>
                    {partnershipOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* How did you hear */}
                <div className="sm:col-span-2">
                  <label htmlFor="howDidYouHear" className={labelClass}>
                    How Did You Hear About KRSR <span className="text-[#E87722]">*</span>
                  </label>
                  <select id="howDidYouHear" name="howDidYouHear"
                    value={form.howDidYouHear} onChange={handleChange}
                    required className={inputClass}>
                    <option value="" disabled>Select an option</option>
                    {howDidYouHearOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-[#E87722]">*</span>
                  </label>
                  <textarea id="message" name="message" rows={4}
                    placeholder="Tell us briefly how you'd like to partner with KRSR..."
                    value={form.message} onChange={handleChange}
                    required
                    className={`${inputClass} resize-none`} />
                </div>

                {/* Privacy checkbox */}
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" name="agreeToPrivacy"
                      checked={form.agreeToPrivacy} onChange={handleChange}
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#E87722]" />
                    <span className="text-xs leading-relaxed text-[#5A5550]">
                      I agree to the{" "}
                      <a href="/privacy-policy"
                        className="font-semibold text-[#E87722] underline underline-offset-2">
                        Privacy Policy
                      </a>{" "}
                      and consent to Kimberly Ryan storing my information for the
                      purpose of this enquiry. <span className="text-[#E87722]">*</span>
                    </span>
                  </label>
                </div>

              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={status === "submitting"}
                className="mt-8 w-full rounded-lg bg-[#E87722] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#F5A44A] disabled:cursor-not-allowed disabled:opacity-60">
                {status === "submitting" ? "Submitting…" : "Submit Enquiry"}
              </button>

              <p className="mt-4 text-center text-[0.7rem] text-[#b0a89e]">
                Fields marked <span className="text-[#E87722]">*</span> are required.
              </p>
            </form>
          </div>

        )}
      </div>
    </main>
  );
}
