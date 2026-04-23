import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export const CtaSection = (): ReactElement => {
  return (
    <section className="py-20 md:py-28 border-t-4 border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-secondary-background border-4 border-border p-10 md:p-16 shadow-[8px_8px_0px_var(--border)] text-center relative">
          {/* Decorative corner elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-foreground border-2 border-border" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-foreground border-2 border-border" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-foreground border-2 border-border" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-foreground border-2 border-border" />

          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            Siap Untuk
            <br />
            Mulai Bertanya?
          </h2>
          <p className="text-lg text-foreground/70 mb-10 max-w-xl mx-auto font-medium">
            Bergabunglah dengan ribuan pengguna lainnya dan mulai dapatkan jawaban
            untuk semua pertanyaan Anda.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-5 text-lg font-bold bg-foreground text-secondary-background border-2 border-border shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all uppercase"
          >
            Daftar Sekarang - Gratis! <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
