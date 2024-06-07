import { DatePickerWithRange } from "components/ui/datepicker"

export default function InvoiceFilter({ onFieldChange }) {
  return (
    <>
      <DatePickerWithRange
        name={"createdAt"}
        label="Ngày tạo:"
        placeholder="Chọn ngày"
        onChangeValue={onFieldChange}
      />
    </>
  )
}
