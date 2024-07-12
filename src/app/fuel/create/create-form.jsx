import FormDatePicker from "components/form/datepicker"
import FormSelect from "components/form/select"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import { Input } from "components/ui/input"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "../constant"
import { USER_ROLE } from "constants/user-roles"

export default function FormCreate({
  user,
  form,
  companyList,
  branchList,
  storeList,
  getBranchList,
  getStoreList,
  getLoggerList,
  loggerList,
  isEdit
}) {
  const userRole = user.roles[0]
  const companyIdValue = form.watch("companyId")
  const branchIdValue = form.watch("branchId")
  const storeIdValue = form.watch("storeId")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="Check_Key"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>
                  Mã kiểm tra <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mã kiểm tra"
                    {...field}
                    autoComplete="false"
                    disabled={isEdit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="Logger_ID"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>
                  Mã logger <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mã logger" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="Logger_Time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Thời gian ghi log <span className="text-red-500">*</span>
                </FormLabel>
                <FormDatePicker {...{ field, placeholder: "Chọn ngày" }} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSelect
            form={form}
            name="Pump_ID"
            label={
              <>
                Mã vòi bơm <span className="text-red-500">*</span>
              </>
            }
            placeholder={"Chọn mã vòi bơm"}
            list={PUMP_ID.slice(1)}
          />
          <FormField
            control={form.control}
            name="Bill_No"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>
                  Mã hóa đơn <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mã hóa đơn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSelect
            form={form}
            name="Bill_Type"
            label={
              <>
                Loại hóa đơn <span className="text-red-500">*</span>
              </>
            }
            placeholder={"Chọn loại hóa đơn"}
            list={BILL_TYPES}
          />
          <FormSelect
            form={form}
            name="Fuel_Type"
            label={
              <>
                Loại nhiên liệu <span className="text-red-500">*</span>
              </>
            }
            placeholder={"Chọn loại nhiên liệu"}
            list={FUEL_TYPE}
          />
          <FormField
            control={form.control}
            name="Start_Time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Thời gian bắt đầu bơm <span className="text-red-500">*</span>
                </FormLabel>
                <FormDatePicker {...{ field, placeholder: "Chọn ngày" }} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="End_Time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Thời gian kết thúc bơm <span className="text-red-500">*</span>
                </FormLabel>
                <FormDatePicker {...{ field, placeholder: "Chọn ngày" }} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Unit_Price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Giá <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Nhập giá" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Quantity"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Số lượng <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Nhập số lượng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Total_Price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Tổng tiền <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập tổng tiền"
                    {...field}
                  />
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
                disabled: isEdit,
                onChange: async (value) => {
                  await getBranchList(value)
                  form.resetField("branchId", {defaultValue: null})
                  form.resetField("storeId", {defaultValue: null})
                  form.resetField("Logger_ID", {defaultValue: null})
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
                disabled: !companyIdValue || isEdit,
                onChange: async (value) => {
                  await getStoreList(value)
                  form.resetField("storeId", {defaultValue: null})
                  form.resetField("Logger_ID", {defaultValue: null})
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
                disabled: !branchIdValue || !companyIdValue || isEdit,
                onChange: async (value) => {
                  await getLoggerList(value)
                  form.resetField("Logger_ID", {defaultValue: null})
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
                    Mã logger <span className="text-red-500">*</span>
                  </span>
                ),
                placeholder: "Chọn mã logger",
                name: "Logger_ID",
                list: loggerList,
                disabled: !branchIdValue || !companyIdValue || !storeIdValue || isEdit,
              }}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
