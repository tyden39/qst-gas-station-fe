
import { fetchSimpleList as fetchBranchSimpleList } from "actions/branchActions"
import { fetchSimpleList as fetchCompanySimpleList } from "actions/companyActions"
import { fetchSimpleList as fetchStoreSimpleList } from "actions/storeActions"
import { USER_ROLE } from "constants/user-roles"
import { useEffect, useState } from "react"
import useAuth from "zustands/useAuth"

export default function useInitStructure(disableBranch, disableStore) {
  const authUser = useAuth(state => state.user)
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
      authUser.roles.includes(USER_ROLE.COMPANY) && !disableBranch && getBranchList()
      authUser.roles.includes(USER_ROLE.BRANCH) && !disableStore && getStoreList()
    }
    initialData()
  }, [authUser.roles, disableBranch, disableStore])

  return {
    companyList, branchList, storeList
  }
}