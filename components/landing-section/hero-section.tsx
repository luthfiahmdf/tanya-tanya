import { ArrowRight, MessageCircle, Tv, Users } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export const HeroSection = (): ReactElement => {
  return (
    <section className="py-16 md:py-28 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary-background text-foreground px-5 py-2.5 font-bold border-2 border-border text-sm shadow-shadow">
            <MessageCircle className="h-4 w-4" />
            Platform Q&A untuk Streamer
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-black leading-tight text-center text-foreground mb-6">
          Interaksi{" "}
          <span className="underline decoration-foreground decoration-4 underline-offset-4">Lebih Seru</span>
          {" "}dengan Viewers Kamu
        </h1>

        <p className="text-lg md:text-xl text-foreground/60 text-center max-w-2xl mx-auto font-medium mb-10">
          Kelola pertanyaan dari viewers dengan mudah dan tampilkan langsung di stream Anda.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/register"
            className="px-8 py-4 text-lg font-bold bg-foreground text-secondary-background border-2 border-border shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all text-center flex items-center justify-center gap-2"
          >
            Mulai Sekarang <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-4 text-lg font-bold bg-secondary-background text-foreground border-2 border-border shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all text-center"
          >
            Lihat Cara Kerja
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: <Users className="h-5 w-5" />, value: "100%", label: "Gratis" },
            { icon: <Tv className="h-5 w-5" />, value: "OBS", label: "Ready" },
            { icon: <MessageCircle className="h-5 w-5" />, value: "Real-time", label: "Q&A" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-secondary-background border-2 border-border p-4 shadow-shadow flex items-center gap-4"
            >
              <div className="bg-foreground p-2.5 border-2 border-border">
                <span className="text-secondary-background">{stat.icon}</span>
              </div>
              <div>
                <p className="text-xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm font-bold text-foreground/60 uppercase">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
