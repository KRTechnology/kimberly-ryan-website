"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imageAlt: string;
  imageStyle: "arc" | "rounded";
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Your People & Your Business Are Our Business",
    description:
      "We excel at empowering businesses with tailored HR Solutions for optimal growth and success.",
    buttonText: "Schedule a consultation",
    buttonLink: "/consultation",
    image: "/images/hero-image.jpg",
    imageAlt: "Business professionals in a meeting",
    imageStyle: "arc",
  },
  {
    id: 2,
    title: "Strategic Leadership Program",
    description:
      "We equip HR professionals to create and align HR strategies with business goals, enhancing HR's impact on organizational success",
    buttonText: "Learn more",
    buttonLink: "/strategic-leadership",
    image: "/images/hero-image-2.jpg",
    imageAlt: "Strategic leadership meeting",
    imageStyle: "rounded",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

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
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
    if (isRightSwipe) {
      setCurrentSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  const getImageContainerStyle = (imageStyle: "arc" | "rounded") => {
    if (imageStyle === "arc") {
      return {
        borderRadius: "50% 50% 21px 21px",
      };
    }
    return {
      borderRadius: "24px",
    };
  };

  return (
    <section
      className="relative py-24 flex items-center"
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
                key={`text-${currentSlideData.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
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
                  key={`button-${currentSlideData.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={currentSlideData.buttonLink}
                    className="inline-block px-8 py-3 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 text-lg font-semibold"
                  >
                    {currentSlideData.buttonText}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="flex gap-4">
              {heroSlides.map((_, index) => (
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
                  key={currentSlideData.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative overflow-hidden bg-gray-200"
                  style={getImageContainerStyle(currentSlideData.imageStyle)}
                >
                  <Image
                    src={currentSlideData.image}
                    alt={currentSlideData.imageAlt}
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
