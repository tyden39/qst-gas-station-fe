import { Button } from "components/ui/button"
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
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { USER_ROLE } from "constants/user-roles"
import { Loader2, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import PATH from "routers/path"

const RowActions = ({
  id,
  pageName,
  pageLabel,
  refreshData,
  userRole,
  deleteAction,
  restoreAction,
  isDeleted,
}) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forceDelete, setForceDelete] = useState()
  const isAdmin = userRole === USER_ROLE.ADMIN

  const onOpenChange = (open) => {
    if (!loading) setOpen(open)
  }

  const onDelete = async () => {
    setLoading(true)
    const force = forceDelete

    const { status } = await deleteAction(id, force)
    if (status === 200) {
      toast({
        variant: TOAST.SUCCESS,
        title: "Xóa thành công!",
      })
      refreshData()
    } else
      toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Xóa thất bại!",
      })

    setOpen(false)
    setLoading(false)
    setForceDelete(false)
  }

  const handleForceDelete = () => {
    setOpen(true)
    setForceDelete(true)
  }

  const handleRestore = async () => {
    const status = await restoreAction(id)
    if (status === 200) {
      toast({
        variant: TOAST.SUCCESS,
        title: "Khôi phục thành công!",
      })
      refreshData()
    } else
      toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Khôi phục thất bại!",
      })
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="icon" className="h-4 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 opacity-50 hover:opacity-100 cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              to={PATH[`${pageName.toUpperCase()}_EDIT`].replace(":id", id)}
              className="cursor-pointer"
            >
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          {isDeleted ? null : (
            <DialogTrigger asChild>
              <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
                Xóa
              </DropdownMenuItem>
            </DialogTrigger>
          )}
          {isAdmin ? (
            <>
              <DropdownMenuItem asChild>
                <p
                  className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
                  onClick={handleForceDelete}
                >
                  Xóa vĩnh viễn
                </p>
              </DropdownMenuItem>
              {isDeleted ? (
                <DropdownMenuItem asChild>
                  <p
                    className="focus:bg-green-500 focus:text-destructive-foreground cursor-pointer"
                    onClick={handleRestore}
                  >
                    Khôi phục
                  </p>
                </DropdownMenuItem>
              ) : null}
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Bạn có chắc muốn xóa {forceDelete ? " vĩnh viễn" : ""}?
          </DialogTitle>
          <DialogDescription>
            Hành động này không thể được hoàn tác. Bạn có chắc chắn muốn xóa
            {forceDelete ? " vĩnh viễn " : ""} {pageLabel.toLowerCase()} này ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Hủy
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onDelete} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                `Xóa ${forceDelete ? "vĩnh viễn" : ""}`
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RowActions
