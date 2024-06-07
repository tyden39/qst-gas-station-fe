import { deleteUser } from "actions/userApi"
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
import { Loader2, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import PATH from "routers/path"

const RowActions = ({ id, name, applyFilter }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onOpenChange = (open) => {
    if (!loading) setOpen(open)
  }

  const onDelete = async () => {
    setLoading(true)

    const status = await deleteUser(id)
    if (status === 200) {
      toast({
        variant: TOAST.SUCCESS,
        title: "Xóa thành công!",
      })
      applyFilter()
    } else
      toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Xóa thất bại!",
      })

    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              to={PATH.USER_EDIT.replace(":id", id)}
              className="cursor-pointer"
            >
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
              Xóa
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Bạn có chắc muốn xóa?</DialogTitle>
          <DialogDescription>
            Hành động này không thể được hoàn tác. Bạn có chắc chắn muốn xóa
            vĩnh viễn người dùng <span className="font-bold">{name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Hủy
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Xóa"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RowActions
