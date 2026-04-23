import { Zap } from "lucide-react";

type QuestionCardProps = {
  index: number;
  name: string;
  question: string;
  isViewed: boolean | null;
  isActive?: boolean;
  onShow: () => void;
};

export const QuestionCard = ({
  index,
  name,
  question,
  isViewed,
  isActive = false,
  onShow,
}: QuestionCardProps) => {
  return (
    <div
      className={`border-2 border-border shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all ${
        isActive
          ? "bg-secondary-background "
          : isViewed
            ? "bg-background"
            : "bg-secondary-background"
      }`}
      style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b-2 border-border">
        <div className="flex items-center gap-2">
          <span className="bg-foreground text-secondary-background w-6 h-6 flex items-center justify-center text-xs font-black">
            {index}
          </span>
          <h3
            className="font-bold text-foreground text-sm"
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            {name || "Anonim"}
          </h3>
        </div>
        {isActive ? (
          <span className="bg-accent text-black px-2 py-0.5 text-xs font-bold uppercase animate-pulse border-2 border-border">
            Aktif
          </span>
        ) : isViewed ? (
          <span className="bg-foreground/20 text-foreground px-2 py-0.5 text-xs font-bold uppercase">
            Ditampilkan
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div
        className="p-4"
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
      >
        <p
          className="text-foreground/60 font-medium text-sm leading-relaxed line-clamp-4 min-h-[4rem]"
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          {question || "Pertanyaan kosong"}
        </p>
      </div>

      {/* Footer */}
      <div className="p-3 border-t-2 border-border">
        <button
          onClick={onShow}
          className="w-full cursor-pointer bg-foreground text-secondary-background py-2.5 px-4 text-xs font-bold uppercase border-2 border-border shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Zap className="h-3.5 w-3.5" />
          {isViewed ? "Tampilkan Lagi" : "Tampilkan Live"}
        </button>
      </div>
    </div>
  );
};
