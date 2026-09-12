# VALTUM UI OVERHAUL — LLM-TO-LLM MASTER HANDOVER DOCUMENT

> **FROM:** Design Research AI (Claude Opus 4.6 Thinking)
> **TO:** Implementation AI (Gemini 3.1 Pro)
> **DATE:** September 12, 2026
> **STATUS:** Research complete. All design decisions are FINAL. Execute precisely.

---

## ⚠️ OPERATING PROTOCOL

You are receiving this document as the **single source of truth** for a visual overhaul of the Valtum Interiors portfolio. Every design decision has been audited, debated, and locked.

**Your rules:**
1. Follow the phased roadmap **sequentially**. Do NOT jump phases.
2. After each phase, **STOP**. Tell the user to run `npm run dev` and visually verify. Wait for explicit "proceed" approval before starting the next phase.
3. **Never modify** any file listed in the Data Protection Boundaries section.
4. If a design decision in this document conflicts with your own instinct, **this document wins**.
5. The site must compile with zero errors after every phase.

---

## 1. PROJECT CONTEXT & GOAL

### What This Project Is

**Valtum Interiors** is a personal portfolio for **Erick Mwangi W.**, an Interior Architect & Project Manager based in Nairobi, Kenya. The site showcases residential and commercial interior architecture projects.

**The problem:** The current codebase was originally built as a **SaaS/tech developer portfolio** and has been re-skinned for architecture. It retains tech-startup visual DNA — bento grids, monospace status indicators, "FinTech" code comments, and a subtitle that says "ROI-driven software." The typography is two sans-serif fonts with no editorial contrast. The visual identity is generic, not premium.

**The goal:** Transform this into an **Awwwards-level interior architecture portfolio** — editorial, cinematic, image-forward, with extreme negative space, serif/sans typography tension, and world-class scroll interactions. Think Norm Architects meets Kinfolk Magazine.

### Tech Stack (Do NOT Upgrade)

| Dependency | Version | Notes |
|------------|---------|-------|
| Next.js | `15.5.9` | App Router, React Server Components |
| React | `19.1.0` | |
| Tailwind CSS | `3.4.17` | NOT v4. Use v3 syntax. |
| Framer Motion | `12.27.5` | Primary animation library |
| TypeScript | `^5` | Strict mode |
| class-variance-authority | `0.7.1` | For component variants |
| lucide-react | `0.562.0` | Icon library |
| react-icons | `5.5.0` | For FaWhatsapp, social icons |
| zod | `4.3.5` | Form validation |
| next-themes | `0.4.6` | Theme provider (locked to light) |

### File Architecture Map

```
src/
├── app/
│   ├── globals.css              ← MODIFY (Phase 1)
│   ├── layout.tsx               ← MODIFY (Phase 1)
│   ├── page.tsx                 ← MODIFY (Phase 3-4, layout only)
│   └── projects/[slug]/
│       └── page.tsx             ← DO NOT MODIFY
│
├── components/
│   ├── layout/
│   │   ├── header.tsx           ← MODIFY (Phase 2)
│   │   └── footer.tsx           ← MODIFY (Phase 2)
│   ├── providers/
│   │   └── theme-provider.tsx   ← DO NOT MODIFY
│   ├── sections/
│   │   ├── hero.tsx             ← MODIFY (Phase 3)
│   │   ├── selected-work.tsx    ← MODIFY (Phase 4)
│   │   ├── project-card.tsx     ← MODIFY (Phase 4)
│   │   ├── about.tsx            ← MODIFY (Phase 2)
│   │   ├── core-skills.tsx      ← MODIFY (Phase 2)
│   │   ├── services.tsx         ← MODIFY (Phase 2)
│   │   ├── testimonials.tsx     ← MODIFY (Phase 2)
│   │   └── contact.tsx          ← MODIFY (Phase 2)
│   ├── ui/
│   │   ├── button.tsx           ← MODIFY (Phase 2)
│   │   ├── badge.tsx            ← MODIFY (Phase 2)
│   │   ├── scroll-reveal.tsx    ← DELETE (Phase 1, replaced by Framer)
│   │   └── section-heading.tsx  ← MODIFY (Phase 1)
│   └── work/
│       ├── case-study-layout.tsx ← MODIFY (Phase 5)
│       ├── code-block.tsx       ← LEAVE AS-IS
│       └── project-metrics.tsx  ← LEAVE AS-IS
│
├── lib/
│   ├── motion.ts               ← MODIFY (Phase 1)
│   ├── utils.ts                ← DO NOT MODIFY
│   ├── types.ts                ← DO NOT MODIFY
│   ├── types/project.ts        ← DO NOT MODIFY
│   ├── data/projects.ts        ← DO NOT MODIFY
│   └── constants/
│       ├── services.ts         ← DO NOT MODIFY
│       ├── testimonials.ts     ← DO NOT MODIFY
│       └── skills.ts           ← DO NOT MODIFY
│
└── tailwind.config.ts           ← MODIFY (Phase 1)
```

