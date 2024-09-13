import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  ShadCNPagination,
} from "components/ui/pagination"

export default function PagePaginationNavigation({
  totalPages,
  currentPage,
  setMeta,
}) {
  const maxAvailablePages = 5
  const availablePages =
    totalPages <= maxAvailablePages + 2
      ? Array.from({ length: totalPages }, (v, i) => i + 1)
      : [1, 2, 3].includes(currentPage)
      ? [1, 2, 3, 4, 5]
      : [totalPages, totalPages - 1, totalPages - 2].includes(currentPage)
      ? [
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ]
      : [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ]

  const onChangePage = (value) => {
    setMeta((prev) => ({ ...prev, currentPage: value }))
  }

  return (
    <ShadCNPagination>
      <PaginationContent className="max-sm:flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            onClick={() => onChangePage(currentPage - 1)}
          />
        </PaginationItem>
        {totalPages > maxAvailablePages + 2 && (
          <>
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onChangePage(1)}
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 4 && (
              <PaginationItem className="opacity-50">
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {availablePages.map((item) => (
          <PaginationItem key={`pagination-${item}`}>
            <PaginationLink
              isActive={currentPage === item}
              onClick={() => onChangePage(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > maxAvailablePages + 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <PaginationItem className="opacity-50">
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onChangePage(totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => onChangePage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadCNPagination>
  )
}
