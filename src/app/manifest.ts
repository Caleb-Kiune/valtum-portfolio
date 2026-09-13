import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Valtum Interiors & Construction",
        short_name: "Valtum",
        description: "Interior Architecture & Project Management. Specializing in space planning, 3D modelling, and site coordination.",
        start_url: "/",
        display: "standalone",
        background_color: "#F7F5F0",
        theme_color: "#1C1C1C",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
