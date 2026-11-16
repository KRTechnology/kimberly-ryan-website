/**
 * Shared content and design tokens for the Kimberly Ryan Ghana site
 * (served on ghana.kimberly-ryan.com).
 *
 * Colours mirror the main kimberly-ryan.com site: white and #FAFAFA / #EDECEB
 * greys, #181D27 / #535862 text, #373433 for dark blocks and #EB821D as the
 * single accent. Keep new sections on that palette rather than adding tints.
 */

export const MAIN_SITE_URL = "https://www.kimberly-ryan.com";
export const CV_SUBMISSION_URL = "https://www.kracada.com/jobs";

export const GHANA_PHONE_DISPLAY = "+233 50 725 7601";
export const GHANA_PHONE_TEL = "+233507257601";
export const GHANA_EMAIL = "info@kimberly-ryan.com";

export const GHANA_NAV = [
  { label: "Services", href: "#services" },
  { label: "Ghana compliance", href: "#compliance" },
  { label: "Why us", href: "#why-us" },
  { label: "Candidates", href: "#candidates" },
  { label: "Contact", href: "#contact" },
] as const;

export const GHANA_SERVICES = [
  {
    title: "Outsourcing",
    description:
      "Payroll, people, project and HR process outsourcing, plus an HR operations partner on your site.",
    cta: "See outsourcing",
    href: `${MAIN_SITE_URL}/services/outsourcing`,
  },
  {
    title: "Recruitment solutions",
    description:
      "Executive search, assessment centres, graduate trainee programmes and background checks.",
    cta: "See recruitment",
    href: `${MAIN_SITE_URL}/services/recruitment`,
  },
  {
    title: "Learning and development",
    description:
      "Leadership and management programmes, bootcamps, coaching and e-learning, delivered in person or online.",
    cta: "See training",
    href: `${MAIN_SITE_URL}/services/learning-development`,
  },
  {
    title: "HR advisory",
    description:
      "Culture, change, rewards, performance systems, workforce analytics and succession planning.",
    cta: "See advisory",
    href: `${MAIN_SITE_URL}/services/hr-advisory`,
  },
] as const;

export const GHANA_COMPLIANCE_POINTS = [
  "PAYE returns filed with the Ghana Revenue Authority",
  "SSNIT contributions and Tier 2 and Tier 3 pension remittances",
  "Contracts and policies reviewed against the Labour Act",
  "Payslips and statutory reports ready for every pay cycle",
] as const;

export const GHANA_STATS = [
  { lead: "Since 1999", rest: "in human capital" },
  { lead: "6 countries", rest: "across Africa and the UK" },
  { lead: "LinkedIn Talent Awards", rest: "2022 finalist" },
] as const;

export const GHANA_INTERESTS = [
  "Outsourcing",
  "Recruitment solutions",
  "Learning and development",
  "HR advisory",
  "Not sure yet",
] as const;

/* Shared button styles, kept here so every section stays consistent. */

export const GHANA_BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#EB821D] px-6 py-3.5 text-sm font-semibold text-[#181716] transition-colors duration-200 hover:bg-[#B56314] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const GHANA_BTN_SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#D5D7DA] bg-white px-6 py-3.5 text-sm font-semibold text-[#181D27] transition-colors duration-200 hover:border-[#181D27] hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181D27] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const GHANA_BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#EB821D] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#181D27] transition-colors duration-200 hover:bg-[#EB821D] hover:text-[#181716] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB821D] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const GHANA_SECTION_LINK =
  "inline-flex items-center gap-1.5 text-sm font-medium text-[#535862] underline decoration-[#EB821D] decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[#181D27]";
