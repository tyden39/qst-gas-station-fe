import { zodResolver } from "@hookform/resolvers/zod"
import { createUser, editUser, fetchOneUser } from "api/userApi"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useForm, Form as RouterForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import AccountInfo from "./AccountInfo"
import UserInfo from "./UserInfo"
import UserRoles from "./UserRoles"
import { useToast } from "components/ui/use-toast"

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
    roles: z.string(),
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
  roles: z.string(),
})

export default function UserCreatePage() {
  const {toast} = useToast()
  const navigation = useNavigate()
  const location = useLocation()
  const params = useParams()

  const isEdit = location.pathname.includes("edit")

  const form = useForm({
    resolver: zodResolver(isEdit ? editSchema : newSchema),
    defaultValues: {
      roles: "admin",
    },
  })

  // const blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     form.formState.isDirty &&
  //     currentLocation.pathname !== nextLocation.pathname
  // );

  function onSubmit(values) {
    if (isEdit) {
      const resUser = editUser(params.id, values)
      if (resUser.error) console.log(resUser.errorMessage)
      else toast({
        variant: 'success',
        description: "You have edited user successfully!"
      })
    } else {
      const newUser = createUser(values)
      if (newUser.error) console.log(newUser.errorMessage)
      else navigation(-1)
    }
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
            <AccountInfo {...{ form, isEdit }} />
          </div>

          <Card className="col-span-2 p-4 space-x-4 text-right">
            <Button variant="outline" onClick={() => navigation(-1)}>
              Hủy
            </Button>
            <Button>{isEdit ? "Lưu" : "Tạo mới"}</Button>
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
    </div>
  )
}
