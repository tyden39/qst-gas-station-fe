import { PaginationNext, PaginationPrevious } from "components/ui/pagination"
import PagePaginationCapacity from "./capacity"
import PagePaginationNavigation from "./navigation"
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function PagePagination({
  meta,
  metaFeedback,
  setMeta,
  selected,
  unselected,
}) {
  const [params] = useSearchParams()
  const [internalMobilePage, setInternalMobilePage] = useState(meta.currentPage)
  const onChangePage = (value) => {
    setMeta((prev) => ({ ...prev, currentPage: value }))
  }

  useEffect(() => {
    const queryCurrentPage = params.get("currentPage")
    setInternalMobilePage(queryCurrentPage)
  }, [params])

  return (
    <div className="flex max-sm:flex-col max-sm:gap-4 max-sm:px-4 items-center justify-end space-x-2 py-2 border-t max-sm:pb-6">
      <div className="w-full mt-4 flex gap-2 text-sm text-muted-foreground sm:hidden">
        <div className="text-sm text-muted-foreground sm:hidden">
          <PaginationPrevious
            disabled={meta.currentPage <= 1}
            onClick={() => onChangePage(meta.currentPage - 1)}
          />
        </div>
        <Input
          value={internalMobilePage}
          type="number"
          min={1}
          max={metaFeedback.totalPages}
          onChange={(event) => setInternalMobilePage(Math.min(+event.target.value, +metaFeedback.totalPages) || 1)}
          className="w-full"
        />
        <Button
          onClick={() => {
            onChangePage(internalMobilePage)
          }}
        >
          Đi
        </Button>
        <div className="text-sm text-muted-foreground sm:hidden">
          <PaginationNext
            disabled={meta.currentPage >= metaFeedback.totalPages}
            onClick={() => onChangePage(meta.currentPage + 1)}
          />
        </div>
      </div>
      <div className="flex-1 w-full text-sm text-muted-foreground">
        <PagePaginationCapacity
          {...{ ...meta, ...metaFeedback, setMeta, selected, unselected }}
        />
      </div>
      <div className="space-x-2 max-sm:hidden">
        <PagePaginationNavigation
          {...{
            totalPages: metaFeedback.totalPages,
            currentPage: meta.currentPage,
            setMeta,
          }}
        />
      </div>
    </div>
  )
}
