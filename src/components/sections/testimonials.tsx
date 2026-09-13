"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { FADE_UP, STAGGER_NORMAL, VIEWPORT } from "@/lib/motion";

export function Testimonials() {
    return (
        <section className="relative py-section md:py-section-lg border-y border-border bg-page">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">
                <motion.div
                    id="testimonials"
                    className="scroll-mt-28"
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={FADE_UP}
                >
                    <SectionHeading
                        title="What Clients Say"
                        subtitle="Trusted by clients across residential and commercial spaces."
                        className="mb-12 md:mb-16"
                    />
                </motion.div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={STAGGER_NORMAL}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {TESTIMONIALS.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={FADE_UP}
                            className="h-full"
                        >
                            <div className="bg-surface p-6 md:p-8 rounded-micro border border-border flex flex-col gap-5 hover:border-border-hover hover:bg-surface-elevated transition-all duration-300 h-full">
                                <Quote className="h-8 w-8 text-accent/50 fill-accent/10" />
                                <p className="text-foreground/70 font-serif italic text-lg flex-grow leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                                <div className="pt-4 border-t border-border">
                                    <p className="font-serif font-normal text-lg text-foreground tracking-tight">{testimonial.name}</p>
                                    <p className="text-label-meta">{testimonial.role}, {testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
