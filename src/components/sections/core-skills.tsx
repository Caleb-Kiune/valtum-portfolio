"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Monitor, PenTool, Box, Layers, Video, Palette, MonitorPlay } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

// Type for tech stack items
interface TechItem {
    name: string;
    description: string;
    icon: LucideIcon;
}

interface TechCategory {
    title: string;
    items: TechItem[];
}

// Curated tech stack data - Rule of Three
const TECH_STACK: TechCategory[] = [
    {
        title: "Drafting & Modeling",
        items: [
            { name: "Archicad", description: "BIM & Drafting", icon: Box },
            { name: "SketchUp", description: "3D Modeling", icon: Layers },
        ],
    },
    {
        title: "Rendering & Visualization",
        items: [
            { name: "D5 Render", description: "Real-time Rendering", icon: MonitorPlay },
            { name: "Lumion", description: "3D Rendering", icon: Monitor },
        ],
    },
    {
        title: "Post-Production",
        items: [
            { name: "Adobe Photoshop", description: "Image Editing", icon: Palette },
            { name: "Adobe Illustrator", description: "Vector Graphics", icon: PenTool },
            { name: "DaVinci Resolve", description: "Video Editing", icon: Video },
        ],
    },
];

export function CoreSkills() {
    return (
        <section className="py-section md:py-section-lg bg-page border-t border-border">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={FADE_UP}
                >
                    <SectionHeading
                        title="Core Toolkit"
                        subtitle="The software arsenal I use to bring architectural concepts to life."
                        className="mb-16 md:mb-20"
                    />
                </motion.div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={STAGGER_NORMAL}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
                >
                    {TECH_STACK.map((category) => (
                        <motion.div key={category.title} variants={FADE_UP}>
                            <div className="group">
                                {/* Category Header */}
                                <h3 className="text-label-meta mb-6 pb-4 border-b border-divider">
                                    {category.title}
                                </h3>

                                {/* Tech Items - Vertical Stack */}
                                <div className="space-y-4">
                                    {category.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.name}
                                                className="group/item flex items-center gap-4 p-3 -mx-3 rounded-micro hover:bg-surface transition-colors duration-200 cursor-default"
                                            >
                                                {/* Icon */}
                                                <div className="flex items-center justify-center w-10 h-10 rounded-micro bg-surface-elevated border border-border group-hover/item:border-border-hover transition-colors">
                                                    <Icon className="w-4.5 h-4.5 text-muted-foreground group-hover/item:text-foreground/80 transition-colors" />
                                                </div>

                                                {/* Text */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-foreground/70 group-hover/item:text-foreground transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground/80 group-hover/item:text-muted-foreground transition-colors">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
