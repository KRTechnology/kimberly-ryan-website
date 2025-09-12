"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TrainingProgrammeFees = () => {
  const pricingOptions = [
    {
      label: "Early Bird",
      price: "N350,000",
      labelColor: "#C26811", // amberwood-300
    },
    {
      label: "Individual Fee",
      price: "N400,000",
      labelColor: "#C26811", // amberwood-300
    },
    {
      label: "Group of Three (3)",
      price: "N1000,000",
      labelColor: "#C26811", // amberwood-300
    },
    {
      label: "Accommodation fee (Optional)",
      price: "N400,000/Night",
      labelColor: "#C26811", // amberwood-300
    },
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#FFFDF6" }}>
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="font-plex font-semibold mb-4"
            style={{
              color: "#181D27",
              fontSize: "36px",
            }}
          >
            Programme Fees
          </h2>
          <p
            className="font-inter max-w-4xl mx-auto"
            style={{
              color: "#535862",
              fontSize: "18px",
            }}
          >
            Training Fees cover feeding (Tea Break and Lunch) and training
            materials (Inclusive of a training bag)
          </p>
        </motion.div>

        {/* Orange divider line */}
        <motion.div
          className="w-full h-1 mb-12 md:mb-16"
          style={{ backgroundColor: "#EB821D" }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />

        {/* Desktop Layout - 4 columns */}
        <div className="hidden md:block">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {pricingOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 shadow p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Label */}
                <div
                  className="inline-block px-4 py-2 rounded-full mb-6"
                  style={{ backgroundColor: "#FFEDE7" }}
                >
                  <span
                    className="font-inter font-medium text-sm"
                    style={{ color: option.labelColor }}
                  >
                    {option.label}
                  </span>
                </div>

                {/* Price */}
                <h3
                  className="font-plex font-semibold mb-6"
                  style={{
                    color: "#181D27",
                    fontSize: "28px",
                  }}
                >
                  {option.price}
                </h3>

                {/* CTA Button */}
                <Link
                  href="/consultation"
                  className="block w-full bg-sunset-200 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sunset-300 transition-colors duration-300"
                  style={{ fontSize: "16px" }}
                >
                  Get started
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-6">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 p-6 text-center rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Label */}
              <div
                className="inline-block px-4 py-2 rounded-full mb-4"
                style={{ backgroundColor: "#FFEDE7" }}
              >
                <span
                  className="font-inter font-medium text-sm"
                  style={{ color: option.labelColor }}
                >
                  {option.label}
                </span>
              </div>

              {/* Price */}
              <h3
                className="font-plex font-semibold mb-4"
                style={{
                  color: "#181D27",
                  fontSize: "24px",
                }}
              >
                {option.price}
              </h3>

              {/* CTA Button */}
              <Link
                href="/consultation"
                className="block w-full bg-sunset-200 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sunset-300 transition-colors duration-300"
                style={{ fontSize: "16px" }}
              >
                Get started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingProgrammeFees;
