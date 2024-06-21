import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function MultiSelectFilter({ field, list, placeholder }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          {field.value && field.value.length > 0 ? (
            <>
              Đã chọn {field.value.length} <ChevronDown className="ml-2 h-4 w-4" />
            </>
          ) : <span className="text-muted-foreground">{placeholder}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {list.map((item) => {
          return (
            <DropdownMenuCheckboxItem
              key={item.id}
              className="capitalize"
              checked={field.value.includes(item.value)}
              onCheckedChange={(value) =>
                field.onChange([...field.value, value])
              }
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
