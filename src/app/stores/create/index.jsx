import { zodResolver } from "@hookform/resolvers/zod"
import { create, edit, fetchOne } from "actions/storeActions"
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
import { transformToSelectList } from "lib/transofrm"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import PATH from "routers/path"

const newSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  companyId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
})

export default function StoreCreatePage() {
  const { toast } = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()

  const isEdit = location.pathname.includes("edit")
  const [loading, setLoading] = useState(false)
  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])

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
      const response = await edit(params.id, values)
      if (response.status === 200) {
        form.reset(response.data, {keepDirtyValues: true})
        navigation(PATH.STORE)
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
      const response = await Promise.all([
        fetchCompanySimpleList(),
        fetchBranchSimpleList()
      ])

      // Company
      if (response[0].status === 200) {
        const companyList = response[0].data
        const companySelectList = transformToSelectList(companyList)
        setCompanyList(companySelectList)
      }

      // Branch
      if (response[1].status === 200) {
        const branchList = response[1].data
        const branchSelectList = transformToSelectList(branchList)
        setBranchList(branchSelectList)
      }
    }
    if (isEdit && params.id) {
      handleGetEditData()
    }
    getMetaData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
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
          {isEdit ? "Chỉnh sửa cửa hàng" : "Thêm mới cửa hàng"}
        </h1>
      </div>

      <Form {...form}>
        <RouterForm
          className="grid grid-cols-1 gap-y-8 w-[800px] mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {fetchInfoLoading ? <SkeletonForm /> : <CreateForm {...{ form, companyList, branchList }} />}

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
