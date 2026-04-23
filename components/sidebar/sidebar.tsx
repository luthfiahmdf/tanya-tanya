"use client";

import { useSidebarStore } from "@/app/provider/sidebar-store-provider";
import {
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { signOut } from "next-auth/react";
import { useGetUserMe } from "@/app/modules/dashboard/hook";
import { usePathname } from "next/navigation";


type sideBarLink = {
  link: string;
  title: string;
  icon: ReactNode;
};

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } =
    useSidebarStore((state) => state);
  const pathname = usePathname();
  const handleLogOut = () => {
    signOut({ callbackUrl: "/" });
  };
  const { data } = useGetUserMe();
  const navlink: sideBarLink[] = [
    {
      link: `/dashboard/${data?.username}`,
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      link: `/dashboard/setting`,
      title: "Pengaturan",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <Fragment>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-secondary-background border-b-4 border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-foreground p-1 border-2 border-border">
            <MessageCircle className="h-4 w-4 text-secondary-background" />
          </div>
          <h1 className="text-lg font-black uppercase tracking-tight">
            Tanya-Tanya
          </h1>
        </Link>
        <button
          onClick={setSidebarOpen}
          className="p-2 border-2 border-border hover:bg-foreground hover:text-secondary-background transition-colors"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block ${sidebarCollapsed ? "md:w-20" : "md:w-64"} w-full fixed md:border-r-4 border-border bg-secondary-background md:h-screen z-10 top-0 h-screen overflow-y-hidden transition-all duration-300`}
      >
        {/* Logo */}
        <div
          className={`p-5 border-b-4 border-border hidden md:flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
        >
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-foreground p-1 border-2 border-border">
                <MessageCircle className="h-4 w-4 text-secondary-background" />
              </div>
              <h1 className="text-base font-black uppercase tracking-tight">
                Tanya-Tanya
              </h1>
            </Link>
          )}
          <button
            onClick={setSidebarCollapsed}
            className="p-1.5 border-2 border-border hover:bg-foreground hover:text-secondary-background transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="p-4 flex flex-col justify-between h-[calc(100vh-65px)]">
          <div>
            {/* User */}
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-3 mb-6 p-3 bg-background border-2 border-border">
                <div className="w-9 h-9 bg-foreground flex items-center justify-center font-black text-secondary-background text-sm border-2 border-border shrink-0">
                  {data?.username.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-bold text-foreground truncate">
                  {data?.username}
                </p>
              </div>
            ) : (
              <div className="flex justify-center mb-6">
                <div className="w-9 h-9 bg-foreground flex items-center justify-center font-black text-secondary-background text-sm border-2 border-border">
                  {data?.username.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Nav */}
            <nav className="space-y-2">
              {navlink.map((i, x) => {
                const isActive = pathname === i.link;
                return (
                  <Link
                    href={i.link}
                    className={`flex items-center gap-3 p-3 font-bold text-sm transition-all border-2 border-border ${sidebarCollapsed ? "justify-center" : ""} ${
                      isActive
                        ? "bg-foreground text-secondary-background shadow-none"
                        : "bg-secondary-background text-foreground shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    }`}
                    onClick={setSidebarOpen}
                    key={x}
                    title={sidebarCollapsed ? i.title : ""}
                  >
                    {i.icon}
                    {!sidebarCollapsed && i.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleLogOut()}
              className={`flex items-center gap-3 p-3 w-full bg-secondary-background text-foreground border-2 border-border font-bold text-sm shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${sidebarCollapsed ? "justify-center" : ""}`}
              title={sidebarCollapsed ? "Keluar" : ""}
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && "Keluar"}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
