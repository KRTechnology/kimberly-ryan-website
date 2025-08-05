"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CompanyIntroductionVideo = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/who-are-we-background.svg"
          alt="Background decoration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Section heading */}
          <motion.h2
            className="text-[30px] md:text-[36px] font-semibold text-center mb-6 md:mb-8 leading-tight font-plex text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Company Introduction
          </motion.h2>

          {/* Description */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-[18px] md:text-[20px] leading-relaxed text-slate-400 font-inter max-w-4xl mx-auto">
              Powerful, self-serve team engagement tools and analytics.
              Supercharge your managers & keep employees engaged from anywhere.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src="https://www.youtube.com/embed/kj_1dpBesEM"
                title="Company Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntroductionVideo;
