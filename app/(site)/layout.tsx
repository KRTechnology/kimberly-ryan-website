import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getFooterBlogPosts } from "@/lib/sanity";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerBlogPosts = await getFooterBlogPosts();

  return (
    <div
      className={`${inter.variable} ${ibmPlexSans.variable} min-h-screen flex flex-col`}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer footerBlogPosts={footerBlogPosts} />
    </div>
  );
}
