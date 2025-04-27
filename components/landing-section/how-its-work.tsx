import { ReactElement } from "react";

export const HowItsWorksSection = (): ReactElement => {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-[#FFFAF0] border-y-4 border-black"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#118AB2] text-white px-4 py-2 font-bold border-2 border-black rotate-1 mb-4">
            Langkah Mudah
          </div>
          <h2 className="text-4xl md:text-5xl font-black">
            Bagaimana Cara Kerjanya?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-4 bg-black -z-10 transform -translate-y-1/2"></div>

          <div className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#EF476F] w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4">Ajukan Pertanyaan</h3>
            <p className="text-lg">
              Tulis pertanyaan Anda dengan detail yang cukup agar mudah
              dipahami.
            </p>
          </div>

          <div className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#FFD166] w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4">Dapatkan Jawaban</h3>
            <p className="text-lg">
              Komunitas dan pakar akan memberikan jawaban terbaik untuk
              pertanyaan Anda.
            </p>
          </div>

          <div className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#06D6A0] w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4">Pilih Jawaban Terbaik</h3>
            <p className="text-lg">
              Pilih jawaban yang paling membantu dan berikan penghargaan kepada
              penjawab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
