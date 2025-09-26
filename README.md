# Kimberly Ryan Website

A modern, responsive website for Kimberly Ryan built with Next.js 15, TypeScript, and Sanity CMS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (for CMS)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kimberly-ryan-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) folder:

- **[Services Documentation](./docs/services/)** - Email service, Sanity CMS setup
- **[Features Documentation](./docs/features/)** - Sitemap generation, training registration
- **[Main Documentation Index](./docs/README.md)** - Complete documentation overview

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity
- **Email**: Resend + React Email
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Environment Validation

Check your environment configuration:

```bash
npm run check:env
```

### Project Structure

```
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── common/            # Shared components
│   ├── layout/            # Layout components
│   ├── specific/          # Page-specific components
│   └── emails/            # Email templates
├── docs/                  # Documentation
│   ├── services/          # Service documentation
│   ├── features/          # Feature documentation
│   └── sanity/            # Sanity CMS documentation
├── lib/                   # Utility functions
├── sanity/                # Sanity schemas and configuration
└── types/                 # TypeScript type definitions
```

## 📖 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
