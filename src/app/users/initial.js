import { deleteUser } from "api/userApi"
import { Button } from "components/ui/button"
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
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import PATH from "routers/path"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      return <div className="text-center">{row.getValue("companyName")}</div>
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
                      <Button variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (deleteUser(rowValue.id) === 200)
                            console.log('Delete success!')
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
]

export const initFilter = {
  keyword: "",
}

export const initMeta = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
}

export const initColumnVisibility = {
  Logger_ID: false,
  Check_Key: false,
  Bill_Type: false,
  Start_Time: false,
  End_Time: false,
}
