import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import EllipsisTooltip from "components/EllipsisTooltip"
import { buttonVariants } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { cn } from "lib/utils"
import { Label } from "./label"

export function DatePickerWithRange({ className, onChangeValue, defaultValue, name, label, placeholder }) {
  const [date, setDate] = React.useState(defaultValue)

  const onSelect = (value) => {
    setDate(value)
    onChangeValue(value, name)
  }

  return (
    <Popover>
      <PopoverTrigger className={className} asChild>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "text-left font-normal gap-2",
            !date && "text-muted-foreground"
          )}
        >
          <Label className="hover:cursor-pointer">{label}</Label>
          <EllipsisTooltip className="flex-1">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd-MM-yyyy hh:mm:ss")} -{" "}
                  {format(date.to, "dd-MM-yyyy hh:mm:ss")}
                </>
              ) : (
                format(date.from, "dd-MM-yyyy hh:mm:ss")
              )
            ) : (
              <span>{placeholder}</span>
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
