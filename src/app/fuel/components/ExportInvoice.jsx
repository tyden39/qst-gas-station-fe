import { handleExport } from "api/invoiceApi"
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
import moment from "moment"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "../constant"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "components/ui/use-toast"

export default function ExportInvoice({ filter, meta, selected }) {
  const {toast} = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { billDate, billType, fuelType, keyword, pumpId } = filter
  const onExport = async (event) => {
    event.preventDefault();
    setLoading(true)
    
    const errMessage = await handleExport(filter, meta, selected)

    if (errMessage) toast({
      variant: 'destructive',
      description: "Xuất excel thất bại!"
    })

    setOpen(false)
    setLoading(false)
  }

  const onOpenChange = (open) => {
    if (!loading) setOpen(open)
  }

  return (
    <Dialog {...{open, onOpenChange}}>
      <DialogTrigger asChild>
        <Button>Xuất Excel</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center text-3xl">Xuất Excel</DialogTitle>
        <DialogDescription className="space-y-2">
          <p>Bạn đang xuất hóa đơn với các điều kiện sau:</p>
          <p>- Từ khóa: <span className="font-bold">{keyword}</span></p>
          <p>- Thời gian ghi Log:{" "}
            <span className="font-bold">{`${moment(billDate.from).format("DD-MM-YYYY HH:mm:ss")} 
            - ${moment(billDate.to).format("DD-MM-YYYY HH:mm:ss")}`}</span>
          </p>
          <p>- Loại hóa đơn: <span className="font-bold">{BILL_TYPES.find(item => item.value === billType).label}</span></p>
          <p>- Loại nhiên liệu: <span className="font-bold">{FUEL_TYPE.find(item => item.value === fuelType).label}</span></p>
          <p>- Mã vòi bơm: <span className="font-bold">{PUMP_ID.find(item => item.value === pumpId).label}</span></p>
          <p>- Số dòng đã chọn: <span className="font-bold">{selected.length}</span></p>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild disabled={loading}>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button onClick={onExport} disabled={loading} className="w-20">
            {loading ? <Loader2 className="animate-spin" /> : 'Đồng Ý'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
