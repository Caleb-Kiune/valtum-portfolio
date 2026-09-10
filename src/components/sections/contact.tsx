"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2, Loader2, Send, Briefcase, Users, HelpCircle, Check, Mail, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { STAGGER_CONTAINER_VARIANTS, VIEWPORT_CONFIG } from "@/lib/motion";
import { z } from "zod";


const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    type: z.enum(["freelance", "fulltime", "other"], {
        message: "Please select an inquiry type",
    }),
    message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormErrors = {
    name?: string[];
    email?: string[];
    type?: string[];
    message?: string[];
};

export function Contact() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<"freelance" | "fulltime" | "other" | "">("");



    // Inquiry type options
    const inquiryOptions = [
        { id: "freelance", label: "Custom Software Project", icon: Briefcase },
        { id: "fulltime", label: "Hiring / Recruitment", icon: Users },
        { id: "other", label: "General Inquiry", icon: HelpCircle },
    ];

    const selectedOption = inquiryOptions.find(opt => opt.id === selectedType);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            type: selectedType || (formData.get("type") as string), // Prefer state
            message: formData.get("message") as string,
        };


        const validatedFields = formSchema.safeParse(data);

        if (!validatedFields.success) {
            setErrors(validatedFields.error.flatten().fieldErrors);
            setIsSubmitting(false);
            return;
        }

        const { name, email, type, message } = validatedFields.data;

        try {

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",

                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    name,
                    email,
                    type,
                    message,
                    subject: `New Contact from Portfolio: ${type} - ${name}`,
                    botcheck: false, // Standard Web3Forms bot protection
                }),
            });

            const result = await response.json();

            if (result.success) {
                setShowSuccess(true);
                // Reset form state optionally
                setSelectedType("");
            } else {
                setErrorMessage(result.message || "Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setErrorMessage("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const inputClasses = "w-full p-3.5 rounded-input border border-border-highlight focus:ring-2 focus:ring-primary outline-none transition-all bg-surface text-foreground placeholder:text-muted-foreground";

    return (
        <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={STAGGER_CONTAINER_VARIANTS}
            className="py-section md:py-section-lg border-t border-border bg-page"
        >
            <div className="container mx-auto px-6 max-w-6xl">
                <SectionHeading
                    title="Let's Connect"
                    subtitle="Whether you have a technical question or a project proposal, I’d love to hear from you."
                    className="mb-10"
                />

                <div className="w-full max-w-lg mx-auto">
                    {/* Direct Contact Cards - Zero Friction */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {/* Email Card */}
                        <a
                            href="mailto:calebkiune@gmail.com"
                            className="flex items-center gap-4 p-4 rounded-card bg-surface border border-border hover:bg-surface-elevated hover:border-border-highlight transition-all group"
                        >
                            <div className="h-10 w-10 shrink-0 rounded-inner bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground/80 group-hover:text-foreground">Email Me</h3>
                                <p className="text-xs text-muted-foreground">calebkiune@gmail.com</p>
                            </div>
                        </a>

                        {/* WhatsApp Card */}
                        <a
                            href="https://wa.me/254705774171"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-card bg-surface border border-border hover:bg-surface-elevated hover:border-border-highlight transition-all group"
                        >
                            <div className="h-10 w-10 shrink-0 rounded-inner bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                                <FaWhatsapp className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground/80 group-hover:text-foreground">WhatsApp</h3>
                                <p className="text-xs text-muted-foreground">+254 705 774 171</p>
                            </div>
                        </a>
                    </div>

                    <div className="bg-surface p-6 md:p-6 rounded-card border border-border">
                        {showSuccess ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                                <p className="text-muted-foreground">
                                    Thanks for reaching out. I&apos;ll be in touch shortly.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSuccess(false)}
                                    className="mt-4 border-border-highlight text-foreground/70 hover:bg-surface-elevated hover:text-foreground"
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground/70">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your full name"
                                        disabled={isSubmitting}
                                        className={cn(inputClasses, errors.name && "border-red-500 focus:ring-red-500")}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-400">{errors.name[0]}</p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground/70">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="caleb@example.com"
                                        disabled={isSubmitting}
                                        className={cn(inputClasses, errors.email && "border-red-500 focus:ring-red-500")}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-400">{errors.email[0]}</p>
                                    )}
                                </div>

                                {/* Inquiry Type Dropdown */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground/70">
                                        I am interested in...
                                    </label>

                                    {/* Hidden input for formData extraction if needed, though we use state */}
                                    <input type="hidden" name="type" value={selectedType} />

                                    <div className="relative">
                                        {/* Click outside overlay */}
                                        {isOpen && (
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsOpen(false)}
                                            />
                                        )}

                                        {/* Trigger Button */}
                                        <div
                                            onClick={() => !isSubmitting && setIsOpen(!isOpen)}
                                            className={cn(
                                                inputClasses,
                                                "cursor-pointer flex items-center justify-between",
                                                errors.type && "border-red-500 focus:ring-red-500",
                                                isSubmitting && "opacity-70 cursor-not-allowed"
                                            )}
                                        >
                                            <span className={cn(
                                                "flex items-center gap-2",
                                                selectedOption ? "text-foreground" : "text-muted-foreground"
                                            )}>
                                                {selectedOption ? (
                                                    <>
                                                        <selectedOption.icon className="h-4 w-4" />
                                                        {selectedOption.label}
                                                    </>
                                                ) : (
                                                    "Select an option"
                                                )}
                                            </span>
                                            <ChevronDown
                                                className={cn(
                                                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                                    isOpen && "rotate-180"
                                                )}
                                            />
                                        </div>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute top-full left-0 right-0 mt-2 z-20 bg-surface border border-border rounded-input overflow-hidden shadow-xl"
                                                >
                                                    {inquiryOptions.map((option) => {
                                                        const Icon = option.icon;
                                                        const isSelected = selectedType === option.id;
                                                        return (
                                                            <div
                                                                key={option.id}
                                                                onClick={() => {
                                                                    // Explicitly casting string to the union type
                                                                    setSelectedType(option.id as "freelance" | "fulltime" | "other");
                                                                    setIsOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors",
                                                                    isSelected
                                                                        ? "bg-primary/10 text-primary"
                                                                        : "text-foreground/70 hover:bg-surface-elevated"
                                                                )}
                                                            >
                                                                <span className="flex items-center gap-3">
                                                                    <Icon className="h-4 w-4" />
                                                                    {option.label}
                                                                </span>
                                                                {isSelected && (
                                                                    <Check className="h-4 w-4" />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {errors.type && (
                                        <p className="text-sm text-red-400">{errors.type[0]}</p>
                                    )}
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-foreground/70">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your project..."
                                        rows={4}
                                        disabled={isSubmitting}
                                        className={cn(inputClasses, errors.message && "border-red-500 focus:ring-red-500")}
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-red-400">{errors.message[0]}</p>
                                    )}
                                </div>

                                {errorMessage && (
                                    <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-inner text-sm text-red-400">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-auto py-4 md:py-3 inline-flex items-center justify-center rounded-button bg-foreground text-page text-sm font-semibold uppercase tracking-wide shadow-md shadow-black/[var(--shadow-strength)] transition-colors hover:bg-foreground/90 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
                                >
                                    <span className="flex items-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </span>
                                </button>

                                {/* Privacy Footer */}
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    I read every message personally.
                                </p>


                            </form>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
