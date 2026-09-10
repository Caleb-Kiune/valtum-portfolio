import { StaticImageData } from "next/image";

export interface Project {
    id: string;
    title: string;
    category: string;
    image: string | StaticImageData;
    description: string;
    metric: string;
    stack: string[];
    demoUrl?: string;
    repoUrl?: string;
}

export type IconName = "Smartphone" | "Code" | "Zap" | "TrendingUp" | "Rocket" | "Layout" | "Server" | "Database" | "Globe";

export interface Service {
    title: string;
    description: string;
    icon?: IconName;
}
