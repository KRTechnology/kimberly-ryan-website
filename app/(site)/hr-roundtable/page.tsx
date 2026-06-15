// app/register/page.tsx
// Create a new folder: app/register/
// Then save this file inside it as page.tsx

import RegistrationPage from "@/components/specific/RegistrationPage";

export const metadata = {
  title: "Register – KRSR Career Pathway 360",
  description: "Register your interest in the KRSR Career Pathway 360 programme.",
};

export default function Page() {
  return <RegistrationPage />;
}
