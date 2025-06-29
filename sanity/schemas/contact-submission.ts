import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Form Submissions",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "howDidYouHear",
      title: "How Did You Hear About Us",
      type: "string",
      options: {
        list: [
          { title: "Referral", value: "referral" },
          { title: "Google Search", value: "google_search" },
          { title: "Social Media", value: "social_media" },
          { title: "Website", value: "website" },
          { title: "Advertisement", value: "advertisement" },
          { title: "Event/Conference", value: "event_conference" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceInterested",
      title: "Service Interested In",
      type: "string",
      options: {
        list: [
          { title: "HR Advisory services", value: "hr_advisory" },
          { title: "Learning & Development", value: "learning_development" },
          { title: "Recruitment Solution", value: "recruitment" },
          { title: "Outsourcing", value: "outsourcing" },
          { title: "Digital Solutions", value: "digital_solutions" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "agreeToPrivacy",
      title: "Agreed to Privacy Policy",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submissionDate",
      title: "Submission Date",
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
          { title: "New", value: "new" },
          { title: "In Progress", value: "in_progress" },
          { title: "Responded", value: "responded" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "website",
      hidden: true,
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
      subtitle: "serviceInterested",
      firstName: "firstName",
      lastName: "lastName",
      submissionDate: "submissionDate",
    },
    prepare(selection) {
      const { title, subtitle, firstName, lastName, submissionDate } =
        selection;
      const formattedDate = submissionDate
        ? new Date(submissionDate).toLocaleDateString()
        : "No date";

      return {
        title: `${firstName} ${lastName} (${title})`,
        subtitle: `${subtitle} • ${formattedDate}`,
      };
    },
  },
  orderings: [
    {
      title: "Submission Date (Newest First)",
      name: "submissionDateDesc",
      by: [{ field: "submissionDate", direction: "desc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [
        { field: "status", direction: "asc" },
        { field: "submissionDate", direction: "desc" },
      ],
    },
  ],
});
