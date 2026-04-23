"use client";

export interface WebSocketMessage {
  type:
    | "questions_sync"
    | "new_question"
    | "question_update"
    | "user_connected"
    | "user_disconnected"
    | "user_typing"
    | "room_joined"
    | "join_room"
    | "leave_room";
  data?: unknown;
  userId?: string;
  isTyping?: boolean;
  timestamp?: string;
}

export interface Question {
  id: string;
  name: string;
  question: string;
  isViewed: boolean;
  timestamp?: string;
  createAt?: string;
}

export interface QuestionsSync {
  questions: Question[];
  timestamp: string;
  total: number;
}

export interface UserActivity {
  userId: string;
  timestamp: string;
  isTyping?: boolean;
}

type EventCallback = (data: unknown) => void;

class WebSocketManager {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, EventCallback[]> = new Map();
  private userId: string | null = null;
  private connectionType: "overlay" | "status" = "status";

  constructor() {
    // Don't auto-connect, wait for user ID
  }

  public connect(
    userId?: string,
    connectionType: "overlay" | "status" = "status",
  ) {
    if (userId) {
      this.userId = userId;
    }

    // Store connection type for reconnection
    this.connectionType = connectionType;

    if (!this.userId) {
      console.warn("Cannot connect WebSocket without userId");
      return;
    }

    try {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8788";
      const fullUrl = `${wsUrl}/${this.connectionType}/${this.userId}`;

      console.log("🔗 Connecting to WebSocket:", fullUrl);
      console.log("🔗 User ID:", this.userId);
      console.log("🔗 Connection Type:", this.connectionType);
      this.socket = new WebSocket(fullUrl);

      this.setupEventListeners();
    } catch (error) {
      console.error("WebSocket connection failed:", error);
      this.handleReconnect();
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.onopen = () => {
      console.log("✅ WebSocket connected");
      this.reconnectAttempts = 0;
      this.emit("connection", { status: "connected" });

      // Send join room message
      this.send({
        type: "join_room",
        userId: this.userId!,
      });
    };

    this.socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
      this.emit("connection", { status: "disconnected" });
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket connection error:", error);
      this.handleReconnect();
    };

    this.socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  }

  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case "questions_sync":
        console.log("🔄 Questions synced");
        this.emit("questions_sync", message.data);
        break;

      case "new_question":
        console.log("📩 New question received:", message.data);
        this.emit("new_question", message.data);
        break;

      case "question_update":
        console.log("🔄 Question updated:", message.data);
        this.emit("question_update", message.data);
        break;

      case "user_connected":
        console.log("👋 User connected:", message.userId);
        this.emit("user_connected", message);
        break;

      case "user_disconnected":
        console.log("👋 User disconnected:", message.userId);
        this.emit("user_disconnected", message);
        break;

      case "user_typing":
        this.emit("user_typing", message);
        break;

      case "room_joined":
        console.log("✅ Room joined successfully:", message.userId);
        this.emit("room_joined", message);
        break;

      default:
        console.log("Unknown message type:", message.type);
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      this.emit("connection", {
        status: "failed",
        attempts: this.reconnectAttempts,
      });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`,
    );

    setTimeout(() => {
      this.connect(this.userId!, this.connectionType);
    }, delay);
  }

  // Send message to WebSocket
  private send(message: WebSocketMessage) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  // Join a room (for user-specific channels)
  public joinRoom(userId: string) {
    this.send({
      type: "join_room",
      userId: userId,
    });
    console.log(`🏠 Joined room for user: ${userId}`);
  }

  // Leave a room
  public leaveRoom(userId: string) {
    this.send({
      type: "leave_room",
      userId: userId,
    });
    console.log(`🚪 Left room for user: ${userId}`);
  }

  // Send typing indicator
  public sendTypingIndicator(userId: string, isTyping: boolean) {
    this.send({
      type: "user_typing",
      userId: userId,
      isTyping: isTyping,
    });
  }

  // Subscribe to events
  public on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  // Unsubscribe from events
  public off(event: string, callback?: EventCallback) {
    if (!callback) {
      this.listeners.delete(event);
      return;
    }

    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // Emit events to listeners
  private emit(event: string, data: unknown) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(
            `Error in WebSocket event listener for ${event}:`,
            error,
          );
        }
      });
    }
  }

  // Get connection status
  public isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  // Disconnect
  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.listeners.clear();
  }
}

// Singleton instance
export const webSocketManager = new WebSocketManager();

// React hook for WebSocket
import { useEffect, useState, useCallback } from "react";

export function useWebSocket(userId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "failed"
  >("disconnected");

  useEffect(() => {
    if (!userId) return;

    // Connect to WebSocket using 'status' endpoint for new question events
    webSocketManager.connect(userId, "status");

    // Set up event listeners
    const handleConnection = (data: unknown) => {
      const connectionData = data as { status: string; attempts?: number };
      setIsConnected(connectionData.status === "connected");
      setConnectionStatus(
        connectionData.status as
          | "connecting"
          | "connected"
          | "disconnected"
          | "failed",
      );
    };

    const handleNewQuestion = (data: unknown) => {
      const questionData = data as Question;
      // Show browser notification if permission granted
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("📩 New Question!", {
          body: `From: ${questionData.name || "Anonymous"}\n${questionData.question}`,
          icon: "/logo-tanyain.webp",
        });
      }

      // Play notification sound (optional)
      try {
        const audio = new Audio("/notification-sound.mp3");
        audio.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        });
      } catch {
        // Ignore audio errors
      }
    };

    const handleQuestionUpdate = (data: unknown) => {
      const questionData = data as Question;
      console.log(
        `Question marked as ${questionData.isViewed ? "viewed" : "unread"}`,
      );
    };

    const handleQuestionsSync = (data: unknown) => {
      const syncData = data as QuestionsSync;
      setQuestions(syncData.questions);
    };

    const handleRoomJoined = (data: unknown) => {
      const roomData = data as { userId: string; timestamp: string };
      console.log("✅ Successfully joined room for user:", roomData.userId);
    };

    // Subscribe to events
    webSocketManager.on("connection", handleConnection);
    webSocketManager.on("new_question", handleNewQuestion);
    webSocketManager.on("question_update", handleQuestionUpdate);
    webSocketManager.on("questions_sync", handleQuestionsSync);
    webSocketManager.on("room_joined", handleRoomJoined);

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Cleanup on unmount
    return () => {
      webSocketManager.off("connection", handleConnection);
      webSocketManager.off("new_question", handleNewQuestion);
      webSocketManager.off("question_update", handleQuestionUpdate);
      webSocketManager.off("questions_sync", handleQuestionsSync);
      webSocketManager.off("room_joined", handleRoomJoined);
    };
  }, [userId]);

  const markAsViewed = useCallback(async (questionId: string) => {
    // This will trigger a question_update event via WebSocket
    // The actual API call should be made from the component
    return questionId;
  }, []);

  return {
    isConnected,
    questions,
    connectionStatus,
    markAsViewed,
    webSocketManager,
  };
}

// Legacy hook for backward compatibility
export function useWebSocketManager() {
  return webSocketManager;
}
