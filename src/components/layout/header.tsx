"use client";

import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#testimonials" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll state for glass effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-page border-b border-border py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 h-12 flex items-center justify-between relative z-50">
                {/* Brand Logo */}
                <Link
                    href="/"
                    className="font-serif text-display-sm tracking-tight text-foreground hover:text-accent transition-colors z-50 relative"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsMobileMenuOpen(false);
                    }}
                >
                    Valtum
                </Link>

                {/* DESKTOP NAV - Minimalist Center */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group relative text-body-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        </Link>
                    ))}
                </nav>

                {/* DESKTOP CTA - Right Wing */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="#contact"
                        className="border border-border text-body-sm font-medium uppercase tracking-[0.1em] px-6 py-2.5 hover:border-accent hover:text-accent transition-colors"
                    >
                        Book a Consultation
                    </Link>
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    className="md:hidden text-foreground/80 hover:text-foreground relative z-50 p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* ROBUST MOBILE MENU - Absolute Dropdown (No Transparency Glitch) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full bg-page border-b border-border md:hidden flex flex-col pt-2 pb-8 px-6 gap-2"
                        style={{ height: "calc(100vh - 4rem)" }}
                    >
                        {/* Mobile Links List */}
                        <div className="flex flex-col space-y-1 pt-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-center justify-between py-4 border-b border-divider text-lg font-medium text-muted-foreground hover:text-foreground transition-all"
                                >
                                    {link.name}
                                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-accent transition-colors" />
                                </Link>
                            ))}
                        </div>

                        {/* Mobile CTA */}
                        <div className="mt-8 space-y-4 flex">
                            <Link
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center border border-border text-body-sm font-medium uppercase tracking-[0.1em] px-6 py-4 hover:border-accent hover:text-accent transition-colors"
                            >
                                Book a Consultation
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}