"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Brochure } from "@/types/sanity";
import BrochureDownloadModal from "./brochure-download-modal";

interface LearningDevelopmentCTAProps {
  brochures: Brochure[];
}

const LearningDevelopmentCTA = ({ brochures }: LearningDevelopmentCTAProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    if (brochures && brochures.length > 0) {
      setIsModalOpen(true);
    } else {
      alert("No brochures are currently available for download.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-500">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 text-amberwood-50"
            >
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold font-plex leading-tight">
                Start your learning journey in 2026
              </h2>
              <p className="font-inter text-lg lg:text-xl leading-relaxed">
                Download our 2026 training brochures
              </p>
            </motion.div>

            {/* Right Button */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0 ml-8"
            >
              <button
                onClick={handleDownloadClick}
                className="px-[18px] py-3 bg-sunset-200 text-white rounded-lg hover:bg-sunset-300 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
              >
                Download brochure
              </button>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden text-center space-y-8">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-white font-plex leading-tight">
                Start your learning journey in 2026
              </h2>
              <p className="text-white/90 font-inter text-base sm:text-lg leading-relaxed">
                Download our 2026 training brochures
              </p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={handleDownloadClick}
                className="px-[18px] py-3 bg-white text-slate-500 border-2 border-[#D5D7DA] rounded-lg hover:bg-gray-50 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Download brochure
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brochure Download Modal */}
      <BrochureDownloadModal
        brochures={brochures}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default LearningDevelopmentCTA;
