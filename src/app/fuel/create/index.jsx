import { zodResolver } from "@hookform/resolvers/zod"
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchLoggerSimpleList } from "actions/loggerActions"
import {
  createInvoice,
  editInvoice,
  fetchOneInvoice,
} from "actions/fuelActions"
import { fetchSimpleList as fetchStoreSimpleList } from "actions/storeActions"
import CloseConfirm from "components/layout/CloseConfirm"
import CreateSuccessConfirm from "components/layout/CreateSucessConfirm"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { transformToSelectList } from "lib/transofrm"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import PATH from "routers/path"
import { z } from "zod"
import FormCreate from "./create-form"
import SkeletonForm from "./skeleton-form"
import useAuth from "zustands/useAuth"

const schema = z.object({
  Check_Key: z
    .string({ required_error: "Mã kiểm tra không được để trống" })
    .min(1, "Mã kiểm tra không được để trống"),
  Logger_ID: z
    .string({ required_error: "Mã logger không được để trống" })
    .min(1, "Mã logger không được để trống"),
  Logger_Time: z.date({
    required_error: "Thời gian ghi log không được để trống",
  }),
  Pump_ID: z
    .string({ required_error: "Mã vòi bơm không được để trống" })
    .min(1, "Mã vòi bơm không được để trống"),
  Bill_No: z
    .string({ required_error: "Mã hóa đơn không được để trống" })
    .min(1, "Mã hóa đơn không được để trống"),
  Bill_Type: z
    .string({ required_error: "Loại hóa đơn không được để trống" })
    .min(1, "Loại hóa đơn không được để trống"),
  Fuel_Type: z
    .string({
      required_error: "Loại nhiên liệu không được để trống",
    })
    .min(1, "Loại nhiên liệu không được để trống"),
  Start_Time: z.date({
    required_error: "Thời gian bắt đầu bơm không được để trống",
  }),
  End_Time: z.date({
    required_error: "Thời gian kết thúc bơm không được để trống",
  }),
  Unit_Price: z
    .string({ required_error: "Giá không được để trống" })
    .min(1, "Giá không được để trống"),
  Quantity: z
    .string({ required_error: "Số lượng không được để trống" })
    .min(1, "Số lượng không được để trống"),
  Total_Price: z
    .string({ required_error: "Tổng giá không được để trống" })
    .min(1, "Tổng giá không được để trống"),
  companyId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  storeId: z.string().optional().nullable(),
})

export default function FuelCreatePage() {
  const navigation = useNavigate()
  const { toast } = useToast()
  const location = useLocation()
  const params = useParams()
  const user = useAuth(state => state.user)
  
  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [storeList, setStoreList] = useState([])
  const [loggerList, setLoggerList] = useState([])

  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const isEdit = location.pathname.includes("edit")

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  const isValid = form.formState.isValid

  async function onSubmit(values) {
    if (isEdit) {
      const { data } = await editInvoice(params.id, values)
      if (data.status === 200) {
        navigation(PATH.FUEL)
        toast({
          variant: "success",
          description: "Cập nhật hóa đơn thành công!",
        })
      } else {
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Cập nhật hóa đơn thất bại!",
          description: data.message,
        })
      }
    } else {
      const response = await createInvoice(values)

      if (response.status === 201) {
        form.reset(response.data)
        setOpen(true)
      } 
      else
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Tạo hóa đơn thất bại!",
          description: response.message,
        })
    }
  }

  useEffect(() => {
    const handleGetEditInvoice = async () => {
      setFetchInfoLoading(true)
      const { data } = await fetchOneInvoice(params.id)
      if (data.status === 200) {
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
      } else {
        navigation(PATH.FUEL)
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: `Không tìm thấy hóa đơn`,
        })
      }
      setFetchInfoLoading(false)
    }
    if (isEdit && params.id) {
      handleGetEditInvoice()
    }
    const getMetaData = async () => {
      getCompanhList()
      getBranchList()
      getStoreList()
      getLoggerList()
    }
    getMetaData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const getCompanhList = async () => {
    const response = await fetchCompanySimpleList()

    if (response.status === 200) {
      const companyList = response.data
      const companySelectList = transformToSelectList(companyList)
      setCompanyList(companySelectList)
    }
  }

  const getBranchList = async (value) => {
    const response = await fetchBranchSimpleList({ companyId: value })
    if (response.status === 200) {
      const branchList = response.data
      const branchSelectList = transformToSelectList(branchList)
      setBranchList(branchSelectList)
    }
  }

  const getStoreList = async (value) => {
    const response = await fetchStoreSimpleList({ branchId: value })
    if (response.status === 200) {
      const resData = response.data
      const selectList = transformToSelectList(resData)
      setStoreList(selectList)
    }
  }

  const getLoggerList = async (value) => {
    const response = await fetchLoggerSimpleList({ storeId: value })
    if (response.status === 200) {
      const resData = response.data
      const selectList = transformToSelectList(resData, 'Logger_ID', 'Logger_ID')
      setLoggerList(selectList)
    }
  }

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
          {fetchInfoLoading ? (
            <SkeletonForm />
          ) : (
            <>
              <FormCreate {...{ user, form, branchList, companyList, storeList, loggerList, getBranchList, getStoreList, getLoggerList }} />

              <Card className="p-4 space-x-4 text-right">
                <Button
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault()
                    navigation(-1)
                  }}
                >
                  Hủy
                </Button>
                <Button disabled={!isValid} type="submit">
                  {isEdit ? "Lưu" : "Tạo mới"}
                </Button>
              </Card>
            </>
          )}
        </form>
      </Form>
      <CreateSuccessConfirm {...{ open, setOpen }} />
      <CloseConfirm {...{ form }} />
    </div>
  )
}
