"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { FADE_UP, STAGGER_NORMAL } from "@/lib/motion";

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const rafId = useRef<number>(0);

    const { scrollY, scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    // Parallax effect: moves down 300px as user scrolls 1000px down
    const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

    // Performance-optimized mousemove: rAF throttled + direct DOM update
    const handleMouseMove = useCallback((e: MouseEvent) => {
        cancelAnimationFrame(rafId.current);

        rafId.current = requestAnimationFrame(() => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Direct DOM update bypasses React reconciliation
            section.style.setProperty("--spotlight-x", `${x}px`);
            section.style.setProperty("--spotlight-y", `${y}px`);
        });
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        section?.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            section?.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId.current);
        };
    }, [handleMouseMove]);

    return (
        <section
            ref={sectionRef}
            className="spotlight relative w-full overflow-hidden min-h-svh flex flex-col justify-center bg-deep"
        >
            {/* Parallax Background Image */}
            <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ y: yParallax }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                    alt="Architectural Interior"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

            {/* Content Container positioned at bottom */}
            <div className="absolute bottom-0 left-0 w-full z-20 pb-20 md:pb-32">
                <motion.div
                    style={{ opacity: opacityFade }}
                    className="container mx-auto px-6 max-w-7xl"
                    variants={STAGGER_NORMAL}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col items-start text-left space-y-6">
                        
                        <motion.div variants={FADE_UP}>
                            <span className="text-label-meta text-white/80">
                                Interior Architecture
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={FADE_UP}
                            className="font-serif text-display-hero text-white font-normal leading-tight"
                        >
                            Thoughtful spaces.<br/>
                            Timeless living.
                        </motion.h1>

                        <motion.div variants={FADE_UP} className="pt-4">
                            <Link
                                href="#projects"
                                className="group inline-flex items-center gap-2 text-accent hover:text-white transition-colors uppercase tracking-widest text-sm font-medium"
                            >
                                View Selected Work
                                <span className="transform transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-white/50 text-sm">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        ease: "easeInOut" 
                    }}
                >
                    ↓
                </motion.div>
            </div>
        </section>
    );
}