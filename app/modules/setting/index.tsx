"use client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Save } from "lucide-react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useGetUserMe } from "../dashboard/hook";
import { useGetOverlaySettings, useUpdateOverlaySettings } from "./hook";
import { TUpdateOverlaySettings } from "./type";
import { useToast } from "@/components/ui/toast";
import { useSidebarStore } from "@/app/provider/sidebar-store-provider";

const fontMap: Record<string, string> = {
  poppins: '"Poppins", sans-serif',
  roboto: '"Roboto Mono", monospace',
  viga: '"Viga", sans-serif',
  jakarta: '"Plus Jakarta Sans",sans-serif',
  inter: '"Inter",sans-serif',
};

export const SettingModule = () => {
  const { data: userData } = useGetUserMe();
  const { data: settings, refetch } = useGetOverlaySettings(userData?.id || "");
  const { mutate } = useUpdateOverlaySettings(userData?.id || "");
  const { sidebarCollapsed } = useSidebarStore((state) => state);

  const [color, setColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [border, setBorder] = useState(true);
  const [selectedFontKey, setSelectedFontKey] = useState("roboto");

  const { addToast } = useToast();
  const selectedFont = fontMap[selectedFontKey];

  useEffect(() => {
    if (!settings) return;
    if (settings.bgColor) setColor(settings.bgColor);
    if (settings.textColor) setTextColor(settings.textColor);
    if (typeof settings.border === "boolean") setBorder(settings.border);
    const fontKey = Object.entries(fontMap).find(
      ([, value]) => value === settings.fontFamily
    )?.[0];
    if (fontKey) setSelectedFontKey(fontKey);
  }, [settings]);

  const onSubmit = () => {
    const data: TUpdateOverlaySettings = {
      bgColor: color,
      textColor: textColor,
      border: border,
      fontFamily: selectedFont,
    };
    mutate(data, {
      onSuccess: () => {
        addToast(`Pengaturan Overlaynya udah di update..`, "success");
        refetch();
      },
    });
  };

  return (
    <div
      className={`bg-background min-h-screen flex flex-col gap-6 transition-all duration-300 p-6 md:p-8 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
          Pengaturan Overlay
        </h1>
        <p className="text-foreground/60 text-sm font-medium mt-1">
          Atur tampilan overlay untuk stream kamu
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-secondary-background border-2 border-border shadow-shadow">
          <div className="p-4 border-b-2 border-border">
            <h2 className="text-sm font-black text-foreground uppercase">Kontrol</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBorder(!border)}
                className="bg-secondary-background border-2 border-border p-3 font-bold text-sm text-foreground hover:bg-background transition-colors shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                {border ? "Border: On" : "Border: Off"}
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="bg-secondary-background border-2 border-border p-3 font-bold text-sm hover:bg-background transition-colors shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    style={{ color: textColor }}
                  >
                    Warna Teks
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 bg-secondary-background border-2 border-border shadow-shadow">
                  <div className="flex flex-col gap-3 justify-center items-center p-3">
                    <HexColorPicker color={textColor} onChange={setTextColor} />
                    <HexColorInput
                      className="w-full p-2 border-2 border-border font-mono text-sm"
                      color={textColor}
                      onChange={setTextColor}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select value={selectedFontKey} onValueChange={setSelectedFontKey}>
                <SelectTrigger className="bg-secondary-background border-2 border-border font-bold text-sm shadow-[2px_2px_0px_var(--border)]">
                  <SelectValue placeholder="Pilih font" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-background border-2 border-border shadow-shadow">
                  <SelectGroup>
                    <SelectLabel>Font</SelectLabel>
                    {Object.entries(fontMap).map(([key, fontFamily]) => (
                      <SelectItem key={key} value={key} style={{ fontFamily }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="border-2 border-border p-3 font-bold text-sm hover:opacity-90 transition-opacity shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    style={{ backgroundColor: color }}
                  >
                    Warna BG
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 bg-secondary-background border-2 border-border shadow-shadow">
                  <div className="flex flex-col gap-3 justify-center items-center p-3">
                    <HexColorPicker color={color} onChange={setColor} />
                    <HexColorInput
                      className="w-full p-2 border-2 border-border font-mono text-sm"
                      color={color}
                      onChange={setColor}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              className="w-full mt-6 bg-foreground text-secondary-background py-3 px-4 border-2 border-border font-bold text-sm uppercase shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              onClick={onSubmit}
            >
              <Save className="h-4 w-4" />
              Simpan Pengaturan
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-secondary-background border-2 border-border shadow-shadow">
          <div className="p-4 border-b-2 border-border">
            <h2 className="text-sm font-black text-foreground uppercase">Preview</h2>
          </div>
          <div className="p-6">
            <div
              className="w-full h-64 overflow-hidden border-2 border-border"
              style={{
                boxShadow: border ? "4px 4px 0px 0px rgba(0,0,0,1)" : "none",
              }}
            >
              <div
                className="w-full h-full break-all flex flex-col justify-between p-4"
                style={{
                  backgroundColor: color,
                  fontFamily: selectedFont,
                }}
              >
                <h3 className="text-lg font-bold" style={{ color: textColor }}>
                  Ini Contoh Pertanyaan
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                  <div style={{ color: textColor }} className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs">@Anomali</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-secondary-background border-2 border-border p-4 shadow-shadow">
        <div className="flex items-start gap-3">
          <div className="bg-foreground text-secondary-background px-2 py-1 font-bold text-xs uppercase shrink-0">
            Note
          </div>
          <p className="text-foreground/60 text-sm font-medium">
            Setelah merubah tampilan, double click pada browser source pada OBS dan tekan <strong className="text-foreground">&quot;Refresh cache of current page&quot;</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
