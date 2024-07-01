
import { deleteUser, fetchUsers, restore, } from "actions/userApi"
import { USER_ROLES } from "constants/user-roles"
import { useMemo } from "react"
import UserFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

import { PageList } from "components/layout/page-list"

export function UserPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: () => <div className="text-center">Tên đăng nhập</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("username")}</div>
        ),
      },
      {
        accessorKey: "name",
        header: () => <div className="text-center">Họ và tên</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">{`${row.original.firstName || ""} ${
              row.original.lastName || ""
            }`}</div>
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
        accessorKey: "roles",
        header: () => <div className="text-center">Vai trò người dùng</div>,
        cell: ({ row }) => {
          return <div className="text-center">{USER_ROLES.find(item => item.value === (row.getValue("roles")?.[0]))?.label}</div>
        },
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
        additionalFilter: UserFilter,
        pageName: "user",
        pageLabel: "người dùng",
        deleteAction: deleteUser,
        restoreAction: restore,
        fetchAction: fetchUsers,
        initColumnVisibility,
        initFilter,
        initMeta
      }}
    />
  )
}
