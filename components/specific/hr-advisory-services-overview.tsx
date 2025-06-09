"use client";

import { motion } from "framer-motion";
import { Users, Zap, ClipboardList } from "lucide-react";

const HrAdvisoryServicesOverview = () => {
  const services = [
    {
      title: "Workforce Planning",
      description:
        "Our service in this regard ensures our clients clearly map out the required talent for the present and future growth of the organization.",
      icon: Users,
    },
    {
      title: "HR Strategy",
      description:
        "It is key that your people strategy aligns with your business strategy. More important than that is the adequate formulation of the people strategy and ensuring compliance.",
      icon: Zap,
    },
    {
      title: "Performance Management Redesign",
      description:
        "We understand the importance of being able to make a tangible link between employee performance and organizational goals",
      icon: ClipboardList,
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#181D27] font-plex leading-tight max-w-4xl">
            Some of the HR Advisory services we offer are listed below:
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Icon - Mobile only */}
                <div className="md:hidden w-10 h-10 bg-white border border-[#D5D7DA] rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#535862]" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-[#181D27] font-plex leading-tight">
                  {service.title}
                </h3>
                <p className="text-[#535862] font-sans text-base md:text-lg leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HrAdvisoryServicesOverview;
 