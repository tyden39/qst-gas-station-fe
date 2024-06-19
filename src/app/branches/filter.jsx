import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"

export default function BranchFilter({ onFieldChange, companyList }) {
  return (
    <>
      <DatePickerWithRange
        name={"createdAt"}
        label="Ngày tạo:"
        placeholder="Chọn ngày"
        onChangeValue={onFieldChange}
      />
      <FilterSelect
        name="companyId"
        label={"Công ty:"}
        placeholder="Chọn công ty"
        selectList={companyList}
      />
    </>
  )
}
