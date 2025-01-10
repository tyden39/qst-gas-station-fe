import EllipsisTooltip from "components/EllipsisTooltip"
import PageFilter from "components/layout/page-filter"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { buttonVariants } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { USER_ROLE } from "constants/user-roles"
import useTable from "hooks/useTable"
import useTableSelect from "hooks/useTableSelect"
import useFilter from "hooks/useFilter"
import { getActiveMenu } from "lib/url"
import { cn } from "lib/utils"
import moment from "moment"
import { useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import ButtonRefresh from "./ButtonRefresh"
import SelectedActions from "./page-selected-actions"
import RowActions from "./row-actions"
import TableColumnSelect from "./table-column-select"

export function PageList({
  cols,
  actions,
  pageName,
  pageLabel,
  isSelect,
  additionalFilter,
  strutureFilter,
  initColumnVisibility,
  initFilter,
  initMeta,
  deleteAction,
  restoreAction,
  fetchAction,
  autoRefresh,
  refreshDelay,
  initExtra,
  searchInputPlaceholder,
  restoreBulkAction,
  deleteBulkAction,
  filtersNotCount,
  showRefresh,
}) {
  const [getPermission, authUser] = useAuth((state) => [
    state.getPermission,
    state.user,
  ])

  const allowCreate = getPermission(PATH[`${pageName.toUpperCase()}_CREATE`])
  const allowEdit = getPermission(PATH[`${pageName.toUpperCase()}_EDIT`])

  const location = useLocation()
  const activeMenuName = getActiveMenu(location.pathname)

  const [sorting, setSorting] = useState([])

  const {
    filter,
    activedFilter,
    meta,
    metaFeedback,
    data,
    onFieldChange,
    setMeta,
    setFilter,
    setActivedFilter,
    refreshData,
    loading,
    initLoading,
    applyFilter,
    resetData
  } = useFilter({
    initFilter,
    initMeta,
    action: fetchAction,
    refreshDelay,
    autoRefresh,
    sorting,
    setSorting
  })

  const {
    selected,
    unselected,
    onHeaderChecked,
    onRowChecked,
    setSelected,
    setUnselected,
  } = useTableSelect({
    data,
    meta: {...meta, ...metaFeedback},
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
                  selected === "all"
                    ? unselected.length === 0
                      ? true
                      : "indeterminate"
                    : selected.length === 0
                    ? false
                    : "indeterminate"
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
                  checked={
                    (selected === "all" && !unselected.includes(rowValue.id)) ||
                    selected.includes(rowValue.id)
                  }
                  onCheckedChange={(value) => onRowChecked(value, rowValue)}
                  aria-label="Select row"
                />
              </div>
            )
          },
          enableHiding: false,
          enableSorting: false,
        },
        {
          accessorKey: "order",
          size: 50,
          header: () => <div className="text-center">STT</div>,
          cell: ({ row }) => {
            const { currentPage, pageSize } = meta
            const {totalItems} = metaFeedback
            const startItem = totalItems - (currentPage - 1) * pageSize

            return <div className="text-center">{startItem - row.index}</div>
          },
          enableSorting: false,
        },
        ...cols,
        {
          accessorKey: "createdAt",
          header: () => <div className="text-center">Ngày tạo</div>,
          cell: ({ row }) => {
            const formatted = moment(row.getValue("createdAt")).format(
              "DD-MM-YYYY HH:mm:ss"
            )
            return (
              <div className="text-center">
                <EllipsisTooltip type="vertical" content={formatted}>
                  {formatted}
                </EllipsisTooltip>
              </div>
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
          accessorKey: "actions",
          header: ({ table }) => {
            return <TableColumnSelect {...{ table, pageName }} />
          },
          size: 50,
          enableSorting: false,
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
      metaFeedback,
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
      unselected,
    ]
  )

  const { table } = useTable({
    columns,
    loading: initLoading,
    initColumnVisibility,
    data,
    meta: {...meta, ...metaFeedback},
    sorting,
    setSorting,
    pageName,
  })

  return (
    <div className="w-full h-full flex flex-col">
      {strutureFilter ? (
        <div className="grid grid-cols-3 gap-2 mt-2 mx-4 max-w-[1632px]">
          {strutureFilter({
            authUser,
            filter,
            onFieldChange,
            initExtra,
            setFilter,
            setActivedFilter,
            applyFilter
          })}
        </div>
      ) : null}

      <div className="flex flex-wrap max-sm:justify-center justify-between items-center gap-2 flex-shrink-0 mt-3 mx-4">
        <h1 className="text-4xl leading-normal font-bold max-sm:text-2xl max-sm:w-full max-sm:text-center">{activeMenuName}</h1>
        <div className="space-x-2 flex">
          {actions ? actions({ filter: activedFilter, meta: {...meta, ...metaFeedback}, selected, unselected }) : null}
          {allowCreate && (
            <Link
              className={cn(buttonVariants(), "max-sm:px-2 max-sm:py-1 max-sm:h-8")}
              to={PATH[`${pageName.toUpperCase()}_CREATE`]}
            >
              Tạo {pageLabel}
            </Link>
          )}
          {showRefresh && <ButtonRefresh applyFilter={applyFilter} />}
        </div>
      </div>

      <div
        className={cn(
          "relative border-t mt-3 py-2 px-4 overflow-hidden",
          "flex gap-2 items-center",
          "flex-shrink-0",
          "bg-white",
          "max-sm:px-2"
        )}
      >
        {selected && selected.length > 0 ? (
          <SelectedActions
            {...{
              selected,
              unselected,
              setSelected,
              setUnselected,
              refreshData,
              authUser,
              restoreBulkAction,
              deleteBulkAction,
              meta,
              metaFeedback,
            }}
          />
        ) : (
          <PageFilter
            {...{
              filter,
              setFilter,
              resetData,
              initFilter,
              applyFilter,
              activedFilter,
              initExtra,
              searchInputPlaceholder:
                searchInputPlaceholder ?? "Tìm kiếm nhanh",
              additionalFilter,
              authUser,
              onFieldChange,
              filtersNotCount,
            }}
          ></PageFilter>
        )}
      </div>

      <PageTable {...{ table, loading }} />
      <PagePagination {...{ setMeta, meta, metaFeedback, selected, unselected }} />
    </div>
  )
}
