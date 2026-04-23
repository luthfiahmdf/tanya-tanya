# 🤖 Auto-Sync Questions Feature - AI Developer Guide

## 📋 Overview untuk AI/Frontend Developer

Fitur **Auto-Sync Questions** memungkinkan sinkronisasi pertanyaan secara real-time tanpa refresh manual. Dokumen ini khusus dibuat untuk AI dan frontend developer agar mudah memahami dan mengimplementasikan fitur ini.

## 🎯 Apa yang Harus AI Ketahui

### 1. **Dua Jenis WebSocket**

| WebSocket Type      | Endpoint              | Fungsi                       | Kapan Digunakan                 |
| ------------------- | --------------------- | ---------------------------- | ------------------------------- |
| **Questions Sync**  | `/status/{username}`  | Auto-sync semua pertanyaan   | Dashboard admin, Q&A management |
| **Active Question** | `/overlay/{username}` | Tampilkan 1 pertanyaan aktif | OBS overlay, streaming display  |

### 2. **Event Types yang Diterima**

```javascript
// Event utama untuk auto-sync (PALING PENTING!)
{
  "type": "questions_sync",
  "data": {
    "questions": [...], // Array semua pertanyaan terbaru
    "timestamp": "2026-04-23T03:11:47.000Z",
    "total": 5
  }
}

// Event notifikasi pertanyaan baru
{
  "type": "new_question",
  "data": { "id": "...", "name": "...", "question": "...", "isViewed": false }
}

// Event notifikasi update pertanyaan
{
  "type": "question_update",
  "data": { "id": "...", "name": "...", "question": "...", "isViewed": true }
}

// Konfirmasi join room
{
  "type": "room_joined",
  "data": { "userId": "username", "timestamp": "..." }
}
```

## 🚀 Template Implementasi untuk AI

### 1. **Native JavaScript (Paling Sederhana)**

