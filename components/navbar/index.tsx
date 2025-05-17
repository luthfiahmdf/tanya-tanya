import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export const Navbar = (): ReactElement => {
  return (
    <header className="border-b-4 border-black bg-background p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-8 w-8" />
          <h1 className="text-2xl font-black">TANYA-TANYA</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="font-bold hover:underline">
            Fitur
          </Link>
          <Link href="#how-it-works" className="font-bold hover:underline">
            Cara Kerja
          </Link>
          <Link href="#faq" className="font-bold hover:underline">
            FAQ
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 font-bold bg-background border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
};
