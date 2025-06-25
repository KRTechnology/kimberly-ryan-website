"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// Zod validation schema
const strategicLeadershipSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organization: z.string().min(1, "Organization is required"),
  jobRole: z.string().optional(),
  howDidYouHear: z
    .string()
    .min(1, "Please select how you heard about this event"),
  receiveInfo: z.string().min(1, "Please select your preferred contact method"),
  selectPlan: z.string().min(1, "Please select a plan"),
  payingForAccommodation: z
    .string()
    .min(1, "Please select accommodation payment option"),
  paymentOption: z.string().min(1, "Please select a payment option"),
});

type StrategicLeadershipFormData = z.infer<typeof strategicLeadershipSchema>;

const howDidYouHearOptions = [
  "Social Media",
  "Website",
  "Email",
  "Referral",
  "Advertisement",
  "Event/Conference",
  "Search Engine",
  "Other",
];

const receiveInfoOptions = ["Phone call", "Email", "SMS", "WhatsApp"];

const planOptions = ["Early bird", "Regular", "Premium", "Corporate"];

const accommodationOptions = ["Yes", "No"];

const paymentOptions = ["Credit Card", "Bank Transfer", "PayPal", "Invoice"];

export default function StrategicLeadershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHowDidYouHearOpen, setIsHowDidYouHearOpen] = useState(false);
  const [isReceiveInfoOpen, setIsReceiveInfoOpen] = useState(false);
  const [isSelectPlanOpen, setIsSelectPlanOpen] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);
  const [isPaymentOptionOpen, setIsPaymentOptionOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StrategicLeadershipFormData>({
    resolver: zodResolver(strategicLeadershipSchema),
    defaultValues: {
      howDidYouHear: "",
      receiveInfo: "",
      selectPlan: "",
      payingForAccommodation: "",
      paymentOption: "",
    },
  });

  const watchHowDidYouHear = watch("howDidYouHear");
  const watchReceiveInfo = watch("receiveInfo");
  const watchSelectPlan = watch("selectPlan");
  const watchAccommodation = watch("payingForAccommodation");
  const watchPaymentOption = watch("paymentOption");

  const onSubmit = async (data: StrategicLeadershipFormData) => {
    setIsSubmitting(true);

    try {
      console.log("Strategic Leadership Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Registration successful! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-semibold text-[#181D27] mb-2">
                Strategic Leadership Programme
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name and Last Name - Desktop */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-2">
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
                  <label className="block text-sm font-medium text-[#181D27] mb-2">
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

              {/* Full Name - Mobile */}
              <div className="md:hidden">
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Full Name <span className="text-orange-500">*</span>
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

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Email <span className="text-orange-500">*</span>
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

              {/* Phone Number and Organization - Desktop */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-2">
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

                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-2">
                    Organization <span className="text-orange-500">*</span>
                  </label>
                  <input
                    {...register("organization")}
                    type="text"
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      errors.organization ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.organization && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.organization.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number - Mobile */}
              <div className="md:hidden">
                <label className="block text-sm font-medium text-[#181D27] mb-2">
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

              {/* Organization - Mobile */}
              <div className="md:hidden">
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Organization <span className="text-orange-500">*</span>
                </label>
                <input
                  {...register("organization")}
                  type="text"
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                    errors.organization ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>

              {/* Your Job Role */}
              <div>
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Your Job Role
                </label>
                <input
                  {...register("jobRole")}
                  type="text"
                  placeholder="Input your role"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* How did you hear about this event? */}
              <div>
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  How did you hear about this event?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsHowDidYouHearOpen(!isHowDidYouHearOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      errors.howDidYouHear
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <span
                      className={
                        watchHowDidYouHear ? "text-[#181D27]" : "text-gray-500"
                      }
                    >
                      {watchHowDidYouHear ||
                        "Select how you heard about this event"}
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

              {/* How would you like to receive info about this event? */}
              <div>
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  How would you like to receive info about this event?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsReceiveInfoOpen(!isReceiveInfoOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      errors.receiveInfo ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <span
                      className={
                        watchReceiveInfo ? "text-[#181D27]" : "text-gray-500"
                      }
                    >
                      {watchReceiveInfo || "Phone call"}
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {isReceiveInfoOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {receiveInfoOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setValue("receiveInfo", option);
                            setIsReceiveInfoOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.receiveInfo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.receiveInfo.message}
                  </p>
                )}
              </div>

              {/* Select Plan and Will you be paying for accommodation? - Desktop */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-2">
                    Select Plan
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSelectPlanOpen(!isSelectPlanOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                        errors.selectPlan ? "border-red-500" : "border-gray-200"
                      }`}
                    >
                      <span
                        className={
                          watchSelectPlan ? "text-[#181D27]" : "text-gray-500"
                        }
                      >
                        {watchSelectPlan || "Early bird"}
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {isSelectPlanOpen && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {planOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setValue("selectPlan", option);
                              setIsSelectPlanOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.selectPlan && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.selectPlan.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#181D27] mb-2">
                    Will you be paying for accommodation?
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsAccommodationOpen(!isAccommodationOpen)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                        errors.payingForAccommodation
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={
                          watchAccommodation
                            ? "text-[#181D27]"
                            : "text-gray-500"
                        }
                      >
                        {watchAccommodation || "No"}
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {isAccommodationOpen && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {accommodationOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setValue("payingForAccommodation", option);
                              setIsAccommodationOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.payingForAccommodation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.payingForAccommodation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Select Plan - Mobile */}
              <div className="md:hidden">
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Select Plan
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSelectPlanOpen(!isSelectPlanOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      errors.selectPlan ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <span
                      className={
                        watchSelectPlan ? "text-[#181D27]" : "text-gray-500"
                      }
                    >
                      {watchSelectPlan || "Early bird"}
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {isSelectPlanOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {planOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setValue("selectPlan", option);
                            setIsSelectPlanOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.selectPlan && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.selectPlan.message}
                  </p>
                )}
              </div>

              {/* Will you be paying for accommodation? - Mobile */}
              <div className="md:hidden">
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Will you be paying for accommodation?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsAccommodationOpen(!isAccommodationOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      errors.payingForAccommodation
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <span
                      className={
                        watchAccommodation ? "text-[#181D27]" : "text-gray-500"
                      }
                    >
                      {watchAccommodation || "No"}
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {isAccommodationOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {accommodationOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setValue("payingForAccommodation", option);
                            setIsAccommodationOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.payingForAccommodation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.payingForAccommodation.message}
                  </p>
                )}
              </div>

              {/* Payment Option */}
              <div>
                <label className="block text-sm font-medium text-[#181D27] mb-2">
                  Payment Option
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsPaymentOptionOpen(!isPaymentOptionOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      errors.paymentOption
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <span
                      className={
                        watchPaymentOption ? "text-[#181D27]" : "text-gray-500"
                      }
                    >
                      {watchPaymentOption || "No"}
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {isPaymentOptionOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {paymentOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setValue("paymentOption", option);
                            setIsPaymentOptionOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.paymentOption && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.paymentOption.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-lg mt-8"
              >
                {isSubmitting ? "Processing..." : "Complete Registration"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
