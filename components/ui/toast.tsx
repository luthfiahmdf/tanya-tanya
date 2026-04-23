"use client"

import { createContext, useState, useContext, ReactNode, useEffect } from "react"
import clsx from "clsx"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "info" | "success" | "warning" | "error"

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const toastIcons: Record<ToastType, React.ReactNode> = {
  info: <Info className="h-4 w-4 shrink-0" />,
  success: <CheckCircle className="h-4 w-4 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 shrink-0" />,
  error: <AlertCircle className="h-4 w-4 shrink-0" />,
}

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

  return (
    <div
      className={clsx(
        "flex items-center gap-3 w-[360px] p-4 border-2 border-border bg-secondary-background text-foreground font-bold text-sm",
        "transition-all duration-300 ease-out",
        "shadow-shadow",
        {
          "opacity-0 -translate-y-4": state === "exit",
          "opacity-100 translate-y-0": state === "enter",
        }
      )}
    >
      {toastIcons[type]}
      <div className="flex-1">{message}</div>
      <button
        onClick={onDismiss}
        className="text-foreground font-black hover:opacity-60 transition-opacity text-xs"
      >
        X
      </button>
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
