import Link from "next/link";
import Image from "next/image";
import { ProjectCaseStudy } from "@/lib/types/project";
import { ArrowUpRight, Github, ArrowLeft, Layers, Calendar, User, Building2, Cpu, CheckSquare } from "lucide-react";


interface CaseStudyLayoutProps {
    project: ProjectCaseStudy;
}

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
    return (
        <article className="min-h-screen bg-page pb-12 relative overflow-x-hidden">
            <div className="bg-noise fixed inset-0 z-0 pointer-events-none" />

            {/* Compact Header Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-page border-b border-border h-16 flex items-center">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href="/#work"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Back to Work"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-lg md:text-2xl font-display font-bold text-foreground tracking-tight truncate max-w-[150px] md:max-w-none">
                            {project.title}
                        </h1>
                        <span className="hidden md:inline-block h-4 w-[1px] bg-glass/10" />
                        <p className="hidden md:inline-block text-sm text-muted-foreground">{project.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-glass/5 rounded-button transition-all"
                                title="View Source Code"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-emerald-400 text-white text-sm font-medium rounded-button transition-colors shadow-md shadow-black/[var(--shadow-strength)]"
                            >
                                Live Site
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Dashboard Grid */}
            <main className="container mx-auto px-4 md:px-6 max-w-7xl pt-20 md:pt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left Sidebar (col-span-4) */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Project Preview */}
                        {/* Project Preview */}
                        <div className="w-full rounded-md overflow-hidden border border-border shadow-lg bg-surface">
                            <Image
                                src={project.heroImage}
                                alt={project.title}
                                className="w-full h-auto object-cover"
                                priority
                                placeholder="blur"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                        {/* Project DNA (Vertical Impact Grid) */}
                        <div className="bg-surface p-4 rounded-card border border-border">
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
                                <div className="flex items-start gap-3">
                                    <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <dt className="text-xs text-muted-foreground/80 uppercase tracking-wider mb-1">Client</dt>
                                        <dd className="text-sm text-foreground/80 font-medium leading-tight">{project.client}</dd>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-glass/5 w-full hidden lg:block" />

                                <div className="flex items-start gap-3">
                                    <User className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <dt className="text-xs text-muted-foreground/80 uppercase tracking-wider mb-1">Role</dt>
                                        <dd className="text-sm text-foreground/80 font-medium leading-tight">{project.role}</dd>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-glass/5 w-full hidden lg:block" />

                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <dt className="text-xs text-muted-foreground/80 uppercase tracking-wider mb-1">Timeline</dt>
                                        <dd className="text-sm text-foreground/80 font-medium leading-tight">{project.timeline}</dd>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-glass/5 w-full hidden lg:block" />

                                <div className="flex items-start gap-3 col-span-2 lg:col-span-1">
                                    <Layers className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div className="w-full">
                                        <dt className="text-xs text-muted-foreground/80 uppercase tracking-wider mb-2">Tech Stack</dt>
                                        <dd className="flex flex-wrap gap-1.5">
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 bg-glass/5 border border-glass/10 rounded-sm text-[11px] text-primary/90 font-medium whitespace-nowrap"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content Area (col-span-8) */}
                    <div className="lg:col-span-8 space-y-6">



                        {/* Narrative Grid (Side-by-Side) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Challenge */}
                            <div className="bg-surface p-5 rounded-card border border-border">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary/20 ring-1 ring-primary" />
                                    The Challenge
                                </h3>
                                <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
                                    {project.challenge.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Solution */}
                            <div className="bg-surface p-5 rounded-card border border-border">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400/20 ring-1 ring-emerald-400" />
                                    The Solution
                                </h3>
                                <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
                                    {project.solution.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Technical Highlights (Horizontal Feature List) */}
                        <div className="bg-surface p-5 rounded-card border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <Cpu className="w-4 h-4 text-primary" />
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Technical Highlights</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {project.technicalHighlights.map((point, index) => (
                                    <div key={index} className="flex gap-3 items-start p-3 rounded-md bg-glass/5 border border-glass/10">
                                        <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-foreground/70 leading-relaxed font-medium">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </article>
    );
}
