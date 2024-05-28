import axiosInstance from "api/axiosInstance"
import axios from "axios"
import { API_PATHS } from "constants/api-paths"
import { AUTH_CONFIG } from "routers/config"
import { create } from "zustand"

const handleLogin = async (set, formData) => {
  set({ loading: true })

  try {
    const response = await axiosInstance.post(API_PATHS.LOGIN, formData)

    const { user, tokens } = response.data.data

    localStorage.setItem(
      AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME,
      tokens.accessToken
    )
    localStorage.setItem(
      AUTH_CONFIG.USER_STORAGE_NAME,
      JSON.stringify({ username: user.username, isAdmin: true })
    )

    set({ user: { username: user.username, isAdmin: true } })

    return response.data
  } catch (error) {
    if (!axios.isAxiosError(error)) console.error(error)
    return axios.isAxiosError(error)
      ? error.response?.data || {
          status: -1,
          message: "Không thể lấy dữ liệu từ máy chủ!",
        }
      : {
          status: -1,
          message:
            "Lỗi hệ thống, vui lòng liên hệ quản trị viên để biết thêm chi tiết!",
        }
  } finally {
    set({ loading: false, user: null })
  }
}

const handleLogout = async (set) => {
  set({ loading: true })

  try {
    await axiosInstance.get(API_PATHS.LOGOUT)
  } catch (error) {
    console.error(error)
  } finally {
    localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
    localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
    set({ loading: false })
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
