import { MapPin, Building2, ShieldCheck, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function About() {
    return (
        <section id="about" className="relative py-section md:py-section-lg bg-page border-t border-border">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">

                {/* Section Header */}
                <ScrollReveal>
                    <div className="mb-12 md:mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                            The Valtum Approach
                        </h2>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Balancing design, functionality, and the realities of construction.
                        </p>
                    </div>
                </ScrollReveal>

                {/* THE BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* CARD 1: The Narrative (Wide) */}
                    <ScrollReveal delay={100} className="md:col-span-2">
                        <div className="bg-surface border border-border p-8 rounded-card relative overflow-hidden group h-full">
                            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                The Operator&apos;s Mindset
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                I'm Erick Mwangi, an Interior Architect who believes every space carries a story. Since graduating from the Technical University of Kenya in 2024, I have worked across residential and commercial projects. My focus is on balancing design, functionality, technical requirements, and the realities of construction.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* CARD 2: The Stats (Square) */}
                    <ScrollReveal delay={200} className="md:col-span-1">
                        <div className="bg-surface border border-border p-8 rounded-card flex flex-col justify-center items-center text-center group hover:bg-surface-elevated transition-colors h-full">
                            <div className="mb-4 p-4 rounded-full bg-surface-elevated transition-colors">
                                <Building2 className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-xl font-bold text-foreground mb-2">Residential & Commercial</div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Project Management
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* CARD 3: Location (Square) */}
                    <ScrollReveal delay={300} className="md:col-span-1">
                        <div className="bg-surface border border-border p-8 rounded-card flex flex-col justify-between group hover:bg-surface-elevated transition-colors h-full">
                            <div className="flex justify-between items-start">
                                <div className="p-3 rounded-inner bg-surface-elevated group-hover:bg-border-highlight transition-colors">
                                    <MapPin className="w-6 h-6 text-foreground" />
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border-subtle">
                                    <span className="inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    <span className="text-xs font-medium text-foreground/70">Active</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground mb-1">Nairobi, KE</div>
                                <div className="text-sm text-muted-foreground/80 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> UTC+3 (EAT)
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* CARD 4: Philosophy/Stack (Wide) */}
                    <ScrollReveal delay={400} className="md:col-span-2">
                        <div className="bg-surface border border-border p-8 rounded-card h-full">
                            <h3 className="text-xl font-bold text-foreground mb-4">Design Precision</h3>
                            <p className="text-muted-foreground mb-6">
                                I specialize in creating environments that reflect the unique identity of my clients while maintaining the highest standards of buildability and structural integrity.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}