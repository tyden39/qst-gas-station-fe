import { parseZonedDateTime } from "@internationalized/date"
import { DateRangePicker } from "@nextui-org/date-picker"
import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"

export default function AdditionalFilter({ filter, onFieldChange }) {
  console.log(filter.billDate)
  return (
    <>
      <DatePickerWithRange
        className={"sm:col-span-2"}
        name={"billDate"}
        label="Thời gian ghi log:"
        placeholder={"Chọn ngày"}
        date={filter?.billDate}
        onChangeValue={onFieldChange}
      />
      <DateRangePicker
        className={"sm:col-span-2 hover:text-accent-foreground hover:bg-accent"}
        classNames={{inputWrapper: "border-[hsl(var(--input))] border-1 hover:border-[hsl(var(--input))] focus-within:hover:border-[hsl(var(--input))] rounded-md"}}
        startContent={<div className="w-[114px] flex-shrink-0 text-sm leading-none font-medium text-accent-foreground">Thời gian ghi log:</div>}
        variant="bordered"
        visibleMonths={2}
        defaultValue={{
          start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
          end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
        }}
        value={filter?.billDate}
        onChange={(value) => onFieldChange(value, 'billDate')}
      />
      <FilterSelect
        name="billType"
        value={filter?.billType}
        label={"Loại hóa đơn:"}
        placeholder={"Chọn hóa đơn"}
        onValueChange={onFieldChange}
        selectList={BILL_TYPES}
      />
      <FilterSelect
        name="fuelType"
        label={"Loại nhiên liệu:"}
        placeholder={"Chọn nhiên liệu"}
        value={filter?.fuelType}
        onValueChange={onFieldChange}
        selectList={FUEL_TYPE}
      />
      <FilterSelect
        name="pumpId"
        label={"Mã vòi bơm:"}
        placeholder={"Chọn vòi bơm"}
        value={filter?.pumpId}
        onValueChange={onFieldChange}
        selectList={PUMP_ID}
      />
    </>
  )
}
