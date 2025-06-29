"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

const subscriptionSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const NewsletterSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "duplicate"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          source: "website_footer",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage(result.message);
        setIsSubmitted(true);
        reset();
      } else {
        if (result.error === "duplicate") {
          setSubmitStatus("duplicate");
          setSubmitMessage(result.message);
        } else {
          setSubmitStatus("error");
          setSubmitMessage(
            result.error || "Something went wrong. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-slate-500 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Thank you for subscribing!
            </h2>
            <p className="text-slate-200 mb-6">
              You'll receive our newsletter with valuable insights and tips.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sunset-200 hover:text-sunset-100 transition-colors"
            >
              Subscribe another email
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-slate-500 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                Subscribe to our Newsletter
              </h2>
              <p className="text-amberwood-50 text-base md:text-lg leading-relaxed font-inter">
                Ready to take your business to the next level? Subscribe to our
                monthly newsletter and get insights, tips and keys that can help
                you succeed in your business.
              </p>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-[6px]">
                {/* Email Input and Button - Desktop: side by side, Mobile: stacked */}
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-lg border-2 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sunset-200 transition-all ${
                        errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-transparent bg-white"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 h-12 bg-sunset-200 text-white rounded-lg hover:bg-sunset-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-semibold whitespace-nowrap flex-shrink-0 flex items-center justify-center gap-2"
                  >
                    {isSubmitting && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>

                {/* Privacy Policy Text */}
                <p className="text-amberwood-50 text-sm">
                  We care about your data in our{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-slate-200 transition-colors"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </form>

              {/* Status Messages */}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-500/30 flex items-center gap-2"
                >
                  <AlertTriangle
                    size={16}
                    className="text-red-400 flex-shrink-0"
                  />
                  <span className="text-red-200 text-sm">{submitMessage}</span>
                </motion.div>
              )}

              {submitStatus === "duplicate" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg bg-yellow-900/20 border border-yellow-500/30 flex items-center gap-2"
                >
                  <CheckCircle
                    size={16}
                    className="text-yellow-400 flex-shrink-0"
                  />
                  <span className="text-yellow-200 text-sm">
                    {submitMessage}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
