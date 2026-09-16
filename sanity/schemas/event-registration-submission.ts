// sanity/schemaTypes/event-registration-submission.ts
// Add this file to your sanity/schemaTypes/ folder on GitHub.
// Then register it in sanity/schemaTypes/index.ts (instructions below).

import { defineField, defineType } from "sanity";

export const eventRegistrationSubmission = defineType({
  name: "eventRegistrationSubmission",
  title: "Event Registration Submissions",
  type: "document",
  fields: [
    defineField({
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "event" }],
      description: "The event this registration is for",
      validation: (rule) => rule.required(),
    }),
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
      name: "organization",
      title: "Organization",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Designation / Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "howDidYouHear",
      title: "How Did You Hear About Us",
      type: "string",
      options: {
        list: [
          { title: "Referral",          value: "referral" },
          { title: "Google Search",     value: "google_search" },
          { title: "Social Media",      value: "social_media" },
          { title: "Website",           value: "website" },
          { title: "Advertisement",     value: "advertisement" },
          { title: "Event/Conference",  value: "event_conference" },
          { title: "Other",             value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),    
    defineField({
      name: "peopleManagementAreas",
      title: "People Management Areas",
      type: "array",
      of: [{ type: "string" }],
      description: "Areas of people management selected by the registrant",
    }),
    defineField({
      name: "otherPeopleManagement",
      title: "Other People Management Area",
      type: "string",
      description: "Specified when 'Others' is selected",
    }),
    defineField({
      name: "consultationInterest",
      title: "Consultation Interest",
      type: "string",
      description: "Whether they want a consultation conversation",
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
          { title: "New",         value: "new" },
          { title: "In Progress", value: "in_progress" },
          { title: "Responded",   value: "responded" },
          { title: "Closed",      value: "closed" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "event_registration",
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
      firstName:      "firstName",
      lastName:       "lastName",
      email:          "email",
      organization:   "organization",
      eventName:      "event.name",
      submissionDate: "submissionDate",
    },
    prepare(selection) {
      const {
        firstName, lastName, email,
        organization, eventName, submissionDate,
      } = selection;
      const formattedDate = submissionDate
        ? new Date(submissionDate).toLocaleDateString()
        : "No date";
      return {
        title:    `${firstName} ${lastName} (${email})`,
        subtitle: `${eventName} • ${organization} • ${formattedDate}`,
      };
    },
  },
  orderings: [
    {
      title: "Submission Date (Newest First)",
      name:  "submissionDateDesc",
      by:    [{ field: "submissionDate", direction: "desc" }],
    },
    {
      title: "Event",
      name:  "event",
      by: [
        { field: "event.name",      direction: "asc"  },
        { field: "submissionDate",  direction: "desc" },
      ],
    },
    {
      title: "Status",
      name:  "status",
      by: [
        { field: "status",         direction: "asc"  },
        { field: "submissionDate", direction: "desc" },
      ],
    },
  ],
});
