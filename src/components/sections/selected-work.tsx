"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { motion } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

import { PROJECTS } from "@/lib/data/projects";

export function SelectedWork() {
    return (
        <section id="projects" className="relative py-section md:py-section-lg bg-page border-t border-border">
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

                {/* Editorial Rows Container */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={STAGGER_NORMAL}
                    className="flex flex-col w-full"
                >
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={FADE_UP}
                            className="w-full py-16 lg:py-24 border-b border-divider last:border-b-0"
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}