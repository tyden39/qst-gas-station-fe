import { ChevronDown } from "lucide-react"

import { Button } from "components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { Input } from "components/ui/input"
import { cn } from "lib/utils"
import { useCallback, useRef, useState } from "react"

export default function PageHeader({
  children,
  table,
  filter,
  onFieldChange,
  applyFilter,
  loading,
  canSubmit,
  searchInputPlaceholder
}) {
  const [showMoreFilter, setShowMoreFilter] = useState(false)
  const debounceRef = useRef(null)

  const debouncedSubmit = useCallback(
    (value) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        applyFilter({ keyword: value })
      }, 300)
    },
    [applyFilter]
  )

  const handleChangeKeyword = (e) => {
    const val = e.target.value
    onFieldChange(val, "keyword")
    debouncedSubmit(val)
  }

  return (
    <div className="mb-2 mt-4 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex gap-2">
          <Input
            name="keyword"
            placeholder={searchInputPlaceholder}
            value={filter.keyword ?? ""}
            onChange={handleChangeKeyword}
            className="w-[260px]"
          />
          <Button onClick={() => setShowMoreFilter((prev) => !prev)}>
            Bộ lọc khác
          </Button>
          {showMoreFilter && (
            <Button disabled={loading || !canSubmit} onClick={() => applyFilter()}>Áp dụng</Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{ maxHeight: showMoreFilter ? "50vh" : 0 }}
        className={cn(
          "grid grid-cols-4 gap-2 transition-[max-height] duration-300 overflow-hidden"
        )}
      >
        {children}
      </div>
    </div>
  )
}
