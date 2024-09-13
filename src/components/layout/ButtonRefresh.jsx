import { Button } from "components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "components/ui/select"
import { cn } from "lib/utils"
import { RotateCw } from "lucide-react"
import { useRef, useState } from "react"

const REFRESH_OPTIONS = {
  REFRESH: "refresh",
  AUTO_REFRESH: "auto_refresh",
}

const refreshList = [
  { id: 0, label: "Làm mới", value: REFRESH_OPTIONS.REFRESH },
  { id: 1, label: "Tự động làm mới", value: REFRESH_OPTIONS.AUTO_REFRESH },
]

export default function ButtonRefresh({ applyFilter }) {
  const [refreshOption, setRefreshOption] = useState(refreshList[0])
  const [isAuto, setIsAuto] = useState(false)
  const autoRef = useRef()

  const onValueChange = (value) => {
    setRefreshOption(value)

    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
      setIsAuto(false)
    } else toggleRefresh(value)
  }

  const toggleRefresh = (option) => {
    let newAuto = isAuto
    const newRefreshOption = option ?? refreshOption

    if (newRefreshOption.value === REFRESH_OPTIONS.AUTO_REFRESH) {
      newAuto = !newAuto
      setIsAuto(newAuto)
    } else applyFilter()

    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }

    if (newAuto) {
      applyFilter()
      autoRef.current = setInterval(() => {
        applyFilter()
      }, 1000)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="gap-1 pr-10 max-sm:pl-2 max-sm:py-1 max-sm:h-8"
        onClick={() => toggleRefresh()}
      >
        <RotateCw size={16} className={cn(isAuto ? "animate-spin" : "")} />
        <span className="">{refreshOption.label}</span>
      </Button>

      <div className="absolute top-0 right-0">
        <Select
          onValueChange={onValueChange}
          defaultValue={refreshOption.value}
        >
          <SelectTrigger className="rounded-l-none px-2 max-sm:py-1 max-sm:text-xs max-sm:h-8 max-sm:w-fit"></SelectTrigger>
          <SelectContent>
            {refreshList.map((refreshOption) => (
              <SelectItem key={refreshOption.value} value={refreshOption}>
                {refreshOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
