import axiosInstance from "actions/axiosInstance"
import axios from "axios"
import { API_PATHS } from "constants/api-paths"
import { convertToQueryString } from "lib/utils"

export const fetchSimpleList = async (filter, pageMeta) => {
  try {
    const params = { ...filter }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.BRANCH_SIMPLE_LIST}${queries ? `?${queries}` : ""}`
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
  }
}

export const fetchAll = async (filter, pageMeta) => {
  try {
    const startDate = filter.createdAt?.from
    const endDate = filter.createdAt?.to
    const newFilter = { ...filter }
    delete newFilter.createdAt

    const { pageSize } = pageMeta
    const page = pageMeta.currentPage

    const params = { startDate, endDate, ...newFilter, page, pageSize }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.BRANCH_LIST}${queries ? `?${queries}` : ""}`
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

export const deleteOne = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.BRANCH_DELETE}/${id}`
    )
    return response.status
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
  }
}

export const fetchOne = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.BRANCH_FETCH_ONE}/${id}`
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
  }
}
