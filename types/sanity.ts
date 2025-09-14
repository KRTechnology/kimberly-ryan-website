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

export interface Brochure {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  pdfFile: SanityFile;
  coverImage?: SanityImage;
  category:
    | "learning_development"
    | "hr_advisory"
    | "recruitment"
    | "leadership"
    | "corporate_training"
    | "compliance"
    | "digital_solutions"
    | "general"
    | "other";
  year: string;
  fileSize?: number;
  pageCount?: number;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  downloadCount?: number;
  tags?: string[];
  publishedAt: string;
  validUntil?: string;
  internalNotes?: string;
}

export interface Publication {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  image: SanityImage;
  pdfFile: SanityFile;
  category?:
    | "white_paper"
    | "research_report"
    | "policy_brief"
    | "industry_analysis"
    | "best_practices"
    | "case_study"
    | "regulatory_update"
    | "market_insights"
    | "hr_advisory"
    | "other";
  author?: string;
  publishedDate: string;
  fileSize?: number;
  pageCount?: number;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  tags?: string[];
  downloadCount?: number;
  summary?: string[];
  targetAudience?:
    | "hr_professionals"
    | "business_leaders"
    | "employers"
    | "recruiters"
    | "legal_compliance"
    | "general_public"
    | "industry_specific"
    | "all_stakeholders";
  internalNotes?: string;
}

export interface WhatsNew {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  image: SanityImage;
  contentType:
    | "publication"
    | "blog"
    | "webinar"
    | "event"
    | "external"
    | "custom";
  contentReference?: {
    _id: string;
    _type: string;
    slug?: {
      current: string;
    };
    title?: string;
    name?: string;
    pdfFile?: SanityFile;
  };
  customLink?: string;
  buttonText: string;
  openInNewTab: boolean;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  publishedAt: string;
  expiresAt?: string;
  category?:
    | "publications"
    | "research"
    | "industry_updates"
    | "company_news"
    | "training"
    | "events"
    | "regulatory"
    | "best_practices"
    | "other";
  tags?: string[];
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

export interface TrainingModule {
  title: string;
  topics: string[];
}

export interface TrainingVenue {
  name: string;
  description: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl?: string;
}

export interface TrainingEventDetails {
  duration: string;
  contactEmail: string;
  venue: TrainingVenue;
}

export interface TrainingPricingOption {
  label: string;
  price: string;
  description?: string;
}

export interface TrainingProgramFees {
  description: string;
  pricingOptions: TrainingPricingOption[];
}

export interface TrainingDesignedFor {
  image: SanityImage;
  mainText: string;
  targetAudience: string[];
}

export interface Training {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  subtitle: string;
  brochureUrl?: string;
  brochureTitle?: string;
  designedFor: TrainingDesignedFor;
  programModules: TrainingModule[];
  eventDetails: TrainingEventDetails;
  programFees: TrainingProgramFees;
  category: string;
  registrationUrl?: string;
  registrationForm?: TrainingRegistrationForm;
  featured: boolean;
  publishedAt: string;
  validUntil?: string;
  tags?: string[];
}

export interface TrainingRegistrationFormField {
  fieldName: string;
  label: string;
  fieldType:
    | "text"
    | "email"
    | "number"
    | "tel"
    | "select"
    | "textarea"
    | "radio"
    | "checkbox";
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    errorMessage?: string;
  };
  displayOrder: number;
  width: "full" | "half" | "third" | "two-thirds";
}

export interface TrainingRegistrationFormSettings {
  submitButtonText: string;
  successMessage: string;
  redirectUrl?: string;
  notificationEmail?: string;
}

export interface TrainingRegistrationForm {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  training: Training;
  formFields: TrainingRegistrationFormField[];
  settings: TrainingRegistrationFormSettings;
  active: boolean;
  publishedAt: string;
  expiresAt?: string;
  maxSubmissions?: number;
  internalNotes?: string;
}

export interface TrainingRegistrationFormResponse {
  fieldName: string;
  fieldLabel: string;
  value?: string;
  fieldType?: string;
}

export interface TrainingRegistrationCommunicationLog {
  date: string;
  type:
    | "email_sent"
    | "phone_call"
    | "sms_sent"
    | "meeting_scheduled"
    | "follow_up_required";
  note: string;
  staff?: string;
}

export interface TrainingRegistrationDetails {
  confirmed: boolean;
  confirmationDate?: string;
  paymentStatus: "pending" | "paid" | "partial" | "refunded" | "waived";
  amountPaid?: number;
  paymentMethod?: string;
  invoiceNumber?: string;
}

export interface TrainingRegistrationSubmission {
  _id: string;
  registrationForm: TrainingRegistrationForm;
  training: Training;
  firstName: string;
  lastName: string;
  personalEmail: string;
  workEmail: string;
  jobRole: string;
  yearsOfExperience: number;
  formData: {
    responses: TrainingRegistrationFormResponse[];
  };
  submissionDate: string;
  status:
    | "new"
    | "reviewed"
    | "contacted"
    | "registered"
    | "cancelled"
    | "no_show"
    | "completed";
  source: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  primaryContact: "personal_email" | "work_email" | "phone";
  communicationLog?: TrainingRegistrationCommunicationLog[];
  assignedTo?: string;
  priority: "low" | "normal" | "high" | "urgent";
  tags?: string[];
  internalNotes?: string;
  registrationDetails?: TrainingRegistrationDetails;
}
