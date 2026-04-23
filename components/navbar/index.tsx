"use client";

import { MessageCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { ThemeSelector } from "@/components/ui/theme-selector";

export const Navbar = (): ReactElement => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b-4 border-border bg-secondary-background p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-foreground p-1.5 border-2 border-border">
            <MessageCircle className="h-5 w-5 text-secondary-background" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tight text-foreground">Tanya-Tanya</h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "#features", label: "Fitur" },
            { href: "#how-it-works", label: "Cara Kerja" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 font-bold text-foreground hover:bg-foreground hover:text-secondary-background transition-colors uppercase text-sm border-2 border-transparent hover:border-border"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth + theme */}
        <div className="hidden md:flex gap-3 items-center">
          <ThemeSelector />
          <Link
            href="/login"
            className="px-5 py-2.5 font-bold text-foreground border-2 border-border hover:bg-foreground hover:text-secondary-background transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 font-bold bg-foreground text-secondary-background border-2 border-border shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSelector />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 border-2 border-border bg-secondary-background text-foreground hover:bg-foreground hover:text-secondary-background transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 border-t-2 border-border pt-4 flex flex-col gap-2">
          {[
            { href: "#features", label: "Fitur" },
            { href: "#how-it-works", label: "Cara Kerja" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 font-bold text-foreground border-2 border-border hover:bg-foreground hover:text-secondary-background transition-colors uppercase text-sm text-center"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 px-4 py-3 font-bold text-foreground border-2 border-border hover:bg-foreground hover:text-secondary-background transition-colors text-center"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="flex-1 px-4 py-3 font-bold bg-foreground text-secondary-background border-2 border-border text-center shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
