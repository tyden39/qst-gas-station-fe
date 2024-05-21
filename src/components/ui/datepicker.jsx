"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "lib/utils"
import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Label } from "./label"
import EllipsisTooltip from "components/EllipsisTooltip"

export function DatePickerWithRange({ className, onChangeValue, defaultValue, name }) {
  const [date, setDate] = React.useState(defaultValue)

  const onSelect = (value) => {
    setDate(value)
    onChangeValue(value, name)
  }

  return (
    <Popover>
      <PopoverTrigger className={className} asChild>
        <Button
          variant={"outline"}
          className={cn(
            "text-left font-normal gap-2",
            !date && "text-muted-foreground"
          )}
        >
          <Label className="hover:cursor-pointer">Logger Time:</Label>
          <EllipsisTooltip className="flex-1">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </EllipsisTooltip>
          <CalendarIcon className="h-4 w-4" />
        </Button>
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
