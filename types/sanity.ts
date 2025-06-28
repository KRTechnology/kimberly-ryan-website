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

export interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  industry?:
    | "banking"
    | "healthcare"
    | "technology"
    | "manufacturing"
    | "consulting"
    | "nonprofit"
    | "education"
    | "government"
    | "media"
    | "other";
  serviceType?:
    | "hr_advisory"
    | "recruitment"
    | "learning_development"
    | "outsourcing"
    | "consultation"
    | "training"
    | "other";
  rating?: number;
  projectDuration?:
    | "less_than_1_month"
    | "1_3_months"
    | "3_6_months"
    | "6_12_months"
    | "more_than_1_year"
    | "ongoing";
  featured: boolean;
  displayOrder: number;
  active: boolean;
  dateReceived: string;
  internalNotes?: string;
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
