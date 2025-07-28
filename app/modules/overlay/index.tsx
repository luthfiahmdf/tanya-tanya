"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useGetOverlay } from "../overlay/hook";
import { ActiveQuestions } from "@/components/ui/active-question";
import { useGetOverlaySettings } from "../setting/hook";

type DataWs = {
  question?: string;
  sender?: string;
};

export function Overlay() {
  const params = useParams();
  const username = params?.username?.toString();
  const wsRef = useRef<WebSocket | null>(null);

  const [question, setQuestion] = useState<DataWs | null>(null);
  const [displayQuestion, setDisplayQuestion] = useState<DataWs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: initialData } = useGetOverlay(username || '');
  const { data: settings } = useGetOverlaySettings(username || '');

  // Handle initial data and WebSocket updates
  useEffect(() => {
    if (!username) {
      setError("Username not found");
      return;
    }

    // Set initial data
    if (initialData) {
      setQuestion(initialData);
      setIsLoading(false);
    }

    // WebSocket connection
    const setupWebSocket = () => {
      try {
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/${username}`;
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.question && data.sender) {
              setQuestion({ question: data.question, sender: data.sender });
            }
          } catch (err) {
            console.error("Error parsing message:", err);
          }
        };

        wsRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          setError("Connection error");
        };

        wsRef.current.onclose = () => {
          // Implement reconnection logic here if needed
        };
      } catch (err) {
        console.error("WebSocket setup failed:", err);
        setError("Connection failed");
      }
    };

    setupWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [username, initialData]);

  // Delay display update for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayQuestion(question);
    }, 500);

    return () => clearTimeout(timer);
  }, [question]);

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <AnimatePresence mode="wait">

      <ActiveQuestions
        overlay
        name={displayQuestion?.sender}
        question={displayQuestion?.question}
        bgColor={settings?.bgColor}
        textColor={settings?.textColor}
        border={settings?.border}
        fontFamily={settings?.fontFamily}
      />
    </AnimatePresence>
  );
}
