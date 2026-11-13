import type { Metadata } from "next";
import GhanaCompliance from "@/components/ghana/ghana-compliance";
import GhanaContact from "@/components/ghana/ghana-contact";
import GhanaCtaPair from "@/components/ghana/ghana-cta-pair";
import GhanaFooter from "@/components/ghana/ghana-footer";
import GhanaHeader from "@/components/ghana/ghana-header";
import GhanaHero from "@/components/ghana/ghana-hero";
import GhanaServices from "@/components/ghana/ghana-services";
import GhanaTrust from "@/components/ghana/ghana-trust";
import GhanaWhyUs from "@/components/ghana/ghana-why-us";
import {
  GHANA_ADDRESS,
  GHANA_EMAIL,
  GHANA_PHONE_TEL,
  MAIN_SITE_URL,
} from "@/components/ghana/constants";

const SITE_URL = "https://ghana.kimberly-ryan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kimberly Ryan Ghana | Payroll, Recruitment & HR Advisory in Accra",
  description:
    "Kimberly Ryan has supported employers since 1999. In Ghana we deliver payroll, recruitment, learning and development and HR advisory for organisations that want one accountable partner.",
  keywords: [
    "HR consulting Ghana",
    "payroll outsourcing Ghana",
    "recruitment agency Accra",
    "HR advisory Ghana",
    "SSNIT payroll",
    "PAYE Ghana",
    "executive search Ghana",
    "training Ghana",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Kimberly Ryan Ghana",
    title: "Kimberly Ryan Ghana | One accountable people partner",
    description:
      "Payroll, recruitment, learning and HR advisory for Ghanaian employers, backed by offices in six countries across Africa and the UK.",
    locale: "en_GH",
    images: [
      {
        url: "/images/people-outsourcing-image-one.jpg",
        width: 1999,
        height: 1333,
        alt: "Kimberly Ryan consultants meeting with clients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kimberly Ryan Ghana | One accountable people partner",
    description:
      "Payroll, recruitment, learning and HR advisory for Ghanaian employers.",
    images: ["/images/people-outsourcing-image-one.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kimberly Ryan Ghana",
  url: SITE_URL,
  description:
    "Payroll, recruitment, learning and development and HR advisory services for employers in Ghana.",
  telephone: GHANA_PHONE_TEL,
  email: GHANA_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: GHANA_ADDRESS[0],
    addressLocality: "Airport West, Accra",
    addressCountry: "GH",
  },
  areaServed: {
    "@type": "Country",
    name: "Ghana",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Kimberly Ryan Limited",
    url: MAIN_SITE_URL,
  },
};

export default function GhanaHomePage() {
  return (
    <div className="min-h-screen bg-[#FCF9F4] font-plex text-[#181716] antialiased motion-safe:scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#181716] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <GhanaHeader />

      <main id="main-content">
        <GhanaHero />
        <GhanaServices />
        <GhanaCompliance />
        <GhanaWhyUs />
        <GhanaTrust />
        <GhanaCtaPair />
        <GhanaContact />
      </main>

      <GhanaFooter />
    </div>
  );
}
