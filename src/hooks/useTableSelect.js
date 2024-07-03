import { useCallback, useEffect, useState } from "react"

export default function useTableSelect({ data, meta }) {
  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

  useEffect(() => {}, [data])

  const onHeaderChecked = useCallback(() => {
    if (selected === "all") {
      setSelected(unselected.length > 0 ? "all" : [])
      setUnselected([])
    } else {
      setSelected("all")
      setUnselected([])
    }
  }, [selected, unselected])

  const onRowChecked = useCallback(
    (value, rowValue) => {
      if (selected === "all") {
        setUnselected(prev => 
          value
            ? prev.filter((item) => item !== rowValue.id)
            : [...prev, rowValue.id]
        )
      } else {
        setSelected(prev =>
          value
            ? [...prev, rowValue.id]
            : prev.filter((item) => item !== rowValue.id)
        )
      }
    },
    [selected]
  )

  return { selected, unselected, onHeaderChecked, onRowChecked }
}
