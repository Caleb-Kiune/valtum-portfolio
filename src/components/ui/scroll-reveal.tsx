"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Lightweight scroll-reveal wrapper using IntersectionObserver.
 * Adds 'is-visible' class when element enters viewport (once).
 * Minimal client-side JS footprint for RSC-compatible animations.
 */
export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add delay via inline style for stagger effect
                    if (delay > 0) {
                        element.style.animationDelay = `${delay}ms`;
                    }
                    element.classList.add("is-visible");
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1, rootMargin: "-50px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={`animate-on-scroll ${className}`}>
            {children}
        </div>
    );
}
