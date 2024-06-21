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
import { USER_ROLE } from "constants/user-roles"
import { CircleHelp } from "lucide-react"

export default function UserRoles({
  form,
  roles,
  companyList,
  branchList,
  storeList,
  getBranchList,
  getStoreList,
}) {
  const rolesValue = form.watch("roles")
  const companyIdValue = form.watch("companyId")
  const branchIdValue = form.watch("branchId")
  // const storeIdValue = form.watch("storeId")

  const handleRoleChange = (value, field) => {
    switch (value) {
      case USER_ROLE.ADMIN:
        form.reset({
          roles: value,
          companyId: null,
          branchId: null,
          storeId: null,
        })
        break
      case USER_ROLE.COMPANY:
        form.reset({
          roles: value,
          companyId: null,
          branchId: null,
          storeId: null,
        })
        break
      case USER_ROLE.BRANCH:
        form.reset({
          roles: value,
          companyId: null,
          branchId: null,
          storeId: null,
        })
        break
      default:
        field.onChange(value)
        break
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Vai trò người dùng <span className="text-red-500">*</span>
        </CardTitle>
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
                  onValueChange={(value) => handleRoleChange(value, field)}
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
          {![USER_ROLE.ADMIN].includes(rolesValue) ? (
            <FormSelect
              {...{
                form,
                label: (
                  <span>
                    Công ty <span className="text-red-500">*</span>
                  </span>
                ),
                placeholder: "Chọn công ty",
                name: "companyId",
                list: companyList,
                onChange: async (value) => {
                  await getBranchList(value)
                  form.resetField("branchId")
                },
              }}
            />
          ) : null}
          {![USER_ROLE.ADMIN, USER_ROLE.COMPANY].includes(rolesValue) ? (
            <FormSelect
              {...{
                form,
                label: (
                  <span>
                    Chi nhánh <span className="text-red-500">*</span>
                  </span>
                ),
                placeholder: "Chọn chi nhánh",
                name: "branchId",
                list: branchList,
                disabled: !companyIdValue,
                onChange: async (value) => {
                  await getStoreList(value)
                  form.resetField("storeId")
                },
              }}
            />
          ) : null}
          {![USER_ROLE.ADMIN, USER_ROLE.COMPANY, USER_ROLE.BRANCH].includes(
            rolesValue
          ) ? (
            <FormSelect
              {...{
                form,
                label: (
                  <span>
                    Cửa hàng <span className="text-red-500">*</span>
                  </span>
                ),
                placeholder: "Chọn cửa hàng",
                name: "storeId",
                list: storeList,
                disabled: !branchIdValue || !companyIdValue,
              }}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
