import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { transformToSelectList } from "lib/transofrm"
import { useEffect, useState } from "react"
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { USER_ROLE } from "constants/user-roles"

export default function InvoiceFilter({ authUser, filter, onFieldChange }) {
  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])

  const getCompanyList = async (value) => {
    const response = await fetchCompanySimpleList({ companyId: value })
    if (response.status === 200) {
      const resData = response.data
      setCompanyList(resData)
    }
  }

  const getBranchList = async (value) => {
    const response = await fetchBranchSimpleList({ companyId: value })
    if (response.status === 200) {
      const branchList = response.data
      setBranchList(branchList)
    }
  }

  useEffect(() => {
    const initialData = async () => {
      authUser.roles.includes(USER_ROLE.ADMIN) && getCompanyList()
      authUser.roles.includes(USER_ROLE.COMPANY) && getBranchList()
    }
    initialData()
  }, [authUser.roles])

  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])

  const onCompanyChange = async (value, name) => {
    if (filter.companyId !== value){
      onFieldChange(value, name)
      onFieldChange(undefined, 'branchId')

      const brList = value ? branchList.filter(x => x.companyId === value) : branchList
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
