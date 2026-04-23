import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getDataDashboard,
  getQuestion,
  TUpdateQuestion,
  updateActiveQuestion,
  userMe,
} from "./api";
import {
  TDataDashboardResponse,
  TQuestionResponse,
  TUserMeResponse,
} from "./type";
import { useWebSocket } from "@/lib/websocket";
import { useEffect } from "react";

export const useGetUserMe = (): UseQueryResult<TUserMeResponse> => {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: async () => await userMe(),
  });
};
export const useGetQuestion = (
  username: string,
): UseQueryResult<TQuestionResponse[]> => {
  return useQuery({
    queryKey: ["question", username],
    queryFn: async () => await getQuestion(username),
  });
};

// Real-time WebSocket hook for questions
export const useRealTimeQuestions = (userId?: string, username?: string) => {
  const queryClient = useQueryClient();
  const { webSocketManager } = useWebSocket(userId);

  useEffect(() => {
    if (!webSocketManager || !userId || !username) return;

    // Handle new question events - auto refresh questions
    const handleNewQuestion = (data: unknown) => {
      console.log("🔔 New question received, refreshing data...", data);

      // Invalidate and refetch questions
      queryClient.invalidateQueries({ queryKey: ["question", username] });
      queryClient.invalidateQueries({ queryKey: ["data-dashboard", userId] });

      // Show browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        const questionData = data as { name: string; question: string };
        new Notification("📩 Pertanyaan Baru!", {
          body: `Dari: ${questionData.name || "Anonymous"}\n${questionData.question}`,
          icon: "/logo-tanyain.webp",
          tag: "new-question",
        });
      }
    };

    // Handle question update events - auto refresh questions
    const handleQuestionUpdate = (data: unknown) => {
      console.log("🔄 Question updated, refreshing data...", data);

      // Invalidate and refetch questions
      queryClient.invalidateQueries({ queryKey: ["question", username] });
    };

    // Handle questions sync events - auto refresh all data
    const handleQuestionsSync = (data: unknown) => {
      console.log("🔄 Questions synced, refreshing all data...", data);

      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["question", username] });
      queryClient.invalidateQueries({ queryKey: ["data-dashboard", userId] });
    };

    // Subscribe to WebSocket events
    webSocketManager.on("new_question", handleNewQuestion);
    webSocketManager.on("question_update", handleQuestionUpdate);
    webSocketManager.on("questions_sync", handleQuestionsSync);

    return () => {
      // Cleanup event listeners
      webSocketManager.off("new_question", handleNewQuestion);
      webSocketManager.off("question_update", handleQuestionUpdate);
      webSocketManager.off("questions_sync", handleQuestionsSync);
    };
  }, [webSocketManager, userId, username, queryClient]);

  return { webSocketManager };
};
export const useUpdateActiveQuestion = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-active-question", id],
    mutationFn: async (payload: TUpdateQuestion) =>
      updateActiveQuestion(payload, id),
    onSuccess: () => {
      // Auto-refresh related data after successful update
      queryClient.invalidateQueries({ queryKey: ["question"] });
      queryClient.invalidateQueries({ queryKey: ["data-dashboard", id] });
    },
  });
};
export const useGetDashboardData = (
  id: string,
): UseQueryResult<TDataDashboardResponse> => {
  return useQuery({
    queryKey: ["data-dashboard", id],
    queryFn: async () => await getDataDashboard(id),
    enabled: !!id, // Only run query when id is available
  });
};
