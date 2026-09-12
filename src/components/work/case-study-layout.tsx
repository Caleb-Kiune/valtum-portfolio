"use client";

import Link from "next/link";
import Image from "next/image";
import { ArchitecturalProject } from "@/lib/types/project";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import { motion } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

interface CaseStudyLayoutProps {
    project: ArchitecturalProject;
}

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
    const briefText = "This project required a meticulous balance of aesthetic vision and functional necessity. The design maximizes spatial efficiency while maintaining an expansive, luxurious feel, with a focus on natural light, seamless flow, and enduring material choices.";

    const currentIndex = PROJECTS.findIndex(p => p.slug === project.slug);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % PROJECTS.length;
    const nextProject = PROJECTS[nextIndex];

    return (
        <article className="min-h-screen bg-page">
            <div className="bg-noise fixed inset-0 z-0 pointer-events-none" />

            <main className="container mx-auto px-6 max-w-7xl pt-16 md:pt-24 relative z-10">
                {/* 1. Back Navigation */}
                <Link href="/#projects" className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-accent transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Back to Work
                </Link>

                {/* 2. Cinematic Hero */}
                <div className="relative min-h-[70vh] rounded-micro overflow-hidden mb-16 flex items-end p-8 md:p-16">
                    <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                    <div className="relative z-20">
                        <h1 className="font-serif text-display-hero font-normal text-white mb-4 leading-tight">{project.title}</h1>
                        <p className="text-white/80 text-xl font-medium">{project.subtitle}</p>
                    </div>
                </div>

                {/* 3. Project DNA Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-b border-divider pb-16">
                    <div>
                        <dt className="text-label-meta mb-2">Client</dt>
                        <dd className="text-body text-foreground">{project.client}</dd>
                    </div>
                    <div>
                        <dt className="text-label-meta mb-2">Role / Type</dt>
                        <dd className="text-body text-foreground">{project.type}</dd>
                    </div>
                    <div>
                        <dt className="text-label-meta mb-2">Timeline</dt>
                        <dd className="text-body text-foreground">{project.timeline}</dd>
                    </div>
                    <div>
                        <dt className="text-label-meta mb-2">Location</dt>
                        <dd className="text-body text-foreground">{project.location}</dd>
                    </div>
                </div>

                {/* 4. The Brief & Approach */}
                <div className="max-w-3xl mx-auto py-12 md:py-24">
                    <h2 className="font-serif text-display-md text-center font-normal text-foreground mb-8">The Brief & Approach</h2>
                    <p className="text-body-lg leading-loose text-muted-foreground text-center">
                        {briefText}
                    </p>
                </div>

                {/* 5. The Visual Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={STAGGER_NORMAL}
                        className="space-y-4 mb-32"
                    >
                        {project.gallery[0] && (
                            <motion.div variants={FADE_UP} className="relative w-full aspect-[16/9] rounded-micro overflow-hidden">
                                <Image src={project.gallery[0]} alt={`${project.title} - Gallery 1`} fill className="object-cover" sizes="100vw" />
                            </motion.div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.gallery[1] && (
                                <motion.div variants={FADE_UP} className="relative w-full aspect-[4/3] rounded-micro overflow-hidden">
                                    <Image src={project.gallery[1]} alt={`${project.title} - Gallery 2`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                </motion.div>
                            )}
                            {project.gallery[2] && (
                                <motion.div variants={FADE_UP} className="relative w-full aspect-[4/3] rounded-micro overflow-hidden">
                                    <Image src={project.gallery[2]} alt={`${project.title} - Gallery 3`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </main>

            {/* 6. Next Project Footer */}
            {nextProject && (
                <Link href={`/projects/${nextProject.slug}`} className="block relative w-full h-[50vh] flex items-center justify-center group overflow-hidden">
                    <Image
                        src={nextProject.heroImage}
                        alt={nextProject.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-10 pointer-events-none" />
                    <div className="relative z-20 text-center">
                        <div className="text-label-meta text-white/80 mb-4 tracking-widest uppercase">
                            Next Project <span className="inline-block transform transition-transform group-hover:translate-x-1">→</span>
                        </div>
                        <h2 className="font-serif text-display-md text-white font-normal">{nextProject.title}</h2>
                    </div>
                </Link>
            )}
        </article>
    );
}
