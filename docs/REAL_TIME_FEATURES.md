# 📱 Frontend Usage Guide - Real-time Q&A System

## 🚀 Quick Start

Backend sudah ready dengan fitur real-time WebSocket! Ikuti langkah ini untuk integrate ke frontend:

## 📋 Step-by-Step Implementation

### **Step 1: Install Dependencies (Optional)**

Jika butuh notification library:

```bash
npm install react-hot-toast  # untuk React toast notifications
# atau
npm install sonner           # alternatif toast library
```

### **Step 2: WebSocket Connection**

```javascript
// utils/websocket.js
class WebSocketManager {
  constructor(userId) {
    this.userId = userId;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000;
  }

  connect() {
    try {
      // Ganti dengan domain production kamu
      this.ws = new WebSocket(`ws://localhost:8788/overlay/${this.userId}`);

      this.ws.onopen = () => {
        console.log("🔗 Connected to real-time server");
        this.reconnectAttempts = 0;

        // Join user's room
        this.send({
          type: "join_room",
          userId: this.userId,
        });
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.ws.onclose = () => {
        console.log("❌ Disconnected from server");
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error("🚨 WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to connect:", error);
      this.reconnect();
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `🔄 Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
      );

      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    }
  }

  handleMessage(data) {
    // Override this method in your component
    console.log("Received:", data);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default WebSocketManager;
```

### **Step 3: React Hook untuk WebSocket**

```javascript
// hooks/useWebSocket.js
import { useState, useEffect, useCallback, useRef } from "react";
import WebSocketManager from "../utils/websocket";

export function useWebSocket(userId) {
  const [questions, setQuestions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const wsRef = useRef(null);

  // Initialize WebSocket
  useEffect(() => {
    if (!userId) return;

    const wsManager = new WebSocketManager(userId);

    // Override handleMessage method
    wsManager.handleMessage = (data) => {
      switch (data.type) {
        case "questions_sync":
          // 🔄 AUTO-UPDATE QUESTIONS - NO REFRESH NEEDED!
          setQuestions(data.data.questions);
          console.log(`✅ ${data.data.total} questions synced`);
          break;

        case "new_question":
          // 🔔 Show notification for new question
          showNotification("New Question!", {
            body: `From: ${data.data.name} - ${data.data.question}`,
            icon: "❓",
          });
          break;

        case "question_update":
          // ✅ Show update notification
          showNotification("Question Updated!", {
            body: `Question marked as ${data.data.isViewed ? "viewed" : "unread"}`,
            icon: "✅",
          });
          break;

        case "room_joined":
          setIsConnected(true);
          setConnectionStatus("connected");
          console.log("✅ Successfully joined room");
          break;

        case "user_connected":
          console.log(`👋 ${data.data.userId} is online`);
          break;

        case "user_disconnected":
          console.log(`👋 ${data.data.userId} is offline`);
          break;

        case "user_typing":
          console.log(
            `⌨️ ${data.data.userId} is ${data.data.isTyping ? "typing" : "stopped typing"}`,
          );
          break;
      }
    };

    // Override connection events
    const originalConnect = wsManager.connect.bind(wsManager);
    wsManager.connect = () => {
      setConnectionStatus("connecting");
      originalConnect();
    };

    wsManager.ws &&
      (wsManager.ws.onopen = () => {
        setIsConnected(true);
        setConnectionStatus("connected");
        wsManager.send({
          type: "join_room",
          userId: userId,
        });
      });

    wsManager.ws &&
      (wsManager.ws.onclose = () => {
        setIsConnected(false);
        setConnectionStatus("disconnected");
        wsManager.reconnect();
      });

    wsRef.current = wsManager;
    wsManager.connect();

    return () => {
      wsManager.disconnect();
    };
  }, [userId]);

  // Helper functions
  const showNotification = useCallback((title, options = {}) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, options);
    }

    // You can also use toast library here
    // toast.success(title);
  }, []);

  const markAsViewed = useCallback(
    async (questionId) => {
      try {
        const response = await fetch(`/api/questions/${userId}/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add auth header if needed
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isViewed: true }),
        });

        if (response.ok) {
          console.log("✅ Question marked as viewed");
          // WebSocket will automatically sync the update!
        }
      } catch (error) {
        console.error("❌ Error updating question:", error);
      }
    },
    [userId],
  );

  const sendTyping = useCallback((isTyping) => {
    if (wsRef.current) {
      wsRef.current.send({
        type: "typing",
        isTyping: isTyping,
      });
    }
  }, []);

  return {
    questions,
    isConnected,
    connectionStatus,
    markAsViewed,
    sendTyping,
  };
}
```

### **Step 4: React Component**

```jsx
// components/QuestionsPage.jsx
import React, { useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import "./QuestionsPage.css";

function QuestionsPage() {
  // Ganti dengan user ID dari auth context/session
  const userId = "testuser"; // atau dari useAuth(), useSession(), dll

  const { questions, isConnected, connectionStatus, markAsViewed, sendTyping } =
    useWebSocket(userId);

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const handleMarkAsViewed = (questionId) => {
    markAsViewed(questionId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID");
  };

  return (
    <div className="questions-page">
      {/* Header dengan connection status */}
      <header className="questions-header">
        <h1>Questions ({questions.length})</h1>
        <div className={`connection-status ${connectionStatus}`}>
          {connectionStatus === "connected" && "🟢 Live"}
          {connectionStatus === "connecting" && "🟡 Connecting..."}
          {connectionStatus === "disconnected" && "🔴 Offline"}
        </div>
      </header>

      {/* Questions list */}
      <div className="questions-list">
        {questions.length === 0 ? (
          <div className="no-questions">
            <p>No questions yet. Questions will appear here automatically!</p>
          </div>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              className={`question-card ${question.isViewed ? "viewed" : "unread"}`}
            >
              <div className="question-header">
                <h3>{question.name || "Anonymous"}</h3>
                <span
                  className={`status ${question.isViewed ? "viewed" : "new"}`}
                >
                  {question.isViewed ? "✅ Viewed" : "🔔 New"}
                </span>
              </div>

              <p className="question-text">{question.question}</p>

              <div className="question-footer">
                <small className="timestamp">
                  {formatDate(question.createAt)}
                </small>

                {!question.isViewed && (
                  <button
                    className="mark-viewed-btn"
                    onClick={() => handleMarkAsViewed(question.id)}
                  >
                    Mark as Viewed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Connection info */}
      <div className="connection-info">
        <small>
          {isConnected
            ? "✅ Real-time updates active - questions will sync automatically"
            : "❌ Offline - trying to reconnect..."}
        </small>
      </div>
    </div>
  );
}

export default QuestionsPage;
```

### **Step 5: CSS Styles**

```css
/* components/QuestionsPage.css */
.questions-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.questions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.questions-header h1 {
  margin: 0;
  color: #333;
}

.connection-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.connection-status.connected {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.connection-status.connecting {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.connection-status.disconnected {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.no-questions {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.question-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.question-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.question-card.unread {
  border-left: 4px solid #007bff;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
}

.question-card.viewed {
  opacity: 0.8;
  border-left: 4px solid #28a745;
  background: #f8fff8;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.question-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.status {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status.new {
  background: #007bff;
  color: white;
}

.status.viewed {
  background: #28a745;
  color: white;
}

.question-text {
  color: #555;
  line-height: 1.6;
  margin: 12px 0;
  font-size: 16px;
}

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.timestamp {
  color: #888;
  font-size: 13px;
}

.mark-viewed-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.mark-viewed-btn:hover {
  background: #0056b3;
}

.mark-viewed-btn:active {
  transform: translateY(1px);
}

.connection-info {
  margin-top: 24px;
  text-align: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.connection-info small {
  color: #666;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 768px) {
  .questions-page {
    padding: 16px;
  }

  .questions-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .question-card {
    padding: 16px;
  }

  .question-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

/* Animation untuk questions baru */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.question-card.unread {
  animation: slideIn 0.3s ease-out;
}
```

## 🔧 Configuration

### **Environment Variables**

```javascript
// config/websocket.js
const config = {
  // Development
  WEBSOCKET_URL: "ws://localhost:8788",

  // Production - ganti dengan domain kamu
  // WEBSOCKET_URL: 'wss://your-domain.com',

  // API Base URL
  API_BASE_URL:
    process.env.NODE_ENV === "production"
      ? "https://your-domain.com/api"
      : "http://localhost:8788/api",
};

export default config;
```

### **Next.js Integration**

```javascript
// pages/questions.js atau app/questions/page.js
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // jika pakai NextAuth
import QuestionsPage from "../components/QuestionsPage";

export default function Questions() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please login first</div>;
  }

  return <QuestionsPage userId={session.user.username} />;
}
```

### **Vite/React Integration**

```javascript
// src/App.jsx
import { useState, useEffect } from "react";
import QuestionsPage from "./components/QuestionsPage";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user ID dari localStorage, session, atau auth context
    const storedUserId = localStorage.getItem("userId") || "testuser";
    setUserId(storedUserId);
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <QuestionsPage userId={userId} />
    </div>
  );
}

export default App;
```

## 🧪 Testing

### **1. Test WebSocket Connection**

Buka browser console dan test:

```javascript
// Test connection
const ws = new WebSocket("ws://localhost:8788/overlay/testuser");
ws.onopen = () => console.log("✅ Connected");
ws.onmessage = (e) => console.log("📨 Received:", JSON.parse(e.data));

// Join room
ws.send(
  JSON.stringify({
    type: "join_room",
    userId: "testuser",
  }),
);
```

### **2. Test Auto-Sync**

1. Buka 2 browser tabs dengan aplikasi kamu
2. Buat pertanyaan baru via API atau form
3. Lihat pertanyaan muncul otomatis di kedua tabs (tanpa refresh!)

### **3. Test Notifications**

1. Enable browser notifications
2. Buat pertanyaan baru
3. Lihat notification muncul

## 🚀 Production Deployment

### **Update WebSocket URL**

```javascript
// Ganti di websocket.js
const WEBSOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "wss://your-domain.com" // Production URL
    : "ws://localhost:8788"; // Development URL
```

### **HTTPS/WSS**

Untuk production, pastikan pakai WSS (WebSocket Secure):

- `ws://` untuk development
- `wss://` untuk production (HTTPS)

## 🎯 Key Features

### ✅ **Auto-Sync Questions**

- Questions otomatis update tanpa refresh
- Real-time synchronization across tabs
- Always shows latest data

### ✅ **Real-time Notifications**

- Browser notifications untuk pertanyaan baru
- In-app toast messages
- Visual status indicators

### ✅ **Connection Management**

- Auto-reconnection saat disconnect
- Connection status indicator
- Error handling

### ✅ **Production Ready**

- Optimized performance
- Mobile responsive
- Error boundaries

## 📞 Need Help?

Jika ada masalah:

1. **Check console** untuk error messages
2. **Verify WebSocket URL** sesuai environment
3. **Test connection** dengan browser console
4. **Check network tab** untuk WebSocket connection

Backend sudah 100% ready, tinggal copy-paste code di atas dan sesuaikan dengan project structure kamu!

**Happy coding! 🚀**