---

## 2. LOCKED DESIGN SYSTEM (Source of Truth)

### 2.1 — COLOR PALETTE

Replace **all** existing CSS variables in `globals.css` `:root` with this exact set. Remove dark mode variables — the site is permanently light via `theme-provider.tsx` (`forcedTheme="light"`).

```css
:root {
  /* ─── BACKGROUND SYSTEM ─── */
  --background: 40 22% 95%;         /* #F7F5F0 — Warm Cream (page bg) */
  --surface: 0 0% 100%;             /* #FFFFFF — Card surfaces */
  --surface-elevated: 37 17% 92%;   /* #EFECE6 — Hover states, elevated */
  --surface-alt: 37 15% 89%;        /* #E8E4DD — Alternate section bg */

  /* ─── TEXT SYSTEM ─── */
  --foreground: 0 0% 11%;           /* #1C1C1C — Headings, primary text */
  --text-body: 0 0% 18%;            /* #2E2E2E — Body copy */
  --muted-foreground: 0 0% 42%;     /* #6B6B6B — Secondary text */
  --text-subtle: 0 0% 64%;          /* #A3A3A3 — Captions, tertiary */

  /* ─── BRAND ACCENT: WARM BRASS ─── */
  --accent: 38 47% 51%;             /* #B8964E — Primary accent */
  --accent-hover: 38 41% 39%;       /* #8B6F3A — Hover state */
  --accent-foreground: 0 0% 100%;   /* #FFFFFF — Text on accent bg */

  /* ─── ARCHITECTURAL NEUTRALS ─── */
  --deep: 180 30% 15%;              /* #1A3232 — Deep Forest (dark sections) */
  --deep-foreground: 40 22% 95%;    /* #F7F5F0 — Text on deep bg */

  /* ─── BORDERS & DIVIDERS ─── */
  --border: 37 14% 87%;             /* #E2DED6 — Standard borders */
  --border-hover: 37 10% 77%;       /* #C4BFB5 — Hover borders */
  --divider: 37 17% 93%;            /* #F0EDE7 — Hairline dividers */

  /* ─── UTILITY ─── */
  --ring: 38 47% 51%;               /* Same as accent, for focus rings */
  --input: 37 14% 87%;              /* Same as border */
  --destructive: 0 63% 31%;         /* Keep existing */
  --destructive-foreground: 0 0% 98%;

  /* ─── SHAPE ─── */
  --radius: 0.125rem;               /* 2px — The new micro-radius base */
}
```

**DEPRECATED — Remove these tokens entirely:**
- `--primary` / `--primary-foreground` → Replaced by `--accent` / `--accent-foreground`
- `--card` / `--card-foreground` → Use `--surface` / `--foreground` directly
- `--popover` / `--popover-foreground` → Use `--surface` / `--foreground` directly
- `--muted` → Use `--surface-elevated`
- `--border-subtle` → Use `--divider`
- `--border-highlight` → Use `--border-hover`
- `--glass-bg` / `--glass-border` / `--shadow-color` / `--shadow-strength` → Delete (no glass, no shadows)

**DEPRECATED — Remove from `tailwind.config.ts` colors:**
- `whatsapp: "#25D366"` → Remove from Tailwind tokens. If needed for the WhatsApp button, use inline `bg-[#25D366]` as a one-off.
- `glass` → Delete entirely.

Update the Tailwind `colors` mapping in `tailwind.config.ts` to reflect the new variable names:

```ts
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
```

### 2.2 — TYPOGRAPHY

#### Font Installation

In `layout.tsx`, replace Outfit with **Cormorant Garamond**:

```tsx
import { Inter, Cormorant_Garamond, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
```

Apply to `<body>`:
```tsx
className={`${inter.variable} ${cormorant.variable} ${geistMono.variable} font-sans ...`}
```

#### Font Family Config in `tailwind.config.ts`

```ts
fontFamily: {
  sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
  serif: ["var(--font-cormorant)", "Georgia", "serif"],
  mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
},
```

> **CRITICAL:** Remove the `display` font family key. Replace ALL occurrences of `font-display` in the codebase with `font-serif`.

#### Type Scale in `tailwind.config.ts`

Replace the existing `fontSize` extension:

```ts
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
```

#### Typography Rules (Enforced Everywhere)

