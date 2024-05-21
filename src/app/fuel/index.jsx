import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import axiosInstance from "api/axiosInstance"
import { API_PATH } from "api/paths"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu"
import { Input } from "components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import { cn, convertToQueryString } from "lib/utils"
import moment from "moment"
import { useEffect, useState } from "react"
import { useAppNavigation } from "zustands/useAppNavigation"
import { DatePickerWithRange } from "components/ui/datepicker"
import { FormSelect } from "components/FormSelect"
import { addDays } from "date-fns"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Bill No</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "Logger_ID",
    header: () => <div className="text-center">Logger ID</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("Logger_ID")}</div>
    ),
  },
  {
    accessorKey: "Check_Key",
    header: () => <div className="text-center">Check Key</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("Check_Key")}</div>
    ),
  },
  {
    accessorKey: "Pump_ID",
    header: () => <div className="text-center">Pump ID</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("Pump_ID")}</div>
    ),
  },
  {
    accessorKey: "Bill_Type",
    header: () => <div className="">Bill Type</div>,
    cell: ({ row }) => <div className="">{row.getValue("Bill_Type")}</div>,
  },
  {
    accessorKey: "Logger_Time",
    header: () => <div className="text-center">Logger Time</div>,
    cell: ({ row }) => {
      const formatted = moment(row.getValue("Logger_Time")).format(
        "DD-MM-YYYY HH:mm:ss"
      )
      return <div className="text-center">{formatted}</div>
    },
  },
  {
    accessorKey: "Fuel_Type",
    header: () => <div className="text-center">Fuel Type</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("Fuel_Type")}</div>
    ),
  },
  {
    accessorKey: "Start_Time",
    header: () => <div className="text-center">Start Time</div>,
    cell: ({ row }) => {
      const formatted = moment(row.getValue("Start_Time")).format(
        "DD-MM-YYYY HH:mm:ss"
      )
      return <div className="text-center">{formatted}</div>
    },
  },
  {
    accessorKey: "End_Time",
    header: () => <div className="text-center">End Time</div>,
    cell: ({ row }) => {
      const formatted = moment(row.getValue("End_Time")).format(
        "DD-MM-YYYY HH:mm:ss"
      )
      return <div className="text-center">{formatted}</div>
    },
  },
  {
    accessorKey: "Unit_Price",
    header: () => <div className="text-right">Unit Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Unit_Price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "Quantity",
    header: () => <div className="text-right">Quantity</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("Quantity"))

      return <div className="text-right font-medium">{quantity}</div>
    },
  },
  {
    accessorKey: "Total_Price",
    header: () => <div className="text-right">Total Price</div>,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("Total_Price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]

export function FuelPage() {
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({
    totalItems: 31,
    totalPages: 4,
    currentPage: 4,
    pageSize: 10,
  })
  const [filter, setFilter] = useState({})
  const activedMenu = useAppNavigation((state) => state.activedMenu)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({
    Logger_ID: false,
    Check_Key: false,
    Bill_Type: false,
    Start_Time: false,
    End_Time: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  const fetchInvoices = async ({ filter, meta }) => {
    try {
      const startDate = new Date()
      const endDate = new Date()
      const params = {
        keyword: "",
        billType: 0,
        fuelType: "",
        pumpId: 0,
        startDate,
        endDate,
        pageSize: 10,
        page: 1,
      }
      const queries = convertToQueryString(params)
      const response = await axiosInstance.get(
        `${API_PATH.INVOICE_LIST}${queries ? "?" : ""}${queries}`
      )
      const { data, meta } = response.data.data
      return { data, meta }
    } catch (error) {}
  }

  useEffect(() => {
    fetchInvoices(filter, meta)
      .then(({ data, meta }) => {
        setMeta(meta)
        setData(data)
      })
      .catch((error) => console.log(error))
  }, [filter, meta])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const onFieldChange = (value, name) => setFilter(prev => ({...prev, [name]: value}))

  return (
    <div className="w-full">
      <h1 className="text-4xl leading-normal">{activedMenu.name}</h1>

      <TableFilter {...{ table, filter, onFieldChange }} />
      <PageTable {...{ table }} />
      <TablePagination {...{ table, meta, setMeta }} />
    </div>
  )
}

const PageTable = ({ table }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const TableFilter = ({ table, filter, onFieldChange }) => {
  const [showMoreFilter, setShowMoreFilter] = useState(false)
  console.log(filter)
  return (
    <div className="mb-2 mt-4 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex gap-2">
          <Input
            name
            placeholder="Tìm kiếm theo Bill No"
            value={filter.keyword ?? ""}
            onChange={(event) =>
              onFieldChange(event.target.value, 'keyword')
            }
            className="w-[260px]"
          />
          <Button onClick={() => setShowMoreFilter(prev => !prev)}>Bộ lọc khác</Button>
          {showMoreFilter && <Button onClick={() => setShowMoreFilter(prev => !prev)}>Áp dụng</Button>}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div style={{maxHeight: showMoreFilter ? '50vh' : 0}} className={cn("grid grid-cols-4 gap-2 transition-[max-height] duration-300 overflow-hidden")}>
        <DatePickerWithRange
          name={"billDate"}
          defaultValue={{from: new Date(2022, 0, 20), to: addDays(new Date(2022, 0, 20), 20)}} 
          onChangeValue={onFieldChange} 
        />
        <FormSelect name="billType" label={'Bill Type:'} onValueChange={onFieldChange} selectList={[1,2,3]} />
        <FormSelect name="fuelType" label={'Fuel Type:'} onValueChange={onFieldChange} selectList={[1,2,3]} />
        <FormSelect name="pumpId" label={'Pump ID:'} onValueChange={onFieldChange} selectList={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]} className={"mb-2"} />
      </div>
    </div>
  )
}

const TablePagination = ({ table, meta, setMeta }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        <TableCapacity {...{ table, ...meta, setMeta }} />
      </div>
      <div className="space-x-2">
        <TableNavigation {...{...meta, setMeta}} />
      </div>
    </div>
  )
}

const TableCapacity = ({
  table,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
}) => {
  const startItem = (currentPage - 1) * pageSize
  const endItem = Math.min(startItem + pageSize, totalItems)
  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected. */}
      <span>Số dòng mỗi trang </span>
      <Select defaultValue={pageSize}>
        <SelectTrigger className="w-[80px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={20}>20</SelectItem>
            <SelectItem value={50}>50</SelectItem>
            <SelectItem value={100}>100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span>
        {startItem + 1} - {endItem} trong số {totalItems} trang
      </span>
    </div>
  )
}

const TableNavigation = ({ totalItems, totalPages, currentPage, pageSize, setMeta }) => {
  const availablePages =
    totalPages < 3
      ? Array.from({ length: totalPages }, (v, i) => i + 1)
      : currentPage === 1
      ? [1, 2, 3]
      : currentPage === totalPages
      ? [totalPages - 2, totalPages - 1, totalPages]
      : [currentPage - 1, currentPage, currentPage + 1]

  const onChangePage = (value) => {
    setMeta(prev => ({...prev, currentPage: value}))
  }
      
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={currentPage <= 1} onClick={() => onChangePage(currentPage - 1)} />
        </PaginationItem>
        {currentPage > 2 && totalPages > 3 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onChangePage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage - 3 > 1 &&
              <PaginationItem className="opacity-50">
                <PaginationEllipsis />
              </PaginationItem>
            }
          </>
        )}
        {availablePages.map((item) => (
          <PaginationItem key={`pagination-${item}`}>
            <PaginationLink isActive={currentPage === item} onClick={() => onChangePage(item)}>
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <>
            {currentPage + 2 < totalPages && 
              <PaginationItem className="opacity-50">
                <PaginationEllipsis />
              </PaginationItem>
            }
            <PaginationItem>
              <PaginationLink onClick={() => onChangePage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext disabled={currentPage >= totalPages} onClick={() => onChangePage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
