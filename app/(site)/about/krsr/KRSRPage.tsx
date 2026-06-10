import Hero         from "@/components/specific/krsr-hero";
import About        from "@/components/specific/krsr-about";
import Schools      from "@/components/specific/krsr-schools";
import Topics       from "@/components/specific/krsr-topics";
import Testimonials from "@/components/specific/krsr-testimonials";
import Gallery      from "@/components/specific/krsr-gallery";
import Goals        from "@/components/specific/krsr-goals";
import Documents    from "@/components/specific/krsr-documents";
import CTA          from "@/components/specific/krsr-cta";

export default function KRSRPage() {
  return (
    <main>
      <Hero />
      <About />
      <Schools />
      <Topics />
      <Testimonials />
      <Gallery />
      <Goals />
      <Documents />
      <CTA />
    </main>
  );
}
