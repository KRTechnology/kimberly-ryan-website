import { defineType, defineField } from "sanity";

export default defineType({
  name: "brochure",
  title: "Training Brochures",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Brochure Title",
      type: "string",
      description: "The main title of the brochure",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the title",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the brochure content",
      validation: (Rule) => Rule.required().min(20).max(300),
      rows: 3,
    }),
    defineField({
      name: "pdfFile",
      title: "Brochure PDF",
      type: "file",
      description: "Upload the PDF brochure file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description:
        "Optional cover image for the brochure (for display purposes)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Brochure Category",
      type: "string",
      description: "Category or type of brochure",
      options: {
        list: [
          { title: "Learning & Development", value: "learning_development" },
          { title: "HR Advisory", value: "hr_advisory" },
          { title: "Recruitment & Selection", value: "recruitment" },
          { title: "Leadership Development", value: "leadership" },
          { title: "Corporate Training", value: "corporate_training" },
          { title: "Compliance & Legal", value: "compliance" },
          { title: "Digital Solutions", value: "digital_solutions" },
          { title: "General Information", value: "general" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "learning_development",
    }),
    defineField({
      name: "year",
      title: "Brochure Year",
      type: "string",
      description: "Year this brochure is for (e.g., '2025')",
      validation: (Rule) => Rule.required().min(4).max(4),
      initialValue: new Date().getFullYear().toString(),
    }),
    defineField({
      name: "fileSize",
      title: "File Size (MB)",
      type: "number",
      description: "Approximate file size in MB (for display purposes)",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "pageCount",
      title: "Number of Pages",
      type: "number",
      description: "Number of pages in the brochure (optional)",
      validation: (Rule) => Rule.min(1).max(1000),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which brochures should appear (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Featured Brochure",
      type: "boolean",
      description: "Whether this brochure should be featured prominently",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Whether this brochure should be available for download",
      initialValue: true,
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      description:
        "Number of times the brochure has been downloaded (optional tracking)",
      initialValue: 0,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Tags for better organization and filtering",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Latest", value: "latest" },
          { title: "Popular", value: "popular" },
          { title: "Updated", value: "updated" },
          { title: "New", value: "new" },
          { title: "Comprehensive", value: "comprehensive" },
          { title: "Quick Guide", value: "quick_guide" },
          { title: "Detailed", value: "detailed" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When this brochure was published",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "date",
      description: "Optional expiry date for time-sensitive brochures",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this brochure (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      description: "description",
      media: "coverImage",
      active: "active",
      year: "year",
    },
    prepare({ title, subtitle, description, media, active, year }) {
      return {
        title: title,
        subtitle: subtitle
          ? `${subtitle} (${year}) ${active ? "(Active)" : "(Inactive)"}`
          : active
            ? `${year} - Active`
            : `${year} - Inactive`,
        description: description?.substring(0, 100) + "...",
        media: media,
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
      title: "Published Date (Newest First)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Category, then Display Order",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "displayOrder", direction: "asc" },
      ],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
