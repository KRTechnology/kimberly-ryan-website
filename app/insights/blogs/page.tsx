import { Metadata } from "next";
import BlogsHero from "@/components/specific/blogs-hero";
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
      {/* Additional blogs content can be added here in the future */}
      <NewsletterSubscription />
    </main>
  );
}
