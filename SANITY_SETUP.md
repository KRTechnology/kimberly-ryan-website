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

### 6. Gallery Items

- **Title**: Image title
- **Slug**: URL-friendly version
- **Description**: Image description
- **Image**: The actual image file
- **Category**: Predefined categories (Events, Team, Office, Awards, Other)
- **Featured**: Mark as featured image
- **Published Date**: When added to gallery

### 7. Pages

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

### 6. Add Gallery Images

1. Click on "Gallery" in the sidebar
2. Upload images and add titles/descriptions
3. Categorize them appropriately
4. Mark featured images if needed

## 🔄 How It Works

### Data Fetching with Caching

The website uses several optimized helper functions in `lib/sanity.ts`:

- `getHeroSlides()`: Fetches active hero slides (cached for 5 minutes)
- `getHomepageCompanies()`: Fetches companies for homepage (cached for 10 minutes)
- `getCompanies()`: Fetches all active companies (cached for 10 minutes)
- `getBlogPosts()`: Fetches all blog posts (cached for 60 seconds)
- `getBlogPost(slug)`: Fetches a single blog post (cached for 60 seconds)
- `getGalleryItems()`: Fetches all gallery items (cached for 5 minutes)
- `getCategories()`: Fetches all categories (cached for 1 hour)
- `getAuthors()`: Fetches all authors (cached for 1 hour)

### Cache Strategy

- **Hero slides**: 5 minutes (moderate updates)
- **Companies**: 10 minutes (infrequent updates)
- **Blog content**: 60 seconds (frequently updated)
- **Gallery items**: 5 minutes (moderately updated)
- **Categories/Authors**: 1 hour (rarely updated)

### Image Optimization

Images are automatically optimized using Sanity's image transformation API through the `urlFor()` helper function.

### Rich Text Content

Blog post content uses Sanity's Portable Text format, which is rendered using the `@portabletext/react` component.

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

## 🎉 Summary

Your website now has:

✅ **Real-time content updates** without redeployment  
✅ **Hero slides management** with advanced styling options  
✅ **Trusted companies section** with custom backgrounds and links  
✅ **Optimized caching** for better performance  
✅ **SEO-friendly** static generation  
✅ **Scalable architecture** for high traffic  
✅ **Instant webhook notifications** from Sanity

Happy content managing! 🎉
