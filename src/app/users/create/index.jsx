import { zodResolver } from "@hookform/resolvers/zod"
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchStoreSimpleList } from "actions/storeActions"
import { create, edit, fetchOneUser } from "actions/userApi"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { USER_ROLE, USER_ROLES } from "constants/user-roles"
import { transformToSelectList } from "lib/transofrm"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Form as RouterForm, useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import PATH from "routers/path"
import { z } from "zod"
import useAuth from "zustands/useAuth"
import AccountInfo from "./AccountInfo"
import UserInfo from "./UserInfo"
import UserRoles from "./UserRoles"
import SkeletonForm from "./skeleton-form"
import CreateSuccessConfirm from "components/layout/CreateSucessConfirm"
import CloseConfirm from "components/layout/CloseConfirm"

const newSchema = z
  .object({
    username: z
      .string({ required_error: "Tên đăng nhập không được để trống" })
      .min(5, "Tên đăng nhập phải >= 5 ký tự")
      .max(255, 'Tên đăng nhập không được vượt quá 255 ký tự')
      .refine(value => !/\s/.test(value), {
        message: 'Tên đăng nhập không được có khoảng trống',
      }),
    password: z
      .string({ required_error: "Mật khẩu không được để trống" })
      .min(1, "Mật khẩu không được để trống")
      .max(255, 'Mật khẩu không được vượt quá 255 ký tự'),
    confirmPassword: z
      .string({
        required_error: "Nhập lại mật khẩu không được để trống",
      })
      .min(1, "Nhập lại mật khẩu không được để trống"),
    firstName: z
      .string({ required_error: "Tên không được để trống" })
      .min(1, "Tên không được để trống")
      .max(255, 'Tên không được vượt quá 255 ký tự'),
    lastName: z
      .string({ required_error: "Họ không được để trống" })
      .min(1, "Họ không được để trống")
      .max(255, 'Họ không được vượt quá 255 ký tự'),
    email: z.string().max(255, 'Email không được vượt quá 255 ký tự').optional().nullable(),
    phone: z.string().max(255, 'Số điện thoại không được vượt quá 255 ký tự').optional().nullable(),
    roles: z.string({
      required_error: "Vai trò người dùng không được để trống",
    }),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    storeId: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.roles === USER_ROLE.COMPANY) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
    }

    if (data.roles === USER_ROLE.BRANCH) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
      if (!data.branchId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branchId"],
          message: "Công ty không được để trống",
        })
    }

    if (
      data.roles === USER_ROLE.STORE ||
      data.roles === USER_ROLE.READ_ONLY_STORE
    ) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
      if (!data.branchId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branchId"],
          message: "Công ty không được để trống",
        })
      if (!data.storeId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storeId"],
          message: "Công ty không được để trống",
        })
    }
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })

const editSchema = z
  .object({
    firstName: z.string({ required_error: "Tên không được để trống" }).min(1, "Tên không được để trống").max(255, 'Tên không được vượt quá 255 ký tự'),
    lastName: z.string({ required_error: "Họ không được để trống" }).min(1, "Họ không được để trống").max(255, 'Họ không được vượt quá 255 ký tự'),
    email: z.string().max(255, 'Email không được vượt quá 255 ký tự').optional().nullable(),
    phone: z.string().max(255, 'Email không được vượt quá 255 ký tự').optional().nullable(),
    roles: z.string({
      required_error: "Vai trò người dùng không được để trống",
    }),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    storeId: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.roles === USER_ROLE.COMPANY) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
    }

    if (data.roles === USER_ROLE.BRANCH) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
      if (!data.branchId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branchId"],
          message: "Công ty không được để trống",
        })
    }

    if (
      data.roles === USER_ROLE.STORE ||
      data.roles === USER_ROLE.READ_ONLY_STORE
    ) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
      if (!data.branchId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branchId"],
          message: "Công ty không được để trống",
        })
      if (!data.storeId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storeId"],
          message: "Công ty không được để trống",
        })
    }
  })

