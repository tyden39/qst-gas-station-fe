
import { Checkbox } from "components/ui/checkbox"
import moment from "moment"
import { BILL_TYPES, FUEL_TYPE, PUMP_ID } from "./constant"

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

export const initFilter = {
  keyword: "",
  billType: BILL_TYPES[0].value,
  fuelType: FUEL_TYPE[0].value,
  pumpId: PUMP_ID[0].value,
  billDate: { from: moment().subtract(1, 'M').toDate(), to: new Date() }
}

export const initMeta = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
}

export const initColumnVisibility = {
  Logger_ID: false,
  Check_Key: false,
  Bill_Type: false,
  Start_Time: false,
  End_Time: false,
}