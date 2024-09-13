import { deleteOne, fetchAll, restore } from "actions/storeActions"
import { PageList } from "components/layout/page-list"
import useInitStructure from "hooks/useInitStructure"
import { useMemo } from "react"
import StoreFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import EllipsisTooltip from "components/EllipsisTooltip"

export function StorePage() {
  const initExtra = useInitStructure(false, true)

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Tên cửa hàng</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <EllipsisTooltip type="vertical" content={row.getValue("name")}>
              {row.getValue("name")}
            </EllipsisTooltip>
          </div>
        ),
      },
      {
        accessorKey: "address",
        header: () => <div className="text-center">Địa Chỉ</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <EllipsisTooltip
                type="vertical"
                content={`${row.original.address || ""}`}
              >
                {`${row.original.address || ""}`}
              </EllipsisTooltip>
            </div>
          )
        },
      },
      {
        accessorKey: "email",
        header: () => <div className="text-center">Email</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <EllipsisTooltip
              type="vertical"
              content={`${row.getValue("email") || ""}`}
            >
              {row.getValue("email")}
            </EllipsisTooltip>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: () => <div className="text-center">Số Điện Thoại</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("phone")}</div>
        ),
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
        additionalFilter: StoreFilter,
        pageName: "store",
        pageLabel: "cửa hàng",
        deleteAction: deleteOne,
        restoreAction: restore,
        fetchAction: fetchAll,
        initColumnVisibility,
        initFilter,
        initMeta,
        initExtra,
      }}
    />
  )
}
