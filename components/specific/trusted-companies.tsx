"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TrustedCompanies = () => {
  // Using wildcrafted for all companies for now
  const companies = [
    {
      id: 1,
      name: "Wildcrafted",
      logo: "/images/wildcrafted-logo.svg",
      text: "/images/wildcrafted-text.svg",
    },
    {
      id: 2,
      name: "Magnolia",
      logo: "/images/magnolia-logo.svg",
      text: "/images/magnolia-text.svg",
    },
    {
      id: 3,
      name: "StackEd Lab",
      logo: "/images/stacked-lab-logo.svg",
      text: "/images/stacked-lab-text.svg",
    },
    {
      id: 4,
      name: "Warpspeed",
      logo: "/images/warpspeed-logo.svg",
      text: "/images/warpspeed-text.svg",
    },
    {
      id: 5,
      name: "Clandestine",
      logo: "/images/clandestine-logo.svg",
      text: "/images/clandestine-text.svg",
    },
    {
      id: 6,
      name: "Shutterframe",
      logo: "/images/shutterframe-logo.svg",
      text: "/images/shutterframe-text.svg",
    },
    {
      id: 7,
      name: "Powersurge",
      logo: "/images/powersurge-logo.svg",
      text: "/images/powersurge-text.svg",
    },
    {
      id: 8,
      name: "Leapyear",
      logo: "/images/leapyear-logo.svg",
      text: "/images/leapyear-text.svg",
    },
  ];

  // First row (4 companies) - moving left, faster
  const firstRow = companies.slice(0, 4);
  // Second row (4 companies) - moving right, slower
  const secondRow = companies.slice(4, 8);

  // Duplicate arrays for seamless loop
  const firstRowExtended = [...firstRow, ...firstRow, ...firstRow];
  const secondRowExtended = [...secondRow, ...secondRow, ...secondRow];

  return (
    <section className="bg-[#EDECEB] py-16 md:py-[30px] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12 md:mb-8">
          <h2 className="text-base font-medium text-[#181D27]">
            Trusted by 4,000+ companies
          </h2>
        </div>

        {/* First Row - Moving Left (Faster) */}
        <div className="mb-8 md:mb-6">
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{
              x: ["0%", "-33.333%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "300%" }}
          >
            {firstRowExtended.map((company, index) => (
              <div
                key={`row1-${company.id}-${index}`}
                className="flex items-center justify-center gap-3 w-[200px] h-[112px] md:w-[292px] md:h-[168px] bg-[#FAFAFA] rounded-lg px-4 py-3 shadow-sm flex-shrink-0"
              >
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <Image
                    src={company.text}
                    alt={company.name}
                    width={118}
                    height={18}
                    className="h-4 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Right (Slower) */}
        <div>
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{
              x: ["-33.333%", "0%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "300%" }}
          >
            {secondRowExtended.map((company, index) => (
              <div
                key={`row2-${company.id}-${index}`}
                className="flex items-center justify-center gap-3 w-[200px] h-[112px] md:w-[292px] md:h-[168px] bg-[#FAFAFA] rounded-lg px-4 py-3 shadow-sm flex-shrink-0"
              >
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <Image
                    src={company.text}
                    alt={company.name}
                    width={118}
                    height={18}
                    className="h-4 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
