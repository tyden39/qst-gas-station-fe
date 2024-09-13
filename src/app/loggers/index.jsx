import { deleteOne, fetchAll, restore } from "actions/loggerActions"
import { PageList } from "components/layout/page-list"
import { useMemo } from "react"
import ExtendFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import EllipsisTooltip from "components/EllipsisTooltip"

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
        header: (header) => "Cửa hàng",
        cell: ({ row }) => {
          const rowValue = row.original
          return (
            <div className="text-center">
              <EllipsisTooltip type="vertical" content={rowValue.storeName}>
                {rowValue.storeName}
              </EllipsisTooltip>
            </div>
          )
        },
      },
      {
        accessorKey: "branchName",
        header: (header) => "Chi Nhánh",
        cell: ({ row }) => {
          const rowValue = row.original
          return (
            <div className="text-center">
              <EllipsisTooltip type="vertical" content={rowValue.branchName}>
                {rowValue.branchName}
              </EllipsisTooltip>
            </div>
          )
        },
      },
      {
        accessorKey: "companyName",
        header: (header) => "Công Ty",
        cell: ({ row }) => {
          const rowValue = row.original

          return (
            <div className="text-center">
              <EllipsisTooltip type="vertical" content={rowValue.companyName}>
                {rowValue.companyName}
              </EllipsisTooltip>
            </div>
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