"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ReactNode } from "react"
import { themeIds, defaultTheme } from "@/lib/themes/config"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      themes={themeIds}
      enableSystem={false}
      storageKey="tanya-tanya-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
