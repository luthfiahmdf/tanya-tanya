
"use client"

import { User } from "lucide-react"

type activeQuestion = {
  name?: string
  question?: string
  //  createdAt: string
  overlay?: boolean
}

export function ActiveQuestions({ overlay = false, name, question, }: activeQuestion) {


  return (
    <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {
        overlay ? null : (
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Pertanyaan Aktif
            </h2>
          </div>
        )
      }


      <div className="border-2 border-black p-3">
        <h3 className="text-lg font-bold">{question}</h3>

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
