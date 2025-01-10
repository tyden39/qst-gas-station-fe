import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

import EllipsisTooltip from "components/EllipsisTooltip"
import { buttonVariants } from "components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { cn } from "lib/utils"
import { useEffect, useState } from "react"
import { Calendar } from "./calendar"
import { Label } from "./label"
import moment from "moment"

export function DatePickerWithRange({
  className,
  onChangeValue,
  date,
  name,
  label,
  placeholder,
  disabled,
}) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onSelect = (value) => {
    const val = {from: value?.from ? moment(value?.from).toISOString() : null, to: value?.to ? moment(value?.to).toISOString() : null}
    onChangeValue(val, name)
  }

  const handleClear = (event) => {
    event.stopPropagation()
    onSelect()
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
                  {date?.from ? moment(date?.from).format("DD-MM-yyyy HH:mm:ss") : null} -{" "}
                  {date?.to ? moment(date?.to).format("DD-MM-yyyy HH:mm:ss") : null}
                </>
              ) : (
                moment(date?.from).format("DD-MM-yyyy HH:mm:ss")
              )
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </EllipsisTooltip>

          {date ? (
            <X
              className={cn(
                "h-4 w-4 opacity-50",
                disabled
                  ? "cursor-not-allowed"
                  : "hover:bg-destructive hover:stroke-destructive-foreground hover:opacity-75 rounded cursor-pointer"
              )}
              onClick={handleClear}
            />
          ) : (
            <CalendarIcon className="h-4 w-4" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 sm" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={onSelect}
          numberOfMonths={viewportWidth < 640 ? 1 : 2}
        />
      </PopoverContent>
    </Popover>
  )
}
