import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { FormControl } from "components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { format } from "date-fns"
import { cn } from "lib/utils"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

export default function FormDatePicker({ field, placeholder }) {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open) => {
    setOpen(open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Popover {...{open, onOpenChange}}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "dd/MM/yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
        <div className="space-x-2 text-right p-2">
          <Button variant="ghost" onClick={handleClose}>Ok</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
