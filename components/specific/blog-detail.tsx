"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Copy, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import NewsletterSubscriptionForm from "./newsletter-subscription-form";

interface BlogContent {
  introduction: string;
  sections: Array<{
    title: string;
    content: string;
    image?: string;
    imageCaption?: string;
  }>;
  quote: {
    text: string;
    author: string;
    title: string;
  };
}

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  category: string;
  content: BlogContent;
}

interface BlogDetailProps {
  article: BlogArticle;
}

export default function BlogDetail({ article }: BlogDetailProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />

          {/* Glassmorphism Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm border-t border-white/20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between py-6">
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">
                    {article.author}
                  </span>
                  <span className="text-white/80 text-sm">{article.date}</span>
                </div>
                <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* Article Header */}
              <header className="mb-8">
                <Link
                  href="/insights/blogs"
                  className="inline-flex items-center space-x-2 text-[#535862] hover:text-[#181D27] text-sm mb-6 transition-colors duration-200"
                >
                  <ArrowLeft size={16} />
                  <span>Back to blog</span>
                </Link>

                <h1 className="text-3xl lg:text-4xl font-bold text-[#181D27] mb-4 leading-tight">
                  {article.title}
                </h1>

                <p className="text-lg text-[#535862] leading-relaxed mb-6">
                  {article.description}
                </p>

                {/* Share buttons */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-[#535862]">Share:</span>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-[#535862] hover:text-[#181D27] transition-colors duration-200">
                      <Copy size={16} />
                    </button>
                    <button className="p-2 text-[#535862] hover:text-[#181D27] transition-colors duration-200">
                      <Facebook size={16} />
                    </button>
                    <button className="p-2 text-[#535862] hover:text-[#181D27] transition-colors duration-200">
                      <Linkedin size={16} />
                    </button>
                    <button className="p-2 text-[#535862] hover:text-[#181D27] transition-colors duration-200">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {article.content.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-semibold text-[#181D27] mb-6">
                      {section.title}
                    </h2>

                    <p className="text-[#535862] leading-relaxed mb-6 text-base">
                      {section.content}
                    </p>

                    {section.image && (
                      <div className="mb-8">
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {section.imageCaption && (
                          <p className="text-sm text-[#535862] italic">
                            {section.imageCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Quote Section */}
                {article.content.quote && (
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="border-l-4 border-orange-500 pl-6 py-6 my-12 bg-gray-50 rounded-r-lg"
                  >
                    <p className="text-lg font-medium text-[#181D27] mb-4 italic leading-relaxed">
                      "{article.content.quote.text}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {article.content.quote.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#181D27]">
                          {article.content.quote.author}
                        </p>
                        <p className="text-sm text-[#535862]">
                          {article.content.quote.title}
                        </p>
                      </div>
                    </div>
                  </motion.blockquote>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                {/* Newsletter Subscription */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#181D27] mb-3">
                      Weekly newsletter
                    </h3>
                    <p className="text-sm text-[#535862] leading-relaxed mb-4">
                      No spam. Just the latest releases and tips, interesting
                      articles, and exclusive interviews in your inbox every
                      week.
                    </p>
                    <p className="text-xs text-[#535862]">
                      Read about our privacy policy.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium">
                      Subscribe
                    </button>
                  </div>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
