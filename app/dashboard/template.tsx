'use client'

import { Sidebar } from "@/components/sidebar/sidebar"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <div className="md:flex  min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
