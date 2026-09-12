import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArchitecturalProject } from "@/lib/types/project";

interface ProjectCardProps {
  project: ArchitecturalProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageContent = (
    <Image
      src={project.heroImage}
      alt={project.title}
      fill
      loading="lazy"
      decoding="async"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );

  return (
    <article
      className="group relative flex flex-col h-full overflow-hidden rounded-card bg-surface border border-border-subtle hover:border-border hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View project — ${project.title}`}
        className="relative block w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-surface border-b border-border-subtle active:scale-[0.98] transition-transform"
      >
        {imageContent}
      </Link>

      <div className="flex flex-col flex-1 p-5 md:p-6 relative z-0 bg-surface">
        <div className="space-y-3 mb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors mb-2">
              {project.title}
            </h3>
            
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {project.tag} • {project.location}
            </p>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between active:scale-[0.98] transition-transform"
          aria-label={`View project details for ${project.title}`}
        >
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            View Project
          </span>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </article>
  );
}