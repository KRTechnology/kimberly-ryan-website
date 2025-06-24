"use client";

import { motion } from "framer-motion";
import NewsletterSubscriptionForm from "./newsletter-subscription-form";

export default function BlogsHero() {
  return (
    <section className="bg-[#FAFAFA] text-[#181D27]">
      <div className="container mx-auto px-4 lg:px-8 pt-[110px] pb-16 lg:pt-[120px] lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Main Insights heading */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            <h1 className="text-[36px] lg:text-[48px] font-semibold font-inter leading-tight text-[#181D27]">
              Insights
            </h1>

            {/* Subscribe text - only on desktop */}
            <p className="hidden lg:block text-[20px] leading-relaxed lg:max-w-md text-[#535862]">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>
          </div>

          {/* 3. Form and content positioned below the row */}
          <div className="space-y-4">
            {/* Desktop Form - positioned first */}
            <div className="hidden lg:block max-w-md">
              <NewsletterSubscriptionForm privacyTextColor="text-[#535862]" />
            </div>

            {/* Subscribe text - only on mobile */}
            <p className="lg:hidden text-[18px] leading-relaxed text-[#535862]">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>

            {/* Mobile Form - positioned last */}
            <div className="lg:hidden max-w-md">
              <NewsletterSubscriptionForm privacyTextColor="text-[#535862]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
