import LearningDevelopmentCTA from "@/components/specific/learning-development-cta";
import LearningDevelopmentHero from "@/components/specific/learning-development-hero";
import LearningDevelopmentMethods from "@/components/specific/learning-development-methods";
import LearningDevelopmentStrategicLeadership from "@/components/specific/learning-development-strategic-leadership";
import LearningDevelopmentWebinars from "@/components/specific/learning-development-webinars";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { getWebinarsPaginated } from "@/lib/sanity";

// ISR: Revalidate every 15 minutes
export const revalidate = 900;

export default async function LearningDevelopmentPage() {
  // Fetch first 3 webinars from Sanity with pagination info
  const { webinars, totalCount, hasMore } = await getWebinarsPaginated(0, 3);

  return (
    <>
      <LearningDevelopmentHero />
      <LearningDevelopmentMethods />
      <LearningDevelopmentStrategicLeadership />
      <LearningDevelopmentWebinars
        initialWebinars={webinars}
        totalCount={totalCount}
        initialHasMore={hasMore}
      />
      <LearningDevelopmentCTA />
      <NewsletterSubscription />
    </>
  );
}
