import { FormSelect } from "components/FormSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"
import { initFilter } from "./initial"

export default function InvoiceFilter({ onFieldChange }) {
  return (
    <>
      <DatePickerWithRange
        name={"billDate"}
        label='Logger Time:'
        defaultValue={initFilter.billDate}
        onChangeValue={onFieldChange}
      />
      <FormSelect
        name="billType"
        defaultValue={initFilter.billType}
        label={"Bill Type:"}
        onValueChange={onFieldChange}
        selectList={BILL_TYPES}
      />
      <FormSelect
        name="fuelType"
        label={"Fuel Type:"}
        defaultValue={initFilter.fuelType}
        onValueChange={onFieldChange}
        selectList={FUEL_TYPE}
      />
      <FormSelect
        name="pumpId"
        label={"Pump ID:"}
        defaultValue={initFilter.pumpId}
        onValueChange={onFieldChange}
        selectList={PUMP_ID}
        className={"mb-2"}
      />
    </>
  )
}
