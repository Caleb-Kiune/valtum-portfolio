import Link from "next/link";
import Image from "next/image";
import { ArchitecturalProject } from "@/lib/types/project";
import { ArrowLeft, Calendar, User, Building2, Layers } from "lucide-react";

interface CaseStudyLayoutProps {
    project: ArchitecturalProject;
}

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
    const briefText = "This project required a meticulous balance of aesthetic vision and functional necessity. The design maximizes spatial efficiency while maintaining an expansive, luxurious feel, with a focus on natural light, seamless flow, and enduring material choices.";
    
    const materials = [
        "Natural Oak Timber",
        "Honed Limestone",
        "Brushed Brass Fixtures",
        "Matte Black Accents"
    ];

    const deliverables = [
        "Concept Design & Moodboards",
        "3D Rendering & Visualization",
        "Detailed Construction Drawings",
        "Site Coordination"
    ];

    return (
        <article className="min-h-screen bg-page pb-24 relative overflow-x-hidden">
            <div className="bg-noise fixed inset-0 z-0 pointer-events-none" />

            <header className="fixed top-0 left-0 right-0 z-50 bg-page/90 backdrop-blur-md border-b border-border/50 h-16 flex items-center">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href="/#projects"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Back to Work"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-lg md:text-2xl font-display font-bold text-foreground tracking-tight truncate max-w-[150px] md:max-w-none">
                            {project.title}
                        </h1>
                        <span className="hidden md:inline-block h-4 w-[1px] bg-border" />
                        <p className="hidden md:inline-block text-sm text-muted-foreground">{project.subtitle}</p>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 max-w-7xl pt-24 md:pt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* LEFT COLUMN: INFO ANCHOR */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
                        {/* Project DNA */}
                        <div className="bg-surface-elevated p-6 rounded-2xl border border-border/50">
                            <h2 className="text-2xl font-display font-bold text-foreground mb-6">{project.title}</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Client</dt>
                                    <dd className="text-sm text-foreground font-medium">{project.client}</dd>
                                </div>
                                <div className="h-[1px] bg-border/50 w-full" />
                                <div className="flex flex-col">
                                    <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Role / Type</dt>
                                    <dd className="text-sm text-foreground font-medium">{project.type}</dd>
                                </div>
                                <div className="h-[1px] bg-border/50 w-full" />
                                <div className="flex flex-col">
                                    <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Timeline</dt>
                                    <dd className="text-sm text-foreground font-medium">{project.timeline}</dd>
                                </div>
                                <div className="h-[1px] bg-border/50 w-full" />
                                <div className="flex flex-col">
                                    <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Location & Style</dt>
                                    <dd className="flex flex-wrap gap-2">
                                        <span className="px-2.5 py-1 bg-surface border border-border-subtle rounded-md text-xs text-foreground/80 font-medium">
                                            {project.location}
                                        </span>
                                        <span className="px-2.5 py-1 bg-surface border border-border-subtle rounded-md text-xs text-foreground/80 font-medium">
                                            {project.designStyle}
                                        </span>
                                    </dd>
                                </div>
                            </div>
                        </div>

                        {/* The Brief */}
                        <div className="bg-surface p-6 rounded-2xl border border-border/50">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">The Brief</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{briefText}</p>
                        </div>

                        {/* Materials & Deliverables */}
                        <div className="bg-surface p-6 rounded-2xl border border-border/50 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Key Materials</h3>
                                <ul className="space-y-2">
                                    {materials.map((mat, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {mat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="h-[1px] bg-border/50 w-full" />
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">Deliverables</h3>
                                <ul className="space-y-2">
                                    {deliverables.map((del, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" /> {del}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: VISUAL BENTO */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Hero Image - Spans 2 cols on MD */}
                            <div className="md:col-span-2 relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border/50 bg-surface shadow-sm">
                                <Image
                                    src={project.heroImage}
                                    alt={project.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                />
                            </div>

                            {/* Gallery Images */}
                            {project.gallery && project.gallery.length > 0 && (
                                <>
                                    {project.gallery[0] && (
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-surface-elevated shadow-sm">
                                            <Image
                                                src={project.gallery[0]}
                                                alt={`${project.title} - Gallery 1`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    {project.gallery[1] && (
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-surface-elevated shadow-sm">
                                            <Image
                                                src={project.gallery[1]}
                                                alt={`${project.title} - Gallery 2`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    {project.gallery[2] && (
                                        <div className="md:col-span-2 relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-border/50 bg-surface-elevated shadow-sm">
                                            <Image
                                                src={project.gallery[2]}
                                                alt={`${project.title} - Detail View`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 66vw"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </article>
    );
}
