"use client";

import { motion } from "framer-motion";

const desktopStats = [
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

const mobileStats = [
  {
    number: "400+",
    label: "Projects completed",
  },
  {
    number: "600%",
    label: "Return on investment",
  },
  {
    number: "10k",
    label: "Global downloads",
  },
];

export default function AboutStatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Desktop Version */}
        <div className="hidden md:block">
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

          <div className="bg-[#FAFAFA] rounded-lg py-12 px-8">
            <div className="grid grid-cols-4 gap-12">
              {desktopStats.map((stat, index) => (
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
        </div>

        {/* Mobile Version */}
        <div className="block md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAFAFA] rounded-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-[#181D27] mb-4">
              Great products, faster than ever
            </h2>
            <p className="text-lg text-[#535862] mb-12">
              Everything you need to build modern UI and great products.
            </p>

            <div className="space-y-8">
              {mobileStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-orange-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-sans text-[#535862]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
