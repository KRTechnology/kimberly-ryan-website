"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

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
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Newsletter subscription:", data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Subscription error:", error);
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
                    className="px-8 py-3 h-12 bg-sunset-200 text-white rounded-lg hover:bg-sunset-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-semibold whitespace-nowrap flex-shrink-0"
                  >
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
