import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"

export default function AdditionalFilter({ filter, onFieldChange }) {
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
