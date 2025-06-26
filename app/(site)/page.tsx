import Hero from "@/components/specific/hero";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import OurServices from "@/components/specific/our-services";
import Publications from "@/components/specific/publications";
import Testimonials from "@/components/specific/testimonials";
import TrustedCompanies from "@/components/specific/trusted-companies";
import WorkingWithUs from "@/components/specific/working-with-us";

export default function Home() {
  return (
    <>
      <Hero />
      <Publications />
      <TrustedCompanies />
      <OurServices />
      <Testimonials />
      <WorkingWithUs />
      <NewsletterSubscription />
    </>
  );
}
