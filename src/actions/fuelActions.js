import axiosInstance from "actions/axiosInstance"
import { convertToQueryString } from "lib/utils"
import FileSaver from 'file-saver';
import { API_PATHS } from "constants/api-paths";
import { AUTH_CONFIG } from "routers/config";
import { handleError } from "lib/api";

export const fetchOneInvoice = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.INVOICE_FETCH_ONE}/${id}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const fetchInvoices = async (filter, pageMeta, sorting) => {
  try {
    const startDate = filter.billDate?.from
    const endDate = filter.billDate?.to
    const sortBy = JSON.stringify(sorting)
    const newFilter = { ...filter }
    delete newFilter.billDate

    const { pageSize } = pageMeta
    const page = pageMeta.currentPage

    const params = { startDate, endDate, ...newFilter, page, pageSize, sortBy }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.INVOICE_LIST}${queries ? `?${queries}` : ""}`
    )

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const handleExport = async (filter, pageMeta, selected, unselected) => {
  try {
    const startDate = filter.billDate?.from
    const endDate = filter.billDate?.to
    const newFilter = { ...filter }
    delete newFilter.billDate

    const { pageSize } = pageMeta
    const page = pageMeta.currentPage

    const params = { startDate, endDate, ...newFilter, page, pageSize, selected, unselected }
    const queries = convertToQueryString(params)

    const response = await axiosInstance({
      url: `${API_PATHS.INVOICE_EXPORT_EXCEL}${queries ? `?${queries}` : ""}`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    })
    if (response.status === 200) 
      FileSaver.saveAs(new Blob([response.data]), 'invoices.xlsx')
  } catch (error) {
    return handleError(error)
  }
}

export const deleteInvoice = async (id, force) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.INVOICE_DELETE}/${id}`,
      {data: {force}}
    )
    return response
  } catch (error) {
    return handleError(error)
  }
}

export const restore = async (id) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.INVOICE_RESTORE}/${id}`
    )
    return response.status
  } catch (error) {
    return handleError(error)
  }
}

export const createInvoice = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.INVOICE_CREATE}`,
      formData
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const editInvoice = async (id, formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.INVOICE_EDIT}/${id}`,
      formData
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}