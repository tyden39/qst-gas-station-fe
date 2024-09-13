import PagePaginationCapacity from "./capacity"
import PagePaginationNavigation from "./navigation"
import PagePaginationNavigationMobile from "./navigation-mobile"

export default function PagePagination({ meta, metaFeedback, setMeta, selected, unselected }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-2 border-t max-sm:px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        <PagePaginationCapacity {...{ ...meta, ...metaFeedback, setMeta, selected, unselected }} />
      </div>
      <div className="flex-1 text-sm text-muted-foreground sm:hidden">
        <PagePaginationNavigationMobile {...{
            totalPages: metaFeedback.totalPages,
            currentPage: meta.currentPage,
            setMeta,
          }} />
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
