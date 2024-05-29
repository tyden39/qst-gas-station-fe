import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"
import { initFilter } from "./initial"

export default function InvoiceFilter({ onFieldChange }) {
  return (
    <>
      <DatePickerWithRange
        name={"billDate"}
        label='Thời gian ghi log:'
        defaultValue={initFilter.billDate}
        onChangeValue={onFieldChange}
      />
      <FilterSelect
        name="billType"
        defaultValue={initFilter.billType}
        label={"Loại hóa đơn:"}
        onValueChange={onFieldChange}
        selectList={BILL_TYPES}
      />
      <FilterSelect
        name="fuelType"
        label={"Loại nhiên liệu:"}
        defaultValue={initFilter.fuelType}
        onValueChange={onFieldChange}
        selectList={FUEL_TYPE}
      />
      <FilterSelect
        name="pumpId"
        label={"Mã vòi bơm:"}
        defaultValue={initFilter.pumpId}
        onValueChange={onFieldChange}
        selectList={PUMP_ID}
        className={"mb-2"}
      />
    </>
  )
}
