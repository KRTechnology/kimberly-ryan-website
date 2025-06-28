import CustomerStoriesHero from "@/components/specific/customer-stories-hero";
import CustomerTestimonialsGrid from "@/components/specific/customer-testimonials-grid";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { getTestimonials } from "@/lib/sanity";
import { Testimonial } from "@/types/sanity";

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

export default async function CustomerStoriesPage() {
  // Fetch testimonials from Sanity
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <>
      <CustomerStoriesHero />
      <CustomerTestimonialsGrid testimonials={testimonials} />
      <NewsletterSubscription />
    </>
  );
}
