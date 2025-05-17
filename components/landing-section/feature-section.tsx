import { Monitor, Users, Zap } from "lucide-react";
import { ReactElement, ReactNode } from "react";
type TFeature = {
  icon: ReactNode,
  desc: string,
  title: string

}
export const FeatureSection = (): ReactElement => {
  const dataFeature: TFeature[] = [{
    icon: <Monitor className="h-8 w-8" />,
    title: "OBS Overlay",
    desc: " Tampilkan pertanyaan langsung di stream Anda dengan overlay OBS yang mudah diatur dan disesuaikan."
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Link Khusus",
    desc: "Bagikan link khusus kepada viewers untuk mengumpulkan pertanyaan tanpa perlu mereka mendaftar."
  }, {
    icon: <Zap className="h-8 w-8" />,
    title: "Moderasi Mudah",
    desc: " Filter dan pilih pertanyaan mana yang ingin ditampilkan. Blokir kata-kata tertentu secara otomatis."
  }]

  return (
    <section id="features" className="bg-background border-black py-16 md:py-24 px-4 md:px-24 border-t-4">
      <div className="text-center mx-auto px-4  mb-16">
        <div className="inline-block bg-white px-4 py-2 font-bold border-2 border-black -rotate-1 mb-4">
          Fitur Unggulan
        </div>
        <h2 className="text-4xl md:text-5xl font-black">Kenapa Streamer Memilih Tanya-Tanya?</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {dataFeature.map((item, index) => (
          <div key={index} className="bg-white  p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-white inline-block p-3 border-4 border-black mb-4">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-lg">
              {item.desc} </p>
          </div>
        ))}
      </div>
    </section>
  );
};
