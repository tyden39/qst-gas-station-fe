import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"

export default function PagePaginationNavigationMobile({
  totalPages,
  currentPage,
  setMeta,
}) {
  const onChangePage = (value) => {
    setMeta((prev) => ({ ...prev, currentPage: value }))
  }

  return (
    <Select defaultValue={currentPage} onValueChange={onChangePage}>
      <SelectTrigger className="w-[150px] max-sm:w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: totalPages }, (v, i) => i + 1).map((item) => (
            <SelectItem key={`mobile-pagination-item-${item}`} value={item}>Trang {item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
