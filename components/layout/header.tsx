"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "#",
      dropdownItems: [
        { label: "HR Advisory", href: "/services/hr-advisory" },
        {
          label: "Learning & Development",
          href: "/services/learning-development",
        },
        { label: "Recruitment & Selection", href: "/services/recruitment" },
        { label: "Outsourcing", href: "/services/outsourcing" },
        { label: "Careers", href: "/services/careers" },
      ],
    },
    {
      label: "Insights",
      href: "/insights",
    },
    {
      label: "Digital Solutions",
      href: "#",
      dropdownItems: [
        { label: "Kracada lifestyle", href: "/solutions/kracada-lifestyle" },
        { label: "KRIS - HRMS", href: "/solutions/kris-hrms" },
        { label: "Kracada TV", href: "/solutions/kracada-tv" },
        { label: "Help centre", href: "/solutions/help-centre" },
        { label: "Tutorials", href: "/solutions/tutorials" },
        { label: "Support", href: "/solutions/support" },
      ],
    },
    {
      label: "About Us",
      href: "#",
      dropdownItems: [
        { label: "25th Anniversary", href: "/about/anniversary" },
        { label: "Our Story", href: "/about/story" },
        { label: "Team", href: "/about/team" },
        { label: "Contact", href: "/about/contact" },
      ],
    },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/kr-logo.svg"
              alt="Kimberly Ryan Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.href}
                  className="text-[16px] font-semibold text-[#414651] hover:text-sunset-200 flex items-center"
                >
                  {item.label}
                  {item.dropdownItems && (
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.dropdownItems && (
                  <motion.div
                    className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-[16px] text-[#414651] hover:bg-sunset-50 hover:text-sunset-200"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/consultation"
            className="hidden md:inline-block px-6 py-2 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300"
          >
            Schedule a consultation
          </Link>

          {/* Mobile menu button - to be implemented */}
          <button className="md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
