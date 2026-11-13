import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getFooterBlogPosts } from "@/lib/sanity";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerBlogPosts = await getFooterBlogPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer footerBlogPosts={footerBlogPosts} />
    </div>
  );
}
