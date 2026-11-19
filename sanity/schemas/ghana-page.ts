import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Content for the Ghana homepage that the marketing team edits in Studio.
 *
 * This is a singleton: it is opened from the "Ghana Page" item in the Studio
 * sidebar and stored under the fixed id `ghanaPage` (see sanity.config.ts).
 * Everything is optional, so the page keeps its pre-launch placeholders until
 * real logos and a real testimonial are added.
 */
export default defineType({
  name: "ghanaPage",
  title: "Ghana Page",
  type: "document",
  fields: [
    defineField({
      name: "clientLogos",
      title: "Client logos",
      type: "array",
      description:
        "Logos shown in the client strip below the services sections. Drag to reorder. Leave empty to keep the placeholder tiles.",
      of: [
        defineArrayMember({
          name: "clientLogo",
          title: "Client logo",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Company name",
              type: "string",
              description: "Used as the accessible name if no alt text is set.",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              description:
                "Use a transparent PNG or SVG. Logos sit on white tiles, so dark artwork works best.",
              options: {
                hotspot: false,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alternative text",
                  type: "string",
                  description:
                    "Optional. Defaults to the company name above.",
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "websiteUrl",
              title: "Website URL",
              type: "url",
              description: "Optional. Links the logo to the client's site.",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "websiteUrl",
              media: "logo",
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.max(12).warning("More than 12 logos will wrap onto extra rows."),
    }),
    defineField({
      name: "testimonial",
      title: "Client testimonial",
      type: "object",
      description:
        "The quote shown under the client logos. Leave empty to keep the placeholder quote.",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.max(600),
        }),
        defineField({
          name: "author",
          title: "Client name",
          type: "string",
          validation: (Rule) => Rule.max(80),
        }),
        defineField({
          name: "position",
          title: "Job title",
          type: "string",
          validation: (Rule) => Rule.max(120),
        }),
        defineField({
          name: "company",
          title: "Company",
          type: "string",
          validation: (Rule) => Rule.max(120),
        }),
        defineField({
          name: "active",
          title: "Show on the website",
          type: "boolean",
          description:
            "Turn off to hide the quote without deleting it. The placeholder quote is not shown once a testimonial exists.",
          initialValue: true,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Ghana Page",
        subtitle: "Client logos and testimonial",
      };
    },
  },
});