| Element | Font | Class Pattern | Weight |
|---------|------|---------------|--------|
| Hero H1 | Cormorant | `font-serif text-display-hero` | `font-normal` (400) |
| Section H2 | Cormorant | `font-serif text-display-lg` | `font-normal` (400) |
| Card/Item H3 | Cormorant | `font-serif text-display-sm` | `font-normal` (400) |
| Body paragraphs | Inter | `text-body text-text-body` | `font-normal` (400) |
| Metadata labels | Inter | `text-label uppercase` | `font-medium` (500) |
| Nav links | Inter | `text-body-sm` | `font-medium` (500) |
| Buttons | Inter | `text-body-sm uppercase tracking-[0.1em]` | `font-medium` (500) |
| Captions | Inter | `text-caption text-subtle` | `font-normal` (400) |

> **NEVER use `font-bold` or `font-semibold` on serif headings.** Cormorant Garamond at weight 400 already provides visual weight through its serif structure. Bold serifs look cheap.

#### The "Label" Utility Pattern

This pattern is currently repeated ~8 times with slight variations. **Standardize it.** In `globals.css`, add:

```css
@layer components {
  .text-label-meta {
    @apply text-label uppercase tracking-[0.15em] text-muted-foreground font-medium;
  }
}
```

Use `text-label-meta` everywhere metadata labels appear (Client, Timeline, Role, Location, category headers in core-skills, etc.).

### 2.3 — SHAPES & DEPTH

#### Border Radius in `tailwind.config.ts`

Replace the entire `borderRadius` extension:

```ts
borderRadius: {
  none: "0px",
  micro: "2px",       // Images in containers, cards, inputs
  sm: "3px",          // Slightly larger containers
  full: "9999px",     // Pills, avatars, status dots ONLY
  button: "0px",      // Buttons are sharp — editorial standard
  input: "2px",       // Form inputs
  card: "2px",        // Card containers
},
```

#### Shadow Rules

**ZERO shadows anywhere.** Remove from every component:
- `shadow-sm` (project-card, case-study-layout)
- `shadow-md shadow-black/[var(--shadow-strength)]` (CTA buttons)
- `shadow-2xl` (mobile menu)
- `shadow-xl` (dropdown)

Depth is created ONLY through:
1. **Background color differentiation** (page → surface → elevated)
2. **Subtle borders** at low opacity
3. **Negative space**

#### Border Rules

```
Section dividers:    border-divider          (1px, ~7% visible)
Card borders:        border-border           (1px, ~13% visible)
Hover borders:       border-border-hover     (1px, ~23% visible)
Input borders:       border-border           (default), border-accent (focus)
Image containers:    border-divider          (barely visible)
```

---

## 3. TECHNICAL DEBT & REFACTORING DIRECTIVES

### 3.1 — Dual Animation System (CRITICAL)

**The problem:** The codebase has TWO animation systems producing identical `fade-up` effects:

1. **Framer Motion** — Used in `hero.tsx`, `header.tsx`, `contact.tsx` via `motion.ts` variants.
2. **CSS Animations + IntersectionObserver** — Used in `scroll-reveal.tsx`, consumed by `about.tsx`, `services.tsx`, `testimonials.tsx`, `selected-work.tsx`, `core-skills.tsx` via `globals.css` keyframes.

**The mandate:** Unify on **Framer Motion only**.

- **DELETE** `src/components/ui/scroll-reveal.tsx`
- **DELETE** all CSS animation utilities from `globals.css`: `@keyframes fade-up`, `.animate-fade-up`, `.animate-delay-*`, `.animate-on-scroll`, `.reveal-on-scroll` (lines 126-201)
- **REPLACE** all `<ScrollReveal>` wrapper components with Framer Motion `<motion.div>` using the new unified variants from `motion.ts`
- The new `motion.ts` file (provided in Phase 1 spec below) contains `REVEAL`, `STAGGER`, and `IMAGE_HOVER` tokens

### 3.2 — Inconsistent Container System

**The problem:** `tailwind.config.ts` defines a container with `padding: "2rem"` and `max-width: 1400px`, but every component overrides this with `px-6 max-w-6xl` or `px-6 max-w-7xl`. The Tailwind container config is dead code.

