import { defineType, defineField } from "sanity";

export default defineType({
  name: "person",
  title: "Team Members",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      description: "Full name of the team member",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the name",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Job Position",
      type: "string",
      description: "Job title or position",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department/Team",
      type: "string",
      description: "Which department or team this person belongs to",
      options: {
        list: [
          { title: "Leadership/Board", value: "leadership" },
          { title: "Management", value: "management" },
          { title: "HR & People Services", value: "hr" },
          { title: "Finance", value: "finance" },
          { title: "Sales & Business Development", value: "sales" },
          { title: "Operations", value: "operations" },
          { title: "Advisory Services", value: "advisory" },
          { title: "Recruitment", value: "recruitment" },
          { title: "Learning & Development", value: "learning" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Organizational Level",
      type: "string",
      description: "Level in the organization hierarchy",
      options: {
        list: [
          { title: "Board/Chairman", value: "board" },
          { title: "Director", value: "director" },
          { title: "C-Level (CEO, COO, etc.)", value: "c_level" },
          { title: "Head/Manager", value: "manager" },
          { title: "Senior Staff", value: "senior" },
          { title: "Staff", value: "staff" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Photo",
      type: "image",
      description: "Professional headshot photo",
      options: {
        hotspot: true, // Enables the user to select what part of the image should always be visible
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      description: "Brief biography or description (optional)",
      rows: 4,
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn Profile",
      type: "url",
      description: "LinkedIn profile URL (optional)",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "email",
      description: "Professional email address (optional)",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      description: "Professional phone number (optional)",
    }),
    defineField({
      name: "expertise",
      title: "Areas of Expertise",
      type: "array",
      description: "Key areas of expertise or specialization",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Human Resources", value: "human_resources" },
          { title: "Recruitment & Selection", value: "recruitment" },
          { title: "Learning & Development", value: "learning_development" },
          {
            title: "Organizational Development",
            value: "organizational_development",
          },
          { title: "Leadership Development", value: "leadership_development" },
          { title: "Finance & Accounting", value: "finance" },
          { title: "Sales & Marketing", value: "sales_marketing" },
          { title: "Operations Management", value: "operations" },
          { title: "Strategic Planning", value: "strategic_planning" },
          { title: "Change Management", value: "change_management" },
          { title: "Performance Management", value: "performance_management" },
          { title: "Compensation & Benefits", value: "compensation_benefits" },
          { title: "Employment Law", value: "employment_law" },
          { title: "Diversity & Inclusion", value: "diversity_inclusion" },
          { title: "Business Development", value: "business_development" },
          { title: "Project Management", value: "project_management" },
        ],
      },
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      description: "Total years of professional experience",
      validation: (Rule) => Rule.min(0).max(50),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Order in which team members should appear within their department (lower numbers appear first)",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: "featured",
      title: "Featured Member",
      type: "boolean",
      description: "Whether this person should be featured prominently",
      initialValue: false,
    }),
    defineField({
      name: "showOnWebsite",
      title: "Show on Website",
      type: "boolean",
      description:
        "Whether this person should be displayed on the public website",
      initialValue: true,
    }),
    defineField({
      name: "showOnLeadershipPage",
      title: "Show on Leadership Section",
      type: "boolean",
      description: "Display in the leadership section of the Our People page",
      initialValue: false,
    }),
    defineField({
      name: "showOnManagementPage",
      title: "Show on Management Section",
      type: "boolean",
      description: "Display in the management section of the Our People page",
      initialValue: false,
    }),
    defineField({
      name: "joinedDate",
      title: "Date Joined",
      type: "date",
      description: "When this person joined the company",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description:
        "Internal notes about this team member (not displayed on website)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      description: "department",
      media: "image",
      showOnWebsite: "showOnWebsite",
    },
    prepare({ title, subtitle, description, media, showOnWebsite }) {
      return {
        title: title,
        subtitle: `${subtitle} (${description})`,
        description: showOnWebsite
          ? "Visible on website"
          : "Hidden from website",
        media: media,
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
      title: "Department, then Display Order",
      name: "departmentOrder",
      by: [
        { field: "department", direction: "asc" },
        { field: "displayOrder", direction: "asc" },
      ],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Date Joined",
      name: "joinedDate",
      by: [{ field: "joinedDate", direction: "desc" }],
    },
  ],
});
