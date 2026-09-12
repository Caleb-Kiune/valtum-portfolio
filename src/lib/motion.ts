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
