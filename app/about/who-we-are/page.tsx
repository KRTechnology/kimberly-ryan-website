import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import WhoWeAreContent from "@/components/specific/who-we-are-content";
import CompanyIntroductionVideo from "@/components/specific/company-introduction-video";
import VisionMissionSection from "@/components/specific/vision-mission-section";

export default function WhoWeArePage() {
  return (
    <>
      <WhoWeAreContent />
      <CompanyIntroductionVideo />
      <VisionMissionSection />
      <NewsletterSubscription />
    </>
  );
}
