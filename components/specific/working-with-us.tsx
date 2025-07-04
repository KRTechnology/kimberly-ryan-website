"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WorkingWithUs = () => {
  const benefits = [
    "Proven Track Record.",
    "Strategic Expertise",
    "Innovative Solutions",
    "Collaborative Approach",
    "End-to-End Support",
    "Quality Service Delivery",
  ];

  return (
    <section className="bg-white md:bg-slate-500 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1"
          >
            {/* Title */}
            <h2 className="text-4xl font-semibold font-plex text-[#535862] md:text-slate-50 mb-6 leading-tight">
              Working with us
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl font-inter text-[#535862] md:text-slate-50 mb-8 leading-relaxed">
              Over 26 years of creating value and helping organizations reach
              new business heights.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-inter text-[#535862] md:text-slate-50">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href="/solutions/support"
                className="inline-block px-8 py-4 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 text-lg font-semibold"
              >
                Schedule a consultation
              </Link>
            </motion.div>
          </motion.div>

          {/* Image - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 hidden md:block"
          >
            <div className="relative h-[500px] lg:h-[600px] w-full">
              <div
                className="w-full h-full relative overflow-hidden"
                style={{
                  borderTopLeftRadius: "160px",
                }}
              >
                <Image
                  src="/images/working-image.jpg"
                  alt="Professional working at desk"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkingWithUs;
