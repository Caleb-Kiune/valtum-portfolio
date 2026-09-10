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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // BASE: Theme-aware via CSS variables
        page: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // LAYERS: Surfaces
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // DOCTRINE COLORS
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // UTILITY: Border system
        border: {
          DEFAULT: "hsl(var(--border))",
          subtle: "hsl(var(--border-subtle))",
          highlight: "hsl(var(--border-highlight))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Destructive
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Brands (static — always same in both themes)
        whatsapp: "#25D366",

        // Glass adapters (for bg-glass/5, border-glass/10, etc.)
        glass: "hsl(var(--glass-bg))",
      },
      // Luxury spacing system (Ram Maheshwari negative space)
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        section: "8rem",
        "section-lg": "10rem",
      },
      // Editorial typography scale (Ram Maheshwari inspired)
      fontSize: {
        "display-xl": [
          "4.5rem",
          { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "3.75rem",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "display-md": [
          "3rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-sm": [
          "2.25rem",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
      },
      borderRadius: {
        // Primitives (Inherit from globals.css variable)
        lg: "var(--radius)",         // ~0.5rem (8px)
        md: "calc(var(--radius) - 2px)", // ~0.375rem (6px)
        sm: "calc(var(--radius) - 4px)", // ~0.25rem (4px)

        // Semantic Aliases
        'button': "var(--radius)",        // Maps to 'lg' (8px) - For all interactive buttons
        'input': "var(--radius)",         // Maps to 'lg' (8px) - For form inputs
        'card': '0.75rem',                // 12px - Universal Card Radius (Strict)
        'inner': "calc(var(--radius) - 2px)", // Maps to 'md' (6px) - For pills, tags, inner items
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-outfit)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};
export default config;