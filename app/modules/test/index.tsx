"use client";

import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";
// import { Sidebar } from "@/components/sidebar/sidebar";
import { useSidebarStore } from "@/app/provider/sidebar-store-provider";

// Mock data for questions
const questions = [
  {
    id: "q1",
    title: "Bagaimana cara membuat kue bolu yang lembut?",
    author: "kuliner123",
    date: "2 jam yang lalu",
    tags: ["Kuliner", "Kue"],
    views: 42,
  },
  {
    id: "q2",
    title: "Apa perbedaan antara HTML dan HTML5?",
    author: "webdev22",
    date: "5 jam yang lalu",
    tags: ["Teknologi", "Web"],
    views: 128,
  },
  {
    id: "q3",
    title: "Rekomendasi tempat wisata di Bandung?",
    author: "traveler_id",
    date: "1 hari yang lalu",
    tags: ["Wisata", "Bandung"],
    views: 215,
  },
  {
    id: "q4",
    title: "Cara menanam tomat di pot dengan benar?",
    author: "greenthumb",
    date: "2 hari yang lalu",
    tags: ["Berkebun", "Tanaman"],
    views: 89,
  },
  {
    id: "q5",
    title: "Tips belajar bahasa Inggris untuk pemula?",
    author: "language_learner",
    date: "3 hari yang lalu",
    tags: ["Pendidikan", "Bahasa"],
    views: 176,
  },
];

// Mock data for highlighted questions
const highlightedQuestions = [
  {
    id: "h1",
    title: "Bagaimana cara mengatasi kecemasan sosial?",
    author: "psychology101",
    date: "1 hari yang lalu",
    tags: ["Kesehatan Mental", "Psikologi"],
    views: 532,
    highlight: "Pertanyaan Populer",
  },
];

export const TestPage = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore((state) => state);
  // Handle sidebar toggle for mobile
  //   const toggleSidebar = () => {
  //     setSidebarOpen(!sidebarOpen);
  //   };

  // Close sidebar when clicking outside on mobile

  // Get user session on client side

  // Handle server-side redirect

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col md:flex-row">
      {/* <Sidebar /> */}
      {/* Mobile Header */}

      {/* Sidebar - Hidden on mobile unless toggled */}

      {/* Main Content */}
      <div
        className="flex-1 p-4 md:p-6 overflow-auto"
        onClick={
          sidebarOpen && window.innerWidth < 768 ? setSidebarOpen : undefined
        }
      >
        <div className="md:hidden mb-4">
          <form className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              className="w-full pl-10 py-2 border-2 border-black focus:outline-none"
            />
          </form>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-black">Dashboard</h1>
          <Link
            href="/dashboard/tanya"
            className="md:hidden flex items-center justify-center gap-1 p-2 bg-[#EF476F] border-2 border-black font-bold hover:bg-[#ff5a7e]"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="sr-only md:not-sr-only">Tanya</span>
          </Link>
        </div>

        {/* Highlighted Questions */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-black mb-4 inline-block bg-[#FFD166] px-4 py-2 border-4 border-black transform -rotate-1">
            Pertanyaan Unggulan
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlightedQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white border-4 border-black p-4 md:p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="absolute -top-3 -right-3 bg-[#EF476F] text-white font-bold py-1 px-3 border-4 border-black text-xs md:text-sm">
                  {question.highlight}
                </div>

                <Link
                  href={`/dashboard/pertanyaan/${question.id}`}
                  className="block"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-2 hover:underline line-clamp-2">
                    {question.title}
                  </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                  <span className="font-medium">Oleh: {question.author}</span>
                  <span className="text-gray-600">• {question.date}</span>
                  <span className="text-gray-600">
                    • {question.views} dilihat
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#06D6A0] px-2 py-1 text-xs font-bold border-2 border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regular Questions */}
        <section>
          <h2 className="text-xl md:text-2xl font-black mb-4 inline-block bg-[#118AB2] text-white px-4 py-2 border-4 border-black transform rotate-1">
            Pertanyaan Terbaru
          </h2>

          <div className="grid gap-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Link
                  href={`/dashboard/pertanyaan/${question.id}`}
                  className="block"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-2 hover:underline">
                    {question.title}
                  </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                  <span className="font-medium">Oleh: {question.author}</span>
                  <span className="text-gray-600">• {question.date}</span>
                  <span className="text-gray-600">
                    • {question.views} dilihat
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 px-2 py-1 text-xs font-bold border-2 border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-[#FFD166] px-4 md:px-6 py-2 md:py-3 font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-sm md:text-base">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  );
};
