"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BarChart2,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";

// ─── Slideshow ────────────────────────────────────────────────────────────────

const heroImages = [
  {
    src: "/images/hr-advisory-hero-image.jpg",
    alt: "HR Advisory professionals in discussion",
  },
  { src: "/images/dei-image-one.jpg", alt: "Diverse team collaborating" },
  { src: "/images/dei-image-two.jpg", alt: "Compensation strategy session" },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={heroImages[current].src}
            alt={heroImages[current].alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Blend into amberwood on the left */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amberwood-400/30 pointer-events-none" />

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "bg-white w-5" : "bg-white/40 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const totalRewardsItems = [
  "Comprehensive total rewards framework design",
  "Analysis of salary, incentives, and benefits structures",
  "Alignment of rewards with organizational strategy and performance goals",
  "Evaluation of employee value proposition (EVP)",
  "Design of recognition and performance-based reward programs",
  "Review of non-financial rewards including career development and workplace flexibility",
];

const benchmarkingItems = [
  "Salary benchmarking across industries and comparable roles",
  "Compensation positioning analysis (25th, 50th, and 75th market percentiles)",
  "Benefits competitiveness assessment",
  "Allowances and incentive comparison",
  "Compensation structure review and pay grade alignment",
  "Data-driven recommendations for pay adjustments",
];

const services = [
  {
    title: "Total Rewards Strategy & Analysis",
    description:
      "A strong total rewards strategy ensures that employees experience value beyond salary alone. We help organizations evaluate and redesign their entire rewards ecosystem to support talent attraction, motivation, and long-term retention.",
    outcome:
      "Organizations gain a well-balanced rewards strategy that drives performance, improves engagement, and strengthens employer branding.",
    icon: Award,
    items: totalRewardsItems,
    accent: "#92400E",
    bg: "#FFFBEB",
    iconBg: "#FDE68A",
    badgeBg: "#FCD34D",
    badgeText: "#78350F",
    tagLabel: "Strategy",
  },
  {
    title: "Compensation & Benefits Benchmarking",
    description:
      "Maintaining competitive pay structures requires continuous insight into market compensation trends and industry standards. Kimberly Ryan provides robust benchmarking analysis using reliable market data to help organizations position their compensation and benefits packages competitively.",
    outcome:
      "Organizations gain clear visibility into market positioning and actionable insights to maintain competitive compensation structures.",
    icon: BarChart2,
    items: benchmarkingItems,
    accent: "#78350F",
    bg: "#FFF7ED",
    iconBg: "#FDBA74",
    badgeBg: "#FED7AA",
    badgeText: "#7C2D12",
    tagLabel: "Analytics",
  },
];

const stats = [
  { value: "200+", label: "Organizations Served" },
  { value: "15+", label: "Years of Market Intelligence" },
  { value: "98%", label: "Client Retention Rate" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const RewardsCompensationPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 md:py-24 bg-white">
        <div className="container mx-auto px-0 md:px-4">
          <motion.div
            className="bg-amberwood-400 rounded-none md:rounded-3xl overflow-hidden shadow-2xl h-[640px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Desktop layout */}
            <div
              className="hidden md:grid h-full"
              style={{ gridTemplateColumns: "52.6fr 47.4fr" }}
            >
              {/* Left: text */}
              <motion.div
                className="flex flex-col justify-center p-8 md:p-12 lg:p-16"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-white">
                  <motion.p
                    className="text-sm font-semibold uppercase tracking-widest text-sunset-50 mb-4 font-inter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                  >
                    HR Advisory
                  </motion.p>

                  <motion.h1
                    className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-6 leading-tight font-plex"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Rewards &amp; Compensation Advisory.
                  </motion.h1>

                  <motion.p
                    className="text-base md:text-lg mb-10 leading-loose text-sunset-50 font-inter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    Attracting, motivating, and retaining top talent requires
                    more than competitive salaries. We help organizations build
                    data-driven, competitive, and sustainable reward structures
                    that strengthen engagement, improve retention, and enhance
                    overall performance.
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    className="grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    {stats.map((s, i) => (
                      <div key={i}>
                        <p className="text-2xl font-bold text-white font-plex">
                          {s.value}
                        </p>
                        <p className="text-sunset-50 text-xs mt-1 font-inter leading-snug">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Right: slideshow */}
              <motion.div
                className="relative h-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <HeroSlideshow />
              </motion.div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden flex flex-col h-full">
              <motion.div
                className="flex items-center justify-center p-6 flex-1"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-white text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sunset-50 mb-3 font-inter">
                    HR Advisory
                  </p>
                  <motion.h1
                    className="text-2xl sm:text-3xl font-semibold mb-4 leading-snug font-plex"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Rewards &amp; Compensation Advisory.
                  </motion.h1>
                  <motion.p
                    className="text-sm sm:text-base mb-6 leading-loose opacity-90 font-inter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    Data-driven reward structures that strengthen engagement,
                    improve retention, and enhance overall performance.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <Link
                      href="/solutions/support"
                      className="inline-block px-5 py-3 bg-sunset-200 text-white text-sm font-plex rounded-lg hover:bg-sunset-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Schedule a consultation
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Mobile slideshow */}
              <motion.div
                className="relative h-64 sm:h-80"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <HeroSlideshow />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1C0A00] font-plex">
              Our Rewards &amp; Compensation Services
            </h2>
            <p className="text-amber-800 mt-2 text-base font-inter">
              Tailored advisory across two core practice areas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden border border-amber-200 bg-white"
                >
                  <div
                    className="px-6 pt-6 pb-5"
                    style={{ backgroundColor: service.bg }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: service.iconBg }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: service.accent }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: service.badgeBg,
                          color: service.badgeText,
                        }}
                      >
                        {service.tagLabel}
                      </span>
                    </div>
                    <h3
                      className="text-lg md:text-xl font-semibold leading-snug font-plex"
                      style={{ color: service.accent }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div className="px-6 py-5 space-y-5">
                    <p className="text-amber-900 text-sm leading-relaxed font-inter">
                      {service.description}
                    </p>

                    <div>
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3 font-inter">
                        What's Included
                      </p>
                      <ul className="space-y-2">
                        {service.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle
                              className="w-4 h-4 mt-0.5 shrink-0"
                              style={{ color: service.accent }}
                            />
                            <span className="text-amber-900 text-sm leading-relaxed font-inter">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="rounded-xl p-4 border border-amber-200"
                      style={{ backgroundColor: service.bg }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-1 font-inter"
                        style={{ color: service.accent }}
                      >
                        Outcome
                      </p>
                      <p className="text-amber-900 text-sm leading-relaxed font-inter">
                        {service.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amberwood-400 py-14">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-white font-semibold text-base md:text-lg leading-snug font-plex">
              Ready to build a competitive rewards strategy?
            </p>
          </div>
          <Link
            href="/solutions/support"
            className="inline-flex items-center gap-2 bg-white text-amberwood-400 text-sm font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors duration-200 w-fit whitespace-nowrap font-inter"
          >
            Talk to an Advisor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <NewsletterSubscription />
    </div>
  );
};

export default RewardsCompensationPage;
