import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { Input } from "components/ui/input"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import PATH from "routers/path"
import { z } from "zod"
import useAuth from "zustands/useAuth"

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default function LoginPage() {
  const [login, loading] = useAuth((auth) => [auth.login, auth.loading])
  const navigation = useNavigate()

  const [error, setError] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const result = await login(values)
    if (result.status === 200) {
      navigation(PATH.HOME)
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center gap-10">
      <h1 className="mt-20 text-8xl text-[#001C39] tracking-wider font-bold">QS PECO</h1>
      <Card className="w-[400px] py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Login</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên đăng nhập" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full mt-4"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
