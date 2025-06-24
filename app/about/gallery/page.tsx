import { Metadata } from "next";
import GalleryHero from "@/components/specific/gallery-hero";
import GalleryGrid from "@/components/specific/gallery-grid";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";

export const metadata: Metadata = {
  title: "Gallery - Kimberly-Ryan Limited",
  description:
    "Visual showcase of our work and events - browse through our gallery of memorable moments and achievements.",
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      <GalleryGrid />
      <NewsletterSubscription />
    </main>
  );
}
