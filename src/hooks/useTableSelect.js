import { useCallback, useEffect, useState } from "react"

export default function useTableSelect({data, meta}) {
  const [selected, setSelected] = useState([])
  const [currentPageSelected, setCurrentPageSelected] = useState([])

  useEffect(() => {
    if (
      data.length > 0 &&
      currentPageSelected.length > 0 &&
      !data.map((item) => item.id).includes(currentPageSelected[0])
    ) {
      setCurrentPageSelected([])
    }
  }, [data, currentPageSelected])

  const onHeaderChecked = useCallback(() => {
    const value =
      selected.length > 0 &&
      (selected.length === meta.totalItems || "indeterminate")
    let newSelected = []
    if (value === "indeterminate") {
      if ((currentPageSelected.length ?? 0) < meta.pageSize) {
        newSelected = selected.filter(
          (item) => !data.map((i) => i.id).includes(item)
        )
        newSelected = [...newSelected, ...data.map((item) => item.id)]
        setCurrentPageSelected(data.map((item) => item.id))
      } else {
        newSelected = selected.filter(
          (item) => !data.map((i) => i.id).includes(item)
        )
        setCurrentPageSelected([])
      }
    } else if (value) {
      newSelected = selected.filter(
        (item) => !data.map((i) => i.id).includes(item)
      )
      setCurrentPageSelected([])
    } else {
      setCurrentPageSelected(data.map((item) => item.id))
      newSelected = [...selected, ...data.map((item) => item.id)]
    }
    setSelected(newSelected)
  }, [currentPageSelected.length, data, meta.pageSize, meta.totalItems, selected])

  const onRowChecked = useCallback((value, rowValue) => {
    setSelected(
      value
        ? [...selected, rowValue.id]
        : selected.filter((item) => item !== rowValue.id)
    )
    setCurrentPageSelected((prev) =>
      value
        ? [...prev, rowValue.id]
        : prev.filter((item) => item !== rowValue.id)
    )
  }, [selected])

  return {selected, onHeaderChecked, onRowChecked}
}
