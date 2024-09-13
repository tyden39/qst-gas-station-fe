import { create } from "zustand"

const useSidebarMobile = create((set, get) => ({
  toggle: false,
  setToggle: () => set(({ toggle: !get().toggle })),
}))

export default useSidebarMobile