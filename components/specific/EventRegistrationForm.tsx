// components/specific/EventRegistrationForm.tsx

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  ExternalLink,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Brochure, Publication, Webinar } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

// ── Zod schema ──────────────────────────────────────────────────────────────
const registrationSchema = z.object({
  firstName:             z.string().min(1, "First name is required"),
  lastName:              z.string().min(1, "Last name is required"),
  email:                 z.string().email("Please enter a valid email address"),
  phone:                 z.string().optional(),
  organization:          z.string().min(1, "Organization is required"),
  designation:           z.string().min(1, "Designation is required"),
  howDidYouHear:         z.string().optional(),
  peopleManagementAreas: z.array(z.string()).min(1, "Please select at least one area"),
  otherPeopleManagement: z.string().optional(),
  consultationInterest:  z.string().min(1, "Please select an option"),
  agreeToPrivacy:        z.boolean().refine((val) => val === true, "You must agree to our privacy policy"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

// ── Props ───────────────────────────────────────────────────────────────────
interface EventRegistrationFormProps {
  eventName:         string;
  eventSlug:         string;
  eventDate?:        string;
  eventLocation?:    string;
  eventDescription?: string;
  coverImageUrl?:    string;
  brochures?:        Brochure[];
  publications?:     Publication[];
  webinars?:         Webinar[];
}

// ── Brochure download helper ─────────────────────────────────────────────────
function handleBrochureDownload(brochure: Brochure) {
  if (!brochure?.pdfFile?.asset?.url) {
    alert("Brochure file is not available for download.");
    return;
  }
  const pdfUrl = brochure.pdfFile.asset.url;
  const newWindow = window.open(pdfUrl, "_blank");
  if (!newWindow || newWindow.closed) {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download =
      brochure.pdfFile.asset.originalFilename ||
      `${brochure.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}-brochure.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// ── Social links ─────────────────────────────────────────────────────────────
const socialLinks = [
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/company/kimberly-ryan/",
    color: "#0A66C2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href:  "https://www.facebook.com/kimberlyryanlimited",
    color: "#1877F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href:  "https://x.com/KRyanlimited",
    color: "#000000",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href:  "https://www.instagram.com/kimberlyryanlimited/",
    color: "#E1306C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href:  "https://www.youtube.com/@KimberlyRyanLimited",
    color: "#FF0000",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  {
    label: "Whatsapp",
    href:  "https://whatsapp.com/channel/0029VbDdBL459PwOMsbvtH2Vw",
    color: "#25D366",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.75.75 0 0 0 .921.921l5.627-1.47A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.073-1.387l-.361-.214-3.757.982.999-3.648-.235-.375A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>    
    ),
  },
];

const peopleManagementOptions = [
  "Talent attraction and retention",
  "Employee engagement and experience",
  "Leadership development",
  "Performance management",
  "Learning and capability development",
  "Rewards and compensation",
  "Workforce planning and productivity",
  "HR technology and transformation",
  "Organisational culture",
  "Employee of record (EOR) / Outsourcing",
  "Others - please specify",
];

const consultationInterestOptions = [
  "Yes, I'd like to schedule a conversation",
  "I'd like to learn more",
  "I'd like to explore relevant solutions and insights",
];

// ── Main component ────────────────────────────────────────────────────────────
export default function EventRegistrationForm({
  eventName,
  eventSlug,
  eventDate,
  eventLocation,
  eventDescription,
  coverImageUrl,
  brochures = [],
  publications = [],
  webinars = [],
}: EventRegistrationFormProps) {
  const [isSubmitting,      setIsSubmitting]      = useState(false);
  const [submitStatus,      setSubmitStatus]      = useState<"idle" | "success" | "error">("idle");
  const [submitMessage,     setSubmitMessage]     = useState("");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const resourcesRef = useRef<HTMLElement>(null);

  const scrollToResources = () => {
    resourcesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      howDidYouHear:         "",
      agreeToPrivacy:        false,
      peopleManagementAreas: [],
      otherPeopleManagement: "",
      consultationInterest:  "",
    },
  });

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
        setTimeout(() => scrollToResources(), 400);
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

  const activeBrochures    = brochures.filter((b) => b.active);
  const activePublications = publications.filter((p) => p.active);
  const activeWebinars     = webinars.filter((w) => w.active);

  return (
    <>
      {/* ── Form section ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Event header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#181D27] leading-tight mb-4">
              {eventName}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#535862]">
              {eventDate && (
                <span className="flex items-center gap-1.5">
                  📅{" "}
                  {new Date(eventDate).toLocaleDateString("en-GB", {
                    weekday: "long", day: "numeric",
                    month:   "long", year: "numeric",
                  })}
                </span>
              )}
              {eventLocation && (
                <span className="flex items-center gap-1.5">📍 {eventLocation}</span>
              )}
            </div>
            {eventDescription && (
              <p className="mt-4 max-w-2xl mx-auto text-[#535862] leading-relaxed">
                {eventDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-stretch justify-center">

            {/* Form */}
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
                      How Can We Assist Your Business?
                    </h2>
                    <p className="text-[#535862] text-base mb-6 leading-relaxed">
                      Thank you for your interest in our services.
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
                    className="text-center py-8"
                  >
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl lg:text-[26px] font-semibold text-[#181D27] mb-3 leading-tight">
                      Submission Confirmed!
                    </h2>
                    <p className="text-[#535862] text-base mb-4 leading-relaxed">
                      {submitMessage}
                    </p>
                    <p className="text-[#535862] text-sm mb-8 leading-relaxed">
                      While you wait to hear from us, explore our brochures, webinars and insights below.
                    </p>
                    <button
                      onClick={scrollToResources}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm"
                    >
                      Explore Resources
                      <ChevronDown size={16} />
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
                          className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${errors.firstName ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                          Last name <span className="text-orange-500">*</span>
                        </label>
                        <input
                          {...register("lastName")}
                          type="text"
                          placeholder="Last name"
                          className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${errors.lastName ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
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
                        className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
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
                          className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${errors.organization ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.organization && <p className="mt-1 text-sm text-red-500">{errors.organization.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                          Designation <span className="text-orange-500">*</span>
                        </label>
                        <input
                          {...register("designation")}
                          type="text"
                          placeholder="Your job title"
                          className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${errors.designation ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.designation && <p className="mt-1 text-sm text-red-500">{errors.designation.message}</p>}
                      </div>
                    </div>

                    {/* People management areas */}
                    <div>
                      <label className="block text-sm font-medium text-[#181D27] mb-2">
                        Which areas of people management are currently most relevant to you?{" "}
                        <span className="text-orange-500">*</span>
                      </label>
                      <p className="text-xs text-[#535862] mb-3">Select all that apply.</p>
                      <div className="flex flex-col gap-2">
                        {peopleManagementOptions.map((option) => (
                          <label key={option} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              value={option}
                              {...register("peopleManagementAreas")}
                              className="mt-0.5 w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 checked:bg-orange-500 checked:border-orange-500 flex-shrink-0"
                            />
                            <span className="text-sm text-[#535862] group-hover:text-[#181D27] transition-colors duration-200">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.peopleManagementAreas && (
                        <p className="mt-2 text-sm text-red-500">{errors.peopleManagementAreas.message}</p>
                      )}
                    </div>

                    {/* Other - please specify */}
                    {watch("peopleManagementAreas")?.includes("Others - please specify") && (
                      <div>
                        <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                          Please specify
                        </label>
                        <input
                          {...register("otherPeopleManagement")}
                          type="text"
                          placeholder="Please describe..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                    )}

                    {/* Consultation interest */}
                    <div>
                      <label className="block text-sm font-medium text-[#181D27] mb-3">
                        Would you be interested in a conversation with our Consultants about your people priorities?{" "}
                        <span className="text-orange-500">*</span>
                      </label>
                      <div className="flex flex-col gap-2">
                        {consultationInterestOptions.map((option) => (
                          <label key={option} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              value={option}
                              {...register("consultationInterest")}
                              className="mt-0.5 w-4 h-4 text-orange-500 bg-white border-gray-300 focus:ring-orange-500 focus:ring-2 checked:bg-orange-500 checked:border-orange-500 flex-shrink-0"
                            />
                            <span className="text-sm text-[#535862] group-hover:text-[#181D27] transition-colors duration-200">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.consultationInterest && (
                        <p className="mt-2 text-sm text-red-500">{errors.consultationInterest.message}</p>
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
                        <a href="/privacy-policy" className="text-[#181D27] underline hover:text-orange-500 transition-colors duration-200">
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
                          ? "Connected!"
                          : "Connect"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Cover image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 hidden lg:block"
            >
              <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                {coverImageUrl ? (
                  <Image src={coverImageUrl} alt={eventName} fill className="object-cover" priority />
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

      {/* ══════════════════════════════════════════════════════
          RESOURCES SECTION
      ══════════════════════════════════════════════════════ */}
      <section ref={resourcesRef} className="bg-[#3A3530] py-20 px-4 lg:px-8">
        <div className="container mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#E87722]">
              Resources
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Everything You Need, In One Place
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
              Explore our training brochures, webinars, white papers, and connect with us across our social channels.
            </p>
          </div>

          {/* ── Brochures ── */}
          {activeBrochures.length > 0 && (
            <div className="mb-16">
              <h3 className="text-base font-semibold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                Training Brochures
                <span className="h-px flex-1 bg-white/10" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {activeBrochures.map((brochure) => (
                  <motion.div
                    key={brochure._id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#E87722]/50 hover:shadow-[0_8px_32px_rgba(232,119,34,0.2)] transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden bg-white/10 flex-shrink-0">
                      {brochure.coverImage ? (
                        <Image
                          src={urlFor(brochure.coverImage).width(400).height(280).url()}
                          alt={brochure.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30">
                          <FileText size={36} />
                          <span className="text-xs">Brochure</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-[#E87722] text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                        {brochure.year}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-xs font-semibold text-white leading-snug line-clamp-2 mb-1 flex-1">
                        {brochure.title}
                      </p>
                      <p className="text-[0.65rem] text-white/40 capitalize mb-4">
                        {brochure.category?.replace(/_/g, " ")}
                      </p>
                      <button
                        onClick={() => handleBrochureDownload(brochure)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E87722] text-white rounded-lg text-xs font-semibold hover:bg-[#F5A44A] transition-colors duration-200"
                      >
                        <Download size={13} />
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Webinars ── */}
          {activeWebinars.length > 0 && (
            <div className="mb-16">
              <h3 className="text-base font-semibold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                Webinar Series
                <span className="h-px flex-1 bg-white/10" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {activeWebinars.map((webinar) => (
                  <motion.div
                    key={webinar._id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#E87722]/50 hover:shadow-[0_8px_32px_rgba(232,119,34,0.2)] transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-52 overflow-hidden bg-white/10 flex-shrink-0">
                      {webinar.image ? (
                        <Image
                          src={urlFor(webinar.image).width(400).height(280).url()}
                          alt={webinar.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30">
                          <PlayCircle size={36} />
                          <span className="text-xs">Webinar</span>
                        </div>
                      )}
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-[#E87722] flex items-center justify-center shadow-lg">
                          <PlayCircle size={24} className="text-white" />
                        </div>
                      </div>
                      {webinar.category && (
                        <span className="absolute top-3 left-3 bg-[#E87722] text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full capitalize">
                          {webinar.category.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-xs font-semibold text-white leading-snug line-clamp-2 mb-1 flex-1">
                        {webinar.title}
                      </p>
                      {webinar.presenter && (
                        <p className="text-[0.65rem] text-white/40 mb-4">{webinar.presenter}</p>
                      )}
                      <div className="flex flex-col gap-2">
                        {webinar.webinarUrl && (
                          <a
                            href={webinar.webinarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E87722] text-white rounded-lg text-xs font-semibold hover:bg-[#F5A44A] transition-colors duration-200"
                          >
                            <PlayCircle size={13} />
                            Watch
                          </a>
                        )}
                        {webinar.trainingSlidesPdf?.asset?.url && (
                          <a
                            href={webinar.trainingSlidesPdf.asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/20 transition-colors duration-200"
                          >
                            <Download size={13} />
                            Slides
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Publications ── */}
          {activePublications.length > 0 && (
            <div className="mb-16">
              <h3 className="text-base font-semibold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                White Papers &amp; Publications
                <span className="h-px flex-1 bg-white/10" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {activePublications.map((pub) => (
                  <motion.div
                    key={pub._id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#E87722]/50 hover:shadow-[0_8px_32px_rgba(232,119,34,0.2)] transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden bg-white/10 flex-shrink-0">
                      {pub.image ? (
                        <Image
                          src={urlFor(pub.image).width(400).height(280).url()}
                          alt={pub.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30">
                          <FileText size={36} />
                          <span className="text-xs">Publication</span>
                        </div>
                      )}
                      {pub.category && (
                        <span className="absolute top-3 left-3 bg-[#E87722] text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full capitalize">
                          {pub.category.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-xs font-semibold text-white leading-snug line-clamp-2 mb-1 flex-1">
                        {pub.title}
                      </p>
                      {pub.author && (
                        <p className="text-[0.65rem] text-white/40 mb-4">{pub.author}</p>
                      )}
                      {pub.pdfFile?.asset?.url ? (
                        <a
                          href={pub.pdfFile.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E87722] text-white rounded-lg text-xs font-semibold hover:bg-[#F5A44A] transition-colors duration-200"
                        >
                          <Download size={13} />
                          Download
                        </a>
                      ) : (
                        <div className="w-full py-2.5 bg-white/10 text-white/30 rounded-lg text-xs font-semibold text-center">
                          Coming soon
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── KRSR + Social + Website row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

            {/* KRSR card */}
            <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#E87722]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#E87722]/20 flex items-center justify-center mb-4">
                <span className="text-xl">🌍</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Kimberly Ryan Social Responsibility</h4>
              <p className="text-white/50 text-xs leading-relaxed mb-5">
                Discover how we are shaping careers and building futures through the KRSR initiative.
              </p>
              <Link
                href="/about/krsr"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E87722] text-white rounded-lg text-xs font-bold hover:bg-[#F5A44A] transition-colors duration-200"
              >
                Learn About KRSR
                <ExternalLink size={12} />
              </Link>
            </div>

            {/* Social media */}
            <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm mb-4 text-center">Follow Us</h4>
              <div className="flex flex-col gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <span style={{ color: s.color }} className="transition-transform duration-200 group-hover:scale-110 flex-shrink-0">
                      {s.icon}
                    </span>
                    <span className="text-sm font-semibold text-white">{s.label}</span>
                    <ExternalLink size={11} className="text-white/30 group-hover:text-white/60 transition-colors duration-200 ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* Visit website CTA */}
            <div className="md:col-span-1 bg-[#E87722] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-white font-bold text-lg mb-2 leading-tight">
                Explore Our Full Range of Services
              </h4>
              <p className="text-white/80 text-xs leading-relaxed mb-6">
                HR Advisory, Recruitment, Learning &amp; Development, Outsourcing and Digital Solutions — all in one place.
              </p>
              <a
                href="https://www.kimberly-ryan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#E87722] rounded-xl text-sm font-bold hover:bg-white/90 transition-colors duration-200 shadow-lg"
              >
                Visit Kimberly Ryan
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
