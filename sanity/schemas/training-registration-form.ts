import { defineType, defineField } from "sanity";

export const trainingRegistrationForm = defineType({
  name: "trainingRegistrationForm",
  title: "Training Registration Forms",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Form Title",
      type: "string",
      description: "Title for this registration form",
      validation: (Rule) => Rule.required().min(5).max(100),
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
      title: "Form Description",
      type: "text",
      description: "Brief description that appears at the top of the form",
      validation: (Rule) => Rule.max(300),
      rows: 3,
    }),
    defineField({
      name: "training",
      title: "Associated Training",
      type: "reference",
      to: [{ type: "training" }],
      description: "The training program this form is for",
      validation: (Rule) => Rule.required(),
    }),

    // Form Fields Configuration
    defineField({
      name: "formFields",
      title: "Form Fields",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "fieldName",
              title: "Field Name",
              type: "string",
              description:
                "Internal name for this field (no spaces, lowercase)",
              validation: (Rule) =>
                Rule.required()
                  .regex(/^[a-z][a-zA-Z0-9]*$/, {
                    name: "camelCase",
                    invert: false,
                  })
                  .error(
                    "Field name must be camelCase (e.g., firstName, workEmail)"
                  ),
            }),
            defineField({
              name: "label",
              title: "Field Label",
              type: "string",
              description: "Label displayed to users",
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: "fieldType",
              title: "Field Type",
              type: "string",
              description: "Type of input field",
              options: {
                list: [
                  { title: "Text Input", value: "text" },
                  { title: "Email Input", value: "email" },
                  { title: "Number Input", value: "number" },
                  { title: "Phone Input", value: "tel" },
                  { title: "Dropdown Select", value: "select" },
                  { title: "Textarea", value: "textarea" },
                  { title: "Radio Buttons", value: "radio" },
                  { title: "Checkboxes", value: "checkbox" },
                ],
              },
              validation: (Rule) => Rule.required(),
              initialValue: "text",
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder Text",
              type: "string",
              description: "Placeholder text for input fields",
              validation: (Rule) => Rule.max(100),
            }),
            defineField({
              name: "required",
              title: "Required Field",
              type: "boolean",
              description: "Whether this field is required",
              initialValue: true,
            }),
            defineField({
              name: "options",
              title: "Field Options",
              type: "array",
              of: [{ type: "string" }],
              description: "Options for select, radio, or checkbox fields",
              hidden: ({ parent }) =>
                !["select", "radio", "checkbox"].includes(parent?.fieldType),
            }),
            defineField({
              name: "validation",
              title: "Validation Rules",
              type: "object",
              fields: [
                defineField({
                  name: "minLength",
                  title: "Minimum Length",
                  type: "number",
                  description: "Minimum character length (for text fields)",
                }),
                defineField({
                  name: "maxLength",
                  title: "Maximum Length",
                  type: "number",
                  description: "Maximum character length (for text fields)",
                }),
                defineField({
                  name: "min",
                  title: "Minimum Value",
                  type: "number",
                  description: "Minimum value (for number fields)",
                }),
                defineField({
                  name: "max",
                  title: "Maximum Value",
                  type: "number",
                  description: "Maximum value (for number fields)",
                }),
                defineField({
                  name: "pattern",
                  title: "Regex Pattern",
                  type: "string",
                  description: "Custom validation pattern (regex)",
                }),
                defineField({
                  name: "errorMessage",
                  title: "Custom Error Message",
                  type: "string",
                  description: "Custom error message for validation failures",
                }),
              ],
              description: "Additional validation rules for this field",
            }),
            defineField({
              name: "displayOrder",
              title: "Display Order",
              type: "number",
              description:
                "Order in which this field appears (lower numbers first)",
              validation: (Rule) => Rule.required().min(0),
              initialValue: 0,
            }),
            defineField({
              name: "width",
              title: "Field Width",
              type: "string",
              description: "How much width this field should take",
              options: {
                list: [
                  { title: "Full Width", value: "full" },
                  { title: "Half Width", value: "half" },
                  { title: "One Third", value: "third" },
                  { title: "Two Thirds", value: "two-thirds" },
                ],
              },
              initialValue: "full",
            }),
          ],
          preview: {
            select: {
              title: "label",
              fieldType: "fieldType",
              required: "required",
              order: "displayOrder",
            },
            prepare({ title, fieldType, required, order }) {
              const requiredText = required ? " *" : "";
              return {
                title: `${title}${requiredText}`,
                subtitle: `${fieldType} • Order: ${order}`,
              };
            },
          },
        },
      ],
      description: "Configure the fields for this registration form",
      validation: (Rule) => Rule.required().min(1).max(20),
    }),

    // Form Settings
    defineField({
      name: "settings",
      title: "Form Settings",
      type: "object",
      fields: [
        defineField({
          name: "submitButtonText",
          title: "Submit Button Text",
          type: "string",
          description: "Text displayed on the submit button",
          validation: (Rule) => Rule.required().max(50),
          initialValue: "Complete Registration",
        }),
        defineField({
          name: "successMessage",
          title: "Success Message",
          type: "text",
          description: "Message shown after successful form submission",
          validation: (Rule) => Rule.required().max(500),
          initialValue:
            "Thank you for your registration! We'll get back to you soon.",
        }),
        defineField({
          name: "redirectUrl",
          title: "Redirect URL",
          type: "url",
          description:
            "Optional URL to redirect to after successful submission",
        }),
        defineField({
          name: "notificationEmail",
          title: "Notification Email",
          type: "string",
          description: "Email address to notify when form is submitted",
          validation: (Rule) => Rule.email(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Meta Information
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Whether this form is currently accepting submissions",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When this form was published",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description: "Optional expiry date for time-sensitive forms",
    }),
    defineField({
      name: "maxSubmissions",
      title: "Maximum Submissions",
      type: "number",
      description: "Optional limit on number of submissions",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description: "Internal notes about this form (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      training: "training.title",
      active: "active",
      publishedAt: "publishedAt",
    },
    prepare({ title, training, active, publishedAt }) {
      const status = active ? "Active" : "Inactive";
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "No date";

      return {
        title: title,
        subtitle: `${training} • ${status} • ${date}`,
      };
    },
  },
  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Training Name",
      name: "trainingName",
      by: [{ field: "training.title", direction: "asc" }],
    },
    {
      title: "Active First",
      name: "activeFirst",
      by: [
        { field: "active", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});
