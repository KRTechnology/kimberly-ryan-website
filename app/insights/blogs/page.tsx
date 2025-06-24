import { Metadata } from "next";
import BlogsHero from "@/components/specific/blogs-hero";
import BlogsGrid from "@/components/specific/blogs-grid";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";

export const metadata: Metadata = {
  title: "Blogs - Kimberly-Ryan Limited",
  description:
    "The latest industry news and guides curated by our expert team. Stay updated with insights from HR professionals.",
};

export default function BlogsPage() {
  return (
    <main>
      <BlogsHero />
      <BlogsGrid />
      <NewsletterSubscription />
    </main>
  );
}
