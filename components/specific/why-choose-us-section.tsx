"use client";

import { motion } from "framer-motion";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: "Legacy",
      description:
        "Over the last 2 decades, we have successfully built a reputation and trust that place us as a force to reckon with in the HR and Business Solutions space.",
    },
    {
      title: "Integrity",
      description:
        "Our approach in our dealings with clients is open and transparent. We ensure high business ethics and professionalism in all our transactions.",
    },
    {
      title: "Cloud Solutions Oriented",
      description:
        "With our Robust HR Software, we take the manual and daily operations off your desk and let you focus on Strategic HR and HR Business Partnering.",
    },
    {
      title: "Technical Expertise",
      description:
        "We pride ourselves in our highly skilled consultants who contribute daily to the organization.",
    },
    {
      title: "Dynamic Workforce",
      description:
        "Our consultants bring a refreshing and modern perspective when tailoring solutions for our clients.",
    },
    {
      title: "Expeditious Value Delivery",
      description:
        "We pride ourselves in our exceptional timely service delivery culture and customer satisfaction.",
    },
  ];

  return (
    <section className="bg-[#EDECEB] py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-left mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#181D27] font-plex">
            WHY CHOOSE US
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="bg-[#FAFAFA] rounded-lg p-6 shadow-sm w-full max-w-[390px] mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-[#181D27] font-plex mb-4">
                {reason.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-[#535862] font-inter">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
