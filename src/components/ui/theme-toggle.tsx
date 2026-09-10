"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch — only render after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render a placeholder to avoid layout shift
        return (
            <div className="w-9 h-9 rounded-button" aria-hidden="true" />
        );
    }

    // Cycle through: light → dark → system
    const cycleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else if (theme === "light") {
            setTheme("system");
        } else {
            setTheme("dark");
        }
    };

    const getIcon = () => {
        switch (theme) {
            case "light":
                return <Sun className="h-4 w-4" />;
            case "dark":
                return <Moon className="h-4 w-4" />;
            default:
                return <Monitor className="h-4 w-4" />;
        }
    };

    const getLabel = () => {
        switch (theme) {
            case "light":
                return "Switch to system theme";
            case "dark":
                return "Switch to light theme";
            default:
                return "Switch to dark theme";
        }
    };

    return (
        <button
            onClick={cycleTheme}
            className={cn(
                "relative inline-flex items-center justify-center w-9 h-9 rounded-button",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-surface-elevated",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            )}
            aria-label={getLabel()}
            title={getLabel()}
        >
            <span className="transition-transform duration-300 ease-in-out">
                {getIcon()}
            </span>
        </button>
    );
}
