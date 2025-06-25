"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// Zod validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  howDidYouHear: z.string().min(1, "Please select how you heard about us"),
  serviceInterested: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Please provide a brief description (minimum 10 characters)"),
  agreeToPrivacy: z
    .boolean()
    .refine((val) => val === true, "You must agree to our privacy policy"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const howDidYouHearOptions = [
  "Referral",
  "Google Search",
  "Social Media",
  "Website",
  "Advertisement",
  "Event/Conference",
  "Other",
];

const serviceOptions = [
  "HR Advisory services",
  "Learning & Development",
  "Recruitment Solution",
  "Outsourcing",
  "Digital Solutions",
  "Other",
];

export default function ContactUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHowDidYouHearOpen, setIsHowDidYouHearOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      howDidYouHear: "",
      serviceInterested: "",
      agreeToPrivacy: false,
    },
  });

  const watchHowDidYouHear = watch("howDidYouHear");
  const watchServiceInterested = watch("serviceInterested");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle success - you could show a success message, redirect, etc.
      alert("Thank you for your message! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-stretch justify-center">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex flex-col mx-auto lg:mx-0 w-full max-w-lg"
          >
            <div className="w-full">
              <h1 className="text-2xl lg:text-[30px] font-semibold text-[#181D27] mb-3 leading-tight">
                How Can We Help Your Business?
              </h1>
              <p className="text-[#535862] text-lg mb-6 leading-relaxed">
                Thank you for your interest in our services. Please take a
                moment to fill out the form. A support personnel will get in
                touch with you.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* First Name and Last Name */}
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
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
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
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Email */}
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
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                    Phone number
                  </label>
                  <div className="flex">
                    <select className="px-3 py-3 border border-r-0 rounded-l-lg text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option value="US">US</option>
                      <option value="NG">NG</option>
                      <option value="UK">UK</option>
                    </select>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="flex-1 px-4 py-3 border rounded-r-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* How Did You Hear About Us */}
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                    How Did You Hear About Us?{" "}
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsHowDidYouHearOpen(!isHowDidYouHearOpen)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                        errors.howDidYouHear
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={
                          watchHowDidYouHear
                            ? "text-[#181D27]"
                            : "text-gray-500"
                        }
                      >
                        {watchHowDidYouHear || "Referral"}
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
                    <p className="mt-1 text-sm text-red-500">
                      {errors.howDidYouHear.message}
                    </p>
                  )}
                </div>

                {/* What Service Are You Interested In */}
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                    What Service Are You Interested In{" "}
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsServiceOpen(!isServiceOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                        errors.serviceInterested
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={
                          watchServiceInterested
                            ? "text-[#181D27]"
                            : "text-gray-500"
                        }
                      >
                        {watchServiceInterested || "HR Advisory services"}
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {isServiceOpen && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {serviceOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setValue("serviceInterested", option);
                              setIsServiceOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.serviceInterested && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.serviceInterested.message}
                    </p>
                  )}
                </div>

                {/* Brief Description */}
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-1.5">
                    Brief Description of How We May Be of Help{" "}
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
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    {...register("agreeToPrivacy")}
                    type="checkbox"
                    id="privacy"
                    className="mt-1 w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 checked:bg-orange-500 checked:border-orange-500"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-[#535862] leading-relaxed"
                  >
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
                  <p className="text-sm text-red-500">
                    {errors.agreeToPrivacy.message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  {isSubmitting ? "Sending message..." : "Send message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 hidden lg:block"
          >
            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden">
              <Image
                src="/images/contact-us-image.jpg"
                alt="Contact us - Professional woman at office"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
