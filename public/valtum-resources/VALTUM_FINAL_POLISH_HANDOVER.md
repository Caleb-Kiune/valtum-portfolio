# VALTUM FINAL POLISH — LLM-TO-LLM IMPLEMENTATION HANDOVER

> **From:** Senior Design Architect (Claude)  
> **To:** Gemini 3.1 Pro (Executing Agent)  
> **Project:** Valtum Interiors Portfolio — `~/projects/valtum/valtum-portfolio`  
> **Stack:** Next.js · Tailwind CSS · Framer Motion · TypeScript  
> **Date:** 2026-09-13  

---

## Objectives

You are executing 6 locked-in design refinements. Each refinement has been analyzed, proposed, and approved by the human stakeholder. Your job is **precise implementation only** — do not deviate from the specifications below.

**Design System Constants (do not violate):**
- Page BG: `hsl(40, 22%, 95%)` → `#F7F5F0` (Warm Cream)
- Foreground: `hsl(0, 0%, 11%)` → `#1C1C1C` (Charcoal)
- Accent: `hsl(38, 47%, 51%)` → `#B8964E` (Warm Brass)
- Headings: Cormorant Garamond (`font-serif`)
- Body: Inter (`font-sans`)
- Shadows: **None** (zero box-shadows anywhere)
- Radius: `2px` (`rounded-micro`)

---

## Files to Modify

| # | File | Refinement |
|---|------|------------|
| 1 | `src/app/icon.svg` | Favicon — replace entire file |
| 2 | `src/app/manifest.ts` | Manifest — update name, colors, description |
| 3 | `src/components/layout/header.tsx` | Home link — path-aware conditional |
| 4 | `src/components/sections/about.tsx` | Scroll offset — add `scroll-mt-28` |
| 5 | `src/components/sections/selected-work.tsx` | Scroll offset + project reveal accordion |
| 6 | `src/components/sections/core-skills.tsx` | Scroll offset only (no grid changes) |
| 7 | `src/components/sections/services.tsx` | Scroll offset + grid → centered 2×2 |
| 8 | `src/components/sections/testimonials.tsx` | Scroll offset — add `scroll-mt-28` |
| 9 | `src/components/sections/contact.tsx` | Scroll offset — add `scroll-mt-28` |
| 10 | `src/components/layout/footer.tsx` | Status pill → brass rule + new text |

---

## Phase 1 — Favicon & Manifest

### 1A. Replace `src/app/icon.svg`

**Overwrite the entire file** with this SVG. This is a Brass "V" (Cormorant Garamond-inspired geometry) on a Charcoal square with 2px radius:

```svg
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="8" fill="#1C1C1C"/>
  <path d="M160 120 L256 392 L352 120 L310 120 L256 310 L202 120 Z" fill="#B8964E"/>
</svg>
```

**Design notes:**
- `rx="8"` at 512px canvas = equivalent to ~0.25px at 16×16 favicon size (micro-radius feel)
- The "V" is a clean, symmetrical chevron with moderate stroke weight
- Fill `#B8964E` = Brass accent, `#1C1C1C` = Charcoal background
- No serif details needed at favicon scale — clean geometry reads better

### 1B. Update `src/app/manifest.ts`

Replace the **entire contents** of manifest.ts:

```typescript
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Valtum Interiors & Construction",
        short_name: "Valtum",
        description: "Interior Architecture & Project Management. Specializing in space planning, 3D modelling, and site coordination.",
        start_url: "/",
        display: "standalone",
        background_color: "#F7F5F0",
        theme_color: "#1C1C1C",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
```

**Changes from current:**
- `name`: "Kiune Technologies" → "Valtum Interiors & Construction"
- `short_name`: "Kiune Tech" → "Valtum"
- `description`: Updated to match site meta
- `background_color`: `#0F172A` → `#F7F5F0` (Warm Cream)
- `theme_color`: `#0F172A` → `#1C1C1C` (Charcoal)

---

## Phase 2 — Header "Valtum" Home Link (Path-Aware)

### File: `src/components/layout/header.tsx`

**Step 1:** Add `usePathname` import. The current import block is:

```typescript
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
```

Add `usePathname` and `useRouter`:

```typescript
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
```

**Step 2:** Inside the `Header()` function body, after `const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);` — add:

```typescript
const pathname = usePathname();
const router = useRouter();
```

**Step 3:** Replace the brand link's `onClick` handler. The current code (lines 84-96) is:

```tsx
<Link
    href="/"
    className={`font-serif text-display-sm tracking-tight hover:text-accent transition-colors ${
        isMobileMenuOpen ? "text-foreground" : ""
    }`}
    onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
    }}
>
    Valtum
</Link>
```

Replace with:

```tsx
<Link
    href="/"
    className={`font-serif text-display-sm tracking-tight hover:text-accent transition-colors ${
        isMobileMenuOpen ? "text-foreground" : ""
    }`}
    onClick={(e) => {
        setIsMobileMenuOpen(false);
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            // Clear any active hash from URL
            if (window.location.hash) {
                history.replaceState(null, "", "/");
            }
        }
        // On subpages: let the default Link navigation to "/" proceed
    }}
>
    Valtum
</Link>
```

