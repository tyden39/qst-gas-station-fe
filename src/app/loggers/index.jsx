import { fetchAll } from "actions/loggerActions"
import PageFilter from "components/layout/page-filter"
import TableColumnSelect from "components/layout/table-column-select"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { buttonVariants } from "components/ui/button"
import { USER_ROLE } from "constants/user-roles"
import useTable from "hooks/useTable"
import useFilter from "hooks/userFilter"
import { getActiveMenu } from "lib/url"
import { cn } from "lib/utils"
import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import RowActions from "./components/RowActions"
import ExtendFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function LoggerPage() {
  const [getPermission, user] = useAuth((state) => [
    state.getPermission,
    state.user,
  ])
  const allowCreate = getPermission(PATH.LOGGER_CREATE)
  const allowEdit = getPermission(PATH.LOGGER_EDIT)

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
  } = useFilter({ initFilter, initMeta, action: fetchAll })

  const columns = useMemo(
    () =>
      [
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
          accessorKey: "Logger_ID",
          header: () => <div className="text-center">Logger ID</div>,
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("Logger_ID")}</div>
          ),
        },
        {
          accessorKey: "storeName",
          header: () => <div className="text-center">Cửa hàng</div>,
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("storeName")}</div>
          ),
        },
        {
          accessorKey: "branchName",
          header: () => <div className="text-center">Chi Nhánh</div>,
          cell: ({ row }) => (
            <div className="text-center">{row.getValue("branchName")}</div>
          ),
        },
        {
          accessorKey: "companyName",
          header: () => <div className="text-center">Công Ty</div>,
          cell: ({ row }) => {
            return (
              <div className="text-center">{row.getValue("companyName")}</div>
            )
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
                name={rowValue.name}
                userRole={user.roles[0]}
                refreshData={refreshData}
              />
            )
          },
        },
      ].filter((item) => {
        const isAdmin = user.roles[0] === USER_ROLE.ADMIN
        if (item.accessorKey === "deletedAt" && !isAdmin) return false
        return true
      }),
    [refreshData, meta, user.roles]
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
        <h1 className="text-4xl leading-normal ml-3 font-bold">
          {activeMenuName}
        </h1>
        <Actions {...{ table }} />
      </div>

      <PageFilter
        {...{
          setFilter,
          searchInputPlaceholder: "Tìm kiếm nhanh",
        }}
      >
        <ExtendFilter {...{ filter, onFieldChange }} />
      </PageFilter>

      <PageTable {...{ table }} />
      <PagePagination {...{ setMeta, meta }} />
    </div>
  )
}

const Actions = ({ table }) => {
  return (
    <div className="flex justify-end gap-3 mb-3 mt-3">
      <Link className={cn(buttonVariants())} to={PATH.LOGGER_CREATE}>
        Thêm logger
      </Link>

      <TableColumnSelect {...{ table }} />
    </div>
  )
}
