import { Button } from "components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog"
import { useNavigate } from "react-router-dom"

const CloseConfirm = ({ open, setOpen, onReturn }) => {
  const navigation = useNavigate()

  const onOpenChange = (open) => {
    setOpen(open)
  }

  const handleSubmit = async () => {
    setOpen(false)
  }

  const handleReturn = () => {
    if (onReturn) onReturn()
    navigation(-1)
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent
        className="sm:max-w-[450px] space-y-6"
        hideClose
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex justify-center">
            <img src="/images/warning.png" alt="check" width={100} />
          </DialogTitle>
          <DialogDescription className="text-center">
            Bạn có chắc chắn muốn rời khỏi trang này không? Những thông tin bạn đã nhập vào biểu mẫu sẽ không được lưu.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center items-center">
          <DialogClose asChild>
            <Button
              className="w-[150px]"
              variant="outline"
              onClick={handleReturn}
            >
              Thoát
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-[150px]" onClick={handleSubmit}>
              Trở lại
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CloseConfirm
