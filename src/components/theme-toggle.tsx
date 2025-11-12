"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function getInitialTheme(): "dark" | "light" {
  // Prefer saved theme; otherwise fall back to system preference
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    const root = document.documentElement;
    if (initial === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem("theme", next);
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}