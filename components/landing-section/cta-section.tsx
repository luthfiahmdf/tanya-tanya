import Link from "next/link";
import { ReactElement } from "react";

export const CtaSection = (): ReactElement => {
  return (
    <section className="py-16 md:py-24 bg-background border-b-4 border-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black  mb-6">
          Siap Untuk Mulai Bertanya?
        </h2>
        <p className="text-xl  mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan pengguna lainnya dan mulai dapatkan jawaban
          untuk semua pertanyaan Anda.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 text-xl font-bold bg-white border-4 border-black hover:bg-gray-100 transition-colors transform hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          Daftar Sekarang - Gratis!
        </Link>
      </div>
    </section>
  );
};
