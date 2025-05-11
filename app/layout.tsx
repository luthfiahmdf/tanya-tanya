
import type React from "react";
import type { Metadata } from "next";
import { Roboto_Mono, Poppins, Viga, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider/auth-provider";
import { QueryProvider } from "./provider/react-query";
import { SidebarStoreProvider } from "./provider/sidebar-store-provider";
import { ToastProvider } from "@/components/ui/toast";

const roboto = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500",], variable: "--font-poppins" });
const viga = Viga({ subsets: ["latin"], weight: ["400"], variable: "--font-viga" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["500"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["500"] })

export const metadata: Metadata = {
  title: "Tanya-Tanya - Platform Q&A Terbaik",
  description:
    "Platform tanya jawab yang menghubungkan orang dengan pertanyaan dan mereka yang memiliki jawaban.",
  icons: {
    icon: "/icon.ico",
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
            <html lang="id" className={`${roboto.variable} ${poppins.variable} ${inter.variable} ${viga.variable} ${jakarta.variable}`}>
              <body className={roboto.className}>
                {children}
              </body>
            </html>
          </ToastProvider>
        </SidebarStoreProvider>
      </QueryProvider>
    </Providers>
  );
}

