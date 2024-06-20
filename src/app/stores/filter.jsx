import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { transformToSelectList } from "lib/transofrm"
import { useEffect, useState } from "react"

export default function InvoiceFilter({ filter, onFieldChange, companyList, branchList }) {
  
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])

  const onCompanyChange = async (value, name) => {
    if (filter.companyId !== value){
      onFieldChange(value, name)
      onFieldChange(undefined, 'branchId')

      const brList = branchList.filter(x => x.companyId === value)
      const selectList = transformToSelectList(brList)
      setBranches(selectList)

      onBranchChange(undefined, 'branchId')
    }
  }

  const onBranchChange = (value, name) => {
    if (filter.branchId !== value){
      onFieldChange(value, name)
    }
  }

  useEffect(() => {
    const selectList = transformToSelectList(companyList)
    setCompanies(selectList)
  }, [companyList])

  useEffect(() => {
    const selectList = transformToSelectList(branchList)
    setBranches(selectList)
  }, [branchList])

  return (
    <>
      <DatePickerWithRange
        name={"createdAt"}
        label="Ngày tạo:"
        date={filter?.createdAt}
        placeholder="Chọn ngày"
        onChangeValue={onFieldChange}
      />
      <FilterSelect
        name="companyId"
        value={filter.companyId}
        label={"Công ty:"}
        placeholder="Chọn công ty"
        onValueChange={onCompanyChange}
        selectList={companies}
      />
      <FilterSelect
        name="branchId"
        value={filter.branchId}
        label={"Chi nhánh:"}
        placeholder="Chọn chi nhánh"
        onValueChange={onBranchChange}
        selectList={branches}
      />
    </>
  )
}
