"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Company } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface TrustedCompaniesProps {
  companies: Company[];
}

const TrustedCompanies = ({ companies }: TrustedCompaniesProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Use fallback if no companies are provided
  const companiesData = companies && companies.length > 0 ? companies : [];

  // If no companies available, don't render the section
  if (companiesData.length === 0) {
    return null;
  }

  // Split companies into two rows for the scrolling animation
  const halfLength = Math.ceil(companiesData.length / 2);
  const firstRow = companiesData.slice(0, halfLength);
  const secondRow = companiesData.slice(halfLength);

  // Create enough duplicates for seamless infinite scroll
  // We need enough copies so that when one set scrolls out, another is ready
  const firstRowExtended = Array(6).fill(firstRow).flat();
  const secondRowExtended = Array(6).fill(secondRow).flat();

  // Calculate card width including gap for proper animation distance
  const cardWidth = isMobile ? 200 + 32 : 292 + 48; // card width + gap
  const rowWidth = firstRow.length * cardWidth;

  // Get background color class for company cards
  const getBackgroundClass = (company: Company) => {
    if (
      company.logoBackgroundColor === "custom" &&
      company.customBackgroundColor
    ) {
      return "";
    }
    switch (company.logoBackgroundColor) {
      case "white":
        return "bg-white";
      case "blue-50":
        return "bg-blue-50";
      case "green-50":
        return "bg-green-50";
      case "purple-50":
        return "bg-purple-50";
      case "default":
      default:
        return "bg-[#FAFAFA]";
    }
  };

  const getCardStyle = (company: Company) => {
    if (
      company.logoBackgroundColor === "custom" &&
      company.customBackgroundColor
    ) {
      return { backgroundColor: company.customBackgroundColor };
    }
    return {};
  };

  // Render company card
  const renderCompanyCard = (
    company: Company,
    index: number,
    rowPrefix: string
  ) => {
    const cardContent = (
      <div
        key={`${rowPrefix}-${company._id}-${index}`}
        className={`flex items-center justify-center w-[200px] h-[112px] md:w-[292px] md:h-[168px] rounded-lg px-4 py-3 shadow-sm flex-shrink-0 transition-all duration-300 hover:shadow-md ${getBackgroundClass(company)}`}
        style={getCardStyle(company)}
      >
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={urlFor(company.textLogo).url()}
            alt={company.textLogo.alt || company.name}
            width={150}
            height={60}
            className="max-w-full max-h-full w-auto h-auto object-contain scale-75 transition-transform duration-300"
          />
        </div>
      </div>
    );

    // If company has a website URL, wrap in a link
    if (company.websiteUrl) {
      return (
        <Link
          href={company.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:scale-105 transition-transform duration-300"
        >
          {cardContent}
        </Link>
      );
    }

    return cardContent;
  };

  return (
    <section className="bg-[#EDECEB] py-16 md:py-[30px] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12 md:mb-8">
          <h2 className="text-base font-medium text-[#181D27]">
            Trusted by{" "}
            {companiesData.length >= 1000
              ? `${Math.floor(companiesData.length / 1000)}k+`
              : `${companiesData.length}+`}{" "}
            companies
          </h2>
        </div>

        {/* First Row - Moving Left */}
        {firstRow.length > 0 && (
          <div className="mb-8 md:mb-6">
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{
                x: -rowWidth,
              }}
              transition={{
                duration: isMobile ? 15 : 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{
                width: `${rowWidth * 6}px`,
              }}
              initial={{ x: 0 }}
            >
              {firstRowExtended.map((company, index) =>
                renderCompanyCard(company, index, "row1")
              )}
            </motion.div>
          </div>
        )}

        {/* Second Row - Moving Right */}
        {secondRow.length > 0 && (
          <div>
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{
                x: 0,
              }}
              transition={{
                duration: isMobile ? 22 : 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{
                width: `${secondRow.length * cardWidth * 6}px`,
              }}
              initial={{ x: -(secondRow.length * cardWidth) }}
            >
              {secondRowExtended.map((company, index) =>
                renderCompanyCard(company, index, "row2")
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustedCompanies;
