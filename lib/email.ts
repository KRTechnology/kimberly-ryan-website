import { Resend } from "resend";
import React from "react";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "info@kimberly-ryan.com",
  to: process.env.MARKETING_EMAIL || "krmarketing@kimberly-ryan.net",
  replyTo: process.env.RESEND_FROM_EMAIL || "info@kimberly-ryan.com",
} as const;

// Email service types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  howDidYouHear: string;
  serviceInterested: string;
  message: string;
  agreeToPrivacy: boolean;
  submissionDate: string;
  submissionId?: string;
}

export interface NewsletterSubscriptionData {
  email: string;
  source: string;
  subscriptionDate: string;
  subscriptionId?: string;
  status: string;
  isReactivation?: boolean;
}

export interface TrainingRegistrationData {
  firstName: string;
  lastName: string;
  personalEmail: string;
  workEmail: string;
  phoneNumber?: string;
  organization?: string;
  jobRole: string;
  yearsOfExperience: number;
  formData: Record<string, any>;
  formFields: Array<{
    fieldName: string;
    label: string;
    fieldType: string;
    required: boolean;
  }>;
  trainingTitle: string;
  registrationFormTitle: string;
  submissionDate: string;
  submissionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

/**
 * Email service class for handling all email notifications
 */
export class EmailService {
  /**
   * Send contact form submission notification email
   */
  static async sendContactFormNotification(
    data: ContactFormData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { ContactSubmissionEmail } = await import(
        "@/components/emails/contact-submission-email"
      );

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.to,
        replyTo: data.email,
        subject: `New Contact Form Submission - ${data.firstName} ${data.lastName}`,
        react: React.createElement(ContactSubmissionEmail, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          howDidYouHear: data.howDidYouHear,
          serviceInterested: data.serviceInterested,
          message: data.message,
          agreeToPrivacy: data.agreeToPrivacy,
          submissionDate: data.submissionDate,
          submissionId: data.submissionId,
        }),
        headers: {
          "X-Entity-Ref-ID": data.submissionId || "contact-form",
        },
      });

      if (result.error) {
        console.error("Contact form email error:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log("Contact form email sent successfully:", result.data);
      return { success: true };
    } catch (error) {
      console.error("Error sending contact form email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown email error",
      };
    }
  }

  /**
   * Send newsletter subscription notification email
   */
  static async sendNewsletterSubscriptionNotification(
    data: NewsletterSubscriptionData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { NewsletterSubscriptionEmail } = await import(
        "@/components/emails/newsletter-subscription-email"
      );

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.to,
        subject: `Newsletter Subscription ${data.isReactivation ? "Reactivated" : "Added"} - ${data.email}`,
        react: React.createElement(NewsletterSubscriptionEmail, {
          email: data.email,
          source: data.source,
          subscriptionDate: data.subscriptionDate,
          subscriptionId: data.subscriptionId,
          status: data.status,
          isReactivation: data.isReactivation,
        }),
        headers: {
          "X-Entity-Ref-ID": data.subscriptionId || "newsletter-subscription",
        },
      });

      if (result.error) {
        console.error("Newsletter subscription email error:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log(
        "Newsletter subscription email sent successfully:",
        result.data
      );
      return { success: true };
    } catch (error) {
      console.error("Error sending newsletter subscription email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown email error",
      };
    }
  }

  /**
   * Send training registration notification email
   */
  static async sendTrainingRegistrationNotification(
    data: TrainingRegistrationData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { TrainingRegistrationEmail } = await import(
        "@/components/emails/training-registration-email"
      );

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.to,
        replyTo: data.workEmail || data.personalEmail,
        subject: `New Training Registration - ${data.trainingTitle} - ${data.firstName} ${data.lastName}`,
        react: React.createElement(TrainingRegistrationEmail, {
          firstName: data.firstName,
          lastName: data.lastName,
          personalEmail: data.personalEmail,
          workEmail: data.workEmail,
          phoneNumber: data.phoneNumber,
          organization: data.organization,
          jobRole: data.jobRole,
          yearsOfExperience: data.yearsOfExperience,
          formData: data.formData,
          formFields: data.formFields,
          trainingTitle: data.trainingTitle,
          registrationFormTitle: data.registrationFormTitle,
          submissionDate: data.submissionDate,
          submissionId: data.submissionId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          referrer: data.referrer,
        }),
        headers: {
          "X-Entity-Ref-ID": data.submissionId || "training-registration",
        },
      });

      if (result.error) {
        console.error("Training registration email error:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log(
        "Training registration email sent successfully:",
        result.data
      );
      return { success: true };
    } catch (error) {
      console.error("Error sending training registration email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown email error",
      };
    }
  }

  /**
   * Send a generic notification email
   */
  static async sendGenericNotification({
    to,
    subject,
    html,
    text,
    replyTo,
    headers = {},
  }: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    headers?: Record<string, string>;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to,
        subject,
        html,
        text,
        replyTo: replyTo || EMAIL_CONFIG.replyTo,
        headers,
      });

      if (result.error) {
        console.error("Generic email error:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log("Generic email sent successfully:", result.data);
      return { success: true };
    } catch (error) {
      console.error("Error sending generic email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown email error",
      };
    }
  }

  /**
   * Validate email configuration
   */
  static validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!process.env.RESEND_API_KEY) {
      errors.push("RESEND_API_KEY environment variable is required");
    }

    if (!EMAIL_CONFIG.from) {
      errors.push("Email from address is not configured");
    }

    if (!EMAIL_CONFIG.to) {
      errors.push("Email to address is not configured");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (EMAIL_CONFIG.from && !emailRegex.test(EMAIL_CONFIG.from)) {
      errors.push("Email from address is not a valid email format");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Helper function to format form data for email display
 */
export function formatFormDataForEmail(
  formData: Record<string, any>,
  formFields: Array<{ fieldName: string; label: string; fieldType: string }>
): Array<{ label: string; value: string; fieldType: string }> {
  return formFields
    .filter(
      (field) =>
        formData[field.fieldName] !== undefined &&
        formData[field.fieldName] !== ""
    )
    .map((field) => ({
      label: field.label,
      value: String(formData[field.fieldName]),
      fieldType: field.fieldType,
    }));
}

/**
 * Helper function to get human-readable service names
 */
export function getHumanReadableServiceName(serviceKey: string): string {
  const serviceMap: Record<string, string> = {
    hr_advisory: "HR Advisory Services",
    learning_development: "Learning & Development",
    recruitment: "Recruitment Solution",
    outsourcing: "Outsourcing",
    digital_solutions: "Digital Solutions",
    other: "Other",
  };

  return serviceMap[serviceKey] || serviceKey;
}

/**
 * Helper function to get human-readable "how did you hear" names
 */
export function getHumanReadableHowDidYouHear(key: string): string {
  const hearMap: Record<string, string> = {
    referral: "Referral",
    google_search: "Google Search",
    social_media: "Social Media",
    website: "Website",
    advertisement: "Advertisement",
    event_conference: "Event/Conference",
    other: "Other",
  };

  return hearMap[key] || key;
}

/**
 * Helper function to get human-readable source names
 */
export function getHumanReadableSourceName(sourceKey: string): string {
  const sourceMap: Record<string, string> = {
    website_footer: "Website Footer",
    gallery_page: "Gallery Page",
    contact_page: "Contact Page",
    homepage: "Homepage",
    website_hero: "Website Hero Section",
    other: "Other",
  };

  return sourceMap[sourceKey] || sourceKey;
}
