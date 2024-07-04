import { create } from "zustand"

const useGlobalLoading = create((set, get) => ({
  globalLoading: false,
  setGlobalLoading: (value) => set(({ globalLoading: value })),
}))

export default useGlobalLoading