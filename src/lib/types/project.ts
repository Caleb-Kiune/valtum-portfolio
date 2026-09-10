import { StaticImageData } from "next/image";

export interface ProjectCaseStudy {
    id: string; // Internal ID
    slug: string; // URL friendly slug (e.g., "kentab-insurance")
    title: string;
    tag: string; // Small uppercase category (e.g. "FinTech")
    subtitle: string; // The Hook (Big text on card)
    heroImage: StaticImageData;

    // The "At A Glance" Sidebar Data
    client: string;
    role: string;
    timeline: string;
    stack: string[]; // Tech used

    // Deep Dive Data
    challenge: string[]; // Business Problem (Array of paragraphs)
    solution: string[]; // Technical Approach (Array of paragraphs)

    // Media
    // gallery: StaticImageData[]; // Removed as unused

    // Links
    liveUrl?: string; // "Visit Live Site"
    repoUrl?: string; // "View Source" (Optional)
    technicalHighlights: string[];
}
