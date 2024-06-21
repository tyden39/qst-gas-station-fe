import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import EllipsisTooltip from "components/EllipsisTooltip"
import { buttonVariants } from "components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { cn } from "lib/utils"
import { Calendar } from "./calendar"
import { Label } from "./label"

export function DatePickerWithRange({
  className,
  onChangeValue,
  date,
  name,
  label,
  placeholder,
}) {

  const onSelect = (value) => {
    onChangeValue(value, name)
  }

  return (
    <Popover>
      <PopoverTrigger className={className} asChild>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "text-left font-normal gap-2"
          )}
        >
          <Label className="hover:cursor-pointer">{label}</Label>
          <EllipsisTooltip className="flex-1">
            {date?.from ? (
              date?.to ? (
                <>
                  {format(date?.from, "dd-MM-yyyy hh:mm:ss")} -{" "}
                  {format(date?.to, "dd-MM-yyyy hh:mm:ss")}
                </>
              ) : (
                format(date?.from, "dd-MM-yyyy hh:mm:ss")
              )
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </EllipsisTooltip>
          <CalendarIcon className="h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={onSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
