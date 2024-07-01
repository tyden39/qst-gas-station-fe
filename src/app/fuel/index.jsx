import { PageList } from "components/layout/page-list"
import moment from "moment"
import { useMemo } from "react"
import { deleteInvoice, restore, fetchInvoices } from "actions/fuelActions"
import ExportInvoice from "./components/ExportInvoice"
import { BILL_TYPES, FUEL_TYPE } from "./constant"
import AdditionalFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function FuelPage() {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "Check_Key",
          header: () => (
            <div className="text-center capitalize">Mã kiểm tra</div>
          ),
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("Check_Key")}</div>
          ),
        },
        {
          accessorKey: "Logger_ID",
          header: () => <div className="text-center capitalize">Mã logger</div>,
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("Logger_ID")}</div>
          ),
        },
        {
          accessorKey: "Logger_Time",
          header: () => (
            <div className="text-center capitalize">Thời gian ghi log</div>
          ),
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
          header: () => <div className="text-center capitalize">Vòi bơm</div>,
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("Pump_ID")}</div>
          ),
        },
        {
          accessorKey: "Bill_No",
          header: () => (
            <div className="capitalize text-center">Mã hóa đơn</div>
          ),
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("Bill_No")}</div>
          ),
        },
        {
          accessorKey: "Bill_Type",
          header: () => (
            <div className="capitalize text-center">Loại hóa đơn</div>
          ),
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
          header: () => (
            <div className="text-center capitalize">Loại nhiên liệu</div>
          ),
          cell: ({ row }) => (
            <div className="text-center">
              {FUEL_TYPE.find(
                (item) => item.value === row.getValue("Fuel_Type").toString()
              )?.label || ""}
            </div>
          ),
        },
        {
          accessorKey: "Start_Time",
          header: () => (
            <div className="text-center capitalize">Thời gian bắt đầu bơm</div>
          ),
          cell: ({ row }) => {
            const formatted = moment(row.getValue("Start_Time")).format(
              "DD-MM-YYYY HH:mm:ss"
            )
            return <div className="text-center">{formatted}</div>
          },
        },
        {
          accessorKey: "End_Time",
          header: () => (
            <div className="text-center capitalize">Thời gian kết thúc bơm</div>
          ),
          cell: ({ row }) => {
            const formatted = moment(row.getValue("End_Time")).format(
              "DD-MM-YYYY HH:mm:ss"
            )
            return <div className="text-center">{formatted}</div>
          },
        },
        {
          accessorKey: "Unit_Price",
          header: () => <div className="text-right capitalize">Giá</div>,
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
          header: () => <div className="text-right capitalize">Số lượng</div>,
          cell: ({ row }) => {
            const quantity = parseFloat(row.getValue("Quantity"))

            return <div className="text-right font-medium">{quantity} l</div>
          },
        },
        {
          accessorKey: "Total_Price",
          header: () => <div className="text-right capitalize">Tổng tiền</div>,
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
          header: () => <div className="text-center">Cửa hàng</div>,
          cell: ({ row }) => {
            const rowValue = row.original
            return <div className="text-center">{rowValue.storeName}</div>
          },
        },
        {
          accessorKey: "branchName",
          header: () => <div className="text-center">Chi Nhánh</div>,
          cell: ({ row }) => {
            const rowValue = row.original
            return <div className="text-center">{rowValue.branchName}</div>
          },
        },
        {
          accessorKey: "companyName",
          header: () => <div className="text-center">Công Ty</div>,
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
        pageName: "fuel",
        pageLabel: "hóa đơn",
        deleteAction: deleteInvoice,
        restoreAction: restore,
        fetchAction: fetchInvoices,
        initColumnVisibility,
        initFilter,
        initMeta,
        isSelect: true
      }}
    />
  )
}

const Actions = ({ filter, meta, selected }) => {
  return (
    <>
      <ExportInvoice {...{ filter, meta, selected }} />
    </>
  )
}
