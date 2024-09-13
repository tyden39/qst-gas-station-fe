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
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { USER_ROLE } from "constants/user-roles"
import { Loader2 } from "lucide-react"
import { useCallback, useState } from "react"

export default function SelectedActions({
  refreshData,
  unselected,
  setUnselected,
  selected,
  authUser,
  restoreBulkAction,
  deleteBulkAction,
  setSelected,
  meta,
  metaFeedback
}) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forceDelete, setForceDelete] = useState()
  const userRole = authUser.roles[0]
  const isAdmin = userRole === USER_ROLE.ADMIN

  const onOpenChange = (open) => {
    if (!loading) setOpen(open)
  }

  const onDelete = useCallback(async () => {
    const force = forceDelete

    const response = await deleteBulkAction(selected, unselected, force)

    if (response.status === 200) {
      toast({
        variant: TOAST.SUCCESS,
        title: "Xóa thành công!",
      })
      refreshData()
      if (force || !isAdmin) {
        setSelected([])
        setUnselected([])
      }
    } else
      toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Xóa thất bại!",
        description: response.message,
      })

    setForceDelete(false)
    setOpen(false)
    setLoading(false)
  }, [
    deleteBulkAction,
    selected,
    unselected,
    forceDelete,
    toast,
    refreshData,
    setSelected,
    isAdmin,
    setUnselected
  ])

  const handleForceRestore = useCallback(async () => {
    const { status } = await restoreBulkAction(selected, unselected)
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
  }, [selected, unselected, refreshData, restoreBulkAction, toast])

  return (
    <Dialog {...{ open, onOpenChange }}>
      <div className="flex items-center gap-2">
        <span className="mr-2 max-sm:text-sm max-sm:text-nowrap">{`Đã chọn ${selected === 'all' ? metaFeedback.totalItems : selected.length}`}</span>
        <div className="flex gap-2 w-[400px] max-sm:w-fit">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="hover:bg-destructive hover:text-white max-sm:w-fit"
            >
              Xóa
            </Button>
          </DialogTrigger>
          {isAdmin ? (
            <>
              <Button
                variant="outline"
                className="hover:bg-green-500 hover:text-white max-sm:w-fit"
                onClick={handleForceRestore}
              >
                Khôi phục
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Bạn có chắc muốn xóa {forceDelete ? " vĩnh viễn" : ""}?
          </DialogTitle>
          <DialogDescription>
            Hành động này không thể được hoàn tác. Bạn có chắc chắn muốn xóa
            {forceDelete ? " vĩnh viễn " : ""} những bản ghi này ?
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
