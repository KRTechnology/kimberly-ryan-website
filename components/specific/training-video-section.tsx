"use client";

import { motion } from "framer-motion";
import { Training } from "@/types/sanity";

interface TrainingVideoSectionProps {
  trainingData: Training;
}

const TrainingVideoSection = ({ trainingData }: TrainingVideoSectionProps) => {
  // Extract video ID from YouTube URL if needed
  const getYouTubeEmbedUrl = (url: string) => {
    // Handle different YouTube URL formats
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?si=KkOYlSDLK63nvd4x`;
    }
    return url; // Return original if it's already an embed URL
  };

  // For now, using the provided embed URL - later this will come from trainingData
  const videoEmbedUrl =
    "https://www.youtube.com/embed/45PuCATxOIA?si=KkOYlSDLK63nvd4x";

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#FFFDF6" }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#181D27] font-plex font-semibold mb-4 text-3xl lg:text-4xl">
              Training Overview
            </h2>
            <p className="text-gray-600 font-inter text-lg leading-relaxed max-w-2xl mx-auto">
              Get an inside look at what makes our training programs exceptional
              and how they can transform your professional journey.
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Video Background Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
              <div className="relative w-full overflow-hidden rounded-xl">
                {/* Responsive Video Container */}
                <div className="relative pb-[56.25%] h-0">
                  {" "}
                  {/* 16:9 aspect ratio */}
                  {/*<iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={videoEmbedUrl}
                    title="Training Program Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />*/}
                </div>

                {/* Overlay for loading state */}
                <motion.div
                  className="absolute inset-0 bg-slate-400 rounded-xl flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{ pointerEvents: "none" }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-sunset-200 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-inter">Loading video...</p>
                  </div>
                </motion.div>
              </div>

              {/* Video Description */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-600 font-inter text-sm lg:text-base">
                  Watch this brief overview to understand the value and impact
                  of our {trainingData.title} program.
                </p>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-sunset-200 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-amberwood-200 rounded-full opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingVideoSection;
