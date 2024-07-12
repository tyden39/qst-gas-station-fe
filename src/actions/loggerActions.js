import axiosInstance from "actions/axiosInstance"
import { API_PATHS } from "constants/api-paths"
import { handleError } from "lib/api"
import { convertSorting, convertToQueryString } from "lib/utils"

export const fetchSimpleList = async (filter, pageMeta) => {
  try {
    const params = { ...filter }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.LOGGER_SIMPLE_LIST}${queries ? `?${queries}` : ""}`
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
      `${API_PATHS.LOGGER_LIST}${queries ? `?${queries}` : ""}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const create = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.LOGGER_CREATE}`,
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
      `${API_PATHS.LOGGER_EDIT}/${id}`,
      formData
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const deleteOne = async (id, force) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.LOGGER_DELETE}/${id}`,
      {data: {force}}
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const restore = async (id) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.LOGGER_RESTORE}/${id}`
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const fetchOne = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.LOGGER_FETCH_ONE}/${id}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}
