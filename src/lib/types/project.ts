import { StaticImageData } from "next/image";

export interface ArchitecturalProject {
    id: string; // Internal ID
    slug: string; // URL friendly slug
    title: string;
    tag: string; // Category like "Commercial", "Residential"
    subtitle: string; // Hook text
    heroImage: StaticImageData | string; // Allow string for placeholders

    // Architectural Data
    client: string;
    location: string;
    type: string; // e.g., "Commercial project"
    designStyle: string; // e.g., "Modern coastal"
    siteArea?: string; // Optional e.g., "465m²"
    timeline: string;

    // Optional arrays for future use (empty strings/placeholders for now)
    gallery?: (StaticImageData | string)[];
    floorPlans?: (StaticImageData | string)[];
    moodboard?: (StaticImageData | string)[];
}
