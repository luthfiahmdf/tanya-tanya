
import type React from "react"
import { Button } from "./button"

interface StatCardProps {
  title: string
  value?: number
  button?: boolean
  icon: React.ReactNode
  buttonName?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function StatCard({ onClick, title, value, icon, button = false, buttonName }: StatCardProps) {
  return (
    <div
      className="p-6 border-4 bg-background border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-black">{title}</h3>
          {button ? (
            <Button variant="neutral" className="cursor-pointer mt-2" onClick={onClick}>{buttonName}</Button>
          ) : (
            <p className="text-4xl font-bold mt-2 text-black">{value}</p>
          )}
        </div>
        <div className="bg-white p-4 border-4 border-black rounded-none">{icon}</div>
      </div>
    </div>
  )
}
