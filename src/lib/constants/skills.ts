export interface SkillCategory {
    title: string;
    skills: string[];
}

export const SKILLS_DATA: SkillCategory[] = [
    {
        title: "Frontend Ecosystem",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    {
        title: "Backend Infrastructure",
        skills: ["Node.js", "PostgreSQL", "REST APIs"]
    },
    {
        title: "Business & Tools",
        skills: ["M-Pesa / Daraja API", "WhatsApp Business API", "Google Analytics", "Technical SEO"]
    }
];
