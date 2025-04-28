import type React from "react";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css"
import { Providers } from "./provider/auth-provider";
import { QueryProvider } from "./provider/react-query";
import { SidebarStoreProvider } from "./provider/sidebar-store-provider";
import { ToastProvider } from "@/components/ui/toast";
const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanya-Tanya - Platform Q&A Terbaik",
  description:
    "Platform tanya jawab yang menghubungkan orang dengan pertanyaan dan mereka yang memiliki jawaban.",
  icons: {
    icon: "/icon.ico"
  }

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
            <html lang="id">
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
