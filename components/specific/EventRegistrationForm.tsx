// components/specific/EventRegistrationForm.tsx
// This is a "use client" component — drop it into components/specific/.
// It is used by the dynamic page at app/(site)/events/[slug]/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Zod schema — identical structure to ContactUsForm ──────────────────────
const registrationSchema = z.object({
  firstName:      z.string().min(1, "First name is required"),
  lastName:       z.string().min(1, "Last name is required"),
  email:          z.string().email("Please enter a valid email address"),
  phone:          z.string().optional(),
  organization:   z.string().min(1, "Organization is required"),
  designation:    z.string().min(1, "Designation is required"),
  howDidYouHear:  z.string().min(1, "Please select how you heard about us"),
  message:        z.string().min(10, "Please provide a brief description (minimum 10 characters)"),
  agreeToPrivacy: z.boolean().refine((val) => val === true, "You must agree to our privacy policy"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const howDidYouHearOptions = [
  "Referral",
  "Google Search",
  "Social Media",
  "Website",
  "Advertisement",
  "Event/Conference",
  "Other",
];

// ── Props passed in from the server page ───────────────────────────────────
interface EventRegistrationFormProps {
  eventName:        string;
  eventSlug:        string;
  eventDate?:       string;
  eventLocation?:   string;
  eventDescription?: string;
  coverImageUrl?:   string;
}

export default function EventRegistrationForm({
  eventName,
  eventSlug,
  eventDate,
  eventLocation,
  eventDescription,
  coverImageUrl,
}: EventRegistrationFormProps) {
  const [isSubmitting,          setIsSubmitting]          = useState(false);
  const [isHowDidYouHearOpen,   setIsHowDidYouHearOpen]   = useState(false);
  const [submitStatus,          setSubmitStatus]          = useState<"idle" | "success" | "error">("idle");
  const [submitMessage,         setSubmitMessage]         = useState("");
  const [showSuccessScreen,     setShowSuccessScreen]     = useState(false);

  const howDidYouHearRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      howDidYouHear:  "",
      agreeToPrivacy: false,
    },
  });

  const watchHowDidYouHear = watch("howDidYouHear");

  // Click-outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        howDidYouHearRef.current &&
        !howDidYouHearRef.current.contains(event.target as Node)
      ) {
        setIsHowDidYouHearOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMakeAnotherEnquiry = () => {
    reset();
    setShowSuccessScreen(false);
    setSubmitStatus("idle");
    setSubmitMessage("");
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/event-registration", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...data, eventSlug }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage(result.message);
        setShowSuccessScreen(true);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.error || "There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* ── Event header ── */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[2px] text-orange-500">
            Event Registration
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#181D27] leading-tight mb-4">
            {eventName}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#535862]">
            {eventDate && (
              <span className="flex items-center gap-1.5">
                📅{" "}
                {new Date(eventDate).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day:     "numeric",
                  month:   "long",
                  year:    "numeric",
                })}
              </span>
            )}
            {eventLocation && (
              <span className="flex items-center gap-1.5">
                📍 {eventLocation}
              </span>
            )}
          </div>
          {eventDescription && (
            <p className="mt-4 max-w-2xl mx-auto text-[#535862] leading-relaxed">
              {eventDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-stretch justify-center">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex flex-col mx-auto lg:mx-0 w-full max-w-lg"
          >
            <div className="w-full">
              {!showSuccessScreen ? (
                <>
                  <h2 className="text-2xl lg:text-[26px] font-semibold text-[#181D27] mb-3 leading-tight">
                    Register for this Event
                  </h2>
                  <p className="text-[#535862] text-base mb-6 leading-relaxed">
                    Fill in your details below and we&apos;ll confirm your registration shortly.
                  </p>

                  <AnimatePresence>
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-lg flex items-center gap-3 mb-6 bg-red-50 border border-red-200 text-red-800"
                      >
                        <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />
                        <span className="text-sm font-medium">{submitMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl lg:text-[26px] font-semibold text-[#181D27] mb-3 leading-tight">
                    Registration Confirmed!
                  </h2>
                  <p className="text-[#535862] text-base mb-4 leading-relaxed">
                    {submitMessage}
                  </p>
                  <p className="text-[#535862] text-sm mb-8 leading-relaxed">
                    We&apos;ll be in touch with event details and joining instructions.
                  </p>
                  <button
                    onClick={handleMakeAnotherEnquiry}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                  >
                    <RefreshCw size={16} />
                    Register Another Person
                  </button>
                </motion.div>
              )}

              {!showSuccessScreen && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                        First name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        {...register("firstName")}
                        type="text"
                        placeholder="First name"
                        className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                          errors.firstName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                        Last name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last name"
                        className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                          errors.lastName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                      Company Email <span className="text-orange-500">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                      Phone number
                    </label>
                    <div className="flex">
                      <select className="px-3 py-3 border border-r-0 rounded-l-lg text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="NG">NG</option>
                        <option value="US">US</option>
                        <option value="UK">UK</option>
                      </select>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+234 (0) 000 0000"
                        className="flex-1 px-4 py-3 border rounded-r-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Organization & Designation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                        Organization <span className="text-orange-500">*</span>
                      </label>
                      <input
                        {...register("organization")}
                        type="text"
                        placeholder="Your company name"
                        className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                          errors.organization ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.organization && (
                        <p className="mt-1 text-sm text-red-500">{errors.organization.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                        Designation <span className="text-orange-500">*</span>
                      </label>
                      <input
                        {...register("designation")}
                        type="text"
                        placeholder="Your job title"
                        className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                          errors.designation ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.designation && (
                        <p className="mt-1 text-sm text-red-500">{errors.designation.message}</p>
                      )}
                    </div>
                  </div>

                  {/* How Did You Hear About Us */}
                  <div>
                    <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                      How Did You Hear About This Event?{" "}
                      <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative" ref={howDidYouHearRef}>
                      <button
                        type="button"
                        onClick={() => setIsHowDidYouHearOpen(!isHowDidYouHearOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                          errors.howDidYouHear ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <span className={watchHowDidYouHear ? "text-[#181D27]" : "text-gray-500"}>
                          {watchHowDidYouHear || "Select an option"}
                        </span>
                        <ChevronDown size={16} className="text-gray-400" />
                      </button>
                      {isHowDidYouHearOpen && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          {howDidYouHearOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setValue("howDidYouHear", option);
                                setIsHowDidYouHearOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.howDidYouHear && (
                      <p className="mt-1 text-sm text-red-500">{errors.howDidYouHear.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                      Anything you&apos;d like us to know?{" "}
                      <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Leave us a message..."
                      className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 resize-none ${
                        errors.message ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Privacy */}
                  <div className="flex items-start space-x-3">
                    <input
                      {...register("agreeToPrivacy")}
                      type="checkbox"
                      id="privacy"
                      className="mt-1 w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 checked:bg-orange-500 checked:border-orange-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-[#535862] leading-relaxed">
                      You agree to our friendly{" "}
                      <a
                        href="/privacy-policy"
                        className="text-[#181D27] underline hover:text-orange-500 transition-colors duration-200"
                      >
                        privacy policy
                      </a>
                      .
                    </label>
                  </div>
                  {errors.agreeToPrivacy && (
                    <p className="text-sm text-red-500">{errors.agreeToPrivacy.message}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    {isSubmitting && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    {isSubmitting
                      ? "Submitting..."
                      : submitStatus === "success"
                        ? "Registered!"
                        : "Register Now"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Image / event card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 hidden lg:block"
          >
            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
              {coverImageUrl ? (
                <Image
                  src={coverImageUrl}
                  alt={eventName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span className="text-sm font-medium">Event image</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
