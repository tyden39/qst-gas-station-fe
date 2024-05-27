import { DatePickerWithRange } from "components/ui/datepicker"

export default function InvoiceFilter({ onFieldChange }) {
  return (
    <>
      <DatePickerWithRange
        name={"createdAt"}
        label="Ngày tạo:"
        onChangeValue={onFieldChange}
      />
      {/* <FormSelect
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
      /> */}
    </>
  )
}
