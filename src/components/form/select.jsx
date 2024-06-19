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
import { PackageOpen } from "lucide-react"

export default function FormSelect({
  form,
  list = [],
  label,
  placeholder,
  name,
  disabled,
  onChange,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label ?? ""}</FormLabel>
            <Select
              disabled={disabled}
              onValueChange={(value) => {
                if (onChange) onChange(value)
                field.onChange(value)
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  {field.value ? <SelectValue placeholder={placeholder} /> : placeholder}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {list.length > 0 ? (
                  list.map((item) =>
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
                  )
                ) : (
                  <div className="text-gray-500 h-32 w-full flex flex-col justify-center items-center">
                    <PackageOpen size={50} />
                    Không tìm thấy dữ liệu
                  </div>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
