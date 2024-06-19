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

export default function FormCreate({
  form,
  companyList,
  branchList,
  storeList,
  getBranchList,
  getStoreList,
}) {
  console.log(form.watch('companyId'))
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
                <FormLabel>Mã kiểm tra</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mã kiểm tra"
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
            name="Logger_ID"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Mã logger</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mã logger" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Logger_Time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Thời gian ghi log</FormLabel>
                <FormDatePicker {...{ field, placeholder: "Chọn ngày" }} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSelect
            form={form}
            name="Pump_ID"
            label="Mã vòi bơm"
            placeholder={"Chọn mã vòi bơm"}
            list={PUMP_ID.slice(1)}
          />
          <FormField
            control={form.control}
            name="Bill_No"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Mã hóa đơn</FormLabel>
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
            label="Loại hóa đơn"
            placeholder={"Chọn loại hóa đơn"}
            list={BILL_TYPES.slice(1)}
          />
          <FormSelect
            form={form}
            name="Fuel_Type"
            label="Loại nhiên liệu"
            placeholder={"Chọn loại nhiên liệu"}
            list={FUEL_TYPE.slice(1)}
          />
          <FormField
            control={form.control}
            name="Start_Time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Thời gian bắt đầu bơm</FormLabel>
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
                <FormLabel>Thời gian kết thúc bơm</FormLabel>
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
                <FormLabel>Giá</FormLabel>
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
                <FormLabel>Số lượng</FormLabel>
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
                <FormLabel>Tổng tiền</FormLabel>
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
