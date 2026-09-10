import { services } from '@/lib/constants/services';
import { SectionHeading } from '@/components/ui/section-heading';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Smartphone, Layout, Server, Database, Code, Globe, Zap, Rocket, TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

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
};

export function Services() {
    return (
        <section className="relative py-section border-y border-border bg-page" id="services">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 px-6 mx-auto max-w-6xl">
                <ScrollReveal>
                    <SectionHeading
                        title="My Expertise"
                        subtitle="Bridging the gap between complex technical problems and seamless user experiences."
                        className="mb-12 md:mb-16"
                    />
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon ? IconMap[service.icon] : Code;

                        return (
                            <ScrollReveal key={index} delay={100 + index * 100}>
                                <div className="group relative overflow-hidden rounded-card bg-surface p-6 md:p-8 shadow-sm transition-all hover:bg-surface-elevated border border-border hover:border-border-highlight h-full">
                                    <div className="flex flex-col gap-5">
                                        <div className="p-3.5 w-fit rounded-inner bg-surface-elevated border border-border/50 text-primary group-hover:bg-border-highlight transition-colors">
                                            <IconComponent className="h-6 w-6" />
                                        </div>

                                        <div className="space-y-2.5">
                                            <h3 className="font-display font-bold text-xl text-foreground/80 group-hover:text-foreground transition-colors">{service.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/70 transition-colors">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
