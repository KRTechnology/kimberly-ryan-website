# Kimberly-Ryan Website Sitemap Documentation

## Overview

This document outlines the sitemap structure for the Kimberly-Ryan Limited website, including both static pages and dynamic content generated from Sanity CMS.

## Sitemap Files

### 1. Static Sitemap (`public/sitemap.xml`)

A static XML sitemap file that includes all static pages and serves as a fallback.

### 2. Dynamic Sitemap (`app/sitemap.ts`)

A Next.js dynamic sitemap generator that pulls data from Sanity CMS to include all dynamic content.

## URL Structure

### Static Pages

#### Homepage

- **URL**: `/`
- **Priority**: 1.0
- **Change Frequency**: Weekly
- **Description**: Main homepage with hero section, services overview, and company highlights

#### About Us Section

- **URL**: `/about/who-we-are`
- **Priority**: 0.8
- **Change Frequency**: Monthly
- **Description**: Company mission, vision, values, and introduction

- **URL**: `/about/our-people`
- **Priority**: 0.8
- **Change Frequency**: Monthly
- **Description**: Team members, leadership, and management profiles

- **URL**: `/about/gallery`
- **Priority**: 0.7
- **Change Frequency**: Weekly
- **Description**: Event photos and visual content

- **URL**: `/about/customer-stories`
- **Priority**: 0.7
- **Change Frequency**: Monthly
- **Description**: Client testimonials and success stories

#### Services Section

- **URL**: `/services/hr-advisory`
- **Priority**: 0.9
- **Change Frequency**: Monthly
- **Description**: HR advisory services and strategic guidance

- **URL**: `/services/learning-development`
- **Priority**: 0.9
- **Change Frequency**: Monthly
- **Description**: Training programs and learning solutions

- **URL**: `/services/recruitment`
- **Priority**: 0.9
- **Change Frequency**: Monthly
- **Description**: Recruitment and selection services

- **URL**: `/services/outsourcing`
- **Priority**: 0.9
- **Change Frequency**: Monthly
- **Description**: HR outsourcing solutions

#### Insights Section

- **URL**: `/insights/blogs`
- **Priority**: 0.8
- **Change Frequency**: Weekly
- **Description**: Blog posts and industry insights

#### Contact & Support

- **URL**: `/solutions/support`
- **Priority**: 0.8
- **Change Frequency**: Monthly
- **Description**: Contact form and support information

- **URL**: `/consultation`
- **Priority**: 0.7
- **Change Frequency**: Monthly
- **Description**: Strategic leadership program registration

### Dynamic Content (Generated from Sanity CMS)

#### Blog Posts

- **URL Pattern**: `/insights/blogs/[slug]`
- **Priority**: 0.6
- **Change Frequency**: Monthly
- **Source**: Sanity `blog` schema
- **Fields Used**: `slug.current`, `publishedAt`

#### Event Gallery Pages

- **URL Pattern**: `/about/gallery/[slug]`
- **Priority**: 0.5
- **Change Frequency**: Monthly
- **Source**: Sanity `event` schema
- **Fields Used**: `slug.current`, `publishedAt`

#### Webinar Pages (if implemented)

- **URL Pattern**: `/insights/webinars/[slug]`
- **Priority**: 0.5
- **Change Frequency**: Monthly
- **Source**: Sanity `webinar` schema
- **Fields Used**: `slug.current`, `dateRecorded`

#### Brochure Pages (if implemented)

- **URL Pattern**: `/resources/brochures/[slug]`
- **Priority**: 0.4
- **Change Frequency**: Monthly
- **Source**: Sanity `brochure` schema
- **Fields Used**: `slug.current`, `publishedAt`

#### Team Member Pages (if implemented)

- **URL Pattern**: `/about/our-people/[slug]`
- **Priority**: 0.4
- **Change Frequency**: Monthly
- **Source**: Sanity `person` schema
- **Fields Used**: `slug.current`, `joinedDate`

### External Pages

