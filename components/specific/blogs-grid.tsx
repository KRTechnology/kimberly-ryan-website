"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost, Category } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface BlogsGridProps {
  blogPosts: BlogPost[];
  categories: Category[];
}

export default function BlogsGrid({ blogPosts, categories }: BlogsGridProps) {
  const [activeCategory, setActiveCategory] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const itemsPerPage = 6;

  // Prepare categories list with "View all" option
  const categoryOptions = [
    "View all",
    ...categories.map((cat) => cat.title),
  ];

  const filteredArticles =
    activeCategory === "View all"
      ? blogPosts
      : blogPosts.filter((post) => post.category.title === activeCategory);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-[#FFF]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Filter tabs - Desktop */}
        <div className="hidden lg:block mb-12">
          <div className="flex flex-wrap gap-1">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeCategory === category
                    ? "bg-white text-[#181D27] shadow-sm"
                    : "text-[#535862] hover:text-[#181D27] hover:bg-white/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filter dropdown - Mobile */}
        <div className="lg:hidden mb-8">
          <div className="relative">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-[#181D27] font-medium flex items-center justify-between"
            >
              {activeCategory}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  isCategoryDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                      activeCategory === category
                        ? "bg-gray-50 text-[#181D27] font-medium"
                        : "text-[#535862] hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((article) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <Link href={`/insights/blogs/${article.slug.current}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative h-[240px] overflow-hidden rounded-t-lg">
                    <Image
                      src={urlFor(article.image).width(400).height(240).url()}
                      alt={article.image.alt || article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Author and Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-[#535862]">
                        {article.author.name}
                      </span>
                      <span className="text-sm text-[#535862]">•</span>
                      <span className="text-sm text-[#535862]">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#181D27] mb-2 group-hover:text-[#DC6803] transition-colors duration-200">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#535862] text-sm leading-relaxed mb-4">
                      {article.description}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center text-[#DC6803] text-sm font-medium group-hover:gap-2 transition-all duration-200">
                      <span>Read post</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Pagination Info */}
            <p className="text-sm text-[#535862]">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredArticles.length)} of{" "}
              {filteredArticles.length} results
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
