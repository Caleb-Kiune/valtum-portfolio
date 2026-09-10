"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { FADE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from "@/lib/motion";

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const rafId = useRef<number>(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
            className="spotlight relative w-full overflow-hidden bg-page pt-28 pb-16 min-h-screen flex flex-col justify-center md:pt-28 md:pb-20"
        >
            <motion.div
                style={{ opacity: opacityFade }}
                className="container mx-auto px-6 max-w-7xl relative z-10"
                variants={STAGGER_CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* LEFT COLUMN: The Pitch */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-6">
                        <motion.h1
                            variants={FADE_UP_VARIANTS}
                            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
                        >
                            Automate your{" "}
                            <span className="text-primary">
                                Complex Business Workflows
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={FADE_UP_VARIANTS}
                            className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
                        >
                            I build reliable,<span className="text-foreground/80 font-medium"> data-driven web applications</span> that streamline operations and cut manual processing time.
                            <span className="block mt-3 text-xs font-mono text-primary tracking-wide">
                                Currently accepting projects
                            </span>
                        </motion.p>

                        <motion.div
                            variants={FADE_UP_VARIANTS}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
                        >
                            <a
                                href="https://wa.me/254705774171?text=Hi%20Caleb,%20I%20checked%20out%20your%20portfolio."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-button bg-whatsapp hover:bg-whatsapp/90 text-white text-sm font-semibold tracking-wide transition-colors shadow-md shadow-black/[var(--shadow-strength)] active:scale-95"
                            >
                                <span className="flex items-center gap-2">
                                    Chat on WhatsApp
                                    <FaWhatsapp className="w-5 h-5" />
                                </span>
                            </a>

                            <a
                                href="#work"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-button border border-border bg-surface text-foreground/70 text-sm font-medium hover:bg-surface-elevated hover:text-foreground transition-colors active:scale-95"
                            >
                                View Work
                            </a>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Profile Photo */}
                    <motion.div
                        variants={FADE_UP_VARIANTS}
                        className="relative hidden md:flex flex-col items-center justify-center max-h-[400px]"
                    >
                        <div className="relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px]">
                            <div className="relative w-full h-full rounded-full border border-border overflow-hidden shadow-2xl shadow-black/[var(--shadow-strength)]">
                                <Image
                                    src="/caleb-kiune.jpg"
                                    alt="Caleb Kiune"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 280px, 320px"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}