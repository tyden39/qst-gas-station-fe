import { FilterSelect } from "components/FilterSelect"
import { USER_ROLE } from "constants/user-roles"
import { transformToSelectList } from "lib/transofrm"
import { useEffect, useState } from "react"

export default function StructureFilter({
  authUser,
  filter,
  onFieldChange,
  initExtra,
  setFilter,
  setActivedFilter,
  applyFilter
}) {
  const { companyList, branchList, storeList } = initExtra

  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [stores, setStores] = useState([])

  const onCompanyChange = async (value, name) => {
    if (filter.companyId !== value) {
      const brList = value
        ? branchList.filter((x) => x.companyId === value)
        : branchList
      const stList = value
        ? storeList.filter((x) => x.companyId === value)
        : storeList
      setBranches(transformToSelectList(brList))
      setStores(transformToSelectList(stList))

      setFilter(prev => ({ ...prev, companyId: value, branchId: null, storeId: null }))
      setActivedFilter(prev => ({ ...prev, companyId: value, branchId: null, storeId: null }))
      applyFilter({ forceFilter: {...filter, companyId: value, branchId: null, storeId: null} })
    }
  }

  const onBranchChange = (value, name) => {
    if (filter.branchId !== value) {
      const stList = value
        ? storeList.filter((x) => x.branchId === value)
        : storeList
      const selectList = transformToSelectList(stList)
      setStores(selectList)
      setFilter(prev => ({ ...prev, branchId: value, storeId: null }))
      setActivedFilter(prev => ({ ...prev, branchId: value, storeId: null }))
      applyFilter({ forceFilter: {branchId: value, storeId: null}})
    }
  }

  const onStoreChange = (value, name) => {
    if (filter.storeId !== value) {
      onFieldChange(value, name)
      setFilter(prev => ({ ...prev, storeId: value }))
      setActivedFilter(prev => ({ ...prev, storeId: value }))
      applyFilter({ forceFilter: { storeId: value }})
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

  useEffect(() => {
    const selectList = transformToSelectList(storeList)
    setStores(selectList)
  }, [storeList])

  return (
    <>
      {authUser.roles.includes(USER_ROLE.ADMIN) && (
        <FilterSelect
          name="companyId"
          value={filter.companyId}
          label={"Công ty:"}
          placeholder="Chọn công ty"
          onValueChange={onCompanyChange}
          selectList={companies}
        />
      )}
      {authUser.roles.includes(USER_ROLE.COMPANY) && (
        <FilterSelect
          name="branchId"
          value={filter.branchId}
          label={"Chi nhánh:"}
          placeholder="Chọn chi nhánh"
          onValueChange={onBranchChange}
          selectList={branches}
        />
      )}
      {authUser.roles.includes(USER_ROLE.BRANCH) && (
        <FilterSelect
          name="storeId"
          value={filter.storeId}
          label={"Cửa hàng:"}
          placeholder="Chọn cửa hàng"
          onValueChange={onStoreChange}
          selectList={stores}
        />
      )}
    </>
  )
}
