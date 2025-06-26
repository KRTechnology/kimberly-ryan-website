import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import WhoWeAreContent from "@/components/specific/who-we-are-content";
import CompanyIntroductionVideo from "@/components/specific/company-introduction-video";
import VisionMissionSection from "@/components/specific/vision-mission-section";
import CoreValuesSection from "@/components/specific/core-values-section";
import WhyChooseUsSection from "@/components/specific/why-choose-us-section";
import AboutStatsSection from "@/components/specific/about-stats-section";

export default function WhoWeArePage() {
  return (
    <>
      <WhoWeAreContent />
      <CompanyIntroductionVideo />
      <VisionMissionSection />
      <CoreValuesSection />
      <WhyChooseUsSection />
      <AboutStatsSection />
      <NewsletterSubscription />
    </>
  );
}
