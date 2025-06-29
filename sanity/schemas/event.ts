import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      description: "The name of the event",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      description: "URL-friendly version of the event name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the event",
    }),
    defineField({
      name: "images",
      title: "Event Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for accessibility and SEO",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption for the image",
            },
          ],
        },
      ],
      description: "Collection of images from this event",
      validation: (rule) =>
        rule.required().min(1).error("At least one image is required"),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "reference",
      to: [{ type: "image" }],
      description:
        "Select which image should be used as the cover (optional - will use first image if not specified)",
    }),
    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "datetime",
      description: "When the event took place",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Where the event took place",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Corporate Event", value: "corporate" },
          { title: "Training Workshop", value: "training" },
          { title: "Team Building", value: "team_building" },
          { title: "Conference", value: "conference" },
          { title: "Award Ceremony", value: "awards" },
          { title: "Social Event", value: "social" },
          { title: "Client Meeting", value: "client_meeting" },
          { title: "Other", value: "other" },
        ],
      },
      description: "Type of event",
    }),
    defineField({
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      description: "Mark this event as featured to highlight it",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Show this event on the website",
      initialValue: true,
    }),
    defineField({
      name: "attendees",
      title: "Number of Attendees",
      type: "number",
      description: "Approximate number of people who attended",
    }),
    defineField({
      name: "organizer",
      title: "Event Organizer",
      type: "string",
      description: "Person or team who organized the event",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords or tags for easier searching",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "When to publish this event on the website",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this event should appear (lower numbers appear first)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
      eventDate: "eventDate",
    },
    prepare(selection) {
      const { title, subtitle, media, eventDate } = selection;
      const formattedDate = eventDate
        ? new Date(eventDate).toLocaleDateString()
        : "No date";

      return {
        title,
        subtitle: `${subtitle ? subtitle + " • " : ""}${formattedDate}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Event Date (Newest First)",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
    {
      title: "Event Date (Oldest First)",
      name: "eventDateAsc",
      by: [{ field: "eventDate", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "displayOrder",
      by: [
        { field: "displayOrder", direction: "asc" },
        { field: "eventDate", direction: "desc" },
      ],
    },
  ],
});
