"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";

import { useStore } from "zustand";

import {
  type SidebarStore,
  createSidebarStore,
} from "@/lib/zustand-store/store";
export type SidebarApi = ReturnType<typeof createSidebarStore>;
export const SidebarStoreContext = createContext<SidebarApi | undefined>(
  undefined
);

export interface SidebarStoreProviderProps {
  children: ReactNode;
}

export const SidebarStoreProvider = ({
  children,
}: SidebarStoreProviderProps) => {
  const storeRef = useRef<SidebarApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSidebarStore();
  }
  return (
    <SidebarStoreContext.Provider value={storeRef.current}>
      {children}
    </SidebarStoreContext.Provider>
  );
};

export const useSidebarStore = <T,>(
  selector: (store: SidebarStore) => T
): T => {
  const sidebarStoreContext = useContext(SidebarStoreContext);
  if (!sidebarStoreContext) {
    throw new Error(
      "useSidebarStore must be used within a SidebarStoreProvider"
    );
  }
  return useStore(sidebarStoreContext, selector);
};
