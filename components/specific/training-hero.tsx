"use client";

import { Training } from "@/types/sanity";
import { motion } from "framer-motion";
import Link from "next/link";

interface TrainingHeroProps {
  trainingData: Training;
}

const TrainingHero = ({ trainingData }: TrainingHeroProps) => {
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
                {trainingData.title}
              </motion.h1>

              <motion.p
                className="text-amberwood-50 font-inter mb-12 leading-relaxed max-w-4xl mx-auto"
                style={{ fontSize: "18px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {trainingData.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link
                  href={
                    trainingData.registrationForm?.active
                      ? `/training/registration/${trainingData.registrationForm.slug.current}`
                      : trainingData.registrationUrl || "/consultation"
                  }
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

                {trainingData.brochureUrl && (
                  <Link
                    href={trainingData.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                )}
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
                {trainingData.title}
              </motion.h1>

              <motion.p
                className="text-amberwood-50 font-inter mb-8 leading-relaxed text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {trainingData.subtitle}
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link
                  href={
                    trainingData.registrationForm?.active
                      ? `/training/registration/${trainingData.registrationForm.slug.current}`
                      : trainingData.registrationUrl || "/consultation"
                  }
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

                {trainingData.brochureUrl && (
                  <Link
                    href={trainingData.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingHero;
