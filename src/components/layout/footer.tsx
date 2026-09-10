import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { Download, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-page border-t border-border pt-20 overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* THE BENTO FOOTER GRID */}
                <ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">

                        {/* CARD 1: IDENTITY (Span 5) */}
                        <div className="md:col-span-5 bg-surface border border-border rounded-card p-8 flex flex-col h-full">

                            {/* Centered Content Block */}
                            <div className="flex-1 flex flex-col justify-center space-y-6">

                                {/* Status Indicator */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-border-highlight text-primary text-xs font-mono font-medium tracking-wide w-fit">
                                    <span className="inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    <span className="text-foreground/70">Active &amp; Building</span>
                                </div>

                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Building <span className="text-foreground font-medium">resilient digital infrastructure</span> for Kenyan and global businesses.
                                </p>
                            </div>

                            {/* Footer Section - Anchored to bottom */}
                            <div className="mt-8 pt-8 border-t border-border-subtle">
                                <p className="text-sm text-muted-foreground/80">Nairobi, KE • UTC+3</p>
                            </div>
                        </div>

                        {/* CARD 2: SOCIAL MATRIX (Span 4) */}
                        <div className="md:col-span-4 bg-surface border border-border rounded-card p-2">
                            <div className="grid grid-cols-2 gap-2 h-full">
                                {[
                                    { icon: FaGithub, href: "https://github.com/Caleb-Kiune", label: "GitHub" },
                                    { icon: FaLinkedin, href: "https://www.linkedin.com/in/caleb-kiune-b356a6327/", label: "LinkedIn" },
                                    { icon: FaTwitter, href: "https://x.com/calebkiune", label: "X" },
                                    { icon: FaWhatsapp, href: "https://wa.me/254705774171", label: "WhatsApp" }
                                ].map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        className="aspect-square flex flex-col items-center justify-center gap-2 bg-page hover:bg-surface-elevated rounded-card transition-colors group border border-transparent hover:border-border-highlight"
                                    >
                                        <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <span className="text-xs font-medium text-muted-foreground/80 group-hover:text-primary transition-colors">{social.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CARD 3: RESOURCES (Span 3) */}
                        <div className="md:col-span-3 flex flex-col gap-6">
                            {/* CV Download */}
                            <Link
                                href="/caleb-kiune-cv.pdf"
                                target="_blank"
                                className="flex-1 bg-surface border border-border rounded-card p-6 flex flex-col justify-center items-center gap-3 hover:border-border-highlight transition-colors group text-center"
                            >
                                <div className="p-3 rounded-full bg-surface-elevated group-hover:bg-primary group-hover:text-black transition-all text-foreground/70">
                                    <Download className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-foreground">Download CV</span>
                            </Link>

                            {/* Legal Badge */}
                            <div className="flex-1 bg-surface border border-border rounded-card p-6 flex flex-col justify-center items-center gap-2 text-center">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-xs text-muted-foreground/80">Data Privacy Compliant<br />(DPA 2019)</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Copyright */}
                <div className="border-t border-border pt-8 pb-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/60 gap-4">
                    <p>© {currentYear} Kiune Technologies.</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>

            {/* Background Watermark */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02]">
                <h1 className="text-[15vw] md:text-[12vw] font-bold text-foreground leading-none text-center tracking-tighter whitespace-nowrap select-none">
                    KIUNE
                </h1>
            </div>
        </footer>
    );
}