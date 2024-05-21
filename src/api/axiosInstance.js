import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_WS_BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
