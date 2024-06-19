import FormSelect from "components/form/select"
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
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"
import { CircleHelp } from "lucide-react"

export default function UserRoles({
  form,
  roles,
  companyList,
  branchList,
  storeList,
  getBranchList,
  getStoreList
}) {

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
                  value={field.value}
                  className="grid grid-cols-1 w-full items-center gap-8"
                >
                  {roles.map((item) => (
                    <FormItem
                      key={item.label}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel>{item.label}</FormLabel>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <CircleHelp size={16} className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4 pt-6">
        <FormSelect
            {...{
              form,
              label: "Công ty",
              placeholder: "Chọn công ty",
              name: "companyId",
              list: companyList,
              onChange: async (value) => {
                await getBranchList(value)
                form.resetField("branchId")
              },
            }}
          />
          <FormSelect
            {...{
              form,
              label: "Chi nhánh",
              placeholder: "Chọn chi nhánh",
              name: "branchId",
              list: branchList,
              disabled: !form.watch('companyId'),
              onChange: async (value) => {
                await getStoreList(value)
                form.resetField("storeId")
              },
            }}
          />
          <FormSelect
            {...{
              form,
              label: "Cửa hàng",
              placeholder: "Chọn cửa hàng",
              name: "storeId",
              list: storeList,
              disabled: !form.watch('branchId'),
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
