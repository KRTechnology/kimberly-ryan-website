"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/types/sanity";

interface CustomerTestimonialsGridProps {
  testimonials: Testimonial[];
}

const ITEMS_PER_PAGE = 9;

export default function CustomerTestimonialsGrid({
  testimonials,
}: CustomerTestimonialsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter out inactive testimonials if any exist in the data
  const activeTestimonials = testimonials.filter(
    (testimonial) => testimonial.active
  );

  const totalPages = Math.ceil(activeTestimonials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTestimonials = activeTestimonials.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of testimonials section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Show loading state if no testimonials are provided
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">
              No client testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-white p-8 rounded-lg"
              style={{ backgroundColor: "#363433" }}
            >
              <div className="space-y-6">
                <p className="text-sm font-semibold text-amberwood-50 text-center">
                  What Our Clients Say
                </p>

                <blockquote className="text-lg text-slate-50 leading-relaxed text-center">
                  "{testimonial.quote}"
                </blockquote>

                <div className="text-center space-y-1">
                  <p className="font-semibold text-slate-50">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-slate-50 font-inter">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>

                {/* Optional: Display service type or rating if available */}
                {testimonial.serviceType && (
                  <div className="text-center">
                    <span className="inline-block bg-amberwood-100 text-amberwood-800 text-xs px-2 py-1 rounded-full">
                      {testimonial.serviceType
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} ({activeTestimonials.length}{" "}
              testimonials)
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
