# Kimberly Ryan Website

A modern, responsive corporate website for Kimberly Ryan built with Next.js 15, TypeScript, Sanity CMS, and cutting-edge web technologies. This website showcases the company's HR services, team, insights, and provides interactive forms for client engagement.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Sanity CMS Setup](#sanity-cms-setup)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Content Management](#content-management)
- [API Routes](#api-routes)
- [Components](#components)
- [Styling & Theming](#styling--theming)
- [Email Service](#email-service)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Key Concepts](#key-concepts)
- [Documentation](#documentation)

## Features

### Content Management

- **Sanity CMS Integration** - Full content management through Sanity Studio
- **Real-time Updates** - Webhook-based ISR (Incremental Static Regeneration) for instant content updates
- **Rich Content Types**:
  - Hero slides with customizable styling
  - Blog posts with authors and categories
  - Event gallery with photo management
  - Client testimonials
  - Team member profiles (Leadership & Management)
  - Webinar series with PDF downloads
  - Training brochures
  - Training programs with dynamic registration forms
  - Publications and "What's New" sections
  - Trusted company logos

### User Interaction

- **Contact Form** - Client inquiry submission with email notifications
- **Newsletter Subscription** - Email list management with duplicate prevention
- **Training Registration** - Dynamic form system configurable through Sanity
- **Brochure Downloads** - PDF download management with modal interface

### Performance & SEO

- **ISR (Incremental Static Regeneration)** - Automatic page regeneration
- **Optimized Caching** - Granular cache tags for efficient invalidation
- **Sitemap Generation** - Dynamic sitemap including all content types
- **Image Optimization** - Sanity CDN with automatic optimization
- **SEO-Friendly** - Meta tags and structured data

### Technical Features

- **Server-Side Rendering** with Next.js 15 App Router
- **TypeScript** - Full type safety across the codebase
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Email Notifications** - Automated email service using Resend
- **Form Validation** - React Hook Form + Zod for robust validation
- **Animations** - Framer Motion for smooth interactions
- **Modern UI** - shadcn/ui component library

## Tech Stack

### Core Framework

- **Next.js** 15.3.2 (App Router)
- **React** 18.3.1
- **TypeScript** 5.x

### Content Management

- **Sanity** 3.95.0 - Headless CMS
- **@sanity/client** - Sanity client library
- **@sanity/image-url** - Image optimization
- **@portabletext/react** - Rich text rendering

### Styling & UI

- **Tailwind CSS** 3.4.17
- **Tailwind CSS Animate** - Animation utilities
- **shadcn/ui** - Component library (Radix UI primitives)
- **Framer Motion** 12.12.1 - Animations
- **Lucide React** 0.511.0 - Icons

### Forms & Validation

- **React Hook Form** 7.56.4
- **Zod** 3.25.23 - Schema validation
- **@hookform/resolvers** - Form validation integration

### Email Service

- **Resend** 6.1.0 - Email delivery
- **@react-email/components** - Email templates
- **@react-email/render** - Email rendering

### Utilities

- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Conditional class utilities

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **Sanity Account** - For CMS access (sign up at [sanity.io](https://sanity.io))
- **Resend Account** - For email service (sign up at [resend.com](https://resend.com))

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd kimberly-ryan-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your actual values (see [Environment Variables](#environment-variables) section).

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Website: `http://localhost:3000`
   - Sanity Studio: `http://localhost:3000/studio`

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Sanity Webhook (Optional but Recommended)
SANITY_WEBHOOK_SECRET=your_secure_webhook_secret_here

# Email Configuration (Required for forms)
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=info@kimberly-ryan.com
MARKETING_EMAIL=krmarketing@kimberly-ryan.net
```

#### Getting Your Sanity Credentials

1. **Project ID & Dataset:**
   - Sign up at [sanity.io](https://sanity.io)
   - Create a new project or use existing one
   - Project ID and dataset are visible in project settings

2. **API Token:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project → **API** tab
   - Click **"Create token"**
   - Select **"Editor"** permissions
   - Copy the token to `.env.local`

3. **Webhook Secret:**
   - Generate a random secure string (minimum 32 characters)
   - Use this in both Sanity webhook configuration and `.env.local`

#### Getting Your Resend Credentials

1. **API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Go to **API Keys** section
   - Create a new API key
   - Copy the key (starts with `re_`) to `.env.local`

2. **Email Verification:**
   - Verify your sending domain in Resend dashboard
   - Ensure `RESEND_FROM_EMAIL` matches a verified domain

### Sanity CMS Setup

The website uses Sanity CMS for all content management. Detailed setup instructions are available in the [Sanity Setup Documentation](./docs/sanity/SANITY_SETUP.md).

#### Quick Setup Steps

1. **Access Sanity Studio:**
   - Visit `http://localhost:3000/studio` during development
   - Or run `npm run studio` for standalone studio

2. **Configure Webhook (for Production):**
   - Set up webhook in Sanity dashboard pointing to `/api/revalidate`
   - Include webhook secret in headers
   - See [Sanity Setup Guide](./docs/sanity/SANITY_SETUP.md#setting-up-webhooks-in-sanity) for details

3. **Start Creating Content:**
   - Create hero slides
   - Add blog posts
   - Set up team members
   - Configure training programs

## Project Structure

```
kimberly-ryan-website/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Main site routes
│   │   ├── about/                # About pages (who-we-are, our-people, gallery, customer-stories)
│   │   ├── consultation/        # Consultation booking page
│   │   ├── insights/             # Blog and content pages
│   │   ├── services/            # Service pages (hr-advisory, learning-development, etc.)
│   │   ├── solutions/           # Solutions pages
│   │   ├── training/            # Training pages with dynamic registration
│   │   ├── layout.tsx           # Site layout with header/footer
│   │   └── page.tsx             # Homepage
│   ├── api/                      # API routes
│   │   ├── contact/             # Contact form submission
│   │   ├── newsletter/          # Newsletter subscription
│   │   ├── revalidate/         # Sanity webhook handler
│   │   ├── training-registration/ # Training form submission
│   │   └── webinars/            # Webinar tracking
│   ├── studio/                  # Sanity Studio route
│   ├── layout.tsx               # Root layout
│   └── sitemap.ts               # Dynamic sitemap generation
│
├── components/                   # React components
│   ├── common/                  # Shared components (buttons, forms, dialogs)
│   ├── emails/                  # Email templates (React Email)
│   ├── layout/                  # Layout components (header, footer, navigation)
│   └── specific/                # Page-specific components
│
├── docs/                         # Documentation
│   ├── features/                # Feature-specific docs
│   ├── services/                # Service documentation
│   └── sanity/                  # Sanity CMS documentation
│
├── hooks/                        # Custom React hooks
│
├── lib/                          # Utility functions and services
│   ├── email.ts                 # Email service
│   ├── env-check.ts             # Environment validation
│   ├── sanity.ts                # Sanity client and helper functions
│   └── utils.ts                 # General utilities
│
├── sanity/                       # Sanity configuration
│   ├── schemas/                 # Content type schemas
│   │   ├── blog.ts
│   │   ├── event.ts
│   │   ├── person.ts
│   │   ├── training.ts
│   │   └── ... (more schemas)
│   ├── config.ts                # Sanity configuration
│   └── cli.ts                   # Sanity CLI config
│
├── types/                        # TypeScript type definitions
│   └── sanity.ts               # Sanity type definitions
│
├── public/                       # Static assets
│   └── images/                  # Image assets
│
├── .env.local                    # Environment variables (create from env.example)
├── env.example                   # Environment variable template
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Architecture Overview

### Content Flow

```
Sanity CMS → Webhook → Next.js API → Cache Invalidation → Updated Pages
     ↓
Content Editor Publishes → Webhook Triggered → Pages Revalidated → Content Live
```

### Data Fetching Strategy

The website uses a hybrid approach:

1. **Static Generation** - Most pages are statically generated at build time
2. **ISR (Incremental Static Regeneration)** - Pages automatically regenerate:
   - Blogs: Every 60 seconds
   - Events/Testimonials: Every 5-10 minutes
   - Team/Webinars: Every 15-30 minutes
   - Static content: Every hour

3. **On-Demand Revalidation** - Webhooks trigger immediate cache invalidation when content is published

### Cache Tags

The system uses granular cache tags for efficient invalidation:

- `blog-posts`, `blog-list`, `blog-{slug}`
- `events`, `event-{slug}`
- `testimonials`, `featured-testimonials`
- `team-members`, `leadership-team`, `management-team`
- `webinars`, `featured-webinars`
- `brochures`, `featured-brochures`
- `companies`, `homepage-companies`

## Content Management

### Available Content Types

1. **Hero Slides** - Homepage hero carousel
2. **Blog Posts** - Insights and articles
3. **Events** - Gallery events with photos
4. **Testimonials** - Client testimonials
5. **Team Members** - Leadership and management profiles
6. **Webinars** - Learning & Development webinars
7. **Brochures** - Downloadable training materials
8. **Training Programs** - Training offerings with registration
9. **Training Registration Forms** - Dynamic form configurations
10. **Publications** - PDF resources
11. **What's New** - Featured content items
12. **Companies** - Trusted partners/clients
13. **Authors** - Blog post authors
14. **Categories** - Content categorization

### Managing Content

All content is managed through Sanity Studio at `/studio`. For detailed instructions on each content type, see the [Sanity Setup Documentation](./docs/sanity/SANITY_SETUP.md).

### Dynamic Training Registration

The training registration system allows you to create custom registration forms through Sanity. See [Training Registration Documentation](./docs/features/TRAINING_REGISTRATION_IMPLEMENTATION.md) for details.

## API Routes

### Form Submissions

#### POST `/api/contact`

Handles contact form submissions.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "howDidYouHear": "Google Search",
  "serviceInterested": "HR Advisory services",
  "message": "I need help with...",
  "agreeToPrivacy": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

#### POST `/api/newsletter`

Handles newsletter subscriptions.

**Request Body:**

```json
{
  "email": "user@example.com",
  "source": "website_footer"
}
```

#### POST `/api/training-registration`

Handles training program registrations with dynamic form fields.

**Request Body:**

```json
{
  "registrationFormId": "form_id",
  "trainingId": "training_id",
  "firstName": "John",
  "lastName": "Doe",
  "personalEmail": "john@example.com",
  "workEmail": "john@company.com",
  "formData": {
    "customField1": "value1",
    "customField2": "value2"
  }
}
```

### Webhooks

#### POST `/api/revalidate`

Sanity webhook endpoint for on-demand cache revalidation. Secured with `SANITY_WEBHOOK_SECRET`.

**Handles:**

- Blog post updates
- Event gallery changes
- Team member updates
- Webinar updates
- Testimonial changes
- And more...

## Components

### Component Organization

- **`components/common/`** - Reusable UI components (buttons, forms, dialogs)
- **`components/layout/`** - Layout components (header, footer, navigation)
- **`components/specific/`** - Page-specific components
- **`components/emails/`** - Email template components

### Key Components

#### Layout Components

- `Header` - Main navigation with dropdown menus
- `Footer` - Site footer with links and newsletter
- `DesktopNav` / `MobileMenu` - Responsive navigation

#### Form Components

- `ContactUsForm` - Contact form with validation
- `NewsletterSubscriptionForm` - Newsletter signup
- `DynamicTrainingRegistrationForm` - Dynamic registration forms

#### Content Components

- `Hero` - Homepage hero carousel
- `BlogsGrid` - Blog post listing
- `BlogDetail` - Individual blog post
- `GalleryGrid` - Event gallery
- `Testimonials` - Client testimonials display
- `OurPeopleManagement` - Team member sections

## Styling & Theming

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom theme colors:

- **Sunset** - Orange tones (primary brand color)
- **Amberwood** - Warm orange tones
- **Terra** - Earth tones
- **Slate** - Gray scale

### Typography

Two font families are used:

- **Inter** - Primary font (`--font-inter`)
- **IBM Plex Sans** - Secondary font (`--font-ibm-plex-sans`)

### Color System

The design uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  sunset: { 50-600 },
  amberwood: { 50-600 },
  terra: { 50-600 },
  slate: { 50-600 },
  // shadcn/ui colors (background, foreground, etc.)
}
```

### Component Styling

Components follow the shadcn/ui design system with customizations. The styling is consistent across:

- Buttons (primary, secondary, outline variants)
- Forms (inputs, selects, textareas)
- Cards and containers
- Navigation elements

## Email Service

The website includes a comprehensive email service for form notifications. See the [Email Service Documentation](./docs/services/email-service/README.md) for details.

### Email Service Features

- Contact form email notifications
- Newsletter subscription notifications
- Training registration notifications
- Responsive email templates
- Error handling (emails don't block form submissions)

### Configuration

Email settings are configured via environment variables:

- `RESEND_API_KEY` - Resend API key
- `RESEND_FROM_EMAIL` - Sender email address
- `MARKETING_EMAIL` - Recipient email address

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Sanity Studio
npm run studio       # Start standalone Sanity Studio (if configured)
```

### Local Development

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Website: `http://localhost:3000`
   - Sanity Studio: `http://localhost:3000/studio`

3. **Make changes:**
   - Edit components, pages, or styles
   - Hot reload will automatically update the browser
   - Sanity Studio changes require publishing to trigger webhooks

### Working with Sanity

1. **Create/Edit Content:**
   - Open Sanity Studio at `/studio`
   - Create or edit content
   - **Important:** Click "Publish" (not just "Save") to trigger webhooks

2. **Test Webhooks Locally:**
   - Use tools like ngrok to expose localhost
   - Update Sanity webhook URL temporarily
   - Or test webhook manually using curl/Postman

### Schema Changes

When modifying Sanity schemas:

1. Edit schema files in `sanity/schemas/`
2. Restart the development server
3. Sanity Studio will automatically reflect changes
4. Update TypeScript types if needed (in `types/sanity.ts`)

### Adding New Content Types

1. Create a new schema file in `sanity/schemas/`
2. Export it from `sanity/schemas/index.ts`
3. Add helper functions in `lib/sanity.ts`
4. Update webhook handler in `app/api/revalidate/route.ts`
5. Create components to display the content
6. Create pages/routes if needed

## Deployment

### Environment Variables

Set all environment variables in your deployment platform:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_WEBHOOK_SECRET=your_webhook_secret
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=your_from_email
MARKETING_EMAIL=your_marketing_email
```

### Sanity Webhook Configuration

For production deployment:

1. Update webhook URL in Sanity dashboard to your production domain
2. Use production webhook secret
3. Test webhook after deployment

### Recommended Platforms

- **Vercel** - Optimized for Next.js (recommended)
- **Netlify** - Good Next.js support
- **Custom Server** - Any Node.js hosting

### Build Process

```bash
npm run build  # Creates optimized production build
npm run start   # Starts production server
```

## Troubleshooting

### Common Issues

#### Environment Variables Not Working

**Symptoms:** API calls failing, Sanity not loading

**Solutions:**

- Ensure `.env.local` exists and contains all required variables
- Restart the development server after changing `.env.local`
- Check for typos in variable names
- Verify values don't contain quotes (unless necessary)
- Run `node -e "console.log(process.env.VARIABLE_NAME)"` to test

#### Sanity Studio Not Loading

**Symptoms:** Studio shows errors or blank screen

**Solutions:**

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are correct
- Check that API token has correct permissions
- Clear browser cache
- Check browser console for specific errors

#### Content Not Updating

**Symptoms:** Changes in Sanity not reflected on website

**Solutions:**

- Ensure content is **Published** (not just saved as draft)
- Check webhook configuration in Sanity dashboard
- Verify webhook secret matches in both places
- Check API route logs for webhook errors
- Manually trigger revalidation: `POST /api/revalidate`

#### Email Not Sending

**Symptoms:** Forms submit but no email received

**Solutions:**

- Verify `RESEND_API_KEY` is correct and starts with `re_`
- Check Resend dashboard for errors/quota
- Verify sending domain is verified in Resend
- Check spam/junk folders
- Review console logs for email errors
- Test with `EmailService.validateConfiguration()`

#### Build Errors

**Symptoms:** `npm run build` fails

**Solutions:**

- Ensure all environment variables are set
- Check TypeScript errors: `npm run lint`
- Verify Sanity schemas are valid
- Clear `.next` folder and rebuild
- Check for missing dependencies

### Getting Help

1. Check the [Documentation](#documentation) section
2. Review error logs in console/terminal
3. Check Sanity dashboard for CMS issues
4. Verify environment variables are set correctly
5. Test API endpoints individually

## Key Concepts

### ISR (Incremental Static Regeneration)

The website uses ISR to regenerate pages automatically based on:

- **Time-based revalidation** - Pages refresh after a set time
- **On-demand revalidation** - Webhooks trigger immediate updates

This provides:

- Fast page loads (static generation)
- Fresh content (automatic updates)
- No redeployment needed for content changes

### Webhook Revalidation Flow

```
Sanity Content Published
    ↓
Webhook Triggered
    ↓
POST /api/revalidate
    ↓
Cache Tags Invalidated
    ↓
Pages Regenerated
    ↓
New Content Live
```

### Dynamic Forms

The training registration system uses Sanity to configure forms dynamically:

- Form fields defined in Sanity
- Validation rules set per field
- Form renders based on configuration
- Submissions stored in Sanity

### Email Service Architecture

```
Form Submission → API Route → Sanity Storage → Email Service → Email Sent
                                      ↓
                              (Errors logged, don't block)
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

### Feature Documentation

- **[Sitemap Documentation](./docs/features/SITEMAP_DOCUMENTATION.md)** - Dynamic sitemap generation
- **[Training Registration](./docs/features/TRAINING_REGISTRATION_IMPLEMENTATION.md)** - Dynamic form system

### Service Documentation

- **[Email Service](./docs/services/email-service/README.md)** - Email notification system
- **[Sanity CMS Setup](./docs/sanity/SANITY_SETUP.md)** - Complete CMS setup guide

### Main Documentation Index

- **[Documentation Overview](./docs/README.md)** - Navigation and standards

## Additional Resources

### External Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

### Project-Specific

- Content schemas: `sanity/schemas/`
- Type definitions: `types/sanity.ts`
- Helper functions: `lib/sanity.ts`
- Component examples: `components/`

## Contributing

When contributing to this project:

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Maintain consistent styling with Tailwind CSS
4. Add proper error handling
5. Update documentation for new features
6. Test all form submissions and email notifications

## Support & Questions

For questions about:

- **Content Management**: See [Sanity Setup Guide](./docs/sanity/SANITY_SETUP.md)
- **Email Service**: See [Email Service Documentation](./docs/services/email-service/README.md)
- **Development**: Review this README and component code
- **Features**: See feature-specific documentation in `docs/features/`

---

**Built with ❤️ for Kimberly Ryan**

This comprehensive README should provide all the context needed for a new developer to understand, set up, and work with the project effectively.
