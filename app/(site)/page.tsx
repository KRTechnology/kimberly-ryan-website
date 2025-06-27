import Hero from "@/components/specific/hero";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import OurServices from "@/components/specific/our-services";
import Publications from "@/components/specific/publications";
import Testimonials from "@/components/specific/testimonials";
import TrustedCompanies from "@/components/specific/trusted-companies";
import WorkingWithUs from "@/components/specific/working-with-us";
import { getHeroSlides } from "@/lib/sanity";

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

export default async function Home() {
  const heroSlides = await getHeroSlides();

  return (
    <>
      <Hero heroSlides={heroSlides} />
      <Publications />
      <TrustedCompanies />
      <OurServices />
      <Testimonials />
      <WorkingWithUs />
      <NewsletterSubscription />
    </>
  );
}