- **URL**: `https://www.kracada.com/`
- **Priority**: 0.6
- **Change Frequency**: Monthly
- **Description**: Digital solutions platform

- **URL**: `https://www.youtube.com/@kracada01`
- **Priority**: 0.5
- **Change Frequency**: Weekly
- **Description**: Kracada TV YouTube channel

## Sanity CMS Schemas Used

### 1. Blog Schema

- **Purpose**: Blog posts and articles
- **Key Fields**: `title`, `slug`, `publishedAt`, `author`, `category`
- **URL Generation**: `/insights/blogs/[slug]`

### 2. Event Schema

- **Purpose**: Event gallery and photos
- **Key Fields**: `name`, `slug`, `publishedAt`, `images`, `eventDate`
- **URL Generation**: `/about/gallery/[slug]`

### 3. Webinar Schema

- **Purpose**: Webinar series and training content
- **Key Fields**: `title`, `slug`, `dateRecorded`, `webinarUrl`
- **URL Generation**: `/insights/webinars/[slug]` (if implemented)

### 4. Brochure Schema

- **Purpose**: Training brochures and resources
- **Key Fields**: `title`, `slug`, `publishedAt`, `pdfFile`
- **URL Generation**: `/resources/brochures/[slug]` (if implemented)

### 5. Person Schema

- **Purpose**: Team member profiles
- **Key Fields**: `name`, `slug`, `joinedDate`, `position`
- **URL Generation**: `/about/our-people/[slug]` (if implemented)

### 6. Additional Schemas

- **Author**: For blog post authors
- **Category**: For content categorization
- **Company**: For client testimonials
- **Testimonial**: For client feedback
- **Publication**: For research and publications
- **WhatsNew**: For featured content

## Priority Guidelines

### High Priority (0.9-1.0)

- Homepage (1.0)
- Service pages (0.9)

### Medium Priority (0.7-0.8)

- About pages (0.8)
- Blog listing (0.8)
- Contact pages (0.8)
- Gallery (0.7)
- Customer stories (0.7)

### Lower Priority (0.4-0.6)

- Individual blog posts (0.6)
- Event pages (0.5)
- Webinar pages (0.5)
- External resources (0.5-0.6)
- Team member pages (0.4)
- Brochure pages (0.4)

## Change Frequency Guidelines

### Weekly

- Homepage (frequent updates)
- Blog listing (new content)
- Gallery (new events)
- External YouTube channel

### Monthly

- Service pages (stable content)
- About pages (company info)
- Contact pages
- Individual blog posts
- Event pages
- Team member pages

## Implementation Notes

### Dynamic Sitemap Generation

The `app/sitemap.ts` file uses Next.js 13+ App Router sitemap generation to:

1. Fetch data from Sanity CMS
2. Generate URLs for all dynamic content
3. Include proper metadata (lastModified, changeFrequency, priority)
4. Handle errors gracefully

### Caching Strategy

- Static pages: Cached for 5-10 minutes
- Dynamic content: Cached based on content type (30 seconds to 30 minutes)
- Sanity queries use Next.js cache tags for efficient revalidation

### Error Handling

- Graceful fallback if Sanity queries fail
- Continues to serve static pages even if dynamic content fails
- Logs errors for debugging

## SEO Considerations

### URL Structure

- Clean, semantic URLs
- Consistent with site navigation
- SEO-friendly slugs from Sanity

### Metadata

- Proper lastModified dates
- Appropriate change frequencies
- Priority weighting for search engines

### Content Types

- Blog posts for thought leadership
- Service pages for business offerings
- Team pages for credibility
- Gallery for visual content

## Maintenance

### Regular Updates

- Update static sitemap when adding new pages
- Monitor dynamic content generation
- Review priority and change frequency settings

### Content Management

- Ensure all Sanity content has proper slugs
- Maintain consistent URL patterns
- Update sitemap when adding new content types

### Performance

- Monitor sitemap generation performance
- Optimize Sanity queries as needed
- Consider pagination for large content sets
