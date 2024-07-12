import FormSelect from "components/form/select"
import { Card, CardContent } from "components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { Input } from "components/ui/input"
import { USER_ROLE } from "constants/user-roles"

export default function CreateForm({
  user,
  form,
  companyList,
  branchList,
  storeList,
  getBranchList,
  getStoreList,
  isEdit
}) {
  const userRole = user.roles[0]
  const companyIdValue = form.watch("companyId")
  const branchIdValue = form.watch("branchId")

  return (
    <Card className="w-full">
      <CardContent>
        <div className="grid w-full items-center gap-4 pt-8">
          <FormField
            control={form.control}
            name="Logger_ID"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>
                  Mã logger <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input disabled={isEdit} placeholder="Nhập Logger ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {[USER_ROLE.ADMIN].includes(userRole) ? (
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
                  form.resetField("branchId", {defaultValue: null})
                  form.resetField("storeId", {defaultValue: null})
                },
              }}
            />
          ) : null}
          {[USER_ROLE.ADMIN, USER_ROLE.COMPANY].includes(userRole) ? (
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
                disabled: ![USER_ROLE.COMPANY].includes(userRole) && !companyIdValue,
                onChange: async (value) => {
                  await getStoreList(value)
                  form.resetField("storeId", {defaultValue: null})
                },
              }}
            />
          ) : null}
          {[USER_ROLE.ADMIN, USER_ROLE.COMPANY, USER_ROLE.BRANCH].includes(
            userRole
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
                disabled: (!branchIdValue) && ![USER_ROLE.BRANCH].includes(userRole),
              }}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
