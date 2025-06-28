import { defineType, defineField } from "sanity";

export default defineType({
  name: "webinar",
  title: "Webinar Series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Webinar Title",
      type: "string",
      description: "The main title of the webinar",
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
      description: "Main description or introduction to the webinar",
      validation: (Rule) => Rule.required().min(50).max(500),
      rows: 4,
    }),
    defineField({
      name: "subHeading",
      title: "Sub Heading",
      type: "string",
      description: 'Optional sub-heading (e.g., "Webinar Objectives:")',
    }),
    defineField({
      name: "keyPoints",
      title: "Key Points",
      type: "array",
      description: "Bullet points highlighting webinar benefits or agenda",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(8),
    }),
    defineField({
      name: "image",
      title: "Webinar Image",
      type: "image",
      description: "Featured image for the webinar",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "webinarUrl",
      title: "Watch Webinar URL",
      type: "url",
      description: "Link to watch the webinar (YouTube, Vimeo, etc.)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trainingSlidesPdf",
      title: "Training Slides PDF",
      type: "file",
      description: "Upload the PDF file for training slides download",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "category",
      title: "Webinar Category",
      type: "string",
      description: "Category or topic area of the webinar",
      options: {
        list: [
          { title: "HR Essentials", value: "hr_essentials" },
          { title: "Recruitment & Selection", value: "recruitment" },
          { title: "Learning & Development", value: "learning_development" },
          { title: "Leadership Development", value: "leadership" },
          { title: "Compliance & Legal", value: "compliance" },
          { title: "Employer Branding", value: "employer_branding" },
          { title: "Diversity & Inclusion", value: "diversity_inclusion" },
          { title: "Performance Management", value: "performance" },
          { title: "Employee Engagement", value: "engagement" },
          { title: "Strategic HR", value: "strategic_hr" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "duration",
      title: "Webinar Duration",
      type: "string",
      description: 'Duration of the webinar (e.g., "45 minutes", "1 hour")',
    }),
    defineField({
      name: "presenter",
      title: "Presenter(s)",
      type: "string",
      description: "Name(s) of the webinar presenter(s)",
    }),
    defineField({
      name: "dateRecorded",
      title: "Date Recorded",
      type: "date",
      description: "When the webinar was recorded",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which webinars should appear (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Featured Webinar",
      type: "boolean",
      description: "Whether this webinar should be featured prominently",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Whether this webinar should be displayed on the website",
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
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Free", value: "free" },
          { title: "Premium", value: "premium" },
          { title: "Popular", value: "popular" },
          { title: "New", value: "new" },
          { title: "Trending", value: "trending" },
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
      name: "viewCount",
      title: "View Count",
      type: "number",
      description:
        "Number of times the webinar has been viewed (optional tracking)",
      initialValue: 0,
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this webinar (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      description: "description",
      media: "image",
      active: "active",
    },
    prepare({ title, subtitle, description, media, active }) {
      return {
        title: title,
        subtitle: subtitle
          ? `${subtitle} ${active ? "(Active)" : "(Inactive)"}`
          : active
            ? "Active"
            : "Inactive",
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
      title: "Date Recorded",
      name: "dateRecorded",
      by: [{ field: "dateRecorded", direction: "desc" }],
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
