import { ArrowDown } from "lucide-react";
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
    description:
      "Daftar dan buat sesi Q&A baru. Dapatkan link unik untuk dibagikan kepada viewers Anda.",
  },
  {
    id: 2,
    title: "Viewers Bertanya",
    description:
      "Viewers mengakses link dan mengirimkan pertanyaan mereka tanpa perlu mendaftar.",
  },
  {
    id: 3,
    title: "Tampilkan di Stream",
    description:
      "Pilih pertanyaan dan tampilkan langsung di stream Anda melalui overlay OBS yang menarik.",
  },
];

export const HowItWorksSection = (): ReactElement => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary-background border-t-4 border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-foreground text-secondary-background px-4 py-2 font-bold text-sm mb-4 uppercase border-2 border-border">
              Langkah Mudah
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Bagaimana Cara Kerjanya?
            </h2>
          </div>

          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {WORK_STEPS.map((step, index) => (
              <div key={step.id}>
                <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all flex gap-6 items-start">
                  {/* Step number */}
                  <div className="bg-foreground text-secondary-background min-w-[48px] h-12 flex items-center justify-center text-xl font-black border-2 border-border shrink-0">
                    {step.id}
                  </div>
                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-black mb-1 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Arrow connector */}
                {index < WORK_STEPS.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-6 w-6 text-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
