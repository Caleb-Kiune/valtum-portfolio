import { PROJECTS } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CaseStudyLayout } from "@/components/work/case-study-layout";

// Force static generation for these paths
export function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Case Study`,
        description: project.subtitle,
        openGraph: {
            title: `${project.title} | Case Study`,
            description: project.subtitle,
            images: [
                {
                    url: project.heroImage.src,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <CaseStudyLayout project={project} />;
}
