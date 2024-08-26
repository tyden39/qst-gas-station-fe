import { flexRender } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import { cn } from "lib/utils"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

export default function PageTable({ table, loading }) {
  const columns = table.getVisibleLeafColumns()

  return (
    <Table className="relative bg-white">
      <TableHeader className="sticky top-0 z-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-none">
            {headerGroup.headers.map((header) => {
              const colAlign = header.column.columnDef.align ?? "center"
              return (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                  className={cn(
                    "group",
                    header.column.getCanSort() ? "cursor-pointer" : "",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-1.5",
                      colAlign !== "left"
                        ? colAlign === "right"
                          ? "justify-end text-right"
                          : "justify-center text-center"
                        : ""
                    )}
                  >
                    <span className="relative">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort()
                        ? {
                            asc: (
                              <ChevronDown
                                className={cn("absolute top-1/2 left-full -translate-y-1/2 shrink-0 w-4 h-4")}
                              />
                            ),
                            desc: (
                              <ChevronUp className={cn("absolute top-1/2 left-full -translate-y-1/2 shrink-0 w-4 h-4")} />
                            ),
                          }[header.column.getIsSorted()] ?? (
                            <ChevronsUpDown
                              className={cn("absolute top-1/2 left-full -translate-y-1/2 shrink-0 w-4 h-4 hidden group-hover:block")}
                            />
                          )
                        : null}
                    </span>
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className={cn(loading ? "opacity-50" : "opacity-100")}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="border-l-0"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="w-full h-24 text-center"
            >
              Không tìm thấy dữ liệu.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
