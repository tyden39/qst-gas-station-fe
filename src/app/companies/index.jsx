
import { fetchAll, deleteCompany, restoreOne } from "actions/companyActions"
import { PageList } from "components/layout/page-list"
import { useMemo } from "react"
import { initColumnVisibility, initFilter, initMeta } from "./initial"
import EllipsisTooltip from "components/EllipsisTooltip"

export function CompanyPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Tên Công Ty</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <EllipsisTooltip type="vertical" content={row.getValue("name") || ""}>
              {row.getValue("name")}
            </EllipsisTooltip>
          </div>
        ),
      },
      {
        accessorKey: "taxCode",
        header: () => <div className="text-center">Mã Số Thuế</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("taxCode")}</div>
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
    ],
    []
  )

  return (
    <PageList
      {...{
        cols: columns,
        pageName: "company",
        pageLabel: "công ty",
        deleteAction: deleteCompany,
        restoreAction: restoreOne,
        fetchAction: fetchAll,
        initColumnVisibility,
        initFilter,
        initMeta
      }}
    />
  )
}
