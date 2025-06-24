import { Metadata } from "next";
import GalleryHero from "@/components/specific/gallery-hero";

export const metadata: Metadata = {
  title: "Gallery - Kimberly-Ryan Limited",
  description:
    "Visual showcase of our work and events - browse through our gallery of memorable moments and achievements.",
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      {/* Additional gallery content can be added here in the future */}
    </main>
  );
}
