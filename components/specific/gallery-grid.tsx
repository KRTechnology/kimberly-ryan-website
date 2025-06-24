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

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Annual Leadership Summit 2024",
    description:
      "How do you create compelling presentations that wow your colleague and boss? This guide shows you...",
    image: "/images/gallery-image-one.jpg",
    category: "Events",
  },
  {
    id: 2,
    title: "Digital Transformation Workshop",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how we do it...",
    image: "/images/gallery-image-two.jpg",
    category: "Technology",
  },
  {
    id: 3,
    title: "API Development Masterclass",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing...",
    image: "/images/gallery-image-three.png",
    category: "Technology",
  },
  {
    id: 4,
    title: "Mental Models in Management",
    description:
      "Mental models are simple expressions of complex processes or relationships...",
    image: "/images/gallery-image-four.jpg",
    category: "Training",
  },
  {
    id: 5,
    title: "What is wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry...",
    image: "/images/gallery-image-five.jpg",
    category: "Design",
  },
  {
    id: 6,
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better...",
    image: "/images/gallery-image-six.png",
    category: "Design",
  },
  {
    id: 7,
    title: "Our top 10 Javascript frameworks to use in 2025",
    description:
      "JavaScript frameworks make development easier and faster. Here are our top picks...",
    image: "/images/gallery-image-seven.jpg",
    category: "Technology",
  },
  {
    id: 8,
    title: "Podcast: Creating a better CX Community",
    description:
      "Starting a community doesn't have to be daunting. Here's how we built ours from the ground up...",
    image: "/images/gallery-image-eight.jpg",
    category: "Community",
  },
];

const categories = [
  "View all",
  "Events",
  "Technology",
  "Training",
  "Design",
  "Community",
];
const sortOptions = ["Most Recent", "Oldest First", "Alphabetical"];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("View all");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const itemsPerPage = 8; // Show all items
  const totalPages = 10; // As shown in the mockup

  const filteredItems =
    activeCategory === "View all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const currentItems = filteredItems; // Show all filtered items

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
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeCategory === category
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {category}
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
                <span>{activeCategory}</span>
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
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {category}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200"
                >
                  <span>View Gallery</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination - Mobile only */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
