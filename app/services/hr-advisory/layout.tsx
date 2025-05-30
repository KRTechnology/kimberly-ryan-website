import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Advisory Services - Kimberly Ryan",
  description:
    "Transform your organization with our expert HR advisory services. We help navigate change by transforming systems and processes for sustainable growth.",
  keywords:
    "HR Advisory, Human Resources Consulting, Organizational Transformation, Change Management, HR Strategy",
};

export default function HrAdvisoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
