"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Building2,
  ChevronDown,
  FileText,
  GraduationCap,
  History,
  Laptop,
  LayoutGrid,
  PlayCircle,
  User,
  UserCircle,
  Users,
  X,
  Menu,
  LifeBuoy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "#",
      dropdownItems: [
        {
          label: "HR Advisory",
          href: "/services/hr-advisory",
          icon: BookOpen,
          description: "Strategic HR guidance for business growth",
        },
        {
          label: "Learning & Development",
          href: "/services/learning-development",
          icon: GraduationCap,
          description: "Upskill your workforce with tailored training programs",
        },
        {
          label: "Recruitment & Selection",
          href: "/services/recruitment",
          icon: Users,
          description: "Find and hire the right talent for your organization",
        },
        {
          label: "Outsourcing",
          href: "/services/outsourcing",
          icon: Building2,
          description: "Streamline operations with our expert services",
        },
        {
          label: "HR Management Templates",
          href: "/services/templates",
          icon: FileText,
          description: "Ready-to-use HR documents and templates",
        },
      ],
    },
    {
      label: "Insights",
      href: "/insights",
      dropdownItems: [
        {
          label: "Blog",
          href: "/insights/blog",
          icon: BookOpen,
          description:
            "The latest industry new and guides curated by our expert team.",
        },
        {
          label: "Customer stories",
          href: "/insights/customer-stories",
          icon: History,
          description:
            "Learn how our customers are using Untitled UI to 10x their growth.",
        },
        {
          label: "Video tutorials",
          href: "/insights/tutorials",
          icon: PlayCircle,
          description:
            "Get up and running on our newest features and in-depth guides.",
        },
        {
          label: "Documentation",
          href: "/insights/documentation",
          icon: FileText,
          description:
            "In-depth articles on our tools and technologies to empower teams.",
        },
        {
          label: "Help and support",
          href: "/insights/support",
          icon: LifeBuoy,
          description:
            "Learn, fix a problem, and get answers to your questions.",
        },
      ],
    },
    {
      label: "Digital Solutions",
      href: "#",
      dropdownItems: [
        {
          label: "Kracada",
          href: "/solutions/kracada",
          icon: Laptop,
          description: "Comprehensive digital platform for modern businesses",
        },
        {
          label: "Kracada TV",
          href: "/solutions/kracada-tv",
          icon: PlayCircle,
          description: "Interactive learning and entertainment platform",
        },
      ],
    },
    {
      label: "About Us",
      href: "#",
      dropdownItems: [
        {
          label: "Who we are",
          href: "/about/who-we-are",
          icon: User,
          description: "Learn about our mission and values",
        },
        {
          label: "Customer stories",
          href: "/about/customer-stories",
          icon: History,
          description: "Success stories from our valued clients",
        },
        {
          label: "Our People",
          href: "/about/our-people",
          icon: UserCircle,
          description: "Meet the experts behind our success",
        },
        {
          label: "Gallery",
          href: "/about/gallery",
          icon: LayoutGrid,
          description: "Visual showcase of our work and events",
        },
      ],
    },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
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
                      <ChevronDown
                        className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180"
                        color="#A4A7AE"
                        size={16}
                      />
                    )}
                  </Link>

                  {item.dropdownItems && (
                    <motion.div
                      className="absolute left-0 mt-2 w-64 bg-[#FAFAFA] shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="py-2">
                        {item.dropdownItems.map(
                          (dropdownItem, dropdownIndex) => {
                            const Icon = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownIndex}
                                href={dropdownItem.href}
                                className="flex items-center px-4 py-2 text-sm text-[#181D27] hover:bg-sunset-50 hover:text-sunset-200 font-semibold"
                              >
                                <Icon className="w-5 h-5 mr-3 text-sunset-200" />
                                {dropdownItem.label}
                              </Link>
                            );
                          }
                        )}
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

            <button
              className="md:hidden z-[110] relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-[105] md:hidden overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-20">
              <div className="space-y-6">
                {navItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="text-lg font-semibold text-[#181D27] block"
                        onClick={() =>
                          !item.dropdownItems && setIsMobileMenuOpen(false)
                        }
                      >
                        {item.label}
                      </Link>
                      {item.dropdownItems && (
                        <button
                          onClick={() => toggleSection(item.label)}
                          className="p-2"
                        >
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedSections.includes(item.label)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {item.dropdownItems &&
                        expandedSections.includes(item.label) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 pl-4 pt-4">
                              {item.dropdownItems.map(
                                (dropdownItem, dropdownIndex) => {
                                  const Icon = dropdownItem.icon;
                                  return (
                                    <Link
                                      key={dropdownIndex}
                                      href={dropdownItem.href}
                                      className="flex items-start text-sm text-[#181D27] hover:text-sunset-200"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <Icon className="w-5 h-5 mr-3 text-sunset-200 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p className="font-semibold">
                                          {dropdownItem.label}
                                        </p>
                                        <p className="text-[#4B5563] mt-1 text-xs">
                                          {dropdownItem.description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer Links */}
              <div className="mt-8 grid grid-cols-2 gap-y-4 text-sm text-[#4B5563]">
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About us
                </Link>
                <Link
                  href="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Support
                </Link>
                <Link href="/press" onClick={() => setIsMobileMenuOpen(false)}>
                  Press
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/careers"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Careers
                </Link>
                <Link
                  href="/sitemap"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sitemap
                </Link>
                <Link href="/legal" onClick={() => setIsMobileMenuOpen(false)}>
                  Legal
                </Link>
                <Link
                  href="/cookies"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cookie settings
                </Link>
              </div>

              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="w-full block text-center px-6 py-3 bg-sunset-200 text-white rounded-md hover:bg-sunset-300 transition-colors duration-300 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Schedule a consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
