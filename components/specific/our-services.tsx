"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Outsourcing",
      description:
        "In collaboration with our strategic partners, we offer a complete end-to-end seamless people, process and project outsourcing solution which includes designing, strategy, planning and implementation, expansion, manpower deployment and managing the work flow.",
      link: "/services/outsourcing",
      icon: "💼", // Placeholder - replace with actual icon
    },
    {
      id: 2,
      title: "Learning and Development",
      description:
        "We offer a portfolio of learning solutions that are focused on ensuring your employees can harness their technical skills. Our aim is to develop employees through structured and in-depth learning that will be beneficial at every facet of their career journey.",
      link: "/services/learning-development",
      icon: "⚡", // Placeholder - replace with actual icon
    },
    {
      id: 3,
      title: "Recruitment and Selection",
      description:
        "Our clients can attest to our swift, yet meticulous work in the area of Recruitment and Selection. Our turn around time and state of the art recruitment platform is unrivaled due to our consistent robust talent pool.",
      link: "/services/recruitment-selection",
      icon: "📋", // Placeholder - replace with actual icon
    },
    {
      id: 4,
      title: "HR Advisory",
      description:
        "Our Advisory projects support successful transition in organisational systems and processes. We see the changes and disruptions in the world as an opportunity to revolutionize HR in your organization to sustain and develop productivity.",
      link: "/services/hr-advisory",
      icon: "💡", // Placeholder - replace with actual icon
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-[30px] md:text-[36px] font-semibold text-[#181D27] mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-[#535862] font-inter text-base md:text-lg leading-relaxed max-w-4xl">
            Organizations see their "people" as important to the success of
            their businesses and as such, we are available to discuss and
            partner with you to provide solutions in the following core areas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#FAFAFA] p-6 rounded-lg w-full md:w-[286px] mx-auto"
            >
              {/* Mobile Icon - only visible on mobile */}
              <div className="md:hidden mb-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-[#D5D7DA] relative">
                  {/* <div className="absolute inset-0 rounded-lg border-2 border-[#D5D7DA] translate-x-2 translate-y-2 -z-10"></div> */}
                  <span className="text-xl">{service.icon}</span>
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-lg font-semibold font-plex text-[#181D27] mb-4 leading-tight">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-[#535862] font-inter text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <Link
                href={service.link}
                className="inline-flex items-center text-[#EB821D] font-medium text-sm hover:text-[#B56314] transition-colors duration-300"
              >
                Learn more
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
