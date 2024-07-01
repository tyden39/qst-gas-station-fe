import PageFilter from "components/layout/page-filter"
import TableColumnSelect from "components/layout/table-column-select"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { buttonVariants } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { USER_ROLE } from "constants/user-roles"
import useTable from "hooks/useTable"
import useTableSelect from "hooks/useTableSelect"
import useFilter from "hooks/userFilter"
import { getActiveMenu } from "lib/url"
import { cn } from "lib/utils"
import moment from "moment"
import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import { fetchInvoices } from "../../actions/fuelActions"
import ExportInvoice from "./components/ExportInvoice"
import RowActions from "./components/RowActions"
import { BILL_TYPES, FUEL_TYPE } from "./constant"
import ExtendFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function FuelPage() {
  const [getPermission, authUser] = useAuth((state) => [
    state.getPermission,
    state.user,
  ])
  const allowCreate = getPermission(PATH.FUEL_CREATE)
  const allowEdit = getPermission(PATH.FUEL_EDIT)

  const location = useLocation()
  const activeMenuName = getActiveMenu(location.pathname)

  const {
    filter,
    meta,
    data,
    onFieldChange,
    setMeta,
    setFilter,
    refreshData,
    loading,
  } = useFilter({ initFilter, initMeta, action: fetchInvoices })

  const { selected, onHeaderChecked, onRowChecked } = useTableSelect({
    data,
    meta,
  })

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "select",
          size: 50,
          header: () => (
            <div className="flex justify-center items-center">
              <Checkbox
                checked={
                  selected.length > 0 &&
                  (selected.length === meta.totalItems || "indeterminate")
                }
                onCheckedChange={onHeaderChecked}
                aria-label="Select all"
              />
            </div>
          ),
          cell: ({ row }) => {
            const rowValue = row.original

            return (
              <div className="flex justify-center items-center">
                <Checkbox
                  checked={selected.includes(rowValue.id)}
                  onCheckedChange={(value) => onRowChecked(value, rowValue)}
                  aria-label="Select row"
                />
              </div>
            )
          },
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: "order",
          size: 50,
          header: () => <div className="text-center">STT</div>,
          cell: ({ row }) => {
            const { currentPage, pageSize, totalItems } = meta
            const startItem = totalItems - (currentPage - 1) * pageSize

            return <div className="text-center">{startItem - row.index}</div>
          },
          disableSortBy: true,
        },
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
        {
          accessorKey: "deletedAt",
          header: () => <div className="text-center">Trạng thái</div>,
          cell: ({ row }) => {
            return (
              <div className="text-center">
                {row.getValue("deletedAt") ? (
                  <span className="font-bold text-destructive">Đã xóa</span>
                ) : (
                  <span className="font-bold text-green-500">Hoạt động</span>
                )}
              </div>
            )
          },
        },
        {
          id: "actions",
          size: 50,
          enableHiding: false,
          cell: ({ row }) => {
            const rowValue = row.original
            return (
              <RowActions
                id={rowValue.id}
                checkKey={rowValue.Check_Key}
                userRole={authUser.roles[0]}
                refreshData={refreshData}
              />
            )
          },
        },
      ].filter((item) => {
        const isAdmin = authUser.roles[0] === USER_ROLE.ADMIN
        if (item.accessorKey === "deletedAt" && !isAdmin) return false
        return allowEdit ? true : item.id !== "actions"
      }),
    [
      meta,
      selected,
      refreshData,
      allowEdit,
      authUser.roles,
      onHeaderChecked,
      onRowChecked,
    ]
  )

  const { table } = useTable({
    columns,
    loading,
    initColumnVisibility,
    data,
    meta,
  })

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl leading-normal">{activeMenuName}</h1>
        <div className="space-x-2">
          <ExportInvoice {...{ filter, meta, selected }} />
          {allowCreate && (
            <Link
              className={cn(buttonVariants({ variant: "outline" }))}
              to={PATH.FUEL_CREATE}
            >
              Tạo Hóa Đơn
            </Link>
          )}
          <TableColumnSelect {...{ table }} />
        </div>
      </div>

      <PageFilter
        {...{
          setFilter,
          searchInputPlaceholder: "Tìm kiếm theo Mã Kiểm Tra",
        }}
      >
        <ExtendFilter
          {...{
            authUser,
            filter,
            onFieldChange,
          }}
        />
      </PageFilter>
      
      <PageTable {...{ table }} />
      <PagePagination {...{ setMeta, meta, selected }} />
    </div>
  )
}
