# Sanity CMS Setup Guide

This guide will help you set up and configure Sanity CMS for your Kimberly-Ryan website with **Incremental Static Regeneration (ISR)** and **on-demand revalidation**.

## 🚀 Getting Started

### 1. Create a Sanity Account and Project

1. Go to [sanity.io](https://sanity.io) and sign up/log in
2. Create a new project:

   ```bash
   npx sanity@latest init
   ```

   Or create a project directly on [sanity.io/manage](https://sanity.io/manage)

3. Note down your **Project ID** and **Dataset** (usually 'production')

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity Studio Configuration (for studio access)
SANITY_API_TOKEN=your_api_token_here

# Webhook Secret for security (generate a random string)
SANITY_WEBHOOK_SECRET=your_secure_webhook_secret_here
```

To get your API token:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" tab
4. Create a new token with "Editor" permissions

### 3. Access Sanity Studio

Once you've set up your environment variables, you can access the Sanity Studio in two ways:

#### Option A: Embedded Studio (Recommended)

Visit `http://localhost:3000/studio` when running your Next.js development server.

#### Option B: Standalone Studio

Run the standalone studio:

```bash
npm run studio
```

## ⚡ Real-time Content Updates

This website now uses **Incremental Static Regeneration (ISR)** combined with **webhooks** for instant content updates without requiring redeployments.

### How It Works

1. **ISR**: Pages automatically revalidate every 60 seconds for blog content
2. **Webhooks**: Sanity notifies your website immediately when content is published/updated
3. **Cache Tags**: Granular cache invalidation for efficient updates

### Setting Up Webhooks in Sanity

1. Go to your Sanity project dashboard at [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Webhooks**
4. Click **"Create webhook"**
5. Configure the webhook:

   ```
   Name: Next.js Revalidation
   URL: https://yourdomain.com/api/revalidate
   Dataset: production
   Trigger on: Create, Update, Delete
   HTTP method: POST
   HTTP Headers:
     x-sanity-webhook-secret: your_secure_webhook_secret_here

   Include drafts: No
   ```

6. **Projection** (filter what data to send):

   ```json
   {
     "_type": _type,
     "slug": slug,
     "_id": _id
   }
   ```

7. Save the webhook

### Testing the Webhook

Test your webhook endpoint:

```bash
# Test if the endpoint is active
curl https://yourdomain.com/api/revalidate

# Or locally during development
curl http://localhost:3000/api/revalidate
```

### Content Update Flow

1. **Publish a blog post** in Sanity Studio
2. **Webhook triggers** immediately
3. **Cache invalidated** for affected pages
4. **New content appears** on your website within seconds

## 📝 Content Types Available

### 1. Hero Slides

- **Title**: Main headline for the hero section
- **Subtitle**: Optional supporting text above the title
- **Description**: Supporting text below the title
- **Button Text**: Call-to-action button text
- **Button Link**: URL the button should link to
- **Button Style**: Primary, Secondary, or Text-only
- **Hero Image**: Main image with hotspot support
- **Image Style**: Arc, Rounded, or Square borders
- **Background Color**: White, Gray, Sunset, or Custom hex
- **Display Order**: Control slide sequence
- **Active Status**: Show/hide slides

### 2. Trusted Companies

- **Company Name**: Full name of the company
- **Company Logo**: Logo icon (preferably SVG)
- **Text Logo/Wordmark**: Company name in text format
- **Website URL**: Optional company website link
- **Industry/Category**: Business category (Technology, Healthcare, etc.)
- **Partnership Type**: Client, Strategic Partner, Technology Partner, etc.
- **Company Description**: Internal reference notes
- **Testimonial Quote**: Optional testimonial for future use
- **Display Order**: Control company sequence
- **Active Status**: Show/hide companies
- **Featured on Homepage**: Display in prominent section
- **Logo Background**: Default, White, Blue, Green, Purple, or Custom
- **Date Added**: When partnership began

### 3. Blog Posts

- **Title**: The blog post title
- **Slug**: URL-friendly version of the title
- **Description**: Short summary of the post
- **Content**: Rich text content with images
- **Featured Image**: Main image for the post
- **Author**: Reference to author
- **Category**: Reference to category
- **Published Date**: When the post was published
- **Featured**: Mark as featured post

### 4. Authors

- **Name**: Author's full name
- **Slug**: URL-friendly version of the name
- **Image**: Author's profile photo
- **Bio**: Rich text biography

### 5. Categories

- **Title**: Category name
- **Slug**: URL-friendly version
- **Description**: Category description

### 6. Event Gallery

- **Event Name**: Name of the event (required)
- **Slug**: URL-friendly version of the event name (auto-generated)
- **Description**: Brief description of the event
- **Event Images**: Collection of images from the event (required - at least one image)
  - Each image can have:
    - Alternative text for accessibility
    - Optional caption
- **Cover Image**: Select which image to use as cover (optional - uses first image if not set)
- **Event Date**: When the event took place
- **Location**: Where the event took place
- **Category**: Type of event (Corporate Event, Training Workshop, Team Building, Conference, Award Ceremony, Social Event, Client Meeting, Other)
- **Featured Event**: Mark event as featured to highlight it
- **Active**: Show/hide event on website
- **Number of Attendees**: Approximate attendance
- **Event Organizer**: Person or team who organized the event
- **Tags**: Keywords for easier searching
- **Published Date**: When to publish the event on website (required)
- **Display Order**: Control event sequence (lower numbers appear first)

### 7. Client Testimonials

- **Testimonial Quote**: The main testimonial text from the client (required)
- **Client Name**: Full name of the person giving the testimonial (required)
- **Job Position**: Job title or position of the client (required)
- **Company Name**: Name of the client's company (required)
- **Industry**: Business category (Banking, Healthcare, Technology, etc.)
- **Service Type**: Type of service provided (HR Advisory, Recruitment, Training, etc.)
- **Client Rating**: Rating out of 5 stars (optional)
- **Project Duration**: How long the engagement lasted
- **Featured Testimonial**: Show in highlighted sections
- **Display Order**: Control testimonial sequence
- **Active Status**: Show/hide testimonials
- **Date Received**: When the testimonial was received
- **Internal Notes**: Private notes for team reference

### 8. Team Members

- **Full Name**: Team member's complete name (required)
- **Slug**: URL-friendly version of the name (auto-generated)
- **Job Position**: Current job title or position (required)
- **Department/Team**: Which department they belong to (Leadership, Management, HR, Finance, etc.)
- **Organizational Level**: Hierarchy level (Board, Director, C-Level, Manager, etc.)
- **Profile Photo**: Professional headshot with hotspot selection (required)
- **Biography**: Brief description or background (optional)
- **LinkedIn Profile**: Professional LinkedIn URL (optional)
- **Email Address**: Professional email (optional)
- **Phone Number**: Professional contact number (optional)
- **Areas of Expertise**: Key specializations and skills
- **Years of Experience**: Total professional experience (optional)
- **Display Order**: Control appearance sequence within department
- **Featured Member**: Highlight prominently
- **Show on Website**: Control public visibility
- **Show on Leadership Section**: Display in leadership area
- **Show on Management Section**: Display in management area
- **Date Joined**: When they joined the company (optional)
- **Internal Notes**: Private team reference notes

### 9. Webinar Series

- **Webinar Title**: Main title of the webinar (required)
- **Slug**: URL-friendly version of the title (auto-generated)
- **Description**: Main description or introduction (required)
- **Sub Heading**: Optional sub-heading (e.g., "Webinar Objectives:")
- **Key Points**: Bullet points highlighting benefits or agenda (required)
- **Webinar Image**: Featured image with hotspot selection (required)
- **Watch Webinar URL**: Link to webinar video (YouTube, Vimeo, etc.) (required)
- **Training Slides PDF**: Upload PDF file for download (optional)
- **Webinar Category**: Topic area (HR Essentials, Leadership, etc.)
- **Duration**: Length of webinar (e.g., "45 minutes")
- **Presenter(s)**: Name(s) of webinar presenter(s)
- **Date Recorded**: When the webinar was recorded
- **Display Order**: Control webinar sequence
- **Featured Webinar**: Highlight prominently
- **Active Status**: Show/hide webinars
- **Tags**: Beginner, Intermediate, Advanced, Free, Premium, etc.
- **Download Count**: Track PDF downloads (optional)
- **View Count**: Track webinar views (optional)
- **Internal Notes**: Private reference notes

### 10. Pages

- **Title**: Page title
- **Slug**: URL-friendly version
- **Description**: Page description
- **Content**: Rich text content
- **Hero Image**: Main page image
- **SEO**: SEO title and description

## 🎯 Getting Started with Content

### 1. Create Hero Slides

1. Go to the Studio (`/studio` or standalone)
2. Click on "Hero Slides" in the sidebar
3. Create your first hero slide with all the fields
4. **Important**: Toggle "Active" to true
5. Set the "Display Order" (1 for first slide, 2 for second, etc.)

### 2. Add Trusted Companies

1. Click on "Trusted Companies" in the sidebar
2. Add company information:
   - Upload logo and text logo images
   - Set industry and partnership type
   - Choose background color
   - Set display order
3. Toggle "Active" and "Featured on Homepage" to true
4. **Save and publish**

### 3. Create Your First Author

1. Click on "Author" in the sidebar
2. Create a new author with name, image, and bio

### 4. Create Categories

1. Click on "Category" in the sidebar
2. Create categories like "HR Insights", "Leadership", "Company News", etc.

### 5. Create Your First Blog Post

1. Click on "Blog Post" in the sidebar
2. Fill in all the required fields
3. Add rich content using the content editor
4. Select an author and category
5. Set the published date
6. **Save and publish** (this will trigger the webhook!)

### 6. Create Event Galleries

1. Click on "Event" in the sidebar
2. Create a new event:
   - Enter the event name (required)
   - Add event description
   - Upload multiple images for the event (at least one required)
   - Set event date and location if available
   - Choose event category
   - Set display order for arrangement
3. Toggle "Active" to true to display on website
4. **Save and publish** (this will trigger the webhook!)

**Note**: Events are displayed on the `/about/gallery` page as cards. When users click on an event, they're taken to `/about/gallery/[event-slug]` to view all images from that event in a beautiful lightbox gallery.

### 7. Create Client Testimonials

1. Click on "Client Testimonials" in the sidebar
2. Add testimonial details:
   - Enter the testimonial quote
   - Add client name, position, and company
   - Select industry and service type
   - Set display order for arrangement
   - Choose if it should be featured
3. Toggle "Active" to true to display on website
4. **Save and publish** (this will trigger the webhook!)

**Note**: Testimonials will appear on the `/about/customer-stories` page with pagination (9 testimonials per page).

### 8. Add Team Members

1. Click on "Team Members" in the sidebar
2. Add team member details:
   - Upload professional headshot photo
   - Enter name, position, and department
   - Select organizational level and areas of expertise
   - Set display order within department
   - Choose which sections they should appear in:
     - Toggle "Show on Leadership Section" for leadership team
     - Toggle "Show on Management Section" for management team
   - Add optional bio, LinkedIn, email, and contact information
3. Toggle "Show on Website" to true to display publicly
4. **Save and publish** (this will trigger the webhook!)

**Note**:

- Leadership team members appear in the top section of `/about/our-people`
- Management team members appear in the bottom section of `/about/our-people`
- Team members are automatically sorted by display order within each section

### 9. Create Webinar Series

1. Click on "Webinar Series" in the sidebar
2. Add webinar details:
   - Enter compelling title and description
   - Upload featured image for the webinar
   - Add key points (bullet points) highlighting benefits
   - Enter webinar URL (YouTube, Vimeo, etc.)
   - **Upload PDF**: Upload training slides PDF for download
   - Select category and add optional presenter info
   - Set display order for arrangement
3. Toggle "Active" to true to display on website
4. **Save and publish** (this will trigger the webhook!)

**Note**:

- Webinars appear on the `/services/learning-development` page
- PDF downloads are handled automatically through Sanity's CDN
- Users can watch webinars and download training slides directly

## 🔄 How It Works

### Data Fetching with Caching

The website uses several optimized helper functions in `lib/sanity.ts`:

- `getHeroSlides()`: Fetches active hero slides (cached for 5 minutes)
- `getHomepageCompanies()`: Fetches companies for homepage (cached for 10 minutes)
- `getCompanies()`: Fetches all active companies (cached for 10 minutes)
- `getBlogPosts()`: Fetches all blog posts (cached for 60 seconds)
- `getBlogPost(slug)`: Fetches a single blog post (cached for 60 seconds)
- `getEvents()`: Fetches all active events (cached for 5 minutes)
- `getEvent(slug)`: Fetches a single event by slug (cached for 5 minutes)
- `getTestimonials()`: Fetches all active testimonials (cached for 10 minutes)
- `getFeaturedTestimonials()`: Fetches featured testimonials only (cached for 10 minutes)
- `getLeadershipTeam()`: Fetches leadership team members (cached for 30 minutes)
- `getManagementTeam()`: Fetches management team members (cached for 30 minutes)
- `getAllTeamMembers()`: Fetches all visible team members (cached for 30 minutes)
- `getWebinars()`: Fetches all active webinars (cached for 15 minutes)
- `getFeaturedWebinars()`: Fetches featured webinars only (cached for 15 minutes)
- `getWebinarsByCategory(category)`: Fetches webinars by category (cached for 15 minutes)
- `getCategories()`: Fetches all categories (cached for 1 hour)
- `getAuthors()`: Fetches all authors (cached for 1 hour)

### Cache Strategy

- **Hero slides**: 5 minutes (moderate updates)
- **Companies**: 10 minutes (infrequent updates)
- **Blog content**: 60 seconds (frequently updated)
- **Events**: 5 minutes (moderately updated)
- **Testimonials**: 10 minutes (infrequent updates)
- **Team members**: 30 minutes (infrequent updates)
- **Webinars**: 15 minutes (moderate updates)
- **Categories/Authors**: 1 hour (rarely updated)

### Image Optimization

Images are automatically optimized using Sanity's image transformation API through the `urlFor()` helper function.

### Rich Text Content

Blog post content uses Sanity's Portable Text format, which is rendered using the `@portabletext/react` component.

## 📝 Form Data Collection

The website includes comprehensive form data collection using Sanity for both contact forms and newsletter subscriptions.

### Contact Form Submissions

Contact form data is automatically stored in Sanity with the following structure:

- **Schema**: `contactSubmission`
- **Fields**:
  - **First Name**: Required field
  - **Last Name**: Required field
  - **Email**: Required, validated email format
  - **Phone**: Optional phone number
  - **How Did You Hear**: Required dropdown (Referral, Google Search, Social Media, Website, Advertisement, Event/Conference, Other)
  - **Service Interested**: Required dropdown (HR Advisory services, Learning & Development, Recruitment Solution, Outsourcing, Digital Solutions, Other)
  - **Message**: Required text field (minimum 10 characters)
  - **Privacy Policy Agreement**: Required checkbox
  - **Submission Date**: Auto-generated timestamp
  - **Status**: New, In Progress, Responded, Closed
  - **Source**: Website (auto-populated)
  - **Internal Notes**: For team reference

**Status Management**: New submissions are marked as "new" and can be updated to "in_progress", "responded", or "closed" for tracking purposes.

### Newsletter Subscriptions

Newsletter subscription data is stored with duplicate prevention:

- **Schema**: `newsletterSubscription`
- **Fields**:
  - **Email**: Required, validated email format
  - **Subscription Date**: Auto-generated timestamp
  - **Status**: Active, Unsubscribed, Bounced
  - **Source**: Website Footer, Gallery Page, Contact Page, Homepage, Other
  - **IP Address**: Optional for analytics
  - **User Agent**: Optional browser/device information
  - **Unsubscribe Date**: Set when user unsubscribes
  - **Internal Notes**: For team reference

**Duplicate Prevention**: The system automatically prevents duplicate subscriptions. If someone tries to subscribe with an email that's already active, they'll get a friendly message. If they previously unsubscribed, their subscription will be reactivated.

### Accessing Form Data in Sanity Studio

1. Navigate to your Sanity Studio at `yourdomain.com/studio`
2. Look for "Contact Form Submissions" and "Newsletter Subscriptions" in the sidebar
3. View, filter, and manage submissions directly in the Studio interface
4. Use the built-in ordering options:
   - **Contact Submissions**: By submission date (newest first) or by status
   - **Newsletter Subscriptions**: By subscription date, status, or email alphabetically

### Form Submission Features

- **Real-time Feedback**: Users see immediate feedback when submitting forms
- **Loading States**: Visual indicators during form submission
- **Success/Error Messages**: Clear messaging for all submission states
- **Validation**: Client-side and server-side validation for data integrity
- **Responsive Design**: Forms work beautifully on all devices

### API Functions

The following helper functions are available for form submissions:

```javascript
// Contact form submission
import { submitContactForm } from "@/lib/sanity";

const result = await submitContactForm({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  howDidYouHear: "Google Search",
  serviceInterested: "HR Advisory services",
  message: "I need help with...",
  agreeToPrivacy: true,
});

if (result.success) {
  console.log("Form submitted successfully");
} else {
  console.error("Form submission failed:", result.error);
}

// Newsletter subscription
import { submitNewsletterSubscription } from "@/lib/sanity";

const result = await submitNewsletterSubscription({
  email: "john@example.com",
  source: "website_footer",
});

if (result.success) {
  if (result.reactivated) {
    console.log("Subscription reactivated");
  } else {
    console.log("New subscription created");
  }
} else {
  console.error("Subscription failed:", result.error);
}
```

## 🛠 Development Workflow

### 1. Local Development

```bash
# Start Next.js development server
npm run dev

# Access your website at http://localhost:3000
# Access Sanity Studio at http://localhost:3000/studio
```

### 2. Content Updates

1. Make content changes in the Studio
2. **Publish** the content (don't just save as draft)
3. Webhook triggers automatically
4. Changes appear on your website within seconds

### 3. Schema Changes

If you need to modify content schemas:

1. Edit files in `sanity/schemas/`
2. Restart your development server
3. The Studio will reflect the new schema

## 🚀 Production Deployment

### 1. Environment Variables

Set these environment variables in your production environment:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

### 2. Studio Access

Your production Sanity Studio will be available at `yourdomain.com/studio`.

### 3. Webhook Configuration

Update the webhook URL in Sanity to point to your production domain:

```
https://yourdomain.com/api/revalidate
```

### 4. Content Delivery Network (CDN)

Sanity uses a global CDN for fast content delivery. Your content will be cached and served efficiently worldwide.

## 📊 Performance & Caching

### ISR Benefits

- **Instant updates**: New content appears without redeployment
- **Performance**: Static pages with dynamic updates
- **SEO-friendly**: Pre-rendered content for search engines
- **Scalable**: Handle traffic spikes efficiently

### Cache Invalidation

The system uses both:

- **Time-based revalidation**: Pages refresh automatically
- **Event-based revalidation**: Webhooks trigger immediate updates

## 🔧 Troubleshooting

### Content Not Updating Immediately

1. **Check webhook status** in Sanity dashboard
2. **Verify environment variables** are set correctly
3. **Ensure content is published** (not just saved as draft)
4. **Check webhook logs** in your hosting platform
5. **Test the webhook endpoint** using curl

### Webhook Not Triggering

1. **Verify webhook URL** is accessible from external requests
2. **Check webhook secret** matches your environment variable
3. **Review webhook configuration** in Sanity dashboard
4. **Check server logs** for webhook errors

### Studio Not Loading

- Check your environment variables
- Ensure your Project ID and Dataset are correct
- Verify your API token has the right permissions

### Build Errors

- Ensure all environment variables are set
- Check that your Sanity schemas are valid
- Verify all imports are correct

## 📚 Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Portable Text Guide](https://www.sanity.io/docs/block-content)
- [Image API Reference](https://www.sanity.io/docs/image-url)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Webhook Documentation](https://www.sanity.io/docs/webhooks)

## 🎨 Customization

### Adding New Content Types

1. Create a new schema file in `sanity/schemas/`
2. Export it from `sanity/schemas/index.ts`
3. Add helper functions in `lib/sanity.ts`
4. Update the webhook handler in `app/api/revalidate/route.ts`
5. Create/update components to display the content

### Modifying Existing Schemas

Edit the respective files in `sanity/schemas/` and restart your development server.

---

## 🖼️ Event Gallery System

The gallery has been redesigned to showcase **events** rather than individual images. Here's how it works:

### How the Event Gallery Works

1. **Event Cards**: The main gallery page (`/about/gallery`) displays events as cards
2. **Event Details**: Each card shows:
   - Cover image (first image or selected cover image)
   - Event name and description
   - Event date and location (if provided)
   - Category badge
   - Number of photos in the event
   - Featured badge (if marked as featured)

3. **Individual Event Pages**: Click on any event to view all its photos at `/about/gallery/[event-slug]`
4. **Photo Lightbox**: Click on any photo to open a beautiful lightbox with:
   - Full-size image viewing
   - Navigation between photos
   - Image captions (if provided)
   - Photo counter

### Event Categories

Events can be categorized as:

- Corporate Event
- Training Workshop
- Team Building
- Conference
- Award Ceremony
- Social Event
- Client Meeting
- Other

### Filtering and Sorting

Users can:

- **Filter by category**: View all events or filter by specific categories
- **Sort events**: Most Recent, Oldest First, Alphabetical, Featured First
- **Pagination**: Navigate through multiple pages of events

### Features

- **Responsive Design**: Works beautifully on all devices
- **Animations**: Smooth transitions and hover effects using Framer Motion
- **SEO Optimized**: Each event page has proper meta tags
- **Performance**: Images are optimized and lazy-loaded
- **Accessibility**: Alt text and keyboard navigation support

## 🎉 Summary

Your website now has:

✅ **Real-time content updates** without redeployment  
✅ **Hero slides management** with advanced styling options  
✅ **Trusted companies section** with custom backgrounds and links  
✅ **Event gallery system** with individual event pages and photo lightbox  
✅ **Client testimonials system** with detailed filtering and pagination  
✅ **Team member management** for leadership and management sections  
✅ **Webinar series management** with PDF downloads and video links  
✅ **Optimized caching** for better performance  
✅ **SEO-friendly** static generation  
✅ **Scalable architecture** for high traffic  
✅ **Instant webhook notifications** from Sanity

Happy content managing! 🎉
