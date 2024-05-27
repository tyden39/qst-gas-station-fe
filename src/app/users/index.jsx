import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { deleteUser } from "api/userApi"
import PageHeader from "components/layout/header"
import PagePagination from "components/pagination"
import PageTable from "components/table"
import { Button, buttonVariants } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu"
import { cn } from "lib/utils"
import { MoreHorizontal } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import PATH from "routers/path"
import { useAppNavigation } from "zustands/useAppNavigation"
import { fetchUsers } from "../../api/userApi"
import InvoiceFilter from "./filter"
import { initColumnVisibility, initFilter, initMeta } from "./initial"

export function UserPage() {
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
      fetchUsers({ ...filter, ...forceFilter }, meta)
        .then(({ data, meta }) => {
          setMeta(meta)
          setData(data)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    },
    [filter, meta]
  )

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
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
          return <div className="text-center">{row.getValue("roles")}</div>
        },
      },
      {
        accessorKey: "companyName",
        header: () => <div className="text-center">Công ty</div>,
        cell: ({ row }) => {
          return (
            <div className="text-center">{row.getValue("companyName")}</div>
          )
        },
      },
      {
        accessorKey: "branchName",
        header: () => <div className="text-center">Chi nhánh</div>,
        cell: ({ row }) => {
          return <div className="text-center">{row.getValue("branchName")}</div>
        },
      },
      {
        accessorKey: "status",
        header: () => <div className="text-center">Trạng thái</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("status")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const rowValue = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    to={PATH.USER_EDIT.replace(":id", rowValue.id)}
                    className="cursor-pointer"
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        Delete
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. Are you sure you want to
                          permanently delete this file from our servers?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            onClick={async () => {
                              const deletesStatus = await deleteUser(rowValue.id)
                              if (deletesStatus === 200)
                                applyFilter()
                            }}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [applyFilter]
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
        <Link className={cn(buttonVariants())} to={PATH.USER_CREATE}>
          Create new user
        </Link>
      </div>

      <PageHeader
        {...{
          table,
          filter,
          onFieldChange,
          applyFilter,
          loading,
          canSubmit,
          searchInputPlaceholder: "Tìm kiếm",
        }}
      >
        <InvoiceFilter {...{ onFieldChange }} />
      </PageHeader>
      <PageTable {...{ table }} />
      <PagePagination {...{ table, meta, setMeta, applyFilter }} />
    </div>
  )
}
