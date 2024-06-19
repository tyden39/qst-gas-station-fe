import axiosInstance from "actions/axiosInstance"
import axios from "axios"
import { API_PATHS } from "constants/api-paths"
import { USER_ROLE } from "constants/user-roles"
import { AUTH_CONFIG } from "routers/config"
import PATH from "routers/path"
import { create } from "zustand"

const handleLogin = async (set, formData) => {
  set({ loading: true })

  try {
    const response = await axiosInstance.post(API_PATHS.LOGIN, formData)


    const { user, tokens } = response.data.data

    set({ user })

    localStorage.setItem(
      AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME,
      tokens.accessToken
    )
    localStorage.setItem(
      AUTH_CONFIG.USER_STORAGE_NAME,
      JSON.stringify({ ...user })
    )

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
    set({ loading: false })
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
    set({ loading: false, user: null })
  }
}

const handleGetPermisson = (get, path, role) => {
  const user = get().user
  if (
    user?.roles === USER_ROLE.READ_ONLY_STORE &&
    role === "edit" &&
    path.includes(PATH.FUEL)
  ) {
    return false
  }
  return true
}

const useAuth = create((set, get) => ({
  loading: false,
  user: JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_STORAGE_NAME)),
  login: async (formData) => handleLogin(set, formData),
  logout: () => handleLogout(set),
  getPermission: (path, role) => handleGetPermisson(get, path, role),
}))

export default useAuth
