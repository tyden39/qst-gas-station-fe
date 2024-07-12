import axios from 'axios'
const { AUTH_CONFIG } = require("routers/config")

export const handleError = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
    localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
    window.location.href = '/login'
  }
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
}