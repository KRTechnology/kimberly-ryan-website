"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Publications = () => {
  return (
    <section className="bg-white py-9 px-8 border-t border-[#EDECEB]">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-2xl md:text-[38px] font-plex font-semibold text-sunset-200 text-center md:text-left mb-8 md:mb-12">
          What's New On Kimberly Ryan
        </h1>

        <div className="bg-[#FAFAFA] rounded-[24px] p-9">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-1"
            >
              <h2 className="text-[22px] font-medium font-plex text-[#181D27] mb-4 leading-tight">
                The New PENCOM Directive: What Employers Need to Know
              </h2>

              <div className="space-y-4 mb-6">
                <p className="text-[#181D27] text-base leading-relaxed">
                  In this white paper, we break down the latest directive from
                  the National Pension Commission (PenCom), which requires all
                  employers to remit monthly pension contributions and upload
                  schedules exclusively through the E-Collection
                  platform—effective July 1, 2024.
                </p>

                <p className="text-[#181D27] text-base leading-relaxed">
                  We explain what the directive means for employers and
                  employees across Nigeria's formal workforce, explore its
                  impact on payroll systems, and outline practical steps your
                  business can take to stay compliant.
                </p>
              </div>

              <Link
                href="/publications/pencom-directive"
                className="inline-flex items-center text-[#EB821D] font-medium text-base hover:text-[#B56314] transition-colors duration-300"
              >
                Read Publication
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Publication Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 md:order-2"
            >
              <div className="relative w-full h-[280px] md:h-[320px] lg:h-[360px]">
                <Image
                  src="/images/publication-image.jpg"
                  alt="The New PENCOM Directive publication cover"
                  fill
                  style={{ objectFit: "contain" }}
                  className="object-contain w-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
