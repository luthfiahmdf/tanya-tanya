import { ReactElement } from "react";

export const StatsSection = (): ReactElement => {
  return (
    <section className="py-12 bg-[#118AB2] border-y-4 border-black h-60">
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
  );
};
