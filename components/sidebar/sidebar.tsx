"use client";

import { useSidebarStore } from "@/app/provider/sidebar-store-provider";
import { Home, LogOut, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

type SidebarProps = {
  username: string;
};
export const Sidebar = ({ username }: SidebarProps) => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore((state) => state);
  const handleLogOut = () => {
    signOut({ callbackUrl: "/" })
  }
  return (
    <Fragment>
      <div className="md:hidden flex items-center justify-between p-4 bg-[#FFD166] border-b-4 border-black">
        <Link href="/" className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          <h1 className="text-xl font-black">TANYA-TANYA</h1>
        </Link>
        <Button variant="noShadow" onClick={setSidebarOpen} className="p-2">
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      <div
        className={`${sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 fixed border-b-4  md:border-b-0 md:border-r-4 bg-white border-black md:h-screen z-10 top-0 h-screen  overflow-y-hidden`}
      >
        <div className="p-4 border-b-4 border-black hidden md:block">
          <Link href="/" className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            <h1 className="text-xl font-black">TANYA-TANYA</h1>
          </Link>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#EF476F] rounded-full border-2 border-black flex items-center justify-center font-bold text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm">{username}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href={`/dashboard/${username}`}
              className="flex items-center gap-2 p-3 bg-[#FFFAF0] border-2 border-black font-bold"
              onClick={setSidebarOpen}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
          </nav>

          <Button onClick={() => handleLogOut()} className="flex items-center gap-2 p-3 mt-6 w-full bg-white border-2 border-black font-bold hover:bg-gray-100">
            <LogOut className="w-5 h-5" />
            Keluar
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
