"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { GalleryItem } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface GalleryGridProps {
  galleryItems: GalleryItem[];
}

const categories = ["View all", "events", "team", "office", "awards", "other"];

const sortOptions = ["Most Recent", "Oldest First", "Alphabetical"];

export default function GalleryGrid({ galleryItems }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("View all");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const itemsPerPage = 8;

  const filteredItems =
    activeCategory === "View all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Sort items based on sortBy option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "Oldest First":
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      case "Alphabetical":
        return a.title.localeCompare(b.title);
      case "Most Recent":
      default:
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with filters and sort */}
        <div className="mb-8">
          {/* Desktop: Horizontal tabs and sort */}
          <div className="hidden lg:flex lg:justify-between lg:items-center">
            {/* Category tabs */}
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 capitalize ${
                    activeCategory === category
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {category === "View all" ? "View all" : category}
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
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm capitalize"
              >
                <span>
                  {activeCategory === "View all" ? "View all" : activeCategory}
                </span>
                <ChevronDown size={16} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg capitalize"
                    >
                      {category === "View all" ? "View all" : category}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(400).height(300).url()}
                    alt={item.image.alt || item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#DC6803] text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-[#535862] uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#181D27] mb-2 group-hover:text-[#DC6803] transition-colors duration-200">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-[#535862] text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#535862]">
                      {formatDate(item.publishedAt)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#DC6803] group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Pagination Info */}
            <p className="text-sm text-[#535862]">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, sortedItems.length)} of{" "}
              {sortedItems.length} results
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#535862] border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          ? "bg-[#DC6803] text-white"
                          : "text-[#535862] hover:bg-gray-50"
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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#535862] border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
