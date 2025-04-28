
"use client"

import { createContext, useState, useContext, ReactNode, useEffect } from "react"
import clsx from "clsx"

type ToastType = "info" | "success" | "warning" | "error"

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const Toast: React.FC<{
  message: string
  type: ToastType
  onDismiss: () => void
}> = ({ message, type = "info", onDismiss }) => {
  const [state, setState] = useState<"enter" | "exit">("enter")

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setState("exit")
    }, 3000)

    const exitTimer = setTimeout(() => {
      onDismiss()
    }, 2300)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
    }
  }, [onDismiss])

  const backgroundColors: Record<ToastType, string> = {
    info: "bg-[#dbeafe]",
    success: "bg-[#bbf7d0]",
    warning: "bg-[#fef9c3]",
    error: "bg-[#fecaca]"
  }

  return (
    <div
      className={clsx(
        "flex flex-col items-start w-[360px] p-3 rounded-md border-2 text-black font-bold",
        "transition-all duration-300 ease-out",
        "border-black shadow-[6px_6px_0px_black]",
        backgroundColors[type],
        {
          "opacity-0 -translate-y-4": state === "exit",
          "opacity-100 translate-y-0": state === "enter"
        }
      )}
    >
      <div className="w-full">{message}</div>
      <div className="relative w-full h-1 bg-slate-500 mt-2 overflow-hidden rounded-full">
        <div className="absolute left-0 top-0 h-full bg-white animate-toastProgress" />
      </div>
    </div>
  )
}

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ message: string; type: ToastType }[]>([])

  const addToast = (message: string, type: ToastType = "info") => {
    setToasts((prevToasts) => [...prevToasts, { message, type }])
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToasts((prev) => prev.filter((_, i) => i !== index))}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export { ToastProvider, useToast }

