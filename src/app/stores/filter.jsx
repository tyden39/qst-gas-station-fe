import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { transformToSelectList } from "lib/transofrm"
import { useEffect, useState } from "react"

export default function StoreFilter({ onFieldChange, companyList, branchList }) {
  
  const [companyId, setCompanyId] = useState("all")
  const [branchId, setBranchId] = useState("all")
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])

  const onCompanyChange = async (value, name) => {
    onFieldChange(value, name)
    if (companyId !== value){
      setCompanyId(value)
      setBranchId('all')
      onFieldChange('all', 'branchId')

      const brList = value === 'all' ? branchList : branchList.filter(x => x.companyId === value)
      const selectList = transformToSelectList(brList)
      selectList.unshift({id: -1, value: "all", label: "Tất cả"})
      setBranches(selectList)

      onBranchChange('all', 'branchId')
    }
  }

  const onBranchChange = (value, name) => {
    onFieldChange(value, name)
    if (branchId !== value){
      setBranchId(value)
    }
  }

  useEffect(() => {
    const selectList = transformToSelectList(companyList)
    selectList.unshift({id: -1, value: "all", label: "Tất cả"})
    setCompanies(selectList)
  }, [companyList])

  useEffect(() => {
    const selectList = transformToSelectList(branchList)
    selectList.unshift({id: -1, value: "all", label: "Tất cả"})
    setBranches(selectList)
  }, [branchList])

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
        value={companyId}
        label={"Công ty:"}
        placeholder="Chọn công ty"
        onValueChange={onCompanyChange}
        selectList={companies}
      />
      <FilterSelect
        name="branchId"
        value={branchId}
        label={"Chi nhánh:"}
        placeholder="Chọn chi nhánh"
        onValueChange={onBranchChange}
        selectList={branches}
      />
    </>
  )
}
