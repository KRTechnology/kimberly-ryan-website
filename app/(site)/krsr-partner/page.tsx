// app/(site)/krsr-partner/page.tsx
// Create the folder: app/(site)/krsr-partner/
// Then save this file inside it as page.tsx

import PartnerPage from "@/components/specific/PartnerPage";

export const metadata = {
  title: "Partner With Us — KRSR | Kimberly Ryan",
  description:
    "Partner with KRSR to help shape the future of Nigeria's workforce. Explore sponsorship, internship, and collaboration opportunities.",
};

export default function Page() {
  return <PartnerPage />;
}
