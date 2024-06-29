import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { fetchAll } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import PageHeader from "components/layout/header"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { buttonVariants } from "components/ui/button"
import { Skeleton } from "components/ui/skeleton"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { transformToSelectList } from "lib/transofrm"
import { cn } from "lib/utils"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import PATH from "routers/path"
import RowActions from "./components/RowActions"
import BranchFilter from "./filter"
import FilterTags from "./filterTags"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import useAuth from "zustands/useAuth"
import { USER_ROLE } from "constants/user-roles"

export function BranchPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)
  const user = useAuth(state => state.user)

  const [filter, setFilter] = useState(initFilter)
  const [activedFilter, setActivedFilter] = useState(initFilter)
  const [sorting, setSorting] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState(initColumnVisibility)
  const [rowSelection, setRowSelection] = useState({})
  
  const canSubmit = JSON.stringify(filter) !== JSON.stringify(activedFilter)
  const canResetFilter = JSON.stringify(activedFilter) !== JSON.stringify(initFilter)

  const [companyList, setCompanyList] = useState([])

  const applyFilter = useCallback(
    (forceFilter) => {
      setLoading(true)
      const finalFilter = { ...filter, ...forceFilter }
      fetchAll(finalFilter, meta)
        .then((response) => {
          if (response.status === 200) {
            const { data, meta } = response.data
            setMeta(meta)
            setData(data)
            setFilter(finalFilter)
            setActivedFilter(finalFilter)
          } else {
            toast({
              variant: TOAST.DESTRUCTIVE,
              title: "Lấy danh sách thất bại!",
              description: response.message,
            })
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    },
    [filter, meta, toast]
  )

  const columns = useMemo(
    () => [
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
        accessorKey: "name",
        header: () => <div className="text-center">Tên Chi Nhánh</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "subTaxCode",
        header: () => <div className="text-center">Mã Số Thuế Con</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("subTaxCode")}</div>
        ),
      },
      {
        accessorKey: "address",
        header: () => <div className="text-center">Địa Chỉ</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">{`${row.original.address || ""}`}</div>
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
        accessorKey: "companyName",
        header: () => <div className="text-center">Công Ty</div>,
        cell: ({ row }) => {
          return <div className="text-center">{row.getValue("companyName")}</div>
        },
      },
      {
        accessorKey: "deletedAt",
        header: () => <div className="text-center">Trạng thái</div>,
        cell: ({ row }) => {
          return <div className="text-center">{row.getValue("deletedAt") ? <span className="font-bold text-destructive">Đã xóa</span> : <span className="font-bold text-green-500">Hoạt động</span>}</div>
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
              name={rowValue.name}
              userRole={user.roles[0]}
              applyFilter={applyFilter}
            />
          )
        },
      },
    ].filter(item => {
      const isAdmin = user.roles[0] === USER_ROLE.ADMIN
      if (item.accessorKey === 'deletedAt' && !isAdmin) return false
      return true
    }),
    [applyFilter, meta, user.roles]
  )

  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: <Skeleton className={"h-5 w-full"} />,
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
    (value, name) => setFilter((prev) => ({ ...prev, [name]: value === 'all' ? undefined : value })),
    []
  )

  const getCompanyList = async (value) => {
    const response = await fetchCompanySimpleList({ companyId: value })
    if (response.status === 200) {
      const resData = response.data
      const selectList = transformToSelectList(resData)
      setCompanyList(selectList)
    }
  }

  useEffect(() => {
    const initialData = async () => {
      getCompanyList()
    }
    initialData()
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl leading-normal">Chi nhánh</h1>
        <Link className={cn(buttonVariants())} to={PATH.BRANCH_CREATE}>
          Thêm chi nhánh
        </Link>
      </div>

      <PageHeader
        {...{
          table,
          filter,
          initFilter,
          activedFilter,
          onFieldChange,
          applyFilter,
          loading,
          canSubmit,
          searchInputPlaceholder: "Tìm kiếm",
          canResetFilter
        }}
      >
        <BranchFilter {...{filter, onFieldChange, companyList}} />
      </PageHeader>
      <FilterTags {...{activedFilter, applyFilter, companyList}} />
      <PageTable {...{ table }} />
      <PagePagination {...{ meta, setMeta }} />
    </div>
  )
}
