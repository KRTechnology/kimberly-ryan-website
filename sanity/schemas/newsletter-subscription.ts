import { defineField, defineType } from "sanity";

export const newsletterSubscription = defineType({
  name: "newsletterSubscription",
  title: "Newsletter Subscriptions",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "subscriptionDate",
      title: "Subscription Date",
      type: "datetime",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Unsubscribed", value: "unsubscribed" },
          { title: "Bounced", value: "bounced" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Website Footer", value: "website_footer" },
          { title: "Gallery Page", value: "gallery_page" },
          { title: "Contact Page", value: "contact_page" },
          { title: "Homepage", value: "homepage" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "website_footer",
    }),
    defineField({
      name: "ipAddress",
      title: "IP Address",
      type: "string",
      description: "IP address of the subscriber (for analytics)",
    }),
    defineField({
      name: "userAgent",
      title: "User Agent",
      type: "string",
      description: "Browser/device information",
    }),
    defineField({
      name: "unsubscribeDate",
      title: "Unsubscribe Date",
      type: "datetime",
      description: "Date when user unsubscribed (if applicable)",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Internal notes for team reference",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "status",
      subscriptionDate: "subscriptionDate",
    },
    prepare(selection) {
      const { title, subtitle, subscriptionDate } = selection;
      const formattedDate = subscriptionDate
        ? new Date(subscriptionDate).toLocaleDateString()
        : "No date";

      return {
        title,
        subtitle: `${subtitle} • ${formattedDate}`,
      };
    },
  },
  orderings: [
    {
      title: "Subscription Date (Newest First)",
      name: "subscriptionDateDesc",
      by: [{ field: "subscriptionDate", direction: "desc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [
        { field: "status", direction: "asc" },
        { field: "subscriptionDate", direction: "desc" },
      ],
    },
    {
      title: "Email A-Z",
      name: "emailAsc",
      by: [{ field: "email", direction: "asc" }],
    },
  ],
});
