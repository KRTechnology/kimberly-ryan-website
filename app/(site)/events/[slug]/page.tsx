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
import { Brochure, Publication }  from "@/types/sanity";

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
    title:       `Schedule a Consultation — ${event.name} | Kimberly Ryan`,
    description: event.description || `Schedule a Consultation for ${event.name}`,
  };
}

export default async function EventRegistrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  const [event, brochures, publications] = await Promise.all([
    client.fetch(
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
    ),
    client.fetch(
      `*[_type == "brochure" && active == true] | order(displayOrder asc, publishedAt desc){
        _id, title, slug, description,
        pdfFile{ asset->{ _id, url, originalFilename } },
        coverImage{ asset->{ _id, url } },
        category, year, fileSize, pageCount,
        displayOrder, featured, active, tags
      }`
    ),
    client.fetch(
      `*[_type == "publication" && active == true] | order(displayOrder asc, publishedDate desc)[0...6]{
        _id, title, slug, description,
        image{ asset->{ _id, url } },
        pdfFile{ asset->{ _id, url, originalFilename } },
        category, author, publishedDate,
        fileSize, pageCount, featured, active, tags, summary
      }`
    ),
    client.fetch(
      `*[_type == "webinar" && active == true] | order(displayOrder asc)[0...8]{
        _id, title, slug, description, subHeading,
        image{ asset->{ _id, url } },
        webinarUrl, trainingSlidesPdf{ asset->{ _id, url, originalFilename } },
        category, presenter, duration, featured, active, displayOrder
      }`
    ),
  ]);

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
      brochures={brochures as Brochure[]}
      publications={publications as Publication[]}
    />
  );
}
