import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { Quote } from "lucide-react";

export function Testimonials() {
    return (
        <section className="relative py-section md:py-section-lg border-y border-border bg-page" id="testimonials">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">
                <ScrollReveal>
                    <SectionHeading
                        title="What Clients Say"
                        subtitle="Trusted by businesses to deliver ROI-driven software."
                        className="mb-12 md:mb-16"
                    />
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <ScrollReveal
                            key={testimonial.id}
                            delay={100 + index * 100}
                            className="h-full"
                        >
                            <div className="bg-surface p-6 md:p-8 rounded-card border border-border flex flex-col gap-5 hover:border-border-highlight hover:bg-surface-elevated transition-all duration-300 h-full">
                                <Quote className="h-8 w-8 text-accent/50 fill-accent/10" />
                                <p className="text-foreground/70 italic flex-grow leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                                <div className="pt-4 border-t border-border">
                                    <p className="font-display font-semibold text-foreground tracking-tight">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground/80">{testimonial.role}, {testimonial.company}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
