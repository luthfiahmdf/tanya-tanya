"use client";

import { useState, useEffect } from "react";
import { Bell, X, MessageCircle } from "lucide-react";
import { Button } from "./button";
import { useWebSocket, Question, QuestionsSync } from "@/lib/websocket";

interface Notification {
  id: string;
  type: "new_question" | "question_update" | "questions_sync" | "connection";
  title: string;
  message: string;
  timestamp: Date;
  data?: Question | QuestionsSync;
}

interface RealTimeNotificationProps {
  userId?: string;
}

export function RealTimeNotification({ userId }: RealTimeNotificationProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { webSocketManager, isConnected } = useWebSocket(userId);

  useEffect(() => {
    // Listen for new questions
    const handleNewQuestion = (data: unknown) => {
      const question = data as Question;
      const notification: Notification = {
        id: `new_question_${question.id}_${Date.now()}`,
        type: "new_question",
        title: "Pertanyaan Baru!",
        message: `${question.name}: ${question.question.substring(0, 50)}${question.question.length > 50 ? "..." : ""}`,
        timestamp: new Date(),
        data: question,
      };

      setNotifications((prev) => [notification, ...prev.slice(0, 4)]); // Keep only 5 notifications
      setIsVisible(true);

      // Auto hide after 5 seconds
      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    };

    // Listen for question updates
    const handleQuestionUpdate = (data: unknown) => {
      const question = data as Question;
      const notification: Notification = {
        id: `update_question_${question.id}_${Date.now()}`,
        type: "question_update",
        title: "Pertanyaan Diperbarui",
        message: `Pertanyaan dari ${question.name} telah diperbarui`,
        timestamp: new Date(),
        data: question,
      };

      setNotifications((prev) => [notification, ...prev.slice(0, 4)]);
      setIsVisible(true);

      setTimeout(() => {
        removeNotification(notification.id);
      }, 3000);
    };

    // Listen for questions sync (MAIN EVENT)
    const handleQuestionsSync = (data: unknown) => {
      const syncData = data as QuestionsSync;
      const notification: Notification = {
        id: `questions_sync_${Date.now()}`,
        type: "questions_sync",
        title: "Data Tersinkronisasi",
        message: `${syncData.total} pertanyaan berhasil disinkronkan`,
        timestamp: new Date(),
        data: syncData,
      };

      setNotifications((prev) => [notification, ...prev.slice(0, 4)]);
      setIsVisible(true);

      setTimeout(() => {
        removeNotification(notification.id);
      }, 3000);
    };

    // Listen for connection status
    const handleConnection = (data: unknown) => {
      const connectionData = data as { status: string; reason?: string };

      if (connectionData.status === "connected") {
        const notification: Notification = {
          id: `connection_${Date.now()}`,
          type: "connection",
          title: "Terhubung",
          message: "Real-time notifications aktif",
          timestamp: new Date(),
        };

        setNotifications((prev) => [notification, ...prev.slice(0, 4)]);
        setIsVisible(true);

        setTimeout(() => {
          removeNotification(notification.id);
        }, 2000);
      } else if (connectionData.status === "disconnected") {
        const notification: Notification = {
          id: `disconnection_${Date.now()}`,
          type: "connection",
          title: "Terputus",
          message: "Mencoba menghubungkan kembali...",
          timestamp: new Date(),
        };

        setNotifications((prev) => [notification, ...prev.slice(0, 4)]);
        setIsVisible(true);
      }
    };

    if (webSocketManager) {
      webSocketManager.on("questions_sync", handleQuestionsSync);
      webSocketManager.on("new_question", handleNewQuestion);
      webSocketManager.on("question_update", handleQuestionUpdate);
      webSocketManager.on("connection", handleConnection);

      return () => {
        webSocketManager.off("questions_sync", handleQuestionsSync);
        webSocketManager.off("new_question", handleNewQuestion);
        webSocketManager.off("question_update", handleQuestionUpdate);
        webSocketManager.off("connection", handleConnection);
      };
    }
  }, [webSocketManager]);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setIsVisible(false);
  };

  if (!isVisible || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-900">
            Notifikasi Real-time
          </span>
        </div>
        <Button
          variant="neutral"
          size="sm"
          onClick={clearAllNotifications}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Notifications */}
      {notifications.map((notification) => {
        const getNotificationStyle = (type: string) => {
          switch (type) {
            case "new_question":
              return {
                border: "border-l-4 border-l-green-500",
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
              };
            case "question_update":
              return {
                border: "border-l-4 border-l-blue-500",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
              };
            case "questions_sync":
              return {
                border: "border-l-4 border-l-purple-500",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
              };
            case "connection":
              return {
                border: "border-l-4 border-l-gray-500",
                iconBg: "bg-gray-100",
                iconColor: "text-gray-600",
              };
            default:
              return {
                border: "border-l-4 border-l-blue-500",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
              };
          }
        };

        const style = getNotificationStyle(notification.type);

        return (
          <div
            key={notification.id}
            className={`bg-white border rounded-lg p-4 shadow-lg transform transition-all duration-300 ease-in-out ${style.border}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-1 rounded-full ${style.iconBg}`}>
                  <MessageCircle className={`h-4 w-4 ${style.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-gray-600 break-words">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <Button
                variant="neutral"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="h-6 w-6 p-0 ml-2 flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );
      })}

      {/* Connection Status Indicator */}
      <div className="flex items-center justify-center">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            isConnected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {isConnected ? "Terhubung" : "Terputus"}
        </div>
      </div>
    </div>
  );
}
