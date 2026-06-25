// sanity/schemaTypes/partner-submission.ts
// Add this file to your sanity/schemaTypes/ folder on GitHub.
// Then register it in sanity/schemaTypes/index.ts (see instructions below).

import { defineField, defineType } from "sanity";

export const partnerSubmission = defineType({
  name: "partnerSubmission",
  title: "Partner With Us Submissions",
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
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.required(),
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
      name: "partnershipType",
      title: "Partnership Interest",
      type: "string",
      options: {
        list: [
          { title: "Financial Sponsorship",       value: "financial_sponsorship" },
          { title: "In-Kind Support",             value: "in_kind_support" },
          { title: "Learning Resources",          value: "learning_resources" },
          { title: "Technology Solutions",        value: "technology_solutions" },
          { title: "Internship / Placement",      value: "internship_placement" },
          { title: "Pro Bono Speaking",           value: "pro_bono_speaking" },
          { title: "School / Institution Access", value: "school_access" },
          { title: "Other",                       value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "howDidYouHear",
      title: "How Did You Hear About KRSR",
      type: "string",
      options: {
        list: [
          { title: "Referral",          value: "referral" },
          { title: "Google Search",     value: "google_search" },
          { title: "Social Media",      value: "social_media" },
          { title: "Website",           value: "website" },
          { title: "Advertisement",     value: "advertisement" },
          { title: "Event / Conference",value: "event_conference" },
          { title: "Other",             value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      description: "Brief description of how they'd like to partner",
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
      initialValue: "krsr_website",
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
      firstName:       "firstName",
      lastName:        "lastName",
      email:           "email",
      organization:    "organization",
      partnershipType: "partnershipType",
      submissionDate:  "submissionDate",
    },
    prepare(selection) {
      const {
        firstName,
        lastName,
        email,
        organization,
        partnershipType,
        submissionDate,
      } = selection;
      const formattedDate = submissionDate
        ? new Date(submissionDate).toLocaleDateString()
        : "No date";
      return {
        title:    `${firstName} ${lastName} (${email})`,
        subtitle: `${organization} • ${partnershipType} • ${formattedDate}`,
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
      title: "Status",
      name:  "status",
      by: [
        { field: "status",          direction: "asc"  },
        { field: "submissionDate",  direction: "desc" },
      ],
    },
  ],
});
