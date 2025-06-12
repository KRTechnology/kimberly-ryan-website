"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
}

// Sample testimonials data - you can replace this with real data
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The training was completed satisfactorily in a result drive manner and in accordance with the Scope of Work and Terms of Engagement.",
    author: "Patrick Mbagwu",
    position: "Head, Human Resources",
    company: "Parallex Bank",
  },
  {
    id: 2,
    quote:
      "Working with Kimberly Ryan was a delight. I especially liked their professional yet understanding/flexible way of conducting business. Kudos!",
    author: "Victor Kareem",
    position: "Head, Business Operations",
    company: "Golden OX",
  },
  {
    id: 3,
    quote: "Seamless working experience through the entire process.",
    author: "Nkemjika Ibeawuchi",
    position: "Assistant Manager, Human Resources",
    company: "Society for Family Health",
  },
  {
    id: 4,
    quote:
      "The Kimberly Ryan team was very professional and are highly recommended for the quality of their service.",
    author: "Lilian Ilenikhena",
    position: "Project Manager",
    company: "Airband Wireless Limited",
  },
  {
    id: 5,
    quote:
      "I recommend Kimberly Ryan to meet your recruitment needs team was very professional and are highly recommended for the quality of their service.",
    author: "Johnson Odede",
    position: "Head of Finance and Administration",
    company: "Crown Agents Nigeria Limited",
  },
  {
    id: 6,
    quote:
      "Kimberly Ryan Limited has not disappointed us in the provision of recruitment/consultancy services. It is without reservations that we wholeheartedly recommend Kimberly Ryan Limited for your recruitment needs.",
    author: "Tari Maikudi",
    position: "Human Capital Unit",
    company: "Acquila Leasing Ltd.",
  },
  {
    id: 7,
    quote:
      "I believe that their creativity and knowledge in delivering quality trainings will help deliver the needed value your organization seeks to achieve with your planned workshop.",
    author: "Manasseh Igyuh",
    position: "Head of People and Organization Development",
    company: "Wateraid Nigeria",
  },
  {
    id: 8,
    quote: "It was a great experience still talked about till this day",
    author: "Winston Nkanor",
    position: "Head, Human Resources",
    company: "Samsung",
  },
  {
    id: 9,
    quote: "Impressive and timely delivery on project",
    author: "Ekpa Olorunfemi",
    position: "Head, Human Capital Management",
    company: "LBIC Plc.",
  },
];

const ITEMS_PER_PAGE = 9;

export default function CustomerTestimonialsGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

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

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
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
