import axios from "axios"
import { AUTH_CONFIG } from "routers/config"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_WS_BASE_URL,
  timeout: 10000,
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

// Response interceptor to handle common responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 200 range
      if (error.response.status === 401) {
        localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
        localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
        window.location.href = '/login'
      }
    } else if (error.request) {
      // Request was made but no response received
      // console.error('Network Error:', error.message);
    } else {
      // Something else happened while setting up the request
      // console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance
