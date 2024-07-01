

export const initFilter = {
  keyword: "",
  billType: null,
  fuelType: null,
  pumpId: null,
  companyId: null,
  branchId: null,
  storeId: null,
  billDate: null, //{ from: moment().subtract(1, 'M').toDate(), to: new Date() }
}

export const initMeta = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
}

export const initColumnVisibility = {
  Logger_ID: false,
  Bill_No: false,
  Bill_Type: true,
  Start_Time: false,
  End_Time: false,
  storeName: false,
  branchName: false,
  companyName: false,
}