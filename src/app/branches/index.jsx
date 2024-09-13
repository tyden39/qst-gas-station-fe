
import { deleteOne, fetchAll, restoreOne } from "actions/branchActions"
import { PageList } from "components/layout/page-list"
import { useMemo } from "react"
import BranchFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import EllipsisTooltip from "components/EllipsisTooltip"

export function BranchPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Tên Chi Nhánh</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <EllipsisTooltip type="vertical" content={row.getValue("name") || ""}>
              {row.getValue("name")}
            </EllipsisTooltip>
          </div>
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
            <div className="text-center">
              <EllipsisTooltip type="vertical" content={`${row.original.address || ""}`}>
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
            <EllipsisTooltip type="vertical" content={row.getValue("email") || ""}>
              {row.getValue("email")}
            </EllipsisTooltip>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: () => <div className="">Số Điện Thoại</div>,
        cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
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
        additionalFilter: BranchFilter,
        pageName: "branch",
        pageLabel: "chi nhánh",
        deleteAction: deleteOne,
        restoreAction: restoreOne,
        fetchAction: fetchAll,
        initColumnVisibility,
        initFilter,
        initMeta
      }}
    />
  )
}