**The mandate:**
- Remove the `container` block from `tailwind.config.ts` entirely (or leave it but acknowledge it's overridden)
- Standardize all section containers to: `max-w-7xl mx-auto px-6 md:px-8 lg:px-12`
- For text-heavy content (About narrative, Contact form): `max-w-3xl` or `max-w-2xl`

### 3.3 — Section Spacing

**The problem:** Current spacing is `py-section` (128px) / `py-section-lg` (160px). This is adequate but not dramatic enough for an editorial architectural portfolio.

**The mandate:** Update the spacing tokens in `tailwind.config.ts`:

```ts
spacing: {
  "18": "4.5rem",
  "22": "5.5rem",
  "26": "6.5rem",
  "30": "7.5rem",
  section: "10rem",       // 160px (was 128px)
  "section-lg": "15rem",  // 240px (was 160px)
},
```

Standard section pattern becomes: `py-section md:py-section-lg` (160px mobile → 240px desktop).

### 3.4 — Hardcoded Colors to Remove

| Location | Current | Action |
|----------|---------|--------|
| `header.tsx` L79 | `hover:bg-emerald-400` | Replace with `hover:bg-accent-hover` |
| `header.tsx` L132 | `hover:bg-emerald-400` | Replace with `hover:bg-accent-hover` |
| `hero.tsx` L91 | `bg-whatsapp hover:bg-whatsapp/90` | Use `bg-[#25D366] hover:bg-[#25D366]/90` or restyle |
| `contact.tsx` L340 | `bg-red-900/20 border-red-900/50 text-red-400` | Keep — error styling is acceptable as hardcoded |
| Various | `text-red-400`, `text-red-500` | Keep for form errors |

### 3.5 — Copy/Content That Must Change

These are **SaaS-era remnants** that must be updated to match the architectural identity:

| Location | Current Copy | Corrected Copy |
|----------|-------------|----------------|
| `testimonials.tsx` L14 | "Trusted by businesses to deliver ROI-driven software." | "Trusted by clients across residential and commercial spaces." |
| `globals.css` L50-51 | `/* Optimize font rendering for the 'Terminal' aesthetic */` | Remove comment or update to `/* Optimize font rendering */` |
| `globals.css` L66 | `/* Custom WebKit Scrollbar - Dark Mode FinTech */` | Update to `/* Custom WebKit Scrollbar */` |
| `skills.ts` | Contains "Frontend Ecosystem", "Node.js", "PostgreSQL" etc. | **DO NOT MODIFY** the data file. The `core-skills.tsx` component already uses its own architectural data (`TECH_STACK` array) instead of this file. The `skills.ts` file is legacy dead code. |

---

## 4. DATA PROTECTION BOUNDARIES (CRITICAL)

### 🔒 LOCKED FILES — DO NOT MODIFY UNDER ANY CIRCUMSTANCES

The following files contain the application's data layer. They are **stable, tested, and perfectly functional.** The UI must be built AROUND these data structures. Do NOT:
- Add fields to interfaces
- Remove fields from interfaces
- Change array structures
- Modify mock data content
- Rename exports

```
LOCKED:
├── src/lib/types/project.ts        ← ArchitecturalProject interface
├── src/lib/types.ts                ← Service, Project, IconName types
├── src/lib/data/projects.ts        ← PROJECTS array (9 projects)
├── src/lib/constants/services.ts   ← services array (4 services)
├── src/lib/constants/testimonials.ts ← TESTIMONIALS array (3 items)
├── src/lib/constants/skills.ts     ← SKILLS_DATA (legacy, not actively used)
├── src/lib/utils.ts                ← cn() utility function
├── src/app/projects/[slug]/page.tsx ← Dynamic route with generateStaticParams
└── src/components/providers/theme-provider.tsx ← Light theme lock
```

### Data Shape Reference

The `ArchitecturalProject` interface that every project component consumes:

```ts
interface ArchitecturalProject {
  id: string;
  slug: string;
  title: string;
  tag: string;           // "Commercial", "Residential", "Institutional"
  subtitle: string;      // e.g. "Commercial Project, Upperhill"
  heroImage: StaticImageData | string;
  client: string;
  location: string;
  type: string;          // e.g. "Commercial project"
  designStyle: string;   // e.g. "Modern coastal"
  siteArea?: string;     // Optional, e.g. "465m²"
  timeline: string;
  gallery?: (StaticImageData | string)[];
  floorPlans?: (StaticImageData | string)[];
  moodboard?: (StaticImageData | string)[];
}
```

All 9 projects have `heroImage` (string URL) and `gallery` (array of 3 string URLs). `floorPlans` and `moodboard` are unused (undefined). `siteArea` is only defined on `onq-workspaces`.

Your UI components MUST consume this exact shape. If a field is optional and undefined, handle it gracefully with conditional rendering — never crash or show "undefined."

---

## 5. PHASED IMPLEMENTATION ROADMAP

---

### PHASE 1: Core Systems

**Goal:** Replace the design system foundation. After this phase, the site will look different (colors, fonts, spacing) but all components will still function.

**Files to modify:**
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/lib/motion.ts`
- `src/components/ui/section-heading.tsx`

**Files to delete:**
- `src/components/ui/scroll-reveal.tsx` (AFTER Phase 2 replaces all usages)

> **Note:** Do NOT delete `scroll-reveal.tsx` in Phase 1 — other components still import it. Just prepare the new `motion.ts`. The actual `<ScrollReveal>` replacement happens in Phase 2 when you touch each component.

#### Step 1A: Update `tailwind.config.ts`

Apply the complete color palette, typography scale, font families, border radius, and spacing tokens as specified in Section 2 above. Remove the `display` font family. Remove the `glass` color. Remove the `container` config block (or leave it, but it's dead code). Keep the `content` paths unchanged.

#### Step 1B: Update `globals.css`

1. Replace `:root` variables with the new palette from Section 2.1.
2. Remove the `color-scheme: light;` line (unnecessary with theme-provider lock).
3. Update the `body` directive:
   ```css
   body {
     @apply bg-page text-text-body antialiased selection:bg-accent/30 selection:text-foreground relative;
     font-feature-settings: "rlig" 1, "calt" 1;
     transition: background-color 300ms ease, color 300ms ease;
   }
   ```
4. Update the heading directive:
   ```css
   h1, h2, h3, h4, h5, h6 {
     @apply font-serif text-foreground;
     /* Headings use Cormorant Garamond — never apply font-bold */
   }
   ```
5. Add the `.text-label-meta` component class (Section 2.2).
6. Keep the `.bg-noise` utility (it's a nice texture). Update its opacity to `opacity-[0.03]`.
7. Keep the `.spotlight` utility for now (will be refined in Phase 3).
8. **Remove** all CSS animation utilities: `@keyframes fade-up`, `.animate-fade-up`, all `.animate-delay-*` classes, `.animate-on-scroll`, `.animate-on-scroll.is-visible`, `.reveal-on-scroll`, `.reveal-on-scroll.revealed` (lines 126-201).
9. Keep `.text-balance`.
10. Update scrollbar styles to use new color tokens.

#### Step 1C: Update `layout.tsx`

1. Replace Outfit import with Cormorant_Garamond (exact code in Section 2.2).
2. Update the `<body>` className to use new variable names.
3. Update metadata `description` to remove any SaaS references (currently fine, says "Interior Architect").

#### Step 1D: Replace `motion.ts`

Replace the entire file with this unified system:

```ts
import { Variants, Transition } from "framer-motion";

/**
 * VALTUM MOTION SYSTEM
 * Unified animation tokens for editorial architectural portfolio.
 * All animations use Framer Motion — no CSS keyframes.
 */

// ─── EASING CURVES ───
export const EASE = {
  gentle: [0.25, 0.1, 0.25, 1.0] as const,
  smooth: [0.43, 0.13, 0.23, 0.96] as const,
  snappy: [0.6, 0.05, 0.01, 0.9] as const,
  out: [0, 0, 0.2, 1] as const,
} as const;

// ─── DURATIONS ───
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

// ─── REVEAL VARIANTS ───
export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE.gentle },
  },
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE.gentle },
  },
};

