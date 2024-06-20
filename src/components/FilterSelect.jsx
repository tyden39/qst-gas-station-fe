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
import { PackageOpen } from "lucide-react"

export function FilterSelect({
  name,
  label,
  value,
  onValueChange,
  placeholder,
  selectList = [],
  className,
  disabled,
}) {
  const onValueChangeLocal = (value) => {
    onValueChange(value, name)
  }
  
  return (
    <Select
      {...{
        value,
        onValueChange: onValueChangeLocal,
        disabled,
      }}
    >
      <SelectTrigger className={cn("w-full gap-2 hover:bg-accent", className)}>
        <Label>{label}</Label>
        <EllipsisTooltip
          className={"flex-1 text-left"}
          content={selectList.find((item) => item.value === value)?.label}
        >
          {value ? (
            <SelectValue />
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </EllipsisTooltip>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectList.length > 0 ? (
            selectList.map((item) =>
              item.label ? (
                <SelectItem key={`${item.label}-${item.id}`} value={item.value}>
                  {item.label}
                </SelectItem>
              ) : (
                <SelectItem key={`${item}`} value={item}>
                  {item}
                </SelectItem>
              )
            )
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm py-14"><PackageOpen size={40} /> Danh sách trống</div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
