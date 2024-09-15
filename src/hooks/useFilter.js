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
  setSorting,
}) {
  const { toast } = useToast()
  const [initRender, setInitRender] = useState(true)
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)
  const [metaFeedback, setMetaFeedback] = useState(initMeta)
  const [filter, setFilter] = useState(initFilter)
  const [activedFilter, setActivedFilter] = useState(initFilter)
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleRequest = useCallback(() => {
    setLoading(true)

    action(activedFilter, meta, sorting)
      .then((response) => {
        if (response.status === 200) {
          const { data, meta: metaFeedback } = response.data
          setData(data)
          setMetaFeedback(metaFeedback)

          const truthyFilter = Object.fromEntries(
            Object.entries({
              ...activedFilter,
              pageSize: metaFeedback.pageSize,
              currentPage: metaFeedback.currentPage,
              sortBy: sorting.length > 0 ? JSON.stringify(sorting) : undefined,
            }).filter(([key, value]) => value)
          )
          if (Object.keys(truthyFilter).length !== 0) setSearchParams(truthyFilter)
        } else {
          toast({
            variant: TOAST.DESTRUCTIVE,
            title: "Lấy danh sách thất bại!",
            description: response.message,
          })
        }
      })
      .finally(() => {
        setLoading(false)
        setInitLoading(false)
      })
  }, [action, toast, setSearchParams, sorting, activedFilter, meta])

  const applyFilter = useCallback(({forceFilter}) => {
    setActivedFilter({ ...filter, ...forceFilter })
    setMeta(prev => ({...prev, currentPage: 1}))
  }, [filter])

  useEffect(() => {
    if (!initRender) handleRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, activedFilter, meta.pageSize, meta.currentPage])

  useEffect(() => {
    const queryParams = {}

    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value
    }
    const queryMeta = Object.fromEntries(Object.entries({
      currentPage: Number(queryParams?.currentPage ?? ""),
      pageSize: Number(queryParams?.pageSize ?? ""),
    }).filter(([key, value]) => value))

    const querySorting = queryParams?.sortBy ? JSON.parse(queryParams?.sortBy) : []

    const queryFilter = { ...queryParams }
    delete queryFilter.currentPage
    delete queryFilter.pageSize
    delete queryFilter.sortBy

    setActivedFilter({ ...initFilter, ...queryFilter })
    setFilter({ ...initFilter, ...queryFilter })
    setMeta({ ...initMeta, ...queryMeta })
    setSorting(querySorting)
    setInitRender(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFieldChange = useCallback(
    (value, name) =>
      setFilter((prev) => ({
        ...prev,
        [name]: value === "all" ? undefined : value,
      })),
    []
  )

  const refreshData = useCallback(() => {
    applyFilter()
  }, [applyFilter])

  const resetData = useCallback(() => {
    setActivedFilter(initFilter)
    setFilter(initFilter)
  }, [initFilter])

  return {
    loading,
    filter,
    activedFilter,
    meta,
    data,
    setActivedFilter,
    onFieldChange,
    setFilter,
    setMeta,
    refreshData,
    applyFilter,
    initLoading,
    metaFeedback,
    resetData
  }
}
