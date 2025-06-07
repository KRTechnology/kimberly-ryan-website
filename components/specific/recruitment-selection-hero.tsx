"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const RecruitmentSelectionHero = () => {
  return (
    <section className="relative pt-20 pb-16 md:py-24 bg-terra-600">
      <div className="container mx-auto px-4">
        <motion.div
          className="overflow-hidden min-h-[640px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Layout - 60% text, 40% image */}
          <div
            className="hidden md:grid h-full min-h-[640px]"
            style={{ gridTemplateColumns: "60fr 40fr" }}
          >
            <motion.div
              className="flex items-center py-8 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <motion.h1
                  className="text-[60px] sm:text-[50px] md:text-[55px] lg:text-[60px] font-semibold mb-6 leading-tight font-plex text-amberwood-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Recruitment &<br />
                  Selection
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl mb-12 leading-relaxed text-terra-50 font-inter max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  At Kimberly Ryan, we create business advantage by sourcing the
                  right talent through our Competency-Based Model. We go beyond
                  current needs to find candidates who align with your future
                  goals, driving sustained organizational growth.
                </motion.p>
              </div>
            </motion.div>

            {/* Right Image Section - Desktop */}
            <motion.div
              className="relative h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/recruitment-and-selection-hero-image.jpg"
                  alt="Recruitment and selection professional in modern office"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout - Stacked vertically */}
          <div className="md:hidden flex flex-col min-h-[640px]">
            {/* Text Content Section - Top on mobile */}
            <motion.div
              className="flex items-center justify-center py-8 flex-1"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-left">
                <motion.h1
                  className="text-[40px] sm:text-[45px] font-semibold mb-4 leading-tight font-plex text-amberwood-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Recruitment &<br />
                  Selection
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg mb-8 leading-relaxed text-terra-50 font-inter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  At Kimberly Ryan, we create business advantage by sourcing the
                  right talent through our Competency-Based Model. We go beyond
                  current needs to find candidates who align with your future
                  goals, driving sustained organizational growth.
                </motion.p>
              </div>
            </motion.div>

            {/* Image Section - Bottom on mobile */}
            <motion.div
              className="relative h-80 sm:h-96"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/recruitment-and-selection-hero-image.jpg"
                  alt="Recruitment and selection professional in modern office"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover object-center"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitmentSelectionHero;
