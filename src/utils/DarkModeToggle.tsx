import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const dark = saved === "dark" || (!saved && prefersDark);
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                className="rounded-full cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle dark mode"
            >
                {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
        </div>
    );
};