const editSchemaWithPassword = z
  .object({
    firstName: z.string({ required_error: "Tên không được để trống" }).min(1, "Tên không được để trống").max(255, 'Tên không được vượt quá 255 ký tự'),
    lastName: z.string({ required_error: "Họ không được để trống" }).min(1, "Họ không được để trống").max(255, 'Họ không được vượt quá 255 ký tự'),
    email: z.string().max(255, 'Email không được vượt quá 255 ký tự').optional().nullable(),
    phone: z.string().max(255, 'Số điện thoại không được vượt quá 255 ký tự').optional().nullable(),
    roles: z.string({
      required_error: "Vai trò người dùng không được để trống",
    }),
    password: z.string({ required_error: "Mật khẩu không được để trống" }).max(255, 'Mật khẩu không được vượt quá 255 ký tự'),
    confirmPassword: z.string(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    storeId: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.roles === USER_ROLE.COMPANY) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
    }

    if (data.roles === USER_ROLE.BRANCH) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
      if (!data.branchId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branchId"],
          message: "Công ty không được để trống",
        })
    }

    if (
      data.roles === USER_ROLE.STORE ||
      data.roles === USER_ROLE.READ_ONLY_STORE
    ) {
      if (!data.companyId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyId"],
          message: "Công ty không được để trống",
        })
      if (!data.branchId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branchId"],
          message: "Công ty không được để trống",
        })
      if (!data.storeId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storeId"],
          message: "Công ty không được để trống",
        })
    }
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })

export default function UserCreatePage() {
  const { toast } = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()

  const [user] = useAuth((state) => [state.user])
  const roles = useMemo(
    () => USER_ROLES.filter((item) => user?.roles?.includes(item.value)),
    [user.roles]
  )
  const upperCompanyRole = ['000', '001'].includes(user?.roles?.[0])
  
  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [storeList, setStoreList] = useState([])
  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)

  const isEdit = location.pathname.includes("edit")
  const [loading, setLoading] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(
      isEdit
        ? isChangePassword
          ? editSchemaWithPassword
          : editSchema
        : newSchema
    ),
    mode: "onTouched",
    defaultValues: {
      roles: roles[0].value,
    },
  })

  const {isValid, isDirty} = form.formState
  
  async function onSubmit(values) {
    setLoading(true)
    if (isEdit) {
      const response = await edit(params.id, values)
      if (response.status === 200) {
        form.reset(response.data)
        navigation(PATH.USER)
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
        form.reset({...response.data, roles: response.data.roles?.[0]})
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
    const handleGetEditUser = async () => {
      setFetchInfoLoading(true)
      const response = await fetchOneUser(params.id)
      if (response.status === 200) {
        form.reset({ ...response.data, roles: response.data.roles?.[0] })
      } else
        toast({
          variant: TOAST.DESTRUCTIVE,
          title: "Lấy thông tin thất bại!",
          description: response.message,
        })
      setFetchInfoLoading(false)
    }
    if (isEdit && params.id) {
      handleGetEditUser()
    }
    const getMetaData = async () => {
      const isAdmin = user?.roles?.[0] === USER_ROLE.ADMIN
      if (isAdmin) getCompanhList()
      else getCompanhList(user.companyId)
      getBranchList()
      getStoreList()
    }
    getMetaData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCompanhList = async (value) => {
    const response = await fetchCompanySimpleList({ companyId: value })

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
      const storeList = response.data
      const storeSelectList = transformToSelectList(storeList)
      setStoreList(storeSelectList)
    }
  }

  return (
    <div className="w-full p-4">
      <div className="">
        <Link
          to={PATH.USER}
          className={cn(
            "flex items-center gap-1 hover:underline text-sm text-slate-500"
          )}
        >
          <ChevronLeft size={14} />
          {"Trở lại danh sách"}
        </Link>
        <h1 className="text-4xl leading-normal mb-3">
          {isEdit ? "Chỉnh sửa người dùng" : "Thêm mới người dùng"}
        </h1>
      </div>

      <Form {...form}>
        <RouterForm
          className="grid grid-cols-3 gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {fetchInfoLoading ? (
            <SkeletonForm />
          ) : (
            <>
              <div className="col-span-2 space-y-8">
                <UserInfo {...{ form }} />
                {upperCompanyRole ? <UserRoles
                  {...{
                    form,
                    roles,
                    branchList,
                    companyList,
                    storeList,
                    getBranchList,
                    getStoreList,
                  }}
                /> : null}
              </div>
              <div className="">
                <AccountInfo
                  {...{ form, isEdit, isChangePassword, setIsChangePassword }}
                />
              </div>
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
                <Button disabled={loading || !isValid || !isDirty}>
                  {isEdit ? "Lưu" : "Tạo mới"}
                </Button>
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
