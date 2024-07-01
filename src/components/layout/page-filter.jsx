import { ChevronDown, ChevronUp, Search } from "lucide-react"

import { Card } from "components/ui/card"
import { Input } from "components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip"
import { cn } from "lib/utils"
import { useCallback, useRef, useState } from "react"

export default function PageFilter({
  children,
  setFilter,
  availableFilterColumn = 1,
  searchInputPlaceholder,
}) {
  const [showMoreFilter, setShowMoreFilter] = useState(false)

  const debounceRef = useRef(null)
  const debouncedSubmit = useCallback(
    (value) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        setFilter(prev => ({ ...prev, keyword: value }))
      }, 300)
    },
    [setFilter]
  )

  const handleChangeKeyword = (e) => {
    const val = e.target.value
    debouncedSubmit(val)
  }

  return (
    <Card className="relative mb-4 mt-4 bg-white px-12 pt-7 pb-12 overflow-hidden">
      <h2 className="mb-2.5 font-medium">Tìm kiếm</h2>

      <div
        style={{ maxHeight: showMoreFilter ? "100vh" : `${availableFilterColumn * 40 + (availableFilterColumn - 1) * 20 }px` }}
        className={cn(
          "grid grid-cols-2 gap-y-5 gap-x-6 transition-[max-height,margin] duration-200 delay-0 overflow-hidden"
        )}
      >
        <div className="relative col-span-2">
          <Search size={16} className="absolute top-3 left-3 text-gray-500" />
          <Input
            name="keyword"
            placeholder={searchInputPlaceholder}
            // value={filter.keyword ?? ""}
            onChange={handleChangeKeyword}
            className="pl-8"
          />
        </div>
        {children}
      </div>

      {children ? <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="absolute left-0 bottom-0 w-full flex justify-center items-center p-2.5 transition-colors hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_20%,rgba(0,49,92,0.05)_70%,rgba(0,49,92,0.1)_100%)] cursor-pointer"
            onClick={() => setShowMoreFilter((prev) => !prev)}
          >
            {showMoreFilter ? <ChevronUp className="stroke-muted-foreground" /> : <ChevronDown className="stroke-muted-foreground" />}
          </div>
        </TooltipTrigger>
        <TooltipContent>{showMoreFilter ? 'Ẩn bớt' : 'Hiện thêm' }</TooltipContent>
      </Tooltip> : null}
    </Card>
  )
}
