import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import {
  Roboto_Mono,
  Poppins,
  Viga,
  Plus_Jakarta_Sans,
  Inter,
} from "next/font/google";

import "./globals.css";

import { Providers } from "./provider/auth-provider";
import { QueryProvider } from "./provider/react-query";
import { SidebarStoreProvider } from "./provider/sidebar-store-provider";
import { ToastProvider } from "@/components/ui/toast";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "./provider/theme-provider";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-poppins",
});

const viga = Viga({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-viga",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanya-tanyain.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Tanya-Tanya",
    template: "%s | Tanya-Tanya",
  },

  description:
    "Interaksi lebih seru dengan viewers. Kelola pertanyaan dari viewers dengan mudah dan tampilkan langsung di stream Anda.",

  applicationName: "Tanya-Tanya",

  keywords: [
    "Q&A",
    "Live Stream",
    "Twitch",
    "YouTube",
    "TikTok",
    "OBS",
    "Overlay",
    "Question",
    "Viewer",
    "Tanya-Tanya",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/icon.ico",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Tanya-Tanya",
    title: "Tanya-Tanya",
    description:
      "Interaksi lebih seru dengan viewers. Kelola pertanyaan dari viewers dengan mudah dan tampilkan langsung di stream Anda.",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Tanya-Tanya",
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tanya-Tanya",
    description:
      "Interaksi lebih seru dengan viewers. Kelola pertanyaan dari viewers dengan mudah dan tampilkan langsung di stream Anda.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <QueryProvider>
        <SidebarStoreProvider>
          <ToastProvider>
            <html
              lang="id"
              suppressHydrationWarning
              className={`${roboto.variable} ${poppins.variable} ${inter.variable} ${viga.variable} ${jakarta.variable}`}
            >
              <body className={roboto.className}>
                <Script
                  id="website-schema"
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      name: "Tanya-Tanya",
                      alternateName: "Tanya-Tanya Platform Q&A",
                      url: siteUrl,
                    }),
                  }}
                />

                <ThemeProvider>
                  <ErrorBoundary>{children}</ErrorBoundary>
                </ThemeProvider>
              </body>
            </html>
          </ToastProvider>
        </SidebarStoreProvider>
      </QueryProvider>
    </Providers>
  );
}
