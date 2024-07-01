import { deleteOne, fetchAll, restore } from "actions/loggerActions"
import { PageList } from "components/layout/page-list"
import { useMemo } from "react"
import ExtendFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function LoggerPage() {
  const columns = useMemo(
    () => [
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
    ],
    []
  )

  return (
    <PageList
      {...{
        cols: columns,
        additionalFilter: ExtendFilter,
        pageName: "logger",
        pageLabel: "logger",
        deleteAction: deleteOne,
        restoreAction: restore,
        fetchAction: fetchAll,
        initColumnVisibility,
        initFilter,
        initMeta
      }}
    />
  )
}