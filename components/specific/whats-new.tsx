"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { WhatsNew } from "@/types/sanity";

interface WhatsNewSectionProps {
  items: WhatsNew[];
}

const WhatsNewSection = ({ items }: WhatsNewSectionProps) => {
  // Helper function to generate the appropriate link
  const generateLink = (item: WhatsNew): string => {
    switch (item.contentType) {
      case "publication":
        if (item.contentReference?.pdfFile?.asset?.url) {
          return item.contentReference.pdfFile.asset.url;
        }
        return "#";
      case "blog":
        if (item.contentReference?.slug?.current) {
          return `/insights/blogs/${item.contentReference.slug.current}`;
        }
        return "#";
      case "webinar":
        if (item.contentReference?.slug?.current) {
          return `/webinars/${item.contentReference.slug.current}`;
        }
        return "#";
      case "event":
        if (item.contentReference?.slug?.current) {
          return `/about/gallery/${item.contentReference.slug.current}`;
        }
        return "#";
      case "external":
      case "custom":
        return item.customLink || "#";
      default:
        return "#";
    }
  };

  // If no items, don't render the section
  if (!items || items.length === 0) {
    return null;
  }

  // Get the featured/first item to display
  const featuredItem = items.find((item) => item.featured) || items[0];

  if (!featuredItem) {
    return null;
  }

  const link = generateLink(featuredItem);
  const shouldOpenInNewTab =
    featuredItem.openInNewTab ||
    featuredItem.contentType === "publication" ||
    featuredItem.contentType === "external";

  return (
    <section className="bg-white py-9 px-8 border-t border-[#EDECEB]">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-2xl md:text-[38px] font-plex font-semibold text-sunset-200 text-center md:text-left mb-8 md:mb-12">
          What's New On Kimberly Ryan
        </h1>

        <div className="bg-[#FAFAFA] rounded-[24px] p-9">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 md:order-1"
            >
              <h2 className="text-[22px] font-medium font-plex text-[#181D27] mb-4 leading-tight">
                {featuredItem.title}
              </h2>

              <div className="space-y-4 mb-6">
                {featuredItem.description
                  .split("\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[#181D27] text-base leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* Category badge if available */}
              {featuredItem.category && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-sunset-100 text-sunset-300 rounded-full">
                    {featuredItem.category
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
              )}

              <Link
                href={link}
                target={shouldOpenInNewTab ? "_blank" : "_self"}
                rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center text-[#EB821D] font-medium text-base hover:text-[#B56314] transition-colors duration-300"
              >
                {featuredItem.buttonText}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 md:order-2 flex justify-center items-center"
            >
              <div className="w-full max-w-lg">
                <Image
                  src={
                    featuredItem.image
                      ? urlFor(featuredItem.image).url()
                      : "/images/publication-image.jpg"
                  }
                  alt={featuredItem.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-lg shadow-md"
                  style={{ 
                    width: "100%",
                    height: "auto"
                  }}
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Additional items preview (if there are more items) */}
          {items.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 pt-6 border-t border-[#EDECEB]"
            >
              <h3 className="text-lg font-medium font-plex text-[#181D27] mb-4">
                More Updates
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.slice(1, 4).map((item) => {
                  const itemLink = generateLink(item);
                  const itemShouldOpenInNewTab =
                    item.openInNewTab ||
                    item.contentType === "publication" ||
                    item.contentType === "external";

                  return (
                    <Link
                      key={item._id}
                      href={itemLink}
                      target={itemShouldOpenInNewTab ? "_blank" : "_self"}
                      rel={
                        itemShouldOpenInNewTab
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group p-4 bg-white rounded-lg border border-[#EDECEB] hover:border-sunset-200 transition-colors duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={
                              item.image
                                ? urlFor(item.image)
                                    .width(100)
                                    .height(100)
                                    .url()
                                : "/images/publication-image.jpg"
                            }
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-[#181D27] group-hover:text-sunset-200 transition-colors duration-300 line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {item.contentType
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