```javascript
// TEMPLATE UNTUK AI - Copy paste ini untuk implementasi dasar
class QnAAutoSync {
  constructor(username) {
    this.username = username;
    this.ws = null;
    this.questions = [];
    this.onQuestionsUpdate = null; // Callback function
  }

  connect() {
    // Connect ke Questions Sync WebSocket untuk auto-sync
    this.ws = new WebSocket(`ws://127.0.0.1:8787/status/${this.username}`);

    this.ws.onopen = () => {
      console.log("✅ Auto-sync connected");

      // Join room setelah connect
      this.ws.send(
        JSON.stringify({
          type: "join_room",
          userId: this.username,
        }),
      );
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "questions_sync":
          // INI YANG PALING PENTING! Update seluruh daftar pertanyaan
          this.questions = data.data.questions;
          if (this.onQuestionsUpdate) {
            this.onQuestionsUpdate(this.questions);
          }
          console.log(`✅ ${data.data.total} questions synced`);
          break;

        case "new_question":
          console.log("📩 New question received");
          break;

        case "question_update":
          console.log("📝 Question updated");
          break;

        case "room_joined":
          console.log("✅ Room joined successfully");
          break;
      }
    };

    this.ws.onclose = () => {
      console.log("❌ Auto-sync disconnected");
    };

    this.ws.onerror = (error) => {
      console.error("🚨 WebSocket error:", error);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// CARA MENGGUNAKAN:
const qnaSync = new QnAAutoSync("username");

// Set callback untuk update UI
qnaSync.onQuestionsUpdate = (questions) => {
  // Update UI dengan questions terbaru
  updateQuestionsList(questions);
};

// Connect
qnaSync.connect();

// Function untuk update UI (sesuaikan dengan framework)
function updateQuestionsList(questions) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  questions.forEach((question) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${question.name}</h4>
      <p>${question.question}</p>
      <span>${question.isViewed ? "✅ Viewed" : "🔔 New"}</span>
    `;
    container.appendChild(div);
  });
}
```

### 2. **React Implementation**

```jsx
import { useState, useEffect } from "react";

function QuestionsPage({ username }) {
  const [questions, setQuestions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Setup WebSocket connection
    const ws = new WebSocket(`ws://127.0.0.1:8787/status/${username}`);

    ws.onopen = () => {
      setIsConnected(true);

      // Join room
      ws.send(
        JSON.stringify({
          type: "join_room",
          userId: username,
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "questions_sync":
          // Auto-update questions state - INI YANG PENTING!
          setQuestions(data.data.questions);
          break;

        case "new_question":
          // Optional: Show notification
          console.log("New question received");
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, [username]);

  return (
    <div>
      <div>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</div>
      <h2>Questions ({questions.length})</h2>

      {questions.map((question) => (
        <div
          key={question.id}
          className={question.isViewed ? "viewed" : "unread"}
        >
          <h4>{question.name}</h4>
          <p>{question.question}</p>
          <small>{new Date(question.createAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
```

### 3. **Vue.js Implementation**

```vue
<template>
  <div>
    <div>Status: {{ isConnected ? "🟢 Connected" : "🔴 Disconnected" }}</div>
    <h2>Questions ({{ questions.length }})</h2>

    <div
      v-for="question in questions"
      :key="question.id"
      :class="{ viewed: question.isViewed, unread: !question.isViewed }"
    >
      <h4>{{ question.name }}</h4>
      <p>{{ question.question }}</p>
      <small>{{ new Date(question.createAt).toLocaleString() }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: ["username"],
  data() {
    return {
      questions: [],
      isConnected: false,
      ws: null,
    };
  },
  mounted() {
    this.connectWebSocket();
  },
  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  },
  methods: {
    connectWebSocket() {
      this.ws = new WebSocket(`ws://127.0.0.1:8787/status/${this.username}`);

      this.ws.onopen = () => {
        this.isConnected = true;

        // Join room
        this.ws.send(
          JSON.stringify({
            type: "join_room",
            userId: this.username,
          }),
        );
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "questions_sync":
            // Auto-update questions - INI YANG PENTING!
            this.questions = data.data.questions;
            break;
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
      };
    },
  },
};
</script>
```

## 🔧 API Endpoints untuk AI

### 1. **Create Question (Trigger Auto-Sync)**

```javascript
// POST /api/questions/{username}
// Tidak perlu authentication - untuk anonymous users

const response = await fetch(
  `http://127.0.0.1:8787/api/questions/${username}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Sender Name", // Optional, bisa kosong untuk anonymous
      question: "Question text here",
    }),
  },
);

const result = await response.json();
// Result: { id, userId, name, question, createAt, isViewed }

// Setelah ini, semua WebSocket client akan otomatis menerima:
// 1. new_question event
// 2. questions_sync event (dengan semua pertanyaan terbaru)
```

### 2. **Get Questions (Perlu Auth)**

```javascript
// GET /api/questions/{username}
// Perlu JWT token untuk authentication

const response = await fetch(
  `http://127.0.0.1:8787/api/questions/${username}`,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer your-jwt-token",
    },
  },
);

const questions = await response.json();
// Result: Array of questions
```

### 3. **Update Question (Trigger Auto-Sync)**

```javascript
// PUT /api/questions/{username}/{questionId}
// Perlu JWT token untuk authentication

const response = await fetch(
  `http://127.0.0.1:8787/api/questions/${username}/${questionId}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer your-jwt-token",
    },
    body: JSON.stringify({
      isViewed: true, // Mark as viewed
    }),
  },
);

const result = await response.json();

// Setelah ini, semua WebSocket client akan otomatis menerima:
// 1. question_update event
// 2. questions_sync event (dengan semua pertanyaan terbaru)
```

## 🎯 Pola Implementasi untuk AI

### **Pattern 1: Dashboard Admin (Perlu Auto-Sync)**

```javascript
// Untuk dashboard yang perlu auto-refresh tanpa reload
const ws = new WebSocket(`ws://127.0.0.1:8787/status/${username}`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "questions_sync") {
    // Update seluruh UI dengan data terbaru
    renderQuestionsList(data.data.questions);
  }
};
```

### **Pattern 2: OBS Overlay (Tampilkan 1 Pertanyaan Aktif)**

```javascript
// Untuk overlay streaming yang tampilkan 1 pertanyaan aktif
const ws = new WebSocket(`ws://127.0.0.1:8787/overlay/${username}`);

ws.onmessage = (event) => {
  const activeQuestion = JSON.parse(event.data);

  // Update overlay dengan 1 pertanyaan aktif
  document.getElementById("overlay-question").textContent =
    activeQuestion.question;
  document.getElementById("overlay-sender").textContent = activeQuestion.sender;
};

// Untuk mengirim pertanyaan aktif ke overlay:
fetch(`/send/${username}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Pertanyaan yang akan ditampilkan",
    sender: "Nama Pengirim",
  }),
});
```

## 🚨 Hal Penting untuk AI

### ✅ **DO (Lakukan)**

1. **Selalu gunakan `questions_sync` event** untuk update UI utama
2. **Join room setelah WebSocket connect** dengan `join_room` message
3. **Handle reconnection** jika WebSocket terputus
4. **Cleanup WebSocket** saat component unmount
5. **Use HTTPS/WSS** untuk production

### ❌ **DON'T (Jangan)**

1. **Jangan hanya pakai `new_question` event** untuk update UI - gunakan `questions_sync`
2. **Jangan lupa cleanup** WebSocket connection
3. **Jangan hardcode URL** - gunakan environment variables
4. **Jangan assume WebSocket selalu connected** - handle error states

## 🔍 Debugging untuk AI

### **Check WebSocket Connection**

```javascript
// Debug WebSocket state
console.log("WebSocket state:", ws.readyState);
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED

// Test connection
ws.onopen = () => console.log("✅ Connected");
ws.onclose = () => console.log("❌ Disconnected");
ws.onerror = (error) => console.log("🚨 Error:", error);
```

### **Test API Endpoints**

```bash
# Test create question
curl -X POST http://127.0.0.1:8787/api/questions/testuser \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","question":"Hello World"}'

# Check server logs untuk WebSocket events
```

## 🌐 Environment Configuration

```javascript
// Development
const WS_URL = "ws://127.0.0.1:8787";
const API_URL = "http://127.0.0.1:8787";

// Production
const WS_URL = "wss://your-worker.your-subdomain.workers.dev";
const API_URL = "https://your-worker.your-subdomain.workers.dev";

// Usage
const ws = new WebSocket(`${WS_URL}/status/${username}`);
const response = await fetch(`${API_URL}/api/questions/${username}`);
```

## 📊 Complete Example untuk AI

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Auto-Sync Questions Demo</title>
  </head>
  <body>
    <div id="status">Disconnected</div>
    <div id="questions-count">0 questions</div>
    <div id="questions-list"></div>

    <script>
      const username = "testuser";
      let ws = null;
      let questions = [];

      function connect() {
        ws = new WebSocket(`ws://127.0.0.1:8787/status/${username}`);

        ws.onopen = () => {
          document.getElementById("status").textContent = "Connected ✅";

          // Join room
          ws.send(
            JSON.stringify({
              type: "join_room",
              userId: username,
            }),
          );
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.type === "questions_sync") {
            // Update questions array
            questions = data.data.questions;

            // Update UI
            updateUI();

            console.log(`✅ ${data.data.total} questions synced`);
          }
        };

        ws.onclose = () => {
          document.getElementById("status").textContent = "Disconnected ❌";
        };
      }

      function updateUI() {
        // Update counter
        document.getElementById("questions-count").textContent =
          `${questions.length} questions`;

        // Update questions list
        const container = document.getElementById("questions-list");
        container.innerHTML = "";

        questions.forEach((question) => {
          const div = document.createElement("div");
          div.style.border = "1px solid #ccc";
          div.style.margin = "10px 0";
          div.style.padding = "10px";
          div.innerHTML = `
                    <h4>${question.name}</h4>
                    <p>${question.question}</p>
                    <small>${new Date(question.createAt).toLocaleString()}</small>
                    <span style="color: ${question.isViewed ? "green" : "red"}">
                        ${question.isViewed ? "✅ Viewed" : "🔔 New"}
                    </span>
                `;
          container.appendChild(div);
        });
      }

      // Auto-connect on page load
      connect();
    </script>
  </body>
</html>
```

## 🎉 Summary untuk AI

1. **Gunakan `/status/{username}` WebSocket** untuk auto-sync questions
2. **Listen untuk `questions_sync` event** - ini yang paling penting!
3. **Join room setelah connect** dengan `join_room` message
4. **Update UI dengan data dari `questions_sync`** - bukan dari individual events
5. **Handle connection states** (connecting, connected, disconnected)
6. **Cleanup WebSocket** saat component unmount

**Result: Frontend akan otomatis sync pertanyaan tanpa refresh manual! 🚀**
