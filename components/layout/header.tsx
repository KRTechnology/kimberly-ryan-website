"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import DesktopNav from "./desktop-nav";
import TabletNav from "./tablet-nav";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleSection = (sectionLabel: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionLabel)
        ? prev.filter((section) => section !== sectionLabel)
        : [...prev, sectionLabel]
    );
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/kr-logo.svg"
                alt="Kimberly Ryan Logo"
                width={150}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Tablet Navigation */}
            <TabletNav
              isMobileMenuOpen={isMobileMenuOpen}
              onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            {/* CTA Button */}
            <Link
              href="/solutions/support"
              className="hidden lg:inline-block px-6 py-2 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 text-sm font-semibold whitespace-nowrap"
            >
              Schedule a consultation
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden md:hidden z-[60] relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#414651]" />
              ) : (
                <Menu className="w-6 h-6 text-[#414651]" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        expandedSections={expandedSections}
        onToggleSection={toggleSection}
        onClose={handleMobileMenuClose}
      />
    </>
  );
};

export default Header;
