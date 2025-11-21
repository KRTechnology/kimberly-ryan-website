import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kimberly Ryan - HR Solutions",
  description: "At the forefront of innovative HR solutions",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-66ZZW3JKGS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-66ZZW3JKGS');
          `}
        </Script>
      </head>

      <body className={`${inter.variable} ${ibmPlexSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
