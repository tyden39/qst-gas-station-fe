import { zodResolver } from "@hookform/resolvers/zod"
import { createInvoice, editInvoice, fetchOneInvoice } from "api/invoiceApi"
import { Button, buttonVariants } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useParams } from "react-router-dom"
import PATH from "routers/path"
import { z } from "zod"
import FormCreate from "./create-form"

const schema = z
  .object({
    Check_Key: z.string({ required_error: "Mã kiểm tra không được để trống" }),
    Logger_ID: z.string({ required_error: "Mã logger không được để trống" }),
    Logger_Time: z.date({ required_error: "Thời gian ghi log không được để trống" }),
    Pump_ID: z.string({ required_error: "Mã vòi bơm không được để trống" }),
    Bill_No: z.string({ required_error: "Mã hóa đơn không được để trống" }),
    Bill_Type: z.string({ required_error: "Loại hóa đơn không được để trống" }),
    Fuel_Type: z.string({ required_error: "Loại nhiên liệu không được để trống" }),
    Start_Time: z.date({ required_error: "Thời gian bắt đầu bơm không được để trống" }),
    End_Time: z.date({ required_error: "Thời gian kết thúc bơm không được để trống" }),
    Unit_Price: z.string({ required_error: "Giá không được để trống" }),
    Quantity: z.string({ required_error: "Số lượng không được để trống" }),
    Total_Price: z.string({ required_error: "Tổng giá không được để trống" }),
  })

export default function FuelCreatePage() {
  const {toast} = useToast()
  const location = useLocation()
  const params = useParams()

  const isEdit = location.pathname.includes("edit")

  const form = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values) {
    if (isEdit) {
      const {data} = await editInvoice(params.id, values)
      if (data.status === 200) {
        toast({
          variant: 'success',
          description: "Cập nhật hóa đơn thành công!"
        })
      } else toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Cập nhật hóa đơn thất bại!",
        description: data.message
      })
    } else {
      const {status, data} = await createInvoice(values)

      if (status === 201) {
        toast({
          variant: 'success',
          title: "Tạo hóa đơn thành công!"
        })
        // navigation(-1)
      } else if (status === 409) toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Tạo hóa đơn thất bại!",
        description: `Đã tồn tại hóa đơn với Mã kiểm tra #${values.Check_Key}!`
      })
      else toast({
        variant: TOAST.DESTRUCTIVE,
        title: "Tạo hóa đơn thất bại!",
        description: data.message
      })
    }
  }

  useEffect(() => {
    const handleGetEditInvoice = async () => {
      const {data} = await fetchOneInvoice(params.id)
      if (data.status === 200){
        const resData = data.data
        const formData = {
          ...resData,
          Logger_Time: new Date(resData.Logger_Time),
          Start_Time: new Date(resData.Start_Time),
          End_Time: new Date(resData.End_Time),
          Pump_ID: `${resData.Pump_ID}`,
          Bill_No: `${resData.Bill_No}`,
          Bill_Type: `${resData.Bill_Type}`,
        }
        form.reset(formData)
      }else {
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: `Không tìm thấy hóa đơn với mã #${params.id}`
        })
      }
    }
    if (isEdit && params.id) {
      handleGetEditInvoice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full">
      <div className="mb-3">
        <Link
          to={-1}
          className={cn(
            "flex items-center gap-1 hover:underline text-sm text-slate-500"
          )}
        >
          <ChevronLeft size={14} />
          {"Trở lại danh sách"}
        </Link>
        <h1 className="text-4xl leading-normal mb-3">
          {isEdit ? "Chỉnh sửa hóa đơn" : "Thêm mới hóa đơn"}
        </h1>
      </div>

      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-8 w-[800px] mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormCreate {...{ form }} />

          <Card className="p-4 space-x-4 text-right">
            <Link to={PATH.FUEL} className={cn(buttonVariants({variant: 'outline'}))}>Hủy</Link>
            <Button type="submit">{isEdit ? "Lưu" : "Tạo mới"}</Button>
          </Card>
        </form>
      </Form>
    </div>
  )
}
