import Image from "next/image";
import Link from "next/link";
import { ArchitecturalProject } from "@/lib/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ArchitecturalProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isOdd = index % 2 !== 0;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View project — ${project.title}`}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
    >
      {/* Image Wrapper */}
      <div 
        className={cn(
          "lg:col-span-7 relative overflow-hidden rounded-micro aspect-[4/3]",
          isOdd && "lg:order-last"
        )}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>

      {/* Text Wrapper */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="text-label-meta mb-4">
          {project.tag}
        </div>
        
        <h3 className="font-serif text-display-md font-normal text-foreground mb-4 group-hover:text-foreground/80 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-body text-muted-foreground mb-8">
          {project.location}
        </p>
        
        <div className="text-body-sm uppercase tracking-widest font-medium text-muted-foreground group-hover:text-accent transition-colors">
          View Project <span className="inline-block transform transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}