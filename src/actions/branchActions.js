import axiosInstance from "actions/axiosInstance"
import axios from "axios"
import { API_PATHS } from "constants/api-paths"
import { handleError } from "lib/api"
import { convertSorting, convertToQueryString } from "lib/utils"
import { AUTH_CONFIG } from "routers/config"

export const fetchSimpleList = async (filter, pageMeta) => {
  try {
    const params = { ...filter }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.BRANCH_SIMPLE_LIST}${queries ? `?${queries}` : ""}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const fetchAll = async (filter, pageMeta, sorting) => {
  try {
    const sortBy = JSON.stringify(convertSorting(sorting))
    const startDate = filter.createdAt?.from
    const endDate = filter.createdAt?.to
    const newFilter = { ...filter }
    delete newFilter.createdAt

    const { pageSize } = pageMeta
    const page = pageMeta.currentPage

    const params = { startDate, endDate, ...newFilter, page, pageSize, sortBy }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.BRANCH_LIST}${queries ? `?${queries}` : ""}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const create = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.BRANCH_CREATE}`,
      formData
    )
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
      localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
      window.location.href = '/login'
    }
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
  }
}

export const edit = async (id, formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.BRANCH_EDIT}/${id}`,
      formData
    )

    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
      localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
      window.location.href = '/login'
    }
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
  }
}

export const deleteOne = async (id, force) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.BRANCH_DELETE}/${id}`,
      {data: {force}}
    )
    return response.status
  } catch (error) {
    if (error.response.status === 401) {
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
}

export const restoreOne = async (id) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.BRANCH_RESTORE}/${id}`
    )
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export const fetchOne = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.BRANCH_FETCH_ONE}/${id}`
    )

    return response.data
  } catch (error) {
    if (error.response.status === 401) {
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
}
