"use client";

import { motion } from "framer-motion";
import NewsletterSubscriptionForm from "./newsletter-subscription-form";

export default function CustomerStoriesHero() {
  return (
    <section className="bg-sunset-600 text-white">
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* 1. Testimonials heading */}
          <p className="text-base font-semibold tracking-wide text-amberwood-50">
            Testimonials
          </p>

          {/* 2. Flexed row - Client Testimonials + Subscribe text (desktop) or just Client Testimonials (mobile) */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            <h1 className="text-4xl lg:text-5xl font-bold font-plex leading-tight">
              Client Testimonials
            </h1>

            {/* Subscribe text - only on desktop */}
            <p className="hidden lg:block text-lg leading-relaxed lg:max-w-md text-amberwood-50">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>
          </div>

          {/* 3. Form and content positioned below the row */}
          <div className="space-y-4">
            {/* Desktop Form - positioned first */}
            <div className="hidden lg:block max-w-md">
              <NewsletterSubscriptionForm source="customer_stories_page" />
            </div>

            {/* Subscribe text - only on mobile */}
            <p className="lg:hidden text-lg leading-relaxed text-amberwood-50">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>

            {/* Mobile Form - positioned last */}
            <div className="lg:hidden max-w-md">
              <NewsletterSubscriptionForm source="customer_stories_page" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
