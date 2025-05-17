import { ReactElement } from "react";

type WorkStep = {
  id: number;
  title: string;
  description: string;
};

const WORK_STEPS: WorkStep[] = [
  {
    id: 1,
    title: "Buat Sesi Q&A",
    description: "Daftar dan buat sesi Q&A baru. Dapatkan link unik untuk dibagikan kepada viewers Anda.",
  },
  {
    id: 2,
    title: "Viewers Bertanya",
    description: "Viewers mengakses link dan mengirimkan pertanyaan mereka tanpa perlu mendaftar.",
  },
  {
    id: 3,
    title: "Tampilkan di Stream",
    description: "Pilih pertanyaan dan tampilkan langsung di stream Anda melalui overlay OBS yang menarik.",
  }
];

export const HowItWorksSection = (): ReactElement => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#FFFAF0] border-y-4 border-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-background text-black px-4 py-2 font-bold border-2 border-black rotate-1 mb-4">
            Langkah Mudah
          </div>
          <h2 className="text-4xl md:text-5xl font-black">Bagaimana Cara Kerjanya?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-4 bg-black -z-10 transform -translate-y-1/2"></div>

          {WORK_STEPS.map((step) => (
            <div
              key={step.id}
              className="bg-white p-8 border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="bg-background w-16 h-16 flex items-center justify-center text-3xl font-black border-4 border-black rounded-full mx-auto mb-6">
                {step.id}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};;
