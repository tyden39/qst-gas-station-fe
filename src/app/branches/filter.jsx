import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"

export default function BranchFilter({ filter, onFieldChange, companyList }) {
  return (
    <>
      <DatePickerWithRange
        name={"createdAt"}
        label="Ngày tạo:"
        placeholder="Chọn ngày"
        date={filter?.createdAt}
        onChangeValue={onFieldChange}
      />
      <FilterSelect
        name="companyId"
        label={"Công ty:"}
        placeholder="Chọn công ty"
        value={filter?.companyId}
        selectList={companyList}
        onValueChange={onFieldChange}
      />
    </>
  )
}
