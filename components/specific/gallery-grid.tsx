"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Images,
} from "lucide-react";
import { motion } from "framer-motion";
import { Event } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface GalleryGridProps {
  events: Event[];
}

const sortOptions = [
  "Most Recent",
  "Oldest First",
  "Alphabetical",
  "Featured First",
];

export default function GalleryGrid({ events }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("View all");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const itemsPerPage = 8;

  // Generate dynamic categories based on available events
  const availableCategories = useMemo(() => {
    const categorySet = new Set<string>();

    events.forEach((event) => {
      if (event.category) {
        categorySet.add(event.category);
      }
    });

    // Convert to array and sort alphabetically
    const categoriesArray = Array.from(categorySet).sort();

    // Always include "View all" at the beginning
    return ["View all", ...categoriesArray];
  }, [events]);

  const filteredEvents =
    activeCategory === "View all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  // Sort events based on sortBy option
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "Oldest First":
        return (
          new Date(a.eventDate || a.publishedAt).getTime() -
          new Date(b.eventDate || b.publishedAt).getTime()
        );
      case "Alphabetical":
        return a.name.localeCompare(b.name);
      case "Featured First":
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (
          new Date(b.eventDate || b.publishedAt).getTime() -
          new Date(a.eventDate || a.publishedAt).getTime()
        );
      case "Most Recent":
      default:
        return (
          new Date(b.eventDate || b.publishedAt).getTime() -
          new Date(a.eventDate || a.publishedAt).getTime()
        );
    }
  });

  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = sortedEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format category for display
  const formatCategory = (category: string) => {
    if (category === "View all") return "View all";
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get cover image or first image
  const getCoverImage = (event: Event) => {
    return event.coverImage || event.images[0];
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with filters and sort */}
        <div className="mb-8">
          {/* Desktop: Horizontal tabs and sort */}
          <div className="hidden lg:flex lg:justify-between lg:items-center">
            {/* Category tabs */}
            <div className="flex space-x-1 overflow-x-auto">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1); // Reset to first page when category changes
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-sunset-100 text-sunset-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {formatCategory(category)}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <span>Sort:</span>
                <span className="font-medium">{sortBy}</span>
                <ChevronDown size={16} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Dropdowns */}
          <div className="lg:hidden space-y-4">
            {/* Category dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <span>{formatCategory(activeCategory)}</span>
                <ChevronDown size={16} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setIsCategoryDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {formatCategory(category)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <span>Sort: {sortBy}</span>
                <ChevronDown size={16} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {currentEvents.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Link href={`/about/gallery/${event.slug.current}`}>
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {/* Horizontal Layout: Image Left, Content Right */}
                  <div className="flex">
                    {/* Image */}
                    <div className="relative w-1/2 aspect-[4/3] overflow-hidden">
                      <Image
                        src={urlFor(getCoverImage(event))
                          .width(400)
                          .height(300)
                          .url()}
                        alt={getCoverImage(event).alt || event.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        {/* Event Name */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200">
                          {event.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {event.description ||
                            "How do you create compelling presentations that wow your..."}
                        </p>
                      </div>

                      {/* View Gallery Link */}
                      <div className="flex items-center gap-2 text-sunset-200 group-hover:text-sunset-300 transition-colors duration-200">
                        <span className="text-sm font-medium">
                          View Gallery
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Images size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later for new events.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Pagination Info */}
            <p className="text-sm text-slate-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, sortedEvents.length)} of{" "}
              {sortedEvents.length} events
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === page
                          ? "bg-sunset-500 text-white"
                          : "text-slate-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
