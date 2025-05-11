"use client"
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetOverlay } from "../overlay/hook";
import { ActiveQuestions } from "@/components/ui/active-question";
import { useGetOverlaySettings } from "../setting/hook";

type DataWs = {
  question?: string;
  sender?: string;
};

export function Overlay() {
  const params = useParams();
  const { data: initialData } = useGetOverlay(params.username as string);
  const [question, setQuestion] = useState<DataWs | null>(initialData ?? null);

  const { data: settings } = useGetOverlaySettings(params.username as string);

  useEffect(() => {
    if (initialData) setQuestion(initialData);
  }, [initialData]);

  useEffect(() => {
    const slug = params?.username as string;
    if (!slug) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/${slug}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Received via WebSocket:", data);

        if (data.question && data.sender) {
          setQuestion({ question: data.question, sender: data.sender });
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    return () => ws.close();
  }, [params?.username]);

  if (!question?.question || !question?.sender) return null;

  return (
    <ActiveQuestions
      overlay
      name={question.sender}
      question={question.question}
      bgColor={settings?.bgColor ?? "#fff"}
      textColor={settings?.textColor ?? "#000"}
      border={settings?.border}
      fontFamily={settings?.fontFamily}
    />
  );
}

