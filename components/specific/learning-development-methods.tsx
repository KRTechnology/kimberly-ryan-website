"use client";

import { motion } from "framer-motion";

const LearningDevelopmentMethods = () => {
  const methods = [
    {
      title: "Learning Management System",
      description:
        "Through technology, we have mastered the art of deploying engaging learning content that sticks and ultimately achieves a positive change in approach to tasks and deliverables which result in optimal performance.",
    },
    {
      title: "Leadership Growth and Development",
      description:
        "Leaders hold a great responsibility in shaping the direction of the organisation. It is essential that bespoke leadership initiatives are implemented to ensure business sustainability.",
    },
    {
      title: "Coaching and Mentoring",
      description:
        "Identifying pathways and systems that build budding employees is key to the sustainability of any business. Our approach designs a framework that provides senior colleagues the platform that supports your business to engage, motivate, retain and develop younger employees on their career path.",
    },
    {
      title: "Team Building",
      description:
        "This solution involves the designing and development of unique engagement strategies to drive team engagement and productivity. We strongly believe no man is an island and as such, synergy is required to drive organisational growth within small and large teams.",
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#181D27] font-plex leading-tight max-w-3xl">
            We deliver these interventions through various methods that suits
            our clients needs.
          </h2>
        </motion.div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl lg:text-lg font-semibold text-[#181D27] font-plex mb-4 leading-tight">
                {method.title}
              </h3>
              <p className="text-[#535862] font-sans leading-relaxed text-sm lg:text-base">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningDevelopmentMethods;
