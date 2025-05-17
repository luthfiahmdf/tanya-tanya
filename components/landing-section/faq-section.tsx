import { ReactElement } from "react";
type TFaq = {
  question: string,
  answer: string

}
const FAQ_DATA: TFaq[] = [
  {
    question: "Apakah Tanya-Tanya gratis?",
    answer: "Ya, Tanya-Tanya Sepenuhnya Gratis."
  },
  {
    question: "Bagaimana cara mengatur overlay OBS?",
    answer: "Cukup tambahkan Browser Source di OBS Anda dan masukkan URL overlay yang kami berikan. Kami menyediakan panduan lengkap untuk membantu Anda."
  },
  {
    question: "Apakah viewers perlu mendaftar?",
    answer: "Tidak, viewers cukup mengakses link yang Anda bagikan untuk mengirimkan pertanyaan tanpa perlu mendaftar."
  },
  {
    question: "Apakah bisa digunakan di platform streaming apa saja?",
    answer: "Ya, Tanya-Tanya bekerja dengan semua platform streaming seperti Twitch, YouTube, Facebook Gaming, dan lainnya yang mendukung OBS."
  }
];

export const FAQSection = (): ReactElement => {
  return (
    <section id="faq" className="py-16 md:py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block bg-background px-4 py-2 font-bold border-2 border-black rotate-1 mb-4">
          FAQ
        </div>
        <h2 className="text-4xl md:text-5xl font-black">Pertanyaan Umum</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {FAQ_DATA.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
