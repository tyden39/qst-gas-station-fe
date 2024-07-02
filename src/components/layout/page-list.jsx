import PageFilter from "components/layout/page-filter"
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
import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import RowActions from "./row-actions"
import TableColumnSelect from "./table-column-select"

export function PageList({
  cols,
  actions,
  pageName,
  pageLabel,
  isSelect,
  additionalFilter,
  initColumnVisibility,
  initFilter,
  initMeta,
  deleteAction,
  restoreAction,
  fetchAction,
  autoRefresh,
  refreshDelay,
}) {
  const [getPermission, authUser] = useAuth((state) => [
    state.getPermission,
    state.user,
  ])

  const allowCreate = getPermission(PATH[`${pageName.toUpperCase()}_CREATE`])
  const allowEdit = getPermission(PATH[`${pageName.toUpperCase()}_EDIT`])

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
  } = useFilter({ initFilter, initMeta, action: fetchAction, refreshDelay, autoRefresh })

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
        ...cols,
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
                isDeleted={Boolean(rowValue.deletedAt)}
                userRole={authUser.roles[0]}
                refreshData={refreshData}
                deleteAction={deleteAction}
                restoreAction={restoreAction}
                pageLabel={pageLabel}
                pageName={pageName}
              />
            )
          },
        },
      ].filter((item) => {
        const isAdmin = authUser.roles[0] === USER_ROLE.ADMIN

        if (item.accessorKey === "deletedAt" && !isAdmin) return false
        if (item.accessorKey === "select" && !isSelect) return false

        return allowEdit ? true : item.id !== "actions"
      }),
    [
      refreshData,
      meta,
      authUser.roles,
      cols,
      isSelect,
      allowEdit,
      onHeaderChecked,
      onRowChecked,
      selected,
      deleteAction,
      pageLabel,
      pageName,
      restoreAction,
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
        <h1 className="text-4xl leading-normal ml-3 font-bold">
          {activeMenuName}
        </h1>
        <div className="space-x-2">
          {actions ? actions({ filter, meta, selected }) : null}
          {allowCreate && (
            <Link
              className={cn(buttonVariants())}
              to={PATH[`${pageName.toUpperCase()}_CREATE`]}
            >
              Tạo {pageLabel}
            </Link>
          )}
          <TableColumnSelect {...{ table }} />
        </div>
      </div>

      <PageFilter
        {...{
          setFilter,
          searchInputPlaceholder: "Tìm kiếm nhanh",
        }}
      >
        {additionalFilter ? additionalFilter({
          authUser,
          filter,
          onFieldChange,
        }) : null}
      </PageFilter>

      <PageTable {...{ table }} />
      <PagePagination {...{ setMeta, meta, selected }} />
    </div>
  )
}
