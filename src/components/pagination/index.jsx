import PagePaginationCapacity from "./capacity"
import PagePaginationNavigation from "./navigation"

export default function PagePagination({ meta, setMeta, selected }) {
  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <div className="flex-1 text-sm text-muted-foreground">
        <PagePaginationCapacity {...{ ...meta, setMeta, selected }} />
      </div>
      <div className="space-x-2">
        <PagePaginationNavigation
          {...{
            totalPages: meta.totalPages,
            currentPage: meta.currentPage,
            setMeta,
          }}
        />
      </div>
    </div>
  )
}