export const SLIDE_UP: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE.smooth },
  },
};

export const CLIP_REVEAL: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.0, ease: EASE.smooth },
  },
};

// ─── STAGGER CONTAINERS ───
export const STAGGER_FAST: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const STAGGER_NORMAL: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export const STAGGER_SLOW: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ─── IMAGE HOVER ───
export const IMAGE_HOVER = {
  scale: 1.03,
  transition: { duration: 1.0, ease: EASE.gentle } as Transition,
} as const;

// ─── VIEWPORT STRATEGY ───
export const VIEWPORT = {
  once: true,
  margin: "-80px",
} as const;

// ─── BACKWARD COMPAT (remove these after Phase 2 migration) ───
export const FADE_UP_VARIANTS = FADE_UP;
export const STAGGER_CONTAINER_VARIANTS = STAGGER_NORMAL;
export const VIEWPORT_CONFIG = VIEWPORT;
```

#### Step 1E: Update `section-heading.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      <h2 className="font-serif text-display-lg text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-body-lg text-muted-foreground max-w-xl",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

#### Phase 1 Acceptance Criteria
- [ ] `npm run dev` compiles with zero errors
- [ ] Page background is warm cream (`#F7F5F0`), not gray-white
- [ ] All headings render in Cormorant Garamond serif
- [ ] Body text renders in Inter
- [ ] No `font-display` classes remain in the codebase (replaced by `font-serif`)
- [ ] The brass accent color (`#B8964E`) appears where teal previously did
- [ ] `motion.ts` exports all new tokens + backward-compat aliases

