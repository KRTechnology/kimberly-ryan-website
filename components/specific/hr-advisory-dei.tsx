"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const HrAdvisoryDEI = () => {
  const deiOfferings = [
    "Organisation-wide DE&I Scan",
    "Organisation-wide DE&I Policy",
    "Integration of DE&I policy into al HR processes including Compensation and Benefit, recruitment and selection process, etc.",
    "Internal campaign regarding DE&I",
    "DE&I Training programme",
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:block space-y-16 xl:space-y-20">
          {/* First Row: Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl xl:text-4xl font-semibold text-[#181D27] font-plex leading-tight">
                Diversity, Equality and Inclusion
              </h2>
              <p className="text-[#535862] font-sans text-lg leading-relaxed">
                Our Diversity, Equality and Inclusion consultancy product is
                poised to help organisations address the Racial, ethnic and
                gender disparities that persist in most workplaces even till
                today. Kimberly Ryan is well positioned to be your partner as
                you move towards having a more diverse and equitable workplace.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[560px] w-full overflow-hidden">
                <Image
                  src="/images/dei-image-one.jpg"
                  alt="Diversity, Equality and Inclusion professional"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Second Row: Image Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[560px] w-full overflow-hidden">
                <Image
                  src="/images/dei-image-two.jpg"
                  alt="DEI Training and Implementation"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Right Content - DEI Offerings */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8 py-16 px-8 lg:px-12 xl:px-16"
            >
              <h3 className="text-3xl xl:text-4xl font-semibold text-[#181D27] font-plex leading-tight">
                Our DEI Offerings
              </h3>
              <ul className="space-y-6">
                {deiOfferings.map((offering, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-7 h-7 bg-amberwood-50 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-3 h-3 text-sunset-200" />
                    </div>
                    <span className="text-[#535862] font-sans text-lg leading-relaxed">
                      {offering}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
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
            <h2 className="text-2xl md:text-3xl font-semibold text-[#181D27] font-plex leading-tight">
              Diversity, Equality and Inclusion
            </h2>
            <p className="text-[#535862] font-sans text-base md:text-lg leading-relaxed">
              Our Diversity, Equality and Inclusion consultancy product is
              poised to help organisations address the Racial, ethnic and gender
              disparities that persist in most workplaces even till today.
              Kimberly Ryan is well positioned to be your partner as you move
              towards having a more diverse and equitable workplace.
            </p>
          </motion.div>

          {/* First Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <Image
                src="/images/dei-image-one.jpg"
                alt="Diversity, Equality and Inclusion professional"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* DEI Offerings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#181D27] font-plex">
              Our DEI Offerings
            </h3>
            <p className="text-[#535862] font-sans text-sm md:text-base leading-relaxed">
              An all-in-one customer service platform that helps you balance
              everything your customers need to be happy.
            </p>
            <ul className="space-y-4">
              {deiOfferings.map((offering, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-7 h-7 bg-amberwood-50 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-sunset-200" />
                  </div>
                  <span className="text-[#535862] font-sans text-sm md:text-base leading-relaxed">
                    {offering}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Second Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <Image
                src="/images/dei-image-two.jpg"
                alt="DEI Training and Implementation"
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

export default HrAdvisoryDEI;
