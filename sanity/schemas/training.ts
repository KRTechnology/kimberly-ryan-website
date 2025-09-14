import { defineType, defineField } from "sanity";

export const training = defineType({
  name: "training",
  title: "Training Programs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Training Title",
      type: "string",
      description: "The main title of the training program",
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
      name: "subtitle",
      title: "Subtitle/Description",
      type: "text",
      description: "Brief description that appears below the title",
      validation: (Rule) => Rule.required().min(20).max(500),
      rows: 4,
    }),
    defineField({
      name: "brochure",
      title: "Training Brochure",
      type: "reference",
      to: [{ type: "brochure" }],
      description: "Link to the downloadable brochure for this training",
    }),
    defineField({
      name: "registrationForm",
      title: "Registration Form",
      type: "reference",
      to: [{ type: "trainingRegistrationForm" }],
      description: "Custom registration form for this training",
    }),

    // Designed For Section
    defineField({
      name: "designedFor",
      title: "Designed For Section",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Section Image",
          type: "image",
          description: "Image for the 'Designed For' section",
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
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "mainText",
          title: "Main Description",
          type: "text",
          description: "Main text describing who the training is designed for",
          validation: (Rule) => Rule.required().max(300),
          rows: 3,
        }),
        defineField({
          name: "targetAudience",
          title: "Target Audience List",
          type: "array",
          of: [{ type: "string" }],
          description: "List of who this training is designed for",
          validation: (Rule) => Rule.required().min(1).max(10),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Program Modules
    defineField({
      name: "programModules",
      title: "Program Modules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Module Title",
              type: "string",
              description: "Title of the training module",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "topics",
              title: "Module Topics",
              type: "array",
              of: [{ type: "string" }],
              description: "List of topics covered in this module",
              validation: (Rule) => Rule.required().min(1).max(20),
            }),
          ],
          preview: {
            select: {
              title: "title",
              topics: "topics",
            },
            prepare({ title, topics }) {
              return {
                title: title,
                subtitle: `${topics?.length || 0} topics`,
              };
            },
          },
        },
      ],
      description: "All modules/sections of the training program",
      validation: (Rule) => Rule.required().min(1).max(15),
    }),

    // Event Details
    defineField({
      name: "eventDetails",
      title: "Event Details",
      type: "object",
      fields: [
        defineField({
          name: "duration",
          title: "Duration",
          type: "string",
          description: "Training duration (e.g., '3 Days')",
          validation: (Rule) => Rule.required().max(50),
        }),
        defineField({
          name: "contactEmail",
          title: "Contact Email",
          type: "string",
          description: "Contact email for inquiries",
          validation: (Rule) => Rule.required().email(),
        }),
        defineField({
          name: "venue",
          title: "Venue Information",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Venue Name",
              type: "string",
              description: "Name of the venue",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "description",
              title: "Venue Description",
              type: "string",
              description: "Brief description of the venue",
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: "address",
              title: "Address",
              type: "text",
              description: "Full address of the venue",
              validation: (Rule) => Rule.required().max(300),
              rows: 3,
            }),
            defineField({
              name: "coordinates",
              title: "Map Coordinates",
              type: "object",
              fields: [
                defineField({
                  name: "lat",
                  title: "Latitude",
                  type: "number",
                  description: "Latitude coordinate for the map",
                  validation: (Rule) => Rule.required().min(-90).max(90),
                }),
                defineField({
                  name: "lng",
                  title: "Longitude",
                  type: "number",
                  description: "Longitude coordinate for the map",
                  validation: (Rule) => Rule.required().min(-180).max(180),
                }),
              ],
              description: "GPS coordinates for Google Maps integration",
            }),
            defineField({
              name: "mapEmbedUrl",
              title: "Google Maps Embed URL",
              type: "url",
              description: "Google Maps embed URL for the venue location",
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Program Fees
    defineField({
      name: "programFees",
      title: "Program Fees",
      type: "object",
      fields: [
        defineField({
          name: "description",
          title: "Fees Description",
          type: "text",
          description: "Description of what the training fees cover",
          validation: (Rule) => Rule.required().max(300),
          rows: 3,
        }),
        defineField({
          name: "pricingOptions",
          title: "Pricing Options",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Price Label",
                  type: "string",
                  description:
                    "Label for this pricing option (e.g., 'Early Bird')",
                  validation: (Rule) => Rule.required().max(50),
                }),
                defineField({
                  name: "price",
                  title: "Price",
                  type: "string",
                  description: "Price amount with currency (e.g., 'N350,000')",
                  validation: (Rule) => Rule.required().max(50),
                }),
                defineField({
                  name: "description",
                  title: "Price Description",
                  type: "string",
                  description: "Optional description for this pricing tier",
                  validation: (Rule) => Rule.max(200),
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "price",
                },
              },
            },
          ],
          description: "All available pricing options for the training",
          validation: (Rule) => Rule.required().min(1).max(10),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Meta Information
    defineField({
      name: "featured",
      title: "Featured Training",
      type: "boolean",
      description: "Mark this training as featured",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description:
        "Whether this training is currently active and accepting registrations",
      initialValue: true,
    }),
    defineField({
      name: "category",
      title: "Training Category",
      type: "string",
      description: "Category of training",
      options: {
        list: [
          { title: "Leadership Development", value: "leadership" },
          { title: "HR Strategic", value: "hr_strategic" },
          { title: "Learning & Development", value: "learning_development" },
          { title: "Performance Management", value: "performance" },
          { title: "Organizational Development", value: "organizational" },
          { title: "Talent Management", value: "talent" },
          { title: "Digital HR", value: "digital_hr" },
          { title: "Compliance & Legal", value: "compliance" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "leadership",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      description:
        "URL where users can register for this training (defaults to consultation page)",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which trainings should appear (lower numbers appear first)",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When this training was published",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "date",
      description: "Optional expiry date for time-sensitive trainings",
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
          { title: "New", value: "new" },
          { title: "Strategic", value: "strategic" },
          { title: "Leadership", value: "leadership" },
          { title: "HR", value: "hr" },
          { title: "Management", value: "management" },
        ],
      },
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this training (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      description: "subtitle",
      active: "active",
      featured: "featured",
    },
    prepare({ title, subtitle, description, active, featured }) {
      const status = active ? "Active" : "Inactive";
      const featuredText = featured ? " • Featured" : "";

      return {
        title: title,
        subtitle: `${subtitle} (${status}${featuredText})`,
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
      title: "Published Date (Newest First)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
