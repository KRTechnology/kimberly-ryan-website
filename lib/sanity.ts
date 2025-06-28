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

// Helper function to get companies for homepage with cache tags
export async function getHomepageCompanies() {
  return client.fetch(
    `
    *[_type == "company" && featured == true && featuredOnHomepage == true] | order(order asc, addedDate desc) {
      _id,
      name,
      slug,
      logo,
      textLogo,
      websiteUrl,
      industry,
      partnershipType,
      order,
      featured,
      featuredOnHomepage,
      logoBackgroundColor,
      customBackgroundColor,
      addedDate
    }
  `,
    {},
    {
      next: {
        revalidate: 600, // Cache for 10 minutes (companies change less frequently)
        tags: ["companies", "homepage-companies"],
      },
    }
  );
}

// Helper function to get all companies with cache tags
export async function getCompanies() {
  return client.fetch(
    `
    *[_type == "company" && featured == true] | order(order asc, addedDate desc) {
      _id,
      name,
      slug,
      logo,
      textLogo,
      websiteUrl,
      industry,
      partnershipType,
      description,
      testimonial,
      order,
      featured,
      featuredOnHomepage,
      logoBackgroundColor,
      customBackgroundColor,
      addedDate
    }
  `,
    {},
    {
      next: {
        revalidate: 600, // Cache for 10 minutes (companies change less frequently)
        tags: ["companies"],
      },
    }
  );
}

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

// Helper function to get testimonials with cache tags
export async function getTestimonials() {
  return client.fetch(
    `
    *[_type == "testimonial" && active == true] | order(displayOrder asc, dateReceived desc) {
      _id,
      quote,
      author,
      position,
      company,
      industry,
      serviceType,
      rating,
      projectDuration,
      featured,
      displayOrder,
      active,
      dateReceived
    }
  `,
    {},
    {
      next: {
        revalidate: 600, // Cache for 10 minutes (testimonials change less frequently)
        tags: ["testimonials"],
      },
    }
  );
}

// Helper function to get featured testimonials with cache tags
export async function getFeaturedTestimonials() {
  return client.fetch(
    `
    *[_type == "testimonial" && active == true && featured == true] | order(displayOrder asc, dateReceived desc) {
      _id,
      quote,
      author,
      position,
      company,
      industry,
      serviceType,
      rating,
      projectDuration,
      featured,
      displayOrder,
      active,
      dateReceived
    }
  `,
    {},
    {
      next: {
        revalidate: 600, // Cache for 10 minutes (testimonials change less frequently)
        tags: ["testimonials", "featured-testimonials"],
      },
    }
  );
}

// Helper function to get leadership team members with cache tags
export async function getLeadershipTeam() {
  return client.fetch(
    `
    *[_type == "person" && showOnWebsite == true && showOnLeadershipPage == true] | order(displayOrder asc, name asc) {
      _id,
      name,
      slug,
      position,
      department,
      level,
      image,
      bio,
      linkedInUrl,
      email,
      phoneNumber,
      expertise,
      yearsOfExperience,
      displayOrder,
      featured,
      showOnWebsite,
      showOnLeadershipPage,
      joinedDate
    }
  `,
    {},
    {
      next: {
        revalidate: 1800, // Cache for 30 minutes (team changes less frequently)
        tags: ["team-members", "leadership-team"],
      },
    }
  );
}

// Helper function to get management team members with cache tags
export async function getManagementTeam() {
  return client.fetch(
    `
    *[_type == "person" && showOnWebsite == true && showOnManagementPage == true] | order(displayOrder asc, name asc) {
      _id,
      name,
      slug,
      position,
      department,
      level,
      image,
      bio,
      linkedInUrl,
      email,
      phoneNumber,
      expertise,
      yearsOfExperience,
      displayOrder,
      featured,
      showOnWebsite,
      showOnManagementPage,
      joinedDate
    }
  `,
    {},
    {
      next: {
        revalidate: 1800, // Cache for 30 minutes (team changes less frequently)
        tags: ["team-members", "management-team"],
      },
    }
  );
}

