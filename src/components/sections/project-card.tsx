"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  tag: string;
  metric: string;
  stack: string[];
  imageSrc: string | StaticImageData;
  slug: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {

  const techPreview = project.stack.slice(0, 3);


  const hasLiveUrl = Boolean(project.liveUrl);


  const imageContent = (
    <>
      <Image
        src={project.imageSrc}
        alt={project.title}
        fill
        loading="lazy"
        decoding="async"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-50"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Desktop Hover Overlay — only shown when liveUrl exists */}
      {hasLiveUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center z-0 pointer-events-none">
          <span className="px-4 py-2 bg-surface border border-border-highlight rounded-full text-foreground text-xs font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Visit Live Site
          </span>
        </div>
      )}

      {/* Base Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
    </>
  );

  return (
    <article
      className="group relative flex flex-col h-full overflow-hidden rounded-card bg-surface border border-border hover:border-border-highlight hover:-translate-y-0.5 transition-all duration-300 shadow-2xl shadow-black/[var(--shadow-strength)]"
    >
      {/* Top: Image Section — links to live site when available */}
      {hasLiveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit live site — ${project.title}`}
          className="relative block w-full aspect-video overflow-hidden bg-surface border-b border-glass/5 active:scale-[0.98] transition-transform"
        >
          {imageContent}
        </a>
      ) : (
        <div className="relative w-full aspect-video overflow-hidden bg-surface border-b border-glass/5">
          {imageContent}
        </div>
      )}

      {/* Bottom: Content Section */}
      <div className="flex flex-col flex-1 p-4 md:p-5 relative z-0 bg-surface">
        {/* Middle: Non-interactive metadata */}
        <div className="space-y-3 mb-2">
          <span className="inline-block text-primary text-[10px] font-bold tracking-widest uppercase">
            {project.tag}
          </span>

          <div>
            <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">
              {project.title}
            </h3>

            {/* Mobile Tech Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {techPreview.map((tech) => (
                <span key={tech} className="text-[10px] text-muted-foreground bg-glass/5 px-1.5 py-0.5 rounded border border-glass/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.metric}
          </p>
        </div>

        {/* Footer: Case study link */}
        <Link
          href={`/work/${project.slug}`}
          className="mt-auto pt-4 border-t border-glass/5 flex items-center justify-between active:scale-[0.98] transition-transform"
          aria-label={`View case study for ${project.title}`}
        >
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            View Case Study
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}