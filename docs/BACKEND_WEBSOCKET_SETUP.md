# 🔧 Backend WebSocket Server Setup

Untuk menggunakan fitur real-time, kamu perlu setup Socket.IO server di backend.

## 📋 Quick Setup Guide

### 1. Install Dependencies (Backend)

```bash
# Jika pakai Node.js/Express
npm install socket.io express cors
# atau
bun add socket.io express cors
```

### 2. Basic Socket.IO Server Implementation

```javascript
// server.js atau app.js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);

// Setup CORS untuk Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Frontend URLs
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join user-specific room
  socket.on("join_room", ({ userId }) => {
    socket.join(userId);
    console.log(`🏠 User ${socket.id} joined room: ${userId}`);
  });

  // Leave room
  socket.on("leave_room", ({ userId }) => {
    socket.leave(userId);
    console.log(`🚪 User ${socket.id} left room: ${userId}`);
  });

  // Handle typing indicators
  socket.on("typing", ({ userId, isTyping }) => {
    socket.to(userId).emit("user_typing", { userId, isTyping });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// API Routes untuk trigger events
app.post("/api/questions", (req, res) => {
  const { userId, question } = req.body;

  // Simpan pertanyaan ke database (implementasi sesuai DB kamu)
  // ...

  // Emit event ke user room
  io.to(userId).emit("new_question", {
    id: Date.now(), // atau ID dari database
    name: question.name,
    question: question.text,
    isViewed: false,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, message: "Question sent" });
});

app.post("/api/questions/:id/update", (req, res) => {
  const { id } = req.params;
  const { userId, updates } = req.body;

  // Update pertanyaan di database
  // ...

  // Emit update event
  io.to(userId).emit("question_update", {
    id,
    ...updates,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, message: "Question updated" });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 3. Environment Variables (Backend)

```bash
# .env
PORT=3001
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 4. Integration dengan Existing API

Jika kamu sudah punya API untuk pertanyaan, tinggal tambahkan emit event:

```javascript
// Contoh di controller pertanyaan
const createQuestion = async (req, res) => {
  try {
    // Logic existing kamu untuk save pertanyaan
    const newQuestion = await Question.create(req.body);

    // Tambahkan emit event ini
    io.to(newQuestion.userId).emit("new_question", {
      id: newQuestion.id,
      name: newQuestion.name,
      question: newQuestion.text,
      isViewed: false,
      timestamp: newQuestion.createdAt,
    });

    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 🔄 Event Flow

```
Frontend (Dashboard) → Backend API → Database → Socket.IO Emit → Frontend (Real-time Update)
```

1. **User submit pertanyaan** → API endpoint
2. **API save ke database** → Database
3. **API emit Socket.IO event** → `io.to(userId).emit('new_question', data)`
4. **Frontend receive event** → Auto-refresh dashboard

## 🎯 Events yang Perlu Diimplementasikan

### Required Events:

- `new_question` - Saat ada pertanyaan baru
- `question_update` - Saat pertanyaan diupdate (misal: isViewed = true)

### Optional Events:

- `user_typing` - Typing indicators
- `user_connected` - User online status
- `user_disconnected` - User offline status

## 🚀 Quick Start

1. **Buat file server.js** dengan code di atas
2. **Install dependencies**: `bun add socket.io express cors`
3. **Run server**: `node server.js` atau `bun run server.js`
4. **Update frontend env**: `NEXT_PUBLIC_WS_URL=ws://localhost:3001`
5. **Test**: Buka dashboard, cek connection status

## 📝 Testing

```bash
# Test connection
curl -X POST http://localhost:3001/api/questions \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","question":{"name":"Test User","text":"Test question"}}'
```

## 🔧 Production Considerations

- **Redis Adapter** untuk multiple server instances
- **Authentication** untuk secure connections
- **Rate limiting** untuk prevent spam
- **Error handling** dan logging
- **Health checks** untuk monitoring

Dengan setup ini, fitur real-time di frontend akan langsung berfungsi! 🎉
