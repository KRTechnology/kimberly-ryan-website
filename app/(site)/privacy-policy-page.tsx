// app/(site)/privacy-policy/page.tsx
// Create the folder: app/(site)/privacy-policy/
// Then save this file inside it as page.tsx

import PrivacyPolicyPage from "@/components/specific/PrivacyPolicyPage";

export const metadata = {
  title: "Privacy Policy | Kimberly Ryan",
  description:
    "Read the Kimberly Ryan Limited Privacy Policy — how we collect, use, store and protect your personal information.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
