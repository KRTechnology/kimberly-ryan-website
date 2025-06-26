import StrategicLeadershipForm from "@/components/specific/strategic-leadership-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Leadership Programme - Kimberly-Ryan Limited",
  description:
    "Register for our Strategic Leadership Programme. Complete the registration form to secure your spot in this transformative leadership development program.",
};

export default function ConsultationPage() {
  return (
    <main>
      <StrategicLeadershipForm />
    </main>
  );
}
