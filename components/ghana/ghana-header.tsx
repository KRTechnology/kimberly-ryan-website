"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GHANA_BTN_PRIMARY, GHANA_NAV } from "./constants";

const GhanaHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-all duration-300 ${
        isScrolled
          ? "border-[#EDECEB] shadow-[0_10px_30px_-24px_rgba(24,23,22,0.5)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link
          href="#top"
          className="flex flex-shrink-0 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/images/kr-logo.svg"
            alt="Kimberly Ryan"
            width={139}
            height={32}
            priority
            className="h-8 w-auto"
          />
          <span className="h-6 w-px bg-[#D5D7DA]" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#535862]">
            Ghana
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Ghana site navigation"
        >
          {GHANA_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#535862] transition-colors duration-200 hover:text-[#EB821D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className={`${GHANA_BTN_PRIMARY} hidden px-5 py-2.5 text-[13px] sm:inline-flex`}
          >
            Request a proposal
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D5D7DA] text-[#181D27] transition-colors hover:border-[#181D27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="ghana-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="ghana-mobile-menu"
          className="border-t border-[#EDECEB] bg-white lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col px-5 py-4"
            aria-label="Ghana mobile navigation"
          >
            {GHANA_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-[#EDECEB] py-4 text-base font-medium text-[#181D27] last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className={`${GHANA_BTN_PRIMARY} mt-4 w-full`}
            >
              Request a proposal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default GhanaHeader;
