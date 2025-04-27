import { ReactElement } from "react";

export const FAQSection = (): ReactElement => {
  return (
    <section id="faq" className="py-16 md:py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block bg-[#FFD166] px-4 py-2 font-bold border-2 border-black rotate-1 mb-4">
          FAQ
        </div>
        <h2 className="text-4xl md:text-5xl font-black">Pertanyaan Umum</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-3">Apakah Tanya-Tanya gratis?</h3>
          <p>
            Ya, Tanya-Tanya sepenuhnya gratis untuk digunakan. Anda dapat
            mengajukan pertanyaan dan menjawab tanpa biaya.
          </p>
        </div>

        <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-3">
            Berapa lama untuk mendapatkan jawaban?
          </h3>
          <p>
            Sebagian besar pertanyaan mendapatkan jawaban dalam waktu 30 menit,
            tergantung pada kompleksitas pertanyaan.
          </p>
        </div>

        <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-3">
            Topik apa saja yang bisa ditanyakan?
          </h3>
          <p>
            Anda dapat bertanya tentang hampir semua topik, mulai dari
            teknologi, pendidikan, kesehatan, hingga hobi.
          </p>
        </div>

        <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-3">
            Bagaimana cara menjadi penjawab?
          </h3>
          <p>
            Cukup daftar dan mulai menjawab pertanyaan yang sesuai dengan
            keahlian Anda. Semakin banyak jawaban berkualitas, semakin tinggi
            reputasi Anda.
          </p>
        </div>
      </div>
    </section>
  );
};
