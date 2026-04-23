import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export const Footer = (): ReactElement => {
  return (
    <footer className="bg-foreground text-secondary-background py-12 border-t-4 border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-6 w-6 text-secondary-background" />
              <h2 className="text-xl font-black text-secondary-background uppercase">Tanya-Tanya</h2>
            </div>
            <p className="text-sm text-secondary-background/70">
              Platform tanya jawab terbaik untuk semua kebutuhan informasi Anda.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-secondary-background uppercase">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-secondary-background uppercase">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-secondary-background/70 hover:text-secondary-background transition-colors font-medium">
                  Kebijakan Cookie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-secondary-background uppercase">
              Kontak
            </h3>
            <ul className="space-y-2 text-sm text-secondary-background/70">
              <li>Email: hello@tanya-tanya.com</li>
              <li>Telepon: +62 123 4567 890</li>
              <li className="flex gap-4 pt-2">
                <Link href="#" className="text-secondary-background/70 hover:text-secondary-background transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="#" className="text-secondary-background/70 hover:text-secondary-background transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="text-secondary-background/70 hover:text-secondary-background transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-secondary-background/20 text-center text-sm text-secondary-background/70">
          <p>
            &copy; {new Date().getFullYear()} made with ❤️ by luthfiahmdf
          </p>
        </div>
      </div>
    </footer>
  );
};
