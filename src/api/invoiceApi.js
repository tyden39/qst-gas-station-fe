import axiosInstance from "api/axiosInstance"
import { convertToQueryString } from "lib/utils"
import FileSaver from 'file-saver';
import { API_PATHS } from "constants/api-paths";

export const fetchOneInvoice = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.INVOICE_FETCH_ONE}/${id}`
    )

    return response
  } catch (error) {
    return error.response
  }
}

export const fetchInvoices = async (filter, pageMeta) => {
  try {
    const startDate = filter.billDate?.from
    const endDate = filter.billDate?.to
    const newFilter = { ...filter }
    delete newFilter.billDate

    const { pageSize } = pageMeta
    const page = pageMeta.currentPage

    const params = { startDate, endDate, ...newFilter, page, pageSize }
    const queries = convertToQueryString(params)

    const response = await axiosInstance.get(
      `${API_PATHS.INVOICE_LIST}${queries ? `?${queries}` : ""}`
    )

    const { data, meta } = response.data.data
    return { data, meta }
  } catch (error) {}
}

export const handleExport = async (filter, pageMeta, selected) => {
  try {
    const ids = selected
    const startDate = filter.billDate?.from
    const endDate = filter.billDate?.to
    const newFilter = { ...filter }
    delete newFilter.billDate

    const { pageSize } = pageMeta
    const page = pageMeta.currentPage

    const params = { startDate, endDate, ...newFilter, page, pageSize, ids }
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
    console.log(error)
    return 'Xuất excel thất bại'
  }
}

export const deleteInvoice = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_PATHS.INVOICE_DELETE}/${id}`
    )
    return response.status
  } catch (error) {
    console.log(error)
  }
}

export const createInvoice = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.INVOICE_CREATE}`,
      formData
    )
    return response
  } catch (error) {
    return error.response
  }
}

export const editInvoice = async (id, formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_PATHS.INVOICE_EDIT}/${id}`,
      formData
    )
    return response
  } catch (error) {
    return error.response
  }
}