import { FilterSelect } from "components/FilterSelect"
import { DatePickerWithRange } from "components/ui/datepicker"
import { useEffect, useState } from "react"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { USER_ROLE } from "constants/user-roles"
import { transformToSelectList } from "lib/transofrm"

export default function BranchFilter({ authUser, filter, onFieldChange }) {
  const [companyList, setCompanyList] = useState([])

  const getCompanyList = async (value) => {
    const response = await fetchCompanySimpleList({ companyId: value })
    if (response && response.status === 200) {
      const resData = response.data

      const selectList = transformToSelectList(resData)
      setCompanyList(selectList)
    }
  }

  useEffect(() => {
    const initialData = async () => {
      authUser.roles.includes(USER_ROLE.ADMIN) && getCompanyList()
    }
    initialData()
  }, [authUser.roles])

  return (
    <>
      <DatePickerWithRange
        className={"sm:col-span-2"}
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
