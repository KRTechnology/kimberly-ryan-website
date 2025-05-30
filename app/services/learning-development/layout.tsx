import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning & Development Services - Kimberly Ryan",
  description:
    "Strategic learning solutions that develop technical skills, behaviors, and a positive work mindset. Our programs combine digital formats with in-person sessions to build a future-ready workforce.",
  keywords:
    "Learning Development, Training Programs, Skills Development, Workforce Training, Professional Development, Corporate Learning",
};

export default function LearningDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
