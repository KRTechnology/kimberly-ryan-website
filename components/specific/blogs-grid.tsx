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

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/images/blog-image-one.jpg",
    author: "Olivia Rhye",
    date: "20 Jan 2025",
    category: "Design",
  },
  {
    id: 2,
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    image: "/images/blog-image-two.jpg",
    author: "Phoenix Baker",
    date: "19 Jan 2025",
    category: "Design",
  },
  {
    id: 3,
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    image: "/images/blog-image-three.png",
    author: "Lana Steiner",
    date: "18 Jan 2025",
    category: "Design",
  },
  {
    id: 4,
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/blog-image-four.jpg",
    author: "Alec Whitten",
    date: "17 Jan 2025",
    category: "Design",
  },
  {
    id: 5,
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
    image: "/images/blog-image-five.jpg",
    author: "Demi Wilkinson",
    date: "16 Jan 2025",
    category: "Design",
  },
  {
    id: 6,
    title: "What is wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    image: "/images/blog-image-six.jpg",
    author: "Candice Wu",
    date: "15 Jan 2025",
    category: "Design",
  },
  {
    id: 7,
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    image: "/images/blog-image-seven.jpg",
    author: "Natali Craig",
    date: "14 Jan 2025",
    category: "Design",
  },
  {
    id: 8,
    title: "Our top 10 Javascript frameworks to use",
    description:
      "JavaScript frameworks make development easier with extensive features and functionalities.",
    image: "/images/blog-image-eight.jpg",
    author: "Drew Cano",
    date: "13 Jan 2025",
    category: "Design",
  },
  {
    id: 9,
    title: "Advanced React Patterns",
    description:
      "Explore advanced React patterns and techniques for building scalable applications.",
    image: "/images/blog-image-one.jpg",
    author: "Sarah Johnson",
    date: "12 Jan 2025",
    category: "Software Development",
  },
  {
    id: 10,
    title: "Customer Success Strategies",
    description:
      "Proven strategies to increase customer satisfaction and retention rates.",
    image: "/images/blog-image-two.jpg",
    author: "Michael Chen",
    date: "11 Jan 2025",
    category: "Customer Success",
  },
  {
    id: 11,
    title: "Product Management Best Practices",
    description:
      "Essential practices every product manager should know and implement.",
    image: "/images/blog-image-three.png",
    author: "Emily Rodriguez",
    date: "10 Jan 2025",
    category: "Product",
  },
  {
    id: 12,
    title: "Design System Implementation",
    description:
      "How to build and maintain consistent design systems across teams.",
    image: "/images/blog-image-four.jpg",
    author: "Alex Thompson",
    date: "09 Jan 2025",
    category: "Design",
  },
];

const categories = [
  "View all",
  "Design",
  "Product",
  "Software Development",
  "Customer Success",
];

export default function BlogsGrid() {
  const [activeCategory, setActiveCategory] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const itemsPerPage = 6;

  const filteredArticles =
    activeCategory === "View all"
      ? blogArticles
      : blogArticles.filter((article) => article.category === activeCategory);

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

  return (
    <section className="py-16 lg:py-24 bg-[#FFF]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Filter tabs - Desktop */}
        <div className="hidden lg:block mb-12">
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
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
        <div className="lg:hidden mb-12">
          <div className="relative">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#181D27]"
            >
              <span>{activeCategory}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                      activeCategory === category
                        ? "text-orange-500 font-medium"
                        : "text-[#181D27]"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {currentArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Featured Image with Glassmorphism Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Glassmorphism Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm border-t border-white/20">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium">
                        {article.author}
                      </span>
                      <span className="text-white/80 text-sm">
                        {article.date}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium bg-white/20 px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#181D27] mb-3 leading-tight">
                  {article.title}
                </h2>
                <p className="text-[#535862] text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
                <Link
                  href={`/insights/blogs/${article.id}`}
                  className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200"
                >
                  <span>Read Post</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-[#535862] hover:text-[#181D27] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "text-[#535862] hover:text-[#181D27] hover:bg-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="flex items-center space-x-2 px-4 py-2 text-sm text-[#535862] hover:text-[#181D27] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={currentPage === totalPages}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
