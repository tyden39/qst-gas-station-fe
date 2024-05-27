import axiosInstance from "api/axiosInstance"
import { API_PATHS } from "constants/api-paths"
import { AUTH_CONFIG } from "routers/config"
import { create } from "zustand"

const handleLogin = async (set, formData) => {
  set({loading: true})
  try {
    const response = await axiosInstance.post(API_PATHS.LOGIN, formData)

    const {user, tokens} = response.data.data

    localStorage.setItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME, tokens.accessToken)
    localStorage.setItem(AUTH_CONFIG.USER_STORAGE_NAME, JSON.stringify({ username: user.username, isAdmin: true }))

    set({ user: { username: user.username, isAdmin: true } })

    return response.data
  } catch (error) {
    return error.response.data
  } finally {
    set({loading: false, user: null})
  }
}

const handleLogout = async (set) => {
  set({loading: true})

  try {
    await axiosInstance.post(API_PATHS.LOGOUT)
    
    localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
    localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)

    return true
  } catch (error) {
    return false
  } finally {
    set({loading: false})
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