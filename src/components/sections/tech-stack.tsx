import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiPostgresql,

    SiWhatsapp,
    SiGoogleanalytics,
} from "react-icons/si";
import { Smartphone, Globe } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

// Type for tech stack items
interface TechItem {
    name: string;
    description: string;
    icon: IconType | LucideIcon;
}

interface TechCategory {
    title: string;
    items: TechItem[];
}

// Curated tech stack data - Rule of Three
const TECH_STACK: TechCategory[] = [
    {
        title: "Frontend Ecosystem",
        items: [
            { name: "Next.js", description: "Framework", icon: SiNextdotjs },
            { name: "TypeScript", description: "Reliability", icon: SiTypescript },
            { name: "Tailwind CSS", description: "Speed", icon: SiTailwindcss },
        ],
    },
    {
        title: "Backend Infrastructure",
        items: [
            { name: "Node.js", description: "Runtime", icon: SiNodedotjs },
            { name: "PostgreSQL", description: "Database", icon: SiPostgresql },
            { name: "REST APIs", description: "Architecture", icon: Globe },
        ],
    },
    {
        title: "Business & Tools",
        items: [
            { name: "M-Pesa Integration", description: "Daraja API", icon: Smartphone },
            { name: "WhatsApp Business", description: "Communication", icon: SiWhatsapp },
            { name: "Google Analytics", description: "ROI & Data", icon: SiGoogleanalytics },
        ],
    },
];

export function TechStack() {
    return (
        <section className="py-section md:py-section-lg bg-page border-t border-border">
            <div className="container mx-auto px-6 max-w-6xl">
                <ScrollReveal>
                    <SectionHeading
                        title="Technical Competence"
                        subtitle="A curated, production-grade stack built for scale and reliability."
                        className="mb-16 md:mb-20"
                    />
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {TECH_STACK.map((category, categoryIdx) => (
                        <ScrollReveal key={category.title} delay={100 + categoryIdx * 150}>
                            <div className="group">
                                {/* Category Header */}
                                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/80 mb-6 pb-4 border-b border-border-subtle">
                                    {category.title}
                                </h3>

                                {/* Tech Items - Vertical Stack */}
                                <div className="space-y-4">
                                    {category.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.name}
                                                className="group/item flex items-center gap-4 p-3 -mx-3 rounded-inner hover:bg-surface transition-colors duration-200 cursor-default"
                                            >
                                                {/* Icon */}
                                                <div className="flex items-center justify-center w-10 h-10 rounded-inner bg-surface-elevated border border-border group-hover/item:border-border-highlight transition-colors">
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
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
