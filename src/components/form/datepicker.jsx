import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function FormDatePicker({ field, placeholder }) {

  const filterDate = (date) => {
    const today = new Date()
    return date < today
  }

  return (
    <DatePicker
      locale={"vi"}
      showTimeInput
      timeFormat="HH:mm"
      timeInputLabel="Giờ"
      selected={field.value}
      onChange={field.onChange}
      dateFormat="dd/MM/yyyy HH:mm:ss"
      filterDate={filterDate}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      placeholderText={placeholder}
      popperPlacement="bottom-start"
      showPopperArrow={false}
    />
  )
}
