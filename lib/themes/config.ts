export type ThemeColors = {
  background: string;
  secondaryBackground: string;
  foreground: string;
  border: string;
  accent: string;
  muted: string;
};

export type Theme = {
  id: string;
  name: string;
  colors: ThemeColors;
};

export const themes: Theme[] = [
  {
    id: "monochrome-light",
    name: "Monochrome Light",
    colors: {
      background: "#F5F5F5",
      secondaryBackground: "#FFFFFF",
      foreground: "#000000",
      border: "#000000",
      accent: "#F59E0B",
      muted: "#6b7280",
    },
  },
  {
    id: "monochrome-dark",
    name: "Monochrome Dark",
    colors: {
      background: "#1a1a1a",
      secondaryBackground: "#262626",
      foreground: "#e5e5e5",
      border: "#e5e5e5",
      accent: "#F59E0B",
      muted: "#a3a3a3",
    },
  },
  {
    id: "supabase",
    name: "Supabase",
    colors: {
      background: "#F0FDF4",
      secondaryBackground: "#FFFFFF",
      foreground: "#1E3A32",
      border: "#1E3A32",
      accent: "#3ECF8E",
      muted: "#6B7280",
    },
  },
  {
    id: "claude",
    name: "Claude",
    colors: {
      background: "#F4EDE4",
      secondaryBackground: "#FFFAF5",
      foreground: "#5A3825",
      border: "#5A3825",
      accent: "#CC785C",
      muted: "#8B7355",
    },
  },
  {
    id: "vercel",
    name: "Vercel",
    colors: {
      background: "#FAFAFA",
      secondaryBackground: "#FFFFFF",
      foreground: "#000000",
      border: "#000000",
      accent: "#0070F3",
      muted: "#666666",
    },
  },
  {
    id: "github",
    name: "GitHub",
    colors: {
      background: "#F6F8FA",
      secondaryBackground: "#FFFFFF",
      foreground: "#24292F",
      border: "#24292F",
      accent: "#8957E5",
      muted: "#656D76",
    },
  },
  {
    id: "stripe",
    name: "Stripe",
    colors: {
      background: "#F6F9FC",
      secondaryBackground: "#FFFFFF",
      foreground: "#0A2540",
      border: "#0A2540",
      accent: "#635BFF",
      muted: "#425466",
    },
  },
  {
    id: "linear",
    name: "Linear",
    colors: {
      background: "#F7F8F9",
      secondaryBackground: "#FFFFFF",
      foreground: "#16181D",
      border: "#16181D",
      accent: "#5E6AD2",
      muted: "#6B6F76",
    },
  },
  {
    id: "notion",
    name: "Notion",
    colors: {
      background: "#F7F6F3",
      secondaryBackground: "#FFFFFF",
      foreground: "#37352F",
      border: "#37352F",
      accent: "#EB5757",
      muted: "#787774",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: {
      background: "#282A36",
      secondaryBackground: "#44475A",
      foreground: "#F8F8F2",
      border: "#F8F8F2",
      accent: "#BD93F9",
      muted: "#6272A4",
    },
  },
  {
    id: "tailwind",
    name: "Tailwind",
    colors: {
      background: "#F1F5F9",
      secondaryBackground: "#FFFFFF",
      foreground: "#0F172A",
      border: "#0F172A",
      accent: "#06B6D4",
      muted: "#64748B",
    },
  },
  {
    id: "raycast",
    name: "Raycast",
    colors: {
      background: "#1A1A1E",
      secondaryBackground: "#252528",
      foreground: "#ECECEC",
      border: "#ECECEC",
      accent: "#FF6363",
      muted: "#929292",
    },
  },
  {
    id: "figma",
    name: "Figma",
    colors: {
      background: "#F5F5F5",
      secondaryBackground: "#FFFFFF",
      foreground: "#1E1E1E",
      border: "#1E1E1E",
      accent: "#A259FF",
      muted: "#6B6B6B",
    },
  },
  {
    id: "slack",
    name: "Slack",
    colors: {
      background: "#FFFFFF",
      secondaryBackground: "#F8F8F8",
      foreground: "#1D1C1D",
      border: "#1D1C1D",
      accent: "#611F69",
      muted: "#616061",
    },
  },
  {
    id: "twitter",
    name: "Twitter",
    colors: {
      background: "#FFFFFF",
      secondaryBackground: "#F7F9F9",
      foreground: "#0F1419",
      border: "#0F1419",
      accent: "#1D9BF0",
      muted: "#536471",
    },
  },
  {
    id: "arc",
    name: "Arc",
    colors: {
      background: "#F5F0EB",
      secondaryBackground: "#FFFFFF",
      foreground: "#1A1A2E",
      border: "#1A1A2E",
      accent: "#5B8DEF",
      muted: "#7A7A8E",
    },
  },
];

export const themeIds = themes.map((t) => t.id);
export const defaultTheme = "monochrome-light";
