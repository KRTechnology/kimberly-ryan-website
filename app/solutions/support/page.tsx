import ContactUsForm from "@/components/specific/contact-us-form";
import OurLocations from "@/components/specific/our-locations";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Kimberly-Ryan Limited",
  description:
    "Get in touch with our support team. Fill out our contact form and a support personnel will get in touch with you.",
};

export default function SupportPage() {
  return (
    <main>
      <ContactUsForm />
      <OurLocations />
      <NewsletterSubscription />
    </main>
  );
}
