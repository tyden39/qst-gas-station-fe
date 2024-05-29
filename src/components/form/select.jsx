import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"

export default function FormSelect({
  form,
  list = [],
  label,
  placeholder,
  name,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label ?? ""}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {list.map((item) =>
                item.label ? (
                  <SelectItem
                    key={`${item.label}-${item.id}`}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ) : (
                  <SelectItem key={`${item}`} value={item}>
                    {item}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
