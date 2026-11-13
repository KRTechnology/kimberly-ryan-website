"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GHANA_INTERESTS, MAIN_SITE_URL } from "./constants";

const ghanaContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Please use a shorter name"),
  email: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .email("Enter a valid email address"),
  company: z
    .string()
    .trim()
    .max(160, "Please use a shorter company name")
    .optional(),
  interest: z.string().min(1, "Please choose an area of interest"),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(4000, "Please keep your message under 4,000 characters"),
  agreeToPrivacy: z
    .boolean()
    .refine((value) => value === true, "Please accept the privacy policy"),
  website: z.string().optional(),
});

type GhanaContactFormData = z.infer<typeof ghanaContactSchema>;

const inputClasses =
  "w-full rounded-md border border-[#D5D7DA] bg-white px-4 py-3 text-[15px] text-[#181D27] placeholder:text-[#7D7775] transition-colors focus:border-[#EB821D] focus:outline-none focus:ring-2 focus:ring-[#EB821D]/30";

const labelClasses = "mb-1.5 block text-sm font-medium text-[#535862]";

const GhanaContactForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GhanaContactFormData>({
    resolver: zodResolver(ghanaContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "",
      message: "",
      agreeToPrivacy: false,
      website: "",
    },
  });

  const onSubmit = async (data: GhanaContactFormData) => {
    setStatus("idle");
    setFeedback("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/ghana-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "We could not send your message. Please try again or call us."
        );
      }

      setStatus("success");
      setFeedback(
        result.message ||
          "Thank you. Our Accra team will be in touch shortly."
      );
      reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.name === "AbortError"
          ? "That took longer than expected. Please try again, or call us on +233 50 725 7601."
          : error instanceof Error
            ? error.message
            : "We could not send your message. Please try again or call us."
      );
    } finally {
      clearTimeout(timeoutId);
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-lg border border-[#D5D7DA] bg-white p-8 shadow-[0_20px_50px_-45px_rgba(24,23,22,0.45)] sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDECEB] text-[#535862]">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-[#181D27]">
          Message received
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#535862]">
          {feedback}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFeedback("");
          }}
          className="mt-6 text-sm font-semibold text-[#535862] underline decoration-[#EB821D] decoration-2 underline-offset-4 hover:text-[#181D27]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-lg border border-[#D5D7DA] bg-white p-6 shadow-[0_20px_50px_-45px_rgba(24,23,22,0.45)] sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="ghana-name" className={labelClasses}>
            Name <span className="text-[#535862]">*</span>
          </label>
          <input
            id="ghana-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "ghana-name-error" : undefined}
            className={`${inputClasses} ${errors.name ? "border-red-500" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <p id="ghana-name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ghana-email" className={labelClasses}>
            Work email <span className="text-[#535862]">*</span>
          </label>
          <input
            id="ghana-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "ghana-email-error" : undefined}
            className={`${inputClasses} ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p id="ghana-email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ghana-company" className={labelClasses}>
            Company
          </label>
          <input
            id="ghana-company"
            type="text"
            autoComplete="organization"
            placeholder="Your organisation"
            className={inputClasses}
            {...register("company")}
          />
        </div>

        <div>
          <label htmlFor="ghana-interest" className={labelClasses}>
            I&rsquo;m interested in <span className="text-[#535862]">*</span>
          </label>
          <div className="relative">
            <select
              id="ghana-interest"
              aria-invalid={Boolean(errors.interest)}
              aria-describedby={
                errors.interest ? "ghana-interest-error" : undefined
              }
              className={`${inputClasses} appearance-none pr-10 ${
                errors.interest ? "border-red-500" : ""
              }`}
              {...register("interest")}
            >
              <option value="">Select a service</option>
              {GHANA_INTERESTS.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#535862]"
            />
          </div>
          {errors.interest && (
            <p
              id="ghana-interest-error"
              className="mt-1.5 text-xs text-red-600"
            >
              {errors.interest.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ghana-message" className={labelClasses}>
            Message <span className="text-[#535862]">*</span>
          </label>
          <textarea
            id="ghana-message"
            rows={4}
            placeholder="Tell us about the role, timeline and budget, or the support you need."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "ghana-message-error" : undefined}
            className={`${inputClasses} resize-y ${
              errors.message ? "border-red-500" : ""
            }`}
            {...register("message")}
          />
          {errors.message && (
            <p id="ghana-message-error" className="mt-1.5 text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="ghana-privacy"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-[#C8C3C1] text-[#EB821D] accent-[#EB821D] focus:ring-[#EB821D]"
            {...register("agreeToPrivacy")}
          />
          <label
            htmlFor="ghana-privacy"
            className="text-sm leading-relaxed text-[#535862]"
          >
            I agree to the{" "}
            <a
              href={`${MAIN_SITE_URL}/privacy-policy`}
              className="font-medium text-[#535862] underline decoration-[#EB821D] decoration-2 underline-offset-2 hover:text-[#181D27]"
            >
              privacy policy
            </a>
            .
          </label>
        </div>
        {errors.agreeToPrivacy && (
          <p className="text-xs text-red-600">
            {errors.agreeToPrivacy.message}
          </p>
        )}

        {/* Honeypot field for spam bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="ghana-website">Website</label>
          <input
            id="ghana-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {status === "error" && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {feedback}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#EB821D] px-6 py-3.5 text-sm font-semibold text-[#181716] transition-colors duration-200 hover:bg-[#B56314] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          )}
          {isSubmitting ? "Sending message..." : "Send message"}
        </button>

        <p className="text-center text-xs leading-relaxed text-[#535862]">
          We use your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
};

export default GhanaContactForm;
