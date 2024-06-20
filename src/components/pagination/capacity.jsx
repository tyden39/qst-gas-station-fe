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
}) {
  const startItem = (currentPage - 1) * pageSize
  const endItem = Math.min(startItem + pageSize, totalItems)

  return (
    <div className="flex items-center gap-2">
      {selected && selected.length > 0 ? (
        <span className="pl-2">{`Chọn ${selected.length} trong số ${totalItems} dòng`}</span>
      ) : (
        <span className="pl-2">
          {startItem + 1} - {endItem} trong số {totalItems} dòng
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
        <SelectTrigger className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={10}>10 dòng/trang</SelectItem>
            <SelectItem value={20}>20 dòng/trang</SelectItem>
            <SelectItem value={50}>50 dòng/trang</SelectItem>
            <SelectItem value={100}>100 dòng/trang</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
