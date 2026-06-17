// components/RegistrationPage.tsx
// Drop this into your components/ folder.
// Then create app/register/page.tsx and import this component.

"use client";

import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  officialEmail: string;
  city: string;
  country: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  jobTitle: "",
  officialEmail: "",
  city: "",
  country: "",
};

const fields: {
  key: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  half?: boolean;
}[] = [
  { key: "firstName",     label: "First Name",             type: "text",  placeholder: "Enter First Name",                 required: true,  half: true },
  { key: "lastName",      label: "Last Name",              type: "text",  placeholder: "Enter Last Name",                required: true,  half: true },
  { key: "email",         label: "Email Address",          type: "email", placeholder: "Enter Email Address",       required: true,  half: true },
  { key: "phone",         label: "Phone Number",           type: "tel",   placeholder: "Enter Phone Number",    required: true,  half: true },
  { key: "organization",  label: "Organization",           type: "text",  placeholder: "Enter Organization",             required: true,  half: true },
  { key: "jobTitle",      label: "Job Title",              type: "text",  placeholder: "Enter Job Title",           required: true,  half: true },
  { key: "officialEmail", label: "Official Email Address", type: "email", placeholder: "Enter Official Email",    required: true,  half: false },
  { key: "city",          label: "City",                   type: "text",  placeholder: "e.g. Lagos",                required: true,  half: true },
  { key: "country",       label: "Country / Region",       type: "text",  placeholder: "e.g. Nigeria",              required: true,  half: true },
];

export default function RegistrationPage() {
  const [form, setForm]     = useState<FormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError]   = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/hr-roundtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F2EE]">
      {/* ── Header band ── */}
      <div className="bg-[#3A3530] px-6 pb-16 pt-24 text-center">
        
        <h1 className="font-sans text-3xl font-bold text-white md:text-4xl">
          Register for the Building Career Resilience in the Era of AI and Automation Roundtable Discussion
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
          Fill in your details below and a member of our team will be in touch with next steps.
        </p>
      </div>

      {/* ── Roundtable image ── */}
      <div className="mx-auto max-w-2xl px-4 pt-14">
        <img
          src="/images/roundtable-image.jpeg"
          alt="Building Career Resilience in the Era of AI and Automation – A Virtual HR Round Table"
          className="w-full rounded-2xl shadow-sm"
        />
      </div>

      {/* ── Form card ── */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        {status === "success" ? (
          /* ── Success state ── */
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-[#2C2A27]">Registration Received</h2>
            <p className="text-sm leading-relaxed text-[#5A5550]">
              Thank you for registering. We&apos;ve received your details and will be in touch shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-lg bg-[#E87722] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#F5A44A]"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div
                    key={f.key}
                    className={f.half === false ? "sm:col-span-2" : "col-span-1"}
                  >
                    <label
                      htmlFor={f.key}
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#2C2A27]"
                    >
                      {f.label}
                      {f.required && (
                        <span className="ml-1 text-[#E87722]">*</span>
                      )}
                    </label>
                    <input
                      id={f.key}
                      name={f.key}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={handleChange}
                      required={f.required}
                      className="w-full rounded-lg border border-[#E2DDD7] bg-[#F4F2EE] px-4 py-3 text-sm text-[#2C2A27] placeholder-[#b0a89e] outline-none transition-all focus:border-[#E87722] focus:bg-white focus:ring-2 focus:ring-[#E87722]/20"
                    />
                  </div>
                ))}
              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-8 w-full rounded-lg bg-[#E87722] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#F5A44A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting…" : "Submit Registration"}
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
