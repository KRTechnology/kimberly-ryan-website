"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { HeroSlide } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface HeroProps {
  heroSlides: HeroSlide[];
}

const Hero = ({ heroSlides }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use fallback slides if no slides are provided
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [];

  // If no slides available, don't render the hero
  if (slides.length === 0) {
    return null;
  }

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, slides.length]);

  // Swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  const currentSlideData = slides[currentSlide];

  const getImageContainerStyle = (imageStyle: "arc" | "rounded" | "square") => {
    switch (imageStyle) {
      case "arc":
        return { borderRadius: "50% 50% 21px 21px" };
      case "rounded":
        return { borderRadius: "24px" };
      case "square":
      default:
        return { borderRadius: "0px" };
    }
  };

  const getBackgroundClass = (slide: HeroSlide) => {
    if (slide.backgroundColor === "custom" && slide.customBackgroundColor) {
      return "";
    }
    switch (slide.backgroundColor) {
      case "gray-50":
        return "bg-gray-50";
      case "sunset-50":
        return "bg-sunset-50";
      case "white":
      default:
        return "bg-white";
    }
  };

  const getButtonStyle = (ctaType: "primary" | "secondary" | "text") => {
    switch (ctaType) {
      case "secondary":
        return "inline-block px-8 py-3 border-2 border-sunset-200 text-sunset-200 rounded-md hover:bg-sunset-200 hover:text-white transition-all duration-300 text-lg font-semibold";
      case "text":
        return "inline-block text-sunset-200 hover:text-sunset-300 transition-colors duration-300 text-lg font-semibold underline";
      case "primary":
      default:
        return "inline-block px-8 py-3 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 text-lg font-semibold";
    }
  };

  const sectionStyle =
    currentSlideData.backgroundColor === "custom" &&
    currentSlideData.customBackgroundColor
      ? { backgroundColor: currentSlideData.customBackgroundColor }
      : {};

  return (
    <section
      className={`relative py-24 flex items-center ${getBackgroundClass(currentSlideData)}`}
      style={sectionStyle}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Animated text content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlideData._id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="min-h-[240px] md:min-h-[220px]"
              >
                {currentSlideData.subtitle && (
                  <p className="text-lg text-sunset-300 mb-2 font-medium">
                    {currentSlideData.subtitle}
                  </p>
                )}
                <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-[#181D27] leading-tight">
                  {currentSlideData.title}
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {currentSlideData.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Static button and stepper - these don't animate out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`button-${currentSlideData._id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={currentSlideData.buttonLink}
                    className={getButtonStyle(currentSlideData.ctaType)}
                  >
                    {currentSlideData.buttonText}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Show stepper only if more than one slide */}
            {slides.length > 1 && (
              <div className="flex gap-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-[#FEBEA1]"
                        : "bg-[#E9EAEB] hover:bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideData._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative overflow-hidden bg-gray-200"
                  style={getImageContainerStyle(currentSlideData.imageStyle)}
                >
                  <Image
                    src={urlFor(currentSlideData.image)
                      .width(600)
                      .height(600)
                      .url()}
                    alt={currentSlideData.image.alt || currentSlideData.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
