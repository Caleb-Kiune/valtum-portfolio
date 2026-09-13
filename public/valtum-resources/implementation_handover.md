# Implementation Handover: Hero Scrim + Header Scroll Morph

> **For:** Downstream LLM (Gemini 3.1 Pro)  
> **Project:** Valtum Interior Architecture Portfolio  
> **Framework:** Next.js (App Router) + Tailwind CSS + Framer Motion  
> **Objective:** Solve header navigation invisibility over the hero image by adding a top atmospheric scrim and replacing the binary header scroll toggle with smooth Framer Motion interpolation.

---

## Prerequisite Context

### Design System Tokens (from `globals.css`)

These are the HSL values you **must** use. Do not invent new colors.

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--background` | `40 22% 95%` | `#F7F5F0` | Page background (`bg-page`) |
| `--foreground` | `0 0% 11%` | `#1C1C1C` | Primary text |
| `--muted-foreground` | `0 0% 42%` | `#6B6B6B` | Secondary text |
| `--accent` | `38 47% 51%` | `#B8964E` | Brass accent |
| `--border` | `37 14% 87%` | `#E2DED6` | Border color |
| `--deep` | `180 30% 15%` | `#1A3232` | Dark sections |

### Framer Motion System (from `src/lib/motion.ts`)

The project uses a centralized motion system. The `EASE` curves are:
```ts
EASE.gentle = [0.25, 0.1, 0.25, 1.0]
EASE.smooth = [0.43, 0.13, 0.23, 0.96]
```

You may import `EASE` from `@/lib/motion` if needed for transition config, but the header changes primarily use `useTransform` which doesn't need explicit easing (it interpolates linearly by default, which is correct for scroll-linked values).

---

## CHANGE 1: Hero Top Scrim — `hero.tsx`

