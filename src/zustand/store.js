import { create } from 'zustand'

export const useStore = create((set, get) => ({
  collapsed: false,
  toggleCollapsed: () => set({ collapsed: !get().collapsed }),
}))