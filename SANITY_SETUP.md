# Sanity CMS Setup Guide

This guide will help you set up and configure Sanity CMS for your Kimberly-Ryan website.

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

## 📝 Content Types Available

### 1. Blog Posts

- **Title**: The blog post title
- **Slug**: URL-friendly version of the title
- **Description**: Short summary of the post
- **Content**: Rich text content with images
- **Featured Image**: Main image for the post
- **Author**: Reference to author
- **Category**: Reference to category
- **Published Date**: When the post was published
- **Featured**: Mark as featured post

### 2. Authors

- **Name**: Author's full name
- **Slug**: URL-friendly version of the name
- **Image**: Author's profile photo
- **Bio**: Rich text biography

### 3. Categories

- **Title**: Category name
- **Slug**: URL-friendly version
- **Description**: Category description

### 4. Gallery Items

- **Title**: Image title
- **Slug**: URL-friendly version
- **Description**: Image description
- **Image**: The actual image file
- **Category**: Predefined categories (Events, Team, Office, Awards, Other)
- **Featured**: Mark as featured image
- **Published Date**: When added to gallery

### 5. Pages

- **Title**: Page title
- **Slug**: URL-friendly version
- **Description**: Page description
- **Content**: Rich text content
- **Hero Image**: Main page image
- **SEO**: SEO title and description

## 🎯 Getting Started with Content

### 1. Create Your First Author

1. Go to the Studio (`/studio` or standalone)
2. Click on "Author" in the sidebar
3. Create a new author with name, image, and bio

### 2. Create Categories

1. Click on "Category" in the sidebar
2. Create categories like "HR Insights", "Leadership", "Company News", etc.

### 3. Create Your First Blog Post

1. Click on "Blog Post" in the sidebar
2. Fill in all the required fields
3. Add rich content using the content editor
4. Select an author and category
5. Set the published date
6. Save and publish

### 4. Add Gallery Images

1. Click on "Gallery" in the sidebar
2. Upload images and add titles/descriptions
3. Categorize them appropriately
4. Mark featured images if needed

## 🔄 How It Works

### Data Fetching

The website uses several helper functions in `lib/sanity.ts`:

- `getBlogPosts()`: Fetches all blog posts
- `getBlogPost(slug)`: Fetches a single blog post by slug
- `getGalleryItems()`: Fetches all gallery items
- `getCategories()`: Fetches all categories
- `getAuthors()`: Fetches all authors

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
2. Changes are automatically synced
3. Your website will fetch the latest content

### 3. Schema Changes

If you need to modify content schemas:

1. Edit files in `sanity/schemas/`
2. Restart your development server
3. The Studio will reflect the new schema

## 🚀 Production Deployment

### 1. Environment Variables

Make sure to set the same environment variables in your production environment.

### 2. Studio Access

Your production Sanity Studio will be available at `yourdomain.com/studio`.

### 3. Content Delivery Network (CDN)

Sanity uses a global CDN for fast content delivery. Your content will be cached and served efficiently worldwide.

## 📚 Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text Guide](https://www.sanity.io/docs/block-content)
- [Image API Reference](https://www.sanity.io/docs/image-url)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## 🎨 Customization

### Adding New Content Types

1. Create a new schema file in `sanity/schemas/`
2. Export it from `sanity/schemas/index.ts`
3. Add helper functions in `lib/sanity.ts`
4. Create/update components to display the content

### Modifying Existing Schemas

Edit the respective files in `sanity/schemas/` and restart your development server.

## 🔧 Troubleshooting

### Studio Not Loading

- Check your environment variables
- Ensure your Project ID and Dataset are correct
- Verify your API token has the right permissions

### Content Not Updating

- Clear your browser cache
- Check if you're using the correct dataset
- Verify your content is published (not just saved as draft)

### Build Errors

- Ensure all environment variables are set
- Check that your Sanity schemas are valid
- Verify all imports are correct

---

Happy content managing! 🎉
