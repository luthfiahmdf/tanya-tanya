import { createStore } from "zustand/vanilla";
export type SidebartState = {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
};
export type SidebarAction = {
  setSidebarOpen: () => void;
  setSidebarCollapsed: () => void;
};

export type SidebarStore = SidebartState & SidebarAction;

export const defaultState: SidebartState = {
  sidebarOpen: false,
  sidebarCollapsed: true,
};
export const createSidebarStore = (initState: SidebartState = defaultState) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarCollapsed: () =>
      set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  }));
};
