import LearningDevelopmentCTA from "@/components/specific/learning-development-cta";
import LearningDevelopmentHero from "@/components/specific/learning-development-hero";
import LearningDevelopmentMethods from "@/components/specific/learning-development-methods";
import LearningDevelopmentStrategicLeadership from "@/components/specific/learning-development-strategic-leadership";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";

export default function LearningDevelopmentPage() {
  return (
    <>
      <LearningDevelopmentHero />
      <LearningDevelopmentMethods />
      <LearningDevelopmentStrategicLeadership />
      <LearningDevelopmentCTA />
      <NewsletterSubscription />
    </>
  );
}
