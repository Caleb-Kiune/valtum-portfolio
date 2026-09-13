"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaBehance, FaWhatsapp } from "react-icons/fa6";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { FADE_UP, VIEWPORT } from "@/lib/motion";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-page border-t border-border pt-20 overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* THE BENTO FOOTER GRID */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={FADE_UP}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24"
                >

                    {/* CARD 1: IDENTITY (Span 5) */}
                    <div className="md:col-span-5 bg-surface border border-border rounded-micro p-8 flex flex-col h-full">

                        {/* Centered Content Block */}
                        <div className="flex-1 flex flex-col justify-center space-y-6">

                            {/* Studio Status */}
                            <div className="flex flex-col gap-3">
                                <div className="w-10 h-px bg-accent" />
                                <span className="text-sm tracking-wide text-foreground/70">
                                    Now Booking Select Projects
                                </span>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Creating <span className="text-foreground font-medium">thoughtful spaces and timeless living</span> for residential and commercial clients.
                            </p>
                        </div>

                        {/* Footer Section - Anchored to bottom */}
                        <div className="mt-8 pt-8 border-t border-divider">
                            <p className="text-sm text-muted-foreground/80">Nairobi, KE • UTC+3</p>
                        </div>
                    </div>

                    {/* CARD 2: SOCIAL MATRIX (Span 4) */}
                    <div className="md:col-span-4 bg-surface border border-border rounded-micro p-2">
                        <div className="grid grid-cols-2 gap-2 h-full">
                            {[
                                { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                                { icon: FaBehance, href: "https://behance.net", label: "Behance" },
                                { icon: FaWhatsapp, href: "https://wa.me/254741352159", label: "WhatsApp" }
                            ].map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    className="aspect-square flex flex-col items-center justify-center gap-2 bg-page hover:bg-surface-elevated rounded-micro transition-colors group border border-transparent hover:border-border-hover"
                                >
                                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                                    <span className="text-xs font-medium text-muted-foreground/80 group-hover:text-accent transition-colors">{social.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CARD 3: RESOURCES (Span 3) */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        {/* Email Contact */}
                        <a
                            href="mailto:erickwanjohi30@gmail.com"
                            className="flex-1 bg-surface border border-border rounded-micro p-6 flex flex-col justify-center items-center gap-3 hover:border-border-hover transition-colors group text-center"
                        >
                            <div className="p-3 rounded-full bg-surface-elevated group-hover:bg-accent group-hover:text-accent-foreground transition-all text-foreground/70">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-foreground">erickwanjohi30@gmail.com</span>
                        </a>

                        {/* Phone Contact */}
                        <a
                            href="tel:+254741352159"
                            className="flex-1 bg-surface border border-border rounded-micro p-6 flex flex-col justify-center items-center gap-2 text-center hover:border-border-hover transition-colors group"
                        >
                            <div className="p-3 rounded-full bg-surface-elevated group-hover:bg-accent group-hover:text-accent-foreground transition-all text-foreground/70">
                                <Phone className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-foreground">+254 741 352 159</span>
                        </a>
                    </div>
                </motion.div>

                {/* Copyright */}
                <div className="border-t border-border pt-8 pb-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/60 gap-4">
                    <p>© {currentYear} Valtum Interiors & Construction Ltd.</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>

            {/* Background Watermark */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.04]">
                <h1 className="font-serif text-[15vw] md:text-[12vw] text-foreground leading-none text-center tracking-tighter whitespace-nowrap select-none font-normal">
                    VALTUM
                </h1>
            </div>
        </footer>
    );
}