import { zodResolver } from "@hookform/resolvers/zod"
import { createCompany, editCompany, fetchOneCompany } from "actions/companyActions"
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
import CreateSuccessConfirm from "../components/CreateSucessConfirm"
import PATH from "routers/path"

const newSchema = z.object({
  name: z.string().optional().nullable(),
  taxCode: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
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
    defaultValues: {}
  })

  // const blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     form.formState.isDirty &&
  //     currentLocation.pathname !== nextLocation.pathname
  // );

  async function onSubmit(values) {
    setLoading(true)
    if (isEdit) {
      const response = await editCompany(params.id, values)
      if (response.status === 200) {
        form.reset(response.data, {keepDirtyValues: true})
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
          {fetchInfoLoading ? <SkeletonForm /> : <CreateForm {...{ form }} />}

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
            <Button disabled={!form.formState.isDirty || loading}>
              {isEdit ? "Lưu" : "Tạo mới"}
            </Button>
          </Card>
          {/* {blocker.state === "blocked" ? (
        <div>
          <p>Are you sure you want to leave?</p>
          <button onClick={() => blocker.proceed()}>
            Proceed
          </button>
          <button onClick={() => blocker.reset()}>
            Cancel
          </button>
        </div>
      ) : null} */}
        </RouterForm>
      </Form>
      <CreateSuccessConfirm {...{open, setOpen}} />
    </div>
  )
}
