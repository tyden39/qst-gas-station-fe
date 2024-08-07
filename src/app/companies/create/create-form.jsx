import { Card, CardContent } from "components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { Input } from "components/ui/input"

export default function CreateForm({ form, isEdit, token, handleCopyToken }) {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="grid w-full items-center gap-4 pt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>
                    Tên công ty <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên công ty" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="taxCode"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Mã số thuế</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mã số thuế" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập email"
                    {...field}
                    autoComplete="false"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEdit ? (
            <FormItem className="space-y-1.5 grid grid-cols-1">
              <FormLabel>Token</FormLabel>
              <p
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer opacity-50"
                style={{ wordWrap: "break-word" }}
                onClick={()=>handleCopyToken(token)}
              >
                {token}
              </p>
            </FormItem>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
