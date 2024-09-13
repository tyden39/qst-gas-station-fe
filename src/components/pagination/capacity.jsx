import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"

export default function PagePaginationCapacity({
  totalItems,
  currentPage,
  pageSize,
  setMeta,
  selected,
  unselected,
}) {
  const startItem = totalItems - (currentPage - 1) * pageSize
  const endItem = Math.max(startItem - pageSize + 1, 1)
  const selectedNumber = Array.isArray(selected)
    ? selected.length
    : unselected.length > 0
    ? totalItems - unselected.length
    : totalItems

  return (
    <div className="flex items-center gap-2 w-full max-sm:grid max-sm:grid-cols-1">
      {selectedNumber > 0 ? (
        <span className="pl-2 max-sm:hidden">{`Chọn ${selectedNumber} trong số ${totalItems} dòng`}</span>
      ) : (
        <span className="pl-2 max-sm:hidden">
          {startItem} - {endItem} trong số {totalItems} dòng
        </span>
      )}

      <Select
        defaultValue={pageSize}
        onValueChange={(value) => {
          const newPage =
            value * currentPage > totalItems
              ? Math.ceil(totalItems / value)
              : currentPage
          setMeta((prev) => ({
            ...prev,
            pageSize: value,
            currentPage: newPage,
          }))
        }}
      >
        <SelectTrigger className="w-[150px] max-sm:w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={10}>
              <span className="">10 dòng/trang</span>
            </SelectItem>
            <SelectItem value={20}>
              <span className="">20 dòng/trang</span>
            </SelectItem>
            <SelectItem value={50}>
              <span className="">50 dòng/trang</span>
            </SelectItem>
            <SelectItem value={100}>
              <span className="">100 dòng/trang</span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
