import HrAdvisoryHero from "@/components/specific/hr-advisory-hero";
import HrAdvisoryServicesOverview from "@/components/specific/hr-advisory-services-overview";
import HrAdvisoryDEI from "@/components/specific/hr-advisory-dei";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";

export default function HrAdvisoryPage() {
  return (
    <>
      <HrAdvisoryHero />
      <HrAdvisoryServicesOverview />
      <HrAdvisoryDEI />
      <NewsletterSubscription />
    </>
  );
}
 