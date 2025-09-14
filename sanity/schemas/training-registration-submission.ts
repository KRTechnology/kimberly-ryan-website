import { defineField, defineType } from "sanity";

export const trainingRegistrationSubmission = defineType({
  name: "trainingRegistrationSubmission",
  title: "Training Registration Submissions",
  type: "document",
  fields: [
    defineField({
      name: "registrationForm",
      title: "Registration Form",
      type: "reference",
      to: [{ type: "trainingRegistrationForm" }],
      description: "The form this submission came from",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "training",
      title: "Training Program",
      type: "reference",
      to: [{ type: "training" }],
      description: "The training program being registered for",
      validation: (rule) => rule.required(),
    }),

    // Core Contact Information (Standard fields)
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
      name: "personalEmail",
      title: "Personal Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "workEmail",
      title: "Work Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "jobRole",
      title: "Job Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (rule) => rule.required().min(0).max(100),
    }),

    // Dynamic Form Data
    defineField({
      name: "formData",
      title: "Form Submission Data",
      type: "object",
      description: "All form field responses stored as key-value pairs",
      fields: [
        defineField({
          name: "responses",
          title: "Field Responses",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "fieldName",
                  title: "Field Name",
                  type: "string",
                  description: "The internal name of the form field",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "fieldLabel",
                  title: "Field Label",
                  type: "string",
                  description: "The display label of the form field",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Response Value",
                  type: "text",
                  description: "The user's response to this field",
                }),
                defineField({
                  name: "fieldType",
                  title: "Field Type",
                  type: "string",
                  description: "Type of the form field",
                }),
              ],
              preview: {
                select: {
                  title: "fieldLabel",
                  subtitle: "value",
                  fieldType: "fieldType",
                },
                prepare({ title, subtitle, fieldType }) {
                  return {
                    title: title,
                    subtitle: `${fieldType}: ${subtitle || "No response"}`,
                  };
                },
              },
            },
          ],
          description: "Individual field responses from the form",
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // Submission Metadata
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
          { title: "Reviewed", value: "reviewed" },
          { title: "Contacted", value: "contacted" },
          { title: "Registered", value: "registered" },
          { title: "Cancelled", value: "cancelled" },
          { title: "No Show", value: "no_show" },
          { title: "Completed", value: "completed" },
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
      name: "ipAddress",
      title: "IP Address",
      type: "string",
      description: "IP address of the submitter (for analytics)",
    }),
    defineField({
      name: "userAgent",
      title: "User Agent",
      type: "string",
      description: "Browser/device information",
    }),
    defineField({
      name: "referrer",
      title: "Referrer",
      type: "string",
      description: "Page that referred the user to the form",
    }),

    // Communication & Follow-up
    defineField({
      name: "primaryContact",
      title: "Primary Contact Method",
      type: "string",
      options: {
        list: [
          { title: "Personal Email", value: "personal_email" },
          { title: "Work Email", value: "work_email" },
          { title: "Phone", value: "phone" },
        ],
      },
      initialValue: "work_email",
    }),
    defineField({
      name: "communicationLog",
      title: "Communication Log",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "date",
              title: "Date",
              type: "datetime",
              validation: (rule) => rule.required(),
              initialValue: () => new Date().toISOString(),
            }),
            defineField({
              name: "type",
              title: "Communication Type",
              type: "string",
              options: {
                list: [
                  { title: "Email Sent", value: "email_sent" },
                  { title: "Phone Call", value: "phone_call" },
                  { title: "SMS Sent", value: "sms_sent" },
                  { title: "Meeting Scheduled", value: "meeting_scheduled" },
                  { title: "Follow-up Required", value: "follow_up_required" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "staff",
              title: "Staff Member",
              type: "string",
              description: "Who handled this communication",
            }),
          ],
          preview: {
            select: {
              title: "type",
              subtitle: "note",
              date: "date",
            },
            prepare({ title, subtitle, date }) {
              const formattedDate = date
                ? new Date(date).toLocaleDateString()
                : "No date";
              return {
                title: title,
                subtitle: `${formattedDate}: ${subtitle?.substring(0, 50)}...`,
              };
            },
          },
        },
      ],
      description: "Log of all communications with this registrant",
    }),

    // Internal Management
    defineField({
      name: "assignedTo",
      title: "Assigned To",
      type: "string",
      description: "Staff member responsible for this registration",
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "string",
      options: {
        list: [
          { title: "Low", value: "low" },
          { title: "Normal", value: "normal" },
          { title: "High", value: "high" },
          { title: "Urgent", value: "urgent" },
        ],
      },
      initialValue: "normal",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags for categorizing and filtering submissions",
      options: {
        list: [
          { title: "VIP", value: "vip" },
          { title: "Corporate", value: "corporate" },
          { title: "Individual", value: "individual" },
          { title: "Returning Customer", value: "returning" },
          { title: "Referral", value: "referral" },
          { title: "Early Bird", value: "early_bird" },
        ],
      },
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this submission (not visible to registrant)",
    }),

    // Payment & Registration Details
    defineField({
      name: "registrationDetails",
      title: "Registration Details",
      type: "object",
      fields: [
        defineField({
          name: "confirmed",
          title: "Registration Confirmed",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "confirmationDate",
          title: "Confirmation Date",
          type: "datetime",
        }),
        defineField({
          name: "paymentStatus",
          title: "Payment Status",
          type: "string",
          options: {
            list: [
              { title: "Pending", value: "pending" },
              { title: "Paid", value: "paid" },
              { title: "Partial", value: "partial" },
              { title: "Refunded", value: "refunded" },
              { title: "Waived", value: "waived" },
            ],
          },
          initialValue: "pending",
        }),
        defineField({
          name: "amountPaid",
          title: "Amount Paid",
          type: "number",
          description: "Amount paid for the training",
        }),
        defineField({
          name: "paymentMethod",
          title: "Payment Method",
          type: "string",
        }),
        defineField({
          name: "invoiceNumber",
          title: "Invoice Number",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      email: "personalEmail",
      training: "training.title",
      status: "status",
      submissionDate: "submissionDate",
    },
    prepare({ firstName, lastName, email, training, status, submissionDate }) {
      const formattedDate = submissionDate
        ? new Date(submissionDate).toLocaleDateString()
        : "No date";

      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${training} • ${status} • ${formattedDate}`,
        description: email,
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
    {
      title: "Training Program",
      name: "training",
      by: [
        { field: "training.title", direction: "asc" },
        { field: "submissionDate", direction: "desc" },
      ],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [
        { field: "lastName", direction: "asc" },
        { field: "firstName", direction: "asc" },
      ],
    },
  ],
});
