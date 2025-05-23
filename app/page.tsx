import Hero from "@/components/specific/hero";
import Publications from "@/components/specific/publications";
import TrustedCompanies from "@/components/specific/trusted-companies";
import OurServices from "@/components/specific/our-services";
import Testimonials from "@/components/specific/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Publications />
      <TrustedCompanies />
      <OurServices />
      <Testimonials />
    </>
  );
}
