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
        <section className="relative py-section md:py-section-lg bg-page border-t border-border">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">
                <motion.div
                    id="projects"
                    className="scroll-mt-28"
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