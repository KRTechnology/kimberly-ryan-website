"use client";

import { motion } from "framer-motion";

const VisionMissionSection = () => {
  return (
    <section
      className="relative py-16 md:py-24"
      style={{ backgroundColor: "#542A04" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Layout - 3 Columns */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8 lg:gap-12 md:items-start">
            {/* Left Column - Main Heading */}
            <motion.div
              className="flex flex-col justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.p
                className="text-[16px] md:text-[18px] text-amberwood-50 font-inter mb-4 md:mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                We do things differently
              </motion.p>

              <motion.h2
                className="text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-white leading-tight font-plex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Our Vision and Mission
              </motion.h2>
            </motion.div>

            {/* Middle Column - Brand Mission */}
            <motion.div
              className="flex flex-col justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h3 className="text-[20px] md:text-[24px] font-semibold text-white mb-4 font-plex">
                Brand Mission
              </h3>
              <p className="text-[16px] md:text-[18px] leading-relaxed text-amberwood-50 font-inter">
                Our brand mission is to lead in attracting, developing and
                retaining superior Human Capital that create a dramatic business
                advantage for our clients.
              </p>
            </motion.div>

            {/* Right Column - Brand Vision */}
            <motion.div
              className="flex flex-col justify-start"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className="text-[20px] md:text-[24px] font-semibold text-white mb-4 font-plex">
                Brand Vision
              </h3>
              <p className="text-[16px] md:text-[18px] leading-relaxed text-amberwood-50 font-inter">
                Our Vision is to be the leading African Human Resources
                Solutions Provider.
              </p>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Subtitle */}
            <motion.p
              className="text-[16px] text-white font-inter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We do things differently
            </motion.p>

            {/* Main Heading */}
            <motion.h2
              className="text-[30px] font-semibold text-white leading-tight font-plex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Our Vision and Mission
            </motion.h2>

            {/* Brand Mission */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-[20px] font-semibold text-white font-plex">
                Brand Mission
              </h3>
              <p className="text-[16px] leading-relaxed text-white font-inter">
                Our brand mission is to lead in attracting, developing and
                retaining superior Human Capital that create a dramatic business
                advantage for our clients.
              </p>
            </motion.div>

            {/* Brand Vision */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h3 className="text-[20px] font-semibold text-white font-plex">
                Brand Vision
              </h3>
              <p className="text-[16px] leading-relaxed text-white font-inter">
                Our Vision is to be the leading African Human Resources
                Solutions Provider.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
