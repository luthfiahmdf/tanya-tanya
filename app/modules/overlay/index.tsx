"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetOverlay } from "../overlay/hook";
import { ActiveQuestions } from "@/components/ui/active-question";

type DataWs = {
  question?: string;
  sender?: string;
};

export function Overlay() {
  const params = useParams();
  const { data: initialData, } = useGetOverlay(params.username as string);
  const [question, setQuestion] = useState<DataWs | null | undefined>(initialData);
  useEffect(() => {
    if (initialData) {
      setQuestion(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const slug = params?.username as string;
    if (!slug) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/${slug}`);

    // ws.onopen = () => {
    //   console.log(" WebSocket connected");
    // };
    //
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

    // ws.onerror = (err) => {
    //   console.error(" WebSocket error:", err);
    // };
    //
    // ws.onclose = () => {
    //   console.log(" WebSocket closed");
    // };
    //
    return () => {
      ws.close();
    };
  }, [params?.username]);

  return (
    <ActiveQuestions overlay name={question?.sender} question={question?.question} />
  );
}

