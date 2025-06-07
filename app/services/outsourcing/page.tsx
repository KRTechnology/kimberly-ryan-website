import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import OutsourcingHero from "@/components/specific/outsourcing-hero";
import OutsourcingTypes from "@/components/specific/outsourcing-types";

export default function OutsourcingPage() {
  return (
    <>
      <OutsourcingHero />
      <OutsourcingTypes />
      <NewsletterSubscription />
    </>
  );
}
