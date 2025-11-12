"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-black/10 dark:border-white/15 bg-white dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Left: mobile menu button + primary nav */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              aria-label="Toggle navigation"
              className="md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
              <Link href="/" className="text-zinc-900 dark:text-zinc-100 hover:underline">
                Home
              </Link>
              <Link href="/login" className="text-zinc-900 dark:text-zinc-100 hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-zinc-900 dark:text-zinc-100 hover:underline">
                Register
              </Link>
            </nav>
          </div>

          {/* Right: theme toggle + logo */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
              nextjs + supabase + shadcn
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden pb-3">
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-zinc-900 dark:text-zinc-100 py-1">
                Home
              </Link>
              <Link href="/login" className="text-zinc-900 dark:text-zinc-100 py-1">
                Login
              </Link>
              <Link href="/register" className="text-zinc-900 dark:text-zinc-100 py-1">
                Register
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}