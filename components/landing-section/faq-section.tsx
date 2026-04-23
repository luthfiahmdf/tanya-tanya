import { ReactElement } from "react";

type TFaq = {
  question: string;
  answer: string;
};

const FAQ_DATA: TFaq[] = [
  {
    question: "Apakah Tanya-Tanya gratis?",
    answer: "Ya, Tanya-Tanya Sepenuhnya Gratis.",
  },
  {
    question: "Bagaimana cara mengatur overlay OBS?",
    answer:
      "Cukup tambahkan Browser Source di OBS Anda dan masukkan URL overlay yang kami berikan. Kami menyediakan panduan lengkap untuk membantu Anda.",
  },
  {
    question: "Apakah viewers perlu mendaftar?",
    answer:
      "Tidak, viewers cukup mengakses link yang Anda bagikan untuk mengirimkan pertanyaan tanpa perlu mendaftar.",
  },
  {
    question: "Apakah bisa digunakan di platform streaming apa saja?",
    answer:
      "Ya, Tanya-Tanya bekerja dengan semua platform streaming seperti Twitch, YouTube, Facebook Gaming, dan lainnya yang mendukung OBS.",
  },
];

export const FAQSection = (): ReactElement => {
  return (
    <section id="faq" className="py-20 md:py-28 border-t-4 border-border bg-secondary-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="inline-block bg-foreground text-secondary-background px-4 py-2 font-bold text-sm mb-4 uppercase border-2 border-border">
                FAQ
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                Pertanyaan
                <br />
                Umum
              </h2>
            </div>
            <p className="text-foreground/70 font-medium max-w-xs md:text-right">
              Jawaban untuk pertanyaan yang sering ditanyakan.
            </p>
          </div>

          <div className="flex flex-col gap-0 border-2 border-border">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={index}
                className={`p-6 md:p-8 ${index < FAQ_DATA.length - 1 ? "border-b-2 border-border" : ""} hover:bg-background transition-colors group`}
              >
                <div className="flex gap-4 md:gap-6 items-start">
                  <span className="text-3xl font-black text-foreground/10 group-hover:text-foreground/25 transition-colors shrink-0 leading-none mt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-black mb-2 text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