**Logic:**
- On homepage (`/`): Prevent default, smooth scroll to top, clean up URL hash
- On any other page (`/projects/…`): Default `<Link href="/">` behavior fires, navigating home

---

## Phase 3 — Section Anchor Scroll Offsets

Add `scroll-mt-28` to every `<section>` element that has an `id` attribute. This provides `7rem` (112px) of scroll margin to clear the fixed header plus breathing room.

### 3A. `src/components/sections/selected-work.tsx` — Line 12

**Current:**
```tsx
<section id="projects" className="relative py-section md:py-section-lg bg-page border-t border-border">
```

**Replace with:**
```tsx
<section id="projects" className="relative py-section md:py-section-lg bg-page border-t border-border scroll-mt-28">
```

### 3B. `src/components/sections/about.tsx` — Line 9

**Current:**
```tsx
<section id="about" className="relative py-section md:py-section-lg bg-page border-t border-border">
```

**Replace with:**
```tsx
<section id="about" className="relative py-section md:py-section-lg bg-page border-t border-border scroll-mt-28">
```

### 3C. `src/components/sections/services.tsx` — Line 28

**Current:**
```tsx
<section className="relative py-section border-y border-border bg-page" id="services">
```

**Replace with:**
```tsx
<section className="relative py-section border-y border-border bg-page scroll-mt-28" id="services">
```

### 3D. `src/components/sections/testimonials.tsx` — Line 11

**Current:**
```tsx
<section className="relative py-section md:py-section-lg border-y border-border bg-page" id="testimonials">
```

**Replace with:**
```tsx
<section className="relative py-section md:py-section-lg border-y border-border bg-page scroll-mt-28" id="testimonials">
```

### 3E. `src/components/sections/contact.tsx` — Line 119-121

**Current:**
```tsx
<motion.section
    id="contact"
    initial="hidden"
```

Add `scroll-mt-28` to the className. Current className (line 125):
```tsx
className="py-section md:py-section-lg border-t border-border bg-page"
```

**Replace with:**
```tsx
className="py-section md:py-section-lg border-t border-border bg-page scroll-mt-28"
```

---

## Phase 4 — Services Grid → Centered 2×2

### File: `src/components/sections/services.tsx`

The only change is the grid container className. The current grid class (line 49) is:

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
```

**Replace with:**

```tsx
className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
```

**What this does:**
- Removes `lg:grid-cols-3` (no more 3-column layout that creates a dangling 4th card)
- Forces a 2-column grid at `md+` — 4 items = 2 rows × 2 columns (perfectly balanced)
- `max-w-4xl mx-auto` centers the grid within the section, giving cards more breathing room
- Mobile remains single column (`grid-cols-1`)

**Do NOT touch `core-skills.tsx` grid classes.** The 3-column layout with 2/2/3 items is intentionally kept.

---

## Phase 5 — Selected Work: Curated 4 + Animated Archive Reveal

This is the most complex refinement. You will modify `src/components/sections/selected-work.tsx` to:

1. Show only the first 4 projects by default
2. Add a typographic "View Full Archive" toggle after the 4th project
3. Wrap projects 5-9 in a Framer Motion `AnimatePresence` that expands/collapses
4. When expanded, the toggle text changes to "Collapse Archive"

### Replace the entire contents of `src/components/sections/selected-work.tsx`:

```tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { motion, AnimatePresence } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

import { PROJECTS } from "@/lib/data/projects";

const FEATURED_COUNT = 4;

// Define the featured project IDs in display order
const FEATURED_IDS = ["ga-insurance", "sultan-palace", "onq-workspaces", "zaria-house"];

// Separate featured from archive
const featuredProjects = FEATURED_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PROJECTS;

const archiveProjects = PROJECTS.filter(
    (p) => !FEATURED_IDS.includes(p.id)
);

