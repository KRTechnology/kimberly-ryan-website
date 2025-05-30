"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const LearningDevelopmentWebinars = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const webinars = [
    {
      title: "HR Essential: Understanding your Statutory Obligations",
      description:
        'Join the webinar on "HR Essential: Understanding your Statutory Obligations" and discover how to transform diversity challenges into opportunities for growth. Drawing on insights from leading research, this session covers:',
      points: [
        "understand key statutory obligations for HR and businesses in Nigeria.",
        "gain insights into the laws, agencies, and penalties associated with non-compliance.",
        "learn the importance of timely remittance and accurate filing",
      ],
    },
    {
      title: "Recruitment Strategy & Workplace Diversity",
      description:
        'Join the webinar on "HR Essential: Understanding your Statutory Obligations" and discover how to transform diversity challenges into opportunities for growth. Drawing on insights from leading research, this session covers:',
      points: [
        "understand key statutory obligations for HR and businesses in Nigeria.",
        "gain insights into the laws, agencies, and penalties associated with non-compliance.",
        "learn the importance of timely remittance and accurate filing",
      ],
    },
    {
      title: "Enhancing Employer Branding for Today's Workforce",
      description:
        "Watch an insightful session on Enhancing Employer Branding in Today's Workforce, which has been designed to help elevate your employer branding strategies in today's competitive market.",
      subHeading: "Webinar Objectives:",
      points: [
        "Understand the critical role employer branding plays in attracting and retaining top talent.",
        "Learn how to balance traditional employer branding with modern workforce expectations.",
        "Discover strategies to differentiate your employer brand in a crowded market.",
        "Gain insights into future talent demands and how to position your company for continued success.",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % webinars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + webinars.length) % webinars.length);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#181D27] font-plex leading-tight">
            Webinar Series
          </h2>
        </motion.div>

        {/* Desktop Layout - Horizontal rows with image left, text right */}
        <div className="hidden md:block space-y-12 mb-16">
          {webinars.map((webinar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex gap-8 lg:gap-12"
            >
              {/* Image Section */}
              <div className="w-[339px] h-[339px] relative flex-shrink-0">
                <Image
                  src="/images/webinar-image.jpg"
                  alt={webinar.title}
                  fill
                  className="object-cover"
                  sizes="339px"
                />
              </div>

              {/* Text Content Section */}
              <div className="w-3/5 lg:w-2/3 flex flex-col justify-center">
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-[#181D27] font-plex mb-4 leading-tight">
                  {webinar.title}
                </h3>
                <p className="text-base lg:text-lg text-[#535862] font-sans leading-relaxed mb-4">
                  {webinar.description}
                </p>
                {webinar.subHeading && (
                  <p className="text-base lg:text-lg text-[#535862] font-sans leading-relaxed mb-4 font-medium">
                    {webinar.subHeading}
                  </p>
                )}
                <ul className="space-y-3 mb-8">
                  {webinar.points.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="text-base lg:text-lg text-[#535862] font-sans leading-relaxed flex items-start"
                    >
                      <span className="w-1.5 h-1.5 bg-[#535862] rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 text-right">
                  <button className="text-sunset-200 font-semibold text-lg hover:text-sunset-300 transition-colors duration-300 flex items-center justify-end">
                    Watch the webinar
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                  </button>
                  <button className="text-sunset-200 font-semibold text-lg hover:text-sunset-300 transition-colors duration-300 flex items-center justify-end">
                    Download the training slides
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Carousel */}
        <div className="md:hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-sm border border-gray-100 overflow-hidden mb-8"
          >
            <div className="relative h-48">
              <Image
                src="/images/webinar-image.jpg"
                alt={webinars[currentSlide].title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#181D27] font-plex mb-3 leading-tight">
                {webinars[currentSlide].title}
              </h3>
              <p className="text-sm text-[#535862] font-sans leading-relaxed mb-4">
                {webinars[currentSlide].description}
              </p>
              {webinars[currentSlide].subHeading && (
                <p className="text-sm text-[#535862] font-sans leading-relaxed mb-3 font-medium">
                  {webinars[currentSlide].subHeading}
                </p>
              )}
              <ul className="space-y-2 mb-6">
                {webinars[currentSlide].points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="text-sm text-[#535862] font-sans leading-relaxed flex items-start"
                  >
                    <span className="w-1 h-1 bg-[#535862] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <button className="w-full text-left text-sunset-200 font-semibold text-sm hover:text-sunset-300 transition-colors duration-300 flex items-center">
                  Watch the webinar
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
                <button className="w-full text-left text-sunset-200 font-semibold text-sm hover:text-sunset-300 transition-colors duration-300 flex items-center">
                  Download the training slides
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningDevelopmentWebinars;
