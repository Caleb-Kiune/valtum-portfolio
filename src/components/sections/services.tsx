"use client";

import { services } from '@/lib/constants/services';
import { SectionHeading } from '@/components/ui/section-heading';
import { Smartphone, Layout, Server, Database, Code, Globe, Zap, Rocket, TrendingUp, PenTool, Layers, Ruler, Building2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

const IconMap: Record<string, LucideIcon> = {
    "Smartphone": Smartphone,
    "Layout": Layout,
    "Server": Server,
    "Database": Database,
    "Code": Code,
    "Globe": Globe,
    "Zap": Zap,
    "Rocket": Rocket,
    "TrendingUp": TrendingUp,
    "PenTool": PenTool,
    "Layers": Layers,
    "Ruler": Ruler,
    "Building2": Building2,
};

export function Services() {
    return (
        <section className="relative py-section border-y border-border bg-page scroll-mt-28" id="services">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 px-6 mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={FADE_UP}
                >
                    <SectionHeading
                        title="Architectural Services"
                        subtitle="Comprehensive solutions from concept to construction."
                        className="mb-12 md:mb-16"
                    />
                </motion.div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={STAGGER_NORMAL}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
                >
                    {services.map((service, index) => {
                        const IconComponent = service.icon ? IconMap[service.icon] : Code;

                        return (
                            <motion.div key={index} variants={FADE_UP}>
                                <div className="group relative overflow-hidden rounded-micro bg-surface p-6 md:p-8 transition-all hover:bg-surface-elevated border border-divider hover:border-border-hover h-full">
                                    <div className="flex flex-col gap-5">
                                        <div className="p-3.5 w-fit rounded-micro bg-surface-elevated border border-divider text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                                            <IconComponent className="h-6 w-6" />
                                        </div>

                                        <div className="space-y-2.5">
                                            <h3 className="font-serif font-normal text-xl text-foreground/80 group-hover:text-foreground transition-colors">{service.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/70 transition-colors">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
