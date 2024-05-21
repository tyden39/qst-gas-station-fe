import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
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
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import PATH from "routers/path"
import { z } from "zod"
import useAuth from "zustands/useAuth"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})

export default function LoginPage() {
  const login = useAuth((auth) => auth.login)
  const navigation = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const isLoginSuccess = await login(values)
    if (isLoginSuccess) navigation(PATH.HOME)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px] py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Login</CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="w-full mt-4" onClick={form.handleSubmit(onSubmit)} >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
