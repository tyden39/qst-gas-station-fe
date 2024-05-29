import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { cn } from "lib/utils"
import { useState } from "react"
import EllipsisTooltip from "./EllipsisTooltip"
import { Label } from "./ui/label"

export function FilterSelect({
  name,
  label,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  selectList = [],
  className,
}) {
  const [valueLocal, setValueLocal] = useState()
  const onValueChangeLocal = (value) => {
    setValueLocal(value)
    onValueChange(value, name)
  }

  return (
    <Select
      {...{
        value,
        defaultValue,
        onValueChange: onValueChangeLocal,
      }}
    >
      <SelectTrigger className={cn("w-full gap-2", className)}>
        <Label>{label}</Label>
        <EllipsisTooltip className={"flex-1 text-left"} content={selectList.find(item => item.value === valueLocal)?.label}>
          <SelectValue {...{ placeholder }} />
        </EllipsisTooltip>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectList.map((item) =>
            item.label ? (
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
