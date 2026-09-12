import type { Config } from "tailwindcss";

const config: Config = {
  // Enforce manual toggling, though we will lock to dark
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "text-body": "hsl(var(--text-body))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
          alt: "hsl(var(--surface-alt))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          foreground: "hsl(var(--accent-foreground))",
        },
        deep: {
          DEFAULT: "hsl(var(--deep))",
          foreground: "hsl(var(--deep-foreground))",
        },
        muted: {
          foreground: "hsl(var(--muted-foreground))",
        },
        subtle: "hsl(var(--text-subtle))",
        border: {
          DEFAULT: "hsl(var(--border))",
          hover: "hsl(var(--border-hover))",
        },
        divider: "hsl(var(--divider))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        section: "10rem",       // 160px (was 128px)
        "section-lg": "15rem",  // 240px (was 160px)
      },
      fontSize: {
        // ─── SERIF DISPLAY SCALE (Cormorant Garamond) ───
        "display-hero": [
          "clamp(3.5rem, 8vw, 6.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "400" },
        ],
        "display-xl": [
          "clamp(2.75rem, 5.5vw, 4.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.025em", fontWeight: "400" },
        ],
        "display-lg": [
          "clamp(2.25rem, 4vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "display-md": [
          "clamp(1.75rem, 3vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "400" },
        ],
        "display-sm": [
          "clamp(1.5rem, 2.5vw, 1.875rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
      
        // ─── SANS-SERIF BODY SCALE (Inter) ───
        "body-lg": [
          "1.125rem",
          { lineHeight: "1.75", fontWeight: "400" },
        ],
        "body": [
          "1rem",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "body-sm": [
          "0.875rem",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
      
        // ─── UTILITY ───
        "label": [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.15em", fontWeight: "500" },
        ],
        "caption": [
          "0.75rem",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
      },
      borderRadius: {
        none: "0px",
        micro: "2px",       // Images in containers, cards, inputs
        sm: "3px",          // Slightly larger containers
        full: "9999px",     // Pills, avatars, status dots ONLY
        button: "0px",      // Buttons are sharp — editorial standard
        input: "2px",       // Form inputs
        card: "2px",        // Card containers
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};
export default config;