export function SelectedWork() {
    const [showArchive, setShowArchive] = useState(false);

    return (
        <section id="projects" className="relative py-section md:py-section-lg bg-page border-t border-border scroll-mt-28">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={FADE_UP}
                >
                    <SectionHeading
                        title="Selected Work"
                        subtitle="Real-world solutions delivering tangible business results"
                        className="mb-16 md:mb-20"
                    />
                </motion.div>

                {/* Featured Projects (always visible) */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={STAGGER_NORMAL}
                    className="flex flex-col w-full"
                >
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={FADE_UP}
                            className="w-full py-16 lg:py-24 border-b border-divider last:border-b-0"
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Archive Toggle CTA */}
                <div className="flex flex-col items-center py-20">
                    <div className="w-10 h-px bg-accent mb-8" />
                    <button
                        onClick={() => setShowArchive(!showArchive)}
                        className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none outline-none"
                    >
                        <span className="font-serif text-display-sm text-foreground/80 group-hover:text-foreground transition-colors">
                            {showArchive ? "Collapse Archive" : "Complete Portfolio"}
                        </span>
                        <span className="text-label-meta group-hover:text-accent transition-colors flex items-center gap-2">
                            {showArchive ? (
                                <>Showing all {PROJECTS.length} projects</>
                            ) : (
                                <>View all {PROJECTS.length} projects</>
                            )}
                            <motion.span
                                animate={{ rotate: showArchive ? 180 : 0 }}
                                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                                className="inline-block"
                            >
                                ↓
                            </motion.span>
                        </span>
                    </button>
                </div>

                {/* Archive Projects (animated reveal) */}
                <AnimatePresence initial={false}>
                    {showArchive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
                                opacity: { duration: 0.4, ease: "easeInOut" },
                            }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col w-full border-t border-divider">
                                {archiveProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.7,
                                            delay: index * 0.1,
                                            ease: [0.25, 0.1, 0.25, 1.0],
                                        }}
                                        className="w-full py-16 lg:py-24 border-b border-divider last:border-b-0"
                                    >
                                        <ProjectCard
                                            project={project}
                                            index={index + FEATURED_COUNT}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
```

**Key implementation details:**

1. **Project ordering:** The `FEATURED_IDS` array controls display order. The 4 featured projects are: GA Insurance, Sultan Palace, ONQ Workspaces, Zaria House.
2. **Archive filtering:** `archiveProjects` is everything NOT in `FEATURED_IDS` — preserving the original order from `projects.ts` for the remaining 5.
3. **Animation:** The archive reveal uses `height: 0 → "auto"` with a staggered `delay: index * 0.1` per card for a cascading entrance. The `overflow-hidden` on the outer container prevents layout jumps.
4. **Toggle CTA styling:** Uses the brass rule (`w-10 h-px bg-accent`) as a visual anchor, Cormorant Garamond serif heading ("Complete Portfolio"), and the `text-label-meta` utility for the subtext. The arrow rotates 180° when expanded.
5. **Index continuity:** Archive project cards receive `index={index + FEATURED_COUNT}` so the alternating left/right layout pattern continues correctly from project 5 onward.
6. **`scroll-mt-28`** is included on the section element (combining Phase 3 + Phase 5).

---

## Phase 6 — Footer: Replace Status Pill

### File: `src/components/layout/footer.tsx`

Locate the Status Indicator block inside CARD 1: IDENTITY (lines 31-35):

**Current code:**
```tsx
{/* Status Indicator */}
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-border-hover text-accent text-xs font-medium tracking-wide w-fit">
    <span className="inline-flex rounded-full h-2 w-2 bg-accent"></span>
    <span className="text-foreground/70">Active &amp; Building</span>
</div>
```

**Replace with:**
```tsx
{/* Studio Status */}
<div className="flex flex-col gap-3">
    <div className="w-10 h-px bg-accent" />
    <span className="text-sm tracking-wide text-foreground/70">
        Now Booking Select Projects
    </span>
</div>
```

**What changed:**
- Removed: pulsing dot, pill border, `rounded-full`, SaaS status indicator aesthetic
- Added: Brass horizontal rule (`w-10 h-px bg-accent`) — a typographic ornament
- Text: "Active & Building" → "Now Booking Select Projects"
- Typography: `text-sm tracking-wide` for restrained elegance (no uppercase, no `text-label-meta`)
- No border, no background, no pill shape — pure editorial typography

---

## Execution Checklist

Execute in this exact order:

```
[ ] Phase 1A — Overwrite src/app/icon.svg with Brass V monogram SVG
[ ] Phase 1B — Overwrite src/app/manifest.ts with updated Valtum branding
[ ] Phase 2  — Update src/components/layout/header.tsx (imports + path-aware onClick)
[ ] Phase 3  — Add scroll-mt-28 to sections in about.tsx, services.tsx, testimonials.tsx, contact.tsx
[ ] Phase 4  — Update services.tsx grid to 2-column centered layout
[ ] Phase 5  — Replace selected-work.tsx with curated 4 + animated archive reveal
[ ] Phase 6  — Replace footer.tsx status pill with brass rule + "Now Booking Select Projects"
```

After all changes, run `npm run dev` and verify:
1. **Favicon** shows Brass V on Charcoal in browser tab
2. **"Valtum" header link** smooth-scrolls on homepage, navigates home from `/projects/[slug]`
3. **Nav links** (#projects, #about, #services, #testimonials, #contact) all land with correct offset clearing the fixed header
4. **Services section** renders as a balanced 2×2 grid centered within the section
5. **Selected Work** shows 4 projects, then "Complete Portfolio" toggle reveals the remaining 5 with smooth animation
6. **Footer** shows brass rule + "Now Booking Select Projects" (no dot, no pill)

---

## Critical Constraints

- **Do NOT add any `box-shadow` properties** — the design system forbids shadows
- **Do NOT change `border-radius` values** beyond `rounded-micro` (2px) and `rounded-full` (pills/dots only)
- **Do NOT modify the project data** in `src/lib/data/projects.ts`
- **Do NOT change the `core-skills.tsx` grid** — asymmetry is intentional
- **Do NOT create a new `/projects` archive page** — all projects stay on the homepage behind the accordion
- **Preserve all existing comments and docstrings** in files you modify
