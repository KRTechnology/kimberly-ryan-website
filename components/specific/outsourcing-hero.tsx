"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const OutsourcingHero = () => {
  return (
    <section className="relative pt-20 pb-0 md:pt-24 md:pb-0 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12 items-center min-h-[500px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h1 className="text-4xl xl:text-5xl font-semibold text-[#181D27] font-plex leading-tight">
                Outsourcing
              </h1>
              <div className="space-y-6 text-[#535862] font-inter text-lg xl:text-xl leading-relaxed">
                <p>
                  Outsourcing consists of a comprehensive and customization
                  bouquet of services delivering an unparalleled synergy of
                  people, projects and processes.
                </p>
                <p>
                  With the use of technology and relevant software it has helped
                  to automate and standardize this business process.
                </p>
                <p>
                  Our outsourcing solutions help you reduce costs, increase
                  efficiency and generate more profits.
                </p>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Image with custom border radius */}
              <div
                className="relative h-[450px] xl:h-[500px] w-full overflow-hidden"
                style={{
                  borderTopLeftRadius: "160px",
                }}
              >
                <Image
                  src="/images/outsorcing-hero-image.jpg"
                  alt="Outsourcing - Professional team in modern office"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                  priority
                />

                {/* Line Pattern Overlay - Top Right - Extending beyond image */}
                <div className="absolute -top-2 -right-2 w-[180px] h-[180px] opacity-50">
                  <Image
                    src="/images/line-pattern.svg"
                    alt="Line pattern decoration"
                    width={180}
                    height={180}
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            {/* Title and Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-semibold text-[#181D27] font-plex leading-tight">
                Outsourcing
              </h1>
              <div className="space-y-4 text-[#535862] font-inter text-base md:text-lg leading-relaxed">
                <p>
                  Outsourcing consists of a comprehensive and customization
                  bouquet of services delivering an unparalleled synergy of
                  people, projects and processes.
                </p>
                <p>
                  With the use of technology and relevant software it has helped
                  to automate and standardize this business process.
                </p>
                <p>
                  Our outsourcing solutions help you reduce costs, increase
                  efficiency and generate more profits.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Main Image with mobile border radius */}
              <div
                className="relative h-64 md:h-80 w-full overflow-hidden"
                style={{
                  borderTopLeftRadius: "64px",
                }}
              >
                <Image
                  src="/images/outsorcing-hero-image.jpg"
                  alt="Outsourcing - Professional team in modern office"
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />

                {/* Line Pattern Overlay - Top Right - Mobile - Extending beyond image */}
                <div className="absolute -top-1 -right-1 w-[100px] h-[100px] opacity-50">
                  <Image
                    src="/images/line-pattern.svg"
                    alt="Line pattern decoration"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutsourcingHero;
