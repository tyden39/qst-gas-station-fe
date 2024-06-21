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
import { useCallback, useEffect } from "react"
import { useActionData, useBlocker } from "react-router-dom"

const CloseConfirm = ({ form }) => {
  const actionData = useActionData()

  const shouldBlock = useCallback(
    ({ currentLocation, nextLocation }) =>
      form.formState.isDirty &&
      currentLocation.pathname !== nextLocation.pathname,
    [form.formState.isDirty]
  )

  const blocker = useBlocker(shouldBlock)

  useEffect(() => {
    if (actionData?.ok) {
      form.reset()
    }
  }, [actionData, form])

  useEffect(() => {
    if (blocker.state === "blocked" && !form.formState.isDirty) {
      blocker.reset()
    }
  }, [blocker, form.formState.isDirty])

  const handleSubmit = async () => {
    blocker.reset?.()
  }

  const handleReturn = () => {
    blocker.proceed?.()
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (form.formState.isDirty) {
        event.preventDefault()
        event.returnValue = true
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [form.formState.isDirty])

  return (
    <Dialog {...{ open: blocker.state === "blocked" }}>
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
            Bạn có chắc chắn muốn rời khỏi trang này không? Những thông tin bạn
            đã nhập vào biểu mẫu sẽ không được lưu.
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
              Ở lại
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CloseConfirm
