"use client";

import { motion } from "framer-motion";

const OurPeopleHero = () => {
  return (
    <section
      className="pt-20 pb-16 lg:pb-24"
      style={{ backgroundColor: "#363433" }}
    >
      {/* Additional spacing after fixed header - 36px from Figma */}
      <div className="pt-9">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Breadcrumb */}
              <p className="text-sm font-medium text-sunset-200">Our People</p>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amberwood-50 font-plex leading-tight">
                Our leadership
              </h1>

              {/* Description */}
              <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-sunset-50 font-sans leading-relaxed">
                  To be the company our customers want us to be, it takes an
                  eclectic group of passionate operators. Get to know the people
                  leading the way at Kimberly-Ryan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPeopleHero;
