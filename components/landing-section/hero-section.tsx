import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

export const HeroSection = (): ReactElement => {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-[#06D6A0] px-4 py-2 font-bold border-2 border-black rotate-1">
            Platform Q&A Terbaik
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Tanya Apapun, <br />
            <span className="bg-[#118AB2] text-white px-2">
              Dapatkan Jawaban
            </span>
          </h1>
          <p className="text-xl">
            Platform tanya jawab yang menghubungkan orang dengan pertanyaan dan
            mereka yang memiliki jawaban.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/register"
              className="px-6 py-3 text-lg font-bold bg-[#EF476F] border-4 border-black hover:bg-[#ff5a7e] transition-colors transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              Mulai Bertanya
            </Link>
            <Link
              href="#how-it-works"
              className="px-6 py-3 text-lg font-bold bg-white border-4 border-black hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Pelajari Lebih Lanjut <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-full h-full bg-[#FFD166] border-4 border-black"></div>
          <div className="relative border-4 border-black bg-white p-6">
            <Image
              src="/tanyain-typo.png"
              alt="Tanya-Tanya Platform"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
