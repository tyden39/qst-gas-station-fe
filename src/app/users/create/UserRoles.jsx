import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"

export default function UserRoles({ form }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vai trò người dùng</CardTitle>
        <CardDescription>Chọn một trong các vai trò:</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 w-full items-center gap-8"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel>Quản lý website</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin-branch" />
                    </FormControl>
                    <FormLabel>Quản lý chi nhánh</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin-store" />
                    </FormControl>
                    <FormLabel>Quản lý cửa hàng</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="edit-store" />
                    </FormControl>
                    <FormLabel>Chỉnh sửa cửa hàng</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="view-store" />
                    </FormControl>
                    <FormLabel>Xem cửa hàng</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
