import { handleExport } from "actions/fuelActions"
import { Button } from "components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { Loader2 } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { BILL_TYPES, PUMP_ID } from "../constant"

export default function ExportInvoice({ filter, meta, selected, unselected }) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { billDate, billType, fuelType, keyword, pumpId } = filter

  const onExport = async (event) => {
    event.preventDefault()
    setLoading(true)

    const errMessage = await handleExport(filter, meta, selected, unselected)

    if (errMessage)
      toast({
        variant: TOAST.DESTRUCTIVE,
        description: "Xuất excel thất bại!",
      })
    else
      toast({
        variant: TOAST.SUCCESS,
        description: "Xuất excel thành công!",
      })

    setOpen(false)
    setLoading(false)
  }

  const onOpenChange = (open) => {
    if (!loading) setOpen(open)
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogTrigger asChild>
        <Button className="max-sm:px-2 max-sm:py-1 max-sm:h-8">Xuất Excel</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center text-3xl">Xuất Excel</DialogTitle>
        <DialogDescription className="space-y-2">
          <p>Bạn đang xuất hóa đơn với các điều kiện sau:</p>
          <p>
            - Từ khóa: <span className="font-bold">{keyword}</span>
          </p>
          <p>
            - Thời gian ghi Log:{" "}
            <span className="font-bold">{`${moment(billDate?.from).format(
              "DD-MM-YYYY HH:mm:ss"
            )} 
            - ${moment(billDate?.to).format("DD-MM-YYYY HH:mm:ss")}`}</span>
          </p>
          <p>
            - Loại hóa đơn:{" "}
            <span className="font-bold">
              {BILL_TYPES.find((item) => item.value === billType)?.label}
            </span>
          </p>
          <p>
            - Loại nhiên liệu:{" "}
            <span className="font-bold">
              {fuelType}
            </span>
          </p>
          <p>
            - Mã vòi bơm:{" "}
            <span className="font-bold">
              {PUMP_ID.find((item) => item.value === pumpId)?.label}
            </span>
          </p>
          <p>
            - Số dòng đã chọn:{" "}
            <span className="font-bold">
              {Array.isArray(selected)
                ? selected.length
                : unselected.length > 0
                ? meta.totalItems - unselected.length
                : "Tất cả"}
            </span>
          </p>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild disabled={loading}>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button onClick={onExport} disabled={loading} className="w-20">
            {loading ? <Loader2 className="animate-spin" /> : "Đồng Ý"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
