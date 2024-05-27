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
import { useCallback, useEffect, useState } from "react"
import { useAppNavigation } from "zustands/useAppNavigation"
import { fetchInvoices, handleExport } from "../../api/invoiceApi"
import InvoiceFilter from "./filter"
import { columns, initColumnVisibility, initFilter, initMeta } from "./initial"
import { Button } from "components/ui/button"

export function FuelPage() {
  const activedMenu = useAppNavigation((state) => state.activedMenu)
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)

  const [filter, setFilter] = useState(initFilter)
  const [sorting, setSorting] = useState([])
  const [loading, setLoading] = useState(false)
  const canSubmit = JSON.stringify(filter) !== JSON.stringify(initFilter)
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState(initColumnVisibility)

  const [rowSelection, setRowSelection] = useState({})

  const applyFilter = useCallback(
    (forceFilter) => {
      setLoading(true)
      fetchInvoices({ ...filter, ...forceFilter }, meta)
        .then(({ data, meta }) => {
          setMeta(meta)
          setData(data)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    },
    [filter, meta]
  )

  useEffect(() => {
    applyFilter()
    table.setPageSize(meta.pageSize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, meta.pageSize])

  const table = useReactTable({
    data,
    columns,
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
        <h1 className="text-4xl leading-normal">{activedMenu.name}</h1>
        <div><Button onClick={() => handleExport(filter, meta)}>Xuất Excel</Button></div>
      </div>

      <PageHeader {...{ table, filter, onFieldChange, applyFilter, loading, canSubmit, searchInputPlaceholder: 'Tìm kiếm theo Bill No' }}>
        <InvoiceFilter {...{ onFieldChange }} />
      </PageHeader>
      <PageTable {...{ table }} />
      <PagePagination {...{ table, meta, setMeta, applyFilter }} />
    </div>
  )
}
