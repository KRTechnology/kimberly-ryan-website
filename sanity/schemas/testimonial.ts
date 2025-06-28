import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Client Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      description: "The main testimonial text from the client",
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: "author",
      title: "Client Name",
      type: "string",
      description: "Full name of the person giving the testimonial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Job Position",
      type: "string",
      description: "Job title or position of the client",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      description: "Name of the client's company",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      description: "Industry category (e.g., Banking, Healthcare, Technology)",
      options: {
        list: [
          { title: "Banking & Finance", value: "banking" },
          { title: "Healthcare", value: "healthcare" },
          { title: "Technology", value: "technology" },
          { title: "Manufacturing", value: "manufacturing" },
          { title: "Consulting", value: "consulting" },
          { title: "Non-profit", value: "nonprofit" },
          { title: "Education", value: "education" },
          { title: "Government", value: "government" },
          { title: "Media & Communications", value: "media" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "serviceType",
      title: "Service Type",
      type: "string",
      description: "Type of service provided to this client",
      options: {
        list: [
          { title: "HR Advisory", value: "hr_advisory" },
          { title: "Recruitment & Selection", value: "recruitment" },
          { title: "Learning & Development", value: "learning_development" },
          { title: "Outsourcing", value: "outsourcing" },
          { title: "Consultation", value: "consultation" },
          { title: "Training", value: "training" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "rating",
      title: "Client Rating",
      type: "number",
      description: "Rating out of 5 stars (optional)",
      validation: (Rule) => Rule.min(1).max(5),
      options: {
        list: [
          { title: "5 Stars", value: 5 },
          { title: "4 Stars", value: 4 },
          { title: "3 Stars", value: 3 },
          { title: "2 Stars", value: 2 },
          { title: "1 Star", value: 1 },
        ],
      },
    }),
    defineField({
      name: "projectDuration",
      title: "Project Duration",
      type: "string",
      description: "How long the project/engagement lasted",
      options: {
        list: [
          { title: "Less than 1 month", value: "less_than_1_month" },
          { title: "1-3 months", value: "1_3_months" },
          { title: "3-6 months", value: "3_6_months" },
          { title: "6-12 months", value: "6_12_months" },
          { title: "More than 1 year", value: "more_than_1_year" },
          { title: "Ongoing", value: "ongoing" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      description: "Show this testimonial in featured/highlighted sections",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which testimonials should appear (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description:
        "Whether this testimonial should be displayed on the website",
      initialValue: true,
    }),
    defineField({
      name: "dateReceived",
      title: "Date Received",
      type: "date",
      description: "When this testimonial was received",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this testimonial (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "company",
      description: "quote",
      active: "active",
    },
    prepare({ title, subtitle, description, active }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: active ? "Active" : "Inactive",
        description: description?.substring(0, 100) + "...",
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Date Received",
      name: "dateReceived",
      by: [{ field: "dateReceived", direction: "desc" }],
    },
    {
      title: "Company Name",
      name: "company",
      by: [{ field: "company", direction: "asc" }],
    },
  ],
});
