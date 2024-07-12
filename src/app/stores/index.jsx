
import { deleteOne, fetchAll, restore } from "actions/storeActions"
import { PageList } from "components/layout/page-list"
import useInitStructure from "hooks/useInitStructure"
import { useMemo } from "react"
import StoreFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function StorePage() {
  const initExtra = useInitStructure(false, true)
  
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Tên cửa hàng</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("name")}</div>
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
        header: () => <div className="text-center">Số Điện Thoại</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("phone")}</div>
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
