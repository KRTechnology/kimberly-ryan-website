import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import OurPeopleHero from "@/components/specific/our-people-hero";
import OurPeopleManagement from "@/components/specific/our-people-management";

export default function OurPeoplePage() {
  return (
    <>
      <OurPeopleHero />
      <OurPeopleManagement />
      <NewsletterSubscription />
    </>
  );
}