### File
[`src/components/sections/hero.tsx`](file:///home/kiune/projects/valtum/valtum-portfolio/src/components/sections/hero.tsx)

### Current Code (line 68–69)
There is one gradient overlay `<div>`:
```tsx
{/* Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
```

### What To Do

**Replace** the single gradient `<div>` (lines 68–69) with **two** gradient `<div>` elements: the existing bottom scrim (unchanged) and a new top scrim.

### Exact Replacement Code

```tsx
{/* ── Gradient Overlays: Dual-Vignette Atmospheric Scrim ── */}

{/* Bottom scrim — protects H1 and CTA (unchanged) */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

{/* Top scrim — protects fixed header/navigation */}
<div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent z-10 pointer-events-none" style={{ height: '30%' }} />
```

### Specification for the Top Scrim

| Property | Value | Rationale |
|---|---|---|
| Direction | `bg-gradient-to-b` | Top-to-bottom (darkest at top edge, fading down) |
| Start color | `from-black/45` | 45% black opacity — strong enough for WCAG 4.5:1 contrast with white text, soft enough to look photographic |
| Via color | `via-black/10` | Gentle mid-transition to prevent a hard falloff line |
| End color | `to-transparent` | Fully transparent — dissolves into the raw image |
| Height | `style={{ height: '30%' }}` | Constrains the scrim to the top 30% of the hero section. The scrim should NOT cover the full hero. Use an inline style because Tailwind's `h-` utilities are fixed pixel/rem values, not percentages of the parent. |
| Positioning | `absolute inset-0` | Anchored to the section's top-left corner |
| Z-index | `z-10` | Same layer as the bottom scrim — both sit above the image but below the content (`z-20`) and the header (`z-50`) |
| Interaction | `pointer-events-none` | Must not block clicks to the hero or image |

> [!IMPORTANT]
> The `inset-0` sets `top: 0; right: 0; bottom: 0; left: 0;` but the `style={{ height: '30%' }}` overrides the bottom, effectively making this element only 30% tall from the top. This is the correct and intentional behavior.

### Visual Result
```
0%   ██████████████████████  black/45 (strong)
5%   ████████████████████    ~black/35
10%  ██████████████████      ~black/25
15%  ███████████████         black/10 (via)
20%  ██████████              ~black/05
25%  █████                   ~black/02
30%  ·                       transparent
...
100% (bottom scrim takes over from ~55%)
```

---

## CHANGE 2: Header Scroll Morph — `header.tsx`

### File
[`src/components/layout/header.tsx`](file:///home/kiune/projects/valtum/valtum-portfolio/src/components/layout/header.tsx)

### Overview of Changes

1. **Remove** the `isScrolled` boolean state and `useEffect` scroll listener.
2. **Add** Framer Motion's `useScroll` and `useTransform` to interpolate all visual properties over a 0–100px scroll range.
3. **Change** the `<header>` element to `<motion.header>` with animated `style` props.
4. **Switch** nav text to **white** when at the top (over the hero scrim) and smoothly transition to the existing dark theme colors on scroll.
5. **Keep** the mobile menu logic and the `isMobileMenuOpen` state completely unchanged.

### Step-by-Step Instructions

#### Step 2.1: Update Imports

**Current imports (line 1–6):**
```tsx
"use client";

import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
```

**Replace with:**
```tsx
"use client";

import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
```

Changes: Added `useScroll`, `useTransform`, and `useMotionValueEvent` to the Framer Motion import.

---

#### Step 2.2: Replace Scroll State Logic

**Remove** the entire `isScrolled` state and its `useEffect` (current lines 16 and 20–26):

```tsx
// ❌ DELETE THIS:
const [isScrolled, setIsScrolled] = useState(false);

// ❌ DELETE THIS ENTIRE useEffect:
useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Replace with** the following Framer Motion scroll system. Place this immediately after the `isMobileMenuOpen` state declaration:

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// ── Scroll-linked header morph ──
const { scrollY } = useScroll();

// Interpolation range: 0px (top) → 100px (scrolled)
const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["hsla(40, 22%, 95%, 0)", "hsla(40, 22%, 95%, 1)"]
);
const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["hsla(37, 14%, 87%, 0)", "hsla(37, 14%, 87%, 1)"]
);
const navText = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.85)", "hsla(0, 0%, 42%, 1)"]
);
const brandText = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.95)", "hsla(0, 0%, 11%, 1)"]
);
const ctaBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.3)", "hsla(37, 14%, 87%, 1)"]
);
const ctaText = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.85)", "hsla(0, 0%, 11%, 1)"]
);

// Boolean for mobile menu + any conditional class logic
const [isScrolled, setIsScrolled] = useState(false);
useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
});
```

> [!IMPORTANT]
> **Why we keep a boolean `isScrolled`:** The mobile menu overlay still needs `isScrolled || isMobileMenuOpen` to decide its background (line 40 in the original). We derive this from `useMotionValueEvent` instead of a manual scroll listener. This is more efficient and stays within the Framer Motion ecosystem.

**Color Value Reference:**

| Transform | At `scrollY = 0` (Hero) | At `scrollY = 100` (Scrolled) | Maps To |
|---|---|---|---|
| `headerBg` | `hsla(40, 22%, 95%, 0)` — transparent | `hsla(40, 22%, 95%, 1)` — `bg-page` (#F7F5F0) | `--background` |
| `headerBorder` | `hsla(37, 14%, 87%, 0)` — transparent | `hsla(37, 14%, 87%, 1)` — `border` (#E2DED6) | `--border` |
| `navText` | `rgba(255, 255, 255, 0.85)` — white/85 | `hsla(0, 0%, 42%, 1)` — muted gray (#6B6B6B) | `--muted-foreground` |
| `brandText` | `rgba(255, 255, 255, 0.95)` — white/95 | `hsla(0, 0%, 11%, 1)` — near-black (#1C1C1C) | `--foreground` |
| `ctaBorder` | `rgba(255, 255, 255, 0.3)` — white/30 | `hsla(37, 14%, 87%, 1)` — border (#E2DED6) | `--border` |
| `ctaText` | `rgba(255, 255, 255, 0.85)` — white/85 | `hsla(0, 0%, 11%, 1)` — near-black (#1C1C1C) | `--foreground` |

---

#### Step 2.3: Convert `<header>` to `<motion.header>`

**Current (line 39–41):**
```tsx
<header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-page border-b border-border py-3" : "bg-transparent py-5"
        }`}
>
```

**Replace with:**
```tsx
<motion.header
    className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ${
        isMobileMenuOpen ? "!bg-page !border-border" : ""
    } ${isScrolled ? "py-3" : "py-5"}`}
    style={{
        backgroundColor: isMobileMenuOpen ? undefined : headerBg,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: isMobileMenuOpen ? undefined : headerBorder,
    }}
>
```

**Key decisions:**
- `transition-[padding]` replaces `transition-all` — we only want the CSS `transition` to handle `padding` changes. The colors are now driven by Framer Motion's `useTransform` (which interpolates on every frame via `style`), so CSS transitions on `background-color` would conflict and cause double-easing.
- When `isMobileMenuOpen` is `true`, we force `!bg-page` and `!border-border` via Tailwind's `!important` modifier to override the motion styles. This ensures the mobile menu always has a solid background.
- The `py-3` / `py-5` toggle remains keyed to `isScrolled` for the padding change.

---

#### Step 2.4: Update Brand Logo Color

**Current (line 45–55) — the brand `<Link>`:**
```tsx
<Link
    href="/"
    className="font-serif text-display-sm tracking-tight text-foreground hover:text-accent transition-colors z-50 relative"
    ...
>
    Valtum
</Link>
```

**Replace with:**
```tsx
<motion.span style={{ color: isMobileMenuOpen ? undefined : brandText }} className="z-50 relative">
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
</motion.span>
```

**Why the wrapper?** `<Link>` is a Next.js component that doesn't accept Framer Motion's `style` prop directly. Wrapping in `<motion.span>` with `style={{ color: brandText }}` lets the motion value control the `color` property. The `color` cascades into the `<Link>` via CSS inheritance. The `hover:text-accent` still works because hover styles override inherited color.

When `isMobileMenuOpen`, we bypass the motion value and use the static `text-foreground` class.

---

#### Step 2.5: Update Desktop Nav Link Colors

**Current (lines 58–68) — desktop nav:**
```tsx
<nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
    {NAV_LINKS.map((link) => (
        <Link
            key={link.name}
            href={link.href}
            className="group relative text-body-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
        >
            {link.name}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
        </Link>
    ))}
</nav>
```

**Replace with:**
```tsx
<nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
    {NAV_LINKS.map((link) => (
        <motion.span key={link.name} style={{ color: navText }}>
            <Link
                href={link.href}
                className="group relative text-body-sm font-medium hover:text-accent transition-colors py-2"
            >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
        </motion.span>
    ))}
</nav>
```

**Changes:**
- Wrapped each `<Link>` in `<motion.span style={{ color: navText }}>` to drive color via scroll interpolation.
- Removed `text-muted-foreground` and `hover:text-foreground` from the `<Link>` className.
- Changed hover to `hover:text-accent` — this provides a clear hover signal regardless of the current scroll-interpolated base color (brass accent works over both white and gray base text).
- Moved the `key` prop to the `<motion.span>` wrapper.

---

#### Step 2.6: Update Desktop CTA Button

**Current (lines 72–79):**
```tsx
<div className="hidden md:flex items-center gap-3">
    <Link
        href="#contact"
        className="border border-border text-body-sm font-medium uppercase tracking-[0.1em] px-6 py-2.5 hover:border-accent hover:text-accent transition-colors"
    >
        Book a Consultation
    </Link>
</div>
```

**Replace with:**
```tsx
<div className="hidden md:flex items-center gap-3">
    <motion.span
        style={{
            color: ctaText,
            borderColor: ctaBorder,
        }}
        className="inline-flex"
    >
        <Link
            href="#contact"
            className="border border-inherit text-body-sm font-medium uppercase tracking-[0.1em] px-6 py-2.5 hover:border-accent hover:text-accent transition-colors"
        >
            Book a Consultation
        </Link>
    </motion.span>
</div>
```

**Changes:**
- Wrapped in `<motion.span>` with `style={{ color: ctaText, borderColor: ctaBorder }}`.
- The `<Link>` uses `border-inherit` to inherit the interpolated border color from the motion wrapper.
- Hover states (`hover:border-accent hover:text-accent`) remain and override normally.

---

#### Step 2.7: Update Mobile Toggle Button Color

**Current (lines 82–88):**
```tsx
<button
    className="md:hidden text-foreground/80 hover:text-foreground relative z-50 p-1"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    aria-label="Toggle menu"
>
    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>
```

**Replace with:**
```tsx
<motion.button
    className="md:hidden hover:opacity-80 relative z-50 p-1"
    style={{
        color: isMobileMenuOpen ? "hsl(0, 0%, 11%)" : brandText,
    }}
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    aria-label="Toggle menu"
>
    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</motion.button>
```

**Changes:**
- Converted to `<motion.button>` to accept the motion `style` prop.
- When mobile menu is open, uses static dark color (`hsl(0, 0%, 11%)` = `--foreground`). When closed, uses the `brandText` motion value (white at top, dark when scrolled).

---

#### Step 2.8: Close the `<motion.header>` Tag

**Current (line 130):**
```tsx
</header>
```

**Replace with:**
```tsx
</motion.header>
```

---

## CHANGE 3: No CSS or Tailwind Config Changes Needed

The existing design tokens, gradient utilities, and Tailwind config require **zero modifications**. All new values are expressed inline via Framer Motion `useTransform` or Tailwind utility classes already available.

---

## Verification Checklist

After implementation, visually verify the following:

- [ ] **At `scrollY = 0`:** The "Valtum" logo is white and clearly legible against the darkened top of the hero image.
- [ ] **At `scrollY = 0`:** All nav links (Projects, About, Services, Reviews) are white/85 and legible.
- [ ] **At `scrollY = 0`:** The "Book a Consultation" CTA has a visible white/30 border and white/85 text.
- [ ] **At `scrollY = 50`:** All colors are mid-transition — a blend between white and the scrolled-state colors. Nothing should flash or jump.
- [ ] **At `scrollY = 100+`:** The header background is fully opaque `#F7F5F0`, text is dark, border is visible — identical to the current scrolled state.
- [ ] **Hover states work at all scroll positions:** `hover:text-accent` on nav links, `hover:border-accent hover:text-accent` on CTA.
- [ ] **Mobile menu:** When opened, the header snaps to solid `bg-page` with dark text regardless of scroll position.
- [ ] **Hero image:** The top ~30% of the image is gently darkened. The bottom ~45% is darkened (unchanged). The middle is untouched raw image.
- [ ] **No layout shift:** The header does not change height or width during scroll. Only padding (`py-5` → `py-3`), background, and colors change.
- [ ] **Performance:** Scroll the page rapidly. There should be no visible jank, flickering, or color "popping." Framer Motion's `useTransform` runs outside of React's render cycle.

---

## File Change Summary

| File | Change Type | Lines Affected |
|---|---|---|
| [`hero.tsx`](file:///home/kiune/projects/valtum/valtum-portfolio/src/components/sections/hero.tsx) | Add 1 `<div>`, modify comment | Lines 68–69 |
| [`header.tsx`](file:///home/kiune/projects/valtum/valtum-portfolio/src/components/layout/header.tsx) | Major refactor (imports, state, JSX) | Lines 1–6, 16–26, 39–88, 130 |
| `globals.css` | No changes | — |
| `tailwind.config.ts` | No changes | — |
| `motion.ts` | No changes | — |