**⏸️ STOP. Tell the user to run `npm run dev` and verify. Wait for approval.**

---

### PHASE 2: Global Shell & Component Cleanup

**Goal:** Update Header, Footer, and all secondary sections (About, Services, Testimonials, Core Skills, Contact). Remove `<ScrollReveal>` wrappers. Apply micro-radius. Remove all shadows.

**Files to modify:**
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/components/sections/about.tsx`
- `src/components/sections/services.tsx`
- `src/components/sections/testimonials.tsx`
- `src/components/sections/core-skills.tsx`
- `src/components/sections/contact.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`

**Files to delete (after all imports are removed):**
- `src/components/ui/scroll-reveal.tsx`

#### Key Operations

1. **In every file that imports `ScrollReveal`:** Replace `<ScrollReveal>` with `<motion.div>` using `FADE_UP` variants, `initial="hidden"`, `whileInView="visible"`, and `viewport={VIEWPORT}` from the new `motion.ts`. Use `STAGGER_NORMAL` on parent containers. Add `"use client"` directive where needed for Framer Motion.

2. **Remove all shadows:** Find-and-remove `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` and any `shadow-black/[...]` from every file.

3. **Replace all `rounded-card` with `rounded-card`** (this is now 2px from the new config). Replace all `rounded-2xl` with `rounded-micro` or `rounded-card`. Replace all `rounded-[2rem]` with `rounded-micro`. Replace all `rounded-button` (now 0px). Replace all `rounded-inner` with `rounded-micro`.

4. **Replace all `font-display` with `font-serif`** across the entire codebase.

5. **Replace all `font-bold` / `font-semibold` on headings** with `font-normal` (the serif provides weight).

6. **Header redesign:**
   - Brand: `VALTUM` in `font-serif text-display-sm tracking-tight` (not uppercase block letters)
   - Nav links: `text-body-sm font-medium text-muted-foreground hover:text-foreground` + animated underline on hover (CSS `after` pseudo-element: `h-[1px] bg-accent scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300`)
   - CTA button: Text-only with border → `border border-border text-body-sm font-medium uppercase tracking-[0.1em] px-6 py-2.5 hover:border-accent hover:text-accent transition-colors`
   - Remove `shadow-md` from CTA
   - Remove `hover:bg-emerald-400` — use `hover:bg-accent` or `hover:text-accent`

7. **Footer redesign:**
   - Keep bento grid structure but apply new tokens
   - Remove all `rounded-card` on inner elements (use `rounded-micro`)
   - Update watermark opacity from `opacity-[0.02]` to `opacity-[0.04]` with `font-serif`
   - Remove `font-mono` from status pill

8. **Testimonials:** Update subtitle to architectural language (see Section 3.5). Use Cormorant for quote text (`font-serif italic`).

9. **Contact form:** Keep form logic intact. Restyle inputs with new tokens. Submit button: `bg-foreground text-page rounded-none` (sharp editorial button).

10. **After all `<ScrollReveal>` usages are replaced:** Delete `src/components/ui/scroll-reveal.tsx`.

#### Phase 2 Acceptance Criteria
- [ ] Zero imports of `ScrollReveal` remain
- [ ] `scroll-reveal.tsx` is deleted
- [ ] Zero `shadow-*` classes remain in any component
- [ ] Header uses serif brand name, text-link CTA, animated underline nav
- [ ] Footer uses new color tokens, micro-radius
- [ ] All `font-display` replaced with `font-serif`
- [ ] No `font-bold` on any serif heading
- [ ] All components compile and render

**⏸️ STOP. Tell the user to run `npm run dev` and verify. Wait for approval.**

---

### PHASE 3: Hero Redesign

**Goal:** Transform the hero from a 50/50 text/image split into a full-bleed cinematic opening.

**File to modify:**
- `src/components/sections/hero.tsx`

#### Design Specification

```
┌──────────────────────────────────────────────────────────────────┐
│  100svh (full viewport)                                          │
│  Background: Full-bleed hero image, object-cover                 │
│  Overlay: Linear gradient from transparent (top 60%) to          │
│           rgba(28,28,28,0.7) (bottom 40%)                        │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  [Label]  text-label-meta: "Interior Architecture"        │  │
│  │  [H1]     font-serif text-display-hero:                   │  │
│  │           "Thoughtful spaces."                             │  │
│  │           "Timeless living."                               │  │
│  │  [CTA]    Underlined text link: "View Selected Work →"    │  │
│  │           (text-accent, animated arrow on hover)           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Bottom center: Scroll indicator (small "↓" or "Scroll")        │
└──────────────────────────────────────────────────────────────────┘
```

- Text positioned `absolute bottom-0 left-0` within the max-width container, with `pb-20 md:pb-28`
- Text color: `text-white` (on the dark gradient overlay)
- Remove the profile image / right column entirely
- Remove the WhatsApp CTA from the hero (it can live in Contact and Footer)
- Keep the Framer Motion scroll-linked opacity fade (`useScroll` / `useTransform`)
- The hero image: use the first project's hero image or a dedicated architectural Unsplash image (use the existing `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80` URL that's already in the file)
- Apply `useTransform` for subtle parallax on the image (scrollY maps to a slight `y` translation at 0.3x speed)
- The spotlight cursor effect can remain but should be subtle

#### Phase 3 Acceptance Criteria
- [ ] Hero is full-viewport height (`min-h-svh`)
- [ ] Full-bleed image fills the background
- [ ] Dark gradient overlay makes text readable
- [ ] Title is in Cormorant Garamond serif, large, `font-normal`
- [ ] No profile photo or 50/50 split
- [ ] No filled pill buttons — just a text CTA with arrow
- [ ] Scroll-linked parallax works smoothly

**⏸️ STOP. Tell the user to run `npm run dev` and verify. Wait for approval.**

---

### PHASE 4: Selected Work Redesign

**Goal:** Replace the 3-column card grid with editorial asymmetric project rows.

**Files to modify:**
- `src/components/sections/selected-work.tsx`
- `src/components/sections/project-card.tsx` (may be renamed/restructured to `project-row.tsx`)

#### Design Specification

Instead of uniform cards, each project is a **full-width row** with alternating image/text alignment:

```
PROJECT ROW (odd — image left):
┌──────────────────────────────────────────────────────────────────┐
│  [────── IMAGE (60% width) ──────]  [── TEXT (40%) ──────────]  │
│                                      [label] Commercial          │
│                                      [H3] GA Insurance           │
│                                      [meta] Upperhill, Nairobi   │
│                                      [link] View Project →       │
└──────────────────────────────────────────────────────────────────┘

