import { Metadata } from "next";
import BlogsHero from "@/components/specific/blogs-hero";
import BlogsGrid from "@/components/specific/blogs-grid";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { getBlogPosts, getCategories } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blogs - Kimberly-Ryan Limited",
  description:
    "The latest industry news and guides curated by our expert team. Stay updated with insights from HR professionals.",
};

// Enable ISR - revalidate every 60 seconds in production
export const revalidate = 60;

export default async function BlogsPage() {
  const [blogPosts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  return (
    <main>
      <BlogsHero />
      <BlogsGrid blogPosts={blogPosts} categories={categories} />
      <NewsletterSubscription />
    </main>
  );
}
