"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, MessageSquare, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_LINKS = [
    { name: "Work", href: "#work" },
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
                {/* Brand Logo - The "Cockpit" ID */}
                <Link
                    href="/"
                    className="text-lg md:text-xl font-bold tracking-tight text-foreground hover:text-foreground/80 transition-colors z-50 relative"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsMobileMenuOpen(false);
                    }}
                >
                    CALEB KIUNE
                </Link>

                {/* DESKTOP NAV - Minimalist Center */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* DESKTOP CTA - Right Wing */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="#contact"
                        className={cn(
                            buttonVariants({ size: "sm" }),
                            "bg-primary hover:bg-emerald-400 text-primary-foreground rounded-button font-semibold px-5 border-0 shadow-md shadow-black/[var(--shadow-strength)] transition-colors"
                        )}
                    >
                        <span className="flex items-center gap-2">
                            Let&apos;s Talk
                            <MessageSquare className="h-4 w-4" />
                        </span>
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
                        className="absolute top-full left-0 w-full bg-page border-b border-border shadow-2xl md:hidden flex flex-col pt-2 pb-8 px-6 gap-2"
                        style={{ height: "calc(100vh - 4rem)" }}
                    >
                        {/* Mobile Links List */}
                        <div className="flex flex-col space-y-1 pt-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-center justify-between py-4 border-b border-border-subtle text-lg font-medium text-foreground/70 hover:text-foreground hover:bg-surface px-2 rounded-sm transition-all"
                                >
                                    {link.name}
                                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Theme Toggle + CTA */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between px-2 py-3 border-b border-border-subtle">
                                <span className="text-sm text-muted-foreground font-medium">Theme</span>
                                <ThemeToggle />
                            </div>
                            <Link
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    buttonVariants({ size: "default" }),
                                    "w-full h-12 text-base bg-primary hover:bg-emerald-400 text-primary-foreground font-bold border-0 rounded-button transition-colors"
                                )}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Let&apos;s Talk
                                    <MessageSquare className="h-4 w-4" />
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}