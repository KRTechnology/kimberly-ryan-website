"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Copy, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { BlogPost } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";
import NewsletterSubscriptionForm from "./newsletter-subscription-form";

interface BlogDetailProps {
  post: BlogPost;
}

// Portable Text components for rendering rich content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
          <Image
            src={urlFor(value).width(800).height(500).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.alt && (
          <p className="text-sm text-[#535862] italic">{value.alt}</p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold text-[#181D27] mb-6 mt-12">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-[#181D27] mb-4 mt-8">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-[#535862] leading-relaxed mb-6 text-base">
        {children}
      </p>
    ),
  },
};

export default function BlogDetail({ post }: BlogDetailProps) {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          <Image
            src={urlFor(post.image).width(1200).height(600).url()}
            alt={post.image.alt || post.title}
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
                    {post.author.name}
                  </span>
                  <span className="text-white/80 text-sm">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded">
                  {post.category.title}
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
                  {post.title}
                </h1>

                <p className="text-lg text-[#535862] leading-relaxed mb-6">
                  {post.description}
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
                {post.content && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PortableText
                      value={post.content}
                      components={portableTextComponents}
                    />
                  </motion.div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                {/* Author Info */}
                {post.author.image && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 rounded-lg p-6 mb-8"
                  >
                    <h3 className="text-lg font-semibold text-[#181D27] mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-start space-x-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={urlFor(post.author.image)
                            .width(48)
                            .height(48)
                            .url()}
                          alt={post.author.image.alt || post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#181D27] mb-1">
                          {post.author.name}
                        </p>
                        {post.author.bio && (
                          <div className="text-sm text-[#535862]">
                            <PortableText value={post.author.bio} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Newsletter Subscription */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
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
                  </div>
                  <NewsletterSubscriptionForm privacyTextColor="text-[#535862]" />
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
