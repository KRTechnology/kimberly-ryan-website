/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          50: "#FEE7DE",
          100: "#FDB38D",
          200: "#EB821D",
          300: "#B56314",
          400: "#82450B",
          500: "#532A04",
          600: "#271101",
        },
        amberwood: {
          50: "#FFEDE7",
          100: "#FEBEA1",
          200: "#F98719",
          300: "#C26811",
          400: "#8E4A09",
          500: "#5D2F04",
          600: "#311501",
        },
        terra: {
          50: "#F8CFB5",
          100: "#EF9D4E",
          200: "#BC7B3C",
          300: "#8C5A2A",
          400: "#5F3C1A",
          500: "#35200B",
          600: "#1B0E03",
        },
        slate: {
          50: "#EDECEB",
          100: "#C8C3C1",
          200: "#A39C99",
          300: "#7D7775",
          400: "#595553",
          500: "#373433",
          600: "#181716",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        plex: ["var(--font-ibm-plex-sans)"],
        inter: ["var(--font-inter)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
