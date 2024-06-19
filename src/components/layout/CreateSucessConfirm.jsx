import { Button } from "components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "components/ui/dialog"
import { useNavigate } from "react-router-dom"

const CreateSuccessConfirm = ({ open, setOpen, onSubmit, onReturn }) => {
  const navigation = useNavigate()

  const onOpenChange = (open) => {
    setOpen(open)
  }

  const handleSubmit = async () => {
    if (onSubmit) onSubmit()
    navigation(0)
  }

  const handleReturn = () => {
    if (onReturn) onReturn()
    navigation(-1)
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent className="sm:max-w-[450px] space-y-6" hideClose>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-4xl">Tạo mới thành công</DialogTitle>
          <DialogDescription className="flex justify-center">
            <img src="/images/check.png" alt="check" width={100} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center items-center">
          <DialogClose asChild>
            <Button className="w-[150px]" variant="outline" onClick={handleReturn}>
              Trở lại danh sách
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-[150px]" onClick={handleSubmit}>
              Tạo thêm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSuccessConfirm
