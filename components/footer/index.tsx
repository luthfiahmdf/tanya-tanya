import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export const Footer = (): ReactElement => {
  return (
    <footer className="bg-background py-12 border-t-4 border-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-8 w-8 text-black" />
              <h2 className="text-2xl font-black">TANYA-TANYA</h2>
            </div>
            <p>
              Platform tanya jawab terbaik untuk semua kebutuhan informasi Anda.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-black pb-2">
              Navigasi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#FFD166]">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#FFD166]">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-[#FFD166]">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#FFD166]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-black pb-2">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-[#FFD166]">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FFD166]">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#FFD166]">
                  Kebijakan Cookie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-black pb-2">
              Kontak
            </h3>
            <ul className="space-y-2">
              <li>Email: hello@tanya-tanya.com</li>
              <li>Telepon: +62 123 4567 890</li>
              <li className="flex gap-4 pt-2">
                <Link href="#" className="hover:text-[#FFD166]">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-[#FFD166]">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-[#FFD166]">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} made with ❤️ by luthfiahmdf
          </p>
        </div>
      </div>
    </footer>
  );
};
