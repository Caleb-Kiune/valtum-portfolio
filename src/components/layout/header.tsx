"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const NAV_LINKS = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Reviews", href: "#testimonials" },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // ── Scroll-linked header morph ──
    const { scrollY } = useScroll();

    // Interpolation range: 0px (top) → 100px (scrolled)
    const headerBg = useTransform(
        scrollY,
        [0, 100],
        ["hsla(40, 22%, 95%, 0)", "hsla(40, 22%, 95%, 1)"]
    );
    const headerBorder = useTransform(
        scrollY,
        [0, 100],
        ["hsla(37, 14%, 87%, 0)", "hsla(37, 14%, 87%, 1)"]
    );
    const navText = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.85)", "hsla(0, 0%, 42%, 1)"]
    );
    const brandText = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.95)", "hsla(0, 0%, 11%, 1)"]
    );
    const ctaBorder = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.3)", "hsla(37, 14%, 87%, 1)"]
    );
    const ctaText = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.85)", "hsla(0, 0%, 11%, 1)"]
    );

    // Boolean for mobile menu + any conditional class logic
    const [isScrolled, setIsScrolled] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

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
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ${
                isMobileMenuOpen ? "!bg-page !border-border" : ""
            } ${isScrolled ? "py-3" : "py-5"}`}
            style={{
                backgroundColor: isMobileMenuOpen ? undefined : headerBg,
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: isMobileMenuOpen ? undefined : headerBorder,
            }}
        >
            <div className="container mx-auto px-6 h-12 flex items-center justify-between relative z-50">
                {/* Brand Logo */}
                <motion.span style={{ color: isMobileMenuOpen ? undefined : brandText }} className="z-50 relative">
                    <Link
                        href="/"
                        className={`font-serif text-display-sm tracking-tight hover:text-accent transition-colors ${
                            isMobileMenuOpen ? "text-foreground" : ""
                        }`}
                        onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            if (pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                // Clear any active hash from URL
                                if (window.location.hash) {
                                    history.replaceState(null, "", "/");
                                }
                            }
                            // On subpages: let the default Link navigation to "/" proceed
                        }}
                    >
                        Valtum
                    </Link>
                </motion.span>

                {/* DESKTOP NAV - Minimalist Center */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map((link) => (
                        <motion.span key={link.name} style={{ color: navText }}>
                            <Link
                                href={link.href}
                                className="group relative text-body-sm font-medium hover:text-accent transition-colors py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                            </Link>
                        </motion.span>
                    ))}
                </nav>

                {/* DESKTOP CTA - Right Wing */}
                <div className="hidden md:flex items-center gap-3">
                    <motion.span
                        style={{
                            color: ctaText,
                            borderColor: ctaBorder,
                        }}
                        className="inline-flex"
                    >
                        <Link
                            href="#contact"
                            className="border border-inherit text-body-sm font-medium uppercase tracking-[0.1em] px-6 py-2.5 hover:border-accent hover:text-accent transition-colors"
                        >
                            Book a Consultation
                        </Link>
                    </motion.span>
                </div>

                {/* MOBILE TOGGLE */}
                <motion.button
                    className="md:hidden hover:opacity-80 relative z-50 p-1"
                    style={{
                        color: isMobileMenuOpen ? "hsl(0, 0%, 11%)" : brandText,
                    }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
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
        </motion.header>
    );
}