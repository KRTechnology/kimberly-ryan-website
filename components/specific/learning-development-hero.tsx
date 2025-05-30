"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LearningDevelopmentHero = () => {
  return (
    <section className="relative pt-20 pb-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-16 items-center min-h-[600px]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl xl:text-5xl font-semibold text-[#181D27] font-plex leading-tight">
              Learning And Development
            </h1>
            <p className="text-[#535862] font-sans text-lg xl:text-xl leading-relaxed">
              The global workforce is rapidly evolving due to increased
              competition, digital transformation, and a multi-generational
              talent pool. As skills become outdated faster, reskilling and
              upskilling are essential. At Kimberly Ryan, we offer strategic
              learning solutions that develop technical skills, behaviors, and a
              positive work mindset. Our programs combine digital formats with
              in-person sessions to build a future-ready workforce.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] xl:h-[600px] w-full overflow-hidden">
              <Image
                src="/images/learning-and-dev-hero-image.jpg"
                alt="Learning and Development - Diverse group of professionals"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-8">
          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-[#181D27] font-plex leading-tight">
              Learning And Development
            </h1>
            <p className="text-[#535862] font-sans text-base md:text-lg leading-relaxed">
              The global workforce is rapidly evolving due to increased
              competition, digital transformation, and a multi-generational
              talent pool. As skills become outdated faster, reskilling and
              upskilling are essential. At Kimberly Ryan, we offer strategic
              learning solutions that develop technical skills, behaviors, and a
              positive work mindset. Our programs combine digital formats with
              in-person sessions to build a future-ready workforce.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <Image
                src="/images/learning-and-dev-hero-image.jpg"
                alt="Learning and Development - Diverse group of professionals"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LearningDevelopmentHero;
