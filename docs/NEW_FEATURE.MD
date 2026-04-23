# 🚀 Frontend Integration Guide - Real-time Q&A System

## ✅ Backend Ready! WebSocket Features Available

Backend sudah 100% siap dengan fitur real-time WebSocket! Frontend tinggal integrate untuk mendapatkan:

- 🔄 **Auto-sync questions** (no refresh needed!)
- 🔔 **Real-time notifications**
- 👥 **Multi-user live updates**
- ⚡ **Instant question status updates**

## 📡 Available WebSocket Events

### **🔄 Auto-Sync Events (UTAMA):**

#### **1. `questions_sync` - Complete Questions List**

```javascript
{
  type: "questions_sync",
  data: {
    questions: [
      {
        id: "019db41f-37c6-7719-b8bc-6feb7087187c",
        name: "User Name",
        question: "Question text",
        isViewed: false,
        createAt: "2026-04-22 07:37:18"
      }
      // ... all questions
    ],
    timestamp: "2026-04-22T07:37:18.000Z",
    total: 5
  }
}
```

#### **2. `new_question` - New Question Notification**

```javascript
{
  type: "new_question",
  data: {
    id: "question-id",
    name: "Sender Name",
    question: "Question text",
    isViewed: false,
    timestamp: "2026-04-22T07:37:18.000Z"
  }
}
```

#### **3. `question_update` - Question Status Update**

```javascript
{
  type: "question_update",
  data: {
    id: "question-id",
    name: "Sender Name",
    question: "Question text",
    isViewed: true,
    timestamp: "2026-04-22T07:37:18.000Z"
  }
}
```

### **👥 User Activity Events:**

#### **4. `user_connected` - User Online**

```javascript
{
  type: "user_connected",
  data: {
    userId: "user123",
    timestamp: "2026-04-22T07:37:18.000Z"
  }
}
```

#### **5. `user_disconnected` - User Offline**

```javascript
{
  type: "user_disconnected",
  data: {
    userId: "user123",
    timestamp: "2026-04-22T07:37:18.000Z"
  }
}
```

#### **6. `user_typing` - Typing Indicator**

```javascript
{
  type: "user_typing",
  data: {
    userId: "user123",
    isTyping: true,
    timestamp: "2026-04-22T07:37:18.000Z"
  }
}
```

#### **7. `room_joined` - Join Confirmation**

```javascript
{
  type: "room_joined",
  data: {
    userId: "user123",
    timestamp: "2026-04-22T07:37:18.000Z"
  }
}
```

## 🌐 Frontend Implementation

### **Step 1: WebSocket Connection**

```javascript
// Connect to WebSocket
const userId = "your-user-id"; // dari auth/session
const ws = new WebSocket(`ws://your-domain.com/overlay/${userId}`);

// Connection handlers
ws.onopen = () => {
  console.log("🔗 Connected to real-time server");

  // Join user's room
  ws.send(
    JSON.stringify({
      type: "join_room",
      userId: userId,
    }),
  );
};

ws.onclose = () => {
  console.log("❌ Disconnected from server");
  // Auto-reconnect logic here
};

ws.onerror = (error) => {
  console.error("🚨 WebSocket error:", error);
};
```

### **Step 2: Handle Real-time Events**

```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "questions_sync":
      // 🔄 AUTO-UPDATE QUESTIONS LIST - NO REFRESH NEEDED!
      updateQuestionsList(data.data.questions);
      showToast(`${data.data.total} questions synced`);
      break;

    case "new_question":
      // 🔔 Show notification for new question
      showNotification("New question received!", {
        title: `From: ${data.data.name}`,
        body: data.data.question,
        icon: "❓",
      });
      break;

    case "question_update":
      // ✅ Show question status update
      showToast(
        `Question marked as ${data.data.isViewed ? "viewed" : "unread"}`,
      );
      break;

    case "user_connected":
      // 👋 Show user online status
      showUserStatus(data.data.userId, "online");
      break;

    case "user_disconnected":
      // 👋 Show user offline status
      showUserStatus(data.data.userId, "offline");
      break;

    case "user_typing":
      // ⌨️ Show typing indicator
      showTypingIndicator(data.data.userId, data.data.isTyping);
      break;

    case "room_joined":
      // ✅ Confirm room joined
      console.log("✅ Successfully joined room");
      break;
  }
};
```

### **Step 3: Update UI Functions**

```javascript
// 🔄 Update questions list (NO REFRESH NEEDED!)
function updateQuestionsList(questions) {
  const container = document.getElementById("questions-container");

  // Clear existing
  container.innerHTML = "";

  // Add all questions
  questions.forEach((question) => {
    const element = createQuestionElement(question);
    container.appendChild(element);
  });

  // Update counter
  document.getElementById("questions-count").textContent = questions.length;
}

// 🎨 Create question element
function createQuestionElement(question) {
  const div = document.createElement("div");
  div.className = `question ${question.isViewed ? "viewed" : "unread"}`;
  div.innerHTML = `
    <div class="question-header">
      <h4>${question.name}</h4>
      <span class="status ${question.isViewed ? "viewed" : "new"}">
        ${question.isViewed ? "✅ Viewed" : "🔔 New"}
      </span>
    </div>
    <p class="question-text">${question.question}</p>
    <small class="timestamp">${formatDate(question.createAt)}</small>
    <button onclick="markAsViewed('${question.id}')" 
            ${question.isViewed ? "disabled" : ""}>
      Mark as Viewed
    </button>
  `;
  return div;
}

// 🔔 Show notifications
function showNotification(title, options = {}) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, options);
  }

  // Also show in-app toast
  showToast(title);
}

