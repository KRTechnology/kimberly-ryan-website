"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HrAdvisoryHero = () => {
  return (
    <section className="relative pt-20 pb-16 md:py-24 bg-white">
      <div className="container mx-auto px-0 md:px-4">
        <motion.div
          className="bg-amberwood-400 rounded-none md:rounded-3xl overflow-hidden shadow-2xl h-[640px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Layout - Custom proportions: 52.6% text, 47.4% image */}
          <div
            className="hidden md:grid h-full"
            style={{ gridTemplateColumns: "52.6fr 47.4fr" }}
          >
            <motion.div
              className="flex items-center p-8 md:p-12 lg:p-16"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-white">
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-7xl font-semibold mb-6 leading-relaxed font-plex"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  HR Advisory.
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl mb-12 leading-loose text-sunset-50 font-inter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Our advisory services help organizations navigate change by
                  transforming systems and processes. We leverage global
                  disruptions as opportunities to revolutionize HR, enhance
                  productivity, and strengthen people strategies. With decades
                  of experience, we deliver best-practice consulting to local
                  and international organizations committed to making an impact.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Link
                    href="/solutions/support"
                    className="inline-block px-8 py-4 bg-sunset-200 text-white rounded-lg hover:bg-sunset-300 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Schedule a consultation
                  </Link>
                </motion.div>
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
                  src="/images/hr-advisory-hero-image.jpg"
                  alt="HR Advisory professional consulting"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                  priority
                />

                {/* Subtle gradient overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amberwood-400/20" />
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout - Stacked vertically */}
          <div className="md:hidden flex flex-col h-full">
            {/* Text Content Section - Top on mobile */}
            <motion.div
              className="flex items-center justify-center p-6 flex-1"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-white text-center">
                <motion.h1
                  className="text-2xl sm:text-3xl font-semibold mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  HR Advisory.
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg mb-6 leading-loose opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Our advisory services help organizations navigate change by
                  transforming systems and processes. We leverage global
                  disruptions as opportunities to revolutionize HR, enhance
                  productivity, and strengthen people strategies. With decades
                  of experience, we deliver best-practice consulting to local
                  and international organizations committed to making an impact.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Link
                    href="/consultation"
                    className="inline-block px-5 py-3 bg-sunset-200 text-white text-base font-plex rounded-lg hover:bg-sunset-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Schedule a consultation
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Image Section - Bottom on mobile */}
            <motion.div
              className="relative h-64 sm:h-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/hr-advisory-hero-image-mobile.jpg"
                  alt="HR Advisory professional consulting"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                  priority
                />

                {/* Subtle gradient overlay for mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-amberwood-400/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HrAdvisoryHero;
