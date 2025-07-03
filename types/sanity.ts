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
  showInFooter?: boolean;
  footerName?: string;
}

export interface FooterBlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  footerName: string;
  publishedAt: string;
}

export interface EventImage {
  _key: string;
  _type: "image";
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
  caption?: string;
}

export interface Event {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  images: EventImage[];
  coverImage?: EventImage;
  eventDate?: string;
  location?: string;
  category?:
    | "corporate"
    | "training"
    | "team_building"
    | "conference"
    | "awards"
    | "social"
    | "client_meeting"
    | "other";
  featured: boolean;
  active: boolean;
  attendees?: number;
  organizer?: string;
  tags?: string[];
  publishedAt: string;
  displayOrder: number;
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

export interface SanityFile {
  _type: "file";
  asset: {
    _id: string;
    url: string;
    originalFilename?: string;
    size?: number;
  };
}

export interface Person {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  position: string;
  department:
    | "leadership"
    | "management"
    | "hr"
    | "finance"
    | "sales"
    | "operations"
    | "advisory"
    | "recruitment"
    | "learning"
    | "other";
  level: "board" | "director" | "c_level" | "manager" | "senior" | "staff";
  image: SanityImage;
  bio?: string;
  linkedInUrl?: string;
  email?: string;
  phoneNumber?: string;
  expertise?: string[];
  yearsOfExperience?: number;
  displayOrder: number;
  featured: boolean;
  showOnWebsite: boolean;
  showOnLeadershipPage: boolean;
  showOnManagementPage: boolean;
  joinedDate?: string;
  internalNotes?: string;
}

export interface Webinar {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  subHeading?: string;
  keyPoints: string[];
  image: SanityImage;
  webinarUrl: string;
  trainingSlidesPdf?: SanityFile;
  category?:
    | "hr_essentials"
    | "recruitment"
    | "learning_development"
    | "leadership"
    | "compliance"
    | "employer_branding"
    | "diversity_inclusion"
    | "performance"
    | "engagement"
    | "strategic_hr"
    | "other";
  duration?: string;
  presenter?: string;
  dateRecorded?: string;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  tags?: string[];
  downloadCount?: number;
  viewCount?: number;
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
