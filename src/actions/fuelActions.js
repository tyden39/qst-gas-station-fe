import axiosInstance from "actions/axiosInstance";
import { API_PATHS } from "constants/api-paths";
import FileSaver from 'file-saver';
import { handleError } from "lib/api";
import { convertSorting, convertToQueryString } from "lib/utils";

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
    const startDate = filter.billDate?.start
    const endDate = filter.billDate?.end
    const sortBy = JSON.stringify(convertSorting(sorting))
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
    const startDate = filter.createdAt?.from
    const endDate = filter.createdAt?.to
    const newFilter = { ...filter }
    delete newFilter.createdAt

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

export const deleteBulk = async (selected, unselected, force) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.INVOICE_DELETE_BULK}`,
      {data: {force, selected, unselected}}
    )
    return response
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
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const restoreBulk = async (selected, unselected) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.INVOICE_RESTORE_BULK}`,
      {selected, unselected}
    )
    return response.data
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