PROJECT ROW (even — image right):
┌──────────────────────────────────────────────────────────────────┐
│  [── TEXT (40%) ──────────]  [────── IMAGE (60% width) ──────]  │
│  [label] Residential                                             │
│  [H3] Zaria House                                                │
│  [meta] Tatu City, Nairobi                                       │
│  [link] View Project →                                           │
└──────────────────────────────────────────────────────────────────┘
```

**Implementation details:**
- Use `grid grid-cols-1 lg:grid-cols-12` for each row
- Image column: `lg:col-span-7`, Text column: `lg:col-span-5`
- Alternate with `lg:order-last` on even indices
- Image: `aspect-[4/3]`, `rounded-micro`, `overflow-hidden`, hover zoom `scale(1.03)` at `duration-1000`
- Text side: vertically centered (`flex flex-col justify-center`)
- No card background, no card border
- Separate rows with a `1px` divider: `border-b border-divider`
- Generous vertical padding between rows: `py-16 lg:py-20`
- The project `tag` uses `text-label-meta`
- The project `title` uses `font-serif text-display-md`
- "View Project →" is a text link: `text-body-sm font-medium text-muted-foreground hover:text-accent group-hover:text-accent transition-colors`. Arrow slides right 4px on group hover.
- Each row links to `/projects/${project.slug}`
- The entire row is wrapped in a `<Link>` making it fully clickable
- On mobile (below `lg`): stack vertically with image on top
- Consider showing only 4-6 projects on the homepage and adding a "View All Work" link if there are more

#### Project Data Consumed

Each row consumes from `ArchitecturalProject`:
- `heroImage` → The row image
- `title` → Serif heading
- `tag` → Label ("Commercial", "Residential", "Institutional")
- `location` → Metadata line
- `subtitle` → Optional secondary text
- `slug` → Link target

#### Phase 4 Acceptance Criteria
- [ ] No card grid — projects display as full-width editorial rows
- [ ] Image/text sides alternate on even/odd indices
- [ ] Rows separated by subtle dividers
- [ ] All project data renders correctly from the LOCKED `PROJECTS` array
- [ ] Links navigate to `/projects/[slug]`
- [ ] Image hover zoom is smooth (1.03x, 1000ms)
- [ ] Mobile layout stacks cleanly

**⏸️ STOP. Tell the user to run `npm run dev` and verify. Wait for approval.**

---

### PHASE 5: Case Study & Final Polish

**Goal:** Redesign the case study template. Add cinematic scroll interactions. Final polish pass.

**Files to modify:**
- `src/components/work/case-study-layout.tsx`
- `src/app/page.tsx` (minor — section ordering if needed)

#### Case Study Design

```
┌──────────────────────────────────────────────────────────────────┐
│  HERO: Full-bleed hero image (70vh min)                          │
│  Title overlaid bottom-left on dark gradient                     │
│  Subtitle + metadata (Client, Location, Year) below image        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  PROJECT DNA: 2-column (or 3-col) metadata grid                  │
│  [Client]    [Type]    [Timeline]                                │
│  [Location]  [Style]   [Site Area (if present)]                  │
│  All using text-label-meta for labels, text-body for values      │
│  Separated by subtle dividers, generous spacing                  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  THE BRIEF: Full-width text block (max-w-3xl centered)           │
│  Serif heading, body text                                        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  GALLERY: Alternating image sizes                                │
│  Row 1: Full-width image (16:9)                                  │
│  Row 2: Two side-by-side images (4:3 each, gap-2)               │
│  Row 3: Full-width cinematic image (21:9)                        │
│  All images: rounded-micro, scroll-triggered CLIP_REVEAL         │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  MATERIALS & DELIVERABLES: Side by side, clean list              │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  NEXT PROJECT: Link to next project in PROJECTS array            │
│  Shows next project's heroImage as background with title overlay  │
│  "Next Project →" label                                          │
└──────────────────────────────────────────────────────────────────┘
```

**Key changes from current:**
- Remove the sticky sidebar layout — switch to a **full-width scroll narrative**
- Remove the fixed case-study header (the main site header is sufficient)
- Remove `rounded-2xl` from all images → `rounded-micro`
- Remove `shadow-sm` from all images
- Add `CLIP_REVEAL` animation to gallery images on scroll
- Add a "Next Project" section at the bottom that links to the next project in the `PROJECTS` array (wrap around to first if last)
- Remove `bg-surface-elevated` cards for metadata → use clean grid with dividers

#### Back Navigation

Replace the custom fixed header in `case-study-layout.tsx` with a simple back link at the top of the content:

```tsx
<Link
  href="/#projects"
  className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-accent transition-colors mb-12"
