import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { USER_ROLE } from "constants/user-roles"
import { transformToSelectList } from "lib/transofrm"
import { useEffect, useState } from "react"

export default function UserFilter({ authUser, filter, onFieldChange, initExtra }) {
  const {companyList, branchList, storeList} = initExtra
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [stores, setStores] = useState([])

  const onCompanyChange = async (value, name) => {
    if (filter.companyId !== value) {
      onFieldChange(value, name)
      onFieldChange(null, "branchId")

      const brList = value
        ? branchList.filter((x) => x.companyId === value)
        : branchList
      const selectList = transformToSelectList(brList)
      setBranches(selectList)

      onBranchChange(null, "branchId")
    }
  }

  const onBranchChange = (value, name) => {
    if (filter.branchId !== value) {
      onFieldChange(value, name)
      onFieldChange(null, "storeId")

      const stList = value
        ? storeList.filter((x) => x.branchId === value)
        : storeList
      const selectList = transformToSelectList(stList)
      setStores(selectList)
    }
  }

  const onStoreChange = (value, name) => {
    if (filter.storeId !== value) onFieldChange(value, name)
  }

  useEffect(() => {
    const selectList = transformToSelectList(companyList)
    setCompanies(selectList)
  }, [companyList])

  useEffect(() => {
    const selectList = transformToSelectList(branchList)
    setBranches(selectList)
  }, [branchList])

  useEffect(() => {
    const selectList = transformToSelectList(storeList)
    setStores(selectList)
  }, [storeList])

  return (
    <>
      <DatePickerWithRange
        className={"sm:col-span-2"}
        name={"createdAt"}
        label="Ngày tạo:"
        date={filter.createdAt}
        placeholder="Chọn ngày"
        onChangeValue={onFieldChange}
      />
      {authUser.roles.includes(USER_ROLE.ADMIN) && <FilterSelect
        name="companyId"
        value={filter.companyId}
        label={"Công ty:"}
        placeholder="Chọn công ty"
        onValueChange={onCompanyChange}
        selectList={companies}
      />}
      {authUser.roles.includes(USER_ROLE.COMPANY) && <FilterSelect
        name="branchId"
        value={filter.branchId}
        label={"Chi nhánh:"}
        placeholder="Chọn chi nhánh"
        onValueChange={onBranchChange}
        selectList={branches}
      />}
      {authUser.roles.includes(USER_ROLE.BRANCH) && <FilterSelect
        name="storeId"
        value={filter.storeId}
        label={"Cửa hàng:"}
        placeholder="Chọn cửa hàng"
        onValueChange={onStoreChange}
        selectList={stores}
      />}
    </>
  )
}
