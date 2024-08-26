import { deleteUser, fetchUsers, restore } from "actions/userApi"
import { USER_ROLES } from "constants/user-roles"
import { useMemo } from "react"
import UserFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

import { PageList } from "components/layout/page-list"
import useInitStructure from "hooks/useInitStructure"
import EllipsisTooltip from "components/EllipsisTooltip"

export function UserPage() {
  const initExtra = useInitStructure()

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
        accessorKey: "firstName",
        header: () => <div className="text-center">Họ và tên</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">{`${row.original.lastName || ""} ${
              row.original.firstName || ""
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
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("phone")}</div>
        ),
      },
      {
        accessorKey: "roles",
        header: () => <div className="text-center">Vai trò</div>,
        cell: ({ row }) => {
          const role = USER_ROLES.find(
            (item) => item.value === row.getValue("roles")?.[0]
          )?.label
          return (
            <div className="text-center">
              <EllipsisTooltip type="vertical" content={role}>
                {role}
              </EllipsisTooltip>
            </div>
          )
        },
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
        additionalFilter: UserFilter,
        pageName: "user",
        pageLabel: "người dùng",
        deleteAction: deleteUser,
        restoreAction: restore,
        fetchAction: fetchUsers,
        initColumnVisibility,
        initFilter,
        initMeta,
        initExtra,
      }}
    />
  )
}
