import { TOAST } from "components/ui/toast"
import { useToast } from "components/ui/use-toast"
import { useCallback, useEffect, useState } from "react"

export default function useFilter({initFilter, initMeta, action}) {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(initMeta)
  const [filter, setFilter] = useState(initFilter)
  const [loading, setLoading] = useState(false)

  const applyFilter = useCallback(
    (filter, meta) => {
      action(filter, meta)
        .then((response) => {
          const { data, meta } = response.data
          setMeta(meta)
          setData(data)
        })
        .catch((error) =>
          toast({
            variant: TOAST.DESTRUCTIVE,
            title: "Lấy danh sách thất bại!",
            description: error.message,
          })
        )
    },
    [action, toast]
  )

  useEffect(() => {
    if (loading) setLoading(false)

    const currMeta = {
      currentPage: meta.currentPage,
      pageSize: meta.pageSize,
    }

    applyFilter(filter, currMeta)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.currentPage, meta.pageSize, filter, loading])

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
    applyFilter(filter, currMeta)
  }, [filter, meta, applyFilter])

  return {
    loading,
    filter,
    meta,
    data,
    onFieldChange,
    setFilter,
    setMeta,
    refreshData
  }
}
