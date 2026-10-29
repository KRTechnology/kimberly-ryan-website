"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function RegistrationForm({ styles }: { styles: Record<string, string> }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.updates = String(form.updates.checked);
    try {
      const res = await fetch("/api/hr-roundtable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Registration did not go through.");
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration did not go through. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={styles.done} role="status">
        <h3>You&apos;re registered.</h3>
        <p>Thank you. Check your email for your confirmation and joining link. If it does not arrive in a few minutes, check your spam folder.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <div className={styles.field}><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" required /></div>
        <div className={styles.field}><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" required /></div>
      </div>
      <div className={styles.field}><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className={styles.field}><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
      <div className={styles.row}>
        <div className={styles.field}><label htmlFor="jobTitle">Job title</label><input id="jobTitle" name="jobTitle" autoComplete="organization-title" /></div>
        <div className={styles.field}><label htmlFor="organization">Organization</label><input id="organization" name="organization" autoComplete="organization" /></div>
      </div>
      <div className={styles.field}>
        <label htmlFor="questions">Questions for the panel</label>
        <textarea id="questions" name="questions" />
        <p className={styles.hint}>Optional. Your questions help shape the discussion.</p>
      </div>
      {/* Honeypot: hidden from people, filled in by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <div className={styles.field}>
        <label className={styles.check}><input type="checkbox" name="updates" /> Send me news about future Kimberly Ryan webinars and events.</label>
      </div>
      {status === "error" && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.btn} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Register now"}
      </button>
    </form>
  );
}
