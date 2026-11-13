import localFont from "next/font/local";

/**
 * Self-hosted fonts.
 *
 * These used to come from `next/font/google`, but that fetches the CSS and
 * woff2 files from Google Fonts while the site is building. On Vercel the
 * fetch intermittently returned something the loader could not parse, which
 * failed the whole build:
 *
 *   TypeError: Cannot read properties of null (reading '1')
 *       at next/dist/compiled/@next/font/dist/google/loader.js:122
 *
 * Keeping the files in app/fonts makes the build deterministic: it no longer
 * depends on a third party being reachable, and the fonts are still served
 * from our own domain with no runtime request to Google.
 *
 * The files are the "latin" subset from Google Fonts (SIL Open Font License):
 * https://fonts.google.com/specimen/Inter
 * https://fonts.google.com/specimen/IBM+Plex+Sans
 * https://fonts.google.com/specimen/Outfit
 */

export const inter = localFont({
  src: "../app/fonts/inter-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: "Arial",
});

export const ibmPlexSans = localFont({
  src: [
    {
      path: "../app/fonts/ibm-plex-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/ibm-plex-sans-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/ibm-plex-sans-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/ibm-plex-sans-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ibm-plex-sans",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: "Arial",
});

export const outfit = localFont({
  src: [
    { path: "../app/fonts/outfit-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/outfit-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/outfit-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: "Arial",
});