// Helper function to get all team members with cache tags
export async function getAllTeamMembers() {
  return client.fetch(
    `
    *[_type == "person" && showOnWebsite == true] | order(department asc, displayOrder asc, name asc) {
      _id,
      name,
      slug,
      position,
      department,
      level,
      image,
      bio,
      linkedInUrl,
      email,
      phoneNumber,
      expertise,
      yearsOfExperience,
      displayOrder,
      featured,
      showOnWebsite,
      showOnLeadershipPage,
      showOnManagementPage,
      joinedDate
    }
  `,
    {},
    {
      next: {
        revalidate: 1800, // Cache for 30 minutes (team changes less frequently)
        tags: ["team-members"],
      },
    }
  );
}

// Helper function to get webinars with pagination support
export async function getWebinarsPaginated(
  offset: number = 0,
  limit: number = 3
) {
  // Fetch all webinars first, then apply pagination manually
  // This approach works around Sanity GROQ slice notation issues
  const allWebinars = await client.fetch(
    `
    *[_type == "webinar" && active == true] | order(displayOrder asc, dateRecorded desc) {
      _id,
      title,
      slug,
      description,
      subHeading,
      keyPoints,
      image,
      webinarUrl,
      trainingSlidesPdf {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      duration,
      presenter,
      dateRecorded,
      displayOrder,
      featured,
      active,
      tags,
      downloadCount,
      viewCount
    }
  `,
    {},
    {
      next: {
        revalidate: 900, // Cache for 15 minutes
        tags: ["webinars"],
      },
    }
  );

  // Apply pagination manually
  const webinars = allWebinars.slice(offset, offset + limit);

  // Get total count
  const totalCount = allWebinars.length;

  return {
    webinars,
    totalCount,
    hasMore: offset + limit < totalCount,
  };
}

// Helper function to get webinars with cache tags
export async function getWebinars() {
  return client.fetch(
    `
    *[_type == "webinar" && active == true] | order(displayOrder asc, dateRecorded desc) {
      _id,
      title,
      slug,
      description,
      subHeading,
      keyPoints,
      image,
      webinarUrl,
      trainingSlidesPdf {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      duration,
      presenter,
      dateRecorded,
      displayOrder,
      featured,
      active,
      tags,
      downloadCount,
      viewCount
    }
  `,
    {},
    {
      next: {
        revalidate: 900, // Cache for 15 minutes (webinars change less frequently)
        tags: ["webinars"],
      },
    }
  );
}

// Helper function to get featured webinars with cache tags
export async function getFeaturedWebinars() {
  return client.fetch(
    `
    *[_type == "webinar" && active == true && featured == true] | order(displayOrder asc, dateRecorded desc) {
      _id,
      title,
      slug,
      description,
      subHeading,
      keyPoints,
      image,
      webinarUrl,
      trainingSlidesPdf {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      duration,
      presenter,
      dateRecorded,
      displayOrder,
      featured,
      active,
      tags,
      downloadCount,
      viewCount
    }
  `,
    {},
    {
      next: {
        revalidate: 900, // Cache for 15 minutes (webinars change less frequently)
        tags: ["webinars", "featured-webinars"],
      },
    }
  );
}

// Helper function to get webinars by category with cache tags
export async function getWebinarsByCategory(category: string) {
  return client.fetch(
    `
    *[_type == "webinar" && active == true && category == $category] | order(displayOrder asc, dateRecorded desc) {
      _id,
      title,
      slug,
      description,
      subHeading,
      keyPoints,
      image,
      webinarUrl,
      trainingSlidesPdf {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      duration,
      presenter,
      dateRecorded,
      displayOrder,
      featured,
      active,
      tags,
      downloadCount,
      viewCount
    }
  `,
    { category },
    {
      next: {
        revalidate: 900, // Cache for 15 minutes (webinars change less frequently)
        tags: ["webinars", `webinars-${category}`],
      },
    }
  );
}
