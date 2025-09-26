# Email Service Integration

This document describes the email service integration for the Kimberly Ryan website, which automatically sends email notifications when forms are submitted.

## Overview

The email service is built using:

- **Resend** - Email delivery service
- **React Email** - Email template components
- **TypeScript** - Type safety and better development experience

## Features

- 📧 **Contact Form Notifications** - Sent when contact forms are submitted
- 📬 **Newsletter Subscription Notifications** - Sent when users subscribe or reactivate
- 🎓 **Training Registration Notifications** - Sent when users register for training programs
- 🔒 **Type-safe** - Full TypeScript support with proper interfaces
- 🎨 **Responsive Email Templates** - Beautiful, mobile-friendly email designs
- ⚡ **Async Processing** - Non-blocking email sending that doesn't affect form submission
- 🏗️ **Scalable Architecture** - Easy to extend with new email types

## Setup

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=info@kimberly-ryan.com
MARKETING_EMAIL=krmarketing@kimberly-ryan.net

# Email Settings
# All form submission emails will be sent to the MARKETING_EMAIL address
```

### 2. Email Recipients

- **To Address**: Configured via `MARKETING_EMAIL` (defaults to `krmarketing@kimberly-ryan.net`)
- **From Address**: Configured via `RESEND_FROM_EMAIL` (defaults to `info@kimberly-ryan.com`)

## Email Templates

### Contact Form Email

- **Trigger**: Contact form submission
- **Contains**: Contact details, service interest, message, submission metadata
- **Color Theme**: Orange (brand color)

### Newsletter Subscription Email

- **Trigger**: Newsletter subscription or reactivation
- **Contains**: Email address, source, subscription status
- **Color Theme**: Green
- **Special**: Handles both new subscriptions and reactivations

### Training Registration Email

- **Trigger**: Training program registration
- **Contains**: Registrant details, training info, dynamic form responses, technical metadata
- **Color Theme**: Purple
- **Special**: Displays all dynamic form fields in a structured format

## API Integration

The email service is integrated into the following API routes:

- `/api/contact` - Contact form submissions
- `/api/newsletter` - Newsletter subscriptions
- `/api/training-registration` - Training registrations

### Error Handling

Email sending errors are logged but do not cause API failures. Form submissions will succeed even if email delivery fails, ensuring a good user experience.

## File Structure

```
lib/
├── email.ts                           # Main email service
└── env-check.ts                       # Environment validation

components/emails/
├── contact-submission-email.tsx       # Contact form template
├── newsletter-subscription-email.tsx  # Newsletter template
└── training-registration-email.tsx    # Training registration template

app/api/
├── contact/route.ts                   # Contact form API (with email integration)
├── newsletter/route.ts                # Newsletter API (with email integration)
└── training-registration/route.ts     # Training registration API (with email integration)
```

## Testing

### Form Testing

1. **Contact Form**: Submit through `/contact` page
2. **Newsletter**: Subscribe through any newsletter form on the site
3. **Training Registration**: Register through `/training/registration/[slug]` pages

### Environment Validation

Check that your environment is properly configured:

```bash
npm run check:env
```

## Email Service API

### EmailService Class

#### Methods

- `sendContactFormNotification(data: ContactFormData)`
- `sendNewsletterSubscriptionNotification(data: NewsletterSubscriptionData)`
- `sendTrainingRegistrationNotification(data: TrainingRegistrationData)`
- `sendGenericNotification(options)` - For custom emails
- `validateConfiguration()` - Check environment setup

#### Helper Functions

- `formatFormDataForEmail()` - Format dynamic form data for display
- `getHumanReadableServiceName()` - Convert service codes to display names
- `getHumanReadableHowDidYouHear()` - Convert referral codes to display names
- `getHumanReadableSourceName()` - Convert source codes to display names

## Configuration

### Email Settings

```typescript
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "info@kimberly-ryan.com",
  to: process.env.MARKETING_EMAIL || "krmarketing@kimberly-ryan.net",
  replyTo: process.env.RESEND_FROM_EMAIL || "info@kimberly-ryan.com",
} as const;
```

### Resend Configuration

The service uses Resend's API with the following features:

- Custom headers for tracking
- Reply-to addresses for easy responses
- Error handling and logging
- Dynamic email template loading

## Security

- **Environment Variables**: API keys are stored securely in environment variables
- **Type Safety**: All email data is properly typed and validated
- **Error Isolation**: Email failures don't affect form submissions
- **Headers**: Custom headers for email tracking and identification

## Monitoring

- All email operations are logged to the console
- Success and failure states are tracked
- Submission IDs are included for correlation with Sanity records

## Troubleshooting

### Common Issues

1. **Environment Variable Missing**

   ```
   Error: RESEND_API_KEY environment variable is required
   ```

   Solution: Add `RESEND_API_KEY` to your environment variables

2. **Email Template Import Errors**
   - Email templates use dynamic imports to avoid TypeScript path issues
   - Components are loaded at runtime using `React.createElement`

3. **Email Not Received**
   - Check console logs for error messages
   - Verify Resend API key is correct
   - Check spam/junk folders
   - Verify recipient email address

### Testing Environment Setup

1. Set `NODE_ENV=development` to send emails to test address
2. Use the test script to verify email sending
3. Check Resend dashboard for delivery status

## Future Enhancements

Potential improvements for the email service:

1. **Email Templates**
   - Add plain text versions of emails
   - Implement email template customization through Sanity
   - Add email preview functionality

2. **Advanced Features**
   - Email delivery tracking
   - Bounce handling
   - Unsubscribe management
   - Email analytics

3. **Notifications**
   - Slack/Teams integration for immediate notifications
   - SMS notifications for urgent registrations
   - Email digest summaries

4. **Customization**
   - Dynamic email signatures
   - Conditional content based on form responses
   - Personalized email templates

## Support

For issues with the email service:

1. Check the console logs for detailed error messages
2. Verify environment variables are set correctly
3. Test with the provided test script
4. Check Resend dashboard for API usage and errors
