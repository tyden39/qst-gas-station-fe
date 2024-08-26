import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function useFilter({
  initFilter,
  initMeta,
  action,
  autoRefresh,
  refreshDelay = 5000,
  sorting,
}) {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)
  const [filter, setFilter] = useState(initFilter)
  const [activedFilter, setActivedFilter] = useState(initFilter)
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()

  const applyFilter = useCallback(
    ({newFilter, newMeta}) => {
      setLoading(true)
      action({...filter, ...newFilter}, { ...meta, ...newMeta }, sorting).then(
        (response) => {
          if (response.status === 200) {
            const { data, meta } = response.data
            setMeta(meta)
            setData(data)
            setFilter({...filter, ...newFilter})

            setActivedFilter({...filter, ...newFilter})

            const currMeta =  {...meta, ...newMeta}
            delete currMeta.totalItems
            delete currMeta.totalPages

            const truthyFilter = Object.fromEntries(
              Object.entries({...filter, ...newFilter, ...currMeta}).filter(([key, value]) => value)
            )
            if (Object.keys(truthyFilter).length !== 0)
              setSearchParams(truthyFilter)
          } else {
            toast({
              variant: TOAST.DESTRUCTIVE,
              title: "Lấy danh sách thất bại!",
              description: response.message,
            })
          }
        }
      ).finally(() => {
        setLoading(false)
        if (initLoading) setInitLoading(false)
      })
    },
    [action, toast, filter, meta, sorting, initLoading, setSearchParams]
  )

  useEffect(() => {
    const currMeta = {
      currentPage: meta.currentPage,
      pageSize: meta.pageSize,
    }

    const queryParams = {}

    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value
    }

    const newFilter = {...queryParams}
    delete newFilter.currentPage
    delete newFilter.pageSize

    const initFilter = searchParams.size > 0 ? {newFilter ,newMeta: currMeta} : {newMeta: currMeta}

    applyFilter(initFilter)

    // const interval = setInterval(() => {
    //   if (autoRefresh) applyFilter(filter, currMeta, sorting)
    // }, refreshDelay)

    // return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, meta.pageSize, sorting])

  const onFieldChange = useCallback(
    (value, name) =>
      setFilter((prev) => ({
        ...prev,
        [name]: value === "all" ? undefined : value,
      })),
    []
  )

  const refreshData = useCallback(() => {
    const currMeta = {
      currentPage: meta.currentPage,
      pageSize: meta.pageSize,
    }
    applyFilter({newFilter: filter, newMeta: currMeta})
  }, [filter, meta, applyFilter])

  return {
    loading,
    filter,
    activedFilter,
    meta,
    data,
    onFieldChange,
    setFilter,
    setMeta,
    refreshData,
    applyFilter,
    initLoading
  }
}
