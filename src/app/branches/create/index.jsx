import { zodResolver } from "@hookform/resolvers/zod"
import { create, edit, fetchOne } from "actions/branchActions"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Form as RouterForm, useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import CreateForm from "./create-form"
import SkeletonForm from "./skeleton-form"
import CreateSuccessConfirm from "components/layout/CreateSucessConfirm"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { transformToSelectList } from "lib/transofrm"
import PATH from "routers/path"
import CloseConfirm from "components/layout/CloseConfirm"

const newSchema = z.object({
  name: z
    .string({ required_error: "Tên chi nhánh không được để trống" })
    .min(1, "Tên chi nhánh không được để trống")
    .max(255, 'Tên chi nhánh không được vượt quá 255 ký tự'),
  subTaxCode: z.string().max(255, 'Mã số thuế con không được vượt quá 255 ký tự').optional().nullable(),
  email: z.string().max(255, 'Email không được vượt quá 255 ký tự').optional().nullable(),
  address: z.string().max(255, 'Địa chỉ không được vượt quá 255 ký tự').optional().nullable(),
  phone: z.string().max(255, 'Số điện thoại không được vượt quá 255 ký tự').optional().nullable(),
  companyId: z.string().optional().nullable(),
})

export default function BranchCreatePage() {
  const { toast } = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()

  const isEdit = location.pathname.includes("edit")
  const [loading, setLoading] = useState(false)
  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [companyList, setCompanyList] = useState([])

  const form = useForm({
    resolver: zodResolver(newSchema),
    mode: "onTouched",
    defaultValues: {},
  })

  const {isValid, isDirty} = form.formState

  // const blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     form.formState.isDirty &&
  //     currentLocation.pathname !== nextLocation.pathname
  // );

  async function onSubmit(values) {
    setLoading(true)
    if (isEdit) {
      const response = await edit(params.id, values)
      if (response.status === 200) {
        form.reset(response.data, { keepDirtyValues: true })
        navigation(PATH.BRANCH)
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
      const response = await create(values)
      if (response.status === 201) {
        form.reset(response.data)
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
      const response = await fetchOne(params.id)
      if (response.status === 200) {
        form.reset(response.data)
      } else
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Lấy thông tin thất bại!",
          description: response.message,
        })
      setFetchInfoLoading(false)
    }
    const getMetaData = async () => {
      const response = await Promise.all([fetchCompanySimpleList()])

      // Company
      if (response[0].status === 200) {
        const companyList = response[0].data
        const companySelectList = transformToSelectList(companyList)
        setCompanyList(companySelectList)
      }
    }
    if (isEdit && params.id) {
      handleGetEditData()
    }
    getMetaData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full p-4">
      <div className="">
        <Link
          to={PATH.BRANCH}
          className={cn(
            "flex items-center gap-1 hover:underline text-sm text-slate-500"
          )}
        >
          <ChevronLeft size={14} />
          {"Trở lại danh sách"}
        </Link>
        <h1 className="text-4xl leading-normal mb-3">
          {isEdit ? "Chỉnh sửa chi nhánh" : "Thêm mới chi nhánh"}
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
              <CreateForm {...{ form, companyList }} />
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
                <Button disabled={loading || !isValid || !isDirty}>{isEdit ? "Lưu" : "Tạo mới"}</Button>
              </Card>
            </>
          )}
        </RouterForm>
      </Form>
      <CreateSuccessConfirm {...{ open, setOpen }} />
      <CloseConfirm {...{ form }} />
    </div>
  )
}
