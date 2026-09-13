"use client";

import { MapPin, Building2, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

export function About() {
    return (
        <section className="relative py-section md:py-section-lg bg-page border-t border-border">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">

                {/* Section Header */}
                <motion.div
                    id="about"
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={FADE_UP}
                    className="mb-12 md:mb-16 scroll-mt-28"
                >
                    <h2 className="font-serif text-display-lg font-normal text-foreground mb-4">
                        The Valtum Approach
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Balancing design, functionality, and the realities of construction.
                    </p>
                </motion.div>

                {/* THE BENTO GRID */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={STAGGER_NORMAL}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* CARD 1: The Narrative (Wide) */}
                    <motion.div variants={FADE_UP} className="md:col-span-2">
                        <div className="bg-surface border border-border p-8 rounded-micro relative overflow-hidden group h-full hover:border-border-hover transition-colors">
                            <h3 className="text-xl font-serif font-normal text-foreground mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-accent" />
                                The Operator&apos;s Mindset
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                I&apos;m Erick Mwangi, an Interior Architect who believes every space carries a story. Since graduating from the Technical University of Kenya in 2024, I have worked across residential and commercial projects. My focus is on balancing design, functionality, technical requirements, and the realities of construction.
                            </p>
                        </div>
                    </motion.div>

                    {/* CARD 2: The Stats (Square) */}
                    <motion.div variants={FADE_UP} className="md:col-span-1">
                        <div className="bg-surface border border-border p-8 rounded-micro flex flex-col justify-center items-center text-center group hover:bg-surface-elevated hover:border-border-hover transition-colors h-full">
                            <div className="mb-4 p-4 rounded-full bg-surface-elevated group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                                <Building2 className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                            </div>
                            <div className="text-xl font-serif font-normal text-foreground mb-2">Residential & Commercial</div>
                            <div className="text-label-meta">
                                Project Management
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 3: Location (Square) */}
                    <motion.div variants={FADE_UP} className="md:col-span-1">
                        <div className="bg-surface border border-border p-8 rounded-micro flex flex-col justify-between group hover:bg-surface-elevated hover:border-border-hover transition-colors h-full">
                            <div className="flex justify-between items-start">
                                <MapPin className="w-6 h-6 text-accent" />
                                <span className="text-label-meta text-muted-foreground tracking-widest">1°17'S, 36°49'E</span>
                            </div>
                            <div>
                                <div className="text-2xl font-serif font-normal text-foreground mb-1">Nairobi, Kenya</div>
                                <span className="text-sm text-muted-foreground/80 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Local Time: UTC+3
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 4: Philosophy/Stack (Wide) */}
                    <motion.div variants={FADE_UP} className="md:col-span-2">
                        <div className="bg-surface border border-border p-8 rounded-micro h-full hover:border-border-hover transition-colors">
                            <h3 className="text-xl font-serif font-normal text-foreground mb-4">Design Precision</h3>
                            <p className="text-muted-foreground mb-6">
                                I specialize in creating environments that reflect the unique identity of my clients while maintaining the highest standards of buildability and structural integrity.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}