import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import PageHeader from "components/layout/header"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { buttonVariants } from "components/ui/button"
import { Skeleton } from "components/ui/skeleton"
import { USER_ROLES } from "constants/user-roles"
import { cn } from "lib/utils"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import PATH from "routers/path"
import { fetchUsers } from "../../actions/userApi"
import RowActions from "./components/RowActions"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function UserPage() {
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)

  const [filter, setFilter] = useState(initFilter)
  const [activedFilter, setActivedFilter] = useState(initFilter)
  const [sorting, setSorting] = useState([])
  const [loading, setLoading] = useState(false)
  const canSubmit = JSON.stringify(filter) !== JSON.stringify(activedFilter)
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState(initColumnVisibility)

  const [rowSelection, setRowSelection] = useState({})

  const applyFilter = useCallback(
    (forceFilter) => {
      setLoading(true)
      fetchUsers({ ...filter, ...forceFilter }, meta)
        .then(({ data, meta }) => {
          setMeta(meta)
          setData(data)
          setActivedFilter(filter)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    },
    [filter, meta]
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: "order",
        header: () => <div className="text-center">STT</div>,
        cell: ({ row }) => {
          const { currentPage, pageSize, totalItems } = meta
          const startItem = totalItems - (currentPage - 1) * pageSize

          return <div className="text-center">{startItem - row.index}</div>
        },
        disableSortBy: true,
      },
      {
        accessorKey: "username",
        header: () => <div className="text-center">Tên đăng nhập</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("username")}</div>
        ),
      },
      {
        accessorKey: "name",
        header: () => <div className="text-center">Họ và tên</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">{`${row.original.firstName || ""} ${
              row.original.lastName || ""
            }`}</div>
          )
        },
      },
      {
        accessorKey: "email",
        header: () => <div className="text-center">Email</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "phone",
        header: () => <div className="">Số Điện Thoại</div>,
        cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
      },
      {
        accessorKey: "roles",
        header: () => <div className="text-center">Vai trò người dùng</div>,
        cell: ({ row }) => {
          return <div className="text-center">{USER_ROLES.find(item => item.value === row.getValue("roles"))?.label}</div>
        },
      },
      {
        accessorKey: "status",
        header: () => <div className="text-center">Trạng thái</div>,
        cell: ({ row }) => (
          <div
            className={cn(
              "text-center font-bold",
              row.getValue("status") === "active"
                ? "text-green-500"
                : "text-gray-500"
            )}
          >
            {row.getValue("status") === "active" ? "Hoạt động" : "Vô hiệu"}
          </div>
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
          return <div className="text-center">{row.getValue("companyName")}</div>
        },
      },
      {
        id: "actions",
        enableHiding: false,
        size: 50,
        cell: ({ row }) => {
          const rowValue = row.original

          return (
            <RowActions
              id={rowValue.id}
              name={rowValue.username}
              applyFilter={applyFilter}
            />
          )
        },
      },
    ],
    [applyFilter, meta]
  )

  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: <Skeleton className={"h-4 w-full"} />,
          }))
        : columns,
    [loading, columns]
  )

  const tableData = useMemo(() => (loading ? Array(meta.pageSize) : data), [data, loading, meta.pageSize])

  useEffect(() => {
    applyFilter()
    table.setPageSize(meta.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, meta.pageSize])

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const onFieldChange = useCallback(
    (value, name) => setFilter((prev) => ({ ...prev, [name]: value })),
    []
  )

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl leading-normal">Người dùng</h1>
        <Link className={cn(buttonVariants())} to={PATH.USER_CREATE}>
          Thêm người dùng
        </Link>
      </div>

      <PageHeader
        {...{
          table,
          filter,
          onFieldChange,
          applyFilter,
          loading,
          canSubmit,
          searchInputPlaceholder: "Tìm kiếm",
        }}
      >
        {/* <InvoiceFilter {...{ onFieldChange }} /> */}
      </PageHeader>
      <PageTable {...{ table }} />
      <PagePagination {...{ table, meta, setMeta, applyFilter }} />
    </div>
  )
}
