import axiosInstance from "actions/axiosInstance"
import { API_PATHS } from "constants/api-paths"
import { handleError } from "lib/api"
import { convertSorting, convertToQueryString } from "lib/utils"

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
      `${API_PATHS.COMPANY_LIST}${queries ? `?${queries}` : ""}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const fetchSimpleList = async (filter, pageMeta) => {
  try {
    const params = { ...filter }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.COMPANY_SIMPLE_LIST}${queries ? `?${queries}` : ""}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const createCompany = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.COMPANY_CREATE}`,
      formData
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const editCompany = async (id, formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.COMPANY_EDIT}/${id}`,
      formData
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const deleteCompany = async (id, force) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.COMPANY_DELETE}/${id}`,
      { data: { force } }
    )
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export const fetchOneCompany = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.COMPANY_FETCH_ONE}/${id}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const restoreOne = async (id) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.COMPANY_RESTORE}/${id}`
    )
    return response.status
  } catch (error) {
    return handleError(error)
  }
}