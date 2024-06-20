import { ChevronDown, Loader2, Search } from "lucide-react"

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
  initFilter,
  filter,
  onFieldChange,
  activedFilter,
  applyFilter,
  loading,
  canSubmit,
  searchInputPlaceholder,
}) {
  const [showMoreFilter, setShowMoreFilter] = useState(false)
  const debounceRef = useRef(null)

  const canResetFilter = JSON.stringify(activedFilter) !== JSON.stringify(initFilter)

  const resetFilter = () => {
    applyFilter(initFilter)
  }

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
          <div className="relative">
            <Search size={16} className="absolute top-3 left-2 text-gray-500" />
            <Input
              name="keyword"
              placeholder={searchInputPlaceholder}
              value={filter.keyword ?? ""}
              onChange={handleChangeKeyword}
              className="w-[260px] pl-7"
            />
          </div>
          {children && <Button onClick={() => setShowMoreFilter((prev) => !prev)}>
            Bộ lọc khác
          </Button>}
          {showMoreFilter && (
            <>
              <Button
                disabled={loading || !canSubmit}
                onClick={() => applyFilter()}
                className="w-24"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Áp dụng"
                )}
              </Button>
              {canResetFilter && <Button variant="link" className="text-sm" onClick={resetFilter}>Đặt lại mặc định</Button>}
            </>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Ẩn/Hiện <ChevronDown className="ml-2 h-4 w-4" />
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
                    {column.columnDef.header()}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        style={{ maxHeight: showMoreFilter ? "50vh" : 0 }}
        className={cn(
          "grid grid-cols-4 gap-x-2 transition-[max-height,margin] duration-300 overflow-hidden", showMoreFilter ? 'mb-2' : 'mb-0'
        )}
      >
        {children}
      </div>
    </div>
  )
}
