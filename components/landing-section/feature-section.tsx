import { Search, Users, Zap } from "lucide-react";
import { ReactElement } from "react";

export const FeatureSection = (): ReactElement => {
  return (
    <section id="features" className="py-16 md:py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block bg-[#06D6A0] px-4 py-2 font-bold border-2 border-black -rotate-1 mb-4">
          Fitur Unggulan
        </div>
        <h2 className="text-4xl md:text-5xl font-black">
          Kenapa Memilih Tanya-Tanya?
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#FFD166] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white inline-block p-3 border-4 border-black mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Pencarian Cepat</h3>
          <p className="text-lg">
            Temukan jawaban dengan cepat melalui sistem pencarian yang canggih
            dan teroptimasi.
          </p>
        </div>

        <div className="bg-[#EF476F] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white inline-block p-3 border-4 border-black mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Komunitas Aktif</h3>
          <p className="text-lg">
            Bergabunglah dengan ribuan pengguna yang siap membantu menjawab
            pertanyaan Anda.
          </p>
        </div>

        <div className="bg-[#06D6A0] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white inline-block p-3 border-4 border-black mb-4">
            <Zap className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Jawaban Cepat</h3>
          <p className="text-lg">
            Dapatkan jawaban dalam hitungan menit dari pakar di berbagai bidang.
          </p>
        </div>
      </div>
    </section>
  );
};
