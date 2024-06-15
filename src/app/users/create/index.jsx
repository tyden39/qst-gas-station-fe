import { zodResolver } from "@hookform/resolvers/zod"
import { create, edit, fetchOneUser } from "actions/userApi"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm, Form as RouterForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import AccountInfo from "./AccountInfo"
import UserInfo from "./UserInfo"
import UserRoles from "./UserRoles"
import { useToast } from "components/ui/use-toast"
import { USER_ROLES } from "constants/user-roles"
import PATH from "routers/path"
import { TOAST } from "components/ui/toast"
import CreateSuccessConfirm from "../components/CreateSucessConfirm"

const newSchema = z
  .object({
    username: z.string({ required_error: "Tên đăng nhập không được để trống" }),
    password: z.string({ required_error: "Mật khẩu không được để trống" }),
    confirmPassword: z.string({
      required_error: "Nhập lại mật khẩu không được để trống",
    }),
    firstName: z.string({ required_error: "Tên không được để trống" }),
    lastName: z.string({ required_error: "Họ không được để trống" }),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    roles: z.string({ required_error: "Vai trò người dùng không được để trống" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })

  const editSchema = z.object({
    firstName: z.string({ required_error: "Tên không được để trống" }),
    lastName: z.string({ required_error: "Họ không được để trống" }),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    roles: z.string({ required_error: "Vai trò người dùng không được để trống" }),
  })

  const editSchemaWithPassword = z.object({
    firstName: z.string({ required_error: "Tên không được để trống" }),
    lastName: z.string({ required_error: "Họ không được để trống" }),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    roles: z.string({ required_error: "Vai trò người dùng không được để trống" }),
    password: z.string({ required_error: "Mật khẩu không được để trống" }),
    confirmPassword: z.string({
      required_error: "Nhập lại mật khẩu không được để trống",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })

export default function UserCreatePage() {
  const {toast} = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()

  const isEdit = location.pathname.includes("edit")
  const [loading, setLoading] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(isEdit ? isChangePassword ? editSchemaWithPassword : editSchema : newSchema),
    defaultValues: {
      roles: USER_ROLES[0].value,
    },
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
      const editUser = await fetchOneUser(params.id)
      form.reset(editUser)
    }
    if (isEdit && params.id) {
      handleGetEditUser()
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
          {isEdit ? "Chỉnh sửa người dùng" : "Thêm mới người dùng"}
        </h1>
      </div>

      <Form {...form}>
        <RouterForm
          className="grid grid-cols-3 gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="col-span-2 space-y-8">
            <UserInfo {...{ form }} />
            <UserRoles {...{ form }} />
          </div>
          <div className="">
            <AccountInfo {...{ form, isEdit, isChangePassword, setIsChangePassword }} />
          </div>

          <Card className="col-span-2 p-4 space-x-4 text-right">
            <Button disabled={loading} variant="outline" onClick={(event) => {
              event.preventDefault()
              navigation(-1)
            }}>
              Hủy
            </Button>
            <Button disabled={loading}>{isEdit ? "Lưu" : "Tạo mới"}</Button>
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
