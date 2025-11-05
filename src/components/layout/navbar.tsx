"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black dark:border-zinc-800 dark:supports-[backdrop-filter]:bg-black">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-sm bg-[--color-brand]" />
          <span className="text-sm font-semibold tracking-tight">LostLink</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-700 dark:text-zinc-300 md:flex">
          <Link href="#features" className="nav-link hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white">Features</Link>
          <Link href="#how-it-works" className="nav-link hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white">How it works</Link>
          <Link href="#faq" className="nav-link hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white">FAQ</Link>
        </nav>

        <div className="hidden md:block">
          <Link href="/register" className="inline-flex">
            <Button>Get Started</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-200 bg-white p-4 dark:bg-black dark:border-zinc-800 md:hidden">
          <div className="flex flex-col gap-2">
            <Link href="#features" className="nav-link" onClick={() => setOpen(false)}>Features</Link>
            <Link href="#how-it-works" className="nav-link" onClick={() => setOpen(false)}>How it works</Link>
            <Link href="#faq" className="nav-link" onClick={() => setOpen(false)}>FAQ</Link>
            <Link href="/register" className="mt-2 inline-flex" onClick={() => setOpen(false)}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
