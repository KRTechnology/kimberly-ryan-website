import { defineField, defineType } from "sanity";

export default defineType({
  name: "company",
  title: "Trusted Companies",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      description: "Full name of the company",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Keep company names under 60 characters"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for this company",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      description:
        "Company logo icon (preferably SVG or square format) - Optional",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description:
            'Describe the logo for accessibility (e.g., "Wildcrafted logo")',
        },
      ],
    }),
    defineField({
      name: "textLogo",
      title: "Text Logo/Wordmark",
      type: "image",
      description: "Company name in text format (wordmark)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description:
            'Describe the text logo for accessibility (e.g., "Wildcrafted wordmark")',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      description: "Company website (optional)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "industry",
      title: "Industry/Category",
      type: "string",
      description: "Industry or business category",
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Healthcare", value: "healthcare" },
          { title: "Finance", value: "finance" },
          { title: "Education", value: "education" },
          { title: "E-commerce", value: "ecommerce" },
          { title: "Media & Entertainment", value: "media" },
          { title: "Professional Services", value: "professional" },
          { title: "Manufacturing", value: "manufacturing" },
          { title: "Real Estate", value: "realestate" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      initialValue: "technology",
    }),
    defineField({
      name: "partnershipType",
      title: "Partnership Type",
      type: "string",
      description: "Type of business relationship",
      options: {
        list: [
          { title: "Client", value: "client" },
          { title: "Strategic Partner", value: "strategic" },
          { title: "Technology Partner", value: "technology" },
          { title: "Vendor", value: "vendor" },
          { title: "Investor", value: "investor" },
        ],
        layout: "radio",
      },
      initialValue: "client",
    }),
    defineField({
      name: "description",
      title: "Company Description",
      type: "text",
      description:
        "Brief description of the company (optional, for internal reference)",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial Quote",
      type: "text",
      description: "Optional testimonial from this company (for future use)",
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this company appears (lower numbers appear first)",
      validation: (Rule) => Rule.required().integer().positive(),
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Active",
      type: "boolean",
      description: "Whether this company should be displayed on the website",
      initialValue: true,
    }),
    defineField({
      name: "featuredOnHomepage",
      title: "Featured on Homepage",
      type: "boolean",
      description:
        "Show this company in the prominent trusted companies section",
      initialValue: true,
    }),
    defineField({
      name: "addedDate",
      title: "Date Added",
      type: "datetime",
      description: "When this company was added as a partner/client",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "logoBackgroundColor",
      title: "Logo Background Color",
      type: "string",
      description: "Background color for the company logo card",
      options: {
        list: [
          { title: "Default (Light Gray)", value: "default" },
          { title: "White", value: "white" },
          { title: "Light Blue", value: "blue-50" },
          { title: "Light Green", value: "green-50" },
          { title: "Light Purple", value: "purple-50" },
          { title: "Custom", value: "custom" },
        ],
        layout: "dropdown",
      },
      initialValue: "default",
    }),
    defineField({
      name: "customBackgroundColor",
      title: "Custom Background Color",
      type: "string",
      description: "Hex color code (e.g., #f8f9fa)",
      hidden: ({ document }) => document?.logoBackgroundColor !== "custom",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.logoBackgroundColor === "custom" && !value) {
            return 'Custom background color is required when "Custom" is selected';
          }
          if (value && !/^#[0-9A-F]{6}$/i.test(value)) {
            return "Please enter a valid hex color code (e.g., #f8f9fa)";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "industry",
      media: "logo",
      order: "order",
      active: "featured",
      homepage: "featuredOnHomepage",
    },
    prepare(selection) {
      const { title, subtitle, media, order, active, homepage } = selection;
      const status = active
        ? homepage
          ? "Active • Homepage"
          : "Active"
        : "Inactive";
      return {
        title: title,
        subtitle: `${subtitle} • Order: ${order}`,
        media: media,
        description: status,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "addedDate", direction: "desc" },
      ],
    },
    {
      title: "Date Added, New",
      name: "addedDateDesc",
      by: [{ field: "addedDate", direction: "desc" }],
    },
    {
      title: "Company Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Industry",
      name: "industryAsc",
      by: [
        { field: "industry", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});
