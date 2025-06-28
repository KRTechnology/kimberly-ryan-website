import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import OurPeopleHero from "@/components/specific/our-people-hero";
import OurPeopleManagement from "@/components/specific/our-people-management";
import { getLeadershipTeam, getManagementTeam } from "@/lib/sanity";
import { Person } from "@/types/sanity";

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

export default async function OurPeoplePage() {
  // Fetch both leadership and management teams from Sanity in parallel
  const [leadershipTeam, managementTeam]: [Person[], Person[]] =
    await Promise.all([getLeadershipTeam(), getManagementTeam()]);

  return (
    <>
      <OurPeopleHero leadershipTeam={leadershipTeam} />
      <OurPeopleManagement managementTeam={managementTeam} />
      <NewsletterSubscription />
    </>
  );
}
