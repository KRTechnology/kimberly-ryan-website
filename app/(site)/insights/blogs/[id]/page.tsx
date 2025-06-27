import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/specific/blog-detail";
import NewsletterSubscription from "@/components/specific/newsletter-subscription";
import { getBlogPost, getBlogPosts } from "@/lib/sanity";

// Enable ISR - revalidate every 60 seconds in production
export const revalidate = 60;

// Enable fallback for new blog posts
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post: any) => ({
    id: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} - Kimberly-Ryan Limited`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BlogDetail post={post} />
      <NewsletterSubscription />
    </main>
  );
}
