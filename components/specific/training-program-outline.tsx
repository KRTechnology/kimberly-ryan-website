"use client";

import { motion } from "framer-motion";

const TrainingProgramOutline = () => {
  const modules = [
    {
      title: "MODULE 1: HR & ORGANIZATIONAL STRATEGY",
      topics: [
        "Understanding HR's role in organizational success",
        "Aligning HR strategies with business objectives",
        "Key components of an effective HR strategy",
        "Case studies: HR strategy in successful organizations",
      ],
    },
    {
      title: "MODULE 2: HR & ECONOMIC TRENDS",
      topics: [
        "Global and local economic trends affecting HR",
        "The impact of inflation, talent scarcity, and remote work trends",
        "Adapting HR strategies to changing economic climates",
        "Case studies: HR responses to economic disruptions",
      ],
    },
    {
      title: "MODULE 3: PERFORMANCE MANAGEMENT",
      topics: [
        "Redesigning performance management for the modern workforce",
        "Continuous feedback, coaching, and mentoring",
        "Linking performance to business outcomes",
        "Tools for effective performance appraisals",
      ],
    },
    {
      title: "MODULE 4: UNDERSTANDING THE BUSINESS ENVIRONMENT",
      topics: [
        "Key business drivers: Revenue, profit, market share, and operational efficiency",
        "How economic trends and industry-specific factors impact HR strategy",
        "The HR-business connection: Supporting business objectives through effective talent management",
      ],
    },
    {
      title: "MODULE 5: COMMUNICATING HR'S BUSINESS VALUE",
      topics: [
        "Building a business case for HR initiatives: Framing HR contributions in financial and operational terms",
        "Speaking the language of business: Effective communication with the C-suite and key stakeholders",
        "Role-playing exercise: Presenting an HR strategy to senior leadership, demonstrating ROI and business impact",
      ],
    },
    {
      title: "MODULE 6: DEVELOPING A BUSINESS-FOCUSED HR STRATEGY",
      topics: [
        "Creating HR strategies that are tightly aligned with business functions such as sales, operations, and finance",
        "Identifying opportunities for HR to contribute to revenue generation, innovation, and cost reduction",
        "Group activity: Designing an HR strategy based on a real-world business scenario, with measurable business outcomes",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#FFFDF6" }}>
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <motion.h2
          className="text-left mb-12 md:mb-16"
          style={{ color: "#181D27" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span
            className="font-plex font-semibold"
            style={{ fontSize: "36px" }}
          >
            Programme Outline
          </span>
        </motion.h2>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                className="bg-zinc-50 p-8"
                style={{ backgroundColor: "#FAFAFA" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3
                  className="font-plex font-semibold mb-6"
                  style={{
                    color: "#181D27",
                    fontSize: "18px",
                  }}
                >
                  {module.title}
                </h3>
                <ul className="space-y-3">
                  {module.topics.map((topic, topicIndex) => (
                    <motion.li
                      key={topicIndex}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + topicIndex * 0.05 + 0.3,
                      }}
                      viewport={{ once: true }}
                    >
                      <span
                        className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: "#595553" }}
                      />
                      <span
                        className="font-inter"
                        style={{
                          color: "#535862",
                          fontSize: "16px",
                        }}
                      >
                        {topic}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              className="bg-zinc-50 p-6"
              style={{ backgroundColor: "#FAFAFA" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                className="font-plex font-semibold mb-4"
                style={{
                  color: "#181D27",
                  fontSize: "18px",
                }}
              >
                {module.title}
              </h3>
              <ul className="space-y-3">
                {module.topics.map((topic, topicIndex) => (
                  <motion.li
                    key={topicIndex}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + topicIndex * 0.05 + 0.3,
                    }}
                    viewport={{ once: true }}
                  >
                    <span
                      className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: "#595553" }}
                    />
                    <span
                      className="font-inter"
                      style={{
                        color: "#535862",
                        fontSize: "16px",
                      }}
                    >
                      {topic}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingProgramOutline;
