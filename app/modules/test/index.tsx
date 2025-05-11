
"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful'

export const TestingColor = () => {
  const [color, setColor] = useState("#aabbcc");
  const [textColor, setTextColor] = useState("#aabbcc")
  const [border, setBorder] = useState(true)
  const onSubmit = () => {
    console.log("data", {
      bg_color: color,
      text_color: textColor,
      border: border
    });
  };
  return (
    <div
      className="w-full h-screen flex justify-center  items-center flex-col gap-4"
    >
      <div style={{
        backgroundColor: color,
        boxShadow: border ? "8px 8px 0px 0px rgba(0, 0, 0, 1)" : "none",
        border: "2px solid black",
      }} className='w-56 h-20 p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2'>
        <h1 style={{ color: textColor }}>ini contoh textnya ya gesyaaaa</h1>
      </div>
      <div className='flex flex-row gap-4'>
        <Button onClick={() => setBorder(!border)}>Border</Button>
        <div>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="noShadow" style={{ backgroundColor: textColor }}>Text Color</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 bg-white">
              <div className='flex flex-col gap-3 justify-center items-center p-3'>
                <HexColorPicker color={textColor} onChange={setTextColor} />
                <HexColorInput className='w-full p-2 border-2' color={textColor} onChange={setTextColor} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="noShadow" style={{ backgroundColor: color }}>Warna Background</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 bg-white">
              <div className='flex flex-col gap-3 justify-center items-center p-3'>
                <HexColorPicker color={color} onChange={setColor} />
                <HexColorInput className='w-full p-2 border-2' color={color} onChange={setColor} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={() => onSubmit()}>Simpan</Button>
      </div>
    </div>
  );
}

