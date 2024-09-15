import { Filter, Search, X } from "lucide-react"
import { PopoverClose } from "@radix-ui/react-popover"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { cn } from "lib/utils"
import { useCallback, useRef, useState } from "react"

export default function PageFilter({
  onFieldChange,
  authUser,
  filter,
  activedFilter,
  setFilter,
  applyFilter,
  initFilter,
  initExtra,
  searchInputPlaceholder,
  additionalFilter,
  filtersNotCount = [],
  resetData
}) {
  const [openPopover, setOpenPopover] = useState()
  const onPopoverChange = (open) => {
    setOpenPopover(open)
    if (open)
      setFilter((prev) => ({ ...prev, ...initFilter, ...activedFilter }))
  }

  function countActiveFilters(filter, activedFilter) {
    let activeFilterCount = 0
    const filterWithoutKeyword = { ...filter }
    const activedFilterWithourKeyword = { ...activedFilter }

    const keysToDelete = [...filtersNotCount, "keyword"]
    keysToDelete.forEach((key) => {
      delete filterWithoutKeyword[key]
      delete activedFilterWithourKeyword[key]
    })

    for (let key in activedFilterWithourKeyword) {
      if (
        !filterWithoutKeyword.hasOwnProperty(key) ||
        filterWithoutKeyword[key] !== activedFilterWithourKeyword[key]
      ) {
        activeFilterCount++
      }
    }

    return activeFilterCount
  }

  const activedFiltersCount = countActiveFilters(initFilter, activedFilter)

  const debounceRef = useRef(null)
  const debouncedSubmit = useCallback(
    (value) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        setFilter(prev => ({ ...prev, keyword: value }))
        applyFilter({forceFilter: {keyword: value}})
      }, 300)
    },
    [setFilter, applyFilter]
  )

  const handleChangeKeyword = (e) => {
    const val = e.target.value
    debouncedSubmit(val)
  }

  const resetFilter = () => {
    resetData()
  }

  return (
    <>
      <div
        className={cn(
          "w-[320px] transition-[max-height,margin] duration-200 delay-0 overflow-hidden"
        )}
      >
        <div className="relative">
          <Search size={16} className="absolute top-3 left-3 text-gray-500" />
          <Input
            name="keyword"
            placeholder={searchInputPlaceholder}
            // value={filter.keyword ?? ""}
            onChange={handleChangeKeyword}
            className="pl-8"
          />
        </div>
      </div>
      {additionalFilter ? (
        <div className="flex items-center gap-2">
          <Popover {...{ open: openPopover, onOpenChange: onPopoverChange }}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative gap-2 max-sm:h-10 max-sm:px-4">
                {activedFilter && activedFiltersCount > 0 ? (
                  <Badge
                    variant="destructive"
                    className={
                      "absolute -top-1.5 -right-1.5 text-[10px] leading-none px-1"
                    }
                  >
                    {activedFiltersCount}
                  </Badge>
                ) : null}
                <Filter className="w-4 h-4" />
                Lọc
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[560px] max-sm:w-screen p-5">
              <div className="grid gap-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium leading-none text-xl">
                    Lọc hóa đơn
                  </h4>
                  <PopoverClose className="">
                    <X className="w-4 h-4" />
                  </PopoverClose>
                </div>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-2 gap-y-3">
                  {additionalFilter
                    ? additionalFilter({
                        authUser,
                        filter,
                        onFieldChange,
                        initExtra,
                      })
                    : null}
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <PopoverClose className="" asChild>
                    <Button
                      variant="link"
                      className="hover:no-underline"
                      onClick={resetFilter}
                    >
                      Bộ lọc mặt định
                    </Button>
                  </PopoverClose>
                  <PopoverClose className="" asChild>
                    <Button onClick={applyFilter}>Lọc</Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {activedFilter && activedFiltersCount > 0 ? (
            <Button
              variant="ghost"
              className="text-primary hover:text-destructive hover:bg-destructive-foreground"
              onClick={resetFilter}
            >
              Xóa bộ lọc
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
