"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Webinar } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface LearningDevelopmentWebinarsProps {
  initialWebinars: Webinar[];
  totalCount: number;
  initialHasMore: boolean;
}

const LearningDevelopmentWebinars = ({
  initialWebinars,
  totalCount,
  initialHasMore,
}: LearningDevelopmentWebinarsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [webinars, setWebinars] = useState<Webinar[]>(initialWebinars);
  const [loadingDirection, setLoadingDirection] = useState<
    "prev" | "next" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const webinarsPerPage = 3;
  const totalPages = Math.ceil(totalCount / webinarsPerPage);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPrevPage = currentPage > 0;

  // Filter out inactive webinars if any exist in the data
  const activeWebinars = webinars.filter((webinar) => webinar.active);

  // Scroll to section top
  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  // Mobile navigation within current page
  const nextMobileSlide = () => {
    setCurrentMobileIndex((prev) => (prev + 1) % activeWebinars.length);
    scrollToSection();
  };

  const prevMobileSlide = () => {
    setCurrentMobileIndex(
      (prev) => (prev - 1 + activeWebinars.length) % activeWebinars.length
    );
    scrollToSection();
  };

  // Direct navigation to specific webinar (for dot clicks)
  const goToMobileSlide = (index: number) => {
    setCurrentMobileIndex(index);
    scrollToSection();
  };

  // Safe mobile index for carousel display
  const safeMobileIndex = Math.min(
    currentMobileIndex,
    activeWebinars.length - 1
  );

  // Handle PDF download
  const handlePdfDownload = (webinar: Webinar) => {
    if (webinar.trainingSlidesPdf?.asset?.url) {
      const pdfUrl = webinar.trainingSlidesPdf.asset.url;

      try {
        // Try to open PDF in new tab
        const newWindow = window.open(pdfUrl, "_blank");

        // Fallback: If popup is blocked, try direct download
        if (
          !newWindow ||
          newWindow.closed ||
          typeof newWindow.closed === "undefined"
        ) {
          // Create a temporary download link
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download =
            webinar.trainingSlidesPdf.asset.originalFilename ||
            `${webinar.title}-training-slides.pdf`;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
        alert(
          "There was an error downloading the training slides. Please try again."
        );
      }
    } else {
      alert("Training slides are not available for this webinar.");
    }
  };

  // Handle webinar view
  const handleWebinarView = (webinar: Webinar) => {
    if (webinar.webinarUrl) {
      window.open(webinar.webinarUrl, "_blank");
    }
  };

  // Handle page navigation
  const loadWebinarsPage = async (
    pageNumber: number,
    direction: "prev" | "next"
  ) => {
    if (loadingDirection !== null || pageNumber < 0 || pageNumber >= totalPages)
      return;

    setLoadingDirection(direction);
    setError(null);

    try {
      const offset = pageNumber * webinarsPerPage;
      const response = await fetch(
        `/api/webinars?offset=${offset}&limit=${webinarsPerPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch webinars");
      }

      const result = await response.json();

      setWebinars(result.webinars);
      setCurrentPage(pageNumber);
      setCurrentMobileIndex(0); // Reset mobile index when page changes

      // Scroll to top of section smoothly
      scrollToSection();
    } catch (error) {
      console.error("Error loading webinars page:", error);
      setError("Failed to load webinars. Please try again.");
    } finally {
      setLoadingDirection(null);
    }
  };

  // Navigate to next page
  const nextPage = () => {
    if (hasNextPage && loadingDirection === null) {
      loadWebinarsPage(currentPage + 1, "next");
    }
  };

  // Navigate to previous page
  const prevPage = () => {
    if (hasPrevPage && loadingDirection === null) {
      loadWebinarsPage(currentPage - 1, "prev");
    }
  };

  // Show empty state if no webinars are provided
  if (!webinars || activeWebinars.length === 0) {
    return (
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
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

          <div className="text-center">
            <p className="text-gray-600">
              No webinars available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-white">
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
          {activeWebinars.map((webinar, index) => (
            <motion.div
              key={webinar._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex gap-8 lg:gap-12"
            >
              {/* Image Section */}
              <div className="w-[339px] h-[339px] relative flex-shrink-0">
                <Image
                  src={urlFor(webinar.image).width(339).height(339).url()}
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
                  {webinar.keyPoints.map((point, pointIndex) => (
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
                  <button
                    onClick={() => handleWebinarView(webinar)}
                    className="text-sunset-200 font-semibold text-lg hover:text-sunset-300 transition-colors duration-300 flex items-center justify-end"
                  >
                    Watch the webinar
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                  </button>
                  {webinar.trainingSlidesPdf && (
                    <button
                      onClick={() => handlePdfDownload(webinar)}
                      className="text-sunset-200 font-semibold text-lg hover:text-sunset-300 transition-colors duration-300 flex items-center justify-end"
                    >
                      Download the training slides
                      <ArrowUpRight className="w-5 h-5 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Carousel */}
        <div className="md:hidden">
          <motion.div
            key={safeMobileIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-sm border border-gray-100 overflow-hidden mb-8"
          >
            <div className="relative h-48">
              <Image
                src={urlFor(activeWebinars[safeMobileIndex].image)
                  .width(600)
                  .height(300)
                  .url()}
                alt={activeWebinars[safeMobileIndex].title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#181D27] font-plex mb-3 leading-tight">
                {activeWebinars[safeMobileIndex].title}
              </h3>
              <p className="text-sm text-[#535862] font-sans leading-relaxed mb-4">
                {activeWebinars[safeMobileIndex].description}
              </p>
              {activeWebinars[safeMobileIndex].subHeading && (
                <p className="text-sm text-[#535862] font-sans leading-relaxed mb-3 font-medium">
                  {activeWebinars[safeMobileIndex].subHeading}
                </p>
              )}
              <ul className="space-y-2 mb-6">
                {activeWebinars[safeMobileIndex].keyPoints.map(
                  (point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="text-sm text-[#535862] font-sans leading-relaxed flex items-start"
                    >
                      <span className="w-1 h-1 bg-[#535862] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {point}
                    </li>
                  )
                )}
              </ul>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    handleWebinarView(activeWebinars[safeMobileIndex])
                  }
                  className="w-full text-left text-sunset-200 font-semibold text-sm hover:text-sunset-300 transition-colors duration-300 flex items-center"
                >
                  Watch the webinar
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
                {activeWebinars[safeMobileIndex].trainingSlidesPdf && (
                  <button
                    onClick={() =>
                      handlePdfDownload(activeWebinars[safeMobileIndex])
                    }
                    className="w-full text-left text-sunset-200 font-semibold text-sm hover:text-sunset-300 transition-colors duration-300 flex items-center"
                  >
                    Download the training slides
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Mobile: Within-page navigation (if multiple webinars in current page) */}
          {activeWebinars.length > 1 && (
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={prevMobileSlide}
                disabled={safeMobileIndex === 0}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft
                  className={`w-4 h-4 ${safeMobileIndex === 0 ? "text-gray-300" : "text-gray-600"}`}
                />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center space-x-2">
                {activeWebinars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToMobileSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === safeMobileIndex
                        ? "bg-sunset-200"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextMobileSlide}
                disabled={safeMobileIndex === activeWebinars.length - 1}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight
                  className={`w-4 h-4 ${safeMobileIndex === activeWebinars.length - 1 ? "text-gray-300" : "text-gray-600"}`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Navigation for both Desktop and Mobile */}
        <div className="flex items-center justify-center space-x-6">
          {/* Error Display */}
          {error && (
            <div className="text-center mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={!hasPrevPage || loadingDirection !== null}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {loadingDirection === "prev" ? (
                <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Page Info */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>
              {/* Mobile: Show current webinar info */}
              <div className="text-xs text-gray-500 md:hidden">
                Webinar {safeMobileIndex + 1} of {activeWebinars.length}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={!hasNextPage || loadingDirection !== null}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {loadingDirection === "next" ? (
                <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningDevelopmentWebinars;
