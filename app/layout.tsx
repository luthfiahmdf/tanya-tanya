import type React from "react";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider/auth-provider";
import { QueryProvider } from "./provider/react-query";
import { Toaster } from "sonner";
import { SidebarStoreProvider } from "./provider/sidebar-store-provider";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanya-Tanya - Platform Q&A Terbaik",
  description:
    "Platform tanya jawab yang menghubungkan orang dengan pertanyaan dan mereka yang memiliki jawaban.",
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
          <html lang="id">
            <body className={roboto.className}>
              {children}
              <Toaster position="top-center" richColors />
            </body>
          </html>
        </SidebarStoreProvider>
      </QueryProvider>
    </Providers>
  );
}
