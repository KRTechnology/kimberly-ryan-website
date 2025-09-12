"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const TrainingDesignedFor = () => {
  const focusAreas = [
    "Talent Management",
    "Organizational Development",
    "HR Leadership",
    "Business Acumen",
  ];

  return (
    <section className="w-full" style={{ backgroundColor: "#FFFDF6" }}>
      <div className="w-full">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full">
          {/* Left Image Section */}
          <motion.div
            className="flex-1 relative h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/training-image.jpg"
              alt="Professional HR leaders in strategic meeting"
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right Content Section */}
          <motion.div
            className="flex-1 bg-slate-400 flex items-center justify-center p-12 lg:p-16 xl:p-20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-lg">
              <motion.h2
                className="text-amberwood-50 font-plex font-semibold mb-6"
                style={{ fontSize: "30px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Designed For
              </motion.h2>

              <motion.p
                className="text-sunset-50 font-inter mb-6 leading-relaxed"
                style={{ fontSize: "18px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Organisations aiming to enhance the strategic capabilities of
                their Mid-level to Senior HR leaders in:
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-sunset-200 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sunset-50 font-inter text-lg">
                      {area}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full">
          <motion.div
            className="bg-slate-400 p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.h2
                className="text-amberwood-50 font-plex font-semibold mb-6"
                style={{ fontSize: "30px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Designed For
              </motion.h2>

              <motion.p
                className="text-sunset-50 font-inter mb-6 leading-relaxed"
                style={{ fontSize: "18px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Organisations aiming to enhance the strategic capabilities of
                their Mid-level to Senior HR leaders in:
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-sunset-200 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sunset-50 font-inter text-lg">
                      {area}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingDesignedFor;
