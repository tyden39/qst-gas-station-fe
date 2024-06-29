import axiosInstance from "actions/axiosInstance"
import axios from "axios"
import { API_PATHS } from "constants/api-paths"
import { handleError } from "lib/api"
import { convertToQueryString } from "lib/utils"
import { AUTH_CONFIG } from "routers/config"

export const fetchUsers = async (filter, pageMeta) => {
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
      `${API_PATHS.USER_LIST}${queries ? `?${queries}` : ""}`
    )

    const { data, meta } = response.data.data
    return { data, meta }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
      localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
      window.location.href = '/login'
    }
    if (!axios.isAxiosError(error)) console.error(error)
  }
}

export const create = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.USER_CREATE}`,
      formData
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const edit = async (id, formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.USER_EDIT}/${id}`,
      formData
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const deleteUser = async (id, force) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.USER_DELETE}/${id}`,
      {data: {force}}
    )
    return response.status
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_STORAGE_NAME)
      localStorage.removeItem(AUTH_CONFIG.USER_STORAGE_NAME)
      window.location.href = '/login'
    }
    console.log(error)
  }
}

export const fetchOneUser = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.USER_FETCH_ONE}/${id}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}


export const restore = async (id) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.USER_RESTORE}/${id}`
    )
    return response.status
  } catch (error) {
    return handleError(error)
  }
}
