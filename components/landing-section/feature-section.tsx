import { Monitor, Users, Zap } from "lucide-react";
import { ReactElement, ReactNode } from "react";

type TFeature = {
  icon: ReactNode;
  desc: string;
  title: string;
  number: string;
};

export const FeatureSection = (): ReactElement => {
  const dataFeature: TFeature[] = [
    {
      icon: <Monitor className="h-7 w-7" />,
      title: "OBS Overlay",
      desc: "Tampilkan pertanyaan langsung di stream Anda dengan overlay OBS yang mudah diatur dan disesuaikan.",
      number: "01",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Link Khusus",
      desc: "Bagikan link khusus kepada viewers untuk mengumpulkan pertanyaan tanpa perlu mereka mendaftar.",
      number: "02",
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Moderasi Mudah",
      desc: "Filter dan pilih pertanyaan mana yang ingin ditampilkan. Blokir kata-kata tertentu secara otomatis.",
      number: "03",
    },
  ];

  return (
    <section id="features" className="bg-secondary-background border-t-4 border-border py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="inline-block bg-foreground text-secondary-background px-4 py-2 font-bold text-sm mb-4 uppercase border-2 border-border">
              Fitur Unggulan
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              Kenapa Streamer
              <br />
              Memilih Tanya-Tanya?
            </h2>
          </div>
          <p className="text-foreground/70 font-medium max-w-sm md:text-right">
            Semua yang kamu butuhkan untuk sesi Q&A yang interaktif dan seru bersama viewers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-2 border-border">
          {dataFeature.map((item, index) => (
            <div
              key={index}
              className={`bg-secondary-background p-8 ${index < dataFeature.length - 1 ? "md:border-r-2 border-b-2 md:border-b-0 border-border" : ""} hover:bg-background transition-colors group`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="bg-foreground p-3 border-2 border-border group-hover:shadow-shadow transition-shadow">
                  <span className="text-secondary-background">{item.icon}</span>
                </div>
                <span className="text-5xl font-black text-foreground/10 group-hover:text-foreground/20 transition-colors">
                  {item.number}
                </span>
              </div>
              <h3 className="text-xl font-black mb-3 text-foreground uppercase">{item.title}</h3>
              <p className="text-foreground/70 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
