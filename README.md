# 🗣️ Tanya-Tanya

**Tanya-Tanya** adalah aplikasi Q&A interaktif yang memungkinkan _viewer_ untuk mengirim pertanyaan kepada _streamer_. Streamer dapat memilih pertanyaan yang ingin ditampilkan sebagai **overlay realtime** di OBS. Cocok digunakan saat live streaming untuk meningkatkan interaksi dan partisipasi audiens.

---

## ✨ Fitur Utama

- 🎙️ Viewer dapat mengirimkan pertanyaan secara langsung.
- 📋 Streamer memiliki panel untuk melihat dan memilih pertanyaan.
- ⚡ Tampilan overlay pertanyaan secara **realtime** di OBS.
- 🔐 Autentikasi aman menggunakan **NextAuth**.
- 🧠 Manajemen state global ringan dengan **Zustand**.
- 🔁 Pengambilan dan sinkronisasi data efisien dengan **TanStack React Query**.
- 🧪 Validasi form modern menggunakan **React Hook Form + Zod**.

---

## 🧰 Tech Stack

| Kategori        | Teknologi                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 15 (App Router)](https://nextjs.org/)                                                                   |
| Library UI      | [React 19](https://reactjs.org/), [Tailwind CSS 4](https://tailwindcss.com/),[shadcn/ui](https://ui.shadcn.com/) |
| Form & Validasi | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)                                         |
| Autentikasi     | [NextAuth.js](https://next-auth.js.org/)                                                                         |
| Data Fetching   | [@tanstack/react-query](https://tanstack.com/query/latest)                                                       |
| Utility         | `clsx`, `axios`, `date-fns`                                                                                      |
| Realtime        | WebSocket                                                                                                        |

---

## 🎥 Mode Overlay OBS

1. Buka halaman khusus overlay (misalnya: `/overlay/[streamId]`).
2. Salin URL tersebut dan **tempel di OBS** menggunakan "Browser Source".
3. Overlay akan menampilkan pertanyaan aktif yang dipilih streamer secara realtime.
