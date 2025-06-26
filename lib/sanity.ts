import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

// Helper function to get blog posts
export async function getBlogPosts() {
  return client.fetch(`
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
  `);
}

// Helper function to get single blog post
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
    { slug }
  );
}

// Helper function to get gallery items
export async function getGalleryItems() {
  return client.fetch(`
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
  `);
}

// Helper function to get categories
export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `);
}

// Helper function to get authors
export async function getAuthors() {
  return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio
    }
  `);
}
