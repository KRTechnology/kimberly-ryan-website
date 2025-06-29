import EventImages from "@/components/specific/event-images";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { getEvent, getEvents } from "@/lib/sanity";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found - Kimberly-Ryan Limited",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.name} - Event Gallery - Kimberly-Ryan Limited`,
    description:
      event.description ||
      `View photos from ${event.name} at Kimberly-Ryan Limited.`,
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event: any) => ({
    slug: event.slug.current,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <EventImages event={event} />
      <NewsletterSubscription />
    </main>
  );
}
