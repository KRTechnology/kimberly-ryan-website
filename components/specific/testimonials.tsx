"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Testimonials = () => {
  const testimonial = {
    quote:
      "Working with Kimberly Ryan was a delight. I especially liked their professional yet understanding/flexible way of conducting business. Kudos!",
    author: "Victor Kareem",
    title: "Head, Business Operations, Golden OX",
  };

  return (
    <section className="bg-[#EDECEB] py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Testimonial Container with header inside */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-slate-500 rounded-2xl p-8 md:p-12 text-center"
          >
            {/* Header - Inside the dark container */}
            <h2 className="text-sunset-200  font-semibold font-plex text-lg md:text-xl mb-8 md:mb-12">
              What Our Clients Say
            </h2>

            {/* Quote */}
            <blockquote className="text-slate-50 font-medium font-plex text-2xl md:text-4xl leading-relaxed mb-8 md:mb-12">
              "{testimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-slate-50 font-semibold font-plex text-base mb-2">
                {testimonial.author}
              </h3>
              <p className="text-slate-50 font-inter text-sm opacity-80">
                {testimonial.title}
              </p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link
                href="/about/customer-stories"
                className="inline-flex items-center gap-2 px-8 py-3 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 text-lg font-semibold"
              >
                View Other Customer Stories
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
