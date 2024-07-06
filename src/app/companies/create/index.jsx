import { zodResolver } from "@hookform/resolvers/zod"
import {
  createCompany,
  editCompany,
  fetchOneCompany,
} from "actions/companyActions"
import CloseConfirm from "components/layout/CloseConfirm"
import CreateSuccessConfirm from "components/layout/CreateSucessConfirm"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { Label } from "components/ui/label"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { copyToClipboard } from "lib/string"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Form as RouterForm, useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import PATH from "routers/path"
import { z } from "zod"
import CreateForm from "./create-form"
import SkeletonForm from "./skeleton-form"

const newSchema = z.object({
  name: z
    .string({ required_error: "Tên công ty không được để trống" })
    .min(1, "Tên công ty không được để trống")
    .max(255, 'Tên công ty không được vượt quá 255 ký tự'),
  taxCode: z.string().max(255, 'Mã số thuế không được vượt quá 255 ký tự').optional().nullable(),
  email: z.string().max(255, 'Email không được vượt quá 255 ký tự').optional().nullable(),
  address: z.string().max(255, 'Địa chỉ không được vượt quá 255 ký tự').optional().nullable(),
  phone: z.string().max(255, 'Số điện thoại không được vượt quá 255 ký tự').optional().nullable(),
  token: z.string().optional().nullable(),
})

export default function CompanyCreatePage() {
  const { toast } = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()

  const isEdit = location.pathname.includes("edit")
  const [loading, setLoading] = useState(false)
  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(newSchema),
    mode: "onTouched",
    defaultValues: {},
  })

  const isValid = form.formState.isValid
  const [token, setToken] = useState()

  const handleCopyToken = async (token) => {
    try {
      await copyToClipboard(token)
      toast({
        variant: TOAST.SUCCESS,
        title: "Copy thành công!",
      })
    } catch (error) {
      toast({
        variant: TOAST.DESTRUCTIVE,
        title: `Copy thất bại!`,
        description: error.message
      })
    }
  }

  const additionalContent = token ? (
    <div className="flex flex-col justify-center items-center gap-1.5 mt-2 w-full">
      <Label className="mt-1.5">Token:</Label>
      <div
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm overflow-auto text-nowrap cursor-pointer hover:text-accent-foreground"
        onClick={() => handleCopyToken(token)}
      >
        {token}
      </div>
    </div>
  ) : null

  async function onSubmit(values) {
    setLoading(true)
    if (isEdit) {
      const response = await editCompany(params.id, values)
      if (response.status === 200) {
        form.reset(response.data, { keepDirtyValues: false })
        navigation(PATH.COMPANY)
        toast({
          variant: "success",
          description: "Lưu thông tin thành công!",
        })
      } else
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Lưu thông tin thất bại!",
          description: response.message,
        })
    } else {
      const response = await createCompany(values)
      if (response.status === 201) {
        form.reset()
        setToken(response.data.token)
        setOpen(true)
      } else
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Tạo mới thất bại!",
          description: response.message,
        })
    }
    setLoading(false)
  }

  useEffect(() => {
    const handleGetEditData = async () => {
      setFetchInfoLoading(true)
      const response = await fetchOneCompany(params.id)
      if (response.status === 200) {
        setToken(response.data.token)
        form.reset(response.data)
      } else
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Lấy thông tin thất bại!",
          description: response.message,
        })
      setFetchInfoLoading(false)
    }
    if (isEdit && params.id) {
      handleGetEditData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full">
      <div className="">
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
          {isEdit ? "Chỉnh sửa công ty" : "Thêm mới công ty"}
        </h1>
      </div>

      <Form {...form}>
        <RouterForm
          className="grid grid-cols-1 gap-y-8 w-[800px] mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {fetchInfoLoading ? (
            <SkeletonForm />
          ) : (
            <>
              <CreateForm {...{ form, isEdit, token, handleCopyToken }} />
              <Card className="col-span-2 p-4 space-x-4 text-right">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault()
                    navigation(-1)
                  }}
                >
                  Hủy
                </Button>
                <Button disabled={loading || !isValid}>
                  {isEdit ? "Lưu" : "Tạo mới"}
                </Button>
              </Card>
            </>
          )}
        </RouterForm>
      </Form>
      <CreateSuccessConfirm {...{ open, setOpen, additionalContent }} />
      <CloseConfirm {...{ form }} />
    </div>
  )
}
