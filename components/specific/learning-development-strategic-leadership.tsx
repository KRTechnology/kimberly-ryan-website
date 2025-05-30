"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LearningDevelopmentStrategicLeadership = () => {
  return (
    <section className="relative">
      <div className="flex flex-col md:flex-row min-h-[500px] lg:min-h-[600px]">
        {/* Image Section - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/images/strategic-leadership-image.jpg"
            alt="Strategic Leadership Programme - Team meeting"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 0vw"
          />
        </div>

        {/* Text Content Section */}
        <div className="w-full md:w-1/2 bg-[#595553] flex items-center">
          <div className="w-full">
            <div className="container mx-auto px-4 py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 md:pl-8 lg:pl-12 xl:pl-16"
              >
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold font-plex leading-tight text-[#FFEDE7]">
                  Strategic Leadership Programme
                </h2>

                <p className="text-lg lg:text-xl leading-relaxed font-sans text-[#FEE7DE]">
                  The role of HR has undergone a significant transformation, and
                  HR leaders are now essential in aligning people strategies
                  with business objectives, driving performance, and fostering
                  innovation. The Strategic HR Leadership Program (SHLP) is
                  specifically designed to empower HR professionals with the
                  essential skills, knowledge, and expertise required to excel
                  as strategic business partners and leaders.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="pt-4"
                >
                  <button className="px-6 py-3 bg-sunset-200 text-white rounded-lg hover:bg-sunset-300 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Learn more
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningDevelopmentStrategicLeadership;
