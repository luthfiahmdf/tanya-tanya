import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MessageCircle, Search, Users, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col">
      <header className="border-b-4 border-black bg-[#FFD166] p-4">
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
              className="px-4 py-2 font-bold bg-[#EF476F] border-2 border-black hover:bg-[#ff5a7e] transition-colors"
            >
              Daftar
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
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
                Platform tanya jawab yang menghubungkan orang dengan pertanyaan
                dan mereka yang memiliki jawaban.
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
                  src="/placeholder.svg?height=400&width=500"
                  alt="Tanya-Tanya Platform"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#118AB2] border-y-4 border-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 border-4 border-black transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-4xl font-black">10K+</p>
                <p className="font-bold">Pertanyaan</p>
              </div>
              <div className="bg-white p-6 border-4 border-black transform -rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-4xl font-black">5K+</p>
                <p className="font-bold">Pengguna</p>
              </div>
              <div className="bg-white p-6 border-4 border-black transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-4xl font-black">25K+</p>
                <p className="font-bold">Jawaban</p>
              </div>
              <div className="bg-white p-6 border-4 border-black transform -rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-4xl font-black">98%</p>
                <p className="font-bold">Kepuasan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 md:py-24 container mx-auto px-4"
        >
          <div className="text-center mb-16">
            <div className="inline-block bg-[#06D6A0] px-4 py-2 font-bold border-2 border-black -rotate-1 mb-4">
              Fitur Unggulan
            </div>
            <h2 className="text-4xl md:text-5xl font-black">
              Kenapa Memilih Tanya-Tanya?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FFD166] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-white inline-block p-3 border-4 border-black mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pencarian Cepat</h3>
              <p className="text-lg">
                Temukan jawaban dengan cepat melalui sistem pencarian yang
                canggih dan teroptimasi.
              </p>
            </div>

            <div className="bg-[#EF476F] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-white inline-block p-3 border-4 border-black mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Komunitas Aktif</h3>
              <p className="text-lg">
                Bergabunglah dengan ribuan pengguna yang siap membantu menjawab
                pertanyaan Anda.
              </p>
            </div>

            <div className="bg-[#06D6A0] p-8 border-4 border-black transform hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-white inline-block p-3 border-4 border-black mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Jawaban Cepat</h3>
              <p className="text-lg">
                Dapatkan jawaban dalam hitungan menit dari pakar di berbagai
                bidang.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-16 md:py-24 bg-[#FFFAF0] border-y-4 border-black"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block bg-[#118AB2] text-white px-4 py-2 font-bold border-2 border-black rotate-1 mb-4">
                Langkah Mudah
              </div>
              <h2 className="text-4xl md:text-5xl font-black">
                Bagaimana Cara Kerjanya?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-4 bg-black -z-10 transform -translate-y-1/2"></div>

              <div className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#EF476F] w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">Ajukan Pertanyaan</h3>
                <p className="text-lg">
                  Tulis pertanyaan Anda dengan detail yang cukup agar mudah
                  dipahami.
                </p>
              </div>

              <div className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#FFD166] w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">Dapatkan Jawaban</h3>
                <p className="text-lg">
                  Komunitas dan pakar akan memberikan jawaban terbaik untuk
                  pertanyaan Anda.
                </p>
              </div>

              <div className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#06D6A0] w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Pilih Jawaban Terbaik
                </h3>
                <p className="text-lg">
                  Pilih jawaban yang paling membantu dan berikan penghargaan
                  kepada penjawab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#EF476F] border-b-4 border-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Siap Untuk Mulai Bertanya?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna lainnya dan mulai dapatkan
              jawaban untuk semua pertanyaan Anda.
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-4 text-xl font-bold bg-white border-4 border-black hover:bg-gray-100 transition-colors transform hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              Daftar Sekarang - Gratis!
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FFD166] px-4 py-2 font-bold border-2 border-black rotate-1 mb-4">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-black">Pertanyaan Umum</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-bold mb-3">
                Apakah Tanya-Tanya gratis?
              </h3>
              <p>
                Ya, Tanya-Tanya sepenuhnya gratis untuk digunakan. Anda dapat
                mengajukan pertanyaan dan menjawab tanpa biaya.
              </p>
            </div>

            <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-bold mb-3">
                Berapa lama untuk mendapatkan jawaban?
              </h3>
              <p>
                Sebagian besar pertanyaan mendapatkan jawaban dalam waktu 30
                menit, tergantung pada kompleksitas pertanyaan.
              </p>
            </div>

            <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-bold mb-3">
                Topik apa saja yang bisa ditanyakan?
              </h3>
              <p>
                Anda dapat bertanya tentang hampir semua topik, mulai dari
                teknologi, pendidikan, kesehatan, hingga hobi.
              </p>
            </div>

            <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-bold mb-3">
                Bagaimana cara menjadi penjawab?
              </h3>
              <p>
                Cukup daftar dan mulai menjawab pertanyaan yang sesuai dengan
                keahlian Anda. Semakin banyak jawaban berkualitas, semakin
                tinggi reputasi Anda.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 border-t-4 border-[#FFD166]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-8 w-8 text-[#FFD166]" />
                <h2 className="text-2xl font-black">TANYA-TANYA</h2>
              </div>
              <p>
                Platform tanya jawab terbaik untuk semua kebutuhan informasi
                Anda.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 border-b-2 border-[#FFD166] pb-2">
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
              <h3 className="text-lg font-bold mb-4 border-b-2 border-[#FFD166] pb-2">
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
              <h3 className="text-lg font-bold mb-4 border-b-2 border-[#FFD166] pb-2">
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
              &copy; {new Date().getFullYear()} Tanya-Tanya. Semua hak
              dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
