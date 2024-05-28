
import moment from "moment"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"

export const initFilter = {
  keyword: "",
  billType: BILL_TYPES[0].value,
  fuelType: FUEL_TYPE[0].value,
  pumpId: PUMP_ID[0].value,
  billDate: { from: moment().subtract(1, 'M').toDate(), to: new Date() }
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
  Bill_Type: false,
  Start_Time: false,
  End_Time: false,
}