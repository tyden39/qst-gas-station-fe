import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"
import { initFilter } from "./initial"
import { useEffect, useState } from "react"
import { transformToSelectList } from "lib/transofrm"

export default function InvoiceFilter({ filter, onFieldChange, companyList, branchList, storeList }) {
  
  const [companyId, setCompanyId] = useState("all")
  const [branchId, setBranchId] = useState("all")
  const [storeId, setStoreId] = useState("all")
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [stores, setStores] = useState([])

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
      setStoreId('all')
      onFieldChange('all', 'storeId')

      const stList = value === 'all' ? storeList : storeList.filter(x => x.branchId === value)
      const selectList = transformToSelectList(stList)
      selectList.unshift({id: -1, value: "all", label: "Tất cả"})
      setStores(selectList)
    }
  }

  const onStoreChange = (value, name) => {
    onFieldChange(value, name)
    if (storeId !== value) setStoreId(value)
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

  useEffect(() => {
    const selectList = transformToSelectList(storeList)
    selectList.unshift({id: -1, value: "all", label: "Tất cả"})
    setStores(selectList)
  }, [storeList])

  return (
    <>
      <DatePickerWithRange
        name={"billDate"}
        label='Thời gian ghi log:'
        defaultValue={initFilter.billDate}
        onChangeValue={onFieldChange}
      />
      <FilterSelect
        name="billType"
        value={filter?.billType}
        label={"Loại hóa đơn:"}
        onValueChange={onFieldChange}
        selectList={BILL_TYPES}
      />
      <FilterSelect
        name="fuelType"
        label={"Loại nhiên liệu:"}
        value={filter?.fuelType}
        onValueChange={onFieldChange}
        selectList={FUEL_TYPE}
      />
      <FilterSelect
        name="pumpId"
        label={"Mã vòi bơm:"}
        value={filter?.pumpId}
        onValueChange={onFieldChange}
        selectList={PUMP_ID}
        className={"mb-2"}
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
      <FilterSelect
        name="storeId"
        value={storeId}
        label={"Cửa hàng:"}
        placeholder="Chọn cửa hàng"
        onValueChange={onStoreChange}
        selectList={stores}
      />
    </>
  )
}
