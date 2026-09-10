import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

import { PROJECTS } from "@/lib/data/projects";

export function SelectedWork() {
    return (
        <section id="work" className="relative py-section md:py-section-lg bg-page border-t border-border">
            <div className="bg-noise" aria-hidden="true" />
            <div className="container relative z-10 mx-auto px-6 max-w-6xl">
                <ScrollReveal>
                    <SectionHeading
                        title="Selected Work"
                        subtitle="Real-world solutions delivering tangible business results"
                        className="mb-16 md:mb-20"
                    />
                </ScrollReveal>

                {/* Uniform Grid - No Spanning */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {PROJECTS.map((project, index) => (
                        <ScrollReveal
                            key={project.id}
                            delay={100 + index * 100}
                            className="col-span-1 h-full"
                        >
                            <ProjectCard
                                project={{
                                    id: project.id,
                                    title: project.title,
                                    tag: project.tag,
                                    metric: project.subtitle,
                                    stack: project.stack,
                                    imageSrc: project.heroImage,
                                    slug: project.slug,
                                    liveUrl: project.liveUrl,
                                }}
                            />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}