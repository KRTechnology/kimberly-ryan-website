"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TrainingHero = () => {
  return (
    <section
      className="relative pt-24 pb-16 md:pt-28 md:pb-24"
      style={{ backgroundColor: "#FFFDF6" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <motion.div
              className="bg-slate-400 p-16 lg:p-20 xl:p-24 text-center w-full"
              style={{ borderRadius: "24px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h1
                className="text-sunset-50 font-plex font-semibold mb-8 leading-tight"
                style={{ fontSize: "48px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Strategic Leadership Programme
              </motion.h1>

              <motion.p
                className="text-amberwood-50 font-inter mb-12 leading-relaxed max-w-4xl mx-auto"
                style={{ fontSize: "18px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                The role of HR has undergone a significant transformation, and
                HR leaders are now essential in aligning people strategies with
                business objectives, driving performance, and fostering
                innovation. The Strategic HR Leadership Program (SHLP) is
                specifically designed to empower HR professionals with the
                essential skills, knowledge, and expertise required to excel as
                strategic business partners and leaders.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link
                  href="/consultation"
                  className="inline-block bg-sunset-200 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    padding: "12px 18px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "8px",
                  }}
                >
                  Register Now
                </Link>

                <Link
                  href="#"
                  className="inline-block bg-slate-50 text-sunset-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    padding: "12px 18px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "8px",
                  }}
                >
                  Download the brochure
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <motion.div
              className="bg-slate-400 p-8 text-center"
              style={{ borderRadius: "24px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h1
                className="text-sunset-50 font-plex font-semibold mb-6 leading-tight text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Strategic Leadership Programme
              </motion.h1>

              <motion.p
                className="text-amberwood-50 font-inter mb-8 leading-relaxed text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                The role of HR has undergone a significant transformation, and
                HR leaders are now essential in aligning people strategies with
                business objectives, driving performance, and fostering
                innovation. The Strategic HR Leadership Program (SHLP) is
                specifically designed to empower HR professionals with the
                essential skills, knowledge, and expertise required to excel as
                strategic business partners and leaders.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link
                  href="/consultation"
                  className="block w-full bg-sunset-200 text-white transition-all duration-300 text-center"
                  style={{
                    padding: "12px 18px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "8px",
                  }}
                >
                  Register Now
                </Link>

                <Link
                  href="#"
                  className="block w-full bg-slate-50 text-sunset-600 transition-all duration-300 text-center"
                  style={{
                    padding: "12px 18px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "8px",
                  }}
                >
                  Download the brochure
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingHero;
