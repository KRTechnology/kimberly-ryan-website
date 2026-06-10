import "./krsr-styles.css";
import Hero         from "./components/Hero";
import About        from "./components/About";
import Schools      from "./components/Schools";
import Topics       from "./components/Topics";
import Testimonials from "./components/Testimonials";
import Gallery      from "./components/Gallery";
import Goals        from "./components/Goals";
import Documents    from "./components/Documents";
import CTA          from "./components/CTA";

export default function KRSRPage() {
  return (
    <>
      <Hero />
      <About />
      <Schools />
      <Topics />
      <Testimonials />
      <Gallery />
      <Goals />
      <Documents />
      <CTA />
    </>
  );
}
