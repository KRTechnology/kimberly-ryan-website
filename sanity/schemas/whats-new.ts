import { defineType, defineField } from "sanity";

export default defineType({
  name: "whatsNew",
  title: "What's New",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Display Title",
      type: "string",
      description: "The title to display in the What's New section",
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
      description: "Description to display in the What's New section",
      validation: (Rule) => Rule.required().min(50).max(500),
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      description: "Image to display in the What's New section",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      description: "What type of content this is linking to",
      options: {
        list: [
          { title: "Publication", value: "publication" },
          { title: "Blog Post", value: "blog" },
          { title: "Webinar", value: "webinar" },
          { title: "Event", value: "event" },
          { title: "External Link", value: "external" },
          { title: "Custom Page", value: "custom" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "publication",
    }),
    defineField({
      name: "contentReference",
      title: "Content Reference",
      type: "reference",
      description:
        "Reference to the actual content (if linking to internal content)",
      to: [
        { type: "publication" },
        { type: "blog" },
        { type: "webinar" },
        { type: "event" },
      ],
      hidden: ({ document }) =>
        document?.contentType === "external" ||
        document?.contentType === "custom",
      validation: (Rule) =>
        Rule.custom((contentReference, context) => {
          const contentType = (context.document as any)?.contentType;
          if (
            contentType &&
            contentType !== "external" &&
            contentType !== "custom" &&
            !contentReference
          ) {
            return "Content reference is required for this content type";
          }
          return true;
        }),
    }),
    defineField({
      name: "customLink",
      title: "Custom Link",
      type: "url",
      description: "Custom URL (for external links or custom pages)",
      hidden: ({ document }) =>
        document?.contentType !== "external" &&
        document?.contentType !== "custom",
      validation: (Rule) =>
        Rule.custom((customLink, context) => {
          const contentType = (context.document as any)?.contentType;
          if (
            (contentType === "external" || contentType === "custom") &&
            !customLink
          ) {
            return "Custom link is required for external or custom content";
          }
          return true;
        }),
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text to display on the call-to-action button",
      validation: (Rule) => Rule.required().min(2).max(30),
      initialValue: "Read More",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      description: "Whether the link should open in a new tab",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Whether this item should be featured prominently",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Whether this item should be displayed on the website",
      initialValue: true,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which items should appear (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "When this item should be published",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description: "When this item should stop being displayed (optional)",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Category for better organization",
      options: {
        list: [
          { title: "Publications", value: "publications" },
          { title: "Research & Insights", value: "research" },
          { title: "Industry Updates", value: "industry_updates" },
          { title: "Company News", value: "company_news" },
          { title: "Training & Development", value: "training" },
          { title: "Events & Webinars", value: "events" },
          { title: "Regulatory Changes", value: "regulatory" },
          { title: "Best Practices", value: "best_practices" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Tags for better organization and filtering",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Updated", value: "updated" },
          { title: "Popular", value: "popular" },
          { title: "Trending", value: "trending" },
          { title: "Important", value: "important" },
          { title: "Breaking", value: "breaking" },
          { title: "Featured", value: "featured" },
        ],
      },
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description: "Internal notes about this item (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "contentType",
      description: "description",
      media: "image",
      active: "active",
      featured: "featured",
      category: "category",
    },
    prepare({
      title,
      subtitle,
      description,
      media,
      active,
      featured,
      category,
    }) {
      const status = [];
      if (featured) status.push("Featured");
      if (active) status.push("Active");
      else status.push("Inactive");

      const displaySubtitle = [
        subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : "",
        category || "",
        status.join(" • "),
      ]
        .filter(Boolean)
        .join(" • ");

      return {
        title: title,
        subtitle: displaySubtitle,
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
      title: "Content Type, then Published Date",
      name: "contentTypeOrder",
      by: [
        { field: "contentType", direction: "asc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});
