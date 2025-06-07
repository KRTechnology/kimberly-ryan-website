"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const OutsourcingTypes = () => {
  const outsourcingTypes = [
    {
      id: 1,
      title: "People Outsourcing",
      description:
        "People outsourcing is a growing trend that many companies around the world are adopting to achieve greater organizational flexibility, improved efficiency, reduced overheads and a hassle free HR management.",
      image: "/images/people-outsourcing-image-one.jpg",
      imageAlt: "People outsourcing - Team meeting discussion",
      layout: "imageLeft", // Image on left, text on right
    },
    {
      id: 2,
      title: "Process Outsourcing",
      description:
        "Our technical expertise and business experience enable us to understand your business objective and deploy processes and resources to deliver quality projects to set deadlines.",
      image: "/images/people-outsourcing-image-two.jpg",
      imageAlt: "Process outsourcing - Professional in modern office",
      layout: "imageRight", // Text on left, image on right
    },
    {
      id: 3,
      title: "Project Outsourcing",
      description:
        "Outsourcing solution which includes designing, strategy, planning and implementation, expansion, manpower deployment and managing the workflow.",
      image: "/images/people-outsourcing-image-three.jpg",
      imageAlt: "Project outsourcing - Woman working on data analysis",
      layout: "imageLeft", // Image on left, text on right
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-sunset-600">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20 lg:space-y-24">
          {outsourcingTypes.map((type, index) => (
            <div key={type.id}>
              {/* Desktop Layout */}
              <div className="hidden lg:block">
                {type.layout === "imageLeft" ? (
                  // Image Left, Text Right
                  <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="relative h-[400px] xl:h-[450px] w-full overflow-hidden">
                        <Image
                          src={type.image}
                          alt={type.imageAlt}
                          fill
                          style={{ objectFit: "cover" }}
                          className="object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <h2 className="text-3xl xl:text-4xl font-semibold text-sunset-50 font-plex leading-tight">
                        {type.title}
                      </h2>
                      <p className="text-lg xl:text-xl text-amberwood-50 font-inter leading-relaxed">
                        {type.description}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  // Text Left, Image Right
                  <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <h2 className="text-3xl xl:text-4xl font-semibold text-sunset-50 font-plex leading-tight">
                        {type.title}
                      </h2>
                      <p className="text-lg xl:text-xl text-amberwood-50 font-inter leading-relaxed">
                        {type.description}
                      </p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="relative h-[400px] xl:h-[450px] w-full overflow-hidden">
                        <Image
                          src={type.image}
                          alt={type.imageAlt}
                          fill
                          style={{ objectFit: "cover" }}
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>
                )}
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
                  <h2 className="text-2xl md:text-3xl font-semibold text-sunset-50 font-plex leading-tight">
                    {type.title}
                  </h2>
                  <p className="text-base md:text-lg text-amberwood-50 font-inter leading-relaxed">
                    {type.description}
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-64 md:h-80 w-full overflow-hidden">
                    <Image
                      src={type.image}
                      alt={type.imageAlt}
                      fill
                      style={{ objectFit: "cover" }}
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutsourcingTypes;
