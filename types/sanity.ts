import { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content?: PortableTextBlock[];
  image: SanityImage;
  author: Author;
  category: Category;
  publishedAt: string;
  featured: boolean;
}

export interface GalleryItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  image: SanityImage;
  category: "events" | "team" | "office" | "awards" | "other";
  featured: boolean;
  publishedAt: string;
}

export interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  slug: {
    current: string;
  };
  description: string;
  buttonText: string;
  buttonLink: string;
  ctaType: "primary" | "secondary" | "text";
  image: SanityImage;
  imageStyle: "arc" | "rounded" | "square";
  backgroundColor: "white" | "gray-50" | "sunset-50" | "custom";
  customBackgroundColor?: string;
  order: number;
  featured: boolean;
  publishedAt: string;
}

export interface Company {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  logo: SanityImage;
  textLogo: SanityImage;
  websiteUrl?: string;
  industry:
    | "technology"
    | "healthcare"
    | "finance"
    | "education"
    | "ecommerce"
    | "media"
    | "professional"
    | "manufacturing"
    | "realestate"
    | "other";
  partnershipType:
    | "client"
    | "strategic"
    | "technology"
    | "vendor"
    | "investor";
  description?: string;
  testimonial?: string;
  order: number;
  featured: boolean;
  featuredOnHomepage: boolean;
  addedDate: string;
  logoBackgroundColor:
    | "default"
    | "white"
    | "blue-50"
    | "green-50"
    | "purple-50"
    | "custom";
  customBackgroundColor?: string;
}

export interface Page {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  content?: PortableTextBlock[];
  heroImage?: SanityImage;
  seo?: {
    title: string;
    description: string;
  };
}
