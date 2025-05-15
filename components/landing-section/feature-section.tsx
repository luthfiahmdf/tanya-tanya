import { Monitor, Users, Zap } from "lucide-react";
import { ReactElement } from "react";

export const FeatureSection = (): ReactElement => {
  return (


    <section id="features" className="py-16 md:py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block bg-[#06D6A0] px-4 py-2 font-bold border-2 border-black -rotate-1 mb-4">
          Fitur Unggulan
        </div>
        <h2 className="text-4xl md:text-5xl font-black">Kenapa Streamer Memilih Tanya-Tanya?</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#FFD166] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white inline-block p-3 border-4 border-black mb-4">
            <Monitor className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">OBS Overlay</h3>
          <p className="text-lg">
            Tampilkan pertanyaan langsung di stream Anda dengan overlay OBS yang mudah diatur dan disesuaikan.
          </p>
        </div>

        <div className="bg-[#EF476F] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white inline-block p-3 border-4 border-black mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Link Khusus</h3>
          <p className="text-lg">
            Bagikan link khusus kepada viewers untuk mengumpulkan pertanyaan tanpa perlu mereka mendaftar.
          </p>
        </div>

        <div className="bg-[#06D6A0] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white inline-block p-3 border-4 border-black mb-4">
            <Zap className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Moderasi Mudah</h3>
          <p className="text-lg">
            Filter dan pilih pertanyaan mana yang ingin ditampilkan. Blokir kata-kata tertentu secara otomatis.
          </p>
        </div>
      </div>
    </section>
  );
};
