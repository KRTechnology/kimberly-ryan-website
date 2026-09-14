// app/(site)/events/[slug]/page.tsx
// Create the folder: app/(site)/events/[slug]/
// Save this file inside it as page.tsx
//
// This is a SERVER component — it fetches the event from Sanity
// and passes the data down to the client form component.
// Every event you create in Sanity Studio automatically gets its own
// registration page at /events/[slug].

import { notFound }               from "next/navigation";
import { createClient }           from "@sanity/client";
import imageUrlBuilder            from "@sanity/image-url";
import EventRegistrationForm      from "@/components/specific/EventRegistrationForm";

export const dynamic = "force-dynamic";

const client = createClient({
  projectId:  "h28ja2xu",
  dataset:    "production",
  apiVersion: "2024-01-01",
  useCdn:     true,
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}



// Generate page metadata from the event name
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{ name, description }`,
    { slug }
  );
  if (!event) return { title: "Event Not Found" };
  return {
    title:       `Register — ${event.name} | Kimberly Ryan`,
    description: event.description || `Register for ${event.name}`,
  };
}

export default async function EventRegistrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await client.fetch(
    `*[_type == "event" && slug.current == $slug && active == true][0]{
      _id,
      name,
      "slug": slug.current,
      description,
      eventDate,
      location,
      images,
      "coverImage": images[0]
    }`,
    { slug }
  );

  // Show 404 if event doesn't exist or isn't active
  if (!event) {
    notFound();
  }

  // Build the cover image URL from Sanity's image asset
  const coverImageUrl = event.coverImage
    ? urlFor(event.coverImage).width(800).height(1000).url()
    : undefined;

  return (
    <EventRegistrationForm
      eventName={event.name}
      eventSlug={event.slug}
      eventDate={event.eventDate}
      eventLocation={event.location}
      eventDescription={event.description}
      coverImageUrl={coverImageUrl}
    />
  );
}
