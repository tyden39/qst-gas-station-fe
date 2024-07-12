import {
  deleteBulk,
  deleteInvoice,
  fetchInvoices,
  restore,
  restoreBulk,
} from "actions/fuelActions"
import { PageList } from "components/layout/page-list"
import useInitStructure from "hooks/useInitStructure"
import moment from "moment"
import { useMemo } from "react"
import ExportInvoice from "./components/ExportInvoice"
import { BILL_TYPES, FUEL_TYPE } from "./constant"
import AdditionalFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import StructureFilter from "./structure-filter"

export function FuelPage() {
  const initExtra = useInitStructure()

  const columns = useMemo(
    () => [
      {
        accessorKey: "Check_Key",
        header: (header) => "Mã kiểm tra",
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Check_Key")}</div>
        ),
      },
      {
        accessorKey: "Logger_ID",
        header: (header) => "Mã logger",
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Logger_ID")}</div>
        ),
      },
      {
        accessorKey: "Logger_Time",
        header: (header) => "Thời gian ghi log",
        cell: ({ row }) => {
          const formatted = moment(row.getValue("Logger_Time")).format(
            "DD-MM-YYYY HH:mm:ss"
          )
          return <div className="text-center">{formatted}</div>
        },
      },
      {
        accessorKey: "Pump_ID",
        size: 50,
        header: (header) => "Vòi bơm",
        cell: ({ row }) => (
          <div className="text-center">
            {Number(row.getValue("Pump_ID")) + 1}
          </div>
        ),
      },
      {
        accessorKey: "Bill_No",
        header: (header) => "Mã hóa đơn",
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Bill_No")}</div>
        ),
      },
      {
        accessorKey: "Bill_Type",
        header: (header) => "Loại hóa đơn",
        cell: ({ row }) => (
          <div className="text-center">
            {BILL_TYPES.find(
              (item) => item.value === row.getValue("Bill_Type").toString()
            )?.label || ""}
          </div>
        ),
      },
      {
        accessorKey: "Fuel_Type",
        header: (header) => "Loại nhiên liệu",
        cell: ({ row }) => (
          <div className="text-center">
            {row.getValue("Fuel_Type") ?? ""}
          </div>
        ),
      },
      {
        accessorKey: "Start_Time",
        header: (header) => "Thời gian bắt đầu bơm",
        cell: ({ row }) => {
          const formatted = moment(row.getValue("Start_Time")).format(
            "DD-MM-YYYY HH:mm:ss"
          )
          return <div className="text-center">{formatted}</div>
        },
      },
      {
        accessorKey: "End_Time",
        header: (header) => "Thời gian kết thúc bơm",
        cell: ({ row }) => {
          const formatted = moment(row.getValue("End_Time")).format(
            "DD-MM-YYYY HH:mm:ss"
          )
          return <div className="text-center">{formatted}</div>
        },
      },
      {
        accessorKey: "Unit_Price",
        align: "right",
        header: (header) => "Giá",
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("Unit_Price"))

          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(amount)

          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        accessorKey: "Quantity",
        align: "right",
        header: (header) => "Số lượng",
        cell: ({ row }) => {
          const quantity = parseFloat(row.getValue("Quantity"))

          return <div className="text-right font-medium">{quantity} l</div>
        },
      },
      {
        accessorKey: "Total_Price",
        align: "right",
        header: (header) => "Tổng tiền",
        cell: ({ row }) => {
          const value = parseFloat(row.getValue("Total_Price"))

          const formatted = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value)

          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        accessorKey: "storeName",
        header: (header) => "Cửa hàng",
        cell: ({ row }) => {
          const rowValue = row.original
          return <div className="text-center">{rowValue.storeName}</div>
        },
      },
      {
        accessorKey: "branchName",
        header: (header) => "Chi Nhánh",
        cell: ({ row }) => {
          const rowValue = row.original
          return <div className="text-center">{rowValue.branchName}</div>
        },
      },
      {
        accessorKey: "companyName",
        header: (header) => "Công Ty",
        cell: ({ row }) => {
          const rowValue = row.original

          return <div className="text-center">{rowValue.companyName}</div>
        },
      },
    ],
    []
  )

  return (
      <PageList
        {...{
          cols: columns,
          actions: Actions,
          additionalFilter: AdditionalFilter,
          strutureFilter: StructureFilter,
          pageName: "fuel",
          pageLabel: "hóa đơn",
          deleteAction: deleteInvoice,
          deleteBulkAction: deleteBulk,
          restoreBulkAction: restoreBulk,
          restoreAction: restore,
          fetchAction: fetchInvoices,
          initColumnVisibility,
          initFilter,
          initMeta,
          isSelect: true,
          initExtra,
          searchInputPlaceholder: "Tìm kiếm Mã kiểm tra | Mã logger",
          filtersNotCount: ['companyId', 'branchId', 'storeId']
        }}
      />
  )
}

const Actions = ({ filter, meta, selected, unselected }) => {
  return (
    <>
      <ExportInvoice {...{ filter, meta, selected, unselected }} />
    </>
  )
}
