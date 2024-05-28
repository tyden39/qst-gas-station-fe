import { Button } from "components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog";
import { forwardRef } from "react";

const DeleteRow = forwardRef(({id}, ref) => {
  return (
    <div ref={ref}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Xóa
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Bạn có chắc muốn xóa?</DialogTitle>
            <DialogDescription>
              Hành động này không thể được hoàn tác. Bạn có chắc chắn muốn xóa
              vĩnh viễn hóa đơn{" "}
              <span className="text-blue-600">#{id}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  // if (deleteUser(rowValue.id) === 200)
                  //   console.log('Delete success!')
                }}
              >
                Xóa
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
})

export default DeleteRow
