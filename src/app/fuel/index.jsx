import { deleteInvoice, fetchInvoices, restore } from "actions/fuelActions"
import { PageList } from "components/layout/page-list"
import moment from "moment"
import { useMemo, useState } from "react"
import ExportInvoice from "./components/ExportInvoice"
import { BILL_TYPES, FUEL_TYPE } from "./constant"
import AdditionalFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "lib/utils"

export function FuelPage() {
  const [sorting, setSorting] = useState([])

  const handleToggleSorting = (columnId) => {
    setSorting((prevSorting) => {
      const existingIndex = prevSorting.findIndex(([name]) => name === columnId)

      if (existingIndex !== -1) {
        const newSorting = [...prevSorting]
        const [name, direction] = newSorting[existingIndex]
        const newDirection = direction === "asc" ? "desc" : "asc"
        newSorting[existingIndex] = [name, newDirection]
        return newSorting
      } else {
        return [[columnId, "asc"]]
      }
    })
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "Check_Key",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="group flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(columnId)
              }}
            >
              Mã kiểm tra
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Check_Key")}</div>
        ),
      },
      {
        accessorKey: "Logger_ID",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(columnId)
              }}
            >
              Mã logger
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Logger_ID")}</div>
        ),
      },
      {
        accessorKey: "Logger_Time",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)

          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(columnId)
              }}
            >
              Thời gian ghi log
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
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
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(columnId)
              }}
            >
              Vòi bơm
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Pump_ID")}</div>
        ),
      },
      {
        accessorKey: "Bill_No",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Mã hóa đơn
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("Bill_No")}</div>
        ),
      },
      {
        accessorKey: "Bill_Type",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Loại hóa đơn
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
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
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Loại nhiên liệu
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
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
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Thời gian bắt đầu bơm
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => {
          const formatted = moment(row.getValue("Start_Time")).format(
            "DD-MM-YYYY HH:mm:ss"
          )
          return <div className="text-center">{formatted}</div>
        },
      },
      {
        accessorKey: "End_Time",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Thời gian kết thúc bơm
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => {
          const formatted = moment(row.getValue("End_Time")).format(
            "DD-MM-YYYY HH:mm:ss"
          )
          return <div className="text-center">{formatted}</div>
        },
      },
      {
        accessorKey: "Unit_Price",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-end text-right items-center gap-1 capitalize cursor-pointer"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Giá
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
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
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-end text-right items-center gap-1 capitalize cursor-pointer"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Số lượng
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => {
          const quantity = parseFloat(row.getValue("Quantity"))

          return <div className="text-right font-medium">{quantity} l</div>
        },
      },
      {
        accessorKey: "Total_Price",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-end text-right items-center gap-1 capitalize cursor-pointer"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Tổng tiền
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
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
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Cửa hàng
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => {
          const rowValue = row.original
          return <div className="text-center">{rowValue.storeName}</div>
        },
      },
      {
        accessorKey: "branchName",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Chi Nhánh
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => {
          const rowValue = row.original
          return <div className="text-center">{rowValue.branchName}</div>
        },
      },
      {
        accessorKey: "companyName",
        header: (header) => {
          const columnId = header?.column?.id
          const sort = sorting.find(([name]) => name === columnId)
          return (
            <div
              className="flex justify-center items-center gap-1 capitalize cursor-pointer text-center"
              onClick={() => {
                if (header) handleToggleSorting(header?.column?.id)
              }}
            >
              Công Ty
              {header ? (
                sort ? (
                  sort[1] === "asc" ? (
                    <ChevronUp className={cn("shrink-0 w-4 h-4")} />
                  ) : (
                    <ChevronDown className={cn("shrink-0 w-4 h-4")} />
                  )
                ) : (
                  <ChevronsUpDown className={cn("shrink-0 w-4 h-4")} />
                )
              ) : null}
            </div>
          )
        },
        cell: ({ row }) => {
          const rowValue = row.original

          return <div className="text-center">{rowValue.companyName}</div>
        },
      },
    ],
    [sorting]
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
        isSelect: true,
        sorting,
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
