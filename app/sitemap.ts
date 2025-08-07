import { MetadataRoute } from "next";
import {
  getBlogPosts,
  getEvents,
  getWebinars,
  getBrochures,
  getPeople,
} from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.kimberly-ryan.com";
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about/who-we-are`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/our-people`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/customer-stories`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/hr-advisory`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/learning-development`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/recruitment`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/outsourcing`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/support`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic content from Sanity
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // Blog posts
    const blogPosts = await getBlogPosts();
    const blogPages = blogPosts.map((post: any) => ({
      url: `${baseUrl}/insights/blogs/${post.slug.current}`,
      lastModified: post.publishedAt || currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    // Event gallery pages
    const events = await getEvents();
    const eventPages = events.map((event: any) => ({
      url: `${baseUrl}/about/gallery/${event.slug.current}`,
      lastModified: event.publishedAt || currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    // Webinars (if they have individual pages)
    const webinars = await getWebinars();
    const webinarPages = webinars.map((webinar: any) => ({
      url: `${baseUrl}/insights/webinars/${webinar.slug.current}`,
      lastModified: webinar.dateRecorded || currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    // Brochures (if they have individual pages)
    const brochures = await getBrochures();
    const brochurePages = brochures.map((brochure: any) => ({
      url: `${baseUrl}/resources/brochures/${brochure.slug.current}`,
      lastModified: brochure.publishedAt || currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

    // Team member pages (if they have individual pages)
    const people = await getPeople();
    const peoplePages = people.map((person: any) => ({
      url: `${baseUrl}/about/our-people/${person.slug.current}`,
      lastModified: person.joinedDate || currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

    dynamicPages = [
      ...blogPages,
      ...eventPages,
      ...webinarPages,
      ...brochurePages,
      ...peoplePages,
    ];
  } catch (error) {
    console.error("Error fetching dynamic content for sitemap:", error);
  }

  // External pages
  const externalPages = [
    {
      url: "https://www.kracada.com/",
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: "https://www.youtube.com/@kracada01",
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...dynamicPages, ...externalPages];
}
