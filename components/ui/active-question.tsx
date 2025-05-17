
"use client"

import { User } from "lucide-react"

type activeQuestion = {
  name?: string
  question?: string
  //  createdAt: string
  bgColor?: string
  textColor?: string
  border?: boolean
  fontFamily?: string
  overlay?: boolean
}

export function ActiveQuestions({ overlay = false, name, question, border, bgColor, textColor, fontFamily }: activeQuestion) {

  return (
    <div className="border-2 border-black  p-4 " style={{
      boxShadow: border ? "8px 8px 0px 0px rgba(0,0,0,1)" : "none",
      backgroundColor: bgColor
    }}>
      {
        overlay ? null : (
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Pertanyaan Aktif
            </h2>
          </div>
        )
      }


      <div className="p-3" style={{
        color: textColor,
        fontFamily: fontFamily
      }}>
        <h3 className="text-lg  ">{question}</h3>

        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="text-xs">@{name}</span>
          </div>
          {/* <div className="flex items-center gap-1"> */}
          {/*   <Clock className="h-3 w-3" /> */}
          {/*   <span className="text-xs">{createdAt}</span> */}
          {/* </div> */}

        </div>
      </div>
    </div>
  )
}
