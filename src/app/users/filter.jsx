import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { USER_ROLE } from "constants/user-roles"
import { transformToSelectList } from "lib/transofrm"
import { useEffect, useState } from "react"
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchStoreSimpleList } from "actions/storeActions"

export default function UserFilter({ authUser, filter, onFieldChange }) {
  const [companyList, setCompanyList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [storeList, setStoreList] = useState([])

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

  const getStoreList = async (value) => {
    const response = await fetchStoreSimpleList({ branchId: value })
    if (response.status === 200) {
      const storeList = response.data
      setStoreList(storeList)
    }
  }

  useEffect(() => {
    const initialData = async () => {
      authUser.roles.includes(USER_ROLE.ADMIN) && getCompanyList()
      authUser.roles.includes(USER_ROLE.COMPANY) && getBranchList()
      authUser.roles.includes(USER_ROLE.BRANCH) && getStoreList()
    }
    initialData()
  }, [authUser.roles])

  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [stores, setStores] = useState([])

  const onCompanyChange = async (value, name) => {
    if (filter.companyId !== value) {
      onFieldChange(value, name)
      onFieldChange(undefined, "branchId")

      const brList = value
        ? branchList.filter((x) => x.companyId === value)
        : branchList
      const selectList = transformToSelectList(brList)
      setBranches(selectList)

      onBranchChange(undefined, "branchId")
    }
  }

  const onBranchChange = (value, name) => {
    if (filter.branchId !== value) {
      onFieldChange(value, name)
      onFieldChange(undefined, "storeId")

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
