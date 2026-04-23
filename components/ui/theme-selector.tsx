"use client"

import { useTheme } from "next-themes"
import { Check, Palette } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { themes } from "@/lib/themes/config"

export function ThemeSelector({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  if (!mounted) {
    return (
      <button
        className={`p-2 border-2 border-black bg-white ${className}`}
        aria-label="Select theme"
      >
        <Palette className="h-4 w-4" />
      </button>
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 border-2 border-border bg-secondary-background text-foreground hover:bg-foreground hover:text-secondary-background cursor-pointer ${className}`}
        aria-label="Select theme"
        aria-expanded={isOpen}
        style={{ transition: "none" }}
      >
        <Palette className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-secondary-background border-2 border-border shadow-shadow"
          style={{ zIndex: 9999, transition: "none" }}
        >
          <div className="p-2 border-b-2 border-border">
            <p className="text-xs font-bold uppercase text-foreground tracking-wide">
              Pilih Tema
            </p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 cursor-pointer border-b border-border/20 last:border-b-0 ${
                  theme === t.id
                    ? "bg-foreground/10"
                    : "hover:bg-foreground/5"
                }`}
                style={{ transition: "none" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 border-2 shrink-0"
                    style={{
                      backgroundColor: t.colors.accent,
                      borderColor: t.colors.border,
                      transition: "none",
                    }}
                  />
                  <span
                    className="text-sm font-bold text-foreground"
                    style={{ transition: "none" }}
                  >
                    {t.name}
                  </span>
                </div>
                {theme === t.id && (
                  <Check className="h-4 w-4 text-foreground shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