>
  <ArrowLeft className="w-4 h-4" />
  Back to Work
</Link>
```

The main site `<Header>` from `layout.tsx` will provide navigation.

#### Final Polish Checklist

- [ ] Scroll through entire site — every section has generous whitespace
- [ ] No `font-bold` on any serif element
- [ ] No `shadow-*` anywhere
- [ ] All borders are subtle and warm-toned
- [ ] Brass accent appears consistently (links, hover states, focus rings)
- [ ] All heading sizes follow the `display-*` scale
- [ ] All metadata labels use `text-label-meta`
- [ ] All images use `rounded-micro` (2px)
- [ ] Gallery images animate in with `CLIP_REVEAL` or `FADE_IN`
- [ ] "Next Project" navigation works at bottom of case study
- [ ] Mobile responsive — all grids stack cleanly
- [ ] `npm run build` succeeds with zero errors

**⏸️ STOP. Tell the user to run `npm run dev` and `npm run build`. Final review.**

---

## APPENDIX: Quick Reference Card

```
PALETTE:
  bg ........ #F7F5F0 (warm cream)
  surface ... #FFFFFF (white)
  elevated .. #EFECE6 (warm stone)
  text ...... #1C1C1C (charcoal)
  body ...... #2E2E2E (dark gray)
  muted ..... #6B6B6B (medium gray)
  accent .... #B8964E (warm brass)
  deep ...... #1A3232 (deep forest)
  border .... #E2DED6 (warm neutral)

FONTS:
  Headings .. Cormorant Garamond, weight 400 (NEVER bold)
  Body ...... Inter, weight 400-500
  Labels .... Inter, 11px, uppercase, tracking 0.15em, weight 500

RADIUS:
  Default ... 2px (micro)
  Buttons ... 0px (sharp)
  Pills ..... 9999px (full)

SHADOWS:
  None. Forbidden. Zero.

SPACING:
  Sections .. 160px (mobile) → 240px (desktop)
  Heading→Content .. 80px
  Grid gaps (images) .. 4-8px
  Grid gaps (cards) .. 32-48px

ANIMATIONS:
  Easing .... [0.25, 0.1, 0.25, 1.0] (gentle)
  Duration .. 0.7s (reveals), 1.0s (images), 1.2s (hero)
  Image zoom. 1.03x at 1000ms
  All Framer Motion. No CSS animations.
```

---

**END OF HANDOVER DOCUMENT.**
*The design research phase is complete. Godspeed to the implementation AI.*
