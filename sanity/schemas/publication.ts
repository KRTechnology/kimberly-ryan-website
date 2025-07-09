import { defineType, defineField } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Publication Title",
      type: "string",
      description: "The main title of the publication",
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
      description: "Main description or summary of the publication",
      validation: (Rule) => Rule.required().min(50).max(800),
      rows: 6,
    }),
    defineField({
      name: "image",
      title: "Publication Image/Banner",
      type: "image",
      description: "Featured image or banner for the publication",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pdfFile",
      title: "Publication PDF",
      type: "file",
      description: "Upload the PDF file for the publication",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Publication Category",
      type: "string",
      description: "Category or type of publication",
      options: {
        list: [
          { title: "White Paper", value: "white_paper" },
          { title: "Research Report", value: "research_report" },
          { title: "Policy Brief", value: "policy_brief" },
          { title: "Industry Analysis", value: "industry_analysis" },
          { title: "Best Practices Guide", value: "best_practices" },
          { title: "Case Study", value: "case_study" },
          { title: "Regulatory Update", value: "regulatory_update" },
          { title: "Market Insights", value: "market_insights" },
          { title: "HR Advisory", value: "hr_advisory" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Author(s)",
      type: "string",
      description: "Author(s) or organization that created this publication",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "date",
      description: "When the publication was originally published",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fileSize",
      title: "File Size (MB)",
      type: "number",
      description: "Approximate file size in MB (for display purposes)",
    }),
    defineField({
      name: "pageCount",
      title: "Number of Pages",
      type: "number",
      description: "Number of pages in the publication",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which publications should appear (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Featured Publication",
      type: "boolean",
      description: "Whether this publication should be featured prominently",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description:
        "Whether this publication should be displayed on the website",
      initialValue: true,
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
          { title: "Trending", value: "trending" },
          { title: "New", value: "new" },
          { title: "Updated", value: "updated" },
          { title: "Comprehensive", value: "comprehensive" },
          { title: "Quick Read", value: "quick_read" },
          { title: "In-depth", value: "in_depth" },
        ],
      },
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      description:
        "Number of times the PDF has been downloaded (optional tracking)",
      initialValue: 0,
    }),
    defineField({
      name: "summary",
      title: "Summary Points",
      type: "array",
      description: "Key summary points or highlights from the publication",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(2).max(8),
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "string",
      description: "Who this publication is intended for",
      options: {
        list: [
          { title: "HR Professionals", value: "hr_professionals" },
          { title: "Business Leaders", value: "business_leaders" },
          { title: "Employers", value: "employers" },
          { title: "Recruiters", value: "recruiters" },
          { title: "Legal/Compliance Teams", value: "legal_compliance" },
          { title: "General Public", value: "general_public" },
          { title: "Industry Specific", value: "industry_specific" },
          { title: "All Stakeholders", value: "all_stakeholders" },
        ],
      },
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this publication (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      description: "description",
      media: "image",
      active: "active",
      featured: "featured",
    },
    prepare({ title, subtitle, description, media, active, featured }) {
      const status = [];
      if (featured) status.push("Featured");
      if (active) status.push("Active");
      else status.push("Inactive");

      return {
        title: title,
        subtitle: subtitle
          ? `${subtitle} • ${status.join(" • ")}`
          : status.join(" • "),
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
      name: "publishedDateDesc",
      by: [{ field: "publishedDate", direction: "desc" }],
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