// 🍞 Show toast messages
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// 👥 Show user status
function showUserStatus(userId, status) {
  const indicator = document.getElementById(`user-${userId}-status`);
  if (indicator) {
    indicator.className = `user-status ${status}`;
    indicator.textContent = status === "online" ? "🟢" : "⚫";
  }
}

// ⌨️ Show typing indicator
function showTypingIndicator(userId, isTyping) {
  const indicator = document.getElementById("typing-indicator");
  if (isTyping) {
    indicator.textContent = `${userId} is typing...`;
    indicator.style.display = "block";
  } else {
    indicator.style.display = "none";
  }
}
```

### **Step 4: Send Messages to Server**

```javascript
// 📤 Send typing status
function sendTyping(isTyping) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "typing",
        isTyping: isTyping,
      }),
    );
  }
}

// 🚪 Leave room
function leaveRoom() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "leave_room",
        userId: userId,
      }),
    );
  }
}

// ✅ Mark question as viewed
async function markAsViewed(questionId) {
  try {
    const response = await fetch(`/api/questions/${userId}/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ isViewed: true }),
    });

    if (response.ok) {
      // WebSocket will automatically sync the update!
      console.log("✅ Question marked as viewed");
    }
  } catch (error) {
    console.error("❌ Error updating question:", error);
  }
}
```

## ⚛️ React Implementation

```jsx
import { useState, useEffect, useCallback } from "react";

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState(null);

  const userId = "your-user-id"; // dari auth context

  // WebSocket connection
  useEffect(() => {
    const websocket = new WebSocket(`ws://your-domain.com/overlay/${userId}`);

    websocket.onopen = () => {
      setIsConnected(true);
      websocket.send(
        JSON.stringify({
          type: "join_room",
          userId: userId,
        }),
      );
    };

    websocket.onclose = () => {
      setIsConnected(false);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "questions_sync":
          // 🔄 AUTO-UPDATE - NO REFRESH NEEDED!
          setQuestions(data.data.questions);
          break;

        case "new_question":
          // 🔔 Show notification
          showNotification("New question!", data.data);
          break;

        case "question_update":
          // ✅ Show update notification
          showToast("Question updated!");
          break;
      }
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [userId]);

  const markAsViewed = useCallback(
    async (questionId) => {
      try {
        await fetch(`/api/questions/${userId}/${questionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isViewed: true }),
        });
        // WebSocket will auto-sync the update!
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [userId],
  );

  return (
    <div className="questions-page">
      <header>
        <h1>Questions ({questions.length})</h1>
        <div
          className={`connection-status ${isConnected ? "connected" : "disconnected"}`}
        >
          {isConnected ? "🟢 Live" : "🔴 Offline"}
        </div>
      </header>

      <div className="questions-list">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`question ${question.isViewed ? "viewed" : "unread"}`}
          >
            <div className="question-header">
              <h3>{question.name}</h3>
              <span
                className={`status ${question.isViewed ? "viewed" : "new"}`}
              >
                {question.isViewed ? "✅ Viewed" : "🔔 New"}
              </span>
            </div>
            <p>{question.question}</p>
            <small>{new Date(question.createAt).toLocaleString()}</small>
            {!question.isViewed && (
              <button onClick={() => markAsViewed(question.id)}>
                Mark as Viewed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🎨 CSS Styles

```css
/* Connection status */
.connection-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.connection-status.connected {
  background: #d4edda;
  color: #155724;
}

.connection-status.disconnected {
  background: #f8d7da;
  color: #721c24;
}

/* Questions */
.question {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  transition: all 0.3s ease;
}

.question.unread {
  border-left: 4px solid #007bff;
  background: #f8f9fa;
}

.question.viewed {
  opacity: 0.7;
  border-left: 4px solid #28a745;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status.new {
  background: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status.viewed {
  background: #28a745;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

/* Toast notifications */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 12px 16px;
  border-radius: 4px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Typing indicator */
.typing-indicator {
  font-style: italic;
  color: #666;
  padding: 8px;
  display: none;
}
```

## 🚀 Backend Endpoints

### **WebSocket Connection:**

```
WS: ws://your-domain.com/overlay/{userId}
```

### **API Endpoints:**

```
GET  /api/questions/{userId}     - Get all questions
POST /api/questions/{userId}     - Create new question
PUT  /api/questions/{userId}/{questionId} - Update question
```

## 🧪 Testing

### **1. Test WebSocket Connection:**

```javascript
// Open browser console
const ws = new WebSocket("ws://127.0.0.1:8788/overlay/testuser");
ws.onmessage = (e) => console.log("Received:", JSON.parse(e.data));
ws.send(JSON.stringify({ type: "join_room", userId: "testuser" }));
```

### **2. Test Auto-Sync:**

1. Open multiple browser tabs
2. Create question in one tab
3. See auto-update in other tabs (no refresh!)

### **3. Test Notifications:**

1. Enable browser notifications
2. Create question
3. See real-time notification

## 🎯 Key Benefits

### **✅ No Manual Refresh:**

- Questions auto-sync in real-time
- Always shows latest data
- Multi-tab synchronization

### **✅ Better UX:**

- Instant notifications
- Live status updates
- Seamless experience

### **✅ Production Ready:**

- Cloudflare Workers scaling
- Auto-reconnection
- Error handling

## 📞 Need Help?

Backend sudah 100% ready dengan semua fitur WebSocket! Tinggal implement frontend sesuai guide ini dan real-time features akan langsung berfungsi.

**Happy coding! 🚀**
