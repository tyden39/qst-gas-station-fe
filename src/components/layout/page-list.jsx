import { fetchAll } from "actions/loggerActions"
import PageFilter from "components/layout/page-filter"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { Checkbox } from "components/ui/checkbox"
import { USER_ROLE } from "constants/user-roles"
import useTable from "hooks/useTable"
import useTableSelect from "hooks/useTableSelect"
import useFilter from "hooks/userFilter"
import { getActiveMenu } from "lib/url"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import RowActions from "./components/RowActions"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function PageList({
  cols,
  actions,
  pageName,
  isSelect,
  additionalFilter,
}) {
  const [getPermission, user] = useAuth((state) => [
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
  } = useFilter({ initFilter, initMeta, action: fetchAll })

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
        if (item.accessorKey === "deletedAt" && !isAdmin) return false
        if (item.accessorKey === "select" && !isSelect) return false

        const isAdmin = user.roles[0] === USER_ROLE.ADMIN
        return allowEdit ? true : item.id !== "actions"
      }),
    [
      refreshData,
      meta,
      user.roles,
      cols,
      isSelect,
      allowEdit,
      onHeaderChecked,
      onRowChecked,
      selected,
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
        {actions({ table, allowCreate })}
      </div>

      <PageFilter
        {...{
          setFilter,
          searchInputPlaceholder: "Tìm kiếm nhanh",
        }}
      >
        {additionalFilter({
          user,
          filter,
          onFieldChange,
        })}
      </PageFilter>

      <PageTable {...{ table }} />
      <PagePagination {...{ setMeta, meta, selected }} />
    </div>
  )
}
