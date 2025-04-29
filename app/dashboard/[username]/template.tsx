'use client'

import { Sidebar } from "@/components/sidebar/sidebar"
import { useParams } from "next/navigation"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const params = useParams<{ username: string }>()
  return (
    <html lang="id">
      <body className={` min-h-screen bg-[#f0f0f0]`}>
        <div className="md:flex  min-h-screen">
          <Sidebar username={params.username} />
          <div className="flex-1 flex flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
