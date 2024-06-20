import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchStoreSimpleList } from "actions/storeActions"
import PageHeader from "components/layout/header"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { buttonVariants } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { Skeleton } from "components/ui/skeleton"
import { USER_ROLE } from "constants/user-roles"
import { getActiveMenu } from "lib/url"
import { cn } from "lib/utils"
import moment from "moment"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import PATH from "routers/path"
import useAuth from "zustands/useAuth"
import useInvoice from "zustands/useInvoice"
import { fetchInvoices } from "../../actions/fuelActions"
import ExportInvoice from "./components/ExportInvoice"
import RowActions from "./components/RowActions"
import { BILL_TYPES } from "./constant"
import InvoiceFilter from "./filter"
import FilterTags from "./filterTags"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function FuelPage() {
  const [getPermission, authUser] = useAuth((state) => [state.getPermission, state.user])
  const allowCreate = getPermission(PATH.FUEL_CREATE)
  const allowEdit = getPermission(PATH.FUEL_EDIT)

  const location = useLocation()
  const activeMenuName = getActiveMenu(location.pathname)

  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)

  const [filter, setFilter] = useState(initFilter)
  const [activedFilter, setActivedFilter] = useState(initFilter)
  const [sorting, setSorting] = useState([])
  const [loading, setLoading] = useState(false)
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState(initColumnVisibility)
  const [selected, setSelected] = useInvoice((state) => [
    state.selected,
    state.setSelected,
  ])
  const [currentPageSelected, setCurrentPageSelected] = useState([])

  const [rowSelection, setRowSelection] = useState({})

  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [storeList, setStoreList] = useState([])

  const canSubmit = JSON.stringify(filter) !== JSON.stringify(activedFilter)

  const applyFilter = useCallback(
    (forceFilter) => {
      setLoading(true)
      const finalFilter = { ...filter, ...forceFilter }
      fetchInvoices(finalFilter, meta)
        .then(({ data, meta }) => {
          setMeta(meta)
          setData(data)
          setFilter(finalFilter)
          setActivedFilter(finalFilter)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    },
    [filter, meta]
  )

  useEffect(() => {
    if (
      data.length > 0 &&
      currentPageSelected.length > 0 &&
      !data.map((item) => item.id).includes(currentPageSelected[0])
    ) {
      setCurrentPageSelected([])
    }
  }, [data, currentPageSelected])

  useEffect(() => {
    applyFilter()
    table.setPageSize(meta.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, meta.pageSize])

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
          accessorKey: "select",
          size: 50,
          header: () => (
            <div className="text-center">
              <Checkbox
                checked={
                  selected.length > 0 &&
                  (selected.length === meta.totalItems || "indeterminate")
                }
                onCheckedChange={() => {
                  const value =
                    selected.length > 0 &&
                    (selected.length === meta.totalItems || "indeterminate")
                  let newSelected = []
                  if (value === "indeterminate") {
                    if ((currentPageSelected.length ?? 0) < meta.pageSize) {
                      newSelected = selected.filter(
                        (item) => !data.map((i) => i.id).includes(item)
                      )
                      newSelected = [
                        ...newSelected,
                        ...data.map((item) => item.id),
                      ]
                      setCurrentPageSelected(data.map((item) => item.id))
                    } else {
                      newSelected = selected.filter(
                        (item) => !data.map((i) => i.id).includes(item)
                      )
                      setCurrentPageSelected([])
                    }
                  } else if (value) {
                    newSelected = selected.filter(
                      (item) => !data.map((i) => i.id).includes(item)
                    )
                    setCurrentPageSelected([])
                  } else {
                    setCurrentPageSelected(data.map((item) => item.id))
                    newSelected = [...selected, ...data.map((item) => item.id)]
                  }
                  setSelected(newSelected)
                }}
                aria-label="Select all"
              />
            </div>
          ),
          cell: ({ row }) => {
            const rowValue = row.original

            return (
              <div className="text-center">
                <Checkbox
                  checked={selected.includes(rowValue.id)}
                  onCheckedChange={(value) => {
                    setSelected(
                      value
                        ? [...selected, rowValue.id]
                        : selected.filter((item) => item !== rowValue.id)
                    )
                    setCurrentPageSelected((prev) =>
                      value
                        ? [...prev, rowValue.id]
                        : prev.filter((item) => item !== rowValue.id)
                    )
                  }}
                  aria-label="Select row"
                />
              </div>
            )
          },
          enableSorting: false,
          enableHiding: false,
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
          header: () => (
            <div className="text-center capitalize">Mã vòi bơm</div>
          ),
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
                (item) => item.value === row.getValue("Bill_Type")
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
            <div className="text-center">{row.getValue("Fuel_Type")}</div>
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

            return <div className="text-right font-medium">{quantity} {" "}l</div>
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
            return <div className="text-center">{rowValue.Store?.name}</div>
          },
        },
        {
          accessorKey: "branchName",
          header: () => <div className="text-center">Chi Nhánh</div>,
          cell: ({ row }) => {
            const rowValue = row.original
            return <div className="text-center">{rowValue.Store?.Branch?.name}</div>
          },
        },
        {
          accessorKey: "companyName",
          header: () => <div className="text-center">Công Ty</div>,
          cell: ({ row }) => {
            const rowValue = row.original

            return <div className="text-center">{rowValue.Store?.Branch?.Company?.name}</div>
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
                applyFilter={applyFilter}
              />
            )
          },
        },
      ].filter((item) => (allowEdit ? true : item.id !== "actions")),
    [
      meta,
      selected,
      setSelected,
      data,
      currentPageSelected.length,
      applyFilter,
      allowEdit,
    ]
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

  const tableData = useMemo(
    () => (loading ? Array(meta.pageSize) : data),
    [data, loading, meta.pageSize]
  )

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
      setCompanyList(resData)
    }
  }

  const getBranchList = async (value) => {
    const response = await fetchBranchSimpleList({ companyId: value })
    if (response.status === 200) {
      const branchList = response.data
      setBranchList(branchList)
    }
  }

  const getStoreList = async (value) => {
    const response = await fetchStoreSimpleList({ branchId: value })
    if (response.status === 200) {
      const storeList = response.data
      setStoreList(storeList)
    }
  }

  useEffect(() => {
    const initialData = async () => {
      authUser.roles.includes(USER_ROLE.ADMIN) && getCompanyList()
      authUser.roles.includes(USER_ROLE.COMPANY) && getBranchList()
      authUser.roles.includes(USER_ROLE.BRANCH) && getStoreList()
    }
    initialData()
  }, [authUser.roles])

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
        </div>
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
          searchInputPlaceholder: "Tìm kiếm theo Mã Kiểm Tra",
        }}
      >
        <InvoiceFilter {...{ authUser, filter, onFieldChange, companyList, branchList, storeList, getBranchList, getStoreList }} />
      </PageHeader>
      <FilterTags {...{activedFilter, applyFilter, companyList, branchList, storeList}} />
      <PageTable {...{ table }} />
      <PagePagination {...{ table, meta, selected }} />
    </div>
  )
}
