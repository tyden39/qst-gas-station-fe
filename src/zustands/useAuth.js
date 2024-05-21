import axiosInstance from "api/axiosInstance"
import { API_PATH } from "api/paths"
import { AUTH_CONFIG } from "routers/config"
import { create } from "zustand"

const handleLogin = async (set, formData) => {
  try {
    const response = await axiosInstance.post(API_PATH.LOGIN, formData)

    const {user, tokens} = response.data.data

    localStorage.setItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME, tokens.accessToken)
    localStorage.setItem(AUTH_CONFIG.USER_STORAGE_NAME, JSON.stringify({ username: user.username, isAdmin: true }))

    set({ user: { username: user.username, isAdmin: true } })
    return true
  } catch (error) {
    // console.log(error)
    return false
  }
}

const handleLogout = async (set) => {
  try {
    set({loading: true})

    await axiosInstance.post(API_PATH.LOGOUT)
    
    localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
    localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)

    set({loading: false, user: null})

    return true
  } catch (error) {
    set({loading: false})
    return false
  }
}

const useAuth = create((set, get) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({ user: { username: user?.username, isAdmin: true } }),
  login: async (formData) => handleLogin(set, formData),
  logout: () => handleLogout(set),
}))

export default useAuth