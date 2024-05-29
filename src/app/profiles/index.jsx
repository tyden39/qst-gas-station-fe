import { zodResolver } from "@hookform/resolvers/zod"
import { editUser, fetchOneUser } from "api/userApi"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { cn } from "lib/utils"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"
import useAuth from "zustands/useAuth"
import AccountInfo from "./AccountInfo"
import UserInfo from "./UserInfo"

const editSchema = z.object({
  firstName: z.string({ required_error: "Tên không được để trống" }),
  lastName: z.string({ required_error: "Họ không được để trống" }),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
})

export default function ProfilesPage() {
  const authUser = useAuth(state => state.user)
  const {toast} = useToast()

  const form = useForm({
    resolver: zodResolver(editSchema),
  })

  async function onSubmit(values) {
    const response = await editUser(authUser.id, values)
    if (response.status === 200) {
      form.reset(response.data)
      toast({
        variant: 'success',
        description: "Lưu thông tin thành công!"
      })
    } else toast({
      variant: TOAST.DESTRUCTIVE,
      title: 'Lưu thông tin thất bại!',
      description: response.message
    })
  }

  useEffect(() => {
    const handleGetEditUser = async () => {
      if (!authUser?.id) return
      const editUser = await fetchOneUser(authUser.id)
      form.reset(editUser)
    }
    handleGetEditUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

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
          Hồ sơ người dùng
        </h1>
      </div>

      <Form {...form}>
        <form
          className="grid grid-cols-3 gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="col-span-2 space-y-8">
            <UserInfo {...{ form }} />
          </div>
          <div className="">
            <AccountInfo {...{ form, isEdit: true }} />
          </div>

          <Card className="col-span-2 p-4 space-x-4 text-right">
            <Button type="submit" disabled={!form.formState.isDirty}>Lưu</Button>
          </Card>
        </form>
      </Form>
    </div>
  )
}
