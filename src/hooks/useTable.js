import { getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Skeleton } from "components/ui/skeleton"
import { useEffect, useMemo, useState } from "react"

export default function useTable({initColumnVisibility, data, loading, columns, meta, sorting, setSorting, pageName}) {
  const savedVisibleColumns = JSON.parse(localStorage.getItem(`${pageName}ColumnVisibility`))
  const [columnVisibility, setColumnVisibility] = useState({...initColumnVisibility, ...savedVisibleColumns})

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
    () => (loading ? Array(5) : data),
    [data, loading]
  )

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnVisibility,
    },
  })
  
  useEffect(() => {
    table.setPageSize(meta.pageSize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.pageSize])

  return {
    table
  }
}