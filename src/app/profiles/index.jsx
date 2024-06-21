import { zodResolver } from "@hookform/resolvers/zod"
import { edit, fetchOneUser } from "actions/userApi"
import CloseConfirm from "components/layout/CloseConfirm"
import { Button } from "components/ui/button"
import { Card } from "components/ui/card"
import { Form } from "components/ui/form"
import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useAuth from "zustands/useAuth"
import AccountInfo from "./AccountInfo"
import UserInfo from "./UserInfo"
import SkeletonForm from "./skeleton-form"

const editSchema = z.object({
  firstName: z
    .string({ required_error: "Tên không được để trống" })
    .min(1, "Tên không được để trống"),
  lastName: z
    .string({ required_error: "Họ không được để trống" })
    .min(1, "Họ không được để trống"),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
})

export default function ProfilesPage() {
  const [user] = useAuth((state) => [state.user])
  const { toast } = useToast()
  const [fetchInfoLoading, setFetchInfoLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(editSchema),
    mode: "onTouched",
  })

  async function onSubmit(values) {
    const response = await edit(user.id, values)
    if (response.status === 200) {
      form.reset(response.data, { keepDirtyValues: true })
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
  }

  useEffect(() => {
    const handleGetEditUser = async () => {
      if (!user?.id) return
      setFetchInfoLoading(true)
      const response = await fetchOneUser(user.id)
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
    handleGetEditUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="w-full">
      <div className="">
        <h1 className="text-4xl leading-normal mb-3">Hồ sơ người dùng</h1>
      </div>
      <Form {...form}>
        {fetchInfoLoading ? (
          <SkeletonForm />
        ) : (
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
              <Button type="submit" disabled={!form.formState.isDirty}>
                Lưu
              </Button>
            </Card>
          </form>
        )}
      </Form>
      <CloseConfirm {...{ form }} />
    </div>
  )
}
