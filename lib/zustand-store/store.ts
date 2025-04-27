import { createStore } from "zustand/vanilla";
export type SidebartState = {
  sidebarOpen: boolean;
};
export type SidebarAction = {
  setSidebarOpen: () => void;
};

export type SidebarStore = SidebartState & SidebarAction;

export const defaultState: SidebartState = {
  sidebarOpen: false,
};
export const createSidebarStore = (initState: SidebartState = defaultState) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  }));
};
