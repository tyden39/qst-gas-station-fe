import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { Label } from "./ui/label"
import { cn } from "lib/utils"

export function FormSelect({
  name,
  label,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  selectList = [],
  className
}) {
  return (
    <Select {...{ value, defaultValue, onValueChange: (value) => onValueChange(value, name) }}>
      <SelectTrigger className={cn("w-full gap-2", className)}>
        <Label>{label}</Label>
        <span className="flex-1 text-left"><SelectValue {...{ placeholder }} /></span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectList.map((item) =>
            item.id ? (
              <SelectItem key={`${item.label}-${item.id}`} value={item.value}>
                {item.label}
              </SelectItem>
            ) : (
              <SelectItem key={`${item}`} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
