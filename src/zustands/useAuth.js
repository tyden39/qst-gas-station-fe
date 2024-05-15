import { create } from "zustand"

const handleLogin = (set) => {
  set({ user: { username: "Admin", isAdmin: true } })
  return true
}

const useAuth = create((set, get) => ({
  user: null,
  isAdmin: false,
  login: () => handleLogin(set),
  logout: () => set({ user: null }),
}))

export default useAuth