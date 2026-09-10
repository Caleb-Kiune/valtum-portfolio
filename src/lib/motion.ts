import { Variants } from "framer-motion";

/**
 * Global Motion Manifesto
 * Standardized animations for a consistent, premium feel.
 */

// 1. Standardized Variants
export const FADE_UP_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        y: 12
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.0, 0.0, 0.2, 1] // Standard ease-out
        }
    }
};

export const FADE_DOWN_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        y: -12
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.0, 0.0, 0.2, 1]
        }
    }
};

export const STAGGER_CONTAINER_VARIANTS: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

// 2. The Viewport Strategy
export const VIEWPORT_CONFIG = {
    once: true,
    margin: "-100px", // Triggers when element is well within view
} as const;
