"use client"
import { User } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type ActiveQuestionProps = {
  name?: string
  question?: string
  bgColor?: string
  textColor?: string
  border?: boolean
  fontFamily?: string
  overlay?: boolean
}

export function ActiveQuestions({
  overlay = false,
  name,
  question,
  border,
  bgColor,
  textColor,
  fontFamily
}: ActiveQuestionProps) {

  return (
    <AnimatePresence mode="wait">

      <motion.div
        className={`p-4 ${border ? 'border-2 border-black' : ''}`}
        style={{
          boxShadow: border ? "8px 8px 0px 0px rgba(0,0,0,1)" : "none",
          backgroundColor: bgColor
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
          duration: 0.2
        }}
        key={question} // Penting untuk animasi saat konten berubah
      >
        {!overlay && (
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Pertanyaan Aktif
            </h2>
          </div>
        )}

        <div
          className="p-3"
          style={{
            color: textColor,
            fontFamily: fontFamily
          }}
        >
          <motion.h3
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {question}
          </motion.h3>

          {name && (
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="text-xs">@{name}</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
