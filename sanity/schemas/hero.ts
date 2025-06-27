import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Slides",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading for the hero slide",
      validation: (Rule) =>
        Rule.required()
          .max(100)
          .warning("Keep titles under 100 characters for better display"),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional subtitle that appears above the main title",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Supporting text that appears below the title",
      validation: (Rule) =>
        Rule.required()
          .max(300)
          .warning(
            "Keep descriptions under 300 characters for better readability"
          ),
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text displayed on the call-to-action button",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      description:
        "URL or path the button should link to (e.g., /consultation, /about)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaType",
      title: "Button Style",
      type: "string",
      description: "Visual style for the call-to-action button",
      options: {
        list: [
          { title: "Primary (Orange)", value: "primary" },
          { title: "Secondary (Outlined)", value: "secondary" },
          { title: "Text Only", value: "text" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      description: "Main image for the hero slide",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility and SEO",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageStyle",
      title: "Image Style",
      type: "string",
      description: "How the image should be displayed",
      options: {
        list: [
          { title: "Arc (Rounded Top)", value: "arc" },
          { title: "Rounded Corners", value: "rounded" },
          { title: "Square", value: "square" },
        ],
        layout: "radio",
      },
      initialValue: "arc",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      description: "Background color for the hero section",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light Gray", value: "gray-50" },
          { title: "Sunset Light", value: "sunset-50" },
          { title: "Custom", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "white",
    }),
    defineField({
      name: "customBackgroundColor",
      title: "Custom Background Color",
      type: "string",
      description: "Hex color code (e.g., #ffffff)",
      hidden: ({ document }) => document?.backgroundColor !== "custom",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.backgroundColor === "custom" && !value) {
            return 'Custom background color is required when "Custom" is selected';
          }
          if (value && !/^#[0-9A-F]{6}$/i.test(value)) {
            return "Please enter a valid hex color code (e.g., #ffffff)";
          }
          return true;
        }),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this slide appears (lower numbers appear first)",
      validation: (Rule) => Rule.required().integer().positive(),
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Active",
      type: "boolean",
      description: "Whether this slide should be displayed on the website",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When this hero slide was published",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for this hero slide",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
      order: "order",
      active: "featured",
    },
    prepare(selection) {
      const { title, subtitle, media, order, active } = selection;
      return {
        title: title,
        subtitle: subtitle
          ? `${subtitle} • Order: ${order}`
          : `Order: ${order}`,
        media: media,
        description: active ? "Active" : "Inactive",
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
