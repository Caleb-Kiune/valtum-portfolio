import { MapPin, TrendingUp, ShieldCheck, Clock } from "lucide-react";
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
                            From Underwriting to <span className="text-primary">Engineering</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            I bridge the gap between complex business logic and reliable software.
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
                                I didn&apos;t start as a coder—I started in operations. With over 5 years of experience in the
                                <span className="text-foreground/80 font-medium"> insurance industry</span>, I know that software isn&apos;t just about code: it&apos;s about solving business problems. I transitioned into software development because I wanted to build the tools I wished I had. Today, I combine that operational discipline with modern web development skills to build systems that are practical, efficient, and user-friendly.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* CARD 2: The Stats (Square) */}
                    <ScrollReveal delay={200} className="md:col-span-1">
                        <div className="bg-surface border border-border p-8 rounded-card flex flex-col justify-center items-center text-center group hover:bg-surface-elevated transition-colors h-full">
                            <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <TrendingUp className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-5xl font-bold text-foreground mb-2">5+</div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Years Industry Experience
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
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    <span className="text-xs font-medium text-primary">Active</span>
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
                            <h3 className="text-xl font-bold text-foreground mb-4">Technical Precision</h3>
                            <p className="text-muted-foreground mb-6">
                                I specialize in building modern applications that prioritize speed and data integrity, ensuring your system behaves predictably as your business grows.
                            </p>

                            {/* Mini Tech Pills */}
                            <div className="flex flex-wrap gap-2">
                                {["Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"].map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-inner bg-surface-elevated text-xs font-medium text-foreground/70 border border-border-highlight">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}