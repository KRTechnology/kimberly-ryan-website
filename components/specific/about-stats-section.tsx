"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "26+",
    label: "Years In Business",
  },
  {
    number: "1600+",
    label: "Staff Associates",
  },
  {
    number: "18+",
    label: "Sectors",
  },
  {
    number: "100+",
    label: "Happy Clients",
  },
];

export default function AboutStatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-plex font-bold text-[#181D27]">
            Our Journey In Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 mb-4">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl font-sans text-[#535862]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
