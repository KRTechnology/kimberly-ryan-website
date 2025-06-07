"use client";

import { motion } from "framer-motion";
import { UserCheck, Zap, ClipboardCheck } from "lucide-react";

const RecruitmentSelectionValueChain = () => {
  const valueChainItems = [
    {
      icon: UserCheck,
      title: "Top Executive Search",
      description:
        "With this solution we are able to focus on leaders who are able to steer the business in the direction it requires for growth and sustainability. Our footprint in the African Market has given us the cultural and business know-how to identify the exceptional leaders needed.",
    },
    {
      icon: Zap,
      title: "Assessment Centers",
      description:
        "We provide a controlled environment with experts who are able to filter through a variety of individuals in order to identify the best-fit for your organization. In addition, we make use of best practice tools and systems which ensures an equal playing field for all candidates.",
    },
    {
      icon: ClipboardCheck,
      title: "Background Checks and Verifications",
      description:
        "We have the capability to carry out thorough searches and investigations of potential employees and current workforce. Our checks provide you the confidence you need to make an offer to a potential hire or retain them within your system.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#181D27] font-plex leading-tight max-w-5xl mx-auto">
              The Robustness and Validation of our Recruitment and Selection
              solution can be highlighted in the value-chain below:
            </h2>
          </motion.div>

          {/* Value Chain Items */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {valueChainItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-white border border-[#D5D7DA] rounded-[8px] md:rounded-[10px] flex items-center justify-center mx-auto mb-6 md:mb-8"
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl font-semibold text-[#181D27] font-plex mb-4 md:mb-6"
                  >
                    {item.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-[#535862] font-inter text-base md:text-lg leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSelectionValueChain;
