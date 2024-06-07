import { Button } from "components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { Input } from "components/ui/input"

export default function AccountInfo({ form, isEdit, isChangePassword, setIsChangePassword }) {

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thông tin người dùng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>
                  Tên đăng nhập <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl disabled={isEdit}>
                  <Input placeholder="Nhập tên đăng nhập" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEdit && !isChangePassword ? (
            <Button
              onClick={(event) => {
                event.preventDefault()
                setIsChangePassword(true)
              }}
            >
              Đổi mật khẩu
            </Button>
          ) : (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>
                      Mật khẩu <span className="text-red-500">*</span>
                    </FormLabel>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>
                      Nhập lại mật khẩu <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEdit && (
                <Button
                  onClick={(event) => {
                    event.preventDefault()
                    setIsChangePassword(false)
                  }}
                >
                  Hủy đổi mật khẩu
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
