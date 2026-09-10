import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kiune Technologies",
        short_name: "Kiune Tech",
        description: "Reliable digital infrastructure for Kenyan businesses.",
        start_url: "/",
        display: "standalone",
        background_color: "#0F172A",
        theme_color: "#0F172A",
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
