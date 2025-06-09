"use client";

import { motion } from "framer-motion";

const WhoWeAreContent = () => {
  return (
    <section className="relative pt-20 pb-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Main heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-8 md:mb-12 leading-tight font-plex text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Who We Are
          </motion.h1>

          {/* Introductory paragraph */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-slate-500 font-inter max-w-4xl mx-auto">
              Kimberly Ryan Limited is a leading HR consulting firm in Africa
              with a global footprint across Nigeria, Ghana, Kenya, Sierra
              Leone, Uganda, and the United Kingdom.
            </p>
          </motion.div>

          {/* Main content - Two columns on desktop, single column on mobile */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Left column */}
            <div className="space-y-6">
              <motion.p
                className="text-base md:text-lg leading-relaxed text-slate-500 font-inter"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                We offer comprehensive human resources and advisory services
                that help businesses scale, streamline operations, and maximize
                workforce performance.
              </motion.p>

              <motion.p
                className="text-base md:text-lg leading-relaxed text-slate-500 font-inter"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Our team excels in workforce management, talent acquisition, and
                employee engagement strategies, ensuring businesses are equipped
                with the right tools to thrive. From leadership development to
                employee retention and payroll outsourcing, we tailor solutions
                to meet the unique needs of every organization.
              </motion.p>

              <motion.p
                className="text-base md:text-lg leading-relaxed text-slate-500 font-inter"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                With expertise in payroll outsourcing and compliance with labor
                laws, we ensure your operations run smoothly, freeing up your
                time to focus on business growth. Whether you need executive
                search services, performance management, or succession planning,
                Kimberly Ryan Limited is your go-to partner for HR solutions
                that deliver results.
              </motion.p>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <motion.p
                className="text-base md:text-lg leading-relaxed text-slate-500 font-inter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Since incorporation, we have adapted to the changing times in a
                successful bid to stay up to date with creative and innovative
                solutions. This has given us a competitive advantage which has
                allowed us to continually provide our clients with bespoke
                solutions that improve Human Resource and business operations
                across various sectors, both locally and internationally.
              </motion.p>

              <motion.p
                className="text-base md:text-lg leading-relaxed text-slate-500 font-inter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Our diverse, multi-functional and seasoned consultants dedicate
                their time and expertise to what Kimberly Ryan offers our
                clients: the promise of a Strategic Partnership You Can Trust.
              </motion.p>

              <motion.p
                className="text-base md:text-lg leading-relaxed text-slate-500 font-inter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                We pride ourselves particularly in being able to provide
                tailored solutions to suit each client as we do not believe in
                the "one size fits all" approach. Building long-lasting
                partnerships based on trust and transparency is pertinent and is
                at the helm of our affairs here at Kimberly Ryan Limited.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreContent;
