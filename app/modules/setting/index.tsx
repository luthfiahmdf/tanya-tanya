
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { User } from "lucide-react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useGetUserMe } from "../dashboard/hook";
import { useGetOverlaySettings, useUpdateOverlaySettings } from "./hook";
import { TUpdateOverlaySettings } from "./type";
import { useToast } from "@/components/ui/toast";

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
  const { mutate } = useUpdateOverlaySettings(userData?.id || "")
  // Local state
  const [color, setColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [border, setBorder] = useState(true);
  const [selectedFontKey, setSelectedFontKey] = useState("roboto");

  const { addToast } = useToast()
  const selectedFont = fontMap[selectedFontKey];

  // Apply settings on load
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
      fontFamily: selectedFont

    }
    mutate(data, {
      onSuccess: () => {
        addToast(`Pengaturan Overlaynya udah di update..`, "success")
        refetch()
      }
    })
  };

  return (
    <div className="max-w-screen h-screen flex md:ml-64 p-12 flex-col gap-4">
      <div className="bg-white w-fit p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
        <h1 className="text-3xl">Pengaturan Overlay</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="grid grid-cols-2 gap-4 items-start">
          <Button onClick={() => setBorder(!border)} variant="noShadow">
            {border ? "Border" : "Tanpa Border"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="noShadow" style={{ color: textColor }}>
                Text Color
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 bg-white">
              <div className="flex flex-col gap-3 justify-center items-center p-3">
                <HexColorPicker color={textColor} onChange={setTextColor} />
                <HexColorInput
                  className="w-full p-2 border-2"
                  color={textColor}
                  onChange={setTextColor}
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={selectedFontKey} onValueChange={setSelectedFontKey}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Font</SelectLabel>
                {Object.entries(fontMap).map(([key, fontFamily]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    style={{ fontFamily: fontFamily }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="noShadow"
                style={{ backgroundColor: color }}
              >
                Warna Background
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 bg-white">
              <div className="flex flex-col gap-3 justify-center items-center p-3">
                <HexColorPicker color={color} onChange={setColor} />
                <HexColorInput
                  className="w-full p-2 border-2"
                  color={color}
                  onChange={setColor}
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          className="w-full h-full"
          style={{
            boxShadow: border ? "8px 8px 0px 0px rgba(0,0,0,1)" : "none",
          }}
        >
          <div
            className="border-2 w-full h-full break-all flex flex-col justify-between border-black p-3"
            style={{
              backgroundColor: color,
              fontFamily: selectedFont,
            }}
          >
            <h3 className="text-lg" style={{ color: textColor }}>
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

      <Button className="w-1/2" onClick={onSubmit}>Simpan</Button>

      <h1 className="flex items-center gap-2">
        <p className="bg-amber-300 p-2">note</p> Setelah merubah tampilan, double click pada browser source pada OBS dan tekan <q>Refresh cache of current page</q>
      </h1>
    </div>
  );
};

