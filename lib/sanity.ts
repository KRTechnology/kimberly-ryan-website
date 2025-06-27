import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production, but disable for development for fresher data
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  perspective: "published", // Only fetch published documents
});

// Client for admin operations (if needed)
export const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Never use CDN for admin operations
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN, // Required for write operations
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

// Helper function to get hero slides with cache tags
export async function getHeroSlides() {
  return client.fetch(
    `
    *[_type == "hero" && featured == true] | order(order asc, publishedAt desc) {
      _id,
      title,
      subtitle,
      slug,
      description,
      buttonText,
      buttonLink,
      ctaType,
      image,
      imageStyle,
      backgroundColor,
      customBackgroundColor,
      order,
      featured,
      publishedAt
    }
  `,
    {},
    {
      next: {
        revalidate: 300, // Cache for 5 minutes (hero slides change less frequently)
        tags: ["hero-slides"],
      },
    }
  );
}

// Helper function to get blog posts with cache tags
export async function getBlogPosts() {
  return client.fetch(
    `
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      image,
      publishedAt,
      featured,
      author->{
        name,
        image
      },
      category->{
        title,
        slug
      }
    }
  `,
    {},
    {
      next: {
        revalidate: 60, // Cache for 60 seconds
        tags: ["blog-posts", "blog-list"],
      },
    }
  );
}

// Helper function to get single blog post with cache tags
export async function getBlogPost(slug: string) {
  return client.fetch(
    `
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      image,
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      category->{
        title,
        slug
      }
    }
  `,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: ["blog-posts", `blog-${slug}`],
      },
    }
  );
}

// Helper function to get gallery items with cache tags
export async function getGalleryItems() {
  return client.fetch(
    `
    *[_type == "gallery"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      image,
      category,
      featured,
      publishedAt
    }
  `,
    {},
    {
      next: {
        revalidate: 300, // Cache for 5 minutes (gallery changes less frequently)
        tags: ["gallery-items"],
      },
    }
  );
}

// Helper function to get categories with cache tags
export async function getCategories() {
  return client.fetch(
    `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `,
    {},
    {
      next: {
        revalidate: 3600, // Cache for 1 hour (categories change rarely)
        tags: ["categories"],
      },
    }
  );
}

// Helper function to get authors with cache tags
export async function getAuthors() {
  return client.fetch(
    `
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio
    }
  `,
    {},
    {
      next: {
        revalidate: 3600, // Cache for 1 hour (authors change rarely)
        tags: ["authors"],
      },
    }
  );
}
