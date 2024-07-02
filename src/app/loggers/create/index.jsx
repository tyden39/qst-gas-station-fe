import { zodResolver } from "@hookform/resolvers/zod"
import { create, edit, fetchOne } from "actions/loggerActions"
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
import { transformToSelectList } from "lib/transofrm"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchStoreSimpleList } from "actions/storeActions"
import PATH from "routers/path"
import CloseConfirm from "components/layout/CloseConfirm"
import useAuth from "zustands/useAuth"

const newSchema = z.object({
  Logger_ID: z
    .string({ required_error: "Logger ID không được để trống" })
    .min(1, "Logger ID không được để trống"),
  storeId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  companyId: z.string().optional().nullable(),
})

export default function LoggerCreatePage() {
  const { toast } = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()
  const user = useAuth(state => state.user)

  const isEdit = location.pathname.includes("edit")
  const [loading, setLoading] = useState(false)
  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)
  const [open, setOpen] = useState(false)
  
  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [storeList, setStoreList] = useState([])

  const form = useForm({
    resolver: zodResolver(newSchema),
    mode: 'onTouched',
    defaultValues: {},
  })

  const isValid = form.formState.isValid

  async function onSubmit(values) {
    setLoading(true)
    if (isEdit) {
      const response = await edit('params.id', values)
      if (response.status === 200) {
        form.reset(response.data, { keepDirtyValues: true })
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
      getCompanhList()
      getBranchList()
      getStoreList()
    }
    if (isEdit && params.id) {
      handleGetEditData()
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
          {isEdit ? "Chỉnh sửa logger" : "Thêm mới logger"}
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
              <CreateForm
                {...{ user, form, branchList, companyList, storeList, getBranchList, getStoreList }}
              />

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
                <Button disabled={loading || !isValid}>{isEdit ? "Lưu" : "Tạo mới"}</Button>
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
