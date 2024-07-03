import { Button } from "components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import { EyeOff } from "lucide-react"

export default function TableColumnSelect({table}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="icon" className="p-0 h-4"><EyeOff className="h-4 w-4 cursor-pointer hover:stroke-primary" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="center" className="">
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
                  {column.columnDef.header()}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}