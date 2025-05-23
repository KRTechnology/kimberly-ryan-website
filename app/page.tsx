import Hero from "@/components/specific/hero";
import Publications from "@/components/specific/publications";
import TrustedCompanies from "@/components/specific/trusted-companies";
import OurServices from "@/components/specific/our-services";
import Testimonials from "@/components/specific/testimonials";
import WorkingWithUs from "@/components/specific/working-with-us";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";

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
