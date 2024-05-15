import menu from 'routers/menu'
import { create } from 'zustand'

export const useAppNavigation = create((set, get) => ({
  collapsed: false,
  activedMenu: menu[0],
  toggleCollapsed: () => set({ collapsed: !get().collapsed }),
  setActivedMenu: (menuItem) => set({ activedMenu: menuItem }),
}))